"use client";

import {
  BadgeCheck,
  Building2,
  Check,
  CircleAlert,
  CircleCheckBig,
  ClipboardCheck,
  FileCheck2,
  FileUp,
  Landmark,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  UserRound,
  Wheat,
} from "lucide-react";
import {
  type CSSProperties,
  type ReactNode,
  useMemo,
  useRef,
  useState,
} from "react";

import { routes } from "@/config/routes";
import type { SchemeDetail } from "@/domain/models";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/locale";
import {
  type FarmerApplicationProfile,
  getApplicationDocumentRequirements,
} from "@/features/applications/application-data";
import styles from "@/features/applications/application-start.module.css";

type UploadedFiles = Record<string, string>;

const fieldLabels = {
  en: {
    fullName: "Full name",
    farmerId: "Farmer ID",
    janAadhaar: "Jan Aadhaar",
    mobile: "Registered mobile",
    dateOfBirth: "Date of birth",
    gender: "Gender",
    category: "Farmer category",
    addressLine: "Address",
    village: "Village",
    tehsil: "Tehsil",
    district: "District",
    state: "State",
    pinCode: "PIN code",
    area: "Total land area",
    khasraCount: "Linked Khasra records",
    ownership: "Ownership",
    crops: "Current crops",
    bankName: "Bank",
    branch: "Branch",
    accountNumber: "Account number",
    ifsc: "IFSC",
    aadhaarSeeded: "Aadhaar seeding",
    ekycStatus: "e-KYC status",
  },
  hi: {
    fullName: "पूरा नाम",
    farmerId: "किसान आईडी",
    janAadhaar: "जन आधार",
    mobile: "पंजीकृत मोबाइल",
    dateOfBirth: "जन्म तिथि",
    gender: "लिंग",
    category: "किसान श्रेणी",
    addressLine: "पता",
    village: "गांव",
    tehsil: "तहसील",
    district: "जिला",
    state: "राज्य",
    pinCode: "पिन कोड",
    area: "कुल भूमि क्षेत्र",
    khasraCount: "लिंक खसरा रिकॉर्ड",
    ownership: "स्वामित्व",
    crops: "वर्तमान फसलें",
    bankName: "बैंक",
    branch: "शाखा",
    accountNumber: "खाता संख्या",
    ifsc: "आईएफएससी",
    aadhaarSeeded: "आधार लिंक",
    ekycStatus: "ई-केवाईसी स्थिति",
  },
} as const;

