import { useState } from "react";
import { Users, MapPin, Phone, Calendar, Star, Clock, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const DoctorsAppointments = () => {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState<"doctors" | "appointments">("doctors");

    const doctors = [
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
                <h1 className="text-3xl font-bold text-foreground">
                    {activeTab === "doctors" ? t("doctorsTitle") : t("appointmentsTitle")}
                </h1>
                <p className="text-muted-foreground">
                    {activeTab === "doctors" ? t("doctorsSubtitle") : t("appointmentsSubtitle")}
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 p-1 bg-secondary/30 rounded-lg">
                <button
                    onClick={() => setActiveTab("doctors")}
                    className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${activeTab === "doctors"
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Users className="w-5 h-5" />
                        <span>{t("doctors")}</span>
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab("appointments")}
                    className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${activeTab === "appointments"
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>{t("appointments")}</span>
                    </div>
                </button>
            </div>

            {/* Doctors Tab Content */}
            {activeTab === "doctors" && (
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

                                <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {t("bookAppointment")}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}

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
                </div>
            )}

            {/* Appointments Tab Content */}
            {activeTab === "appointments" && (
                <div className="space-y-6">
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
            )}
        </div>
    );
};

export default DoctorsAppointments;
