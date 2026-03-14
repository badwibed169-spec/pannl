import type { ConnectionStatus } from "@/hooks/useQRScanner";

const labels: Record<ConnectionStatus, string> = {
  connected: "Ansluten",
  reconnecting: "Återansluter…",
  offline: "Offline",
};

const dotClass: Record<ConnectionStatus, string> = {
  connected: "status-dot-connected",
  reconnecting: "status-dot-reconnecting",
  offline: "status-dot-offline",
};

interface ConnectionIndicatorProps {
  status: ConnectionStatus;
}

const ConnectionIndicator = ({ status }: ConnectionIndicatorProps) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium">
      <span className={`status-dot ${dotClass[status]}`} />
      <span className="text-muted-foreground">{labels[status]}</span>
    </div>
  );
};

export default ConnectionIndicator;
