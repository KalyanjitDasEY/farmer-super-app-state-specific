"use client";

import Link from "next/link";
import {
  Bell,
  CalendarDays,
  Check,
  ClipboardCheck,
  Clock3,
  Info,
  Lightbulb,
  MessageSquareText,
  Minus,
  Phone,
  Plus,
  Repeat2,
  RotateCcw,
  Smartphone,
} from "lucide-react";
import { useState } from "react";

import { useLocale } from "@/i18n/LocaleProvider";
import { localized } from "@/i18n/localized-text";

import styles from "./advisories.module.css";

const reminderHindi: Record<string, string> = {
  "Recommended Action": "अनुशंसित कार्रवाई",
  "Apply recommended fungicide to manage Leaf Blast and protect yield.":
    "पत्ती झुलसा नियंत्रित करने और उपज बचाने के लिए अनुशंसित फफूंदनाशक लगाएं।",
  "Re-assessment / Follow Up": "पुनः आकलन / फॉलो-अप",
  "Remind me to assess my crop again.":
    "मुझे फसल का फिर आकलन करने की याद दिलाएं।",
  "Custom Reminder": "कस्टम रिमाइंडर",
  "Create my own reminder.": "अपना रिमाइंडर बनाएं।",
  "Before Action (Recommended)": "कार्रवाई से पहले (अनुशंसित)",
  "Get reminded before the best time to act.":
    "कार्रवाई के सर्वोत्तम समय से पहले याद दिलाएं।",
  "On the Day of Action": "कार्रवाई के दिन",
  "Get reminded on the selected day and time.":
    "चयनित दिन और समय पर याद दिलाएं।",
  "After Action (Follow Up)": "कार्रवाई के बाद (फॉलो-अप)",
  "Get reminded after the action for follow up.":
    "फॉलो-अप के लिए कार्रवाई के बाद याद दिलाएं।",
  "App Notification": "ऐप सूचना",
  SMS: "एसएमएस",
  WhatsApp: "व्हाट्सऐप",
  "Voice Call": "वॉइस कॉल",
};

const reminderText = (value: string) =>
  localized(value, reminderHindi[value] ?? value);

const reminderChoices = [
  {
    id: "action",
    title: "Recommended Action",
    detail:
      "Apply recommended fungicide to manage Leaf Blast and protect yield.",
    icon: Bell,
  },
  {
    id: "follow-up",
    title: "Re-assessment / Follow Up",
    detail: "Remind me to assess my crop again.",
    icon: ClipboardCheck,
  },
  {
    id: "custom",
    title: "Custom Reminder",
    detail: "Create my own reminder.",
    icon: Bell,
  },
] as const;

const timingChoices = [
  {
    id: "before",
    title: "Before Action (Recommended)",
    detail: "Get reminded before the best time to act.",
    icon: Bell,
  },
  {
    id: "on-day",
    title: "On the Day of Action",
    detail: "Get reminded on the selected day and time.",
    icon: CalendarDays,
  },
  {
    id: "after",
    title: "After Action (Follow Up)",
    detail: "Get reminded after the action for follow up.",
    icon: Clock3,
  },
] as const;

const channels = [
  { id: "app", label: "App Notification", icon: Bell },
  { id: "sms", label: "SMS", icon: MessageSquareText },
  { id: "whatsapp", label: "WhatsApp", icon: Smartphone },
  { id: "voice", label: "Voice Call", icon: Phone },
] as const;

