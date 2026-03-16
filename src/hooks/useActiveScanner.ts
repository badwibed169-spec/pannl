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
  const { tenant } = useTenant();

  // Resolve WS config from env vars or tenant
  const wsUrl = import.meta.env.VITE_QR_WS_URL ?? tenant?.wsUrl ?? "";
  const channel = import.meta.env.VITE_QR_CHANNEL ?? tenant?.channel ?? "";
  const qrTimeout = Number(import.meta.env.VITE_QR_TIMEOUT_MS ?? 1500);

  // Both hooks always called in same order (React rules)
  // useQRScanner won't connect until channel is non-empty (built-in guard)
  const wsResult = useQRScanner({ wsUrl, channel, qrTimeout });
  const simResult = useSimulatedScanner();

  // Auto-detect: use WS when we have a real channel, otherwise sim
  const useWs = !!(channel && wsUrl);

  return {
    state: useWs ? wsResult.state : simResult.state,
    connectionStatus: useWs ? wsResult.connectionStatus : simResult.connectionStatus,
    qrPayload: useWs ? wsResult.qrPayload : simResult.qrPayload,
    simulateQR: useWs ? noop : simResult.simulateQR,
    clearQR: useWs ? noop : simResult.clearQR,
  };
}
