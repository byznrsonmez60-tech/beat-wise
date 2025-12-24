import { createContext, useContext, useState, ReactNode } from "react";

type Language = "tr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  tr: {
    // Settings
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
    appearance: "Görünüm",
    general: "Genel",

    // Navigation
    home: "Ana Sayfa",
    infoCenter: "Bilgi Merkezi",
    appointments: "Randevular",
    medications: "İlaçlar",
    doctors: "Doktorlar",
    doctorsAppointments: "Randevular",
    ecgHistory: "EKG Geçmişi",

    // Header
    appName: "KalpTakip",
    appSubtitle: "Kalp Ritmi Yönetim Sistemi",

    // Dashboard
    currentHeartRate: "Anlık Kalp Atışı",
    normalRange: "Normal aralıkta",
    dailyAverage: "Günlük Ortalama",
    target: "Hedef",
    weeklyTrend: "Haftalık Trend",
    min: "Min.",
    max: "Maks.",
    mon: "Pzt",
    tue: "Salı",
    wed: "Çar",
    thu: "Per",
    fri: "Cum",
    sat: "Cmt",
    sun: "Paz",

    // Info Center
    infoCenterTitle: "Bilgi Merkezi",
    infoCenterSubtitle: "Kalp ritmi bozuklukları hakkında bilgiler",
    whatIsArrhythmia: "Kalp Ritmi Bozukluğu Nedir?",
    arrhythmiaDesc: "Kalp ritmi bozukluğu (aritmi), kalbinizin çok hızlı, çok yavaş veya düzensiz atmasıdır. Kalp normalde dakikada 60-100 arası atar. Bu aralığın dışındaki atışlar veya düzensiz atışlar aritmi olarak değerlendirilir.",
    importantNote: "Önemli Not:",
    importantNoteDesc: "Her kalp ritmi bozukluğu tehlikeli değildir, ancak bazıları ciddi sağlık sorunlarına yol açabilir. Düzenli takip ve doktor kontrolü önemlidir.",
    aboutQtInterval: "QT Aralığı Hakkında",
    longQtSyndrome: "Uzun QT Sendromu",
    longQtDesc: "Uzun QT sendromu, EKG'de QT aralığının normalden uzun olduğu bir durumdur. Bu durum kalbin elektriksel aktivitesini etkiler ve bazı durumlarda tehlikeli ritim bozukluklarına yol açabilir.",
    shortQtSyndrome: "Kısa QT Sendromu",
    shortQtDesc: "Kısa QT sendromu, EKG'de QT aralığının normalden kısa olduğu nadir bir durumdur. Bu sendrom da kalbin elektriksel aktivitesini etkiler ve atriyal fibrilasyon gibi ritim bozukluklarına yol açabilir.",
    symptoms: "Belirtiler:",
    suddenFainting: "Ani bayılma",
    palpitation: "Çarpıntı hissi",
    seizureLikeAttacks: "Nöbet benzeri ataklar",
    suddenCardiacArrest: "Ani kalp durması riski",
    dizziness: "Baş dönmesi",
    shortnessOfBreath: "Nefes darlığı",
    treatmentManagement: "Tedavi ve Yönetim",
    treatmentDesc: "QT sendromlarının yönetimi kişiye özeldir ve mutlaka bir kardiyolog tarafından planlanmalıdır. Tedavi seçenekleri arasında:",
    drugTherapy: "İlaç tedavisi (Beta-blokerler vb.)",
    lifestyleChanges: "Yaşam tarzı değişiklikleri",
    avoidRiskyDrugs: "Riskli ilaçlardan kaçınma",
    icdImplant: "İmplante edilebilir defibrilatör (ICD) takılması",
    regularCheckup: "Düzenli doktor kontrolü ve EKG takibi",

    // Appointments
    appointmentsTitle: "Randevular",
    appointmentsSubtitle: "Yaklaşan ve geçmiş randevularınız",
    upcomingAppointments: "Yaklaşan Randevular",
    pastAppointments: "Geçmiş Randevular",
    active: "Aktif",
    completed: "Tamamlandı",
    setReminder: "Hatırlatıcı Ayarla",
    cardiology: "Kardiyoloji",

    // Medications
    medicationsTitle: "İlaç Uyarıları",
    medicationsSubtitle: "Kullanımı riskli ilaçlar",
    importantWarning: "Önemli Uyarı",
    medicationWarningDesc: "Aşağıdaki ilaçlar kalp ritmi bozukluğu olan hastalar için riskli olabilir. Herhangi bir ilaç kullanmadan önce mutlaka doktorunuza danışın.",
    high: "Yüksek",
    mediumHigh: "Orta-Yüksek",
    medium: "Orta",
    reason: "Sebep:",
    reminder: "Hatırlatma:",
    reminderItem1: "Yeni bir ilaç başlamadan önce doktorunuza mutlaka bildirin",
    reminderItem2: "Reçetesiz ilaçlar bile risk oluşturabilir",
    reminderItem3: "Bu liste tüm riskli ilaçları içermeyebilir",
    reminderItem4: "İlaç etkileşimleri kişiye göre değişebilir",
    macrolideAntibiotics: "Makrolid Antibiyotikler",
    antiarrhythmicDrugs: "Antiaritmik İlaçlar",
    antipsychoticDrugs: "Antipsikotik İlaçlar",
    someAntidepressants: "Bazı Antidepresanlar",
    antihistamines: "Antihistaminikler",
    antimalarialDrugs: "Antimalaryal İlaçlar",
    mayExtendQt: "QT aralığını uzatabilir",
    directHeartEffect: "Kalp ritmi üzerinde direkt etki",
    qtExtensionRisk: "QT uzaması riski",
    highDoseQtExtension: "Yüksek dozlarda QT uzaması",
    cardiacSideEffects: "Kardiyak yan etkiler",
    qtIntervalEffects: "QT aralığı etkileri",

    // Doctors
    doctorsTitle: "Kardiyoloji Uzmanları",
    doctorsSubtitle: "Kalp ritmi bozuklukları konusunda uzman doktorlar",
    experience: "Deneyim:",
    bookAppointment: "Randevu Al",
    aboutAppointment: "Randevu Hakkında",
    appointmentInfo: "Randevu almak için doktor kartında bulunan \"Randevu Al\" butonuna tıklayabilir veya doğrudan hastane telefon numarasını arayabilirsiniz.",
    years: "yıl",
    electrophysiology: "Elektrofizyoloji",
    arrhythmiaPacemaker: "Aritmi ve Pacemaker",
    invasiveElectrophysiology: "İnvaziv Elektrofizyoloji",
    heartRhythmDisorders: "Kalp Ritmi Bozuklukları",

    // ECG History
    ecgHistoryTitle: "EKG Geçmişi",
    ecgHistorySubtitle: "Elektrokardiyogram kayıtlarınız",
    totalEcg: "Toplam EKG",
    lastQt: "Son QT",
    ecgRecord: "EKG Kaydı",
    normal: "Normal",
    mildExtension: "Hafif Uzama",
    date: "Tarih",
    time: "Saat",
    qtInterval: "QT Aralığı",
    heartRate: "Kalp Atışı",
    doctor: "Doktor",
    notes: "Notlar:",
    downloadEcgReport: "EKG Raporunu İndir",
  },
  en: {
    // Settings
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
    appearance: "Appearance",
    general: "General",

    // Navigation
    home: "Home",
    infoCenter: "Info Center",
    appointments: "Appointments",
    medications: "Medications",
    doctors: "Doctors",
    doctorsAppointments: "Doctors & Appointments",
    ecgHistory: "ECG History",

    // Header
    appName: "HeartTrack",
    appSubtitle: "Heart Rhythm Management System",

    // Dashboard
    currentHeartRate: "Current Heart Rate",
    normalRange: "Within normal range",
    dailyAverage: "Daily Average",
    target: "Target",
    weeklyTrend: "Weekly Trend",
    min: "Min.",
    max: "Max.",
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    sun: "Sun",

    // Info Center
    infoCenterTitle: "Info Center",
    infoCenterSubtitle: "Information about heart rhythm disorders",
    whatIsArrhythmia: "What is Heart Rhythm Disorder?",
    arrhythmiaDesc: "Heart rhythm disorder (arrhythmia) is when your heart beats too fast, too slow, or irregularly. The heart normally beats 60-100 times per minute. Beats outside this range or irregular beats are considered arrhythmia.",
    importantNote: "Important Note:",
    importantNoteDesc: "Not all heart rhythm disorders are dangerous, but some can lead to serious health problems. Regular monitoring and doctor check-ups are important.",
    aboutQtInterval: "About QT Interval",
    longQtSyndrome: "Long QT Syndrome",
    longQtDesc: "Long QT syndrome is a condition where the QT interval on the ECG is longer than normal. This condition affects the heart's electrical activity and can lead to dangerous rhythm disorders in some cases.",
    shortQtSyndrome: "Short QT Syndrome",
    shortQtDesc: "Short QT syndrome is a rare condition where the QT interval on the ECG is shorter than normal. This syndrome also affects the heart's electrical activity and can lead to rhythm disorders such as atrial fibrillation.",
    symptoms: "Symptoms:",
    suddenFainting: "Sudden fainting",
    palpitation: "Palpitations",
    seizureLikeAttacks: "Seizure-like attacks",
    suddenCardiacArrest: "Risk of sudden cardiac arrest",
    dizziness: "Dizziness",
    shortnessOfBreath: "Shortness of breath",
    treatmentManagement: "Treatment and Management",
    treatmentDesc: "Management of QT syndromes is personalized and must be planned by a cardiologist. Treatment options include:",
    drugTherapy: "Drug therapy (Beta-blockers, etc.)",
    lifestyleChanges: "Lifestyle changes",
    avoidRiskyDrugs: "Avoiding risky medications",
    icdImplant: "Implantable cardioverter-defibrillator (ICD) implantation",
    regularCheckup: "Regular doctor check-ups and ECG monitoring",

    // Appointments
    appointmentsTitle: "Appointments",
    appointmentsSubtitle: "Your upcoming and past appointments",
    upcomingAppointments: "Upcoming Appointments",
    pastAppointments: "Past Appointments",
    active: "Active",
    completed: "Completed",
    setReminder: "Set Reminder",
    cardiology: "Cardiology",

    // Medications
    medicationsTitle: "Medication Warnings",
    medicationsSubtitle: "Risky medications",
    importantWarning: "Important Warning",
    medicationWarningDesc: "The following medications may be risky for patients with heart rhythm disorders. Always consult your doctor before using any medication.",
    high: "High",
    mediumHigh: "Medium-High",
    medium: "Medium",
    reason: "Reason:",
    reminder: "Reminder:",
    reminderItem1: "Always inform your doctor before starting a new medication",
    reminderItem2: "Even over-the-counter medications can pose risks",
    reminderItem3: "This list may not include all risky medications",
    reminderItem4: "Drug interactions can vary from person to person",
    macrolideAntibiotics: "Macrolide Antibiotics",
    antiarrhythmicDrugs: "Antiarrhythmic Drugs",
    antipsychoticDrugs: "Antipsychotic Drugs",
    someAntidepressants: "Some Antidepressants",
    antihistamines: "Antihistamines",
    antimalarialDrugs: "Antimalarial Drugs",
    mayExtendQt: "May extend QT interval",
    directHeartEffect: "Direct effect on heart rhythm",
    qtExtensionRisk: "QT extension risk",
    highDoseQtExtension: "QT extension at high doses",
    cardiacSideEffects: "Cardiac side effects",
    qtIntervalEffects: "QT interval effects",

    // Doctors
    doctorsTitle: "Cardiology Specialists",
    doctorsSubtitle: "Expert doctors in heart rhythm disorders",
    experience: "Experience:",
    bookAppointment: "Book Appointment",
    aboutAppointment: "About Appointments",
    appointmentInfo: "To book an appointment, you can click the \"Book Appointment\" button on the doctor card or call the hospital phone number directly.",
    years: "years",
    electrophysiology: "Electrophysiology",
    arrhythmiaPacemaker: "Arrhythmia and Pacemaker",
    invasiveElectrophysiology: "Invasive Electrophysiology",
    heartRhythmDisorders: "Heart Rhythm Disorders",

    // ECG History
    ecgHistoryTitle: "ECG History",
    ecgHistorySubtitle: "Your electrocardiogram records",
    totalEcg: "Total ECG",
    lastQt: "Last QT",
    ecgRecord: "ECG Record",
    normal: "Normal",
    mildExtension: "Mild Extension",
    date: "Date",
    time: "Time",
    qtInterval: "QT Interval",
    heartRate: "Heart Rate",
    doctor: "Doctor",
    notes: "Notes:",
    downloadEcgReport: "Download ECG Report",
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
