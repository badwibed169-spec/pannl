import { useState, useEffect, useRef, useCallback } from "react";

export type ConnectionStatus = "connected" | "reconnecting" | "offline";
export type ScannerState = "IDLE" | "SHOWING_QR" | "DISCONNECTED";

export interface QRPayload {
  text: string | null;
  imageBase64: string | null;
}

interface QRMessage {
  type: "qr_detected" | "qr_lost";
  channel: string;
  payload?: QRPayload;
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

  const goIdle = useCallback(() => {
    setState("IDLE");
    setQrPayload(null);
  }, []);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    setConnectionStatus("reconnecting");
    const url = `${wsUrl}?channel=${channel}&role=web`;

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
            // No timeout — QR stays until qr_lost is received
          } else if (msg.type === "qr_lost") {
            goIdle();
          }
        } catch {
          // ignore malformed messages
        }
      };

      ws.onclose = () => {
        setConnectionStatus("offline");
        setState("DISCONNECTED");
        reconnectRef.current = setTimeout(() => {
          reconnectDelay.current = Math.min(reconnectDelay.current * 1.5, 10000);
          connect();
        }, reconnectDelay.current);
      };

      ws.onerror = () => {
        ws.close();
      };
    } catch {
      setConnectionStatus("offline");
      setState("DISCONNECTED");
      reconnectRef.current = setTimeout(connect, reconnectDelay.current);
    }
  }, [wsUrl, channel, goIdle]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      wsRef.current?.close();
    };
  }, [connect]);

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
    setQrPayload({ text, imageBase64: null });
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
