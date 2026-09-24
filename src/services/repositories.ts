import {
  MockDashboardRepository,
  MockBeneficiaryRepository,
  MockIdentityRepository,
  MockLocationRepository,
  MockSchemeRepository,
} from "@/adapters/mock-repositories";

export const repositories = {
  schemes: new MockSchemeRepository(),
  dashboard: new MockDashboardRepository(),
  identity: new MockIdentityRepository(),
  locations: new MockLocationRepository(),
  beneficiary: new MockBeneficiaryRepository(),
};
