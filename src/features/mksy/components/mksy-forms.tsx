"use client";

import { Check, Eye, MapPin, UploadCloud } from "lucide-react";
import { useState } from "react";

import { useLocale } from "@/i18n/LocaleProvider";
import { localized } from "@/i18n/localized-text";

import { ClaimActions, Field, FormSection, Notice } from "./mksy-components";
import styles from "./mksy.module.css";

const incidentCategories = [
  [
    localized("Accidental Death", "दुर्घटना में मृत्यु"),
    localized("Example incident category", "उदाहरण घटना श्रेणी"),
  ],
  [
    localized("Permanent Total Disability", "स्थायी पूर्ण दिव्यांगता"),
    localized("Example permanent disability", "स्थायी दिव्यांगता का उदाहरण"),
  ],
  [
    localized("Loss of Two Limbs / Two Eyes", "दो अंगों / दोनों आंखों की हानि"),
    localized("Example incident category", "उदाहरण घटना श्रेणी"),
  ],
  [
    localized("Loss of One Limb or One Eye", "एक अंग या एक आंख की हानि"),
    localized("Example incident category", "उदाहरण घटना श्रेणी"),
  ],
] as const;

export function AccidentVictimForm() {
  const [selectedSlab, setSelectedSlab] = useState(0);
  const { locale, t } = useLocale();

  return (
    <>
      <FormSection title={t("A. Accident Overview", "A. दुर्घटना का अवलोकन")}>
        <div className={styles.formGrid}>
          <Field label={t("Accident Type", "दुर्घटना का प्रकार")} required>
            <select defaultValue="">
              <option value="" disabled>
                {t("Select Accident Type", "दुर्घटना का प्रकार चुनें")}
              </option>
              <option>{t("Road Accident", "सड़क दुर्घटना")}</option>
              <option>{t("Drowning", "डूबना")}</option>
              <option>{t("Snake Bite", "सांप का काटना")}</option>
              <option>{t("Electric Shock", "बिजली का झटका")}</option>
            </select>
          </Field>
          <Field label={t("Accident Date", "दुर्घटना की तिथि")} required>
            <input type="date" defaultValue="2024-05-12" />
          </Field>
          <Field label={t("Accident Time", "दुर्घटना का समय")} required>
            <input type="time" defaultValue="15:15" />
          </Field>
          <Field
            label={t("Accident Place / Location", "दुर्घटना का स्थान")}
            required
            wide
          >
            <input
              placeholder={t(
                "Enter place / location of accident",
                "दुर्घटना का स्थान दर्ज करें",
              )}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection
        title={t("B. Victim (Farmer) Details", "B. पीड़ित (किसान) का विवरण")}
      >
        <div className={styles.formGrid}>
          <Field label={t("Victim Category", "पीड़ित की श्रेणी")} required>
            <select defaultValue={t("Self", "स्वयं")} key={locale}>
              <option>{t("Self", "स्वयं")}</option>
              <option>{t("Spouse", "पति/पत्नी")}</option>
              <option>{t("Dependent", "आश्रित")}</option>
            </select>
          </Field>
          <Field label={t("Demo Farmer ID", "डेमो किसान आईडी")} required>
            <div className={styles.inlineField}>
              <input defaultValue="BR23F12345678" readOnly />
              <button type="button">
                <Check size={16} /> {t("Sample ID", "नमूना आईडी")}
              </button>
            </div>
          </Field>
          <Field
            label={t(
              "Victim / Farmer Name (sample)",
              "पीड़ित / किसान का नाम (नमूना)",
            )}
            required
            wide
          >
            <input defaultValue="RAMESH KUMAR" />
          </Field>
          <Field
            label={t("Father / Husband Name", "पिता / पति का नाम")}
            required
          >
            <input defaultValue="SURESH CHAND" />
          </Field>
          <Field label={t("Age (Years)", "आयु (वर्ष)")} required>
            <input type="number" defaultValue="45" />
          </Field>
          <Field label={t("District", "जिला")} required>
            <select defaultValue="Patna">
              <option value="Patna">{t("Patna", "पटना")}</option>
            </select>
          </Field>
          <Field label={t("Block / Anchal", "प्रखंड / अंचल")} required>
            <select defaultValue="Bihta">
              <option value="Bihta">{t("Bihta", "बिहटा")}</option>
            </select>
          </Field>
          <Field label={t("Village", "गांव")} required>
            <input defaultValue={t("Amhara", "अमहरा")} key={locale} />
          </Field>
        </div>
        <p className={styles.successLine}>
          <Check size={16} />{" "}
          {t(
            "Sample identity shown; no external verification performed.",
            "नमूना पहचान दर्शाई गई है; कोई बाहरी सत्यापन नहीं हुआ।",
          )}
        </p>
      </FormSection>

      <FormSection
        title={t(
          "C. Incident Category (Demo Selection)",
          "C. घटना श्रेणी (डेमो चयन)",
        )}
      >
        <p>
          {t(
            "Select a sample incident category to continue the demo. No benefit amount is calculated.",
            "डेमो जारी रखने के लिए नमूना घटना श्रेणी चुनें। किसी लाभ राशि की गणना नहीं होती।",
          )}
        </p>
        <div className={styles.selectionTable}>
          <div className={styles.tableHead}>
            <span>{t("Incident Type", "घटना का प्रकार")}</span>
            <span>{t("Example description", "उदाहरण विवरण")}</span>
            <span>{t("Benefit amount", "लाभ राशि")}</span>
            <span>{t("Select", "चुनें")}</span>
          </div>
          {incidentCategories.map(([incident, condition], index) => (
            <button
              className={selectedSlab === index ? styles.selectedRow : ""}
              type="button"
              onClick={() => setSelectedSlab(index)}
              key={incident.en}
            >
              <span>{t(incident)}</span>
              <span>{t(condition)}</span>
              <strong>{t("Not specified", "निर्दिष्ट नहीं")}</strong>
              <em>
                {selectedSlab === index
                  ? t("Selected", "चयनित")
                  : t("Select", "चुनें")}
              </em>
            </button>
          ))}
        </div>
        <Notice>
          {t(
            "These categories are illustrative only; they do not establish official Bihar eligibility or a payable amount.",
            "ये श्रेणियां केवल सांकेतिक हैं; इनसे बिहार की आधिकारिक पात्रता या देय राशि निर्धारित नहीं होती।",
          )}
        </Notice>
      </FormSection>

      <ClaimActions
        backHref="/mksy"
        nextHref="/mksy/claim/location"
        nextLabel={t("Next: Accident Details", "अगला: दुर्घटना विवरण")}
      />
    </>
  );
}

