import { ServiceImage as Image } from "@/components/media/ServiceImage";
import {
  ArrowLeftRight,
  CheckCircle2,
  CircleHelp,
  Flag,
  MapPin,
  Save,
  ShieldCheck,
  Upload,
} from "lucide-react";

import {
  PashuBreadcrumb,
  PashuHeader,
} from "@/features/pashu-bazaar/components/pashu-components";
import styles from "@/features/pashu-bazaar/components/pashu-bazaar.module.css";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

const handoverSteps = [
  [
    localized("Animal physical handover", "पशु का प्रत्यक्ष हस्तांतरण"),
    localized(
      "Animal handed over to the buyer at the agreed location.",
      "सहमति वाले स्थान पर पशु खरीदार को सौंपा गया।",
    ),
  ],
  [
    localized("Documents handed over", "दस्तावेज़ सौंपे गए"),
    localized(
      "All required documents and records provided.",
      "सभी आवश्यक दस्तावेज़ और रिकॉर्ड दिए गए।",
    ),
  ],
  [
    localized("Transport / Loading", "परिवहन / लोडिंग"),
    localized(
      "Animal safely loaded and ready for transport.",
      "पशु सुरक्षित रूप से लोड होकर परिवहन के लिए तैयार है।",
    ),
  ],
  [
    localized("Final verification by buyer", "खरीदार द्वारा अंतिम सत्यापन"),
    localized(
      "Sample animal details shown for the demo agreement.",
      "डेमो समझौते के लिए पशु के नमूना विवरण दिखाए गए हैं।",
    ),
  ],
  [
    localized("Transaction completion", "लेन-देन पूर्णता"),
    localized(
      "Both parties confirm completion of sale.",
      "दोनों पक्ष बिक्री पूर्ण होने की पुष्टि करते हैं।",
    ),
  ],
] as const;

