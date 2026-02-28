"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
type RememberedOnboardingState = {
  currentStep: number;
  hasWebsite: WebsiteChoice;
  domain: string;
  scanResult: ScanResult | null;
  scannedSiteTitle: string;
  scanBlocked: boolean;
  nextScanAtHuman: string | null;
  scanRequestError: string | null;
  selectedPlanId: number | null;
  selectedAddonIds: number[];
  businessType: string;
  targetAudience: string;
  mainGoal: string;
  primaryMetric: string;
};

interface ScanSummary {
  bullets?: string[];
}

interface ScanResult {
  domain: string;
  url: string;
  score: number;
  seo: Record<string, boolean>;
  presence: Record<string, boolean>;
  title?: string;
  h1?: string;
  meta_title?: string;
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
  { id: "scan", title: "Canlı Site Analizi" },
  { id: "package", title: "Paket Seçimi" },
  { id: "addons", title: "Eklenti Seçimi" },
  { id: "questions", title: "Kısa Sorular" },
  { id: "summary", title: "Özet" },
  { id: "payment", title: "Ödeme" },
];

const MOCK_PLANS: PlanFromApi[] = [
  {
    id: 1,
    name: "Starter",
    description: "Kurumsal tanıtım sitesi",
    setup_price: 4990,
    monthly_price: 990,
    addons: [],
  },
  {
    id: 2,
    name: "Business",
    description: "Profesyonel iş sitesi + SEO",
    setup_price: 7990,
    monthly_price: 1490,
    addons: [],
  },
  {
    id: 3,
    name: "Commerce Suite",
    description: "E-ticaret + ödeme entegrasyonu",
    setup_price: 12990,
    monthly_price: 1990,
    addons: [],
  },
];