export function LocationNarrativeForm() {
  const { locale, t } = useLocale();

  return (
    <>
      <FormSection
        title={t("A. Administrative Location", "A. प्रशासनिक स्थान")}
      >
        <div className={styles.formGrid}>
          <Field label={t("District", "जिला")} required>
            <select defaultValue="Patna">
              <option value="Patna">{t("Patna", "पटना")}</option>
            </select>
          </Field>
          <Field label={t("Block / Anchal", "प्रखंड / अंचल")} required>
            <select defaultValue="Bihta">
              <option value="Bihta">{t("Bihta", "बिहटा")}</option>
            </select>
          </Field>
          <Field label={t("Revenue Village", "राजस्व गांव")} required>
            <select defaultValue="Amhara">
              <option value="Amhara">{t("Amhara", "अमहरा")}</option>
            </select>
          </Field>
          <Field
            label={t("Accident Location / Place", "दुर्घटना का स्थान")}
            required
          >
            <input
              defaultValue={t(
                "Near village road, Amhara",
                "गांव की सड़क के पास, अमहरा",
              )}
              key={locale}
            />
          </Field>
          <Field label={t("Khesra", "खेसरा")}>
            <input defaultValue="123/1" />
          </Field>
        </div>
      </FormSection>

      <FormSection
        title={t(
          "B. Incident Location (Optional but Recommended)",
          "B. घटना का स्थान (वैकल्पिक लेकिन अनुशंसित)",
        )}
      >
        <div className={styles.mapGrid}>
          <div className={styles.mapPicker}>
            <MapPin size={34} />
            <strong>
              {t(
                "Click to select location on map",
                "मानचित्र पर स्थान चुनने के लिए क्लिक करें",
              )}
            </strong>
            <span>
              {t(
                "or enter latitude and longitude",
                "या अक्षांश और देशांतर दर्ज करें",
              )}
            </span>
          </div>
          <div className={styles.formGrid}>
            <Field label={t("Nearest Landmark", "निकटतम पहचान स्थल")}>
              <input
                defaultValue={t(
                  "Near Amhara village school",
                  "अमहरा गांव के स्कूल के पास",
                )}
                key={locale}
              />
            </Field>
            <Field label={t("Police Station", "पुलिस थाना")}>
              <input
                defaultValue={t("Bihta Police Station", "बिहटा पुलिस थाना")}
                key={locale}
              />
            </Field>
            <Field label={t("Distance from Village", "गांव से दूरी")}>
              <input defaultValue="2.5 km" />
            </Field>
          </div>
        </div>
      </FormSection>

      <FormSection title={t("C. Incident Details", "C. घटना का विवरण")}>
        <div className={styles.formGrid}>
          <Field label={t("Date of Incident", "घटना की तिथि")} required>
            <input type="date" defaultValue="2024-05-12" />
          </Field>
          <Field label={t("Time of Incident", "घटना का समय")} required>
            <input type="time" defaultValue="15:15" />
          </Field>
          <Field
            label={t(
              "Brief Description of Incident",
              "घटना का संक्षिप्त विवरण",
            )}
            required
            wide
          >
            <textarea
              defaultValue={t(
                "While returning from the field after irrigation work, the farmer met with an accident when the motorcycle slipped on the road and hit a tree.",
                "सिंचाई का काम पूरा कर खेत से लौटते समय किसान की मोटरसाइकिल सड़क पर फिसलकर पेड़ से टकरा गई।",
              )}
              key={locale}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection
        title={t(
          "D. Hospital / Medical Information",
          "D. अस्पताल / चिकित्सा जानकारी",
        )}
      >
        <div className={styles.formGrid}>
          <Field
            label={t(
              "Name of Hospital / Medical Facility",
              "अस्पताल / चिकित्सा संस्थान का नाम",
            )}
            required
          >
            <input
              defaultValue={t(
                "Patna Medical College and Hospital",
                "पटना मेडिकल कॉलेज और अस्पताल",
              )}
              key={locale}
            />
          </Field>
          <Field label={t("Type of Treatment", "उपचार का प्रकार")} required>
            <select
              defaultValue={t("Emergency Treatment", "आपातकालीन उपचार")}
              key={locale}
            >
              <option>{t("Emergency Treatment", "आपातकालीन उपचार")}</option>
            </select>
          </Field>
          <Field label={t("Date of Admission", "भर्ती की तिथि")}>
            <input type="date" defaultValue="2024-05-12" />
          </Field>
          <Field label={t("MLC / Case Number", "MLC / केस संख्या")}>
            <input defaultValue="MLC/2024/12567" />
          </Field>
        </div>
      </FormSection>

      <FormSection
        title={t(
          "E. Witness / Informant Details (Optional)",
          "E. गवाह / सूचनाकर्ता का विवरण (वैकल्पिक)",
        )}
      >
        <div className={styles.formGrid}>
          <Field
            label={t("Witness / Informant Name", "गवाह / सूचनाकर्ता का नाम")}
          >
            <input defaultValue="Suresh Chand" />
          </Field>
          <Field label={t("Mobile Number", "मोबाइल नंबर")}>
            <input defaultValue="98XXXXXX56" />
          </Field>
          <Field label={t("Relationship with Victim", "पीड़ित से संबंध")}>
            <select defaultValue={t("Neighbour", "पड़ोसी")} key={locale}>
              <option>{t("Neighbour", "पड़ोसी")}</option>
            </select>
          </Field>
        </div>
      </FormSection>

      <Notice tone="blue">
        {t(
          "You can save this step as draft and continue later.",
          "आप इस चरण को ड्राफ्ट के रूप में सहेजकर बाद में जारी रख सकते हैं।",
        )}
      </Notice>
      <ClaimActions
        backHref="/mksy/claim"
        nextHref="/mksy/claim/documents"
        nextLabel={t("Next: Documents", "अगला: दस्तावेज़")}
      />
    </>
  );
}

