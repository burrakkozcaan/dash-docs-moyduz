"use client";

/* eslint-disable @next/next/no-img-element */

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  RiArrowLeftSLine,
  RiCloseLine,
  RiInformationLine,
  RiPulseLine,
} from "@remixicon/react";
import {
  AlertTriangle,
  Check,
  CreditCard,
  Globe,
  Search,
  Sparkles,
} from "lucide-react";

import * as Button from "@repo/ui/new-ui/button";
import AppLogoIcon from "@/components/app-logo-icon";
import { MOCK_TEMPLATES } from "@/lib/data/templates";
import { useOnboarding } from "@/app/onboarding/onboarding-context";
import { cn } from "@/utils/cn";
import { inferPackageKeyFromPlanName } from "@/utils/packages";

type OnboardingStep = {
  id: string;
  title: string;
};

type WebsiteChoice = "yes" | "no" | "";
type PreviewMode = "template" | "current";

interface RememberedOnboardingState {
  currentStep: number;
  hasWebsite: WebsiteChoice;
  domain: string;
  scanResult: ScanResult | null;
  scannedSiteTitle: string;
  scanBlocked: boolean;
  nextScanAtHuman: string | null;
  scanRequestError: string | null;
  previewMode: PreviewMode;
  selectedPlanId: number | null;
  selectedAddonIds: number[];
  businessType: string;
  targetAudience: string;
  mainGoal: string;
  primaryMetric: string;
}

interface ScanSummary {
  bullets?: string[];
  impact?: string | null;
  recommendation?: string | null;
}

interface ScanTechnical {
  robots_txt?: boolean;
  sitemap_xml?: boolean;
  sitemap_url?: string | null;
  open_graph?: boolean;
  twitter_cards?: boolean;
  schema_org?: boolean;
  favicon?: boolean;
}

interface ScanPreview {
  provider?: string;
  screenshot_url?: string | null;
  open_graph_image_url?: string | null;
}

interface ScanPerformance {
  available?: boolean;
  source?: string;
  strategy?: string;
  performance_score?: number | null;
  first_contentful_paint?: string | null;
  largest_contentful_paint?: string | null;
  speed_index?: string | null;
  total_blocking_time?: string | null;
  cumulative_layout_shift?: string | null;
  status_code?: number | null;
  failure_reason?: string | null;
  failure_message?: string | null;
}

interface ScanResult {
  domain: string;
  url: string;
  score: number;
  seo: Record<string, boolean>;
  presence: Record<string, boolean>;
  technical?: ScanTechnical;
  preview?: ScanPreview;
  performance?: ScanPerformance;
  title?: string;
  h1?: string;
  meta_title?: string;
  meta_description?: string;
  estimated?: boolean;
  error?: string | null;
  summary?: ScanSummary | null;
}

interface Addon {
  id: number;
  key: string;
  name: string;
  description?: string;
  price: number | string;
  is_recommended?: boolean;
  billing_type?: string;
}

interface PlanFromApi {
  id: number;
  name: string;
  description?: string;
  setup_price: number | string;
  monthly_price: number | string;
  addons?: Addon[];
}

interface BriefPreset {
  id: string;
  label: string;
  subtitle: string;
  businessType: string;
  targetAudience: string;
  mainGoal: string;
  primaryMetric: string;
}

const STEPS: OnboardingStep[] = [
  { id: "scan", title: "Live Site Analysis" },
  { id: "package", title: "Package Selection" },
  { id: "addons", title: "Add-on Selection" },
  { id: "questions", title: "Quick Questions" },
  { id: "summary", title: "Summary" },
  { id: "payment", title: "Payment" },
];

const MOCK_PLANS: PlanFromApi[] = [
  {
    id: 1,
    name: "Starter",
    description: "Corporate showcase website",
    setup_price: 4990,
    monthly_price: 990,
    addons: [],
  },
  {
    id: 2,
    name: "Business",
    description: "Professional business website + SEO",
    setup_price: 7990,
    monthly_price: 1490,
    addons: [],
  },
  {
    id: 3,
    name: "Commerce Suite",
    description: "Ecommerce + payment integration",
    setup_price: 12990,
    monthly_price: 1990,
    addons: [],
  },
];

const PACKAGE_BRIEF_PRESETS: Record<string, BriefPreset[]> = {
  starter: [
    {
      id: "starter-visibility",
      label: "Corporate visibility",
      subtitle: "Showcase-first start",
      businessType: "Corporate showcase website",
      targetAudience: "Potential customers searching for your company on Google",
      mainGoal: "Increase trust and contact form conversions",
      primaryMetric: "Monthly contact form submissions",
    },
    {
      id: "starter-local",
      label: "Local customer growth",
      subtitle: "Regional demand focus",
      businessType: "Local service business",
      targetAudience: "Users looking for services in your city",
      mainGoal: "Increase phone calls and WhatsApp starts",
      primaryMetric: "Monthly phone/WhatsApp leads",
    },
  ],
  business: [
    {
      id: "business-lead",
      label: "Lead generation",
      subtitle: "Sales call pipeline",
      businessType: "B2B service company",
      targetAudience: "Decision-makers and team leads",
      mainGoal: "Consistently increase demo and quote requests",
      primaryMetric: "Monthly demo/quote requests",
    },
    {
      id: "business-authority",
      label: "Authority positioning",
      subtitle: "Content + SEO growth",
      businessType: "Professional consulting brand",
      targetAudience: "Customers comparing services through research",
      mainGoal: "Generate organic traffic and content-driven leads",
      primaryMetric: "Monthly SEO-driven leads",
    },
  ],
  commerce: [
    {
      id: "commerce-sales",
      label: "Sales growth",
      subtitle: "Product-led ecommerce",
      businessType: "Ecommerce store",
      targetAudience: "Mobile-first online shoppers comparing products",
      mainGoal: "Improve cart-to-checkout completion",
      primaryMetric: "Monthly orders and conversion rate",
    },
    {
      id: "commerce-roas",
      label: "Ad efficiency",
      subtitle: "ROAS optimization",
      businessType: "Performance-ad-driven online sales",
      targetAudience: "New users arriving from Meta/Google ads",
      mainGoal: "Generate more revenue from ad spend",
      primaryMetric: "ROAS and customer acquisition cost",
    },
  ],
  marketplace: [
    {
      id: "marketplace-sellers",
      label: "Seller growth",
      subtitle: "Multi-vendor model",
      businessType: "Marketplace platformu",
      targetAudience: "Sellers and buyers who want to join the platform",
      mainGoal: "Grow active sellers and transaction volume",
      primaryMetric: "Monthly active sellers and GMV",
    },
  ],
  custom: [
    {
      id: "custom-enterprise",
      label: "Custom integration",
      subtitle: "Company-specific needs",
      businessType: "Organization with custom software needs",
      targetAudience: "Internal operations teams",
      mainGoal: "Digitize and speed up operations",
      primaryMetric: "Operational time per process",
    },
  ],
};

const FLOW_STEP_TO_INDEX: Record<string, number> = {
  scan: 0,
  package: 1,
  addons: 2,
  questions: 3,
  summary: 4,
  payment: 5,
};

function getInitialStepIndex(flowStep: string | null): number {
  if (!flowStep) return 0;
  const mapped = FLOW_STEP_TO_INDEX[flowStep];
  if (typeof mapped !== "number") return 0;
  return Math.min(STEPS.length - 1, Math.max(0, mapped));
}

function StepSuccessIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      className="size-3.5 shrink-0 origin-center text-green-500"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M7 14A7 7 0 117 0a7 7 0 010 14zm-.698-4.2l4.95-4.95-.99-.99-3.96 3.96-1.98-1.98-.99.99 2.97 2.97z"
      />
    </svg>
  );
}

function formatMoney(price: number | string): string {
  const n = typeof price === "string" ? parseFloat(price) : price;
  if (Number.isNaN(n) || n <= 0) return "Based on scope";
  return `$${n.toLocaleString("en-US")}`;
}

function parseAmount(price: number | string): number {
  const n = typeof price === "string" ? parseFloat(price) : price;
  if (Number.isNaN(n)) return 0;
  return n;
}

function extractScanSiteTitle(scanLike: unknown, fallbackDomain: string): string {
  if (!scanLike || typeof scanLike !== "object") return fallbackDomain;
  const raw = scanLike as Record<string, unknown>;
  const candidate =
    (typeof raw.title === "string" && raw.title) ||
    (typeof raw.h1 === "string" && raw.h1) ||
    (typeof raw.meta_title === "string" && raw.meta_title) ||
    (typeof raw.domain === "string" && raw.domain) ||
    fallbackDomain;
  return candidate.trim();
}

