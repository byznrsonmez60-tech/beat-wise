import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sun, Moon, Monitor, Globe, Palette } from "lucide-react";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("settings")}</h1>
        <p className="text-muted-foreground">{t("general")}</p>
      </div>

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
    </div>
  );
};

export default Settings;
