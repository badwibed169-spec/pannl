import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { QRPayload } from "@/hooks/useQRScanner";

interface QRDisplayProps {
  payload: QRPayload;
}

const TRUNCATE_LEN = 40;

const QRDisplay = ({ payload }: QRDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const text = payload.text ?? "";
  const isLong = text.length > TRUNCATE_LEN;
  const displayText = isLong && !expanded ? text.slice(0, TRUNCATE_LEN) + "…" : text;

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full p-3">
      {/* QR code — generated from text payload */}
      {text && (
        <div className="bg-white p-3 rounded-lg mx-auto">
          <QRCodeSVG
            value={text}
            size={194}
            level="M"
            marginSize={0}
          />
        </div>
      )}

      {/* QR text */}
      {text && (
        <div className="w-full flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2">
          <span className="flex-1 text-xs font-mono text-foreground break-all leading-relaxed">
            {displayText}
            {isLong && (
              <button
                onClick={() => setExpanded(v => !v)}
                className="ml-1 text-primary underline-offset-2 hover:underline whitespace-nowrap"
              >
                {expanded ? "less" : "more"}
              </button>
            )}
          </span>
          <button
            onClick={handleCopy}
            className="shrink-0 p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
            title="Copy"
          >
            {copied ? (
              <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default QRDisplay;
