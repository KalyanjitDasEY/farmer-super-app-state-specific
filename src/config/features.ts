export interface FeatureDefinition {
  id: string;
  enabled: boolean;
  requiresAuthentication: boolean;
  integrationStatus: "mock" | "placeholder";
}

export const featureRegistry: FeatureDefinition[] = [
  {
    id: "schemes",
    enabled: true,
    requiresAuthentication: false,
    integrationStatus: "mock",
  },
  {
    id: "registration",
    enabled: true,
    requiresAuthentication: false,
    integrationStatus: "mock",
  },
  {
    id: "tracking",
    enabled: true,
    requiresAuthentication: false,
    integrationStatus: "mock",
  },
  {
    id: "beneficiary-status",
    enabled: true,
    requiresAuthentication: true,
    integrationStatus: "mock",
  },
  {
    id: "department-sso",
    enabled: false,
    requiresAuthentication: false,
    integrationStatus: "placeholder",
  },
];
