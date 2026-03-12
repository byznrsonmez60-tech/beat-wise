// Web Notifications API utility for medication and appointment reminders

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const permission = await Notification.requestPermission();
  return permission === "granted";
};

export const sendNotification = (title: string, body: string, icon?: string) => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: icon || "/favicon.ico",
      badge: "/favicon.ico",
      vibrate: [200, 100, 200],
    });
  }
};

interface ScheduledReminder {
  id: string;
  type: "medication" | "appointment";
  title: string;
  body: string;
  scheduledTime: string; // ISO string
  fired: boolean;
}

const REMINDERS_KEY = "kalptakip-reminders";

export const getReminders = (): ScheduledReminder[] => {
  try {
    return JSON.parse(localStorage.getItem(REMINDERS_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveReminder = (reminder: ScheduledReminder) => {
  const reminders = getReminders();
  reminders.push(reminder);
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
};

export const removeReminder = (id: string) => {
  const reminders = getReminders().filter(r => r.id !== id);
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
};

export const markReminderFired = (id: string) => {
  const reminders = getReminders().map(r =>
    r.id === id ? { ...r, fired: true } : r
  );
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
};

// Check and fire due reminders - call this periodically
export const checkAndFireReminders = () => {
  const now = new Date();
  const reminders = getReminders();
  
  reminders.forEach(reminder => {
    if (reminder.fired) return;
    const scheduledTime = new Date(reminder.scheduledTime);
    if (scheduledTime <= now) {
      sendNotification(reminder.title, reminder.body);
      markReminderFired(reminder.id);
    }
  });
};

// Schedule daily medication reminders
export const scheduleMedicationReminders = (
  medicationId: string,
  medicationName: string,
  dosage: string,
  times: string[], // HH:mm format
  language: "tr" | "en"
) => {
  // Remove existing reminders for this medication
  const existing = getReminders().filter(r => !r.id.startsWith(`med-${medicationId}`));
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(existing));

  const today = new Date();
  times.forEach((time, idx) => {
    const [hours, minutes] = time.split(":").map(Number);
    const scheduledTime = new Date(today);
    scheduledTime.setHours(hours, minutes, 0, 0);
    
    // If time has passed today, schedule for tomorrow
    if (scheduledTime <= today) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const title = language === "tr" ? "💊 İlaç Hatırlatıcı" : "💊 Medication Reminder";
    const body = language === "tr"
      ? `${medicationName} - ${dosage} alma zamanı!`
      : `Time to take ${medicationName} - ${dosage}!`;

    saveReminder({
      id: `med-${medicationId}-${idx}`,
      type: "medication",
      title,
      body,
      scheduledTime: scheduledTime.toISOString(),
      fired: false,
    });
  });
};

// Schedule appointment reminder
export const scheduleAppointmentReminder = (
  appointmentId: string,
  doctorName: string,
  dateTime: Date,
  minutesBefore: number,
  language: "tr" | "en"
) => {
  const reminderTime = new Date(dateTime.getTime() - minutesBefore * 60 * 1000);
  
  const title = language === "tr" ? "📅 Randevu Hatırlatıcı" : "📅 Appointment Reminder";
  const timeStr = language === "tr"
    ? `${minutesBefore} dakika sonra`
    : `in ${minutesBefore} minutes`;
  const body = language === "tr"
    ? `${doctorName} ile randevunuz ${timeStr}!`
    : `Your appointment with ${doctorName} is ${timeStr}!`;

  saveReminder({
    id: `apt-${appointmentId}`,
    type: "appointment",
    title,
    body,
    scheduledTime: reminderTime.toISOString(),
    fired: false,
  });
};