export function ReminderForm() {
  const { t } = useLocale();
  const [reminder, setReminder] = useState("action");
  const [timing, setTiming] = useState("before");
  const [hours, setHours] = useState(24);
  const [followUpDays, setFollowUpDays] = useState(3);
  const [selectedChannels, setSelectedChannels] = useState([
    "app",
    "sms",
    "whatsapp",
  ]);
  const [repeat, setRepeat] = useState(true);
  const [snooze, setSnooze] = useState(true);
  const [saved, setSaved] = useState(false);

  function toggleChannel(channel: string) {
    setSelectedChannels((current) =>
      current.includes(channel)
        ? current.filter((item) => item !== channel)
        : [...current, channel],
    );
  }

  return (
    <div className={styles.reminderForm}>
      <section className={styles.formSection}>
        <h2>
          {t(
            "1. What do you want to be reminded about?",
            "1. आप किस बारे में याद दिलाना चाहते हैं?",
          )}
        </h2>
        <div className={styles.choiceList}>
          {reminderChoices.map(({ id, title, detail, icon: Icon }) => (
            <label
              className={`${styles.choice} ${reminder === id ? styles.choiceActive : ""}`}
              key={id}
            >
              <input
                type="radio"
                name="reminder"
                checked={reminder === id}
                onChange={() => setReminder(id)}
              />
              <Icon size={24} />
              <span>
                <strong>{t(reminderText(title))}</strong>
                <small>{t(reminderText(detail))}</small>
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className={styles.formSection}>
        <h2>
          {t(
            "2. When would you like to be reminded?",
            "2. आप कब याद दिलाना चाहते हैं?",
          )}
        </h2>
        <div className={styles.choiceList}>
          {timingChoices.map(({ id, title, detail, icon: Icon }) => (
            <label
              className={`${styles.choice} ${timing === id ? styles.choiceActive : ""}`}
              key={id}
            >
              <input
                type="radio"
                name="timing"
                checked={timing === id}
                onChange={() => setTiming(id)}
              />
              <Icon size={24} />
              <span>
                <strong>{t(reminderText(title))}</strong>
                <small>{t(reminderText(detail))}</small>
              </span>
              {id === "before" ? (
                <span className={styles.stepper}>
                  <button
                    type="button"
                    aria-label={t("Decrease hours", "घंटे घटाएं")}
                    onClick={() => setHours((value) => Math.max(1, value - 1))}
                  >
                    <Minus size={16} />
                  </button>
                  <strong>
                    {hours} {t("Hours", "घंटे")}
                  </strong>
                  <button
                    type="button"
                    aria-label={t("Increase hours", "घंटे बढ़ाएं")}
                    onClick={() => setHours((value) => value + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </span>
              ) : id === "on-day" ? (
                <span className={styles.dateTime}>
                  <span>
                    {t("21 May 2024", "21 मई 2024")} <CalendarDays size={16} />
                  </span>
                  <span>
                    {t("06:00 AM", "06:00 पूर्वाह्न")} <Clock3 size={16} />
                  </span>
                </span>
              ) : (
                <span className={styles.stepper}>
                  <button
                    type="button"
                    aria-label={t("Decrease days", "दिन घटाएं")}
                    onClick={() =>
                      setFollowUpDays((value) => Math.max(1, value - 1))
                    }
                  >
                    <Minus size={16} />
                  </button>
                  <strong>
                    {followUpDays} {t("Days", "दिन")}
                  </strong>
                  <button
                    type="button"
                    aria-label={t("Increase days", "दिन बढ़ाएं")}
                    onClick={() => setFollowUpDays((value) => value + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </span>
              )}
            </label>
          ))}
        </div>
      </section>

      <section className={styles.formSection}>
        <h2>
          {t(
            "3. How would you like to be reminded?",
            "3. आप किस माध्यम से याद दिलाना चाहते हैं?",
          )}
        </h2>
        <div className={styles.channelGrid}>
          {channels.map(({ id, label, icon: Icon }) => {
            const selected = selectedChannels.includes(id);
            return (
              <button
                className={`${styles.channelButton} ${selected ? styles.channelActive : ""}`}
                type="button"
                onClick={() => toggleChannel(id)}
                aria-pressed={selected}
                key={id}
              >
                <Icon size={20} />
                {t(reminderText(label))}
                {selected ? (
                  <b>
                    <Check size={11} />
                  </b>
                ) : null}
              </button>
            );
          })}
        </div>
        <p className={styles.formHint}>
          <Info size={15} />
          {t(
            "You can change these anytime from Notification Settings in your profile.",
            "आप इन्हें अपनी प्रोफाइल की सूचना सेटिंग में कभी भी बदल सकते हैं।",
          )}
        </p>
      </section>

      <section className={styles.formSection}>
        <h2>{t("4. Additional Options", "4. अतिरिक्त विकल्प")}</h2>
        <div className={styles.toggleRows}>
          <div className={styles.toggleRow}>
            <Repeat2 size={22} />
            <span>
              <strong>{t("Repeat Reminder", "रिमाइंडर दोहराएं")}</strong>
              <small>
                {t(
                  "Repeat until I mark as done",
                  "जब तक मैं पूर्ण न करूं, दोहराएं",
                )}
              </small>
            </span>
            <button
              className={`${styles.switch} ${repeat ? styles.switchOn : ""}`}
              type="button"
              onClick={() => setRepeat((value) => !value)}
              aria-pressed={repeat}
              aria-label={t(
                "Toggle repeat reminder",
                "रिमाइंडर दोहराना चालू या बंद करें",
              )}
            >
              <i />
            </button>
          </div>
          <div className={styles.toggleRow}>
            <RotateCcw size={22} />
            <span>
              <strong>
                {t("Snooze if not acted", "कार्रवाई न हो तो स्नूज़ करें")}
              </strong>
              <small>
                {t(
                  "Remind me again if I don't mark as done",
                  "यदि मैं पूर्ण न करूं तो फिर याद दिलाएं",
                )}
              </small>
            </span>
            <button
              className={`${styles.switch} ${snooze ? styles.switchOn : ""}`}
              type="button"
              onClick={() => setSnooze((value) => !value)}
              aria-pressed={snooze}
              aria-label={t(
                "Toggle reminder snooze",
                "रिमाइंडर स्नूज़ चालू या बंद करें",
              )}
            >
              <i />
            </button>
          </div>
        </div>
        <div className={styles.suggestion}>
          <Lightbulb size={22} />
          <span>
            <strong>{t("Best Time Suggestion", "सर्वोत्तम समय सुझाव")}</strong>
            <small>
              {t(
                "Ideal time to apply based on weather forecast",
                "मौसम पूर्वानुमान के आधार पर लगाने का उचित समय",
              )}
              <br />
              {t("Tomorrow, 7:00 AM – 11:00 AM", "कल, सुबह 7:00 – 11:00 बजे")}
            </small>
          </span>
          <button
            type="button"
            onClick={() => {
              setTiming("on-day");
              setHours(24);
            }}
          >
            {t("Use Suggested Time", "सुझाया समय उपयोग करें")}
          </button>
        </div>
      </section>

      {saved ? (
        <p className={styles.successMessage} role="status">
          {t(
            "Reminder saved for the Leaf Blast advisory.",
            "पत्ती झुलसा सलाह के लिए रिमाइंडर सहेजा गया।",
          )}
        </p>
      ) : null}
      <div className={styles.formActions}>
        <Link href="/advisories/leaf-blast">{t("Cancel", "रद्द करें")}</Link>
        <button type="button" onClick={() => setSaved(true)}>
          <Bell size={19} />
          {t("Save Reminder", "रिमाइंडर सहेजें")}
        </button>
      </div>
    </div>
  );
}
