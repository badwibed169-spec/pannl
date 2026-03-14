import type { ReactNode } from "react";
import ConnectionIndicator from "./ConnectionIndicator";
import type { ConnectionStatus } from "@/hooks/useQRScanner";

interface AppShellProps {
  children: ReactNode;
  connectionStatus?: ConnectionStatus;
  showStatus?: boolean;
  bankName?: string;
}

const AppShell = ({ children, connectionStatus = "connected", showStatus = false, bankName }: AppShellProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header
        className="h-[72px] border-b border-border flex items-center justify-between px-6 md:px-8"
        style={{
          background: "hsl(var(--header-bg, var(--card)))",
          color: "hsl(var(--header-foreground, var(--card-foreground)))",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-extrabold text-sm">
              {bankName ? bankName.charAt(0) : "S"}
            </span>
          </div>
          <span className="text-lg font-bold tracking-tight">
            {bankName ?? "Supportverktyg"}
          </span>
        </div>
        {showStatus && <ConnectionIndicator status={connectionStatus} />}
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default AppShell;
