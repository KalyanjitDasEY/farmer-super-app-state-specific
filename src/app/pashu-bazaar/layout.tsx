import type { ReactNode } from "react";

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";

export default function PashuBazaarLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ServicePageLayout activeNavigation="nearbyMarket">
      {children}
    </ServicePageLayout>
  );
}
