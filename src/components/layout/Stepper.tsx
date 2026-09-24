import type { Dictionary } from "@/i18n/dictionaries";
import styles from "@/styles/application.module.css";

export function Stepper({
  dictionary,
  current,
}: {
  dictionary: Dictionary;
  current: 1 | 2 | 3;
}) {
  const steps = [
    dictionary["register.stepIdentity"],
    dictionary["register.stepLocation"],
    dictionary["register.stepComplete"],
  ];

  return (
    <ol className={styles.stepper} aria-label={dictionary["register.progress"]}>
      {steps.map((step, index) => {
        const number = index + 1;
        return (
          <li
            key={step}
            className={`${styles.step} ${
              number < current
                ? styles.stepDone
                : number === current
                  ? styles.stepActive
                  : ""
            }`}
            aria-current={number === current ? "step" : undefined}
          >
            <span className={styles.stepNumber}>
              {number < current ? "✓" : number}
            </span>
            <span>{step}</span>
          </li>
        );
      })}
    </ol>
  );
}
