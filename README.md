# QR Flow Tracker

A real time QR code display and tracking web application. The system consists of two parts:

- **Frontend** — A React web app that displays incoming QR codes in real time, styled per bank brand
- **Scanner Gateway** — A Node.js WebSocket server that receives qr data from an external scanner (EXE/app) and broadcasts it to connected web clients

---

## Project Structure

```
qr-flow-tracker/
├── src/                  # React frontend.
│   ├── assets/           # Images, bank backgrounds, logos
│   ├── components/       # UI components (AppShell, DisplayPanel, QRDisplay, etc.)
│   ├── config/           # Bank definitions and logo mappings
│   ├── context/          # React contexts (BankTheme, Language)
│   ├── hooks/            # Custom hooks (useQRScanner, useActiveScanner)
│   └── pages/            # Route pages (BankLinks, Index, FlowPage, Support)
├── scanner-gateway/      # Node.js WebSocket + Socket.IO relay server
│   └── src/
│       └── server.ts
├── public/               # Static assets
├── index.html
├── vite.config.ts
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Install dependencies

```bash
npm install
```

### Run the frontend (dev)

```bash
npm run dev
```

Runs on [http://localhost:8080](http://localhost:8080)

### Run the scanner gateway

```bash
cd scanner-gateway
npm install
npm run dev
```

Runs on port `8788` by default.

---

## Scanner Gateway

The gateway is a lightweight relay server. It accepts connections from:

- **Scanner clients** (EXE / desktop app) — send QR data in via WebSocket or Socket.IO
- **Web clients** (browser) — receive broadcasted QR events in real time

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/qr` | Manually push a QR detected event |
| `POST` | `/lost` | Manually push a QR lost event |
| `WS` | `/ws?channel=X&role=scanner` | WebSocket connection |
| `Socket.IO` | `/socket.io` | Socket.IO connection |

### WebSocket Message Format

**Scanner → Gateway (send QR data):**

```json
{
  "type": "qr_detected",
  "channel": "demo",
  "payload": {
    "text": "https://example.com",
    "imageBase64": "<base64 string or null>"
  }
}
```

**Gateway → Web client (broadcast):**

```json
{
  "type": "qr_detected",
  "channel": "demo",
  "payload": {
    "text": "https://example.com",
    "imageBase64": null
  },
  "ts": 1710000000000
}
```

To signal a QR code has left the frame:

```json
{ "type": "qr_lost", "channel": "demo" }
```

### Channels

Use the `channel` query parameter to isolate traffic between different scanner stations and their corresponding display screens. Each scanner and web client should connect to the same channel name.

---

## Environment Variables

Create a `.env` file in the project root if needed:

```env
# Show demo/simulation buttons in the UI (dev only)
VITE_SHOW_DEMO_BUTTONS=true

# Scanner mode: "sim" for simulation, "live" for real scanner
VITE_SCANNER_MODE=sim
```

---

## Supported Banks

The UI adapts its branding, fonts, colours, and layout per bank:

- Swedbank
- Nordea
- SEB
- Handelsbanken
- Sparbanken Syd
- Danske Bank
- ICA Banken
- Länsförsäkringar

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui, Radix UI |
| Routing | React Router v6 |
| Data fetching | TanStack Query |
| Gateway | Node.js, Express, ws, Socket.IO |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests |
| `npm run lint` | Run ESLint |
