import { DomainError } from "@/domain/errors";
import type {
  Page,
  SchemeDetail,
  SchemeQuery,
  SchemeSummary,
} from "@/domain/models";
import {
  mockDashboard,
  mockBeneficiaryStatus,
  mockDepartments,
  mockLocations,
  mockSchemes,
} from "@/mocks/data";
import type {
  DashboardRepository,
  BeneficiaryRepository,
  IdentityRepository,
  LocationRepository,
  SchemeRepository,
} from "@/repositories/contracts";

const delay = async () => {
  const timeout = Number(process.env.MOCK_LATENCY_MS ?? 0);
  if (timeout > 0 && process.env.NODE_ENV !== "test") {
    await new Promise((resolve) => setTimeout(resolve, Math.min(timeout, 500)));
  }
};

export class MockSchemeRepository implements SchemeRepository {
  async list(query: SchemeQuery): Promise<Page<SchemeSummary>> {
    await delay();
    const normalizedQuery = query.query?.trim().toLocaleLowerCase(query.locale);
    let items = mockSchemes.filter((scheme) => {
      if (query.jurisdiction && scheme.jurisdiction !== query.jurisdiction) {
        return false;
      }
      if (query.category && scheme.category !== query.category) {
        return false;
      }
      if (!normalizedQuery) return true;
      const searchable =
        `${scheme.title[query.locale]} ${scheme.summary[query.locale]}`.toLocaleLowerCase(
          query.locale,
        );
      return searchable.includes(normalizedQuery);
    });

    items =
      query.sort === "title"
        ? items.toSorted((a, b) =>
            a.title[query.locale].localeCompare(b.title[query.locale]),
          )
        : items.toSorted((a, b) => b.updatedAt.localeCompare(a.updatedAt));

    const start = (query.page - 1) * query.pageSize;
    return {
      items: items.slice(start, start + query.pageSize),
      page: query.page,
      pageSize: query.pageSize,
      totalItems: items.length,
      totalPages: Math.max(1, Math.ceil(items.length / query.pageSize)),
      updatedAt: mockSchemes[0]?.updatedAt ?? new Date(0).toISOString(),
    };
  }

  async getById(id: string): Promise<SchemeDetail> {
    await delay();
    const scheme = mockSchemes.find((item) => item.id === id);
    if (!scheme) {
      throw new DomainError("NOT_FOUND", "scheme.notFound");
    }
    return scheme;
  }

  async listPopular(): Promise<SchemeSummary[]> {
    await delay();
    return [
      "pm-kisan",
      "fasal-bima",
      "bihar-irrigation",
      "bihar-crop-support",
    ].map((id) => {
      const scheme = mockSchemes.find((item) => item.id === id);
      if (!scheme) {
        throw new DomainError("NOT_FOUND", "scheme.notFound");
      }
      return scheme;
    });
  }

  async listDepartments() {
    await delay();
    return mockDepartments;
  }
}

export class MockDashboardRepository implements DashboardRepository {
  async getSnapshot() {
    await delay();
    return mockDashboard;
  }
}

export class MockIdentityRepository implements IdentityRepository {
  async requestOtp(identifier: string) {
    await delay();
    if (!/^\d{10,12}$/.test(identifier)) {
      throw new DomainError("VALIDATION", "login.invalidIdentifier");
    }
    return {
      challengeId: `demo-${identifier.slice(-4)}`,
      maskedDestination: "+91 98XXXXXX56",
    };
  }

  async verifyOtp(challengeId: string, otp: string) {
    await delay();
    if (!challengeId.startsWith("demo-")) {
      throw new DomainError("VALIDATION", "login.invalidOtp");
    }
    return otp === "123456";
  }
}

export class MockLocationRepository implements LocationRepository {
  async listDistricts() {
    await delay();
    return mockLocations.districts;
  }

  async listTehsils(districtId: string) {
    await delay();
    return mockLocations.tehsils.filter((item) => item.parentId === districtId);
  }

  async listVillages(tehsilId: string) {
    await delay();
    return mockLocations.villages.filter((item) => item.parentId === tehsilId);
  }

  async resolve(input: {
    districtId: string;
    tehsilId: string;
    villageId: string;
    anchorKhasra: string;
  }) {
    await delay();
    const village = mockLocations.villages.find(
      (item) => item.id === input.villageId && item.parentId === input.tehsilId,
    );
    const tehsil = mockLocations.tehsils.find(
      (item) =>
        item.id === input.tehsilId && item.parentId === input.districtId,
    );
    if (!village || !tehsil || !/^\d+(?:\/\d+)?$/.test(input.anchorKhasra)) {
      throw new DomainError("VALIDATION", "register.invalidKhasra");
    }
    return { resolutionId: `demo-${input.villageId}-${input.anchorKhasra}` };
  }
}

export class MockBeneficiaryRepository implements BeneficiaryRepository {
  async getStatus(schemeId: string) {
    await delay();
    if (schemeId !== mockBeneficiaryStatus.schemeId) {
      throw new DomainError("NOT_FOUND", "scheme.notFound");
    }
    return mockBeneficiaryStatus;
  }
}
