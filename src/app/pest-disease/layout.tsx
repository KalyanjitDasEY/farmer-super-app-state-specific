import type { ReactNode } from "react";

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";

export default function PestDiseaseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ServicePageLayout activeNavigation="cropDoctor">
      {children}
    </ServicePageLayout>
  );
}
