import type { ReactNode } from "react";

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";

export default function StartupsLayout({ children }: { children: ReactNode }) {
  return (
    <ServicePageLayout activeNavigation="more">{children}</ServicePageLayout>
  );
}
