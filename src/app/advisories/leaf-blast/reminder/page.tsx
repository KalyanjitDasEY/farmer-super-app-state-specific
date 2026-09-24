import { ServiceImage as Image } from "@/components/media/ServiceImage";
import { Bell } from "lucide-react";

import {
  AdvisoryContext,
  AdvisoryHeader,
} from "@/features/advisories/components/advisory-components";
import styles from "@/features/advisories/components/advisories.module.css";
import { ReminderForm } from "@/features/advisories/components/reminder-form";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export default async function AdvisoryReminderPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <AdvisoryHeader
        title={t("Reminder Setup", "रिमाइंडर सेटअप")}
        subtitle={t(
          "Never miss the right action at the right time",
          "सही समय पर सही कार्रवाई कभी न चूकें",
        )}
        backHref="/advisories/leaf-blast"
      />
      <AdvisoryContext reminder />

      <section className={styles.reminderBanner}>
        <span className={styles.reminderBell}>
          <Bell size={30} />
        </span>
        <span>
          <h2>
            {t(
              "Stay on track with smart reminders",
              "स्मार्ट रिमाइंडर से समय पर बने रहें",
            )}
          </h2>
          <p>
            {t(
              "Set a reminder for this advisory action and we will alert you before the recommended time.",
              "इस सलाह की कार्रवाई के लिए रिमाइंडर सेट करें और हम अनुशंसित समय से पहले आपको सूचित करेंगे।",
            )}
          </p>
        </span>
        <div className={styles.reminderImage}>
          <Image
            src="/images/authenticated/advisories/reminder-calendar.png"
            alt={t(
              "Calendar with reminder clock",
              "रिमाइंडर घड़ी वाला कैलेंडर",
            )}
            fill
            priority
            sizes="280px"
          />
        </div>
      </section>

      <ReminderForm />
    </div>
  );
}
