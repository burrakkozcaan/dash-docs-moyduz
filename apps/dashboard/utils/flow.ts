import type { PackageKey } from "./packages"

export type StepKey = "basics" | "industry" | "project" | "final"

export interface FlowFieldOption {
  value: string
  label: string
}

export interface FlowField {
  id: string
  label: string
  type: "text" | "email" | "tel" | "textarea" | "select" | "radio" | "number" | "multi"
  placeholder?: string
  description?: string
  required?: boolean
  options?: FlowFieldOption[]
  min?: number
  max?: number
}

export interface FlowStep {
  key: StepKey
  title: string
  description: string
  fields: FlowField[]
  schema?: unknown
}

/** --------------------------------
 * STEP 1 — Basics (shared)
 * ------------------------------- */
const basicsFields: FlowField[] = [
  { id: "companyName", label: "Şirket adı", type: "text", required: true, placeholder: "Acme A.Ş." },
  { id: "contactName", label: "İletişim kişisi", type: "text", required: true },
  { id: "email", label: "E-posta", type: "text", required: true, placeholder: "ad@sirket.com" },
  { id: "phone", label: "Telefon", type: "text", description: "İsteğe bağlı — yalnızca onboarding desteği için kullanılır" },
]

/** --------------------------------
 * STEP 2 — Industry (shared)
 * ------------------------------- */
const industryFields: FlowField[] = [
  {
    id: "industry",
    label: "Sektör",
    type: "select",
    required: true,
    description: "En uygun olanı seçin.",
    options: [
      { value: "retail", label: "Perakende" },
      { value: "services", label: "Hizmetler" },
      { value: "technology", label: "Teknoloji / SaaS" },
      { value: "healthcare", label: "Sağlık" },
      { value: "education", label: "Eğitim" },
      { value: "real-estate", label: "Gayrimenkul" },
      { value: "finance", label: "Finans" },
      { value: "legal", label: "Hukuk" },
      { value: "marketing", label: "Pazarlama" },
      { value: "manufacturing", label: "Üretim" },
      { value: "food", label: "Yiyecek & İçecek" },
      { value: "other", label: "Diğer" },
    ],
  },
  {
    id: "industryOther",
    label: "'Diğer' seçtiyseniz belirtin",
    type: "text",
    placeholder: "ör. Güzellik kliniği, Lojistik, İnşaat…",
  },
]

/** --------------------------------
 * STEP 3 — Project (package-specific)
 * ------------------------------- */

// Starter
const starterProjectFields: FlowField[] = [
  {
    id: "goal",
    label: "Temel hedefiniz nedir?",
    type: "textarea",
    required: true,
    placeholder: "Birini seçin – daha sonra düzenleyebilirsiniz",
    description: "Örn: Daha fazla arama, rezervasyon veya satış",
  },
  {
    id: "pages",
    label: "Kaç sayfaya ihtiyacınız var?",
    type: "number",
    required: true,
    min: 1,
    max: 7,
    description: "Çoğu müşteri 3–5 sayfa tercih eder",
  },
  {
    id: "primaryLanguage",
    label: "Birincil dil",
    type: "select",
    required: true,
    placeholder: "Dil seçin",
    options: [
      { value: "tr", label: "🇹🇷 Türkçe" },
      { value: "en", label: "🇬🇧 English" },
      { value: "de", label: "🇩🇪 Deutsch" },
      { value: "fr", label: "🇫🇷 Français" },
      { value: "es", label: "🇪🇸 Español" },
    ],
  },
  {
    id: "wantsMultiLanguage",
    label: "Çok dil desteği eklensin mi?",
    type: "radio",
    options: [
      { value: "yes", label: "Evet" },
      { value: "no", label: "Hayır" },
    ],
    description: "İçerik ziyaretçinin diline göre otomatik değişir.",
  },
  {
    id: "additionalLanguages",
    label: "Ek diller",
    type: "multi",
    options: [
      { value: "tr", label: "🇹🇷 Türkçe" },
      { value: "en", label: "🇬🇧 English" },
      { value: "de", label: "🇩🇪 Deutsch" },
      { value: "fr", label: "🇫🇷 Français" },
      { value: "es", label: "🇪🇸 Español" },
    ],
  },
  {
    id: "logoReady",
    label: "Logonuz hazır mı?",
    type: "radio",
    required: true,
    options: [
      { value: "yes", label: "Evet" },
      { value: "no", label: "Hayır" },
    ],
  },
]

// Commerce
const commerceProjectFields: FlowField[] = [
  {
    id: "storeType",
    label: "Mağaza türü",
    type: "radio",
    required: true,
    options: [
      { value: "b2c", label: "B2C (Tüketiciye)" },
      { value: "b2b", label: "B2B (İşletmeye)" },
      { value: "both", label: "Her ikisi" },
    ],
  },
  {
    id: "products",
    label: "Ürün sayısı (tahmini)",
    type: "number",
    required: true,
    min: 1,
    placeholder: "100",
  },
  {
    id: "payments",
    label: "Ödeme yöntemleri",
    type: "multi",
    required: true,
    description: "Geçerli olan hepsini seçin (sonradan değiştirilebilir).",
    options: [
      { value: "stripe", label: "Stripe" },
      { value: "paypal", label: "PayPal" },
      { value: "bank", label: "Banka Havalesi" },
      { value: "cod", label: "Kapıda Ödeme" },
    ],
  },
  {
    id: "integrations",
    label: "Entegrasyonlar",
    type: "select",
    description: "İsteğe bağlı",
    options: [
      { value: "none", label: "Yok" },
      { value: "erp", label: "ERP" },
      { value: "shipping", label: "Kargo" },
      { value: "crm", label: "CRM" },
    ],
  },
]

