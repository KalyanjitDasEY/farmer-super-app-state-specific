import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  FolderOpen,
  Headphones,
  IndianRupee,
  ShieldCheck,
  Target,
  Umbrella,
  UsersRound,
} from "lucide-react";

import { ServiceImage as Image } from "@/components/media/ServiceImage";
import {
  Notice,
  SchemeHeading,
} from "@/features/mksy/components/mksy-components";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";
import styles from "@/features/mksy/components/mksy.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: "MKSY",
    description: t(
      "Mukhyamantri Krishak Durghatna Kalyan Yojana information and claim application.",
      "मुख्यमंत्री कृषक दुर्घटना कल्याण योजना की जानकारी और दावा आवेदन।",
    ),
  };
}

const coveredAccidents = [
  localized("Road / Rail / Air accidents", "सड़क / रेल / हवाई दुर्घटनाएं"),
  localized("Drowning", "डूबना"),
  localized("Snake bite", "सांप का काटना"),
  localized("Electric shock", "बिजली का झटका"),
  localized("Fire / Burn", "आग / जलना"),
  localized("Other accidental incidents", "अन्य आकस्मिक घटनाएं"),
] as const;

const eligibility = [
  localized("Be a resident of Rajasthan", "राजस्थान का निवासी होना चाहिए"),
  localized(
    "Be a farmer as per land records (Jamabandi)",
    "भूमि अभिलेख (जमाबंदी) के अनुसार किसान होना चाहिए",
  ),
  localized(
    "Be between 18 to 70 years of age",
    "आयु 18 से 70 वर्ष के बीच होनी चाहिए",
  ),
  localized(
    "Incident must be accidental and within Rajasthan",
    "घटना आकस्मिक और राजस्थान के भीतर होनी चाहिए",
  ),
] as const;

const documents = [
  localized(
    "Jan Aadhaar Card of deceased / applicant",
    "मृतक / आवेदक का जन आधार कार्ड",
  ),
  localized("Latest Jamabandi / Land Record", "नवीनतम जमाबंदी / भूमि अभिलेख"),
  localized(
    "Death Certificate / Disability Certificate",
    "मृत्यु प्रमाण पत्र / दिव्यांगता प्रमाण पत्र",
  ),
  localized(
    "FIR / Police Report (if applicable)",
    "FIR / पुलिस रिपोर्ट (यदि लागू हो)",
  ),
  localized(
    "Post-mortem Report (if applicable)",
    "पोस्टमार्टम रिपोर्ट (यदि लागू हो)",
  ),
  localized("Bank Passbook or cancelled cheque", "बैंक पासबुक या निरस्त चेक"),
] as const;