export default async function AnimalTransactionPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <div className={styles.stack}>
      <PashuHeader backHref="/pashu-bazaar" role="Seller" />
      <PashuBreadcrumb
        items={[
          localized("My Transactions", "मेरे लेन-देन"),
          localized(
            "Transaction ID: TXN-2400518-00045",
            "लेन-देन ID: TXN-2400518-00045",
          ),
        ]}
      />
      <div className={styles.pageHeading}>
        <div>
          <h1>
            {t("Animal Handover & Completion", "पशु हस्तांतरण और पूर्णता")}
          </h1>
          <p>
            {t(
              "Complete the transaction safely and securely",
              "लेन-देन सुरक्षित रूप से पूरा करें",
            )}
          </p>
        </div>
        <span className={styles.statusPill}>
          {t("In Progress", "प्रगति पर")}
        </span>
      </div>

      <section className={styles.progressSteps}>
        <div className={styles.complete}>
          <b>✓</b>
          <span>{t("Agreement", "समझौता")}</span>
          <small>{t("Accepted", "स्वीकृत")}</small>
        </div>
        <div className={styles.complete}>
          <b>✓</b>
          <span>{t("Inspection", "निरीक्षण")}</span>
          <small>{t("Completed", "पूर्ण")}</small>
        </div>
        <div className={styles.complete}>
          <b>✓</b>
          <span>{t("Payment", "भुगतान")}</span>
          <small>{t("Completed", "पूर्ण")}</small>
        </div>
        <div className={styles.current}>
          <b>4</b>
          <span>{t("Handover", "हस्तांतरण")}</span>
          <small>{t("In Progress", "प्रगति पर")}</small>
        </div>
        <div>
          <b>5</b>
          <span>{t("Completed", "पूर्ण")}</span>
          <small>{t("Pending", "लंबित")}</small>
        </div>
      </section>
      <aside className={styles.safeBar}>
        <ShieldCheck size={22} />
        <strong>
          {t("Safe Transaction in Progress", "सुरक्षित लेन-देन प्रगति पर")}
        </strong>
        <span>
          {t(
            "Both buyer and seller must confirm each step to complete the transaction.",
            "लेन-देन पूरा करने के लिए खरीदार और विक्रेता दोनों को प्रत्येक चरण की पुष्टि करनी होगी।",
          )}
        </span>
      </aside>

      <section className={styles.transactionLayout}>
        <div className={styles.stack}>
          <article className={styles.animalCompact}>
            <div className={styles.animalCompactImage}>
              <Image
                src="/images/authenticated/pashu-bazaar/hf-cow-detail.jpg"
                alt={t("HF Cow", "HF गाय")}
                fill
                loading="eager"
                sizes="300px"
              />
            </div>
            <div>
              <h2>{t("HF Cow (Milking)", "HF गाय (दुधारू)")}</h2>
              <p>{t("ID:", "ID:")} LV-2400518-00045</p>
              <p>
                HF (Holstein Friesian) · {t("Black & White", "काला और सफेद")}
              </p>
              <p>
                {t(
                  "3 Years 2 Months · 22–25 Ltr/Day",
                  "3 वर्ष 2 महीने · 22–25 लीटर/दिन",
                )}
              </p>
              <p>{t("Amhara, Bihta, Bihar", "अमहरा, बिहटा, बिहार")}</p>
            </div>
          </article>
          <article className={styles.panel}>
            <h2>{t("Participants", "प्रतिभागी")}</h2>
            <div className={styles.participantGrid}>
              <Participant
                role={t("Seller", "विक्रेता")}
                name="Ramesh Kumar"
                detail="Krishna Dairy Farm"
              />
              <ArrowLeftRight size={24} />
              <Participant
                role={t("Buyer", "खरीदार")}
                name="Arun Singh"
                detail="Amhara, Bihta, Bihar"
              />
            </div>
          </article>
          <article className={styles.panel}>
            <h2>{t("Handover Checklist", "हस्तांतरण चेकलिस्ट")}</h2>
            <p>
              {t(
                "Complete each step and confirm to proceed",
                "आगे बढ़ने के लिए प्रत्येक चरण पूरा करके पुष्टि करें",
              )}
            </p>
            <ol className={styles.handoverList}>
              {handoverSteps.map(([title, detail], index) => (
                <li key={t(title)}>
                  <b>{index + 1}</b>
                  <span>
                    <strong>{t(title)}</strong>
                    <small>{t(detail)}</small>
                  </span>
                  <span>
                    {index < 4
                      ? t("Seller ✓  Buyer ✓", "विक्रेता ✓  खरीदार ✓")
                      : t("Seller Pending", "विक्रेता की पुष्टि लंबित")}
                  </span>
                </li>
              ))}
            </ol>
          </article>
          <article className={styles.panel}>
            <h2>
              {t(
                "Upload Handover Photos (Optional)",
                "हस्तांतरण की तस्वीरें अपलोड करें (वैकल्पिक)",
              )}
            </h2>
            <p>
              {t(
                "Add photos of animal at the time of handover for record.",
                "रिकॉर्ड के लिए हस्तांतरण के समय पशु की तस्वीरें जोड़ें।",
              )}
            </p>
            <button className={styles.secondaryButton} type="button">
              <Upload size={18} />
              {t("Upload Photos", "तस्वीरें अपलोड करें")}
            </button>
          </article>
        </div>
        <aside className={styles.sideStack}>
          <article>
            <h2>{t("Transaction Summary", "लेन-देन सारांश")}</h2>
            <table className={styles.summaryTable}>
              <tbody>
                <tr>
                  <td>{t("Agreed Price", "सहमति मूल्य")}</td>
                  <td>₹78,000</td>
                </tr>
                <tr>
                  <td>{t("Transport Charge", "परिवहन शुल्क")}</td>
                  <td>₹2,000</td>
                </tr>
                <tr>
                  <td>{t("Other Charges", "अन्य शुल्क")}</td>
                  <td>₹0</td>
                </tr>
                <tr>
                  <td>{t("Total Amount", "कुल राशि")}</td>
                  <td>₹80,000</td>
                </tr>
              </tbody>
            </table>
            <p>
              <CheckCircle2 size={16} />
              {t(
                "Payment completed on 20 May 2024",
                "भुगतान 20 मई 2024 को पूर्ण हुआ",
              )}
            </p>
          </article>
          <article>
            <h2>{t("Documents & Records", "दस्तावेज़ और रिकॉर्ड")}</h2>
            <ul className={styles.recordList}>
              {[
                localized("Health Certificate", "स्वास्थ्य प्रमाणपत्र"),
                localized("Vaccination Record", "टीकाकरण रिकॉर्ड"),
                localized("Milk Test Report", "दूध परीक्षण रिपोर्ट"),
                localized(
                  "Pregnancy Test Report",
                  "गर्भावस्था परीक्षण रिपोर्ट",
                ),
                localized("Ownership Proof", "स्वामित्व प्रमाण"),
              ].map((item) => (
                <li key={t(item)}>
                  <CheckCircle2 size={15} />
                  <span>{t(item)}</span>
                  <b>{t("Demo", "डेमो")}</b>
                </li>
              ))}
            </ul>
          </article>
          <article>
            <h2>{t("Handover Location", "हस्तांतरण स्थान")}</h2>
            <p>
              <MapPin size={16} />
              Ram Prasad Farm
              <br />
              {t("Amhara", "अमहरा")},
              <br />
              {t("Bihta, Patna, Bihar – 801103", "बिहटा, पटना, बिहार – 801103")}
            </p>
            <p>{t("21 May 2024 · 11:30 AM", "21 मई 2024 · 11:30 पूर्वाह्न")}</p>
          </article>
          <article>
            <h2>{t("Need Help?", "मदद चाहिए?")}</h2>
            <p>
              {t(
                "Facing any issue during handover?",
                "हस्तांतरण के दौरान कोई समस्या आ रही है?",
              )}
            </p>
            <button className={styles.secondaryButton} type="button">
              <CircleHelp size={17} />
              {t("Contact Support", "सहायता से संपर्क करें")}
            </button>
          </article>
        </aside>
      </section>

      <section className={styles.formFooter}>
        <button type="button">
          <Flag size={18} />
          {t("Report an Issue", "समस्या की रिपोर्ट करें")}
        </button>
        <button type="button">
          <Save size={18} />
          {t("Save & Exit", "सहेजें और बाहर निकलें")}
        </button>
        <button type="button">
          <CheckCircle2 size={18} />
          {t("Confirm Completion", "पूर्णता की पुष्टि करें")}
        </button>
      </section>
      <aside className={styles.safeBar}>
        <ShieldCheck size={22} />
        <strong>{t("Safe Trade Promise", "सुरक्षित व्यापार का वादा")}</strong>
        <span>
          {t(
            "Your safety is our priority. Transactions are secure, transparent and dispute-resolved.",
            "आपकी सुरक्षा हमारी प्राथमिकता है। लेन-देन सुरक्षित, पारदर्शी और विवाद-समाधान युक्त हैं।",
          )}
        </span>
      </aside>
    </div>
  );
}

function Participant({
  role,
  name,
  detail,
}: {
  role: string;
  name: string;
  detail: string;
}) {
  return (
    <div className={styles.participant}>
      <Image
        src="/images/authenticated/profile-avatar.jpg"
        alt=""
        width={38}
        height={38}
      />
      <span>
        <small>{role}</small>
        <strong>{name}</strong>
        <small>{detail}</small>
      </span>
    </div>
  );
}