// Marketplace
const marketplaceProjectFields: FlowField[] = [
  {
    id: "vendors",
    label: "Başlangıç satıcı sayısı",
    type: "number",
    required: true,
    min: 1,
    placeholder: "50",
  },
  {
    id: "commission",
    label: "Komisyon oranı (%)",
    type: "number",
    required: true,
    min: 0,
    max: 100,
    placeholder: "10",
  },
  {
    id: "payouts",
    label: "Satıcı ödemeleri",
    type: "radio",
    required: true,
    options: [
      { value: "manual", label: "Manuel" },
      { value: "automatic", label: "Otomatik" },
    ],
  },
  {
    id: "vendorApproval",
    label: "Satıcı onayı gereksin mi?",
    type: "radio",
    required: true,
    options: [
      { value: "yes", label: "Evet" },
      { value: "no", label: "Hayır" },
    ],
  },
]

// Custom
const customProjectFields: FlowField[] = [
  {
    id: "overview",
    label: "Proje özeti",
    type: "textarea",
    required: true,
    placeholder: "Ne geliştirdiğinizin kısa bir özeti…",
  },
  {
    id: "timeline",
    label: "Zaman çizelgesi",
    type: "radio",
    required: true,
    options: [
      { value: "urgent", label: "Acil (< 1 ay)" },
      { value: "1-2months", label: "1–2 ay" },
      { value: "3-6months", label: "3–6 ay" },
      { value: "flexible", label: "Esnek" },
    ],
  },
  {
    id: "budget",
    label: "Bütçe",
    type: "radio",
    required: true,
    options: [
      { value: "5k-10k", label: "$5.000 – $10.000" },
      { value: "10k-25k", label: "$10.000 – $25.000" },
      { value: "25k-50k", label: "$25.000 – $50.000" },
      { value: "50k+", label: "$50.000+" },
    ],
  },
]

/** --------------------------------
 * STEP 4 — Final (shared base)
 * ------------------------------- */
const finalFieldsBase: FlowField[] = [
  {
    id: "notes",
    label: "Ek notlar",
    type: "textarea",
    placeholder: "Başka bilmemizi istediğiniz bir şey var mı?",
    description: "İsteğe bağlı",
  },
  {
    id: "contactVia",
    label: "Nasıl iletişim kuralım?",
    type: "radio",
    options: [
      { value: "email", label: "E-posta" },
      { value: "phone", label: "Telefon" },
    ],
    description: "İsteğe bağlı (varsayılan: E-posta)",
  },
  {
    id: "foundUsVia",
    label: "Bizi nasıl buldunuz?",
    type: "select",
    description: "İsteğe bağlı",
    options: [
      { value: "search", label: "Google / Arama" },
      { value: "referral", label: "Tavsiye" },
      { value: "social", label: "Sosyal medya" },
      { value: "ads", label: "Reklam" },
      { value: "other", label: "Diğer" },
    ],
  },
]

/** Sadece commerce ve marketplace için Final'da tek alan (tekrarlanmaması için ayrı tanım) */
const existingCatalogField: FlowField = {
  id: "existingCatalog",
  label: "Mevcut ürün kataloğunuz var mı?",
  type: "radio",
  options: [
    { value: "yes", label: "Evet" },
    { value: "no", label: "Hayır" },
  ],
  description: "Varsa taşıyabiliriz; yoksa sıfırdan kurabiliriz.",
}

/** --------------------------------
 * FLOW BUILDER
 * ------------------------------- */
const projectConfigMap: Record<
  PackageKey,
  { fields: FlowField[]; title: string; description: string }
> = {
  starter: {
    fields: starterProjectFields,
    title: "Proje",
    description: "Bu cevaplara göre sitenizi kişiselleştireceğiz.",
  },
  commerce: {
    fields: commerceProjectFields,
    title: "Proje",
    description: "Katalog ve ödeme sistemini doğru kurmamıza yardımcı olur.",
  },
  marketplace: {
    fields: marketplaceProjectFields,
    title: "Proje",
    description: "Satıcı akışı ve ödeme yapısını belirlememizi sağlar.",
  },
  custom: {
    fields: customProjectFields,
    title: "Proje",
    description: "Kısa bir özet hızlıca kapsam belirlememizi sağlar.",
  },
}

export function getOnboardingFlow(packageKey: PackageKey): FlowStep[] {
  const projectConfig = projectConfigMap[packageKey]
  const finalFields =
    packageKey === "commerce" || packageKey === "marketplace"
      ? [...finalFieldsBase, existingCatalogField]
      : finalFieldsBase
  return [
    {
      key: "basics",
      title: "Temel Bilgiler",
      description: "Sadece temel bilgiler.",
      fields: [...basicsFields],
    },
    {
      key: "industry",
      title: "Sektör",
      description: "En uygun olanı seçin.",
      fields: [...industryFields],
    },
    {
      key: "project",
      title: projectConfig.title,
      description: projectConfig.description,
      fields: [...projectConfig.fields],
    },
    {
      key: "final",
      title: "Son Adım",
      description: "Başka bir şey var mı?",
      fields: [...finalFields],
    },
  ]
}

export function getStepIndex(flow: FlowStep[], stepKey: StepKey): number {
  return flow.findIndex((s) => s.key === stepKey)
}
