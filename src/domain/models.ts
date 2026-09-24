import type { Locale } from "@/types/locale";

export type Jurisdiction = "central" | "rajasthan";
export type SchemeCategory =
  | "income"
  | "irrigation"
  | "equipment"
  | "insurance"
  | "livestock"
  | "production"
  | "marketing"
  | "soil"
  | "other";

export interface LocalizedText {
  en: string;
  hi: string;
}

export interface SchemeSummary {
  id: string;
  code: string;
  jurisdiction: Jurisdiction;
  category: SchemeCategory;
  title: LocalizedText;
  summary: LocalizedText;
  benefit: LocalizedText;
  updatedAt: string;
}

export interface SchemeDetail extends SchemeSummary {
  purpose: LocalizedText;
  description: LocalizedText;
  eligibility: LocalizedText[];
  documents: LocalizedText[];
  features: LocalizedText[];
}

export interface SchemeQuery {
  locale: Locale;
  jurisdiction?: Jurisdiction;
  category?: SchemeCategory;
  query?: string;
  sort: "latest" | "title";
  page: number;
  pageSize: number;
}

export interface Page<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  updatedAt: string;
}

export interface Department {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  type: "department" | "agency";
  available: boolean;
}

export interface AdministrativeArea {
  id: string;
  parentId?: string;
  name: LocalizedText;
}

export interface DashboardSnapshot {
  farmerName: LocalizedText;
  farmerId: string;
  janAadhaarMasked: string;
  landAreaHectares: number;
  khasraCount: number;
  applicationCount: number;
  benefitAmount: number;
  temperatureCelsius: number;
  mandiPrices: Array<{
    commodity: LocalizedText;
    price: number;
    change: number;
  }>;
  updatedAt: string;
}

export interface BeneficiaryStatus {
  schemeId: string;
  registrationNumberMasked: string;
  farmerName: string;
  aadhaarSeeded: boolean;
  ekycVerifiedAt: string;
  landAreaHectares: number;
  khasraCount: number;
  installments: Array<{
    sequence: number;
    amount: number;
    paidAt: string;
    bankReferenceMasked: string;
  }>;
}
