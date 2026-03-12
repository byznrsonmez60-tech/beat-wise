import { useState, useEffect } from "react";
import { Pill, Plus, Clock, Check, X, Trash2, Bell, History, Edit2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import {
  getMedications,
  saveMedication,
  deleteMedication,
  getMedicationLogs,
  addMedicationLog,
  getTodayLogs,
  generateId,
  Medication,
  MedicationLog,
} from "@/lib/medicationStore";
import {
  requestNotificationPermission,
  scheduleMedicationReminders,
} from "@/lib/notifications";

const MedicationReminders = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [todayLogs, setTodayLogs] = useState<MedicationLog[]>([]);
  const [allLogs, setAllLogs] = useState<MedicationLog[]>([]);
  const [activeTab, setActiveTab] = useState<"medications" | "history">("medications");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingMed, setEditingMed] = useState<Medication | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formDosage, setFormDosage] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formTimes, setFormTimes] = useState<string[]>(["08:00"]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setMedications(getMedications());
    setTodayLogs(getTodayLogs());
    setAllLogs(getMedicationLogs());
  };

  const resetForm = () => {
    setFormName("");
    setFormDosage("");
    setFormNotes("");
    setFormTimes(["08:00"]);
    setEditingMed(null);
  };

  const openEditDialog = (med: Medication) => {
    setEditingMed(med);
    setFormName(med.name);
    setFormDosage(med.dosage);
    setFormNotes(med.notes);
    setFormTimes(med.reminderTimes.length > 0 ? med.reminderTimes : ["08:00"]);
    setShowAddDialog(true);
  };

  const handleSaveMedication = async () => {
    if (!formName.trim() || !formDosage.trim()) return;

    const med: Medication = {
      id: editingMed?.id || generateId(),
      name: formName.trim(),
      dosage: formDosage.trim(),
      notes: formNotes.trim(),
      reminderTimes: formTimes.filter(t => t),
      createdAt: editingMed?.createdAt || new Date().toISOString(),
      active: true,
    };

    saveMedication(med);

    // Schedule notifications
    if (med.reminderTimes.length > 0) {
      await requestNotificationPermission();
      scheduleMedicationReminders(med.id, med.name, med.dosage, med.reminderTimes, language);
    }

    toast({
      title: editingMed ? t("medUpdated") : t("medAdded"),
      description: `${med.name} - ${med.dosage}`,
    });

    resetForm();
    setShowAddDialog(false);
    loadData();
  };

  const handleDeleteMedication = (id: string) => {
    deleteMedication(id);
    toast({ title: t("medDeleted") });
    loadData();
  };

  const handleAction = (med: Medication, time: string, action: "taken" | "skipped") => {
    const log: MedicationLog = {
      id: generateId(),
      medicationId: med.id,
      medicationName: med.name,
      dosage: med.dosage,
      scheduledTime: time,
      action,
      actionTime: new Date().toISOString(),
      date: new Date().toISOString().split("T")[0],
    };
    addMedicationLog(log);
    toast({
      title: action === "taken" ? `✅ ${t("markedTaken")}` : `⏭️ ${t("markedSkipped")}`,
      description: `${med.name} - ${time}`,
    });
    loadData();
  };

  const isTimeLogged = (medId: string, time: string) => {
    return todayLogs.some(l => l.medicationId === medId && l.scheduledTime === time);
  };

  const getLogForTime = (medId: string, time: string) => {
    return todayLogs.find(l => l.medicationId === medId && l.scheduledTime === time);
  };

  const addTimeSlot = () => {
    setFormTimes([...formTimes, "12:00"]);
  };

  const removeTimeSlot = (index: number) => {
    if (formTimes.length > 1) {
      setFormTimes(formTimes.filter((_, i) => i !== index));
    }
  };

  const updateTimeSlot = (index: number, value: string) => {
    const updated = [...formTimes];
    updated[index] = value;
    setFormTimes(updated);
  };

  const formatLogDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === "tr" ? "tr-TR" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatLogTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString(language === "tr" ? "tr-TR" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-foreground">{t("medRemindersTitle")}</h1>
        <p className="text-muted-foreground">{t("medRemindersSubtitle")}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-secondary/30 rounded-lg">
        <button
          onClick={() => setActiveTab("medications")}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
            activeTab === "medications"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Pill className="w-5 h-5" />
            <span>{t("myMedications")}</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
            activeTab === "history"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <History className="w-5 h-5" />
            <span>{t("medHistory")}</span>
          </div>
        </button>
      </div>

      {/* Medications Tab */}
      {activeTab === "medications" && (
        <div className="space-y-4">
          {/* Add Medication Button */}
          <Dialog open={showAddDialog} onOpenChange={(open) => {
            setShowAddDialog(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-primary to-primary/80">
                <Plus className="w-4 h-4 mr-2" />
                {t("addMedication")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingMed ? t("editMedication") : t("addMedication")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-foreground">{t("medName")}</label>
                  <Input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder={t("medNamePlaceholder")}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">{t("medDosage")}</label>
                  <Input
                    value={formDosage}
                    onChange={(e) => setFormDosage(e.target.value)}
                    placeholder={t("medDosagePlaceholder")}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">{t("medNotes")}</label>
                  <Textarea
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder={t("medNotesPlaceholder")}
                    className="mt-1"
                    rows={2}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-foreground">{t("reminderTimes")}</label>
                    <Button variant="ghost" size="sm" onClick={addTimeSlot}>
                      <Plus className="w-4 h-4 mr-1" />
                      {t("addTime")}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formTimes.map((time, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => updateTimeSlot(idx, e.target.value)}
                          className="flex-1"
                        />
                        {formTimes.length > 1 && (
                          <Button variant="ghost" size="icon" onClick={() => removeTimeSlot(idx)}>
                            <X className="w-4 h-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" onClick={() => { setShowAddDialog(false); resetForm(); }}>
                    {t("cancel")}
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleSaveMedication}
                    disabled={!formName.trim() || !formDosage.trim()}
                  >
                    {editingMed ? t("save") : t("addMedication")}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Medication Cards */}
          {medications.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <Pill className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">{t("noMedications")}</p>
              </CardContent>
            </Card>
          ) : (
            medications.map((med) => (
              <Card key={med.id} className="shadow-md border-t-4 border-t-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Pill className="w-5 h-5 text-primary" />
                        {med.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{med.dosage}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(med)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteMedication(med.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {med.notes && (
                    <p className="text-sm text-muted-foreground bg-secondary/30 p-2 rounded-md">{med.notes}</p>
                  )}

                  {/* Today's Schedule */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                      <Bell className="w-4 h-4 text-primary" />
                      {t("todaySchedule")}
                    </p>
                    {med.reminderTimes.map((time) => {
                      const log = getLogForTime(med.id, time);
                      const logged = !!log;
                      return (
                        <div key={time} className="flex items-center justify-between bg-secondary/20 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="font-medium text-foreground">{time}</span>
                            {logged && (
                              <Badge
                                variant={log.action === "taken" ? "default" : "secondary"}
                                className={log.action === "taken" ? "bg-success text-success-foreground" : ""}
                              >
                                {log.action === "taken" ? t("taken") : t("skipped")}
                              </Badge>
                            )}
                          </div>
                          {!logged && (
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="default"
                                className="bg-success hover:bg-success/90 text-success-foreground"
                                onClick={() => handleAction(med, time, "taken")}
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAction(med, time, "skipped")}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="space-y-4">
          {allLogs.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <History className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">{t("noHistory")}</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Group by date */}
              {Object.entries(
                allLogs.reduce<Record<string, MedicationLog[]>>((groups, log) => {
                  const date = log.date;
                  if (!groups[date]) groups[date] = [];
                  groups[date].push(log);
                  return groups;
                }, {})
              ).map(([date, logs]) => (
                <div key={date} className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {formatLogDate(date + "T00:00:00")}
                  </h3>
                  {logs.map((log) => (
                    <Card key={log.id} className="shadow-sm">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              log.action === "taken"
                                ? "bg-success/20 text-success"
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {log.action === "taken" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="font-medium text-sm text-foreground">{log.medicationName}</p>
                              <p className="text-xs text-muted-foreground">{log.dosage} • {log.scheduledTime}</p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatLogTime(log.actionTime)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicationReminders;
