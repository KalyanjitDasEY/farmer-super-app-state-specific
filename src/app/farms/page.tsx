import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { PageHeader } from "@/features/authenticated/components/app-components";
import styles from "@/features/authenticated/components/app-pages.module.css";
import { FarmDashboard } from "@/features/farms/components/farm-dashboard";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("My Farms", "मेरे फार्म") };
}

export default async function FarmsPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <>
      <PageHeader
        title={t("My Farms", "मेरे फार्म")}
        subtitle={t(
          "Manage your farms, fields and crops in one place",
          "अपने फार्म, खेत और फसलों को एक ही जगह प्रबंधित करें",
        )}
        action={
          <Link className={styles.primaryButton} href="/farms/new">
            <Plus size={18} /> {t("Add Farm", "फार्म जोड़ें")}
          </Link>
        }
      />
      <FarmDashboard />
    </>
  );
}
