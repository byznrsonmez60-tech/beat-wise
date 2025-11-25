import { Heart, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const currentHeartRate = 72;
  const dailyAverage = 68;
  const weeklyData = [65, 70, 68, 72, 69, 71, 68];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Card - Current Heart Rate */}
      <Card className="border-none bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Anlık Kalp Atışı</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">{currentHeartRate}</span>
                <span className="text-xl opacity-90">bpm</span>
              </div>
              <p className="text-sm opacity-75 mt-2">Normal aralıkta</p>
            </div>
            <Heart className="w-20 h-20 opacity-20 animate-pulse-soft" fill="currentColor" />
          </div>
        </CardContent>
      </Card>

      {/* Daily Average */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
            Günlük Ortalama
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
                <span className="text-muted-foreground">Hedef: 60-80 bpm</span>
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
            Haftalık Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((rate, index) => {
              const days = ["Pzt", "Salı", "Çar", "Per", "Cum", "Cmt", "Paz"];
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
            <p className="text-sm text-muted-foreground mb-1">Min.</p>
            <p className="text-2xl font-bold text-foreground">58</p>
            <p className="text-xs text-muted-foreground mt-1">bpm</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Maks.</p>
            <p className="text-2xl font-bold text-foreground">89</p>
            <p className="text-xs text-muted-foreground mt-1">bpm</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
