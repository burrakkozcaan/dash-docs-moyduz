/**
 * Paket key'leri – URL ve flow'ta kullanılır.
 * API'den dönen plan isimleri (plan.name) ile eşleşmelidir.
 */
export type PackageKey = "starter" | "business" | "commerce" | "marketplace" | "custom";

/** API'deki plan adları (Laravel'den dönen name alanı) */
export const PLAN_NAMES = {
  STARTER: "Starter",
  BUSINESS: "Business",
  COMMERCE: "Commerce Suite",
  MARKETPLACE: "Marketplace Suite",
  CUSTOM: "Custom",
} as const;

export type PlanName = (typeof PLAN_NAMES)[keyof typeof PLAN_NAMES];

function normalizeText(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * URL'deki package param → API plan name.
 * commerce-suite / marketplace-suite alias'ları desteklenir.
 */
export const PACKAGE_KEY_TO_PLAN_NAME: Record<string, PlanName> = {
  starter: PLAN_NAMES.STARTER,
  business: PLAN_NAMES.BUSINESS,
  commerce: PLAN_NAMES.COMMERCE,
  "commerce-suite": PLAN_NAMES.COMMERCE,
  marketplace: PLAN_NAMES.MARKETPLACE,
  "marketplace-suite": PLAN_NAMES.MARKETPLACE,
  custom: PLAN_NAMES.CUSTOM,
};

/**
 * API plan name → URL'de kullanılan package key.
 */
export const PLAN_NAME_TO_PACKAGE_KEY: Record<PlanName, PackageKey> = {
  [PLAN_NAMES.STARTER]: "starter",
  [PLAN_NAMES.BUSINESS]: "business",
  [PLAN_NAMES.COMMERCE]: "commerce",
  [PLAN_NAMES.MARKETPLACE]: "marketplace",
  [PLAN_NAMES.CUSTOM]: "custom",
};

/** URL'den gelen package param'ı normalize eder (commerce-suite → commerce). */
export function normalizePackageParam(param: string | null): PackageKey {
  if (!param) return "starter";
  if (param === "commerce-suite") return "commerce";
  if (param === "marketplace-suite") return "marketplace";
  if (["starter", "business", "commerce", "marketplace", "custom"].includes(param)) {
    return param as PackageKey;
  }
  return "starter";
}

/** Package key'den plan adını döner (gösterim için). */
export function getPlanName(packageKeyOrParam: string | null): PlanName {
  const key = normalizePackageParam(packageKeyOrParam);
  return PACKAGE_KEY_TO_PLAN_NAME[key] ?? PLAN_NAMES.STARTER;
}

/**
 * API'den gelen plan adını güvenli şekilde package key'e dönüştürür.
 * Örn: "Marketplace Suite", "Pazaryeri Paketi" gibi varyasyonlar.
 */
export function inferPackageKeyFromPlanName(
  planName: string | null | undefined,
): PackageKey {
  if (!planName) return "starter";
  const normalized = normalizeText(planName);

  if (normalized.includes("marketplace") || normalized.includes("pazaryeri")) {
    return "marketplace";
  }
  if (
    normalized.includes("commerce") ||
    normalized.includes("e-ticaret") ||
    normalized.includes("eticaret")
  ) {
    return "commerce";
  }
  if (normalized.includes("business") || normalized.includes("profesyonel")) {
    return "business";
  }
  if (normalized.includes("custom") || normalized.includes("ozel")) {
    return "custom";
  }
  if (normalized.includes("starter") || normalized.includes("baslangic")) {
    return "starter";
  }

  return "starter";
}
