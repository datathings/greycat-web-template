import { readFileSync, writeFileSync } from "node:fs";

const CORE_LATEST = "https://get.greycat.io/files/core/stable/latest";
const WEB_LATEST = "https://get.greycat.io/files/sdk/web/stable/latest";

async function fetchVersion(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  const text = (await res.text()).trim();
  // response is "major.minor/full-version", we only want the full version
  return text.includes("/") ? text.split("/").pop() : text;
}

const [coreVersion, webVersion] = await Promise.all([
  fetchVersion(CORE_LATEST),
  fetchVersion(WEB_LATEST),
]);

console.log(`core: ${coreVersion}`);
console.log(`web:  ${webVersion}`);

// update project.gcl
const projectGcl = readFileSync("project.gcl", "utf-8");
const updatedGcl = projectGcl.replace(
  /@library\("std",\s*"[^"]+"\)/,
  `@library("std", "${coreVersion}")`,
);
writeFileSync("project.gcl", updatedGcl);

// update package.json
const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
const webMajorMinor = webVersion.replace(/-stable$/, "").replace(/\.\d+$/, "");
pkg.dependencies["@greycat/web"] =
  `https://get.greycat.io/files/sdk/web/stable/${webMajorMinor}/${webVersion}.tgz`;
writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");

console.log("project.gcl and package.json updated.");