const PACKAGE_BRIEF_PRESETS: Record<string, BriefPreset[]> = {
  starter: [
    {
      id: "starter-visibility",
      label: "Kurumsal görünürlük",
      subtitle: "Tanıtım odaklı başlangıç",
      businessType: "Kurumsal tanıtım sitesi",
      targetAudience: "Google'dan şirketi arayan potansiyel müşteriler",
      mainGoal: "Kurumsal güven ve iletişim formu dönüşümünü artırmak",
      primaryMetric: "Aylık iletişim formu başvurusu",
    },
    {
      id: "starter-local",
      label: "Yerel müşteri kazanımı",
      subtitle: "Bölgesel müşteri hedefi",
      businessType: "Yerel hizmet işletmesi",
      targetAudience: "Bulunduğumuz şehirde hizmet arayan kullanıcılar",
      mainGoal: "Telefon araması ve WhatsApp başlatma oranını artırmak",
      primaryMetric: "Aylık telefon/WhatsApp lead sayısı",
    },
  ],
  business: [
    {
      id: "business-lead",
      label: "Lead toplama",
      subtitle: "Satış görüşmesi akışı",
      businessType: "B2B hizmet şirketi",
      targetAudience: "Karar verici yönetici ve ekip liderleri",
      mainGoal: "Demo ve teklif talep sayısını düzenli artırmak",
      primaryMetric: "Aylık demo/teklif talebi",
    },
    {
      id: "business-authority",
      label: "Uzmanlık konumlama",
      subtitle: "İçerik + SEO büyümesi",
      businessType: "Profesyonel danışmanlık markası",
      targetAudience: "Araştırma yaparak hizmet karşılaştıran müşteriler",
      mainGoal: "Organik trafik ve içerik kaynaklı lead üretmek",
      primaryMetric: "SEO kaynaklı aylık lead",
    },
  ],
  commerce: [
    {
      id: "commerce-sales",
      label: "Satış büyümesi",
      subtitle: "Ürün odaklı e-ticaret",
      businessType: "E-ticaret mağazası",
      targetAudience: "Mobil ağırlıklı ürün karşılaştıran online alıcılar",
      mainGoal: "Sepetten ödeme tamamlamaya geçişi yükseltmek",
      primaryMetric: "Aylık sipariş adedi ve dönüşüm oranı",
    },
    {
      id: "commerce-roas",
      label: "Reklam verimi",
      subtitle: "ROAS optimizasyonu",
      businessType: "Performans reklamı odaklı online satış",
      targetAudience: "Meta/Google reklamlarından gelen yeni kullanıcılar",
      mainGoal: "Reklam bütçesinden daha yüksek gelir elde etmek",
      primaryMetric: "ROAS ve müşteri edinme maliyeti",
    },
  ],
  marketplace: [
    {
      id: "marketplace-sellers",
      label: "Satıcı büyümesi",
      subtitle: "Çoklu satıcı modeli",
      businessType: "Marketplace platformu",
      targetAudience: "Platforma katılmak isteyen satıcılar ve alıcılar",
      mainGoal: "Aktif satıcı ve işlem hacmini büyütmek",
      primaryMetric: "Aylık aktif satıcı ve GMV",
    },
  ],
  custom: [
    {
      id: "custom-enterprise",
      label: "Özel entegrasyon",
      subtitle: "Kuruma özel ihtiyaç",
      businessType: "Özel yazılım ihtiyacı olan kurum",
      targetAudience: "Kurum içi operasyon ekipleri",
      mainGoal: "Operasyon süreçlerini dijitalleştirip hızlandırmak",
      primaryMetric: "Süreç başına harcanan operasyon süresi",
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
      className="size-3.5 shrink-0 origin-center text-success-base"
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
  if (Number.isNaN(n) || n <= 0) return "Kapsama göre";
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

function getScanIssues(scan: ScanResult): string[] {
  const issues: string[] = [];
  if (!scan.seo.meta_description) issues.push("Meta açıklama eksik");
  if (!scan.seo.h1) issues.push("H1 başlığı eksik");
  if (!scan.presence.analytics && !scan.presence.tag_manager) {
    issues.push("Analytics kurulumu yok");
  }
  if (!scan.presence.meta_pixel) issues.push("Meta Pixel eksik");
  if (!scan.presence.google_business) issues.push("Google Business kaydı eksik");
  return issues.slice(0, 4);
}

function scoreTone(score: number) {
  if (score >= 75) {
    return {
      text: "text-emerald-600",
      bg: "bg-emerald-500",
      label: "İyi",
    };
  }
  if (score >= 50) {
    return {
      text: "text-amber-600",
      bg: "bg-amber-500",
      label: "Geliştirilebilir",
    };
  }
  return {
    text: "text-rose-600",
    bg: "bg-rose-500",
    label: "Kritik",
  };
}

function recommendPackageFromScan(scan: ScanResult): "starter" | "business" | "commerce" {
  if (scan.score < 55) return "commerce";
  if (scan.score < 72) return "business";
  return "starter";
}

export function OnboardingSiteFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setShowStepIndicator } = useOnboarding();

  const tenant = searchParams.get("tenant");
  const templateSlug = searchParams.get("template");
  const templateTitleParam = searchParams.get("templateTitle");
  const templateImageParam = searchParams.get("templateImage");
  const flowStepParam = searchParams.get("flowStep");
  const packageParam = searchParams.get("package");
  const recommendedParam = searchParams.get("recommended");
  const initialAddonKeys = searchParams.getAll("addons[]");
  const initialAddonKeysSignature = initialAddonKeys.join("|");
  const rememberKey = `onboarding-site-flow:${tenant ?? "default"}:${templateSlug ?? "default"}`;
  const rememberedState = useMemo(() => {
    if (typeof window === "undefined") return null;

    try {
      const raw = window.sessionStorage.getItem(rememberKey);
      return raw ? (JSON.parse(raw) as Partial<RememberedOnboardingState>) : null;
    } catch {
      return null;
    }
  }, [rememberKey]);
  const hasRememberedAddonSelection = Array.isArray(rememberedState?.selectedAddonIds);

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
  const [preserveRememberedAddonSelection, setPreserveRememberedAddonSelection] = useState(
    hasRememberedAddonSelection,
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
      setPreserveRememberedAddonSelection(false);
      return;
    }
    if (preserveRememberedAddonSelection) {
      setPreserveRememberedAddonSelection(false);
      return;
    }
    const recommended = planAddons
      .filter((addon) => addon.is_recommended)
      .slice(0, 2)
      .map((addon) => addon.id);
    setSelectedAddonIds(recommended);
  }, [planAddons, preserveRememberedAddonSelection, selectedPlan]);

  useEffect(() => {
    if (!flowStepParam) return;

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
          businessType: "Örn: Kurumsal tanıtım sitesi",
          targetAudience: "Örn: Şirketi araştıran potansiyel müşteriler",
          mainGoal: "Örn: İletişim formu ve telefon dönüşümünü artırmak",
          primaryMetric: "Örn: Aylık lead / form sayısı",
        };
      case "business":
        return {
          businessType: "Örn: B2B hizmet / danışmanlık",
          targetAudience: "Örn: Karar verici yönetici profili",
          mainGoal: "Örn: Demo ve teklif taleplerini büyütmek",
          primaryMetric: "Örn: Aylık demo talebi",
        };
      case "commerce":
        return {
          businessType: "Örn: E-ticaret mağazası",
          targetAudience: "Örn: Mobil ağırlıklı ürün alıcıları",
          mainGoal: "Örn: Sepetten ödeme tamamlamaya geçişi artırmak",
          primaryMetric: "Örn: Sipariş adedi / dönüşüm oranı",
        };
      case "marketplace":
        return {
          businessType: "Örn: Çok satıcılı pazar yeri",
          targetAudience: "Örn: Satıcılar ve nihai alıcılar",
          mainGoal: "Örn: Aktif satıcı ve işlem hacmini artırmak",
          primaryMetric: "Örn: Aylık GMV",
        };
      default:
        return {
          businessType: "Örn: B2B hizmet / E-ticaret",
          targetAudience: "Örn: 25-45 yaş profesyoneller",
          mainGoal: "Örn: İlk 3 ay içinde teklif form dönüşümünü artırmak",
          primaryMetric: "Örn: Aylık lead sayısı",
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
    return "Yeni Projeniz";
  }, [domain, hasWebsite, scannedSiteTitle, selectedTemplate, templateTitleParam]);

  const previewSlug = useMemo(() => {
    const source =
      (siteTitle.trim() || selectedTemplate?.slug || "yeni-site").toLowerCase();
    const sanitized = source
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return sanitized || "yeni-site";
  }, [selectedTemplate, siteTitle]);

  const previewGradient = selectedTemplate?.gradient ?? "from-slate-600 to-slate-800";
  const showSelectedPlanPreview = Boolean(
    selectedPlan && (currentStep > 0 || scanResult),
  );

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const previousTitle = STEPS[currentStep - 1]?.title ?? "Giriş";
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

  const showExitBlocked = () => {
    setExitBlockedNotice("Onboarding tamamlanmadan çıkış yapılamaz.");
    window.setTimeout(() => {
      setExitBlockedNotice((prev) =>
        prev === "Onboarding tamamlanmadan çıkış yapılamaz." ? null : prev,
      );
    }, 2200);
  };

  const clearRememberedOnboardingState = () => {
    if (typeof window === "undefined") return;
    window.sessionStorage.removeItem(rememberKey);
  };

  const selectPlan = (planId: number) => {
    setPreserveRememberedAddonSelection(false);
    setSelectedAddonIds([]);
    setSelectedPlanId(planId);
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
        const message =
          res.status === 401
            ? "Oturum süresi doldu. Canlı tarama için yeniden giriş yapın."
            : res.status === 422
              ? "Geçerli bir domain girin."
              : res.status === 408 || res.status === 504
                ? "Canlı tarama zaman aşımına uğradı. Lütfen tekrar deneyin."
                : typeof data?.message === "string" && data.message.trim().length > 0
                  ? data.message
                  : "Canlı tarama şu anda tamamlanamadı.";

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
          setScanRequestError("Canlı tarama kullanılabilir veri döndürmedi. Lütfen tekrar deneyin.");
          return;
        }

        const result: ScanResult = data.scanResult;

        setScanResult(result);
        setScannedSiteTitle(extractScanSiteTitle(result, domain.trim()));

        const recommended = recommendPackageFromScan(result);
        const planMatch = plans.find(
          (plan) => inferPackageKeyFromPlanName(plan.name) === recommended,
        );
        if (planMatch) {
          selectPlan(planMatch.id);
        }
      }
    } catch {
      setScanResult(null);
      setScannedSiteTitle("");
      setScanRequestError("Tarama servisine ulaşılamadı. Lütfen tekrar deneyin.");
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
      router.push("/dashboard");
    } catch {
      clearRememberedOnboardingState();
      router.push("/dashboard");
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
  const scoreInfo = scoreTone(scanResult?.score ?? 0);

  const stepDescriptions = [
    "Siteniz varsa canlı tarama yapalım, yoksa doğrudan yeni kurulumla ilerleyelim.",
    "İş modelinize en uygun paketi seçin.",
    "İhtiyacınıza göre eklentileri belirleyin.",
    "Kısa sorularla projenin hedefini netleştirelim.",
    "Seçimlerinizi son kez kontrol edin.",
    "Ödeme adımını tamamlayıp kurulumu başlatın.",
  ];

  const currentStepDescription =
    stepDescriptions[currentStep] ?? "Onboarding ayarlarınızı tamamlayın.";

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
    <div className="flex min-h-full flex-col bg-bg-white-0 lg:flex-row">
      <aside className="hidden w-[212px] shrink-0 flex-col gap-12 p-8 lg:flex">
        <div className="flex size-8 items-center justify-center rounded-xl bg-primary-base text-static-white">
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
                    "flex items-center gap-1.5 text-label-sm transition-colors duration-200 ease-out",
                    active
                      ? "text-primary-base"
                      : completed
                        ? "text-text-sub-600"
                        : "text-text-soft-400",
                  )}
                >
                  {`Adım ${index + 1}/${STEPS.length}`}
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

        <div className="text-paragraph-xs text-text-soft-400">© 2026 Moyduz</div>
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
              {`${previousTitle} sayfasına dön`}
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
            <div className="flex w-full max-w-[352px] flex-col gap-5">
              <div>
                <div className="text-label-md text-text-sub-600">Canlı Önizleme</div>
                <div className="mt-1 text-label-sm text-text-soft-400">
                  Seçtikçe sağdaki bilgiler burada gerçek zamanlı güncellenir.
                </div>
              </div>

              <div className="relative w-full min-w-0">
                <div className="relative z-10 flex w-full flex-col gap-6 rounded-3xl bg-bg-white-0 p-6 pb-7 shadow-custom-md">
                  <div className="flex items-center gap-1.5">
                    <RiInformationLine className="size-3.5 text-text-disabled-300" />
                    <div className="text-label-sm text-text-soft-400">
                      {hasWebsite === "yes" && domain.trim()
                        ? `Domain: ${domain.trim()}`
                        : `Demo: demo.moyduz.com/${previewSlug}`}
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-stroke-soft-200">
                    <div className="flex items-center gap-1.5 bg-bg-soft-200 px-3 py-2">
                      <span className="size-2 rounded-full bg-rose-400/70" />
                      <span className="size-2 rounded-full bg-amber-400/70" />
                      <span className="size-2 rounded-full bg-green-400/70" />
                      <div className="ml-2 flex-1 truncate rounded-full bg-bg-weak-50 px-2 py-0.5 text-[10px] text-text-soft-400">
                        {hasWebsite === "yes" && domain.trim()
                          ? domain.trim()
                          : `demo.moyduz.com/${previewSlug}`}
                      </div>
                    </div>

                    <div className={cn("relative h-[224px] w-full bg-gradient-to-br", previewGradient)}>
                      {templateImageParam && hasWebsite !== "yes" && !scanResult && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={templateImageParam}
                          alt={templateTitleParam || "Seçilen şablon"}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}

                      {(isScanning ||
                        (!scanResult &&
                          !(templateImageParam && hasWebsite !== "yes"))) && (
                        <>
                          <div className="absolute inset-0 bg-black/10" />
                          <div className="absolute inset-0 p-4">
                            <div className="h-full rounded-xl bg-white/18 p-3 ring-1 ring-white/35 backdrop-blur-[1px]">
                              <div className="animate-pulse">
                                <div className="flex items-center justify-between">
                                  <div className="h-2.5 w-20 rounded-full bg-white/75" />
                                  <div className="flex items-center gap-1.5">
                                    <div className="h-2.5 w-2.5 rounded-full bg-white/70" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-white/70" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-white/70" />
                                  </div>
                                </div>
                                <div className="mt-3 space-y-2">
                                  <div className="h-4 w-3/4 rounded-full bg-white/80" />
                                  <div className="h-3 w-1/2 rounded-full bg-white/65" />
                                </div>
                                <div className="mt-4 grid grid-cols-3 gap-2">
                                  {[...Array(3)].map((_, index) => (
                                    <div key={index} className="h-14 rounded-lg bg-white/45" />
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
                            <div className="absolute inset-x-0 top-0 h-[2px] bg-white/80 animate-pulse" />
                          </div>
                          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/25 px-2.5 py-1 text-[11px] text-white backdrop-blur-sm">
                            <RiPulseLine className="size-3.5 animate-pulse" />
                            Canlı analiz yapılıyor...
                          </div>
                        </>
                      )}

                      {!isScanning && scanResult && hasWebsite === "yes" && (
                        <div className="absolute inset-0 p-4">
                          <div className="h-full rounded-xl bg-black/18 p-3 ring-1 ring-white/30 backdrop-blur-[1px] text-white">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="text-[11px] opacity-80">Site Skoru</div>
                                <div className={cn("text-3xl font-black", scoreInfo.text.replace("600", "100"))}>
                                  {scanResult.score}
                                </div>
                              </div>
                              <div className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", scoreInfo.bg)}>
                                {scoreInfo.label}
                              </div>
                            </div>

                            <div className="mt-3 space-y-1.5">
                              {scanIssues.map((issue) => (
                                <div
                                  key={issue}
                                  className="rounded-md bg-black/25 px-2 py-1 text-[11px]"
                                >
                                  {issue}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {showSelectedPlanPreview && (
                        <div className="absolute left-3 top-3 rounded-full bg-black/20 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                          {selectedPlan?.name}
                        </div>
                      )}

                      <div className="absolute bottom-3 right-3 rounded-full bg-black/20 px-2 py-0.5 text-[11px] text-white backdrop-blur-sm">
                        {showSelectedPlanPreview && selectedAddonIds.length > 0
                          ? `${selectedAddonIds.length} eklenti`
                          : showSelectedPlanPreview
                            ? "Temel kurulum"
                            : "Marketplace önizleme"}
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="text-label-md text-text-soft-400">
                      {selectedTemplate?.category || "Onboarding"}
                    </div>
                    <div className="mt-2 line-clamp-2 text-label-lg text-text-sub-600">
                      {siteTitle}
                    </div>
                    <div className="mt-1 line-clamp-2 text-paragraph-sm text-text-soft-400">
                      {mainGoal || selectedTemplate?.description || "Hedefinizi yazdıkça bu alan güncellenir."}
                    </div>
                    {showSelectedPlanPreview && (
                      <div className="mt-3 rounded-lg bg-bg-weak-50 p-3 ring-1 ring-inset ring-stroke-soft-200">
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="line-clamp-1 text-paragraph-xs text-text-soft-400">
                              Selected Package
                            </div>
                            <div className="line-clamp-1 text-label-sm text-text-strong-950">
                              {selectedPlan?.name}
                            </div>
                          </div>
                          {totalAmount > 0 && (
                            <div className="shrink-0 text-right">
                              <div className="text-paragraph-xs text-text-soft-400">Total</div>
                              <div
                                className={cn(
                                  "text-title-h5 text-text-strong-950 transition-all duration-300",
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
                      <div className="text-label-md text-text-soft-400">Brief Durumu</div>
                      <div className="text-label-sm text-text-soft-400">
                        {businessType || mainGoal ? "Dolu" : "Bekleniyor"}
                      </div>
                    </div>

                    <div className="rounded-lg bg-bg-weak-50 p-3 ring-1 ring-inset ring-stroke-soft-200">
                      <div className="text-paragraph-xs text-text-soft-400">İş Tipi</div>
                      <div className="mt-1 line-clamp-1 text-paragraph-sm text-text-sub-600">
                        {businessType || "Henüz yazılmadı"}
                      </div>

                      <div className="mt-2 text-paragraph-xs text-text-soft-400">Ana Hedef</div>
                      <div className="mt-1 line-clamp-2 text-paragraph-sm text-text-sub-600">
                        {mainGoal || "Henüz belirtilmedi"}
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
              {`${previousTitle} sayfasına dön`}
            </button>
            <div className="flex-1" />
            <button
              type="button"
              onClick={showExitBlocked}
              className="flex size-5 items-center justify-center rounded-md text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950"
            >
              <RiCloseLine className="size-[18px]" />
            </button>
          </div>

          <div className="flex h-full w-full flex-col justify-center md:py-9">
            <div className="mx-auto flex w-full max-w-[372px] flex-col gap-5 md:gap-6">
              <div className="flex w-full flex-col gap-6">
                <Sparkles className="size-7 text-primary-base" />
                <div>
                  <div className="text-title-h5 text-text-strong-950">{currentTitle}</div>
                  <div className="mt-2 text-paragraph-md text-text-sub-600">
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
                  <div className="text-label-sm text-text-sub-600">Siteniz var mı?</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setHasWebsite("yes");
                        setScanBlocked(false);
                        setNextScanAtHuman(null);
                        setScanRequestError(null);
                      }}
                      className={cn(
                        "rounded-10 border px-3 py-2 text-left text-paragraph-sm",
                        hasWebsite === "yes"
                          ? "border-primary-base bg-primary-alpha-10 text-primary-base"
                          : "border-stroke-soft-200 bg-bg-white-0 text-text-sub-600",
                      )}
                    >
                      Evet, var
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
                      Hayır, yok
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
                        placeholder="ornek.com"
                      />
                    </label>
                  )}

                  {scanRequestError && (
                    <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-paragraph-xs text-rose-700">
                      {scanRequestError}
                    </div>
                  )}

                  {scanBlocked && nextScanAtHuman && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-paragraph-xs text-amber-800">
                      {`Yeni tarama ${nextScanAtHuman} tarihinde tekrar açılacak.`}
                    </div>
                  )}

                  {scanResult && hasWebsite === "yes" && (
                    <div className="rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-label-sm text-text-strong-950">Tarama Sonucu</div>
                        <div className="text-label-sm text-text-sub-600">{scanResult.score}/100</div>
                      </div>
                      <div className="mt-2 space-y-1.5">
                        {scanIssues.map((issue) => (
                          <div key={issue} className="flex items-center gap-2 text-paragraph-xs text-text-sub-600">
                            <AlertTriangle className="size-3.5 text-amber-500" />
                            {issue}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-paragraph-xs text-text-soft-400">
                    Bu adımda canlı analiz hissi için site taraması yapılır, yoksa sıfırdan kurulum akışına geçilir.
                  </p>
                </div>
              )}

              {currentStep === 1 && (
                <div className="flex flex-col gap-3">
                  {plansLoading && (
                    <div className="rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2 text-paragraph-sm text-text-soft-400">
                      Paketler yükleniyor...
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
                            onClick={() => selectPlan(plan.id)}
                            className={cn(
                              "rounded-10 border p-3 text-left",
                              selected
                                ? "border-primary-base bg-primary-alpha-10"
                                : "border-stroke-soft-200 bg-bg-white-0",
                            )}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="text-label-md text-text-strong-950">{plan.name}</div>
                              {selected && <Check className="size-4 text-primary-base" />}
                            </div>
                            <div className="mt-1 text-paragraph-xs text-text-soft-400">
                              {plan.description || "Özel kurulum"}
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
                        {`${selectedPlan.name} paketi için eklentiler`}
                      </div>
                      {planAddons.length === 0 && (
                        <div className="rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2 text-paragraph-sm text-text-soft-400">
                          Bu paket için eklenti bulunamadı.
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
                              {addon.description || "Opsiyonel geliştirme"}
                            </div>
                          </button>
                        );
                      })}
                      <div className="rounded-10 border border-stroke-soft-200 bg-bg-weak-50 px-3 py-2">
                        <div className="text-label-xs text-text-sub-600">Seçilen eklentiler</div>
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
                            Henüz eklenti seçilmedi.
                          </div>
                        )}
                        <div className="my-2 h-px bg-stroke-soft-200" />
                        <div className="flex items-center justify-between text-label-sm text-text-strong-950">
                          <span>Toplam eklenti tutarı</span>
                          <span>{`$${Math.round(addonsAmount).toLocaleString("en-US")}`}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2 text-paragraph-sm text-text-soft-400">
                      Önce bir paket seçin.
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
                        AI Brief Önerileri
                      </div>
                      <p className="mt-1 text-paragraph-xs text-text-sub-600">
                        {`${selectedPlan.name} paketi için hızlı bir senaryo seçip alanları otomatik doldurabilirsiniz.`}
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
                    İş modeliniz
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
                    Başarı metriği
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
                  <div className="text-label-sm text-text-strong-950">Özet</div>
                  <div className="mt-3 space-y-2 text-paragraph-sm text-text-sub-600">
                    <p>
                      <strong className="text-text-strong-950">Website:</strong>{" "}
                      {hasWebsite === "yes" ? domain || "-" : "Yok (yeni kurulacak)"}
                    </p>
                    <p>
                      <strong className="text-text-strong-950">Template:</strong>{" "}
                      {selectedTemplate?.title || "Seçilmedi"}
                    </p>
                    <p>
                      <strong className="text-text-strong-950">Paket:</strong>{" "}
                      {selectedPlan?.name || "-"}
                    </p>
                    <p>
                      <strong className="text-text-strong-950">Eklentiler:</strong>{" "}
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
                      <strong className="text-text-strong-950">İş modeli:</strong>{" "}
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
                        : "Kapsama göre"}
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="flex flex-col gap-3">
                  <div className="rounded-10 border border-stroke-soft-200 bg-bg-weak-50 px-3 py-2 text-paragraph-sm text-text-sub-600">
                    {totalAmount > 0
                      ? `Ödenecek toplam: $${Math.round(totalAmount).toLocaleString("en-US")}`
                      : "Ödeme tutarı kapsamınıza göre netleşecek"}
                  </div>

                  <label className="text-label-sm text-text-sub-600">
                    Kart üzerindeki isim
                    <input
                      value={cardName}
                      onChange={(event) => setCardName(event.target.value)}
                      className="mt-1 h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                      placeholder="Ad Soyad"
                    />
                  </label>

                  <label className="text-label-sm text-text-sub-600">
                    Kart numarası
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
                    Bu adım demo amaçlıdır; tamamlandığında kurulum süreciniz başlatılır.
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
                      ? "Paket Seçimine Geç"
                      : isScanning
                        ? "Taranıyor..."
                        : "Taramayı Başlat"
                    : hasWebsite === "no"
                      ? "Paket Seçimine Geç"
                      : "Devam Et"
                  : currentStep === STEPS.length - 1
                    ? isCompleting
                      ? "Tamamlanıyor..."
                      : "Ödemeyi Tamamla"
                    : "Devam Et"}
              </Button.Root>

              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={onBack}
                  className="text-center text-paragraph-sm text-text-sub-600 hover:text-text-strong-950"
                >
                  Geri dön
                </button>
              )}

              {currentStep === 0 && hasWebsite === "no" && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-center text-paragraph-sm text-text-sub-600 hover:text-text-strong-950"
                >
                  Site yok, paket adımına geç
                </button>
              )}

              {currentStep === 5 && (
                <div className="rounded-10 border border-stroke-soft-200 bg-bg-weak-50 px-3 py-2 text-paragraph-xs text-text-soft-400">
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="size-3.5" />
                    Güvenli ödeme altyapısı ile devam edilir.
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Globe className="size-3.5" />
                    Kurulum sonrası dashboard ve proje paneliniz aktif olur.
                  </div>
                  {scanResult && (
                    <div className="mt-1 flex items-center gap-1.5">
                      <Search className="size-3.5" />
                      Tarama sonucu: {scanResult.score}/100
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
