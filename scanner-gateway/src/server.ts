import express from "express";
import http from "http";
import { createHmac, timingSafeEqual } from "crypto";
import { WebSocketServer, WebSocket } from "ws";
import { Server as SocketIOServer } from "socket.io";
import url from "url";

const PORT = Number(process.env.PORT ?? 8788);
const AUTH_SECRET = process.env.AUTH_SECRET ?? "";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? "http://localhost:5173";
const MAX_MSG_BYTES = 2 * 1024 * 1024; // 2 MB cap per message
const AUTH_WINDOW_SECONDS = 30;
const ALLOWED_CHANNELS: Set<string> | null = (() => {
  const raw = process.env.ALLOWED_CHANNELS ?? "";
  if (!raw.trim()) return null; // not configured — allow any channel (dev mode)
  return new Set(raw.split(",").map((s) => s.trim()).filter(Boolean));
})();

function verifyChannel(channel: string): boolean {
  if (!ALLOWED_CHANNELS) return true;
  return ALLOWED_CHANNELS.has(channel);
}

function verifyHmacToken(token: string | null): boolean {
  if (!AUTH_SECRET) return true; // secret not configured — skip check (dev mode)
  if (!token) return false;
  const now = Math.floor(Date.now() / 1000);
  for (let delta = -AUTH_WINDOW_SECONDS; delta <= AUTH_WINDOW_SECONDS; delta++) {
    const ts = (now + delta).toString();
    const expected = createHmac("sha256", AUTH_SECRET).update(ts).digest("hex");
    try {
      if (timingSafeEqual(Buffer.from(token, "hex"), Buffer.from(expected, "hex"))) {
        return true;
      }
    } catch {
      // length mismatch — not valid
    }
  }
  return false;
}

// ── Types ──────────────────────────────────────────────
interface NormalizedMessage {
  type: "qr_detected" | "qr_lost";
  channel: string;
  payload?: { text: string | null; imageBase64: string | null };
  ts: number;
}

interface Client {
  ws: WebSocket;
  channel: string;
  role: string;
}

// ── State ──────────────────────────────────────────────
const clients = new Set<Client>();

function broadcast(msg: NormalizedMessage, channel: string, excludeWs?: WebSocket) {
  const data = JSON.stringify(msg);
  for (const c of clients) {
    if (c.channel === channel && c.role === "web" && c.ws !== excludeWs && c.ws.readyState === WebSocket.OPEN) {
      c.ws.send(data);
    }
  }
}

// ── Normalise incoming data from EXE ───────────────────
function normalise(raw: string, defaultChannel: string): NormalizedMessage | null {
  // Try JSON first
  try {
    const obj = JSON.parse(raw);

    // Already in our format
    if (obj.type === "qr_detected" || obj.type === "qr_lost") {
      return {
        type: obj.type,
        channel: obj.channel ?? defaultChannel,
        payload: obj.type === "qr_detected"
          ? {
              text: obj.payload?.text ?? obj.text ?? obj.data ?? null,
              imageBase64: obj.payload?.imageBase64 ?? obj.imageBase64 ?? obj.image ?? null,
            }
          : undefined,
        ts: Date.now(),
      };
    }

    // Generic JSON with text/data/qr field → detected
    const text = obj.text ?? obj.data ?? obj.qr ?? obj.payload?.text ?? null;
    const imageBase64 = obj.imageBase64 ?? obj.image ?? obj.payload?.imageBase64 ?? null;

    if (text || imageBase64) {
      return {
        type: "qr_detected",
        channel: obj.channel ?? defaultChannel,
        payload: { text, imageBase64 },
        ts: Date.now(),
      };
    }

    // Empty payload → lost
    return {
      type: "qr_lost",
      channel: obj.channel ?? defaultChannel,
      ts: Date.now(),
    };
  } catch {
    // Not JSON — treat raw string as QR text
    const trimmed = raw.trim();
    if (!trimmed) return null;
    return {
      type: "qr_detected",
      channel: defaultChannel,
      payload: { text: trimmed, imageBase64: null },
      ts: Date.now(),
    };
  }
}

// ── Express + HTTP ─────────────────────────────────────
const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.send("ok"));

// Manual test endpoints
app.post("/qr", (req, res) => {
  const text: string = req.body?.text ?? "";
  const channel: string = req.body?.channel ?? "d0ea6456acf9cedf";
  const imageBase64: string | null = req.body?.imageBase64 ?? null;
  const msg: NormalizedMessage = {
    type: "qr_detected",
    channel,
    payload: { text: text || null, imageBase64 },
    ts: Date.now(),
  };
  broadcast(msg, channel);
  res.json({ sent: true, channel });
});

app.post("/lost", (req, res) => {
  const channel: string = req.body?.channel ?? "d0ea6456acf9cedf";
  const msg: NormalizedMessage = { type: "qr_lost", channel, ts: Date.now() };
  broadcast(msg, channel);
  res.json({ sent: true, channel });
});

