import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BankThemeProvider } from "@/context/BankThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { TenantProvider } from "@/context/TenantContext";
import TenantRoutes from "./components/TenantRoutes";
import BankLinks from "./pages/BankLinks";
import BankHome from "./pages/Index";
import Support from "./pages/Support";
import FlowPage from "./pages/FlowPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <BankThemeProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <TenantProvider>
              <Routes>
                {/* Tenant slug-based routes: /t/:tenantSlug/bank/... */}
                <Route path="/t/:tenantSlug" element={<TenantRoutes />}>
                  <Route index element={<BankLinks />} />
                  <Route path="bank/:bankId" element={<BankHome />} />
                  <Route path="bank/:bankId/support" element={<Support />} />
                  <Route path="bank/:bankId/flow/:mode" element={<FlowPage />} />
                </Route>

                {/* Domain-based routes (custom domain resolves tenant) */}
                <Route path="/" element={<BankLinks />} />
                <Route path="/bank/:bankId" element={<BankHome />} />
                <Route path="/bank/:bankId/support" element={<Support />} />
                <Route path="/bank/:bankId/flow/:mode" element={<FlowPage />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </TenantProvider>
          </BrowserRouter>
        </BankThemeProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
