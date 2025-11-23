import { Users, MapPin, Phone, Calendar, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Doctors = () => {
  const doctors = [
    {
      id: 1,
      name: "Prof. Dr. Mehmet Yılmaz",
      specialty: "Kardiyoloji",
      subSpecialty: "Elektrofizyoloji",
      hospital: "Ankara Şehir Hastanesi",
      location: "Ankara",
      phone: "+90 312 XXX XX XX",
      rating: 4.8,
      experience: "25 yıl",
      education: "Hacettepe Üniversitesi Tıp Fakültesi",
    },
    {
      id: 2,
      name: "Doç. Dr. Ayşe Demir",
      specialty: "Kardiyoloji",
      subSpecialty: "Aritmi ve Pacemaker",
      hospital: "Memorial Hastanesi",
      location: "Ankara",
      phone: "+90 312 XXX XX XX",
      rating: 4.9,
      experience: "18 yıl",
      education: "Ankara Üniversitesi Tıp Fakültesi",
    },
    {
      id: 3,
      name: "Prof. Dr. Can Öztürk",
      specialty: "Kardiyoloji",
      subSpecialty: "İnvaziv Elektrofizyoloji",
      hospital: "TOBB ETÜ Hastanesi",
      location: "Ankara",
      phone: "+90 312 XXX XX XX",
      rating: 4.7,
      experience: "22 yıl",
      education: "Gazi Üniversitesi Tıp Fakültesi",
    },
    {
      id: 4,
      name: "Doç. Dr. Zeynep Kaya",
      specialty: "Kardiyoloji",
      subSpecialty: "Kalp Ritmi Bozuklukları",
      hospital: "Bayındır Hastanesi",
      location: "Ankara",
      phone: "+90 312 XXX XX XX",
      rating: 4.6,
      experience: "15 yıl",
      education: "İstanbul Üniversitesi Tıp Fakültesi",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-foreground">Kardiyoloji Uzmanları</h1>
        <p className="text-muted-foreground">Kalp ritmi bozuklukları konusunda uzman doktorlar</p>
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
                        {doctor.subSpecialty}
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
                  <span className="font-semibold text-primary">Deneyim:</span> {doctor.experience}
                </p>
                <p className="text-muted-foreground text-xs">{doctor.education}</p>
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <Calendar className="w-4 h-4 mr-2" />
                Randevu Al
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
              <p className="font-semibold text-primary">Randevu Hakkında</p>
              <p className="text-foreground">
                Randevu almak için doktor kartında bulunan "Randevu Al" butonuna tıklayabilir 
                veya doğrudan hastane telefon numarasını arayabilirsiniz.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Doctors;
