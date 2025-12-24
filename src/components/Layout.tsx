import { ReactNode } from "react";
import { Heart, Activity, Users, FileText, Home } from "lucide-react";
import { NavLink } from "./NavLink";
import { useLanguage } from "@/contexts/LanguageContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t } = useLanguage();

  const navItems = [
    { to: "/", icon: Home, labelKey: "home" },
    { to: "/info", icon: Activity, labelKey: "infoCenter" },
    { to: "/doctors-appointments", icon: Users, labelKey: "doctorsAppointments" },
    { to: "/ecg", icon: FileText, labelKey: "ecgHistory" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Heart className="w-8 h-8 text-accent animate-pulse-soft" fill="currentColor" />
              <Activity className="w-4 h-4 text-primary absolute -bottom-1 -right-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("appName")}
              </h1>
              <p className="text-xs text-muted-foreground">{t("appSubtitle")}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-2">
          <div className="flex justify-around items-center py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all hover:bg-secondary"
                activeClassName="bg-primary/10 text-primary"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{t(item.labelKey)}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
