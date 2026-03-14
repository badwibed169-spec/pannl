export interface BankTheme {
  id: string;
  name: string;
  logo: string;
  primary: string;
  primaryForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  accent: string;
  accentForeground: string;
  headerBg: string;
  headerForeground: string;
  buttonRadius: string;
  ring: string;
  warningBg?: string;
  warningForeground?: string;
  logoImage?: string;
}

export const banks: BankTheme[] = [
  {
    id: "swedbank",
    name: "Swedbank",
    logo: "S",
    primary: "22 85% 54%",
    primaryForeground: "0 0% 100%",
    background: "18 50% 96%",
    foreground: "0 30% 25%",
    card: "0 0% 100%",
    cardForeground: "0 30% 25%",
    muted: "18 25% 93%",
    mutedForeground: "0 15% 48%",
    border: "18 20% 88%",
    accent: "170 65% 28%",
    accentForeground: "0 0% 100%",
    headerBg: "0 0% 100%",
    headerForeground: "0 30% 25%",
    buttonRadius: "999px",
    ring: "22 85% 54%",
    warningBg: "25 100% 94%",
    warningForeground: "0 0% 20%",
  },
  {
    id: "nordea",
    name: "Nordea",
    logo: "N",
    primary: "240 100% 18%",
    primaryForeground: "0 0% 100%",
    background: "0 0% 100%",
    foreground: "240 60% 15%",
    card: "0 0% 100%",
    cardForeground: "240 60% 15%",
    muted: "230 15% 95%",
    mutedForeground: "230 20% 40%",
    border: "230 15% 88%",
    accent: "240 100% 18%",
    accentForeground: "0 0% 100%",
    headerBg: "240 100% 18%",
    headerForeground: "0 0% 100%",
    buttonRadius: "6px",
    ring: "240 100% 18%",
    warningBg: "10 55% 94%",
    warningForeground: "240 60% 15%",
  },
  {
    id: "seb",
    name: "SEB",
    logo: "SEB",
    primary: "147 40% 30%",
    primaryForeground: "0 0% 100%",
    background: "0 0% 100%",
    foreground: "0 0% 13%",
    card: "0 0% 100%",
    cardForeground: "0 0% 13%",
    muted: "0 0% 96%",
    mutedForeground: "0 0% 40%",
    border: "0 0% 90%",
    accent: "147 40% 30%",
    accentForeground: "0 0% 100%",
    headerBg: "0 0% 100%",
    headerForeground: "0 0% 13%",
    buttonRadius: "999px",
    ring: "147 40% 30%",
  },
  {
    id: "handelsbanken",
    name: "Handelsbanken",
    logo: "H",
    primary: "205 100% 31%",
    primaryForeground: "0 0% 100%",
    background: "0 0% 100%",
    foreground: "210 30% 18%",
    card: "0 0% 100%",
    cardForeground: "210 30% 18%",
    muted: "210 10% 95%",
    mutedForeground: "210 15% 45%",
    border: "210 12% 88%",
    accent: "205 100% 31%",
    accentForeground: "0 0% 100%",
    headerBg: "210 50% 15%",
    headerForeground: "0 0% 100%",
    buttonRadius: "999px",
    ring: "205 100% 31%",
  },
  {
    id: "sparbanken-syd",
    name: "Sparbanken Syd",
    logo: "SS",
    primary: "48 100% 50%",
    primaryForeground: "0 0% 10%",
    background: "0 0% 100%",
    foreground: "0 0% 18%",
    card: "0 0% 100%",
    cardForeground: "0 0% 18%",
    muted: "48 20% 95%",
    mutedForeground: "0 0% 42%",
    border: "48 15% 88%",
    accent: "48 100% 50%",
    accentForeground: "0 0% 10%",
    headerBg: "0 0% 100%",
    headerForeground: "0 0% 18%",
    buttonRadius: "999px",
    ring: "48 100% 50%",
  },
  {
    id: "danskebank",
    name: "Danske Bank",
    logo: "DB",
    primary: "202 100% 17%",
    primaryForeground: "0 0% 100%",
    background: "0 0% 100%",
    foreground: "202 60% 14%",
    card: "0 0% 100%",
    cardForeground: "202 60% 14%",
    muted: "202 10% 95%",
    mutedForeground: "202 15% 42%",
    border: "202 12% 88%",
    accent: "202 100% 17%",
    accentForeground: "0 0% 100%",
    headerBg: "0 0% 100%",
    headerForeground: "202 60% 14%",
    buttonRadius: "999px",
    ring: "202 100% 17%",
  },
  {
    id: "ica-banken",
    name: "ICA Banken",
    logo: "ICA",
    primary: "3 95% 45%",
    primaryForeground: "0 0% 100%",
    background: "0 0% 100%",
    foreground: "0 0% 15%",
    card: "0 0% 100%",
    cardForeground: "0 0% 15%",
    muted: "0 5% 96%",
    mutedForeground: "0 5% 42%",
    border: "0 5% 90%",
    accent: "3 95% 45%",
    accentForeground: "0 0% 100%",
    headerBg: "0 0% 100%",
    headerForeground: "0 0% 15%",
    buttonRadius: "999px",
    ring: "3 95% 45%",
  },
  {
    id: "lansforsakringar",
    name: "Länsförsäkringar",
    logo: "LF",
    primary: "207 100% 24%",
    primaryForeground: "0 0% 100%",
    background: "0 0% 100%",
    foreground: "210 30% 15%",
    card: "0 0% 100%",
    cardForeground: "210 30% 15%",
    muted: "210 10% 96%",
    mutedForeground: "210 15% 42%",
    border: "210 12% 88%",
    accent: "207 100% 24%",
    accentForeground: "0 0% 100%",
    headerBg: "0 0% 100%",
    headerForeground: "210 30% 15%",
    buttonRadius: "6px",
    ring: "207 100% 24%",
  },
];

export function getBankById(id: string): BankTheme | undefined {
  return banks.find((b) => b.id === id);
}
