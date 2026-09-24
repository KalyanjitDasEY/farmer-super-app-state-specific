import type { Metadata } from "next";

import { DocumentsForm } from "@/features/mksy/components/mksy-forms";
import { ClaimLayout } from "@/features/mksy/components/mksy-components";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t(
      "MKSY Claim - Documents and e-KYC",
      "MKSY दावा - दस्तावेज़ और ई-केवाईसी",
    ),
  };
}

export default async function MksyDocumentsPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <ClaimLayout
      current={3}
      title={t(
        "Documents and e-KYC Verification",
        "दस्तावेज़ और ई-केवाईसी सत्यापन",
      )}
      description={t(
        "Upload supporting documents and complete e-KYC verification.",
        "सहायक दस्तावेज़ अपलोड करें और ई-केवाईसी सत्यापन पूरा करें।",
      )}
      notice={t(
        "Please upload clear and valid documents. All documents will be verified by the concerned department.",
        "कृपया स्पष्ट और वैध दस्तावेज़ अपलोड करें। सभी दस्तावेज़ों का सत्यापन संबंधित विभाग द्वारा किया जाएगा।",
      )}
    >
      <DocumentsForm />
    </ClaimLayout>
  );
}
