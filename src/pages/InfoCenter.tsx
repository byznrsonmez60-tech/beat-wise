import { Heart, Activity, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const InfoCenter = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-foreground">Bilgi Merkezi</h1>
        <p className="text-muted-foreground">Kalp ritmi bozuklukları hakkında bilgiler</p>
      </div>

      {/* Main Info Card */}
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Heart className="w-6 h-6 text-accent" fill="currentColor" />
            Kalp Ritmi Bozukluğu Nedir?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground">
          <p className="leading-relaxed">
            Kalp ritmi bozukluğu (aritmi), kalbinizin çok hızlı, çok yavaş veya düzensiz atmasıdır. 
            Kalp normalde dakikada 60-100 arası atar. Bu aralığın dışındaki atışlar veya düzensiz atışlar 
            aritmi olarak değerlendirilir.
          </p>
          <div className="bg-secondary/50 rounded-lg p-4 border border-border">
            <p className="font-semibold text-primary mb-2">Önemli Not:</p>
            <p className="text-sm text-muted-foreground">
              Her kalp ritmi bozukluğu tehlikeli değildir, ancak bazıları ciddi sağlık sorunlarına 
              yol açabilir. Düzenli takip ve doktor kontrolü önemlidir.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* QT Interval Information */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Activity className="w-6 h-6 text-primary" />
            QT Aralığı Hakkında
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="long-qt">
              <AccordionTrigger className="text-left hover:text-primary transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="font-semibold">Uzun QT Sendromu</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-foreground space-y-3 pt-2">
                <p className="leading-relaxed">
                  Uzun QT sendromu, EKG'de QT aralığının normalden uzun olduğu bir durumdur. 
                  Bu durum kalbin elektriksel aktivitesini etkiler ve bazı durumlarda tehlikeli 
                  ritim bozukluklarına yol açabilir.
                </p>
                <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                  <p className="font-semibold text-accent text-sm mb-1">Belirtiler:</p>
                  <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                    <li>Ani bayılma</li>
                    <li>Çarpıntı hissi</li>
                    <li>Nöbet benzeri ataklar</li>
                    <li>Ani kalp durması riski</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="short-qt">
              <AccordionTrigger className="text-left hover:text-primary transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="font-semibold">Kısa QT Sendromu</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-foreground space-y-3 pt-2">
                <p className="leading-relaxed">
                  Kısa QT sendromu, EKG'de QT aralığının normalden kısa olduğu nadir bir durumdur. 
                  Bu sendrom da kalbin elektriksel aktivitesini etkiler ve atriyal fibrilasyon 
                  gibi ritim bozukluklarına yol açabilir.
                </p>
                <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                  <p className="font-semibold text-primary text-sm mb-1">Belirtiler:</p>
                  <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                    <li>Çarpıntı</li>
                    <li>Baş dönmesi</li>
                    <li>Nefes darlığı</li>
                    <li>Ani kardiyak arrest riski</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="management">
              <AccordionTrigger className="text-left hover:text-primary transition-colors">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-success" />
                  <span className="font-semibold">Tedavi ve Yönetim</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-foreground space-y-3 pt-2">
                <p className="leading-relaxed">
                  QT sendromlarının yönetimi kişiye özeldir ve mutlaka bir kardiyolog tarafından 
                  planlanmalıdır. Tedavi seçenekleri arasında:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-1">✓</span>
                    <span>İlaç tedavisi (Beta-blokerler vb.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-1">✓</span>
                    <span>Yaşam tarzı değişiklikleri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-1">✓</span>
                    <span>Riskli ilaçlardan kaçınma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-1">✓</span>
                    <span>İmplante edilebilir defibrilatör (ICD) takılması</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-1">✓</span>
                    <span>Düzenli doktor kontrolü ve EKG takibi</span>
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
