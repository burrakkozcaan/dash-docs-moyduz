export type SiteStatus =
  | "scan"
  | "brief"
  | "payment"
  | "production"
  | "delivered"
  | "maintenance";

export type Site = {
  id: string;
  name: string;
  status: SiteStatus;
  progress: number;
  packageName: string;
  packageId: string;
  template?: { slug: string; name: string; category: string };
  domain?: string;
  orderId?: string;
  totalPrice?: number;
  createdAt: Date;
  estimatedDelivery?: Date;
  description?: string;
  brief?: Record<string, string>;
  deliverables?: {
    name: string;
    type: "domain" | "panel" | "report" | "asset";
    status: "pending" | "ready" | "delivered";
  }[];
  updates?: { id: string; text: string; date: Date; author: string }[];
};

export const STATUS_STEPS: { key: SiteStatus; label: string }[] = [
  { key: "scan", label: "Tarama" },
  { key: "brief", label: "Brifing" },
  { key: "payment", label: "Ödeme" },
  { key: "production", label: "Üretim" },
  { key: "delivered", label: "Teslim" },
  { key: "maintenance", label: "Bakım" },
];

export const MOCK_SITES: Site[] = [
  {
    id: "1",
    name: "Cafe Botanica",
    status: "production",
    progress: 65,
    packageName: "Commerce Suite",
    packageId: "pkg-commerce",
    template: { slug: "restoran-modern", name: "Restoran Modern", category: "Restoran" },
    domain: "cafebotanica.com.tr",
    orderId: "ORD-2024-001",
    totalPrice: 4990,
    createdAt: new Date("2024-11-15"),
    estimatedDelivery: new Date("2025-01-10"),
    description:
      "İstanbul Beşiktaş'ta konumlanan Cafe Botanica için tam özellikli restoran web sitesi. Online rezervasyon, menü yönetimi ve Google Maps entegrasyonu içerecek.",
    brief: {
      "İşletme Adı": "Cafe Botanica",
      "Sektör": "Yeme & İçme / Kafe",
      "Hedef Kitle": "25-45 yaş, şehirli profesyoneller",
      "Renk Paleti": "Yeşil, krem, kahverengi tonlar",
      "Özellikler": "Online rezervasyon, menü, galeri, iletişim",
      "Sosyal Medya": "@cafebotanica — 12K takipçi",
    },
    deliverables: [
      { name: "cafebotanica.com.tr", type: "domain", status: "ready" },
      { name: "Yönetim Paneli Erişimi", type: "panel", status: "pending" },
      { name: "SEO Performans Raporu", type: "report", status: "pending" },
      { name: "Marka Görselleri (ZIP)", type: "asset", status: "ready" },
    ],
    updates: [
      {
        id: "u1",
        text: "Ana sayfa tasarımı tamamlandı ve onaylandı.",
        date: new Date("2024-12-18"),
        author: "Moyduz Ekibi",
      },
      {
        id: "u2",
        text: "Menü sayfası ve galeri bölümü üretim aşamasında.",
        date: new Date("2024-12-22"),
        author: "Moyduz Ekibi",
      },
      {
        id: "u3",
        text: "Alan adı DNS kaydı tamamlandı, SSL sertifikası aktif.",
        date: new Date("2024-12-28"),
        author: "Moyduz Ekibi",
      },
    ],
  },
  {
    id: "2",
    name: "Yıldız Hukuk Bürosu",
    status: "scan",
    progress: 15,
    packageName: "Starter",
    packageId: "pkg-starter",
    template: { slug: "kurumsal-minimal", name: "Kurumsal Minimal", category: "Kurumsal" },
    orderId: "ORD-2024-002",
    totalPrice: 1990,
    createdAt: new Date("2024-12-20"),
    estimatedDelivery: new Date("2025-02-15"),
    description:
      "Ankara merkezli hukuk bürosu için kurumsal ve güven veren web sitesi. Avukat profilleri, uzmanlık alanları ve iletişim formu içerecek.",
    brief: {
      "İşletme Adı": "Yıldız Hukuk Bürosu",
      "Sektör": "Hukuk / Danışmanlık",
      "Hedef Kitle": "Bireysel ve kurumsal müşteriler",
      "Ton": "Profesyonel, güven verici, resmi",
      "Sayfalar": "Ana sayfa, Hakkımızda, Ekibimiz, Uzmanlık Alanları, İletişim",
    },
    deliverables: [
      { name: "yildizhukuk.av.tr", type: "domain", status: "pending" },
      { name: "Yönetim Paneli Erişimi", type: "panel", status: "pending" },
      { name: "SEO Analiz Raporu", type: "report", status: "pending" },
    ],
    updates: [
      {
        id: "u4",
        text: "Mevcut site taraması başlatıldı. Rakip analizi hazırlanıyor.",
        date: new Date("2024-12-21"),
        author: "Moyduz Ekibi",
      },
    ],
  },
  {
    id: "3",
    name: "TechFlow SaaS",
    status: "maintenance",
    progress: 100,
    packageName: "Commerce Suite",
    packageId: "pkg-commerce",
    template: { slug: "saas-modern", name: "SaaS Modern", category: "SaaS" },
    domain: "techflow.io",
    orderId: "ORD-2024-003",
    totalPrice: 4990,
    createdAt: new Date("2024-08-01"),
    estimatedDelivery: new Date("2024-10-01"),
    description:
      "B2B SaaS ürünü için modern pazarlama sitesi. Landing page, fiyatlandırma, blog ve müşteri referansları içeriyor.",
    brief: {
      "Ürün Adı": "TechFlow",
      "Sektör": "SaaS / B2B Yazılım",
      "Hedef Kitle": "KOBİ'ler, startup'lar",
      "Dil": "Türkçe + İngilizce",
      "Entegrasyonlar": "Intercom, Google Analytics, HubSpot",
    },
    deliverables: [
      { name: "techflow.io", type: "domain", status: "delivered" },
      { name: "Yönetim Paneli Erişimi", type: "panel", status: "delivered" },
      { name: "SEO Performans Raporu", type: "report", status: "delivered" },
      { name: "Kaynak Kodlar (GitHub)", type: "asset", status: "delivered" },
    ],
    updates: [
      {
        id: "u5",
        text: "Site başarıyla teslim edildi ve yayına alındı.",
        date: new Date("2024-10-02"),
        author: "Moyduz Ekibi",
      },
      {
        id: "u6",
        text: "Bakım paketi aktif edildi. Aylık SEO raporu gönderilecek.",
        date: new Date("2024-10-10"),
        author: "Moyduz Ekibi",
      },
      {
        id: "u7",
        text: "Aralık 2024 SEO raporu paylaşıldı. Organik trafik %34 arttı.",
        date: new Date("2024-12-05"),
        author: "Moyduz Ekibi",
      },
    ],
  },
];
