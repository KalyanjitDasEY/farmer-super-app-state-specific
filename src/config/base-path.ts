const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";

export const appBasePath =
  configuredBasePath === "" || configuredBasePath === "/"
    ? ""
    : `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}`;

export function withBasePath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${appBasePath}${normalizedPath}`;
}
