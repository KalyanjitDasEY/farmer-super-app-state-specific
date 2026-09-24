export type DomainErrorCode =
  | "VALIDATION"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "RATE_LIMITED"
  | "OFFLINE"
  | "UNAVAILABLE"
  | "UNKNOWN";

export class DomainError extends Error {
  constructor(
    public readonly code: DomainErrorCode,
    public readonly messageKey: string,
    public readonly fieldErrors?: Record<string, string>,
  ) {
    super(messageKey);
    this.name = "DomainError";
  }
}
