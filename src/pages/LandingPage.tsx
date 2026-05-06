import { Heart, Activity, UserPlus, LogIn, Info, Shield, Bell, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo & Title */}
        <div className="text-center space-y-4 mb-10 animate-fade-in">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-xl mx-auto">
              <Heart className="w-12 h-12 text-primary-foreground animate-pulse-soft" fill="currentColor" />
            </div>
            <Activity className="w-6 h-6 text-accent-foreground absolute -bottom-1 -right-1 bg-card rounded-full p-1 shadow-md" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            {t("appName")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-sm">
            {t("appSubtitle")}
          </p>
        </div>

        {/* Auth Buttons */}
        <div className="w-full max-w-sm space-y-4 mb-12">
          <Button
            id="btn-register"
            onClick={() => navigate("/register")}
            className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            {t("createAccount")}
          </Button>
          <Button
            id="btn-login"
            onClick={() => navigate("/login")}
            variant="outline"
            className="w-full h-14 text-lg font-semibold shadow-md hover:shadow-lg transition-all border-2"
          >
            <LogIn className="w-5 h-5 mr-2" />
            {t("loginButton")}
          </Button>
        </div>
      </div>

      {/* About Section */}
      <div className="px-6 pb-10">
        <Card className="shadow-lg border-primary/10">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">{t("aboutApp")}</h2>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("aboutAppDesc")}
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{t("aboutFeature1")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bell className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{t("aboutFeature2")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{t("aboutFeature3")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{t("aboutFeature4")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;
