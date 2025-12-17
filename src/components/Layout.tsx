import { ReactNode } from "react";
import { Heart, Activity, Calendar, Users, FileText, Home, Settings } from "lucide-react";
import { NavLink } from "./NavLink";
import { useLanguage } from "@/contexts/LanguageContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t } = useLanguage();

  const navItems = [
    { to: "/", icon: Home, labelKey: "home" },
    { to: "/info", icon: Activity, labelKey: "infoCenter" },
    { to: "/appointments", icon: Calendar, labelKey: "appointments" },
    { to: "/doctors", icon: Users, labelKey: "doctors" },
    { to: "/ecg", icon: FileText, labelKey: "ecgHistory" },
    { to: "/settings", icon: Settings, labelKey: "settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Heart className="w-8 h-8 text-accent animate-pulse-soft" fill="currentColor" />
              <Activity className="w-4 h-4 text-primary absolute -bottom-1 -right-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("appName")}
              </h1>
              <p className="text-xs text-muted-foreground">{t("appSubtitle")}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-2">
          <div className="flex justify-around items-center py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all hover:bg-secondary"
                activeClassName="bg-primary/10 text-primary"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{t(item.labelKey)}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
import { Heart, Activity, Info, Pill, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const InfoCenter = () => {
  const { t } = useLanguage();

  const medications = [
    {
      name: t("macrolideAntibiotics"),
      risk: t("high"),
      reason: t("mayExtendQt"),
      riskLevel: "high" as const,
    },
    {
      name: t("antiarrhythmicDrugs"),
      risk: t("high"),
      reason: t("directHeartEffect"),
      riskLevel: "high" as const,
    },
    {
      name: t("antipsychoticDrugs"),
      risk: t("mediumHigh"),
      reason: t("qtExtensionRisk"),
      riskLevel: "medium-high" as const,
    },
    {
      name: t("someAntidepressants"),
      risk: t("medium"),
      reason: t("highDoseQtExtension"),
      riskLevel: "medium" as const,
    },
    {
      name: t("antihistamines"),
      risk: t("medium"),
      reason: t("cardiacSideEffects"),
      riskLevel: "medium" as const,
    },
    {
      name: t("antimalarialDrugs"),
      risk: t("mediumHigh"),
      reason: t("qtIntervalEffects"),
      riskLevel: "medium-high" as const,
    },
  ];

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "destructive";
      case "medium-high":
        return "default";
      case "medium":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-foreground">{t("infoCenterTitle")}</h1>
        <p className="text-muted-foreground">{t("infoCenterSubtitle")}</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Genel Bilgi
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center gap-2">
            <Pill className="w-4 h-4" />
            İlaçlar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          {/* Main Info Card */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Heart className="w-6 h-6 text-accent" fill="currentColor" />
                {t("whatIsArrhythmia")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground">
              <p className="leading-relaxed">{t("arrhythmiaDesc")}</p>
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <p className="font-semibold text-primary mb-2">{t("importantNote")}</p>
                <p className="text-sm text-muted-foreground">{t("importantNoteDesc")}</p>
              </div>
            </CardContent>
          </Card>

          {/* QT Interval Information */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Activity className="w-6 h-6 text-primary" />
                {t("aboutQtInterval")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="long-qt">
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="font-semibold">{t("longQtSyndrome")}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground space-y-3 pt-2">
                    <p className="leading-relaxed">{t("longQtDesc")}</p>
                    <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                      <p className="font-semibold text-accent text-sm mb-1">{t("symptoms")}</p>
                      <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                        <li>{t("suddenFainting")}</li>
                        <li>{t("palpitation")}</li>
                        <li>{t("seizureLikeAttacks")}</li>
                        <li>{t("suddenCardiacArrest")}</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="short-qt">
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="font-semibold">{t("shortQtSyndrome")}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground space-y-3 pt-2">
                    <p className="leading-relaxed">{t("shortQtDesc")}</p>
                    <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                      <p className="font-semibold text-primary text-sm mb-1">{t("symptoms")}</p>
                      <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                        <li>{t("palpitation")}</li>
                        <li>{t("dizziness")}</li>
                        <li>{t("shortnessOfBreath")}</li>
                        <li>{t("suddenCardiacArrest")}</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="management">
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-success" />
                      <span className="font-semibold">{t("treatmentManagement")}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground space-y-3 pt-2">
                    <p className="leading-relaxed">{t("treatmentDesc")}</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        <span>{t("drugTherapy")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        <span>{t("lifestyleChanges")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        <span>{t("avoidRiskyDrugs")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        <span>{t("icdImplant")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        <span>{t("regularCheckup")}</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-6 mt-6">
          {/* Warning Card */}
          <Card className="border-destructive/50 shadow-lg bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                {t("importantWarning")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{t("medicationWarningDesc")}</p>
            </CardContent>
          </Card>

          {/* Medications List */}
          <div className="grid gap-4">
            {medications.map((med, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <Pill className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{med.name}</h3>
                      </div>
                    </div>
                    <Badge variant={getRiskColor(med.riskLevel) as any}>
                      {med.risk}
                    </Badge>
                  </div>
                  <div className="ml-8">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{t("reason")}</span> {med.reason}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reminder Card */}
          <Card className="border-primary/20 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="w-5 h-5 text-primary" />
                {t("reminder")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{t("reminderItem1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{t("reminderItem2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{t("reminderItem3")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{t("reminderItem4")}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InfoCenter;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InfoCenter from "./pages/InfoCenter";
import Appointments from "./pages/Appointments";

import Doctors from "./pages/Doctors";
import EcgHistory from "./pages/EcgHistory";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/info" element={<Layout><InfoCenter /></Layout>} />
              <Route path="/appointments" element={<Layout><Appointments /></Layout>} />

              <Route path="/doctors" element={<Layout><Doctors /></Layout>} />
              <Route path="/ecg" element={<Layout><EcgHistory /></Layout>} />
              <Route path="/settings" element={<Layout><Settings /></Layout>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;