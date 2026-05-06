import { useState, useEffect, useRef } from "react";
import { FileText, Upload, Trash2, Image, File, Calendar, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface EcgRecord {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  fileData: string; // base64
}

const EcgHistory = () => {
  const { t, language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [records, setRecords] = useState<EcgRecord[]>([]);

  // Load records from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("kalptakip-ecg-records");
    if (stored) {
      setRecords(JSON.parse(stored));
    }
  }, []);

  const saveRecords = (newRecords: EcgRecord[]) => {
    setRecords(newRecords);
    localStorage.setItem("kalptakip-ecg-records", JSON.stringify(newRecords));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const validTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!validTypes.includes(file.type)) {
        toast.error(t("invalidFileType"));
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error(t("fileTooLarge"));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const newRecord: EcgRecord = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          fileName: file.name,
          fileType: file.type.startsWith("image/") ? "image" : "pdf",
          uploadDate: new Date().toISOString(),
          fileData: reader.result as string,
        };
        saveRecords([newRecord, ...records]);
        toast.success(t("fileUploaded"));
      };
      reader.readAsDataURL(file);
    });

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const deleteRecord = (id: string) => {
    const updated = records.filter((r) => r.id !== id);
    saveRecords(updated);
    toast.success(t("recordDeleted"));
  };

  const viewRecord = (record: EcgRecord) => {
    const win = window.open();
    if (win) {
      if (record.fileType === "image") {
        win.document.write(`<img src="${record.fileData}" style="max-width:100%;height:auto;" />`);
      } else {
        win.document.write(`<iframe src="${record.fileData}" style="width:100%;height:100%;border:none;"></iframe>`);
      }
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === "tr" ? "tr-TR" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-foreground">{t("ecgHistoryTitle")}</h1>
        <p className="text-muted-foreground">{t("ecgHistorySubtitle")}</p>
      </div>

      {/* Upload Card */}
      <Card className="border-dashed border-2 border-primary/30 bg-primary/5 shadow-lg">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">{t("uploadEcg")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("uploadEcgDesc")}</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="ecg-file-input"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-12 text-base"
            >
              <Upload className="w-5 h-5 mr-2" />
              {t("selectFile")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="border-none bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm opacity-90 mb-1">{t("totalEcg")}</p>
              <p className="text-3xl font-bold">{records.length}</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">{t("lastUpload")}</p>
              <p className="text-sm font-medium">
                {records.length > 0 ? formatDate(records[0].uploadDate) : t("noRecords")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div className="space-y-4">
        {records.length === 0 ? (
          <Card className="shadow-md">
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">{t("noEcgRecords")}</p>
            </CardContent>
          </Card>
        ) : (
          records.map((record) => (
            <Card key={record.id} className="shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {record.fileType === "image" ? (
                        <Image className="w-5 h-5 text-primary" />
                      ) : (
                        <File className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{record.fileName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{formatDate(record.uploadDate)}</p>
                      </div>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {record.fileType === "image" ? t("imageFile") : "PDF"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewRecord(record)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteRecord(record.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default EcgHistory;