function DetailGrid({
  items,
}: {
  items: Array<{ label: string; value: string; wide?: boolean }>;
}) {
  return (
    <dl className={styles.detailGrid}>
      {items.map((item) => (
        <div
          className={item.wide ? styles.wideDetail : undefined}
          key={item.label}
        >
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function SectionHeading({
  icon,
  title,
  verified = false,
  verifiedLabel,
}: {
  icon: ReactNode;
  title: string;
  verified?: boolean;
  verifiedLabel: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <span className={styles.sectionIcon}>{icon}</span>
      <h2>{title}</h2>
      {verified ? (
        <span className={styles.verifiedBadge}>
          <BadgeCheck size={15} aria-hidden="true" />
          {verifiedLabel}
        </span>
      ) : null}
    </div>
  );
}

export function ApplicationStart({
  locale,
  dictionary,
  scheme,
  farmerProfile,
}: {
  locale: Locale;
  dictionary: Dictionary;
  scheme: SchemeDetail;
  farmerProfile: FarmerApplicationProfile;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [created, setCreated] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({});
  const [uploadErrors, setUploadErrors] = useState<UploadedFiles>({});
  const confirmationRef = useRef<HTMLInputElement>(null);
  const reference = "RJ-DEMO-2026-001";
  const labels = fieldLabels[locale];
  const documents = useMemo(
    () => getApplicationDocumentRequirements(scheme),
    [scheme],
  );
  const uploadDocuments = documents.filter(
    (document) => document.source === "upload",
  );
  const uploadedCount = uploadDocuments.filter(
    (document) => uploadedFiles[document.id],
  ).length;
  const availableCount = documents.length - uploadDocuments.length;
  const completion = Math.round(
    ((availableCount + uploadedCount) / documents.length) * 100,
  );

  if (created) {
    return (
      <section className={styles.successCard}>
        <CircleCheckBig size={48} aria-hidden="true" />
        <p className={styles.eyebrow}>{scheme.code}</p>
        <h1>{dictionary["apply.success"]}</h1>
        <p>
          {dictionary["apply.draftSavedDescription"]}
          {uploadDocuments.length > uploadedCount
            ? ` ${uploadDocuments.length - uploadedCount} ${dictionary["apply.documentsStillRequired"]}`
            : ` ${dictionary["apply.allDocumentsReady"]}`}
        </p>
        <div className={styles.reference}>
          <span>{dictionary["apply.reference"]}</span>
          <strong>{reference}</strong>
        </div>
        <div className={styles.successActions}>
          <a
            className={styles.primaryButton}
            href={`${routes.tracking(locale)}?reference=${reference}`}
          >
            {dictionary["tracking.action"]}
          </a>
          <a
            className={styles.secondaryButton}
            href={routes.schemeDetail(locale, scheme.id)}
          >
            {dictionary["common.back"]}
          </a>
        </div>
      </section>
    );
  }

  const personalDetails = [
    { label: labels.fullName, value: farmerProfile.personal.fullName[locale] },
    { label: labels.farmerId, value: farmerProfile.personal.farmerId },
    { label: labels.janAadhaar, value: farmerProfile.personal.janAadhaar },
    { label: labels.mobile, value: farmerProfile.personal.mobile },
    {
      label: labels.dateOfBirth,
      value: farmerProfile.personal.dateOfBirth[locale],
    },
    { label: labels.gender, value: farmerProfile.personal.gender[locale] },
    { label: labels.category, value: farmerProfile.personal.category[locale] },
  ];
  const addressDetails = [
    {
      label: labels.addressLine,
      value: farmerProfile.address.addressLine[locale],
      wide: true,
    },
    { label: labels.village, value: farmerProfile.address.village[locale] },
    { label: labels.tehsil, value: farmerProfile.address.tehsil[locale] },
    { label: labels.district, value: farmerProfile.address.district[locale] },
    { label: labels.state, value: farmerProfile.address.state[locale] },
    { label: labels.pinCode, value: farmerProfile.address.pinCode },
  ];
  const landDetails = [
    { label: labels.area, value: farmerProfile.land.area },
    { label: labels.khasraCount, value: farmerProfile.land.khasraCount },
    { label: labels.ownership, value: farmerProfile.land.ownership[locale] },
    { label: labels.crops, value: farmerProfile.land.crops[locale] },
  ];
  const bankDetails = [
    { label: labels.bankName, value: farmerProfile.bank.bankName[locale] },
    { label: labels.branch, value: farmerProfile.bank.branch[locale] },
    { label: labels.accountNumber, value: farmerProfile.bank.accountNumber },
    { label: labels.ifsc, value: farmerProfile.bank.ifsc },
    {
      label: labels.aadhaarSeeded,
      value: farmerProfile.bank.aadhaarSeeded[locale],
    },
    {
      label: labels.ekycStatus,
      value: farmerProfile.bank.ekycStatus[locale],
    },
  ];

  return (
    <div className={styles.application}>
      <header className={styles.applicationHeader}>
        <div>
          <p className={styles.eyebrow}>
            {dictionary["apply.schemeApplication"]} · {scheme.code}
          </p>
          <h1>{scheme.title[locale]}</h1>
          <p>{scheme.summary[locale]}</p>
        </div>
        <a
          className={styles.secondaryButton}
          href={routes.schemeDetail(locale, scheme.id)}
        >
          {dictionary["common.back"]}
        </a>
      </header>

      <ol className={styles.steps} aria-label={dictionary["apply.progress"]}>
        {[
          dictionary["apply.stepProfile"],
          dictionary["apply.stepScheme"],
          dictionary["apply.stepDocuments"],
          dictionary["apply.stepReview"],
        ].map((step, index) => (
          <li
            className={index === 0 ? styles.activeStep : undefined}
            key={step}
          >
            <span>{index + 1}</span>
            {step}
          </li>
        ))}
      </ol>

      <div className={styles.prefillNotice}>
        <ShieldCheck size={24} aria-hidden="true" />
        <div>
          <strong>{dictionary["apply.prefilledTitle"]}</strong>
          <p>{dictionary["apply.prefilledDescription"]}</p>
        </div>
        <a href={routes.profile(locale)}>{dictionary["apply.updateProfile"]}</a>
      </div>

      <div className={styles.contentLayout}>
        <main className={styles.formSections}>
          <section className={styles.formSection}>
            <SectionHeading
              icon={<UserRound size={21} />}
              title={dictionary["apply.personalDetails"]}
              verified
              verifiedLabel={dictionary["apply.verified"]}
            />
            <DetailGrid items={personalDetails} />
          </section>

          <section className={styles.formSection}>
            <SectionHeading
              icon={<MapPin size={21} />}
              title={dictionary["apply.addressDetails"]}
              verified
              verifiedLabel={dictionary["apply.verified"]}
            />
            <DetailGrid items={addressDetails} />
          </section>

          <section className={styles.splitSections}>
            <div className={styles.formSection}>
              <SectionHeading
                icon={<Wheat size={21} />}
                title={dictionary["apply.landDetails"]}
                verified
                verifiedLabel={dictionary["apply.verified"]}
              />
              <DetailGrid items={landDetails} />
            </div>
            <div className={styles.formSection}>
              <SectionHeading
                icon={<Landmark size={21} />}
                title={dictionary["apply.bankDetails"]}
                verified
                verifiedLabel={dictionary["apply.verified"]}
              />
              <DetailGrid items={bankDetails} />
            </div>
          </section>

          <section className={styles.formSection}>
            <SectionHeading
              icon={<ClipboardCheck size={21} />}
              title={dictionary["apply.schemeDetails"]}
              verifiedLabel={dictionary["apply.verified"]}
            />
            <div className={styles.schemeFacts}>
              <div>
                <span>{dictionary["scheme.benefit"]}</span>
                <strong>{scheme.benefit[locale]}</strong>
              </div>
              <div>
                <span>{dictionary["scheme.jurisdiction"]}</span>
                <strong>
                  {scheme.jurisdiction === "central"
                    ? dictionary["apply.centralScheme"]
                    : dictionary["apply.rajasthanScheme"]}
                </strong>
              </div>
              <div>
                <span>{dictionary["scheme.eligibility"]}</span>
                <strong>{scheme.eligibility[0]?.[locale]}</strong>
              </div>
            </div>
            <div className={styles.editableFields}>
              <label>
                <span>{dictionary["apply.primaryFarm"]}</span>
                <select defaultValue="morija">
                  <option value="morija">Morija Farm · Chomu · 3.62 ha</option>
                </select>
              </label>
              <label>
                <span>{dictionary["apply.requestedActivity"]}</span>
                {scheme.category === "equipment" ? (
                  <select defaultValue="">
                    <option disabled value="">
                      {dictionary["apply.selectEquipment"]}
                    </option>
                    <option value="tractor-mounted">
                      Tractor-mounted implement
                    </option>
                    <option value="seed-drill">Seed drill</option>
                    <option value="rotavator">Rotavator</option>
                    <option value="sprayer">Power sprayer</option>
                  </select>
                ) : (
                  <input defaultValue={scheme.purpose[locale]} type="text" />
                )}
              </label>
            </div>
          </section>

          <section className={styles.formSection}>
            <SectionHeading
              icon={<FileCheck2 size={21} />}
              title={dictionary["apply.documentChecklist"]}
              verifiedLabel={dictionary["apply.verified"]}
            />
            <p className={styles.sectionDescription}>
              {dictionary["apply.documentDescription"]}
            </p>
            <div className={styles.documentList}>
              {documents.map((document) => {
                const fileName = uploadedFiles[document.id];
                const error = uploadErrors[document.id];
                const isAvailable = document.source === "profile";
                return (
                  <article className={styles.documentCard} key={document.id}>
                    <span
                      className={
                        isAvailable || fileName
                          ? styles.documentReadyIcon
                          : styles.documentPendingIcon
                      }
                    >
                      {isAvailable || fileName ? (
                        <Check size={20} aria-hidden="true" />
                      ) : (
                        <FileUp size={20} aria-hidden="true" />
                      )}
                    </span>
                    <div className={styles.documentInformation}>
                      <div className={styles.documentTitle}>
                        <h3>{document.name[locale]}</h3>
                        <span
                          className={
                            isAvailable || fileName
                              ? styles.availableBadge
                              : styles.uploadBadge
                          }
                        >
                          {isAvailable
                            ? dictionary["apply.availableInProfile"]
                            : fileName
                              ? dictionary["apply.uploaded"]
                              : dictionary["apply.uploadRequired"]}
                        </span>
                      </div>
                      <p>{document.description[locale]}</p>
                      <small>{document.acceptedFormats[locale]}</small>
                      {fileName ? (
                        <strong className={styles.fileName}>
                          <FileCheck2 size={15} aria-hidden="true" />
                          {fileName}
                        </strong>
                      ) : null}
                      {error ? (
                        <span className={styles.uploadError} role="alert">
                          {error}
                        </span>
                      ) : null}
                    </div>
                    {document.source === "upload" ? (
                      <label className={styles.uploadButton}>
                        <FileUp size={17} aria-hidden="true" />
                        {fileName
                          ? dictionary["apply.replaceFile"]
                          : dictionary["apply.chooseFile"]}
                        <input
                          accept=".pdf,.jpg,.jpeg,.png"
                          aria-label={`${dictionary["apply.chooseFile"]}: ${document.name[locale]}`}
                          type="file"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (!file) return;
                            if (file.size > 5 * 1024 * 1024) {
                              setUploadErrors((current) => ({
                                ...current,
                                [document.id]: dictionary["apply.fileTooLarge"],
                              }));
                              return;
                            }
                            setUploadErrors((current) => {
                              const next = { ...current };
                              delete next[document.id];
                              return next;
                            });
                            setUploadedFiles((current) => ({
                              ...current,
                              [document.id]: file.name,
                            }));
                          }}
                        />
                      </label>
                    ) : (
                      <LockKeyhole
                        className={styles.lockIcon}
                        size={19}
                        aria-label={dictionary["apply.verified"]}
                      />
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          <section className={styles.consentSection}>
            <label>
              <input
                ref={confirmationRef}
                type="checkbox"
                required
                checked={confirmed}
                onChange={(event) => setConfirmed(event.target.checked)}
                aria-invalid={attempted && !confirmed}
              />
              <span>{dictionary["apply.confirmAvailableDetails"]}</span>
            </label>
            {attempted && !confirmed ? (
              <p className={styles.fieldError} role="alert">
                {dictionary["common.required"]}
              </p>
            ) : null}
            <p>
              <LockKeyhole size={16} aria-hidden="true" />
              {dictionary["apply.dataConsent"]}
            </p>
          </section>

          <div className={styles.formActions}>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={() => {
                const isConfirmed = Boolean(confirmationRef.current?.checked);
                setConfirmed(isConfirmed);
                setAttempted(true);
                if (isConfirmed) setCreated(true);
                else confirmationRef.current?.focus();
              }}
            >
              {dictionary["apply.create"]}
            </button>
            <a
              className={styles.secondaryButton}
              href={routes.schemeDetail(locale, scheme.id)}
            >
              {dictionary["common.back"]}
            </a>
          </div>
        </main>

        <aside className={styles.summarySidebar}>
          <section className={styles.summaryCard}>
            <h2>{dictionary["apply.applicationReadiness"]}</h2>
            <div
              className={styles.progressRing}
              style={
                {
                  "--progress": `${completion * 3.6}deg`,
                } as CSSProperties
              }
            >
              <span>{completion}%</span>
            </div>
            <p>
              {availableCount} {dictionary["apply.recordsAvailable"]} ·{" "}
              {uploadedCount}/{uploadDocuments.length}{" "}
              {dictionary["apply.uploadsCompleted"]}
            </p>
            <div className={styles.progressBar}>
              <span style={{ width: `${completion}%` }} />
            </div>
          </section>

          <section className={styles.summaryCard}>
            <h2>{dictionary["apply.availableFromProfile"]}</h2>
            <ul className={styles.checkList}>
              <li>
                <Check size={16} /> {dictionary["apply.identityVerified"]}
              </li>
              <li>
                <Check size={16} /> {dictionary["apply.landVerified"]}
              </li>
              <li>
                <Check size={16} /> {dictionary["apply.bankVerified"]}
              </li>
            </ul>
          </section>

          <section className={styles.summaryCard}>
            <h2>{dictionary["apply.actionRequired"]}</h2>
            {uploadDocuments.length === uploadedCount ? (
              <p className={styles.readyMessage}>
                <CircleCheckBig size={18} />
                {dictionary["apply.allDocumentsReady"]}
              </p>
            ) : (
              <p className={styles.pendingMessage}>
                <CircleAlert size={18} />
                {uploadDocuments.length - uploadedCount}{" "}
                {dictionary["apply.documentsStillRequired"]}
              </p>
            )}
          </section>

          <div className={styles.securityNotice}>
            <Building2 size={20} aria-hidden="true" />
            <p>{dictionary["scheme.unverified"]}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
