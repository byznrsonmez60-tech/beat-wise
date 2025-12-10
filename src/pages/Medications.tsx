import { AlertTriangle, Pill, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const Medications = () => {
  const { t } = useLanguage();

  const contraindicatedMeds = [
    {
      nameKey: "macrolideAntibiotics",
      examples: ["Eritromisin", "Azitromisin", "Klaritromisin"],
      riskKey: "high",
      reasonKey: "mayExtendQt",
    },
    {
      nameKey: "antiarrhythmicDrugs",
      examples: ["Amiodaron", "Sotalol", "Dofetilid"],
      riskKey: "high",
      reasonKey: "directHeartEffect",
    },
    {
      nameKey: "antipsychoticDrugs",
      examples: ["Haloperidol", "Klorpromazin", "Ketiapin"],
      riskKey: "mediumHigh",
      reasonKey: "qtExtensionRisk",
    },
    {
      nameKey: "someAntidepressants",
      examples: ["Sitalopram", "Essitalopram"],
      riskKey: "medium",
      reasonKey: "highDoseQtExtension",
    },
    {
      nameKey: "antihistamines",
      examples: ["Terfenadin", "Astemizol"],
      riskKey: "high",
      reasonKey: "cardiacSideEffects",
    },
    {
      nameKey: "antimalarialDrugs",
      examples: ["Kinin", "Klorokin", "Hidroksiklorokin"],
      riskKey: "mediumHigh",
      reasonKey: "qtIntervalEffects",
    },
  ];

  const getRiskColor = (riskKey: string) => {
    if (riskKey === "high") return "destructive";
    if (riskKey === "mediumHigh" || riskKey === "medium") return "default";
    return "secondary";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-foreground">{t("medicationsTitle")}</h1>
        <p className="text-muted-foreground">{t("medicationsSubtitle")}</p>
      </div>

      <Alert className="border-accent bg-accent/5">
        <AlertTriangle className="h-5 w-5 text-accent" />
        <AlertTitle className="text-accent font-semibold">{t("importantWarning")}</AlertTitle>
        <AlertDescription className="text-foreground">
          {t("medicationWarningDesc")}
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {contraindicatedMeds.map((med, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <Pill className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{t(med.nameKey)}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {med.examples.map((example, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Badge variant={getRiskColor(med.riskKey)} className="flex-shrink-0">
                  {t(med.riskKey)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{t("reason")} </span>
                    {t(med.reasonKey)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-primary">{t("reminder")}</p>
              <ul className="space-y-1 text-foreground list-disc list-inside">
                <li>{t("reminderItem1")}</li>
                <li>{t("reminderItem2")}</li>
                <li>{t("reminderItem3")}</li>
                <li>{t("reminderItem4")}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Medications;
