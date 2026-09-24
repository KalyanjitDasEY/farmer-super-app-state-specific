import { repositories } from "@/services/repositories";

import {
  BottomNavigation,
  type BottomNavigationActive,
} from "./BottomNavigation";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/locale";

export async function ProfileNavigation({
  locale,
  dictionary,
  active,
}: {
  locale: Locale;
  dictionary: Dictionary;
  active: BottomNavigationActive;
}) {
  const snapshot = await repositories.dashboard.getSnapshot();

  return (
    <BottomNavigation
      locale={locale}
      dictionary={dictionary}
      active={active}
      snapshot={snapshot}
    />
  );
}
