import type { Metadata } from "next";

import { DocumentsForm } from "@/features/mksy/components/mksy-forms";
import { ClaimLayout } from "@/features/mksy/components/mksy-components";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t(
      "Bihar Demo Claim - Documents and Identity",
      "बिहार डेमो दावा - दस्तावेज़ और पहचान",
    ),
  };
}

export default async function MksyDocumentsPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <ClaimLayout
      current={3}
      title={t(
        "Documents and Demo Identity Check",
        "दस्तावेज़ और डेमो पहचान जांच",
      )}
      description={t(
        "Review sample supporting documents and the simulated identity step.",
        "नमूना सहायक दस्तावेज़ और सांकेतिक पहचान चरण देखें।",
      )}
      notice={t(
        "Sample files only. No documents are uploaded or verified by a government department.",
        "केवल नमूना फ़ाइलें। कोई दस्तावेज़ अपलोड नहीं होता या सरकारी विभाग द्वारा सत्यापित नहीं किया जाता।",
      )}
    >
      <DocumentsForm />
    </ClaimLayout>
  );
}
