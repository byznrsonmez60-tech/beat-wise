import { useState } from "react";
import { Users, MapPin, Phone, Calendar, Star, Clock, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  subSpecialtyKey: string;
  hospital: string;
  location: string;
  phone: string;
  rating: number;
  experience: number;
  education: string;
}

const Doctors = () => {
  const { t, language } = useLanguage();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Prof. Dr. Mehmet Yılmaz",
      specialty: t("cardiology"),
      subSpecialtyKey: "electrophysiology",
      hospital: "Ankara Şehir Hastanesi",
      location: "Ankara",
      phone: "+90 312 XXX XX XX",
      rating: 4.8,
      experience: 25,
      education: "Hacettepe Üniversitesi Tıp Fakültesi",
    },
    {
      id: 2,
      name: "Doç. Dr. Ayşe Demir",
      specialty: t("cardiology"),
      subSpecialtyKey: "arrhythmiaPacemaker",
      hospital: "Memorial Hastanesi",
      location: "Ankara",
      phone: "+90 312 XXX XX XX",
      rating: 4.9,
      experience: 18,
      education: "Ankara Üniversitesi Tıp Fakültesi",
    },
    {
      id: 3,
      name: "Prof. Dr. Can Öztürk",
      specialty: t("cardiology"),
      subSpecialtyKey: "invasiveElectrophysiology",
      hospital: "TOBB ETÜ Hastanesi",
      location: "Ankara",
      phone: "+90 312 XXX XX XX",
      rating: 4.7,
      experience: 22,
      education: "Gazi Üniversitesi Tıp Fakültesi",
    },
    {
      id: 4,
      name: "Doç. Dr. Zeynep Kaya",
      specialty: t("cardiology"),
      subSpecialtyKey: "heartRhythmDisorders",
      hospital: "Bayındır Hastanesi",
      location: "Ankara",
      phone: "+90 312 XXX XX XX",
      rating: 4.6,
      experience: 15,
      education: "İstanbul Üniversitesi Tıp Fakültesi",
    },
  ];

  const availableTimes = ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00"];

  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        days.push(date);
      }
    }
    return days.slice(0, 5);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === "tr" ? "tr-TR" : "en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedDoctor) return;
    
    toast.success(t("bookingSuccess"), {
      description: `${selectedDoctor.name} - ${formatDate(new Date(selectedDate))} ${selectedTime}`,
    });
    setSelectedDoctor(null);
    setSelectedDate("");
    setSelectedTime("");
  };

  const openBookingModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate("");
    setSelectedTime("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-foreground">{t("doctorsTitle")}</h1>
        <p className="text-muted-foreground">{t("doctorsSubtitle")}</p>
      </div>

      <div className="space-y-4">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="shadow-md hover:shadow-lg transition-all border-t-4 border-t-primary">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
                    {doctor.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{doctor.name}</CardTitle>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-primary">{doctor.specialty}</p>
                      <Badge variant="secondary" className="text-xs">
                        {t(doctor.subSpecialtyKey)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <span className="font-semibold text-foreground">{doctor.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-foreground">{doctor.hospital}, {doctor.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-foreground">{doctor.phone}</span>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-lg p-3 space-y-1 text-sm">
                <p className="text-foreground">
                  <span className="font-semibold text-primary">{t("experience")}</span> {doctor.experience} {t("years")}
                </p>
                <p className="text-muted-foreground text-xs">{doctor.education}</p>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                onClick={() => openBookingModal(doctor)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {t("bookAppointment")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-primary">{t("aboutAppointment")}</p>
              <p className="text-foreground">{t("appointmentInfo")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Modal */}
      <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              {t("selectDateTime")}
            </DialogTitle>
          </DialogHeader>
          
          {selectedDoctor && (
            <div className="space-y-4">
              {/* Doctor Info */}
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold">
                    {selectedDoctor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{selectedDoctor.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.specialty}</p>
                    <p className="text-xs text-muted-foreground">{selectedDoctor.hospital}</p>
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {t("selectDate")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {getNextDays().map((date) => {
                    const dateStr = date.toISOString().split('T')[0];
                    return (
                      <Button
                        key={dateStr}
                        variant={selectedDate === dateStr ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedDate(dateStr);
                          setSelectedTime("");
                        }}
                        className="flex-1 min-w-[70px] text-xs"
                      >
                        {formatDate(date)}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    {t("availableTimes")}
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="text-xs"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setSelectedDoctor(null)}
                >
                  {t("cancel")}
                </Button>
                <Button 
                  className="flex-1"
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleBookAppointment}
                >
                  {t("confirmBooking")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Doctors;
