import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { banks } from "@/config/banks";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const bankColors: Record<string, string> = {
  swedbank: "hsl(22 85% 54%)",
  nordea: "hsl(240 100% 18%)",
  seb: "hsl(147 40% 30%)",
  handelsbanken: "hsl(205 100% 31%)",
  "sparbanken-syd": "hsl(48 100% 50%)",
  danskebank: "hsl(202 100% 17%)",
  "ica-banken": "hsl(3 95% 45%)",
  lansforsakringar: "hsl(207 100% 24%)",
};

const bankLogoBg: Record<string, string> = {
  swedbank: "linear-gradient(135deg, hsl(22 85% 54%), hsl(30 90% 60%))",
  nordea: "linear-gradient(135deg, hsl(240 100% 18%), hsl(220 80% 30%))",
  seb: "hsl(147 40% 30%)",
  handelsbanken: "linear-gradient(135deg, hsl(205 100% 40%), hsl(195 80% 45%))",
  "sparbanken-syd": "hsl(48 100% 50%)",
  danskebank: "linear-gradient(135deg, hsl(202 100% 17%), hsl(210 80% 25%))",
  "ica-banken": "hsl(3 95% 45%)",
  lansforsakringar: "linear-gradient(135deg, hsl(207 100% 24%), hsl(207 80% 35%))",
};

export default function BankLinks() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { t } = useLanguage();

  const filtered = banks.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[hsl(220_15%_12%)] flex flex-col">
      {/* Header */}
      <header className="pt-12 pb-6 text-center px-6">
        <div className="flex justify-end mb-4 max-w-md mx-auto">
          <LanguageSwitcher className="text-sm text-[hsl(220_15%_60%)] hover:text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-6">
          BANK<span className="text-[hsl(22_85%_54%)]">ID</span>
          <span className="text-[hsl(220_15%_50%)] text-lg font-medium ml-2">Support</span>
        </h1>

        {/* Search bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(220_15%_45%)]" />
          <input
            type="text"
            placeholder={t("banklinks.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[hsl(220_15%_18%)] border border-[hsl(220_15%_25%)] text-white placeholder:text-[hsl(220_15%_45%)] text-sm focus:outline-none focus:border-[hsl(220_15%_40%)] transition-colors"
          />
        </div>
      </header>

      {/* Bank list */}
      <main className="flex-1 flex items-start justify-center px-6 pb-16">
        <div className="w-full max-w-md flex flex-col gap-2.5">
          {filtered.map((bank) => {
            const color = bankColors[bank.id] || "hsl(0 0% 50%)";
            const logoBg = bankLogoBg[bank.id] || color;
            return (
              <button
                key={bank.id}
                onClick={() => navigate(`/bank/${bank.id}`)}
                className="group relative overflow-hidden rounded-2xl bg-[hsl(220_10%_95%)] px-5 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(220_15%_12%)]"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold text-xs shrink-0 shadow-sm"
                    style={{ background: logoBg }}
                  >
                    {bank.logo}
                  </div>
                  <h2 className="text-[15px] font-semibold text-[hsl(220_15%_18%)]">
                    {bank.name}
                  </h2>
                </div>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <p className="text-center text-[hsl(220_15%_45%)] text-sm py-8">
              {t("banklinks.noResult")}
            </p>
          )}

          {/* Status bar */}
          <div className="mt-4 rounded-xl bg-[hsl(30_90%_50%)] px-4 py-3 flex items-center gap-2">
            <span className="text-white text-xs">✓</span>
            <p className="text-white text-xs font-medium">
              {t("banklinks.status")}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
