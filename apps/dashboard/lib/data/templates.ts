export type Template = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  tags: string[];
  pages: string[];
  demoUrl: string;
  gradient: string;
};

export const TEMPLATE_CATEGORIES = [
  "Tümü",
  "E-ticaret",
  "Restoran",
  "Kurumsal",
  "Portfolio",
  "SaaS",
  "Emlak",
  "Sağlık",
  "Eğitim",
  "Blog",
  "Moda",
];

export const MOCK_TEMPLATES: Template[] = [
  {
    id: "t1",
    title: "Mağaza Pro",
    slug: "magaza-pro",
    category: "E-ticaret",
    description:
      "Ürün listeleme, sepet ve ödeme akışı içeren tam özellikli e-ticaret şablonu. WooCommerce entegrasyonuna hazır.",
    tags: ["ürün kataloğu", "sepet", "ödeme", "filtreleme"],
    pages: ["Ana Sayfa", "Ürünler", "Ürün Detay", "Sepet", "Ödeme", "Hesabım", "İletişim"],
    demoUrl: "https://demo.moyduz.com/magaza-pro",
    gradient: "from-orange-500 to-rose-500",
  },
  {
    id: "t2",
    title: "Restoran Modern",
    slug: "restoran-modern",
    category: "Restoran",
    description:
      "Menü vitrin, online rezervasyon formu ve galeri bölümü içeren modern restoran şablonu.",
    tags: ["menü", "rezervasyon", "galeri", "konum"],
    pages: ["Ana Sayfa", "Menü", "Rezervasyon", "Galeri", "Hakkımızda", "İletişim"],
    demoUrl: "https://demo.moyduz.com/restoran-modern",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: "t3",
    title: "Kurumsal Minimal",
    slug: "kurumsal-minimal",
    category: "Kurumsal",
    description:
      "Şirket kimliğini öne çıkaran, sade ve güven veren kurumsal web sitesi şablonu.",
    tags: ["hizmetler", "ekip", "referanslar", "iletişim"],
    pages: ["Ana Sayfa", "Hakkımızda", "Hizmetler", "Ekibimiz", "Referanslar", "İletişim"],
    demoUrl: "https://demo.moyduz.com/kurumsal-minimal",
    gradient: "from-slate-600 to-slate-800",
  },
  {
    id: "t4",
    title: "Kreatif Portfolio",
    slug: "kreatif-portfolio",
    category: "Portfolio",
    description:
      "Tasarımcı, fotoğrafçı ve yaratıcı profesyoneller için etkileyici portfolio şablonu.",
    tags: ["projeler", "galeri", "hakkımda", "iletişim"],
    pages: ["Ana Sayfa", "Projeler", "Proje Detay", "Hakkımda", "İletişim"],
    demoUrl: "https://demo.moyduz.com/kreatif-portfolio",
    gradient: "from-violet-500 to-purple-700",
  },
  {
    id: "t5",
    title: "SaaS Modern",
    slug: "saas-modern",
    category: "SaaS",
    description:
      "Dönüşüm odaklı landing page, fiyatlandırma tablosu ve müşteri referansları içeren SaaS pazarlama şablonu.",
    tags: ["landing", "fiyatlandırma", "SSS", "entegrasyon"],
    pages: ["Ana Sayfa", "Özellikler", "Fiyatlandırma", "Blog", "Hakkımızda", "İletişim"],
    demoUrl: "https://demo.moyduz.com/saas-modern",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "t6",
    title: "Emlak Premium",
    slug: "emlak-premium",
    category: "Emlak",
    description:
      "İlan listesi, filtre sistemi ve harita entegrasyonu içeren profesyonel emlak portali şablonu.",
    tags: ["ilanlar", "harita", "filtreleme", "arama"],
    pages: ["Ana Sayfa", "İlanlar", "İlan Detay", "Danışmanlar", "Blog", "İletişim"],
    demoUrl: "https://demo.moyduz.com/emlak-premium",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "t7",
    title: "Sağlık Klinik",
    slug: "saglik-klinik",
    category: "Sağlık",
    description:
      "Doktor profilleri, randevu formu ve hizmet açıklamaları içeren sağlık kurumu şablonu.",
    tags: ["randevu", "doktorlar", "hizmetler", "sigorta"],
    pages: ["Ana Sayfa", "Hizmetler", "Doktorlarımız", "Randevu Al", "Hakkımızda", "İletişim"],
    demoUrl: "https://demo.moyduz.com/saglik-klinik",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "t8",
    title: "Eğitim Akademi",
    slug: "egitim-akademi",
    category: "Eğitim",
    description:
      "Kurs kataloğu, eğitmen profilleri ve kayıt formu içeren online eğitim platformu şablonu.",
    tags: ["kurslar", "eğitmenler", "sertifika", "kayıt"],
    pages: ["Ana Sayfa", "Kurslar", "Kurs Detay", "Eğitmenler", "Hakkımızda", "İletişim"],
    demoUrl: "https://demo.moyduz.com/egitim-akademi",
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    id: "t9",
    title: "Blog Editör",
    slug: "blog-editor",
    category: "Blog",
    description:
      "Kategorili makale listesi, yazar profili ve arama özelliği içeren modern blog şablonu.",
    tags: ["makaleler", "kategoriler", "yazar", "arama"],
    pages: ["Ana Sayfa", "Blog", "Makale Detay", "Kategoriler", "Hakkımda", "İletişim"],
    demoUrl: "https://demo.moyduz.com/blog-editor",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    id: "t10",
    title: "Moda Butik",
    slug: "moda-butik",
    category: "Moda",
    description:
      "Koleksiyon vitrin, lookbook ve online alışveriş özellikli moda markası şablonu.",
    tags: ["koleksiyon", "lookbook", "alışveriş", "sezon"],
    pages: ["Ana Sayfa", "Koleksiyon", "Ürün Detay", "Lookbook", "Hakkımızda", "İletişim"],
    demoUrl: "https://demo.moyduz.com/moda-butik",
    gradient: "from-pink-500 to-rose-600",
  },
];
