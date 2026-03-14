import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getBankById, type BankTheme } from "@/config/banks";

interface BankThemeContextValue {
  bank: BankTheme | null;
  setBankId: (id: string | null) => void;
}

const BankThemeContext = createContext<BankThemeContextValue>({
  bank: null,
  setBankId: () => {},
});

export function BankThemeProvider({ children }: { children: ReactNode }) {
  const [bank, setBank] = useState<BankTheme | null>(null);

  const setBankId = (id: string | null) => {
    setBank(id ? getBankById(id) ?? null : null);
  };

  useEffect(() => {
    if (!bank) return;
    const root = document.documentElement;
    const vars: Record<string, string> = {
      "--primary": bank.primary,
      "--primary-foreground": bank.primaryForeground,
      "--background": bank.background,
      "--foreground": bank.foreground,
      "--card": bank.card,
      "--card-foreground": bank.cardForeground,
      "--muted": bank.muted,
      "--muted-foreground": bank.mutedForeground,
      "--border": bank.border,
      "--accent": bank.accent,
      "--accent-foreground": bank.accentForeground,
      "--ring": bank.ring,
      "--header-bg": bank.headerBg,
      "--header-foreground": bank.headerForeground,
      "--button-radius": bank.buttonRadius,
    };

    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));

    return () => {
      Object.keys(vars).forEach((k) => root.style.removeProperty(k));
    };
  }, [bank]);

  return (
    <BankThemeContext.Provider value={{ bank, setBankId }}>
      {children}
    </BankThemeContext.Provider>
  );
}

export const useBankTheme = () => useContext(BankThemeContext);
