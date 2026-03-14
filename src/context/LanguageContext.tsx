import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "sv" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // BankLinks
  "banklinks.search": { sv: "Sök bank...", en: "Search bank..." },
  "banklinks.noResult": { sv: "Ingen bank hittades", en: "No bank found" },
  "banklinks.status": { sv: "BankID fungerar utan störsel", en: "BankID is operating normally" },

  // Index
  "index.nav.remote": { sv: "Fjärrhjälp", en: "Remote help" },
  "index.nav.bankid": { sv: "BankID Support", en: "BankID Support" },
  "index.download": { sv: "Ladda ner AnyDesk", en: "Download AnyDesk" },
  "index.title": { sv: "Mobilt BankID – Felsökning och annullering", en: "Mobile BankID – Troubleshooting and cancellation" },
  "index.bullet1": {
    sv: "Tjänsten är utformad för att identifiera och motverka obehörig användning, skadlig kod samt andra säkerhetsrisker som kan påverka ditt BankID.",
    en: "This service is designed to identify and prevent unauthorized use, malicious code, and other security risks that may affect your BankID.",
  },
  "index.bullet2": {
    sv: "Tillsammans med en behörig handläggare säkrar tjänsten mot eventuella säkerhetsbrister som kan riskera dina konton eller andra tillgångar hos banken.",
    en: "Together with an authorized agent, the service protects against potential security vulnerabilities that may put your accounts or other assets at the bank at risk.",
  },
  "index.warning1": { sv: "Denna tjänst tillhandahålls som ett samarbete mellan", en: "This service is provided as a collaboration between" },
  "index.warning2": { sv: "och", en: "and" },
  "index.warning3": {
    sv: "och får enbart användas i samråd med spärrtjänstens behöriga handläggare. Varning för bedrägerier: Läs aldrig upp några koder eller känslig information för någon som",
    en: "and may only be used in consultation with the blocking service's authorized agents. Fraud warning: Never unlock any codes or sensitive information for someone who",
  },
  "index.warning4": { sv: "ringt upp dig", en: "called you" },
  "index.privacy": { sv: "Integritetspolicy", en: "Privacy policy" },
  "index.cookies": { sv: "Kakpolicy", en: "Cookie policy" },
  "index.support": { sv: "BankID support", en: "BankID support" },

  // Support
  "support.help": { sv: "Hjälp", en: "Help" },
  "support.language": { sv: "Svenska", en: "English" },
  "support.title": { sv: "Felsökning Mobilt BankID", en: "Mobile BankID Troubleshooting" },
  "support.flow.felsokning": { sv: "Felsökning", en: "Troubleshooting" },
  "support.flow.annulering": { sv: "Annulering", en: "Cancellation" },
  "support.flow.omformatering": { sv: "Spärra BankID", en: "Block BankID" },
  "support.privacy": { sv: "Integritetspolicy", en: "Privacy policy" },
  "support.cookies": { sv: "Kakpolicy", en: "Cookie policy" },
  "support.back": { sv: "Tillbaka", en: "Back" },

  // FlowPage
  "flow.back": { sv: "Tillbaka", en: "Back" },
  "flow.mode": { sv: "Mode", en: "Mode" },
  "flow.demoQR": { sv: "Demo: visa QR", en: "Demo: show QR" },
  "flow.reset": { sv: "Reset", en: "Reset" },
  "flow.felsokning": { sv: "Felsökning Mobilt BankID", en: "Mobile BankID Troubleshooting" },
  "flow.annulering": { sv: "Annulering av BankID-signatur", en: "BankID signature cancellation" },
  "flow.omformatering": { sv: "Spärra BankID", en: "Block BankID" },
  "flow.button.felsokning": { sv: "Felsökning", en: "Troubleshooting" },
  "flow.button.annulering": { sv: "Annulering", en: "Cancellation" },
  "flow.button.omformatering": { sv: "Spärra BankID", en: "Block BankID" },

  // Common
  "common.langLabel": { sv: "Svenska", en: "English" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("sv");

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
