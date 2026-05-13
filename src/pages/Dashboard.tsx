import { Heart, TrendingUp, Activity, Settings, AlertTriangle, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DeviceConnect } from "@/components/DeviceConnect";
import { useBeatWiseDevice } from "@/hooks/useBeatWiseDevice";

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const device = useBeatWiseDevice();
  const [simulatedHeartRate, setSimulatedHeartRate] = useState(72);
  const liveAvailable = device.status === "connected" && device.fingerDetected && device.bpm > 0;
  const currentHeartRate = liveAvailable ? device.bpm : simulatedHeartRate;
  const dailyAverage = 68;
  const weeklyData = [65, 70, 68, 72, 69, 71, 68];

  const days = [t("mon"), t("tue"), t("wed"), t("thu"), t("fri"), t("sat"), t("sun")];

  const isAnomaly = currentHeartRate < 60 || currentHeartRate > 100;

  // Heart rate anomaly detection
  useEffect(() => {
    if (isAnomaly) {
      toast.error(
        `⚠️ ${t("heartRateAnomaly")}: ${currentHeartRate} bpm`,
        { duration: 8000, description: t("heartRateAnomalyDesc") }
      );

      // Check if family member notification is enabled
      const familyMember = localStorage.getItem("kalptakip-family-member");
      const notifyFamily = localStorage.getItem("kalptakip-notify-family") === "true";
      if (familyMember && notifyFamily) {
        const member = JSON.parse(familyMember);
        toast.warning(
          `📱 ${t("familyNotified")}: ${member.name}`,
          { duration: 6000, description: `${t("notifiedAt")} ${member.phone}` }
        );
      }
    }
  }, [currentHeartRate]);

  // Simulate heart rate changes (demo purposes — paused while a real device is streaming)
  useEffect(() => {
    if (liveAvailable) return;
    const interval = setInterval(() => {
      setSimulatedHeartRate(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(50, Math.min(120, prev + change));
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [liveAvailable]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome + Settings */}
      <div className="flex justify-between items-center">
        {user && (
          <p className="text-sm text-muted-foreground">
            {t("welcome")}, <span className="font-semibold text-foreground">{user.firstName}</span>
          </p>
        )}
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-secondary text-foreground rounded-lg shadow-md hover:shadow-lg transition-all border border-border"
          aria-label={t("settings")}
        >
          <Settings className="w-5 h-5 text-primary" />
          <span className="font-medium">{t("settings")}</span>
        </button>
      </div>

      {/* BLE Device */}
      <DeviceConnect />

      {/* Anomaly Alert Banner */}
      {isAnomaly && (
        <Card className="border-destructive/50 bg-destructive/10 shadow-lg animate-fade-in">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0" />
            <div>
              <p className="font-semibold text-destructive text-sm">{t("heartRateAnomaly")}</p>
              <p className="text-xs text-muted-foreground">{t("heartRateAnomalyDesc")}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hero Card - Current Heart Rate */}
      <Card className={`border-none shadow-lg ${isAnomaly
        ? "bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground"
        : "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
      }`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">{t("currentHeartRate")}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">{currentHeartRate}</span>
                <span className="text-xl opacity-90">bpm</span>
              </div>
              <p className="text-sm opacity-75 mt-2">
                {isAnomaly ? t("abnormalRange") : t("normalRange")}
              </p>
            </div>
            <Heart className={`w-20 h-20 opacity-20 ${isAnomaly ? "animate-pulse" : "animate-pulse-soft"}`} fill="currentColor" />
          </div>
        </CardContent>
      </Card>

      {/* Daily Average */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
            {t("dailyAverage")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">{dailyAverage}</span>
              <span className="text-muted-foreground">bpm</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("target")}: 60-100 bpm</span>
                <span className="text-success font-medium">%85</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trend */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="w-5 h-5 text-primary" />
            {t("weeklyTrend")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((rate, index) => {
              const progress = ((rate - 50) / 50) * 100;
              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">{days[index]}</span>
                    <span className="text-foreground font-semibold">{rate} bpm</span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">{t("min")}</p>
            <p className="text-2xl font-bold text-foreground">58</p>
            <p className="text-xs text-muted-foreground mt-1">bpm</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">{t("max")}</p>
            <p className="text-2xl font-bold text-foreground">89</p>
            <p className="text-xs text-muted-foreground mt-1">bpm</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
