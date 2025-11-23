import { AlertTriangle, Pill, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const Medications = () => {
  const contraindicatedMeds = [
    {
      name: "Makrolid Antibiyotikler",
      examples: ["Eritromisin", "Azitromisin", "Klaritromisin"],
      risk: "Yüksek",
      reason: "QT aralığını uzatabilir",
    },
    {
      name: "Antiaritmik İlaçlar",
      examples: ["Amiodaron", "Sotalol", "Dofetilid"],
      risk: "Yüksek",
      reason: "Kalp ritmi üzerinde direkt etki",
    },
    {
      name: "Antipsikotik İlaçlar",
      examples: ["Haloperidol", "Klorpromazin", "Ketiapin"],
      risk: "Orta-Yüksek",
      reason: "QT uzaması riski",
    },
    {
      name: "Bazı Antidepresanlar",
      examples: ["Sitalopram", "Essitalopram"],
      risk: "Orta",
      reason: "Yüksek dozlarda QT uzaması",
    },
    {
      name: "Antihistaminikler",
      examples: ["Terfenadin", "Astemizol"],
      risk: "Yüksek",
      reason: "Kardiyak yan etkiler",
    },
    {
      name: "Antimalaryal İlaçlar",
      examples: ["Kinin", "Klorokin", "Hidroksiklorokin"],
      risk: "Orta-Yüksek",
      reason: "QT aralığı etkileri",
    },
  ];

  const getRiskColor = (risk: string) => {
    if (risk.includes("Yüksek")) return "destructive";
    if (risk.includes("Orta")) return "default";
    return "secondary";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-foreground">İlaç Uyarıları</h1>
        <p className="text-muted-foreground">Kullanımı riskli ilaçlar</p>
      </div>

      <Alert className="border-accent bg-accent/5">
        <AlertTriangle className="h-5 w-5 text-accent" />
        <AlertTitle className="text-accent font-semibold">Önemli Uyarı</AlertTitle>
        <AlertDescription className="text-foreground">
          Aşağıdaki ilaçlar kalp ritmi bozukluğu olan hastalar için riskli olabilir. 
          Herhangi bir ilaç kullanmadan önce mutlaka doktorunuza danışın.
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
                    <CardTitle className="text-lg mb-2">{med.name}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {med.examples.map((example, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Badge variant={getRiskColor(med.risk)} className="flex-shrink-0">
                  {med.risk}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Sebep: </span>
                    {med.reason}
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
              <p className="font-semibold text-primary">Hatırlatma:</p>
              <ul className="space-y-1 text-foreground list-disc list-inside">
                <li>Yeni bir ilaç başlamadan önce doktorunuza mutlaka bildirin</li>
                <li>Reçetesiz ilaçlar bile risk oluşturabilir</li>
                <li>Bu liste tüm riskli ilaçları içermeyebilir</li>
                <li>İlaç etkileşimleri kişiye göre değişebilir</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Medications;
