import { useState, useEffect, useRef, useCallback } from "react";

export type ConnectionStatus = "connected" | "reconnecting" | "offline";
export type ScannerState = "IDLE" | "SHOWING_QR" | "DISCONNECTED";

export interface QRPayload {
  text: string | null;
}

interface QRMessage {
  type: "qr_detected" | "qr_lost";
  channel: string;
  payload?: { text: string | null };
  ts: number;
}

interface UseQRScannerOptions {
  wsUrl: string;
  channel: string;
  qrTimeout?: number;
}

export function useQRScanner({ wsUrl, channel }: UseQRScannerOptions) {
  const [state, setState] = useState<ScannerState>("DISCONNECTED");
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("offline");
  const [qrPayload, setQrPayload] = useState<QRPayload | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectDelay = useRef(1000);
  const wsUrlRef = useRef(wsUrl);
  const channelRef = useRef(channel);

  wsUrlRef.current = wsUrl;
  channelRef.current = channel;

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN || wsRef.current?.readyState === WebSocket.CONNECTING) return;

    setConnectionStatus("reconnecting");
    const url = `${wsUrlRef.current}?channel=${channelRef.current}&role=web`;

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionStatus("connected");
        setState("IDLE");
        reconnectDelay.current = 1000;
      };

      ws.onmessage = (event) => {
        try {
          const msg: QRMessage = JSON.parse(event.data);
          if (msg.type === "qr_detected" && msg.payload) {
            setState("SHOWING_QR");
            setQrPayload(msg.payload);
          } else if (msg.type === "qr_lost") {
            setState("IDLE");
            setQrPayload(null);
          }
        } catch {
          // ignore malformed messages
        }
      };

      ws.onclose = () => {
        wsRef.current = null;
        setConnectionStatus("offline");
        setState("DISCONNECTED");
        if (channelRef.current) {
          reconnectRef.current = setTimeout(() => {
            reconnectDelay.current = Math.min(reconnectDelay.current * 1.5, 10000);
            connect();
          }, reconnectDelay.current);
        }
      };

      ws.onerror = () => {
        ws.close();
      };
    } catch {
      setConnectionStatus("offline");
      setState("DISCONNECTED");
      if (channelRef.current) {
        reconnectRef.current = setTimeout(connect, reconnectDelay.current);
      }
    }
  }, []);

  useEffect(() => {
    if (!channel) return;
    if (reconnectRef.current) clearTimeout(reconnectRef.current);
    wsRef.current?.close();
    wsRef.current = null;
    reconnectDelay.current = 1000;
    connect();
    return () => {
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [channel, wsUrl, connect]);

  return { state, connectionStatus, qrPayload };
}

// Simulated scanner for testing without WebSocket server
export function useSimulatedScanner() {
  const [state, setState] = useState<ScannerState>("IDLE");
  const [connectionStatus] = useState<ConnectionStatus>("connected");
  const [qrPayload, setQrPayload] = useState<QRPayload | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const simulateQR = useCallback((text: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setState("SHOWING_QR");
    setQrPayload({ text });
    timeoutRef.current = setTimeout(() => {
      setState("IDLE");
      setQrPayload(null);
    }, 4000);
  }, []);

  const clearQR = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setState("IDLE");
    setQrPayload(null);
  }, []);

  return { state, connectionStatus, qrPayload, simulateQR, clearQR };
}