const documents = [
  [
    localized("FIR / Police Report", "FIR / पुलिस रिपोर्ट"),
    "FIR_12052024.pdf",
    "1.24 MB",
  ],
  [
    localized(
      "Medical Report / Disability Certificate",
      "चिकित्सा रिपोर्ट / दिव्यांगता प्रमाण पत्र",
    ),
    "Medical_Report.pdf",
    "0.98 MB",
  ],
  [
    localized(
      "Bihar land record / khata-khesra",
      "बिहार भूमि अभिलेख / खाता-खेसरा",
    ),
    "Land_Record_Sample.pdf",
    "1.02 MB",
  ],
  [
    localized("Source Verification", "स्रोत सत्यापन"),
    "Accident_Photo.jpg",
    "0.85 MB",
  ],
] as const;

export function DocumentsForm() {
  const [mode, setMode] = useState<"OTP" | "e-Sign">("OTP");
  const { t } = useLocale();

  return (
    <>
      <FormSection title={t("A. Required Documents", "A. आवश्यक दस्तावेज़")}>
        <div className={styles.documentTable}>
          <div className={styles.documentHead}>
            <span>{t("Document", "दस्तावेज़")}</span>
            <span>{t("Requirement", "आवश्यकता")}</span>
            <span>{t("Upload", "अपलोड")}</span>
            <span>{t("Status", "स्थिति")}</span>
            <span>{t("Action", "कार्रवाई")}</span>
          </div>
          {documents.map(([name, file, size], index) => (
            <div key={name.en}>
              <strong>
                {t(name)}
                {index < 3 ? " *" : ""}
              </strong>
              <span>
                {index < 3
                  ? t("Demo required", "डेमो में आवश्यक")
                  : t("Demo optional", "डेमो में वैकल्पिक")}
              </span>
              <span>
                {file}
                <small>{size}</small>
              </span>
              <em>
                <Check size={15} /> {t("Sample file", "नमूना फ़ाइल")}
              </em>
              <button type="button">
                <Eye size={16} /> {t("View", "देखें")}
              </button>
            </div>
          ))}
        </div>
        <button className={styles.uploadZone} type="button">
          <UploadCloud size={34} />
          <span>
            <strong>
              {t(
                "Sample upload area (no files are sent)",
                "नमूना अपलोड क्षेत्र (कोई फ़ाइल नहीं भेजी जाती)",
              )}
            </strong>
            <small>
              {t(
                "PDF, JPG, PNG · Maximum 5 MB per file",
                "PDF, JPG, PNG · प्रति फाइल अधिकतम 5 MB",
              )}
            </small>
          </span>
        </button>
        <p className={styles.successLine}>
          <Check size={16} />{" "}
          {t(
            "Sample files are shown; no documents have been submitted.",
            "नमूना फ़ाइलें दिखाई गई हैं; कोई दस्तावेज़ जमा नहीं हुआ है।",
          )}
        </p>
      </FormSection>

      <FormSection
        title={t(
          "B. Demo Identity Check (Farmer ID)",
          "B. डेमो पहचान जांच (किसान आईडी)",
        )}
      >
        <Notice tone="blue">
          {t(
            "This sample OTP flow does not contact any identity service or perform real e-KYC.",
            "यह नमूना OTP प्रक्रिया किसी पहचान सेवा से नहीं जुड़ती और वास्तविक ई-केवाईसी नहीं करती।",
          )}
        </Notice>
        <div className={styles.formGrid}>
          <Field label={t("Demo Farmer ID", "डेमो किसान आईडी")}>
            <input defaultValue="BR23F12345678" readOnly />
          </Field>
          <Field label={t("Name (sample)", "नाम (नमूना)")}>
            <input defaultValue="RAMESH KUMAR" readOnly />
          </Field>
          <Field
            label={t("Mobile Number (Registered)", "मोबाइल नंबर (पंजीकृत)")}
          >
            <input defaultValue="98XXXXXX56" readOnly />
          </Field>
          <Field label={t("Demo check mode", "डेमो जांच माध्यम")}>
            <div className={styles.modeButtons}>
              {(["OTP", "e-Sign"] as const).map((item) => (
                <button
                  className={mode === item ? styles.selectedMode : ""}
                  type="button"
                  onClick={() => setMode(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </Field>
        </div>
        <div className={styles.otpPanel}>
          <strong>{t("Sample OTP", "नमूना OTP")}</strong>
          <p>
            {t(
              "Sample digits only; no OTP is sent",
              "केवल नमूना अंक; कोई OTP भेजा नहीं जाता",
            )}
          </p>
          <div>
            {["1", "2", "3", "4", "5", "6"].map((digit) => (
              <input
                aria-label={`${t("OTP digit", "OTP अंक")} ${digit}`}
                defaultValue={digit}
                maxLength={1}
                key={digit}
              />
            ))}
          </div>
          <span>
            <Check size={16} />{" "}
            {t("Sample OTP displayed", "नमूना OTP दिखाया गया")}
          </span>
        </div>
        <p className={styles.successLine}>
          <Check size={16} />{" "}
          {t(
            "Demo identity step shown; not verified against any registry.",
            "डेमो पहचान चरण दिखाया गया; किसी रजिस्ट्री से सत्यापन नहीं हुआ।",
          )}
        </p>
      </FormSection>

      <Notice tone="amber">
        {t(
          "Do not upload real documents or enter actual identity details in this demo.",
          "इस डेमो में वास्तविक दस्तावेज़ या पहचान विवरण दर्ज न करें।",
        )}
      </Notice>
      <ClaimActions
        backHref="/mksy/claim/location"
        nextHref="/mksy/claim/review"
        nextLabel={t("Next: Review", "अगला: समीक्षा")}
      />
    </>
  );
}

export function ReviewDeclaration() {
  const [accepted, setAccepted] = useState(true);
  const { t } = useLocale();

  return (
    <>
      <FormSection title={t("E. Declarations", "E. घोषणाएं")}>
        <label className={styles.declaration}>
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
          />
          <span>
            {t(
              "I understand this is a sample claim journey and does not submit an application to any government office.",
              "मैं समझता/समझती हूं कि यह नमूना दावा प्रक्रिया है और इससे किसी सरकारी कार्यालय में आवेदन जमा नहीं होता।",
            )}
          </span>
        </label>
      </FormSection>
      <Notice tone="amber">
        {t(
          "Continue to view a sample status; this action does not file a real claim.",
          "नमूना स्थिति देखने के लिए आगे बढ़ें; इससे वास्तविक दावा दर्ज नहीं होता।",
        )}
      </Notice>
      <div className={accepted ? undefined : styles.disabledActions}>
        <ClaimActions
          backHref="/mksy/claim/documents"
          nextHref={accepted ? "/mksy/status" : "/mksy/claim/review"}
          nextLabel={t("View Demo Status", "डेमो स्थिति देखें")}
          submit
        />
      </div>
    </>
  );
}
