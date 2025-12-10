import { Heart, Activity, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const InfoCenter = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-foreground">{t("infoCenterTitle")}</h1>
        <p className="text-muted-foreground">{t("infoCenterSubtitle")}</p>
      </div>

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
    </div>
  );
};

export default InfoCenter;
