import { FileText, Download, Calendar, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EcgHistory = () => {
  const ecgRecords = [
    {
      id: 1,
      date: "2024-11-15",
      time: "15:00",
      doctor: "Prof. Dr. Mehmet Yılmaz",
      hospital: "Ankara Şehir Hastanesi",
      result: "Normal",
      qtInterval: "420 ms",
      heartRate: 68,
      notes: "QT aralığı normal sınırlarda. Düzenli kontrol önerilir.",
    },
    {
      id: 2,
      date: "2024-10-20",
      time: "10:30",
      doctor: "Doç. Dr. Ayşe Demir",
      hospital: "Memorial Hastanesi",
      result: "Hafif Uzama",
      qtInterval: "465 ms",
      heartRate: 72,
      notes: "QT hafif uzamış. İlaç ayarlaması yapıldı.",
    },
    {
      id: 3,
      date: "2024-09-10",
      time: "14:00",
      doctor: "Prof. Dr. Mehmet Yılmaz",
      hospital: "Ankara Şehir Hastanesi",
      result: "Normal",
      qtInterval: "415 ms",
      heartRate: 65,
      notes: "EKG bulguları normal.",
    },
  ];

  const getResultColor = (result: string) => {
    if (result === "Normal") return "success";
    if (result.includes("Hafif")) return "warning";
    return "destructive";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-foreground">EKG Geçmişi</h1>
        <p className="text-muted-foreground">Elektrokardiyogram kayıtlarınız</p>
      </div>

      {/* Summary Card */}
      <Card className="border-none bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm opacity-90 mb-1">Toplam EKG</p>
              <p className="text-3xl font-bold">{ecgRecords.length}</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Son QT</p>
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
                      EKG Kaydı #{record.id}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={getResultColor(record.result)}>
                        {record.result}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Tarih</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {new Date(record.date).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Saat</p>
                  <span className="text-sm font-medium text-foreground">{record.time}</span>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">QT Aralığı</p>
                    <p className="font-semibold text-primary">{record.qtInterval}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Kalp Atışı</p>
                    <div className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-accent" />
                      <p className="font-semibold text-foreground">{record.heartRate} bpm</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Doktor</p>
                <p className="text-sm text-foreground">{record.doctor}</p>
                <p className="text-xs text-muted-foreground">{record.hospital}</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 border border-border">
                <p className="text-xs font-semibold text-primary mb-1">Notlar:</p>
                <p className="text-sm text-foreground">{record.notes}</p>
              </div>

              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                EKG Raporunu İndir
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EcgHistory;
