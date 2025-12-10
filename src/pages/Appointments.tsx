import { Calendar, Clock, MapPin, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Appointments = () => {
  const { t, language } = useLanguage();

  const appointments = [
    {
      id: 1,
      doctor: "Prof. Dr. Mehmet Yılmaz",
      specialty: t("cardiology"),
      date: "2024-11-25",
      time: "14:30",
      location: "Ankara Şehir Hastanesi",
      status: "upcoming",
    },
    {
      id: 2,
      doctor: "Doç. Dr. Ayşe Demir",
      specialty: t("cardiology"),
      date: "2024-12-10",
      time: "10:00",
      location: "Memorial Hastanesi",
      status: "upcoming",
    },
    {
      id: 3,
      doctor: "Prof. Dr. Mehmet Yılmaz",
      specialty: t("cardiology"),
      date: "2024-11-15",
      time: "15:00",
      location: "Ankara Şehir Hastanesi",
      status: "completed",
    },
  ];

  const upcomingAppointments = appointments.filter(a => a.status === "upcoming");
  const pastAppointments = appointments.filter(a => a.status === "completed");

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
        <h1 className="text-3xl font-bold text-foreground">{t("appointmentsTitle")}</h1>
        <p className="text-muted-foreground">{t("appointmentsSubtitle")}</p>
      </div>

      {/* Upcoming Appointments */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          {t("upcomingAppointments")}
        </h2>
        {upcomingAppointments.map((appointment) => (
          <Card key={appointment.id} className="shadow-md hover:shadow-lg transition-all border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg mb-1">{appointment.doctor}</CardTitle>
                  <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                </div>
                <Badge variant="default" className="bg-primary">
                  {t("active")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">{formatDate(appointment.date)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-foreground">{appointment.time}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-foreground">{appointment.location}</span>
              </div>
              <Button className="w-full mt-2" variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                {t("setReminder")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Past Appointments */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          {t("pastAppointments")}
        </h2>
        {pastAppointments.map((appointment) => (
          <Card key={appointment.id} className="shadow-sm border-l-4 border-l-muted opacity-75">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg mb-1">{appointment.doctor}</CardTitle>
                  <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                </div>
                <Badge variant="secondary">{t("completed")}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{formatDate(appointment.date)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{appointment.time}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
