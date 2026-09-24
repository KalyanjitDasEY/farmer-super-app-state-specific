import type { ReactNode } from "react";

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";

export default function SoilHealthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ServicePageLayout activeNavigation="profile">{children}</ServicePageLayout>
  );
}
