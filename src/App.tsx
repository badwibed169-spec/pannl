import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BankThemeProvider } from "@/context/BankThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
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
            <Routes>
              <Route path="/" element={<BankLinks />} />
              <Route path="/bank/:bankId" element={<BankHome />} />
              <Route path="/bank/:bankId/support" element={<Support />} />
              <Route path="/bank/:bankId/flow/:mode" element={<FlowPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </BankThemeProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
