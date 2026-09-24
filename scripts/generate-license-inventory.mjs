import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve("node_modules");
const packageJson = JSON.parse(await readFile(resolve("package.json"), "utf8"));
const directRuntime = new Set(Object.keys(packageJson.dependencies ?? {}));
const directDevelopment = new Set(
  Object.keys(packageJson.devDependencies ?? {}),
);
const packages = new Map();

const visitPackage = async (directory) => {
  const manifestPath = join(directory, "package.json");
  try {
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    if (manifest.name && manifest.version) {
      const key = `${manifest.name}@${manifest.version}`;
      const license =
        typeof manifest.license === "string"
          ? manifest.license
          : (manifest.license?.type ?? "UNKNOWN");
      const dependencyType = directRuntime.has(manifest.name)
        ? "runtime"
        : directDevelopment.has(manifest.name)
          ? "development"
          : "transitive";
      packages.set(key, {
        name: manifest.name,
        version: manifest.version,
        license,
        dependencyType,
      });
    }
  } catch {
    return;
  }

  await visitModules(join(directory, "node_modules"));
};

const visitModules = async (directory) => {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
    const path = join(directory, entry.name);
    if (entry.name.startsWith("@")) {
      const scopedEntries = await readdir(path, { withFileTypes: true });
      for (const scopedEntry of scopedEntries) {
        if (scopedEntry.isDirectory()) {
          await visitPackage(join(path, scopedEntry.name));
        }
      }
    } else {
      await visitPackage(path);
    }
  }
};

await visitModules(root);

const quote = (value) => `"${String(value).replaceAll('"', '""')}"`;
const rows = [
  ["Name", "Version", "License", "Dependency type"],
  ...[...packages.values()]
    .sort(
      (a, b) =>
        a.name.localeCompare(b.name) || a.version.localeCompare(b.version),
    )
    .map(({ name, version, license, dependencyType }) => [
      name,
      version,
      license,
      dependencyType,
    ]),
];

await writeFile(
  resolve("THIRD_PARTY_LICENSES.csv"),
  `${rows.map((row) => row.map(quote).join(",")).join("\n")}\n`,
  "utf8",
);

console.log(`Wrote ${packages.size} package license records.`);
