import { useQRScanner, useSimulatedScanner } from "./useQRScanner";
import type { ScannerState, ConnectionStatus, QRPayload } from "./useQRScanner";
import { useTenant } from "@/context/TenantContext";

interface ActiveScannerResult {
  state: ScannerState;
  connectionStatus: ConnectionStatus;
  qrPayload: QRPayload | null;
  simulateQR: (text: string) => void;
  clearQR: () => void;
}

const noop = () => {};

export function useActiveScanner(): ActiveScannerResult {
  const mode = import.meta.env.VITE_SCANNER_MODE ?? "sim";

  if (mode === "ws") {
    return useWsScanner();
  }
  return useSimScanner();
}

function useWsScanner(): ActiveScannerResult {
  const { tenant } = useTenant();

  // Tenant-aware WS config with env var fallback
  const wsUrl = import.meta.env.VITE_QR_WS_URL ?? tenant?.wsUrl ?? "ws://localhost:8788/ws";
  const channel = import.meta.env.VITE_QR_CHANNEL ?? tenant?.channel ?? "";
  const qrTimeout = Number(import.meta.env.VITE_QR_TIMEOUT_MS ?? 1500);

  const { state, connectionStatus, qrPayload } = useQRScanner({ wsUrl, channel, qrTimeout });
  return { state, connectionStatus, qrPayload, simulateQR: noop, clearQR: noop };
}

function useSimScanner(): ActiveScannerResult {
  const { state, connectionStatus, qrPayload, simulateQR, clearQR } = useSimulatedScanner();
  return { state, connectionStatus, qrPayload, simulateQR, clearQR };
}
