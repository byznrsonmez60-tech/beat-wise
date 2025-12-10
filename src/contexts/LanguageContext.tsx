import { createContext, useContext, useState, ReactNode } from "react";

type Language = "tr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  tr: {
    settings: "Ayarlar",
    theme: "Tema",
    language: "Dil",
    light: "Açık",
    dark: "Koyu",
    system: "Sistem",
    turkish: "Türkçe",
    english: "İngilizce",
    themeDescription: "Uygulama temasını seçin",
    languageDescription: "Uygulama dilini seçin",
    home: "Ana Sayfa",
    infoCenter: "Bilgi Merkezi",
    appointments: "Randevular",
    medications: "İlaçlar",
    doctors: "Doktorlar",
    ecgHistory: "EKG Geçmişi",
    appearance: "Görünüm",
    general: "Genel",
  },
  en: {
    settings: "Settings",
    theme: "Theme",
    language: "Language",
    light: "Light",
    dark: "Dark",
    system: "System",
    turkish: "Turkish",
    english: "English",
    themeDescription: "Select application theme",
    languageDescription: "Select application language",
    home: "Home",
    infoCenter: "Info Center",
    appointments: "Appointments",
    medications: "Medications",
    doctors: "Doctors",
    ecgHistory: "ECG History",
    appearance: "Appearance",
    general: "General",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("kalptakip-language");
    return (stored as Language) || "tr";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("kalptakip-language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
