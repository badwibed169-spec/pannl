import { useLanguage } from "@/context/LanguageContext";

interface LanguageSwitcherProps {
  className?: string;
  style?: React.CSSProperties;
}

const LanguageSwitcher = ({ className = "", style }: LanguageSwitcherProps) => {
  const { lang, setLang, t } = useLanguage();

  const toggle = () => setLang(lang === "sv" ? "en" : "sv");

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ${className}`}
      style={style}
    >
      <span className="w-6 h-6 rounded-full overflow-hidden inline-flex items-center justify-center">
        {lang === "sv" ? (
          <svg viewBox="0 0 32 32" className="w-6 h-6">
            <rect width="32" height="32" fill="#006AA7" />
            <rect x="10" y="0" width="4" height="32" fill="#FECC02" />
            <rect x="0" y="14" width="32" height="4" fill="#FECC02" />
          </svg>
        ) : (
          <svg viewBox="0 0 32 32" className="w-6 h-6">
            <rect width="32" height="32" fill="#012169" />
            <path d="M0 0L32 32M32 0L0 32" stroke="white" strokeWidth="4" />
            <path d="M0 0L32 32M32 0L0 32" stroke="#C8102E" strokeWidth="2" />
            <rect x="13" y="0" width="6" height="32" fill="white" />
            <rect x="0" y="13" width="32" height="6" fill="white" />
            <rect x="14" y="0" width="4" height="32" fill="#C8102E" />
            <rect x="0" y="14" width="32" height="4" fill="#C8102E" />
          </svg>
        )}
      </span>
      <span className="hidden sm:inline">{t("common.langLabel")}</span>
      <span className="inline sm:hidden">{lang === "sv" ? "SV" : "EN"}</span>
    </button>
  );
};

export default LanguageSwitcher;