function normalizeSiteUrl(rawValue: string): string {
  const trimmed = rawValue.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function buildSitePreviewCandidates(rawValue: string): string[] {
  const normalized = normalizeSiteUrl(rawValue);
  if (!normalized) return [];

  return [
    `https://image.thum.io/get/width/1200/crop/760/noanimate/${normalized}`,
    `https://s.wordpress.com/mshots/v1/${encodeURIComponent(normalized)}?w=1200`,
  ];
}

function getScanIssues(scan: ScanResult): string[] {
  const issues: string[] = [];
  if (!scan.seo.meta_description) issues.push("Meta description missing");
  if (!scan.seo.h1) issues.push("H1 heading missing");
  if (!scan.presence.analytics && !scan.presence.tag_manager) {
    issues.push("Analytics setup missing");
  }
  if (!scan.technical?.robots_txt) issues.push("robots.txt not detected");
  if (!scan.technical?.sitemap_xml) issues.push("sitemap.xml not detected");
  if (!scan.technical?.open_graph) issues.push("Open Graph tags missing");
  if (!scan.technical?.schema_org) issues.push("Structured data missing");
  if (!scan.presence.google_business) issues.push("Google Business profile missing");
  return issues.slice(0, 4);
}

function getTechnicalHighlights(scan: ScanResult): Array<{ label: string; ok: boolean }> {
  const technical = scan.technical ?? {};

  return [
    { label: "robots.txt", ok: Boolean(technical.robots_txt) },
    { label: "sitemap.xml", ok: Boolean(technical.sitemap_xml) },
    { label: "Open Graph", ok: Boolean(technical.open_graph) },
    { label: "Twitter Card", ok: Boolean(technical.twitter_cards) },
    { label: "Schema", ok: Boolean(technical.schema_org) },
    { label: "Favicon", ok: Boolean(technical.favicon) },
  ];
}

function getScanResultLabel(scan: ScanResult | null): string {
  if (!scan) return "Live Scan Result";
  if (scan.estimated) return "Estimated Scan Preview";
  if (scan.error) return "Partial Live Scan";
  return "Live Scan Result";
}

function getScanResultDescription(scan: ScanResult): string {
  if (scan.estimated) {
    return "The live scan could not finish, so this is an estimated fallback preview.";
  }

  if (scan.error) {
    return "The scan reached the public site with limited access, so some sections may be incomplete.";
  }

  return "These findings are based on the current public version of your website.";
}

function getPerformanceSnapshotMessage(performance?: ScanPerformance): string {
  if (performance?.available) {
    return "PageSpeed mobile data from the current public site.";
  }

  if (performance?.failure_message) {
    return `Live technical scan completed. ${performance.failure_message}`;
  }

  return "Live technical scan completed, but performance data is not available yet.";
}

function scoreTone(score: number) {
  if (score >= 75) {
    return {
      text: "text-emerald-600",
      bg: "bg-emerald-500",
      label: "Good",
    };
  }
  if (score >= 50) {
    return {
      text: "text-amber-600",
      bg: "bg-amber-500",
      label: "Needs work",
    };
  }
  return {
    text: "text-rose-600",
    bg: "bg-rose-500",
    label: "Critical",
  };
}

function recommendPackageFromScan(scan: ScanResult): "starter" | "business" | "commerce" {
  if (scan.score < 55) return "commerce";
  if (scan.score < 72) return "business";
  return "starter";
}

export function OnboardingSiteFlow() {
  const router = useRouter();
  const { setShowStepIndicator } = useOnboarding();
  const searchParams = useMemo(
    () =>
      typeof window === "undefined"
        ? new URLSearchParams("")
        : new URLSearchParams(window.location.search),
    [],
  );

  const navigate = (path: string) => router.push(path);

  const tenant = searchParams.get("tenant");
  const templateSlug = searchParams.get("template");
  const templateTitleParam = searchParams.get("templateTitle");
  const templateImageParam = searchParams.get("templateImage");
  const templateCategoryParam = searchParams.get("templateCategory");
  const templateDescriptionParam = searchParams.get("templateDescription");
  const flowStepParam = searchParams.get("flowStep");
  const packageParam = searchParams.get("package");
  const recommendedParam = searchParams.get("recommended");
  const initialAddonKeys = searchParams.getAll("addons[]");
  const initialAddonKeysSignature = initialAddonKeys.join("|");
  const rememberKey = `OnboardingSiteFlow:${tenant ?? "default"}:${templateSlug ?? "default"}`;
  const rememberedState = useMemo(() => {
    if (typeof window === "undefined") return null;

    try {
      const raw = window.sessionStorage.getItem(rememberKey);
      return raw ? (JSON.parse(raw) as Partial<RememberedOnboardingState>) : null;
    } catch {
      return null;
    }
  }, [rememberKey]);

  const selectedTemplate = useMemo(
    () => MOCK_TEMPLATES.find((t) => t.slug === templateSlug) ?? null,
    [templateSlug],
  );

  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof rememberedState?.currentStep === "number") {
      return Math.min(STEPS.length - 1, Math.max(0, rememberedState.currentStep));
    }

    return getInitialStepIndex(flowStepParam);
  });

  const [hasWebsite, setHasWebsite] = useState<WebsiteChoice>(() =>
    rememberedState?.hasWebsite === "yes" || rememberedState?.hasWebsite === "no"
      ? rememberedState.hasWebsite
      : "",
  );
  const [domain, setDomain] = useState(rememberedState?.domain ?? "");
  const [scanResult, setScanResult] = useState<ScanResult | null>(rememberedState?.scanResult ?? null);
  const [scannedSiteTitle, setScannedSiteTitle] = useState(rememberedState?.scannedSiteTitle ?? "");
  const [scanBlocked, setScanBlocked] = useState(rememberedState?.scanBlocked ?? false);
  const [nextScanAtHuman, setNextScanAtHuman] = useState<string | null>(
    rememberedState?.nextScanAtHuman ?? null,
  );
  const [scanRequestError, setScanRequestError] = useState<string | null>(
    rememberedState?.scanRequestError ?? null,
  );
  const [isScanning, setIsScanning] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>(() =>
    rememberedState?.previewMode === "current" ? "current" : "template",
  );
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [currentPreviewExhausted, setCurrentPreviewExhausted] = useState(false);

  const [plans, setPlans] = useState<PlanFromApi[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(
    typeof rememberedState?.selectedPlanId === "number" ? rememberedState.selectedPlanId : null,
  );

  const [selectedAddonIds, setSelectedAddonIds] = useState<number[]>(
    Array.isArray(rememberedState?.selectedAddonIds)
      ? rememberedState.selectedAddonIds.filter((value): value is number => typeof value === "number")
      : [],
  );

  const [businessType, setBusinessType] = useState(rememberedState?.businessType ?? "");
  const [targetAudience, setTargetAudience] = useState(rememberedState?.targetAudience ?? "");
  const [mainGoal, setMainGoal] = useState(rememberedState?.mainGoal ?? "");
  const [primaryMetric, setPrimaryMetric] = useState(rememberedState?.primaryMetric ?? "");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isCompleting, setIsCompleting] = useState(false);
  const [exitBlockedNotice, setExitBlockedNotice] = useState<string | null>(null);
  const [pricePulse, setPricePulse] = useState(false);

  useEffect(() => {
    setShowStepIndicator(false);
    return () => setShowStepIndicator(true);
  }, [setShowStepIndicator]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      window.sessionStorage.setItem(
        rememberKey,
        JSON.stringify({
          currentStep,
          hasWebsite,
          domain,
          scanResult,
          scannedSiteTitle,
          scanBlocked,
          nextScanAtHuman,
          scanRequestError,
          previewMode,
          selectedPlanId,
          selectedAddonIds,
          businessType,
          targetAudience,
          mainGoal,
          primaryMetric,
        } satisfies RememberedOnboardingState),
      );
    }, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    businessType,
    currentStep,
    domain,
    hasWebsite,
    mainGoal,
    nextScanAtHuman,
    previewMode,
    primaryMetric,
    rememberKey,
    scanBlocked,
    scanRequestError,
    scanResult,
    scannedSiteTitle,
    selectedAddonIds,
    selectedPlanId,
    targetAudience,
  ]);

  useEffect(() => {
    let cancelled = false;
    setPlansLoading(true);

    const headers: Record<string, string> = {};
    if (tenant) headers["x-tenant"] = tenant;

    fetch("/api/onboarding/plans", { headers })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const list: PlanFromApi[] = Array.isArray(data)
          ? data
          : (data?.data ?? data?.plans ?? []);
        const safe = list.length > 0 ? list : MOCK_PLANS;
        setPlans(safe);
        if (!selectedPlanId && safe.length > 0) {
          const preferredPackage = packageParam || recommendedParam;
          if (preferredPackage) {
            const matched = safe.find(
              (plan) =>
                inferPackageKeyFromPlanName(plan.name) ===
                preferredPackage.toLowerCase(),
            );
            if (matched) {
              setSelectedPlanId(matched.id);
              return;
            }
          }
          setSelectedPlanId(safe[0]?.id ?? null);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setPlans(MOCK_PLANS);
        if (!selectedPlanId && MOCK_PLANS.length > 0) {
          const preferredPackage = packageParam || recommendedParam;
          if (preferredPackage) {
            const matched = MOCK_PLANS.find(
              (plan) =>
                inferPackageKeyFromPlanName(plan.name) ===
                preferredPackage.toLowerCase(),
            );
            if (matched) {
              setSelectedPlanId(matched.id);
              return;
            }
          }
          setSelectedPlanId(MOCK_PLANS[0]?.id ?? null);
        }
      })
      .finally(() => {
        if (!cancelled) setPlansLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [packageParam, recommendedParam, selectedPlanId, tenant]);

  const selectedPlan = useMemo(
    () => plans.find((p) => p.id === selectedPlanId) ?? null,
    [plans, selectedPlanId],
  );

  const planAddons = useMemo(() => selectedPlan?.addons ?? [], [selectedPlan]);

  useEffect(() => {
    if (!selectedPlan) {
      setSelectedAddonIds([]);
      return;
    }
    const recommended = planAddons
      .filter((addon) => addon.is_recommended)
      .slice(0, 2)
      .map((addon) => addon.id);
    setSelectedAddonIds(recommended);
  }, [selectedPlan, planAddons]);

  useEffect(() => {
    if (!flowStepParam) {
      return;
    }

    const nextStep = getInitialStepIndex(flowStepParam);
    setCurrentStep((prev) => (prev === nextStep ? prev : nextStep));
  }, [flowStepParam]);

  useEffect(() => {
    if (!initialAddonKeys.length || !planAddons.length) return;
    const ids = initialAddonKeys
      .map((key) =>
        planAddons.find(
          (addon) => (addon.key || "").toLowerCase() === key.toLowerCase(),
        )?.id,
      )
      .filter((value): value is number => typeof value === "number");
    if (!ids.length) return;
    const current = [...selectedAddonIds].sort((a, b) => a - b).join(",");
    const next = [...ids].sort((a, b) => a - b).join(",");
    if (current !== next) setSelectedAddonIds(ids);
  }, [initialAddonKeys, initialAddonKeysSignature, planAddons, selectedAddonIds]);

  const selectedAddons = useMemo(
    () => planAddons.filter((addon) => selectedAddonIds.includes(addon.id)),
    [planAddons, selectedAddonIds],
  );
  const selectedPackageKey = useMemo(
    () => inferPackageKeyFromPlanName(selectedPlan?.name ?? ""),
    [selectedPlan],
  );
  const activeBriefPresets = useMemo(() => {
    const fallback = PACKAGE_BRIEF_PRESETS.custom ?? [];
    return PACKAGE_BRIEF_PRESETS[selectedPackageKey] ?? fallback;
  }, [selectedPackageKey]);

  const packageQuestionHints = useMemo(() => {
    switch (selectedPackageKey) {
      case "starter":
        return {
          businessType: "Ex: Corporate showcase website",
          targetAudience: "Ex: Potential customers researching your company",
          mainGoal: "Ex: Increase contact form and phone conversions",
          primaryMetric: "Ex: Monthly leads / form submissions",
        };
      case "business":
        return {
          businessType: "Ex: B2B services / consulting",
          targetAudience: "Ex: Decision-maker profile",
          mainGoal: "Ex: Increase demo and quote requests",
          primaryMetric: "Ex: Monthly demo requests",
        };
      case "commerce":
        return {
          businessType: "Ex: Ecommerce store",
          targetAudience: "Ex: Mobile-first product shoppers",
          mainGoal: "Ex: Improve cart-to-checkout completion",
          primaryMetric: "Ex: Order count / conversion rate",
        };
      case "marketplace":
        return {
          businessType: "Ex: Multi-vendor marketplace",
          targetAudience: "Ex: Sellers and end buyers",
          mainGoal: "Ex: Increase active sellers and GMV",
          primaryMetric: "Ex: Monthly GMV",
        };
      default:
        return {
          businessType: "Ex: B2B services / Ecommerce",
          targetAudience: "Ex: Professionals aged 25-45",
          mainGoal: "Ex: Increase quote form conversions in the first 3 months",
          primaryMetric: "Ex: Monthly lead count",
        };
    }
  }, [selectedPackageKey]);

  const setupAmount = parseAmount(selectedPlan?.setup_price ?? 0);
  const monthlyAmount = parseAmount(selectedPlan?.monthly_price ?? 0);
  const addonsAmount = selectedAddons.reduce((sum, addon) => sum + parseAmount(addon.price), 0);
  const totalAmount = setupAmount + monthlyAmount + addonsAmount;

  useEffect(() => {
    if (!selectedPlan || totalAmount <= 0) {
      setPricePulse(false);
      return;
    }

    setPricePulse(true);

    const timeoutId = window.setTimeout(() => {
      setPricePulse(false);
    }, 320);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [selectedPlan, totalAmount]);

  const siteTitle = useMemo(() => {
    if (scannedSiteTitle.trim()) return scannedSiteTitle.trim();
    if (hasWebsite === "yes" && domain.trim()) return domain.trim();
    if (templateTitleParam?.trim()) return templateTitleParam.trim();
    if (selectedTemplate?.title) return selectedTemplate.title;
    return "new-project";
  }, [domain, hasWebsite, scannedSiteTitle, selectedTemplate, templateTitleParam]);

  const previewSlug = useMemo(() => {
    const source =
      (siteTitle.trim() || selectedTemplate?.slug || "new-site").toLowerCase();
    const sanitized = source
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return sanitized || "new-site";
  }, [selectedTemplate, siteTitle]);

  const previewGradient = selectedTemplate?.gradient ?? "from-slate-600 to-slate-800";
  const currentSitePreviewCandidates = useMemo(() => {
    if (hasWebsite !== "yes" || !scanResult) return [];

    const rawCandidates = [
      scanResult.preview?.screenshot_url,
      scanResult.preview?.open_graph_image_url,
      ...buildSitePreviewCandidates(scanResult.url || domain.trim()),
    ];

    return rawCandidates.filter(
      (value, index, list): value is string =>
        typeof value === "string" &&
        value.trim().length > 0 &&
        list.indexOf(value) === index,
    );
  }, [domain, hasWebsite, scanResult]);
  const currentSitePreviewLabel = scanResult?.domain || domain.trim() || "Current site";
  const hasTemplateContext = Boolean(
    selectedTemplate ||
      templateTitleParam?.trim() ||
      templateImageParam?.trim() ||
      templateCategoryParam?.trim() ||
      templateDescriptionParam?.trim() ||
      templateSlug?.trim(),
  );
  const templatePreviewLabel = hasTemplateContext ? "Selected Template" : "Template Preview";
  const templatePreviewTitle =
    selectedTemplate?.title ||
    templateTitleParam ||
    (hasTemplateContext ? "Custom Build" : "Choose a marketplace template");
  const templatePreviewDescription = hasTemplateContext
    ? templateDescriptionParam?.trim() ||
      mainGoal ||
      selectedTemplate?.description ||
      "A cleaner, conversion-ready version of your site."
    : "This area is populated from the marketplace selection before the user lands in onboarding.";
  const templatePreviewBadge = hasTemplateContext
    ? selectedTemplate?.category || templateCategoryParam?.trim() || "Moydus"
    : "Marketplace";
  const currentPreviewSignature = currentSitePreviewCandidates.join("|");
  const currentSitePreviewUrl =
    !currentPreviewExhausted && currentSitePreviewCandidates.length > 0
      ? currentSitePreviewCandidates[currentPreviewIndex] || null
      : null;
  const showCurrentSitePreview =
    previewMode === "current" &&
    hasWebsite === "yes" &&
    Boolean(scanResult) &&
    Boolean(currentSitePreviewUrl);
  const showScanLoadingPreview =
    isScanning && hasWebsite === "yes" && previewMode === "current";
  const showSplitPreview = hasWebsite === "yes" && Boolean(scanResult) && !isScanning;
  const showSelectedPlanPreview = Boolean(
    selectedPlan && (currentStep > 0 || hasWebsite === "no" || scanResult),
  );
  const onboardingThemeStyle = {
    "--primary-base": "250 115 25",
    "--primary-darker": "206 94 18",
    "--primary-dark": "183 83 16",
  } as CSSProperties;

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const previousTitle = STEPS[currentStep - 1]?.title ?? "Start";
  const currentTitle = STEPS[currentStep]?.title ?? "Onboarding";
  const stepIndicatorTop = currentStep * 76;

  const canContinue = useMemo(() => {
    if (currentStep === 0) {
      if (!hasWebsite) return false;
      if (hasWebsite === "yes") return domain.trim().length > 0 && !isScanning;
      return true;
    }
    if (currentStep === 1) return selectedPlanId != null;
    if (currentStep === 3) return businessType.trim().length > 0 && mainGoal.trim().length > 0;
    if (currentStep === 5) {
      return (
        cardName.trim().length > 2 &&
        cardNumber.replace(/\s+/g, "").length >= 12 &&
        cardExpiry.trim().length >= 4 &&
        cardCvc.trim().length >= 3 &&
        !isCompleting
      );
    }
    return true;
  }, [
    businessType,
    cardCvc,
    cardExpiry,
    cardName,
    cardNumber,
    currentStep,
    domain,
    hasWebsite,
    isCompleting,
    isScanning,
    mainGoal,
    selectedPlanId,
  ]);

  useEffect(() => {
    setCurrentPreviewIndex(0);
    setCurrentPreviewExhausted(false);
  }, [currentPreviewSignature]);

  const showExitBlocked = () => {
    setExitBlockedNotice("You cannot leave before onboarding is complete.");
    window.setTimeout(() => {
      setExitBlockedNotice((prev) =>
        prev === "You cannot leave before onboarding is complete." ? null : prev,
      );
    }, 2200);
  };

  const clearRememberedOnboardingState = () => {
    if (typeof window === "undefined") return;
    window.sessionStorage.removeItem(rememberKey);
  };

  const onBack = () => {
    if (currentStep === 0) {
      showExitBlocked();
      return;
    }
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const runScanStep = async () => {
    if (!hasWebsite) return;

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    try {
      setScanRequestError(null);
      setScanBlocked(false);
      setNextScanAtHuman(null);
      setIsScanning(true);

      const res = await fetch("/api/onboarding/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(tenant && { "x-tenant": tenant }),
        },
        body: JSON.stringify({
          has_website: hasWebsite === "yes" ? 1 : 0,
          domain: hasWebsite === "yes" ? domain.trim() : undefined,
          ...(tenant && { tenant }),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const domainError =
          Array.isArray(data?.errors?.domain) && typeof data.errors.domain[0] === "string"
            ? data.errors.domain[0]
            : null;
        const message =
          res.status === 401
            ? "Your session expired. Sign in again to run a live scan."
            : res.status === 422
              ? domainError || "Enter a valid domain to run a live scan."
              : res.status === 408 || res.status === 504
                ? "The live scan timed out. Please try again."
                : typeof data?.message === "string" && data.message.trim().length > 0
                  ? data.message
                  : "The live scan could not be completed right now.";

        setScanResult(null);
        setScannedSiteTitle("");
        setScanRequestError(message);
        return;
      }

      if (hasWebsite === "yes") {
        setScanBlocked(Boolean(data?.scanBlocked));
        setNextScanAtHuman(data?.nextScanAtHuman ?? null);

        if (data?.scanBlocked) {
          setScanResult(null);
          setScannedSiteTitle("");
          return;
        }

        if (!(data?.scanResult && typeof data.scanResult?.score === "number")) {
          setScanResult(null);
          setScannedSiteTitle("");
          setScanRequestError("The live scan did not return usable data. Please try again.");
          return;
        }

        const result: ScanResult = {
          ...data.scanResult,
          estimated: Boolean(data.scanResult?.estimated),
        };

        setScanResult(result);
        setScannedSiteTitle(extractScanSiteTitle(result, domain.trim()));

        const recommended = recommendPackageFromScan(result);
        const planMatch = plans.find(
          (plan) => inferPackageKeyFromPlanName(plan.name) === recommended,
        );
        if (planMatch) {
          setSelectedPlanId(planMatch.id);
        }
      }
    } catch {
      setScanResult(null);
      setScannedSiteTitle("");
      setScanRequestError("We could not reach the scan service. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const completeFlow = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const payload = {
      tenant: tenant ?? undefined,
      has_website: hasWebsite === "yes" ? 1 : 0,
      domain: hasWebsite === "yes" ? domain.trim() : undefined,
      template: templateSlug ?? undefined,
      package: selectedPlan ? inferPackageKeyFromPlanName(selectedPlan.name) : undefined,
      addons: selectedAddons.map((addon) => addon.key || addon.name),
      brief: {
        business_type: businessType,
        target_audience: targetAudience,
        main_goal: mainGoal,
        primary_metric: primaryMetric,
      },
      totals: {
        setup: setupAmount,
        monthly: monthlyAmount,
        addons: addonsAmount,
        total: totalAmount,
      },
    };

    try {
      setIsCompleting(true);
      await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(tenant && { "x-tenant": tenant }),
        },
        body: JSON.stringify(payload),
      });
      clearRememberedOnboardingState();
      navigate("/dashboard");
    } catch {
      clearRememberedOnboardingState();
      navigate("/dashboard");
    } finally {
      setIsCompleting(false);
    }
  };

  const onContinue = async () => {
    if (currentStep === 0) {
      if (hasWebsite === "yes") {
        if (!scanResult) {
          await runScanStep();
          return;
        }
        setCurrentStep(1);
        return;
      }
      if (hasWebsite === "no") {
        setCurrentStep(1);
        return;
      }
      return;
    }

    if (currentStep === STEPS.length - 1) {
      await completeFlow();
      return;
    }

    setCurrentStep((prev) => Math.min(STEPS.length - 1, prev + 1));
  };

  const scanIssues = scanResult ? getScanIssues(scanResult) : [];
  const technicalHighlights = scanResult ? getTechnicalHighlights(scanResult) : [];
  const scoreInfo = scoreTone(scanResult?.score ?? 0);
  const scanResultLabel = getScanResultLabel(scanResult);
  const performanceSnapshot = scanResult?.performance;
  const performanceScore =
    typeof performanceSnapshot?.performance_score === "number"
      ? performanceSnapshot.performance_score
      : null;
  const performanceScoreInfo = scoreTone(performanceScore ?? 0);
  const performanceMetrics = [
    {
      label: "FCP",
      value: performanceSnapshot?.first_contentful_paint || "Not available",
    },
    {
      label: "LCP",
      value: performanceSnapshot?.largest_contentful_paint || "Not available",
    },
    {
      label: "TBT",
      value: performanceSnapshot?.total_blocking_time || "Not available",
    },
    {
      label: "CLS",
      value: performanceSnapshot?.cumulative_layout_shift || "Not available",
    },
  ];
  const previewPerformanceHighlights = performanceSnapshot?.available
    ? [
        {
          label: "Performance",
          value: performanceScore !== null ? `${performanceScore}/100` : "Not available",
        },
        {
          label: "LCP",
          value: performanceSnapshot?.largest_contentful_paint || "Not available",
        },
      ]
    : [];

  const stepDescriptions = [
    "If you already have a website, we can scan it live. Otherwise, we can move straight into a new build.",
    "Choose the package that fits your business model best.",
    "Select the add-ons you need.",
    "Answer a few quick questions so we can define the project goals.",
    "Review your selections one last time.",
    "Complete the payment step and start setup.",
  ];

  const currentStepDescription =
    stepDescriptions[currentStep] ?? "Complete your onboarding setup.";

  useEffect(() => {
    if (isScanning) {
      setCurrentPreviewIndex(0);
      setCurrentPreviewExhausted(false);
      setPreviewMode("current");
      return;
    }

    if (hasWebsite === "yes" && scanResult) {
      setPreviewMode("current");
      return;
    }

    setPreviewMode("template");
  }, [hasWebsite, isScanning, scanResult]);

  const handleCurrentPreviewError = () => {
    if (currentPreviewIndex + 1 < currentSitePreviewCandidates.length) {
      setCurrentPreviewIndex((prev) => prev + 1);
      return;
    }

    setCurrentPreviewExhausted(true);
  };

  const toggleAddon = (addonId: number) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId],
    );
  };

  const applyBriefPreset = (preset: BriefPreset) => {
    setBusinessType(preset.businessType);
    setTargetAudience(preset.targetAudience);
    setMainGoal(preset.mainGoal);
    setPrimaryMetric(preset.primaryMetric);
  };

  return (
    <div
      className="flex min-h-full flex-col bg-bg-white-0 font-sans lg:flex-row"
      style={onboardingThemeStyle}
    >
      <aside className="hidden w-[212px] shrink-0 flex-col gap-12 p-8 lg:flex">
        <div className="flex size-8 items-center justify-center rounded-xl  text-static-white">
          <AppLogoIcon />
        </div>

        <div className="relative flex w-full flex-1 flex-col gap-8">
          <div
            className="absolute right-[-34px] h-11 w-0.5 bg-primary-base transition-all duration-500"
            style={{
              top: stepIndicatorTop,
              transitionTimingFunction: "cubic-bezier(0.6, 0.6, 0, 1)",
            }}
          />

          {STEPS.map((step, index) => {
            const completed = index < currentStep;
            const active = index === currentStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  if (index <= currentStep) setCurrentStep(index);
                }}
                className="flex w-full flex-col gap-1 text-left focus:outline-none"
                disabled={index > currentStep}
              >
                <div
                  className={cn(
                    "flex items-center gap-1.5 text-sm transition-colors duration-200 ease-out",
                    active
                      ? "text-primary-base"
                      : completed
                        ? "text-text-sub-600"
                        : "text-text-soft-400",
                  )}
                >
                  {`Step ${index + 1}/${STEPS.length}`}
                  {completed && <StepSuccessIcon />}
                </div>
                <div
                  className={cn(
                    "text-label-sm transition-colors duration-200 ease-out",
                    active || completed
                      ? "text-text-strong-950"
                      : "text-text-sub-600",
                  )}
                >
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-paragraph-xs text-text-soft-400">© 2026 Moydus</div>
      </aside>

      <div className="lg:hidden">
        <div className="px-2.5 pb-3.5 pt-2.5">
          <div className="relative flex h-9 items-center">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1 text-label-sm text-text-sub-600 hover:text-text-strong-950"
            >
              <RiArrowLeftSLine className="size-5" />
              {`Return to ${previousTitle}`}
            </button>
            <div className="flex-1" />
            <button
              type="button"
              onClick={showExitBlocked}
              className="inline-flex size-9 items-center justify-center rounded-10 text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950"
            >
              <RiCloseLine className="size-5" />
            </button>
          </div>
        </div>

        <div className="h-1 w-full bg-bg-soft-200">
          <div
            className="h-full bg-primary-base transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded-full bg-primary-base text-label-xs text-static-white">
              {currentStep + 1}
            </div>
            <span className="text-paragraph-sm text-text-strong-950">{currentTitle}</span>
          </div>
          <div className="text-right text-paragraph-sm text-text-soft-400">
            {`${currentStep + 1}/${STEPS.length}`}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:grid md:flex-1 md:grid-cols-[minmax(0,600fr)_minmax(0,628fr)]">
        <div className="flex flex-col md:py-2 md:pl-2 lg:pl-0">
          <div className="flex w-full flex-1 flex-col items-center justify-center overflow-hidden bg-bg-weak-50 py-9 md:rounded-2xl lg:py-0">
            <div className="flex w-full max-w-[452px] flex-col gap-5">
              <div>
                <div className="text-label-sm text-text-sub-600">Live Preview</div>
                <div className="mt-1 text-label-sm text-text-soft-400">
                  The preview updates here in real time as you make selections.
                </div>
              </div>

              <div className="relative w-full min-w-0">
                <div className="relative z-10 flex w-full flex-col gap-6 rounded-3xl bg-bg-white-0 p-6 pb-7 shadow-custom-md">
                  <div className="flex items-center gap-1.5">
                    <RiInformationLine className="size-3.5 text-text-disabled-300" />
                    <div className="text-label-sm text-text-soft-400">
                      {hasWebsite === "yes" && domain.trim()
                        ? `Domain: ${domain.trim()}`
                        : `Demo: demo.moydus.com/${previewSlug}`}
                    </div>
                  </div>

                  {hasWebsite === "yes" && scanResult && !showSplitPreview && (
                    <div className="mb-3 inline-flex rounded-full bg-bg-weak-50 p-1 ring-1 ring-inset ring-stroke-soft-200">
                      <button
                        type="button"
                        onClick={() => setPreviewMode("current")}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-[11px] font-medium transition",
                          previewMode === "current"
                            ? "bg-bg-white-0 text-text-strong-950 shadow-sm"
                            : "text-text-soft-400",
                        )}
                      >
                        {`${currentSitePreviewLabel} Preview`}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewMode("template")}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-[11px] font-medium transition",
                          previewMode === "template"
                            ? "bg-bg-white-0 text-text-strong-950 shadow-sm"
                            : "text-text-soft-400",
                        )}
                      >
                        {templatePreviewLabel}
                      </button>
                    </div>
                  )}

                  <div className="overflow-hidden rounded-xl border border-stroke-soft-200">
                    <div className="flex items-center gap-1.5 bg-bg-soft-200 px-3 py-2">
                      <span className="size-2 rounded-full bg-rose-400/70" />
                      <span className="size-2 rounded-full bg-amber-400/70" />
                      <span className="size-2 rounded-full bg-green-400/70" />
                      <div className="ml-2 flex-1 truncate rounded-full bg-bg-weak-50 px-2 py-0.5 text-[10px] text-text-soft-400">
                        {hasWebsite === "yes" && domain.trim()
                          ? domain.trim()
                          : `demo.moydus.com/${previewSlug}`
                      }</div>
                    </div>

                    <div
                      className={cn(
                        "relative h-[224px] w-full",
                        showScanLoadingPreview ? "bg-bg-white-0" : previewGradient,
                      )}
                    >
                      {!showSplitPreview && showCurrentSitePreview && currentSitePreviewUrl && (
                        <img
                          src={currentSitePreviewUrl}
                          alt={scanResult?.title || domain.trim() || "Current website preview"}
                          className="absolute inset-0 h-full w-full object-cover"
                          onError={handleCurrentPreviewError}
                        />
                      )}
                      {!showSplitPreview && templateImageParam && (hasWebsite !== "yes" || previewMode === "template") && (!scanResult || previewMode === "template") && (
                        <img
                          src={templateImageParam}
                          alt={templateTitleParam || "Selected template"}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}

                      {!showSplitPreview && (isScanning ||
                        (!scanResult &&
                          !(templateImageParam && hasWebsite !== "yes")) ||
                        (previewMode === "template" && !templateImageParam)) && (
                        <>
                          <div
                            className={cn(
                              "absolute inset-0",
                              showScanLoadingPreview
                                ? "bg-gradient-to-br from-white via-slate-50 to-slate-100"
                                : "bg-black/10",
                            )}
                          />
                          <div className="absolute inset-0 p-4">
                            <div
                              className={cn(
                                "h-full rounded-xl p-3",
                                showScanLoadingPreview
                                  ? "bg-white shadow-sm ring-1 ring-stroke-soft-200"
                                  : "bg-white/18 ring-1 ring-white/35 backdrop-blur-[1px]",
                              )}
                            >
                              <div className="animate-pulse">
                                {showScanLoadingPreview && (
                                  <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-primary-alpha-10 px-2 py-1 text-[11px] font-medium text-primary-base">
                                    <RiPulseLine className="size-3.5 animate-pulse" />
                                    Scanning live site...
                                  </div>
                                )}
                                <div className="flex items-center justify-between">
                                  <div
                                    className={cn(
                                      "h-2.5 w-20 rounded-full",
                                      showScanLoadingPreview ? "bg-slate-200" : "bg-white/75",
                                    )}
                                  />
                                  <div className="flex items-center gap-1.5">
                                    {[...Array(3)].map((_, index) => (
                                      <div
                                        key={index}
                                        className={cn(
                                          "h-2.5 w-2.5 rounded-full",
                                          showScanLoadingPreview ? "bg-slate-200" : "bg-white/70",
                                        )}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className="mt-3 space-y-2">
                                  <div
                                    className={cn(
                                      "h-4 w-3/4 rounded-full",
                                      showScanLoadingPreview ? "bg-slate-200" : "bg-white/80",
                                    )}
                                  />
                                  <div
                                    className={cn(
                                      "h-3 w-1/2 rounded-full",
                                      showScanLoadingPreview ? "bg-slate-100" : "bg-white/65",
                                    )}
                                  />
                                </div>
                                <div className="mt-4 grid grid-cols-3 gap-2">
                                  {[...Array(3)].map((_, index) => (
                                    <div
                                      key={index}
                                      className={cn(
                                        "h-14 rounded-lg",
                                        showScanLoadingPreview ? "bg-slate-100" : "bg-white/45",
                                      )}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {isScanning && (
                        <>
                          <div className="absolute inset-0 overflow-hidden">
                            <div
                              className={cn(
                                "absolute inset-x-0 top-0 h-[2px] animate-pulse",
                                showScanLoadingPreview ? "bg-primary-base" : "bg-white/80",
                              )}
                            />
                          </div>
                          <div
                            className={cn(
                              "absolute bottom-3 left-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] backdrop-blur-sm",
                              showScanLoadingPreview
                                ? "bg-white/90 text-text-strong-950 ring-1 ring-stroke-soft-200"
                                : "bg-black/25 text-white",
                            )}
                          >
                            <RiPulseLine className="size-3.5 animate-pulse" />
                            Running live analysis...
                          </div>
                        </>
                      )}

                      {showSplitPreview && scanResult && (
                        <div className="absolute inset-0 p-3">
                          <div className="grid h-full grid-cols-2 gap-2">
                            <div
                              className={cn(
                                "relative overflow-hidden rounded-xl p-3 text-white ring-1 ring-white/15",
                                currentSitePreviewUrl
                                  ? "bg-slate-950"
                                  : "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600",
                              )}
                            >
                              {currentSitePreviewUrl && (
                                <>
                                  <img
                                    src={currentSitePreviewUrl}
                                    alt={`${scanResult.domain} preview`}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    onError={handleCurrentPreviewError}
                                  />
                                  <div className="absolute inset-0  " />
                                </>
                              )}
                              <div className="absolute inset-x-0 top-0 h-8 " />
                              <div className="relative flex h-full flex-col">
                                <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/70">
                                  {`${currentSitePreviewLabel} Preview`}
                                </div>
                                <div className="mt-2 line-clamp-1 text-label-sm text-white">
                                  {scanResult.title || domain.trim()}
                                </div>
                                <div className="mt-1 line-clamp-1 text-[10px] text-white/60">
                                  {scanResult.url}
                                </div>
                                <div className="mt-3 flex items-start justify-between gap-2">
                                  <div>
                                    <div className="text-[10px] uppercase tracking-[0.08em] text-white/60">
                                      Site Score
                                    </div>
                                    <div className={cn("text-2xl font-black", scoreInfo.text.replace("600", "100"))}>
                                      {scanResult.score}
                                    </div>
                                  </div>
                                  <div
                                    className={cn(
                                      "rounded-full px-2 py-0.5 text-[11px] font-semibold text-white",
                                      scoreInfo.bg,
                                    )}
                                  >
                                    {scoreInfo.label}
                                  </div>
                                </div>
                                <div className="mt-3 space-y-1.5">
                                  {scanIssues.slice(0, 2).map((issue) => (
                                    <div
                                      key={issue}
                                      className="rounded-md bg-white/8 px-2 py-1 text-[10px] text-white/85"
                                    >
                                      {issue}
                                    </div>
                                  ))}
                                </div>
                                {!currentSitePreviewUrl && (
                                  <div className="mt-2 rounded-md bg-white/10 px-2 py-1 text-[10px] text-white/85">
                                    Live screenshot is unavailable. Some sites block remote preview capture.
                                  </div>
                                )}
                                <div className="mt-auto pt-3">
                                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                                    <div
                                      className={cn("h-full rounded-full", scoreInfo.bg)}
                                      style={{ width: `${Math.max(8, Math.min(100, scanResult.score))}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="relative overflow-hidden rounded-xl ring-1 ring-white/15">
                              {templateImageParam ? (
                                <img
                                  src={templateImageParam}
                                  alt={templateTitleParam || "Selected template"}
                                  className="absolute inset-0 h-full w-full object-cover"
                                />
                              ) : (
                                <div className={cn("absolute inset-0 ", previewGradient)} />
                              )}
                              <div className="absolute inset-0 bg-black/25" />
                              <div className="relative flex h-full flex-col p-3 text-white">
                                <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/75">
                                  {templatePreviewLabel}
                                </div>
                                <div className="mt-2 line-clamp-2 text-label-sm text-white">
                                  {templatePreviewTitle}
                                </div>
                                <div className="mt-1 line-clamp-2 text-[10px] text-white/70">
                                  {templatePreviewDescription}
                                </div>
                                <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                                  <div className="rounded-full bg-white/12 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm">
                                    {templatePreviewBadge}
                                  </div>
                                  <div className="rounded-full bg-primary-base px-2 py-0.5 text-[10px] font-semibold text-white">
                                    After
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {!showSplitPreview && !isScanning && scanResult && hasWebsite === "yes" && previewMode === "current" && !showCurrentSitePreview && (
                        <div className="absolute inset-0 p-4">
                          <div className="h-full rounded-xl bg-black/18 p-3 ring-1 ring-white/30 backdrop-blur-[1px] text-white">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="text-[11px] opacity-80">{scanResultLabel}</div>
                                <div className={cn("text-2xl font-black", scoreInfo.text.replace("600", "100"))}>
                                  {scanResult.score}
                                </div>
                              </div>
                              <div className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", scoreInfo.bg)}>
                                {scoreInfo.label}
                              </div>
                            </div>

                            {previewPerformanceHighlights.length > 0 && (
                              <div className="mt-2 grid grid-cols-2 gap-1.5">
                                {previewPerformanceHighlights.map((item) => (
                                  <div
                                    key={item.label}
                                    className="rounded-md bg-black/25 px-2 py-1 text-[10px]"
                                  >
                                    <div className="opacity-70">{item.label}</div>
                                    <div className="mt-0.5 font-semibold text-white">{item.value}</div>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="mt-1 space-y-1.5">
                              {scanIssues.map((issue) => (
                                <div
                                  key={issue}
                                  className="rounded-md bg-black/25 px-2 py-1 text-[11px]"
                                >
                                  {issue}
                                </div>
                              ))}
                            </div>

                            <div className="mt-2 grid grid-cols-2 gap-1.5">
                              {technicalHighlights.slice(0, 4).map((item) => (
                                <div
                                  key={item.label}
                                  className="flex items-center gap-1.5 rounded-md bg-black/25 px-2 py-1 text-[10px]"
                                >
                                  {item.ok ? (
                                    <Check className="size-3 text-emerald-200" />
                                  ) : (
                                    <AlertTriangle className="size-3 text-amber-200" />
                                  )}
                                  <span>{item.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {showSelectedPlanPreview && !showSplitPreview && (
                        <div className="absolute left-3 top-3 rounded-full bg-black/20 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                          {selectedPlan.name}
                        </div>
                      )}

                      {!showSplitPreview && previewMode === "current" &&
                        scanResult &&
                        hasWebsite === "yes" &&
                        performanceScore !== null && (
                          <div
                            className={cn(
                              "absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-static-white backdrop-blur-sm",
                              performanceScoreInfo.bg,
                            )}
                          >
                            {`Performance ${performanceScore}`}
                          </div>
                        )}

                      {!showSplitPreview && (
                        <div className="absolute bottom-3 right-3 rounded-full bg-black/20 px-2 py-0.5 text-[11px] text-white backdrop-blur-sm">
                          {previewMode === "current" && scanResult && hasWebsite === "yes"
                            ? "Live site preview"
                            : showSelectedPlanPreview && selectedAddonIds.length > 0
                              ? `${selectedAddonIds.length} add-on`
                              : showSelectedPlanPreview
                                ? "Basic setup"
                                : "Marketplace preview"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="text-label-sm text-text-soft-400">
                      {selectedTemplate?.category || "Onboarding"}
                    </div>
                    <div className="mt-2 line-clamp-2 text-label-md text-text-sub-600">
                      {siteTitle}
                    </div>
                    <div className="mt-1 line-clamp-2 text-paragraph-sm text-text-soft-400">
                      {mainGoal || selectedTemplate?.description || "This area updates as you define your goal."}
                    </div>
                    {showSelectedPlanPreview && (
                      <div className="mt-3 rounded-lg bg-bg-weak-50 p-3 ring-1 ring-inset ring-stroke-soft-200">
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="line-clamp-1 text-paragraph-xs text-text-soft-400">
                              Selected Package
                            </div>
                            <div className="line-clamp-1 text-label-sm text-text-strong-950">
                              {selectedPlan.name}
                            </div>
                          </div>
                          {totalAmount > 0 && (
                            <div className="shrink-0 text-right">
                              <div className="text-paragraph-xs text-text-soft-400">Total</div>
                              <div
                                className={cn(
                                  "text-title-h6 text-text-strong-950 transition-all duration-300",
                                  pricePulse && "scale-105 text-primary-base",
                                )}
                              >
                                {`$${Math.round(totalAmount).toLocaleString("en-US")}`}
                              </div>
                            </div>
                          )}
                        </div>

                        {(setupAmount > 0 || monthlyAmount > 0 || addonsAmount > 0) && (
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-paragraph-xs text-text-soft-400">
                            {setupAmount > 0 && (
                              <span>{`Setup $${Math.round(setupAmount).toLocaleString("en-US")}`}</span>
                            )}
                            {monthlyAmount > 0 && (
                              <span>{`First month $${Math.round(monthlyAmount).toLocaleString("en-US")}`}</span>
                            )}
                            {addonsAmount > 0 && (
                              <span>{`Add-ons +$${Math.round(addonsAmount).toLocaleString("en-US")}`}</span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="relative h-0 w-full">
                    <div
                      className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 text-stroke-soft-200"
                      style={{
                        background:
                          "linear-gradient(90deg, currentcolor 4px, transparent 4px) 50% 50% / 10px 1px repeat-x",
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="text-label-sm text-text-soft-400">Brief Status</div>
                      <div className="text-label-sm text-text-soft-400">
                        {businessType || mainGoal ? "Filled" : "Pending"}
                      </div>
                    </div>

                    <div className="rounded-lg bg-bg-weak-50 p-3 ring-1 ring-inset ring-stroke-soft-200">
                      <div className="text-paragraph-xs text-text-soft-400">Business Type</div>
                      <div className="mt-1 line-clamp-1 text-paragraph-sm text-text-sub-600">
                        {businessType || "Not added yet"}
                      </div>

                      <div className="mt-2 text-paragraph-xs text-text-soft-400">Primary Goal</div>
                      <div className="mt-1 line-clamp-2 text-paragraph-sm text-text-sub-600">
                        {mainGoal || "Not specified yet"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center px-4 py-9 md:px-8 lg:py-0">
          <div className="relative z-20 mt-8 hidden w-full items-center lg:flex">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1 text-label-sm text-text-sub-600 hover:text-text-strong-950"
            >
              <RiArrowLeftSLine className="size-5" />
              {`Return to ${previousTitle}`}
            </button>
            <div className="flex-1" />
            {/* <button
              type="button"
              onClick={showExitBlocked}
              className="flex size-5 items-center justify-center rounded-md text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950"
            >
              <RiCloseLine className="size-[18px]" />
            </button> */}
          </div>

          <div className="flex h-full w-full flex-col justify-center md:py-9">
            <div className="mx-auto flex w-full max-w-[372px] flex-col gap-5 md:gap-6">
              <div className="flex w-full flex-col gap-6">
                <Sparkles className="size-7 text-primary-base" />
                <div>
                  <div className="text-title-h6 text-text-strong-950">{currentTitle}</div>
                  <div className="mt-2 text-paragraph-sm text-text-sub-600">
                    {currentStepDescription}
                  </div>
                  {exitBlockedNotice && (
                    <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-paragraph-xs text-amber-800">
                      {exitBlockedNotice}
                    </div>
                  )}
                </div>
              </div>

              {currentStep === 0 && (
                <div className="flex flex-col gap-3">
                  <div className="text-label-sm text-text-sub-600">Do you have a website?</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setHasWebsite("yes");
                        setScanRequestError(null);
                      }}
                      className={cn(
                        "rounded-10 border px-3 py-2 text-left text-paragraph-sm",
                        hasWebsite === "yes"
                          ? "border-primary-base bg-primary-alpha-10 text-primary-base"
                          : "border-stroke-soft-200 bg-bg-white-0 text-text-sub-600",
                      )}
                    >
                      Yes, I have a website
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHasWebsite("no");
                        setDomain("");
                        setScanResult(null);
                        setScannedSiteTitle("");
                        setScanBlocked(false);
                        setNextScanAtHuman(null);
                        setScanRequestError(null);
                      }}
                      className={cn(
                        "rounded-10 border px-3 py-2 text-left text-paragraph-sm",
                        hasWebsite === "no"
                          ? "border-primary-base bg-primary-alpha-10 text-primary-base"
                          : "border-stroke-soft-200 bg-bg-white-0 text-text-sub-600",
                      )}
                    >
                      No, not yet
                    </button>
                  </div>

                  {hasWebsite === "yes" && (
                    <label className="text-label-sm text-text-sub-600">
                      Domain
                      <input
                        value={domain}
                        onChange={(event) => {
                          setDomain(event.target.value);
                          setScanRequestError(null);
                        }}
                        className="mt-1 h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                        placeholder="example.com"
                      />
                    </label>
                  )}

                  {scanBlocked && nextScanAtHuman && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-paragraph-xs text-amber-800">
                      {`A new scan will be available again on ${nextScanAtHuman}.`}
                    </div>
                  )}

                  {scanRequestError && (
                    <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-paragraph-xs text-rose-800">
                      {scanRequestError}
                    </div>
                  )}

                  {scanResult && hasWebsite === "yes" && (
                    <div className="rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-label-sm text-text-strong-950">{scanResultLabel}</div>
                          <div className="mt-1 text-paragraph-xs text-text-soft-400">
                            {getScanResultDescription(scanResult)}
                          </div>
                        </div>
                        <div className="text-label-sm text-text-sub-600">{scanResult.score}/100</div>
                      </div>

                      <div className="mt-3 rounded-xl bg-bg-weak-50 p-3 ring-1 ring-inset ring-stroke-soft-200">
                        <div className="line-clamp-1 text-label-sm text-text-strong-950">
                          {scanResult.title || domain.trim()}
                        </div>
                        <div className="mt-1 line-clamp-1 text-paragraph-xs text-text-soft-400">
                          {scanResult.url}
                        </div>
                        {scanResult.h1 && (
                          <div className="mt-2 line-clamp-1 text-paragraph-sm text-text-sub-600">
                            {scanResult.h1}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 space-y-1.5">
                        {scanIssues.map((issue) => (
                          <div key={issue} className="flex items-center gap-2 text-paragraph-xs text-text-sub-600">
                            <AlertTriangle className="size-3.5 text-amber-500" />
                            {issue}
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {technicalHighlights.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center gap-2 rounded-lg bg-bg-weak-50 px-2.5 py-2 text-paragraph-xs text-text-sub-600 ring-1 ring-inset ring-stroke-soft-200"
                          >
                            {item.ok ? (
                              <Check className="size-3.5 text-emerald-500" />
                            ) : (
                              <AlertTriangle className="size-3.5 text-amber-500" />
                            )}
                            <span>{item.label}</span>
                          </div>
                        ))}
                      </div>

                      {scanResult.technical?.sitemap_url && (
                        <div className="mt-3 rounded-lg bg-bg-weak-50 px-3 py-2 text-paragraph-xs text-text-soft-400 ring-1 ring-inset ring-stroke-soft-200">
                          {`Sitemap: ${scanResult.technical.sitemap_url}`}
                        </div>
                      )}

                      <div className="mt-3 rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-label-sm text-text-strong-950">Performance Snapshot</div>
                            <div className="mt-1 text-paragraph-xs text-text-soft-400">
                              {getPerformanceSnapshotMessage(performanceSnapshot)}
                            </div>
                          </div>
                          {performanceScore !== null && (
                            <div
                              className={cn(
                                "rounded-full px-2.5 py-1 text-label-sm text-static-white",
                                performanceScoreInfo.bg,
                              )}
                            >
                              {performanceScore}/100
                            </div>
                          )}
                        </div>

                        {performanceSnapshot?.available && (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            {performanceMetrics.map((metric) => (
                              <div
                                key={metric.label}
                                className="rounded-lg bg-bg-weak-50 px-3 py-2 ring-1 ring-inset ring-stroke-soft-200"
                              >
                                <div className="text-paragraph-xs text-text-soft-400">{metric.label}</div>
                                <div className="mt-1 text-label-sm text-text-strong-950">{metric.value}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <p className="text-paragraph-xs text-text-soft-400">
                    This step runs a site scan for a live analysis experience, or moves into a fresh setup flow if you do not have a site yet.
                  </p>
                </div>
              )}

              {currentStep === 1 && (
                <div className="flex flex-col gap-3">
                  {plansLoading && (
                    <div className="rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2 text-paragraph-sm text-text-soft-400">
                      Loading packages...
                    </div>
                  )}

                  {!plansLoading && (
                    <div className="grid grid-cols-1 gap-2">
                      {plans.map((plan) => {
                        const selected = selectedPlanId === plan.id;
                        return (
                          <button
                            key={plan.id}
                            type="button"
                            onClick={() => setSelectedPlanId(plan.id)}
                            className={cn(
                              "rounded-10 border p-3 text-left",
                              selected
                                ? "border-primary-base bg-primary-alpha-10"
                                : "border-stroke-soft-200 bg-bg-white-0",
                            )}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="text-label-sm text-text-strong-950">{plan.name}</div>
                              {selected && <Check className="size-4 text-primary-base" />}
                            </div>
                            <div className="mt-1 text-paragraph-xs text-text-soft-400">
                              {plan.description || "Custom setup"}
                            </div>
                            <div className="mt-2 text-label-sm text-text-sub-600">
                              {`${formatMoney(plan.setup_price)} setup`}
                              {parseAmount(plan.monthly_price) > 0 &&
                                ` · $${parseAmount(plan.monthly_price).toLocaleString("en-US")}/ay`}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div className="flex flex-col gap-3">
                  {selectedPlan ? (
                    <>
                      <div className="rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2 text-paragraph-sm text-text-sub-600">
                        {`${selectedPlan.name} add-ons`}
                      </div>
                      {planAddons.length === 0 && (
                        <div className="rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2 text-paragraph-sm text-text-soft-400">
                          No add-ons are available for this package.
                        </div>
                      )}
                      {planAddons.map((addon) => {
                        const checked = selectedAddonIds.includes(addon.id);
                        return (
                          <button
                            key={addon.id}
                            type="button"
                            onClick={() => toggleAddon(addon.id)}
                            className={cn(
                              "rounded-10 border p-3 text-left",
                              checked
                                ? "border-primary-base bg-primary-alpha-10"
                                : "border-stroke-soft-200 bg-bg-white-0",
                            )}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="text-label-sm text-text-strong-950">{addon.name}</div>
                              <div className="text-label-sm text-text-sub-600">
                                {`+$${parseAmount(addon.price).toLocaleString("en-US")}`}
                              </div>
                            </div>
                            <div className="mt-1 text-paragraph-xs text-text-soft-400">
                              {addon.description || "Optional upgrade"}
                            </div>
                          </button>
                        );
                      })}
                      <div className="rounded-10 border border-stroke-soft-200 bg-bg-weak-50 px-3 py-2">
                        <div className="text-label-xs text-text-sub-600">Selected add-ons</div>
                        {selectedAddons.length > 0 ? (
                          <div className="mt-2 flex flex-col gap-1.5">
                            {selectedAddons.map((addon) => (
                              <div
                                key={`selected-addon-${addon.id}`}
                                className="flex items-center justify-between gap-2 text-paragraph-sm"
                              >
                                <span className="text-text-strong-950">{addon.name}</span>
                                <span className="text-text-sub-600">
                                  {`$${parseAmount(addon.price).toLocaleString("en-US")}`}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-2 text-paragraph-xs text-text-soft-400">
                            No add-ons selected yet.
                          </div>
                        )}
                        <div className="my-2 h-px bg-stroke-soft-200" />
                        <div className="flex items-center justify-between text-label-sm text-text-strong-950">
                          <span>Total add-on cost</span>
                          <span>{`$${Math.round(addonsAmount).toLocaleString("en-US")}`}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2 text-paragraph-sm text-text-soft-400">
                      Select a package first.
                    </div>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div className="flex flex-col gap-3">
                  {selectedPlan && activeBriefPresets.length > 0 && (
                    <div className="rounded-10 border border-primary-alpha-30 bg-primary-alpha-10 p-3">
                      <div className="flex items-center gap-1.5 text-label-sm text-primary-base">
                        <Sparkles className="size-4" />
                        AI Brief Suggestions
                      </div>
                      <p className="mt-1 text-paragraph-xs text-text-sub-600">
                        {`Choose a quick scenario for the ${selectedPlan.name} package and auto-fill the fields.`}
                      </p>
                      <div className="mt-2 grid grid-cols-1 gap-2">
                        {activeBriefPresets.map((preset) => {
                          const isPresetActive =
                            businessType === preset.businessType &&
                            targetAudience === preset.targetAudience &&
                            mainGoal === preset.mainGoal &&
                            primaryMetric === preset.primaryMetric;

                          return (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => applyBriefPreset(preset)}
                              className={cn(
                                "rounded-10 border px-3 py-2 text-left",
                                isPresetActive
                                  ? "border-primary-base bg-bg-white-0"
                                  : "border-primary-alpha-30 bg-bg-white-0 hover:border-primary-base/60",
                              )}
                            >
                              <div className="text-label-sm text-text-strong-950">{preset.label}</div>
                              <div className="text-paragraph-xs text-text-sub-600">{preset.subtitle}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <label className="text-label-sm text-text-sub-600">
                    Your business model
                    <input
                      value={businessType}
                      onChange={(event) => setBusinessType(event.target.value)}
                      className="mt-1 h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                      placeholder={packageQuestionHints.businessType}
                    />
                  </label>

                  <label className="text-label-sm text-text-sub-600">
                    Hedef kitle
                    <input
                      value={targetAudience}
                      onChange={(event) => setTargetAudience(event.target.value)}
                      className="mt-1 h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                      placeholder={packageQuestionHints.targetAudience}
                    />
                  </label>

                  <label className="text-label-sm text-text-sub-600">
                    Ana hedef
                    <textarea
                      value={mainGoal}
                      onChange={(event) => setMainGoal(event.target.value)}
                      className="mt-1 min-h-[80px] w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                      placeholder={packageQuestionHints.mainGoal}
                    />
                  </label>

                  <label className="text-label-sm text-text-sub-600">
                    Success metric
                    <input
                      value={primaryMetric}
                      onChange={(event) => setPrimaryMetric(event.target.value)}
                      className="mt-1 h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                      placeholder={packageQuestionHints.primaryMetric}
                    />
                  </label>
                </div>
              )}

              {currentStep === 4 && (
                <div className="rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-4">
                  <div className="text-label-sm text-text-strong-950">Summary</div>
                  <div className="mt-3 space-y-2 text-paragraph-sm text-text-sub-600">
                    <p>
                      <strong className="text-text-strong-950">Website:</strong>{" "}
                      {hasWebsite === "yes" ? domain || "-" : "No (will be created)"}
                    </p>
                    <p>
                      <strong className="text-text-strong-950">Template:</strong>{" "}
                      {selectedTemplate?.title || "Not selected"}
                    </p>
                    <p>
                      <strong className="text-text-strong-950">Package:</strong>{" "}
                      {selectedPlan?.name || "-"}
                    </p>
                    <p>
                      <strong className="text-text-strong-950">Add-ons:</strong>{" "}
                      {selectedAddons.length > 0
                        ? selectedAddons
                            .map(
                              (addon) =>
                                `${addon.name} ($${parseAmount(addon.price).toLocaleString("en-US")})`,
                            )
                            .join(", ")
                        : "Yok"}
                    </p>
                    <p>
                      <strong className="text-text-strong-950">Business model:</strong>{" "}
                      {businessType || "-"}
                    </p>
                    <p>
                      <strong className="text-text-strong-950">Ana hedef:</strong>{" "}
                      {mainGoal || "-"}
                    </p>
                    <p>
                      <strong className="text-text-strong-950">Toplam:</strong>{" "}
                      {totalAmount > 0
                        ? `$${Math.round(totalAmount).toLocaleString("en-US")}`
                        : "Based on scope"}
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="flex flex-col gap-3">
                  <div className="rounded-10 border border-stroke-soft-200 bg-bg-weak-50 px-3 py-2 text-paragraph-sm text-text-sub-600">
                    {totalAmount > 0
                      ? `Total due: $${Math.round(totalAmount).toLocaleString("en-US")}`
                      : "Final pricing will be confirmed based on your scope"}
                  </div>

                  <label className="text-label-sm text-text-sub-600">
                    Name on card
                    <input
                      value={cardName}
                      onChange={(event) => setCardName(event.target.value)}
                      className="mt-1 h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                      placeholder="Full Name"
                    />
                  </label>

                  <label className="text-label-sm text-text-sub-600">
                    Card number
                    <input
                      value={cardNumber}
                      onChange={(event) => setCardNumber(event.target.value)}
                      className="mt-1 h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                      placeholder="**** **** **** ****"
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    <label className="text-label-sm text-text-sub-600">
                      SKT
                      <input
                        value={cardExpiry}
                        onChange={(event) => setCardExpiry(event.target.value)}
                        className="mt-1 h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                        placeholder="AA/YY"
                      />
                    </label>
                    <label className="text-label-sm text-text-sub-600">
                      CVC
                      <input
                        value={cardCvc}
                        onChange={(event) => setCardCvc(event.target.value)}
                        className="mt-1 h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                        placeholder="***"
                      />
                    </label>
                  </div>

                  <p className="text-paragraph-xs text-text-soft-400">
                    This step is for demo purposes; completing it will start your setup process.
                  </p>
                </div>
              )}

              <Button.Root
                variant="primary"
                mode="filled"
                size="small"
                className="text-white"
                disabled={!canContinue}
                onClick={onContinue}
              >
                {currentStep === 0
                  ? hasWebsite === "yes"
                    ? scanResult
                      ? "Continue to Package Selection"
                      : isScanning
                        ? "Scanning..."
                        : "Start Scan"
                    : hasWebsite === "no"
                      ? "Continue to Package Selection"
                      : "Continue"
                  : currentStep === STEPS.length - 1
                    ? isCompleting
                      ? "Completing..."
                      : "Complete Payment"
                    : "Continue"}
              </Button.Root>

              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={onBack}
                  className="text-center text-paragraph-sm text-text-sub-600 hover:text-text-strong-950"
                >
                  Go back
                </button>
              )}

              {currentStep === 0 && hasWebsite === "no" && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-center text-paragraph-sm text-text-sub-600 hover:text-text-strong-950"
                >
                  No site, continue to packages
                </button>
              )}

              {currentStep === 5 && (
                <div className="rounded-10 border border-stroke-soft-200 bg-bg-weak-50 px-3 py-2 text-paragraph-xs text-text-soft-400">
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="size-3.5" />
                    Proceed with secure payment infrastructure.
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Globe className="size-3.5" />
                    Your dashboard and project panel will be activated after setup.
                  </div>
                  {scanResult && (
                    <div className="mt-1 flex items-center gap-1.5">
                      <Search className="size-3.5" />
                      Scan result: {scanResult.score}/100
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
