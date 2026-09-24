import type { ReactNode } from "react";

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";

export default function FarmsLayout({ children }: { children: ReactNode }) {
  return (
    <ServicePageLayout activeNavigation="myFarm">{children}</ServicePageLayout>
  );
}