export default async function MksyOverviewPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <div className={styles.page}>
      <SchemeHeading
        backHref="/schemes"
        backLabel={t("Back to Schemes", "योजनाओं पर वापस जाएं")}
        current="MKSY"
      />

      <section className={styles.overviewHero}>
        <div className={styles.overviewCopy}>
          <span className={styles.schemeBadge}>
            {t(
              "Rajasthan State Government Scheme",
              "राजस्थान राज्य सरकार की योजना",
            )}
          </span>
          <h1>
            {t(
              "Mukhyamantri Krishak Durghatna Kalyan Yojana",
              "मुख्यमंत्री कृषक दुर्घटना कल्याण योजना",
            )}
          </h1>
          <p>
            {t(
              "Financial assistance to farmer families in case of accidental death or permanent disability due to specified incidents.",
              "निर्दिष्ट घटनाओं के कारण दुर्घटना में मृत्यु या स्थायी दिव्यांगता की स्थिति में किसान परिवारों को वित्तीय सहायता।",
            )}
          </p>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/images/scheme-hero-reference.png"
            alt={t(
              "Rajasthan farmer standing in an agricultural field",
              "कृषि क्षेत्र में खड़ा राजस्थान का किसान",
            )}
            fill
            loading="eager"
            sizes="(max-width: 680px) 100vw, 42vw"
          />
        </div>
      </section>

      <section
        className={styles.factGrid}
        aria-label={t("MKSY scheme facts", "MKSY योजना के तथ्य")}
      >
        <article>
          <span>
            <IndianRupee size={25} />
          </span>
          <div>
            <small>{t("Funding Pattern", "वित्त पोषण का स्वरूप")}</small>
            <strong>{t("State Funded", "राज्य वित्त पोषित")}</strong>
            <p>
              {t(
                "100% by Government of Rajasthan",
                "राजस्थान सरकार द्वारा 100%",
              )}
            </p>
          </div>
        </article>
        <article>
          <span>
            <Umbrella size={25} />
          </span>
          <div>
            <small>{t("Premium", "प्रीमियम")}</small>
            <strong>{t("No Premium", "कोई प्रीमियम नहीं")}</strong>
            <p>{t("Fully paid by Government", "सरकार द्वारा पूर्ण भुगतान")}</p>
          </div>
        </article>
        <article>
          <span>
            <UsersRound size={25} />
          </span>
          <div>
            <small>{t("Coverage", "कवरेज")}</small>
            <strong>{t("All eligible farmers", "सभी पात्र किसान")}</strong>
            <p>{t("Across Rajasthan", "पूरे राजस्थान में")}</p>
          </div>
        </article>
        <article>
          <span>
            <CalendarDays size={25} />
          </span>
          <div>
            <small>{t("Application Window", "आवेदन अवधि")}</small>
            <strong>{t("Open All Year Round", "पूरे वर्ष खुला")}</strong>
            <p>
              {t(
                "Apply for eligible incidents",
                "पात्र घटनाओं के लिए आवेदन करें",
              )}
            </p>
          </div>
        </article>
      </section>

      <section className={styles.purposeCard}>
        <span>
          <Target size={27} />
        </span>
        <div>
          <h2>{t("Purpose", "उद्देश्य")}</h2>
          <p>
            {t(
              "To provide immediate financial assistance to farmer families in case of accidental death or permanent disability, ensuring social security and support during difficult times.",
              "दुर्घटना में मृत्यु या स्थायी दिव्यांगता की स्थिति में किसान परिवारों को तत्काल वित्तीय सहायता देकर कठिन समय में सामाजिक सुरक्षा और सहयोग सुनिश्चित करना।",
            )}
          </p>
        </div>
      </section>

      <section className={styles.overviewGrid}>
        <article className={styles.overviewCard}>
          <h2>
            <ShieldCheck size={20} />{" "}
            {t("Covered Accidents", "कवर की गई दुर्घटनाएं")}
          </h2>
          <ul className={styles.checkList}>
            {coveredAccidents.map((item) => (
              <li key={item.en}>
                <CheckCircle2 size={16} /> {t(item)}
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.overviewCard}>
          <h2>
            <IndianRupee size={20} /> {t("Assistance Slabs", "सहायता स्लैब")}
          </h2>
          <table className={styles.amountTable}>
            <thead>
              <tr>
                <th>{t("Incident Type", "घटना का प्रकार")}</th>
                <th>{t("Amount", "राशि")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t("Accidental Death", "दुर्घटना में मृत्यु")}</td>
                <td>₹5,00,000</td>
              </tr>
              <tr>
                <td>
                  {t("Permanent Total Disability", "स्थायी पूर्ण दिव्यांगता")}
                </td>
                <td>₹5,00,000</td>
              </tr>
              <tr>
                <td>
                  {t(
                    "Loss of Two Limbs / Two Eyes",
                    "दो अंगों / दोनों आंखों की हानि",
                  )}
                </td>
                <td>₹2,50,000</td>
              </tr>
              <tr>
                <td>
                  {t("Loss of One Limb or One Eye", "एक अंग या एक आंख की हानि")}
                </td>
                <td>₹1,25,000</td>
              </tr>
            </tbody>
          </table>
        </article>

        <article className={styles.overviewCard}>
          <h2>
            <UsersRound size={20} />{" "}
            {t("Eligibility Criteria", "पात्रता मानदंड")}
          </h2>
          <ul className={styles.checkList}>
            {eligibility.map((item) => (
              <li key={item.en}>
                <CheckCircle2 size={16} /> {t(item)}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <Notice tone="blue">
        {t(
          "Assistance amount follows Government of Rajasthan rules and may be revised from time to time.",
          "सहायता राशि राजस्थान सरकार के नियमों के अनुसार है और समय-समय पर संशोधित की जा सकती है।",
        )}
      </Notice>

      <section className={styles.overviewLower}>
        <article className={styles.contentCard}>
          <h2>
            <FolderOpen size={20} />{" "}
            {t("Documents Required", "आवश्यक दस्तावेज़")}
          </h2>
          <ul className={styles.documentList}>
            {documents.map((item) => (
              <li key={item.en}>
                <FileText size={16} /> {t(item)}
              </li>
            ))}
          </ul>
        </article>

        <div className={styles.notesStack}>
          <article className={`${styles.contentCard} ${styles.importantCard}`}>
            <h2>
              <ShieldCheck size={20} />{" "}
              {t("Important Notes", "महत्वपूर्ण निर्देश")}
            </h2>
            <ul className={styles.bulletList}>
              <li>
                {t(
                  "This scheme provides financial assistance only.",
                  "यह योजना केवल वित्तीय सहायता प्रदान करती है।",
                )}
              </li>
              <li>
                {t(
                  "It does not provide employment or any other benefit.",
                  "यह रोजगार या कोई अन्य लाभ प्रदान नहीं करती है।",
                )}
              </li>
              <li>
                {t(
                  "False information may lead to rejection and legal action.",
                  "गलत जानकारी के कारण दावा अस्वीकार और कानूनी कार्रवाई हो सकती है।",
                )}
              </li>
            </ul>
          </article>
          <article className={styles.contentCard}>
            <h2>
              <Headphones size={20} /> {t("Need Help?", "सहायता चाहिए?")}
            </h2>
            <p>
              {t(
                "Ask Krishi Mitra for help related to the MKSY scheme.",
                "MKSY योजना से जुड़ी सहायता के लिए कृषि मित्र से पूछें।",
              )}
            </p>
            <Link className={styles.outlineButton} href="/more#help">
              <Headphones size={18} />{" "}
              {t("Chat with Krishi Mitra", "कृषि मित्र से चैट करें")}
            </Link>
          </article>
        </div>
      </section>

      <div className={styles.overviewActions}>
        <Link className={styles.secondaryButton} href="/schemes">
          <ArrowLeft size={19} /> {t("Back to Schemes", "योजनाओं पर वापस जाएं")}
        </Link>
        <Link className={styles.primaryButton} href="/mksy/claim">
          {t("Start Claim", "दावा शुरू करें")} <ArrowRight size={19} />
        </Link>
      </div>
    </div>
  );
}
