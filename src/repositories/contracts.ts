import type {
  AdministrativeArea,
  BeneficiaryStatus,
  DashboardSnapshot,
  Department,
  Page,
  SchemeDetail,
  SchemeQuery,
  SchemeSummary,
} from "@/domain/models";

export interface SchemeRepository {
  list(query: SchemeQuery): Promise<Page<SchemeSummary>>;
  getById(id: string): Promise<SchemeDetail>;
  listPopular(): Promise<SchemeSummary[]>;
  listDepartments(): Promise<Department[]>;
}

export interface DashboardRepository {
  getSnapshot(): Promise<DashboardSnapshot>;
}

export interface IdentityRepository {
  requestOtp(identifier: string): Promise<{
    challengeId: string;
    maskedDestination: string;
  }>;
  verifyOtp(challengeId: string, otp: string): Promise<boolean>;
}

export interface LocationRepository {
  listDistricts(): Promise<AdministrativeArea[]>;
  listTehsils(districtId: string): Promise<AdministrativeArea[]>;
  listVillages(tehsilId: string): Promise<AdministrativeArea[]>;
  resolve(input: {
    districtId: string;
    tehsilId: string;
    villageId: string;
    anchorKhasra: string;
  }): Promise<{ resolutionId: string }>;
}

export interface BeneficiaryRepository {
  getStatus(schemeId: string): Promise<BeneficiaryStatus>;
}
