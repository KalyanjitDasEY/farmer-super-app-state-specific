import { DepartmentPage } from "@/features/schemes/DepartmentPage";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";
import { repositories } from "@/services/repositories";

export default async function DepartmentsPage() {
  const locale = await getRequestLocale();
  const departments = await repositories.schemes.listDepartments();
  return (
    <DepartmentPage
      locale={locale}
      dictionary={getDictionary(locale)}
      departments={departments}
    />
  );
}
