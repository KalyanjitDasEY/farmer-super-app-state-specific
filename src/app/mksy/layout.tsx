import type { ReactNode } from "react";

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";

export default function MksyLayout({ children }: { children: ReactNode }) {
  return (
    <ServicePageLayout activeNavigation="schemes">{children}</ServicePageLayout>
  );
}
