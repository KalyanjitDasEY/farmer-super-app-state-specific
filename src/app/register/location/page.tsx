import { RegistrationShell } from "@/components/layout/RegistrationShell";
import { LocationForm } from "@/features/onboarding/LocationForm";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";
import { repositories } from "@/services/repositories";

export default async function LocationPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const districts = await repositories.locations.listDistricts();
  const tehsils = (
    await Promise.all(
      districts.map((district) =>
        repositories.locations.listTehsils(district.id),
      ),
    )
  ).flat();
  const villages = (
    await Promise.all(
      tehsils.map((tehsil) => repositories.locations.listVillages(tehsil.id)),
    )
  ).flat();

  return (
    <RegistrationShell locale={locale} dictionary={dictionary}>
      <LocationForm
        locale={locale}
        dictionary={dictionary}
        districts={districts}
        tehsils={tehsils}
        villages={villages}
      />
    </RegistrationShell>
  );
}
