import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Monitor, Globe, Palette, Users, Bell, LogOut, Save } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Family member state
  const [familyName, setFamilyName] = useState("");
  const [familyPhone, setFamilyPhone] = useState("");
  const [notifyFamily, setNotifyFamily] = useState(false);

  // Load saved family member
  useEffect(() => {
    const stored = localStorage.getItem("kalptakip-family-member");
    if (stored) {
      const member = JSON.parse(stored);
      setFamilyName(member.name);
      setFamilyPhone(member.phone);
    }
    setNotifyFamily(localStorage.getItem("kalptakip-notify-family") === "true");
  }, []);

  const saveFamilyMember = () => {
    if (!familyName.trim() || !familyPhone.trim()) {
      toast.error(t("fillAllFields"));
      return;
    }
    localStorage.setItem("kalptakip-family-member", JSON.stringify({ name: familyName, phone: familyPhone }));
    localStorage.setItem("kalptakip-notify-family", String(notifyFamily));
    toast.success(t("familySaved"));
  };

  const handleNotifyToggle = (checked: boolean) => {
    setNotifyFamily(checked);
    localStorage.setItem("kalptakip-notify-family", String(checked));
  };

  const handleLogout = () => {
    logout();
    navigate("/landing");
    toast.success(t("logoutSuccess"));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("settings")}</h1>
        <p className="text-muted-foreground">{t("general")}</p>
      </div>

      {/* User Info */}
      {user && (
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">{user.firstName.charAt(0)}</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-muted-foreground">{user.phone}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            {t("appearance")}
          </CardTitle>
          <CardDescription>{t("themeDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme" className="flex items-center gap-2">
              {theme === "light" && <Sun className="w-4 h-4" />}
              {theme === "dark" && <Moon className="w-4 h-4" />}
              {theme === "system" && <Monitor className="w-4 h-4" />}
              {t("theme")}
            </Label>
            <Select value={theme} onValueChange={(value: "light" | "dark" | "system") => setTheme(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("theme")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    {t("light")}
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    {t("dark")}
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    {t("system")}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            {t("language")}
          </CardTitle>
          <CardDescription>{t("languageDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="language">{t("language")}</Label>
            <Select value={language} onValueChange={(value: "tr" | "en") => setLanguage(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("language")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tr">
                  <div className="flex items-center gap-2">
                    🇹🇷 {t("turkish")}
                  </div>
                </SelectItem>
                <SelectItem value="en">
                  <div className="flex items-center gap-2">
                    🇬🇧 {t("english")}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Family Member Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            {t("defineFamilyMember")}
          </CardTitle>
          <CardDescription>{t("familyMemberDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="familyName">{t("familyMemberName")}</Label>
            <Input
              id="familyName"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              placeholder={t("familyNamePlaceholder")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="familyPhone">{t("familyMemberPhone")}</Label>
            <Input
              id="familyPhone"
              type="tel"
              value={familyPhone}
              onChange={(e) => setFamilyPhone(e.target.value)}
              placeholder="05XX XXX XX XX"
            />
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              <Label htmlFor="notifyFamily">{t("anomalyNotification")}</Label>
            </div>
            <Switch
              id="notifyFamily"
              checked={notifyFamily}
              onCheckedChange={handleNotifyToggle}
            />
          </div>
          <Button onClick={saveFamilyMember} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {t("saveFamilyMember")}
          </Button>
        </CardContent>
      </Card>

      {/* Logout */}
      <Card className="border-destructive/30">
        <CardContent className="p-4">
          <Button
            id="btn-logout"
            variant="destructive"
            onClick={handleLogout}
            className="w-full h-12 text-base font-semibold"
          >
            <LogOut className="w-5 h-5 mr-2" />
            {t("logout")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
