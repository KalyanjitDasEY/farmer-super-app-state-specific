"use client";

import { Check, Eye, MapPin, UploadCloud } from "lucide-react";
import { useState } from "react";

import { useLocale } from "@/i18n/LocaleProvider";
import { localized } from "@/i18n/localized-text";

import { ClaimActions, Field, FormSection, Notice } from "./mksy-components";
import styles from "./mksy.module.css";

const assistanceSlabs = [
  [
    localized("Accidental Death", "दुर्घटना में मृत्यु"),
    localized("Due to specified accident", "निर्दिष्ट दुर्घटना के कारण"),
    "₹5,00,000",
  ],
  [
    localized("Permanent Total Disability", "स्थायी पूर्ण दिव्यांगता"),
    localized(
      "Loss of both limbs / both eyes",
      "दोनों अंगों / दोनों आंखों की हानि",
    ),
    "₹5,00,000",
  ],
  [
    localized("Loss of Two Limbs / Two Eyes", "दो अंगों / दोनों आंखों की हानि"),
    localized("As per scheme rules", "योजना के नियमों के अनुसार"),
    "₹2,50,000",
  ],
  [
    localized("Loss of One Limb or One Eye", "एक अंग या एक आंख की हानि"),
    localized("As per scheme rules", "योजना के नियमों के अनुसार"),
    "₹1,25,000",
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
          <Field label={t("Jan Aadhaar Number", "जन आधार संख्या")} required>
            <div className={styles.inlineField}>
              <input defaultValue="XXXX XXXX 9012" readOnly />
              <button type="button">
                <Check size={16} /> {t("Verify", "सत्यापित करें")}
              </button>
            </div>
          </Field>
          <Field
            label={t(
              "Victim / Farmer Name (as per Jan Aadhaar)",
              "पीड़ित / किसान का नाम (जन आधार के अनुसार)",
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
            <select defaultValue="Jaipur">
              <option>Jaipur</option>
            </select>
          </Field>
          <Field label={t("Tehsil", "तहसील")} required>
            <select defaultValue="Chomu">
              <option>Chomu</option>
            </select>
          </Field>
          <Field label={t("Village", "गांव")} required>
            <input defaultValue="Mor" />
          </Field>
        </div>
        <p className={styles.successLine}>
          <Check size={16} />{" "}
          {t(
            "Details verified with Jan Aadhaar.",
            "विवरण जन आधार से सत्यापित किया गया।",
          )}
        </p>
      </FormSection>

      <FormSection
        title={t(
          "C. Assistance Slab (Auto Calculated)",
          "C. सहायता स्लैब (स्वतः गणना)",
        )}
      >
        <p>
          {t(
            "Select the applicable assistance slab. The claim amount is calculated automatically.",
            "लागू सहायता स्लैब चुनें। दावा राशि की गणना स्वतः की जाएगी।",
          )}
        </p>
        <div className={styles.selectionTable}>
          <div className={styles.tableHead}>
            <span>{t("Incident Type", "घटना का प्रकार")}</span>
            <span>{t("Eligibility Condition", "पात्रता शर्त")}</span>
            <span>{t("Assistance Amount", "सहायता राशि")}</span>
            <span>{t("Select", "चुनें")}</span>
          </div>
          {assistanceSlabs.map(([incident, condition, amount], index) => (
            <button
              className={selectedSlab === index ? styles.selectedRow : ""}
              type="button"
              onClick={() => setSelectedSlab(index)}
              key={incident.en}
            >
              <span>{t(incident)}</span>
              <span>{t(condition)}</span>
              <strong>{amount}</strong>
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
            "Claim amount is derived from the selected assistance slab as per MKSY rules.",
            "दावा राशि MKSY के नियमों के अनुसार चयनित सहायता स्लैब से निर्धारित होती है।",
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
            <select defaultValue="Jaipur">
              <option>Jaipur</option>
            </select>
          </Field>
          <Field label={t("Tehsil", "तहसील")} required>
            <select defaultValue="Chomu">
              <option>Chomu</option>
            </select>
          </Field>
          <Field label={t("Revenue Village", "राजस्व गांव")} required>
            <select defaultValue="Mor">
              <option>Mor</option>
            </select>
          </Field>
          <Field
            label={t("Accident Location / Place", "दुर्घटना का स्थान")}
            required
          >
            <input
              defaultValue={t(
                "Near Khandela Road, Village Mor",
                "खंडेला रोड के पास, गांव मोर",
              )}
              key={locale}
            />
          </Field>
          <Field label={t("Land / Khasra Number", "भूमि / खसरा संख्या")}>
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
                  "Near Mor Primary School",
                  "मोर प्राथमिक विद्यालय के पास",
                )}
                key={locale}
              />
            </Field>
            <Field label={t("Police Station", "पुलिस थाना")}>
              <input
                defaultValue={t("Chomu Police Station", "चोमू पुलिस थाना")}
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
            <input defaultValue="SMS Hospital, Jaipur" />
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
    localized("Jamabandi / Girdawari", "जमाबंदी / गिरदावरी"),
    "Jamabandi_2023.pdf",
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
                  ? t("Mandatory", "अनिवार्य")
                  : t("Optional", "वैकल्पिक")}
              </span>
              <span>
                {file}
                <small>{size}</small>
              </span>
              <em>
                <Check size={15} /> {t("Uploaded", "अपलोड किया गया")}
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
                "Drag and drop files here or click to upload",
                "फाइलें यहां खींचकर छोड़ें या अपलोड करने के लिए क्लिक करें",
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
            "All mandatory documents uploaded.",
            "सभी अनिवार्य दस्तावेज़ अपलोड हो गए हैं।",
          )}
        </p>
      </FormSection>

      <FormSection
        title={t(
          "B. e-KYC Verification (Jan Aadhaar)",
          "B. ई-केवाईसी सत्यापन (जन आधार)",
        )}
      >
        <Notice tone="blue">
          {t(
            "e-KYC is mandatory to ensure identity verification before claim submission.",
            "दावा जमा करने से पहले पहचान सत्यापन सुनिश्चित करने के लिए ई-केवाईसी अनिवार्य है।",
          )}
        </Notice>
        <div className={styles.formGrid}>
          <Field label={t("Jan Aadhaar Number", "जन आधार संख्या")}>
            <input defaultValue="XXXX XXXX 9012" readOnly />
          </Field>
          <Field
            label={t("Name (as per Jan Aadhaar)", "नाम (जन आधार के अनुसार)")}
          >
            <input defaultValue="RAMESH KUMAR" readOnly />
          </Field>
          <Field
            label={t("Mobile Number (Registered)", "मोबाइल नंबर (पंजीकृत)")}
          >
            <input defaultValue="98XXXXXX56" readOnly />
          </Field>
          <Field label={t("e-KYC Mode", "ई-केवाईसी माध्यम")}>
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
          <strong>{t("OTP Verification", "OTP सत्यापन")}</strong>
          <p>
            {t(
              "Enter OTP sent to 98XXXXXX56",
              "98XXXXXX56 पर भेजा गया OTP दर्ज करें",
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
            {t("OTP Verified Successfully", "OTP सफलतापूर्वक सत्यापित हुआ")}
          </span>
        </div>
        <p className={styles.successLine}>
          <Check size={16} />{" "}
          {t(
            "e-KYC verification completed successfully.",
            "ई-केवाईसी सत्यापन सफलतापूर्वक पूरा हुआ।",
          )}
        </p>
      </FormSection>

      <Notice tone="amber">
        {t(
          "Your documents and e-KYC will be verified by the department before final submission.",
          "अंतिम रूप से जमा करने से पहले विभाग आपके दस्तावेज़ों और ई-केवाईसी का सत्यापन करेगा।",
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
              "I hereby declare that the information provided above is true and correct. I understand that false information may lead to rejection.",
              "मैं घोषित करता/करती हूं कि ऊपर दी गई जानकारी सत्य और सही है। मैं समझता/समझती हूं कि गलत जानकारी के कारण दावा अस्वीकार हो सकता है।",
            )}
          </span>
        </label>
      </FormSection>
      <Notice tone="amber">
        {t(
          "Ensure all information and documents are correct before submission.",
          "जमा करने से पहले सुनिश्चित करें कि सभी जानकारी और दस्तावेज़ सही हैं।",
        )}
      </Notice>
      <div className={accepted ? undefined : styles.disabledActions}>
        <ClaimActions
          backHref="/mksy/claim/documents"
          nextHref={accepted ? "/mksy/status" : "/mksy/claim/review"}
          nextLabel={t("Submit Claim", "दावा जमा करें")}
          submit
        />
      </div>
    </>
  );
}