const server = http.createServer(app);

// ── Raw WebSocket on /ws ───────────────────────────────
const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (request, socket, head) => {
  const pathname = url.parse(request.url ?? "").pathname;
  if (pathname === "/ws") {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  } else {
    // Let Socket.IO handle other upgrades
  }
});

wss.on("connection", (ws, req) => {
  const params = new URLSearchParams(url.parse(req.url ?? "").query ?? "");
  const channel = params.get("channel") ?? "d0ea6456acf9cedf";
  const role = params.get("role") ?? "scanner";
  const token = params.get("token") ?? null;

  if (!verifyHmacToken(token)) {
    ws.close(4401, "Unauthorized");
    console.warn(`[WS] rejected connection — bad/missing token (channel=${channel})`);
    return;
  }

  if (!verifyChannel(channel)) {
    ws.close(4403, "Forbidden");
    console.warn(`[WS] rejected connection — unknown channel=${channel}`);
    return;
  }

  const client: Client = { ws, channel, role };
  clients.add(client);
  console.log(`[WS] ${role} connected — channel=${channel}  (${clients.size} clients)`);

  ws.on("message", (data) => {
    const raw = data.toString();
    if (Buffer.byteLength(raw, "utf8") > MAX_MSG_BYTES) {
      console.warn(`[WS] oversized message dropped (channel=${channel}, role=${role})`);
      return;
    }
    if (role === "scanner" || role === "exe") {
      const msg = normalise(raw, channel);
      if (msg) {
        console.log(`[WS] msg type=${msg.type} channel=${msg.channel}`); // no payload/text logged
        broadcast(msg, channel, ws);
      }
    }
    // Web clients don't send data that needs broadcasting
  });

  ws.on("close", () => {
    clients.delete(client);
    console.log(`[WS] ${role} disconnected — channel=${channel}  (${clients.size} clients)`);
  });
});

// ── Socket.IO compatibility layer ──────────────────────
const io = new SocketIOServer(server, {
  cors: {
    origin: ALLOWED_ORIGIN,
    methods: ["GET", "POST"],
  },
  path: "/socket.io",
});

io.on("connection", (socket) => {
  const channel = (socket.handshake.query.channel as string) ?? "d0ea6456acf9cedf";
  const role = (socket.handshake.query.role as string) ?? "scanner";
  const token = (socket.handshake.query.token as string) ?? null;

  if (!verifyHmacToken(token)) {
    socket.disconnect(true);
    console.warn(`[SIO] rejected connection — bad/missing token (channel=${channel})`);
    return;
  }

  if (!verifyChannel(channel)) {
    socket.disconnect(true);
    console.warn(`[SIO] rejected connection — unknown channel=${channel}`);
    return;
  }

  // Create a pseudo-WS client so broadcast works uniformly
  // We'll handle Socket.IO clients separately for sending
  console.log(`[SIO] ${role} connected — channel=${channel}`);

  const handleDetected = (payload: unknown) => {
    const raw = typeof payload === "string" ? payload : JSON.stringify(payload);
    const msg = normalise(raw, channel);
    if (msg) {
      msg.type = "qr_detected";
      // Broadcast to WS web clients
      broadcast(msg, channel);
      // Also emit to Socket.IO web clients in same channel
      io.to(`ch:${channel}:web`).emit("message", msg);
    }
  };

  const handleLost = () => {
    const msg: NormalizedMessage = { type: "qr_lost", channel, ts: Date.now() };
    broadcast(msg, channel);
    io.to(`ch:${channel}:web`).emit("message", msg);
  };

  // Listen for various event names EXE might use
  socket.on("qr_detected", handleDetected);
  socket.on("qr_code_scanned", handleDetected);
  socket.on("qr", handleDetected);
  socket.on("qr_lost", handleLost);

  // Generic "message" event
  socket.on("message", (data: unknown) => {
    const raw = typeof data === "string" ? data : JSON.stringify(data);
    const msg = normalise(raw, channel);
    if (msg) {
      broadcast(msg, channel);
      io.to(`ch:${channel}:web`).emit("message", msg);
    }
  });

  // Join room for targeted broadcasts
  socket.join(`ch:${channel}:${role}`);

  socket.on("disconnect", () => {
    console.log(`[SIO] ${role} disconnected — channel=${channel}`);
  });
});

// ── Start ──────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(`\n🚀 Scanner Gateway running on port ${PORT}`);
  console.log(`   Health:    http://localhost:${PORT}/health`);
  console.log(`   WS:        ws://localhost:${PORT}/ws`);
  console.log(`   Socket.IO: http://localhost:${PORT}`);
  console.log(`   Test QR:   POST http://localhost:${PORT}/qr   { "text":"..." }`);
  console.log(`   Test Lost: POST http://localhost:${PORT}/lost\n`);
});
