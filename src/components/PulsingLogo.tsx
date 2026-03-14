export default function PulseLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer pulsing ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          style={{ animation: "pulseRing 2.5s ease-in-out infinite" }}
        />
        {/* Inner circle with Swedbank orange */}
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-sm font-medium tracking-wide">
        Väntar på QR-kod…
      </p>
      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
