import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InfoCenter from "./pages/InfoCenter";
import MedicationReminders from "./pages/MedicationReminders";
import DoctorsAppointments from "./pages/DoctorsAppointments";
import EcgHistory from "./pages/EcgHistory";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { checkAndFireReminders } from "./lib/notifications";

const queryClient = new QueryClient();

const App = () => {
  // Check for due reminders every 30 seconds
  useEffect(() => {
    const interval = setInterval(checkAndFireReminders, 30000);
    checkAndFireReminders(); // Check immediately on load
    return () => clearInterval(interval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/medications" element={<Layout><MedicationReminders /></Layout>} />
                <Route path="/info" element={<Layout><InfoCenter /></Layout>} />
                <Route path="/doctors-appointments" element={<Layout><DoctorsAppointments /></Layout>} />
                <Route path="/ecg" element={<Layout><EcgHistory /></Layout>} />
                <Route path="/settings" element={<Layout><Settings /></Layout>} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
