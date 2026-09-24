import type {
  Jurisdiction,
  SchemeCategory,
  SchemeQuery,
} from "@/domain/models";
import {
  CataloguePage,
  type CatalogueFilters,
} from "@/features/schemes/CataloguePage";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";
import { repositories } from "@/services/repositories";

const jurisdictions: Jurisdiction[] = ["central", "rajasthan"];
const categories: SchemeCategory[] = [
  "income",
  "irrigation",
  "equipment",
  "insurance",
  "livestock",
  "production",
  "marketing",
  "soil",
  "other",
];

const valueOf = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function CatalogueRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getRequestLocale();
  const parameters = await searchParams;
  const jurisdictionValue = valueOf(parameters.jurisdiction);
  const categoryValue = valueOf(parameters.category);
  const queryValue = valueOf(parameters.q)?.trim();
  const sortValue = valueOf(parameters.sort) === "title" ? "title" : "latest";
  const parsedPage = Number.parseInt(valueOf(parameters.page) ?? "1", 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const filters: CatalogueFilters = {
    ...(jurisdictionValue &&
    jurisdictions.includes(jurisdictionValue as Jurisdiction)
      ? { jurisdiction: jurisdictionValue as Jurisdiction }
      : {}),
    ...(categoryValue && categories.includes(categoryValue as SchemeCategory)
      ? { category: categoryValue as SchemeCategory }
      : {}),
    ...(queryValue ? { query: queryValue } : {}),
    sort: sortValue,
  };
  const query: SchemeQuery = {
    locale,
    ...filters,
    page,
    pageSize: 6,
  };
  const result = await repositories.schemes.list(query);
  const preview = result.items[0]
    ? await repositories.schemes.getById(result.items[0].id)
    : undefined;

  return (
    <CataloguePage
      locale={locale}
      dictionary={getDictionary(locale)}
      result={result}
      filters={filters}
      preview={preview}
    />
  );
}
