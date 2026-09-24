import type { ReactNode } from "react";

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";

export default function WeatherLayout({ children }: { children: ReactNode }) {
  return (
    <ServicePageLayout activeNavigation="home">{children}</ServicePageLayout>
  );
}
