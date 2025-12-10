import { FileText, Download, Calendar, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const EcgHistory = () => {
  const { t, language } = useLanguage();

  const ecgRecords = [
    {
      id: 1,
      date: "2024-11-15",
      time: "15:00",
      doctor: "Prof. Dr. Mehmet Yılmaz",
      hospital: "Ankara Şehir Hastanesi",
      resultKey: "normal",
      qtInterval: "420 ms",
      heartRate: 68,
      notesKey: "ecgNote1",
    },
    {
      id: 2,
      date: "2024-10-20",
      time: "10:30",
      doctor: "Doç. Dr. Ayşe Demir",
      hospital: "Memorial Hastanesi",
      resultKey: "mildExtension",
      qtInterval: "465 ms",
      heartRate: 72,
      notesKey: "ecgNote2",
    },
    {
      id: 3,
      date: "2024-09-10",
      time: "14:00",
      doctor: "Prof. Dr. Mehmet Yılmaz",
      hospital: "Ankara Şehir Hastanesi",
      resultKey: "normal",
      qtInterval: "415 ms",
      heartRate: 65,
      notesKey: "ecgNote3",
    },
  ];

  const ecgNotes: Record<string, Record<string, string>> = {
    tr: {
      ecgNote1: "QT aralığı normal sınırlarda. Düzenli kontrol önerilir.",
      ecgNote2: "QT hafif uzamış. İlaç ayarlaması yapıldı.",
      ecgNote3: "EKG bulguları normal.",
    },
    en: {
      ecgNote1: "QT interval within normal limits. Regular monitoring recommended.",
      ecgNote2: "QT slightly extended. Medication adjustment made.",
      ecgNote3: "ECG findings normal.",
    },
  };

  const getResultColor = (resultKey: string) => {
    if (resultKey === "normal") return "success";
    if (resultKey === "mildExtension") return "warning";
    return "destructive";
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === "tr" ? "tr-TR" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-foreground">{t("ecgHistoryTitle")}</h1>
        <p className="text-muted-foreground">{t("ecgHistorySubtitle")}</p>
      </div>

      {/* Summary Card */}
      <Card className="border-none bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm opacity-90 mb-1">{t("totalEcg")}</p>
              <p className="text-3xl font-bold">{ecgRecords.length}</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">{t("lastQt")}</p>
              <p className="text-3xl font-bold">{ecgRecords[0].qtInterval}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EKG Records */}
      <div className="space-y-4">
        {ecgRecords.map((record) => (
          <Card key={record.id} className="shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <FileText className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      {t("ecgRecord")} #{record.id}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={getResultColor(record.resultKey)}>
                        {t(record.resultKey)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{t("date")}</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {formatDate(record.date)}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{t("time")}</p>
                  <span className="text-sm font-medium text-foreground">{record.time}</span>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">{t("qtInterval")}</p>
                    <p className="font-semibold text-primary">{record.qtInterval}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">{t("heartRate")}</p>
                    <div className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-accent" />
                      <p className="font-semibold text-foreground">{record.heartRate} bpm</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">{t("doctor")}</p>
                <p className="text-sm text-foreground">{record.doctor}</p>
                <p className="text-xs text-muted-foreground">{record.hospital}</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 border border-border">
                <p className="text-xs font-semibold text-primary mb-1">{t("notes")}</p>
                <p className="text-sm text-foreground">{ecgNotes[language][record.notesKey]}</p>
              </div>

              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                {t("downloadEcgReport")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EcgHistory;
