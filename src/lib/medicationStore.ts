// Local storage based medication store (will migrate to Supabase later)

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  notes: string;
  reminderTimes: string[]; // HH:mm format
  createdAt: string;
  active: boolean;
}

export interface MedicationLog {
  id: string;
  medicationId: string;
  medicationName: string;
  dosage: string;
  scheduledTime: string;
  action: "taken" | "skipped";
  actionTime: string;
  date: string; // YYYY-MM-DD
}

const MEDICATIONS_KEY = "kalptakip-medications";
const MEDICATION_LOGS_KEY = "kalptakip-medication-logs";

export const getMedications = (): Medication[] => {
  try {
    return JSON.parse(localStorage.getItem(MEDICATIONS_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveMedication = (medication: Medication) => {
  const meds = getMedications();
  const idx = meds.findIndex(m => m.id === medication.id);
  if (idx >= 0) {
    meds[idx] = medication;
  } else {
    meds.push(medication);
  }
  localStorage.setItem(MEDICATIONS_KEY, JSON.stringify(meds));
};

export const deleteMedication = (id: string) => {
  const meds = getMedications().filter(m => m.id !== id);
  localStorage.setItem(MEDICATIONS_KEY, JSON.stringify(meds));
};

export const getMedicationLogs = (): MedicationLog[] => {
  try {
    return JSON.parse(localStorage.getItem(MEDICATION_LOGS_KEY) || "[]");
  } catch {
    return [];
  }
};

export const addMedicationLog = (log: MedicationLog) => {
  const logs = getMedicationLogs();
  logs.unshift(log); // newest first
  // Keep last 500 logs
  localStorage.setItem(MEDICATION_LOGS_KEY, JSON.stringify(logs.slice(0, 500)));
};

export const getTodayLogs = (): MedicationLog[] => {
  const today = new Date().toISOString().split("T")[0];
  return getMedicationLogs().filter(l => l.date === today);
};

export const generateId = () => crypto.randomUUID();
