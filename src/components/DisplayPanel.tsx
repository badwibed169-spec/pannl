import type { ScannerState, QRPayload } from "@/hooks/useQRScanner";
import PulsingLogo from "./PulsingLogo";
import QRDisplay from "./QRDisplay";

interface DisplayPanelProps {
  state: ScannerState;
  qrPayload: QRPayload | null;
}

const DisplayPanel = ({ state, qrPayload }: DisplayPanelProps) => {
  if (state === "SHOWING_QR" && qrPayload) {
    return <QRDisplay payload={qrPayload} />;
  }
  return (
    <div className="display-panel flex items-center justify-center w-[220px] mx-auto aspect-square">
      <PulsingLogo />
    </div>
  );
};

export default DisplayPanel;
