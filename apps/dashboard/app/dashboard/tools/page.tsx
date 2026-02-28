"use client";

import { useState } from "react";
import {
  RiSearchLine,
  RiArrowRightUpLine,
  RiCheckLine,
  RiAddLine,
  RiArrowDownSLine,
  RiGlobalLine,
  RiShieldLine,
  RiCodeLine,
  RiBarChartLine,
  RiMailLine,
  RiChatSmileLine,
  RiSpeedLine,
  RiStore2Line,
  RiPieChartLine,
  RiCameraLine,
  RiRobot2Line,
  RiTranslate2,
  RiFileChartLine,
  RiCalendarEventLine,
  RiMagicLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiExternalLinkLine,
  RiAddCircleLine,
  RiSubtractLine,
} from "@remixicon/react";
import { SidebarTrigger } from "@repo/ui/components/ui/sidebar";
import * as Button from "@repo/ui/new-ui/button";
import * as Modal from "@/components/new-ui/modal";
import * as TabMenuHorizontal from "@/components/new-ui/tab-menu-horizontal";
import { Root as TextareaRoot } from "@repo/ui/new-ui/textarea";
import { toast } from "sonner";
import { cn } from "@/utils/cn";

// ─── Types ─────────────────────────────────────────────────────────────────────

type ToolCategory =
  | "Tümü"
  | "SEO & Analitik"
  | "E-posta & İletişim"
  | "Entegrasyon"
  | "Geliştirme"
  | "Güvenlik"
  | "Yapay Zeka";

type ToolStatus = "active" | "inactive" | "beta" | "new" | "soon";

type Tool = {
  id: string;
  name: string;
  description: string;
  category: Exclude<ToolCategory, "Tümü">;
  status: ToolStatus;
  icon: React.ElementType;
  accentColor: string;
  bgColor: string;
  usedBy?: number;
};

type PermissionValue = "always" | "ask" | "never";

interface Permission {
  name: string;
  description: string;
  value: PermissionValue;
}

interface ToolFeatureSection {
  title: string;
  items: { label: string; description: string }[];
}

interface ToolDetail {
  overview: string;
  permissions: Permission[];
  features: ToolFeatureSection[];
  createdBy: string;
  docsUrl?: string;
}

// ─── Mock data ──────────────────────────────────────────────────────────────────

const TOOLS: Tool[] = [
  {
    id: "1",
    name: "SEO Analyzer",
    description: "Sitenizin SEO puanını analiz edin, iyileştirme önerileri alın.",
    category: "SEO & Analitik",
    status: "active",
    icon: RiBarChartLine,
    accentColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    usedBy: 3,
  },
  {
    id: "2",
    name: "Google Analytics",
    description: "Google Analytics 4 ile ziyaretçi davranışlarını izleyin.",
    category: "SEO & Analitik",
    status: "active",
    icon: RiPieChartLine,
    accentColor: "text-orange-500",
    bgColor: "bg-orange-50",
    usedBy: 2,
  },
  {
    id: "3",
    name: "Hotjar",
    description: "Kullanıcı tıklamaları, kaydırma haritaları ve oturum kayıtları.",
    category: "SEO & Analitik",
    status: "inactive",
    icon: RiCameraLine,
    accentColor: "text-rose-500",
    bgColor: "bg-rose-50",
    usedBy: 1,
  },
  {
    id: "4",
    name: "E-posta Pazarlama",
    description: "Otomatik e-posta kampanyaları ve bülten yönetimi.",
    category: "E-posta & İletişim",
    status: "active",
    icon: RiMailLine,
    accentColor: "text-blue-600",
    bgColor: "bg-blue-50",
    usedBy: 3,
  },
  {
    id: "5",
    name: "Canlı Destek",
    description: "Ziyaretçilerle gerçek zamanlı sohbet ve destek sistemi.",
    category: "E-posta & İletişim",
    status: "beta",
    icon: RiChatSmileLine,
    accentColor: "text-violet-600",
    bgColor: "bg-violet-50",
    usedBy: 0,
  },
  {
    id: "6",
    name: "Zapier",
    description: "3000+ uygulamayla otomasyon akışları oluşturun.",
    category: "Entegrasyon",
    status: "active",
    icon: RiSpeedLine,
    accentColor: "text-amber-500",
    bgColor: "bg-amber-50",
    usedBy: 2,
  },
  {
    id: "7",
    name: "WooCommerce",
    description: "E-ticaret entegrasyonu ile ürün yönetimi ve satış takibi.",
    category: "Entegrasyon",
    status: "inactive",
    icon: RiStore2Line,
    accentColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    usedBy: 1,
  },
  {
    id: "8",
    name: "Çok Dil Desteği",
    description: "Sitenizi otomatik çeviri ile birden fazla dile uyarlayın.",
    category: "Entegrasyon",
    status: "new",
    icon: RiTranslate2,
    accentColor: "text-teal-600",
    bgColor: "bg-teal-50",
    usedBy: 0,
  },
  {
    id: "9",
    name: "Custom Code",
    description: "Siteye özel HTML, CSS ve JavaScript enjekte edin.",
    category: "Geliştirme",
    status: "active",
    icon: RiCodeLine,
    accentColor: "text-zinc-700",
    bgColor: "bg-zinc-100",
    usedBy: 3,
  },
  {
    id: "10",
    name: "SSL & Güvenlik",
    description: "Ücretsiz SSL sertifikası, DDoS koruması ve güvenlik taraması.",
    category: "Güvenlik",
    status: "active",
    icon: RiShieldLine,
    accentColor: "text-green-600",
    bgColor: "bg-green-50",
    usedBy: 3,
  },
  {
    id: "11",
    name: "Domain Yönetimi",
    description: "Alan adı yönlendirmeleri, DNS kayıtları ve alt alan yönetimi.",
    category: "Geliştirme",
    status: "active",
    icon: RiGlobalLine,
    accentColor: "text-sky-600",
    bgColor: "bg-sky-50",
    usedBy: 3,
  },
  {
    id: "12",
    name: "AI İçerik Üretici",
    description: "Yapay zeka ile blog yazıları, ürün açıklamaları ve meta taglar üretin.",
    category: "Yapay Zeka",
    status: "new",
    icon: RiRobot2Line,
    accentColor: "text-purple-600",
    bgColor: "bg-purple-50",
    usedBy: 0,
  },
  {
    id: "13",
    name: "Rapor Oluşturucu",
    description: "Site performansı ve ziyaretçi istatistiklerini otomatik raporlara dönüştürün.",
    category: "SEO & Analitik",
    status: "beta",
    icon: RiFileChartLine,
    accentColor: "text-cyan-600",
    bgColor: "bg-cyan-50",
    usedBy: 0,
  },
  {
    id: "14",
    name: "Takvim & Randevu",
    description: "Müşteri randevu alma sistemi entegrasyonu.",
    category: "Entegrasyon",
    status: "soon",
    icon: RiCalendarEventLine,
    accentColor: "text-pink-600",
    bgColor: "bg-pink-50",
    usedBy: 0,
  },
];

// ─── Tool Detail Data ──────────────────────────────────────────────────────────

const TOOL_DETAILS: Record<string, ToolDetail> = {
  "1": {
    overview:
      "SEO Analyzer, sitenizin arama motoru optimizasyon sağlığını sürekli izler. Başlık etiketleri, meta açıklamalar, dahili bağlantılar ve sayfa hızı gibi kritik faktörleri analiz ederek yapay zeka destekli öneriler sunar.",
    permissions: [
      { name: "Sayfaları tara", description: "Tüm sayfa içeriklerini SEO açısından analiz eder.", value: "always" },
      { name: "Meta verileri oku", description: "Başlık, açıklama ve anahtar kelime etiketlerini okur.", value: "always" },
      { name: "Bağlantı yapısını analiz et", description: "Dahili ve harici bağlantıları kontrol eder.", value: "always" },
      { name: "Rapor oluştur", description: "Haftalık SEO özet raporları üretir.", value: "ask" },
      { name: "İyileştirme önerileri sun", description: "Yapay zeka destekli SEO önerileri üretir.", value: "always" },
      { name: "Yapılandırmayı güncelle", description: "SEO meta verilerini otomatik güncelleyebilir.", value: "ask" },
      { name: "Anahtar kelime takibi", description: "Hedef anahtar kelimelerin sıralamalarını izler.", value: "always" },
    ],
    features: [
      {
        title: "Analiz",
        items: [
          { label: "Kapsamlı SEO taraması", description: "Tüm sayfalar otomatik taranır; eksik başlık, meta açıklama ve hatalı bağlantılar raporlanır." },
          { label: "Rakip karşılaştırması", description: "Sektördeki rakip sitelerin SEO profillerini analiz edin." },
        ],
      },
      {
        title: "Raporlama",
        items: [
          { label: "Otomatik haftalık raporlar", description: "Her Pazartesi e-posta ile SEO özet raporu gönderilir." },
          { label: "Trend grafikleri", description: "SEO puanınızın ve anahtar kelime sıralamalarınızın zaman içindeki değişimini izleyin." },
        ],
      },
    ],
    createdBy: "Moyduz",
    docsUrl: "https://moyduz.com/docs/seo-analyzer",
  },
  "2": {
    overview:
      "Google Analytics 4 entegrasyonu ile sitenizin ziyaretçi verilerini, dönüşüm hedeflerini ve kullanıcı davranışlarını tek panelden izleyin. Detaylı raporlar ve gerçek zamanlı analitik verilerle kararlarınızı veriye dayalı alın.",
    permissions: [
      { name: "Analytics etkinleştir", description: "GA4 takip kodunu sitenize entegre eder.", value: "always" },
      { name: "Ziyaretçi verilerini oku", description: "Sayfa görüntüleme, oturum ve kullanıcı verilerine erişir.", value: "always" },
      { name: "Dönüşüm hedeflerini oku", description: "Tanımlı hedeflerin tamamlanma istatistiklerini okur.", value: "always" },
      { name: "Rapor dışa aktar", description: "Analytics raporlarını CSV/PDF olarak dışa aktarır.", value: "ask" },
      { name: "Hedef yapılandır", description: "Yeni dönüşüm hedefleri tanımlar ve günceller.", value: "ask" },
      { name: "Gerçek zamanlı veri izle", description: "Anlık aktif kullanıcıları ve olayları takip eder.", value: "always" },
    ],
    features: [
      {
        title: "İzleme",
        items: [
          { label: "Gerçek zamanlı dashboard", description: "Şu anda sitenizde bulunan kullanıcıları, aktif sayfaları ve olayları canlı izleyin." },
          { label: "Kullanıcı segmentasyonu", description: "Yeni ziyaretçi, geri dönen kullanıcı, coğrafi konum gibi segmentlere göre analiz." },
        ],
      },
      {
        title: "Dönüşüm",
        items: [
          { label: "Hedef takibi", description: "Form doldurmalar, satın almalar ve tıklamalar gibi dönüşüm hedeflerini tanımlayın ve izleyin." },
          { label: "Huni analizi", description: "Kullanıcıların satın alma veya kayıt sürecinde hangi adımda ayrıldığını tespit edin." },
        ],
      },
    ],
    createdBy: "Google",
    docsUrl: "https://developers.google.com/analytics",
  },
  "3": {
    overview:
      "Hotjar, gerçek kullanıcı davranışlarını ısı haritaları, kaydırma haritaları ve oturum kayıtları ile görsel olarak analiz etmenizi sağlar. Kullanıcıların nereye tıkladığını, nerede takıldığını ve neden ayrıldığını anlayın.",
    permissions: [
      { name: "Oturum kayıtla", description: "Ziyaretçilerin ekran hareketlerini kaydeder.", value: "ask" },
      { name: "Isı haritası oluştur", description: "Tıklama ve kaydırma verilerinden görsel haritalar üretir.", value: "always" },
      { name: "Anket göster", description: "Ziyaretçilere mikro anketler sunar.", value: "ask" },
      { name: "Davranış verilerini oku", description: "Toplanan tıklama ve hareket verilerini okur.", value: "always" },
      { name: "Kayıtları dışa aktar", description: "Oturum kayıtlarını indir ve paylaş.", value: "ask" },
    ],
    features: [
      {
        title: "Görsel Analiz",
        items: [
          { label: "Isı haritaları", description: "Hangi bölümlerin en fazla ilgi gördüğünü renkli görsel haritalarla keşfedin." },
          { label: "Kaydırma derinliği", description: "Kullanıcıların sayfanın ne kadarını gördüğünü ölçün." },
        ],
      },
      {
        title: "Kullanıcı Geri Bildirimi",
        items: [
          { label: "Mikro anketler", description: "Sayfaya gömülü kısa anketlerle kullanıcı görüşlerini toplayın." },
          { label: "Oturum oynatma", description: "Belirli bir kullanıcının oturumunu adım adım izleyin." },
        ],
      },
    ],
    createdBy: "Hotjar Ltd.",
    docsUrl: "https://help.hotjar.com",
  },
  "4": {
    overview:
      "E-posta Pazarlama aracı ile müşterilerinize otomatik kampanyalar, hoş geldin e-postaları ve haftalık bültenler gönderin. Açılma oranları, tıklama istatistikleri ve abone büyümesini takip edin.",
    permissions: [
      { name: "E-posta gönder", description: "Abone listesine kampanya ve bülten gönderir.", value: "ask" },
      { name: "Abone listesini oku", description: "E-posta listesi ve abone verilerini okur.", value: "always" },
      { name: "Abone ekle/kaldır", description: "Yeni aboneler ekler veya kaldırır.", value: "always" },
      { name: "Kampanya oluştur", description: "Yeni e-posta kampanyaları tasarlar.", value: "always" },
      { name: "İstatistikleri oku", description: "Açılma, tıklama ve abonelik verilerini okur.", value: "always" },
      { name: "Otomasyon kurları", description: "Tetikleyici tabanlı e-posta akışları oluşturur.", value: "ask" },
    ],
    features: [
      {
        title: "Kampanya Yönetimi",
        items: [
          { label: "Sürükle & bırak editör", description: "Teknik bilgi gerektirmeden profesyonel e-posta tasarımları oluşturun." },
          { label: "A/B testi", description: "Farklı konu satırları veya içerikler test ederek en iyi performanslı versiyonu belirleyin." },
        ],
      },
      {
        title: "Otomasyon",
        items: [
          { label: "Hoş geldin serisi", description: "Yeni abonelere otomatik olarak karşılama e-postaları gönderin." },
          { label: "Terk sepeti bildirimleri", description: "E-ticaret sitelerinde terk edilen sepetler için otomatik hatırlatma." },
        ],
      },
    ],
    createdBy: "Moyduz",
    docsUrl: "https://moyduz.com/docs/email-marketing",
  },
  "5": {
    overview:
      "Canlı Destek widget'ı ile ziyaretçilerinize anlık yardım sunun. Müşteri sorularını gerçek zamanlı yanıtlayın, destek ekibinizi yönetin ve sohbet geçmişini kayıt altına alın.",
    permissions: [
      { name: "Widget etkinleştir", description: "Canlı sohbet widget'ını siteye yerleştirir.", value: "always" },
      { name: "Sohbet geçmişini oku", description: "Geçmiş konuşmaları görüntüler.", value: "always" },
      { name: "Ziyaretçi bilgisi oku", description: "Aktif ziyaretçilerin sayfa ve kaynak bilgilerini okur.", value: "ask" },
      { name: "Bildirim gönder", description: "Yeni mesaj bildirimlerini masaüstüne iletir.", value: "always" },
      { name: "Bot akışı yapılandır", description: "Otomatik yanıt akışlarını düzenler.", value: "ask" },
    ],
    features: [
      {
        title: "Gerçek Zamanlı İletişim",
        items: [
          { label: "Anlık mesajlaşma", description: "Ziyaretçilerle anında iletişim kurun, bekletmeyin." },
          { label: "Ekip yönetimi", description: "Birden fazla destek temsilcisi aynı anda müşterilere hizmet verebilir." },
        ],
      },
      {
        title: "Otomasyon",
        items: [
          { label: "Chatbot entegrasyonu", description: "Sık sorulan soruları otomatik yanıtlayan bot akışları oluşturun." },
          { label: "Çevrimdışı mesajlar", description: "Ekip çevrimdışıyken ziyaretçiler mesaj bırakabilir; e-posta ile bildirimi alın." },
        ],
      },
    ],
    createdBy: "Moyduz",
    docsUrl: "https://moyduz.com/docs/live-chat",
  },
  "6": {
    overview:
      "Zapier entegrasyonu ile sitenizi 3000'den fazla uygulamaya bağlayın. Otomatik iş akışları (Zap) oluşturarak tekrarlayan görevleri ortadan kaldırın ve veri senkronizasyonunu otomatikleştirin.",
    permissions: [
      { name: "API bağlantısı kur", description: "Zapier ile OAuth bağlantısı kurar.", value: "always" },
      { name: "Webhook oluştur", description: "Gelen Zapier tetikleyicileri için endpoint oluşturur.", value: "always" },
      { name: "Form verilerini ilet", description: "Site form gönderimlerini Zapier üzerinden iletir.", value: "ask" },
      { name: "Zap geçmişini oku", description: "Çalışan otomasyon akışlarının geçmişini görüntüler.", value: "always" },
      { name: "Bağlantıyı kes", description: "Zapier entegrasyonunu devre dışı bırakır.", value: "ask" },
    ],
    features: [
      {
        title: "Entegrasyon",
        items: [
          { label: "3000+ uygulama desteği", description: "Gmail, Slack, Notion, HubSpot ve daha fazlasıyla bağlantı kurun." },
          { label: "Çok adımlı Zap'lar", description: "Bir tetikleyiciyle birden fazla eylemi sırayla gerçekleştiren akışlar oluşturun." },
        ],
      },
      {
        title: "Otomasyon",
        items: [
          { label: "Form → CRM", description: "Site formlarından gelen verileri otomatik CRM sistemine gönderin." },
          { label: "Sipariş bildirimleri", description: "Yeni siparişlerde Slack veya e-posta bildirimi alın." },
        ],
      },
    ],
    createdBy: "Zapier Inc.",
    docsUrl: "https://zapier.com/apps/webhooks",
  },
  "7": {
    overview:
      "WooCommerce entegrasyonu ile e-ticaret sitenizin ürün katalogunu, sipariş yönetimini ve müşteri verilerini panelden yönetin. Satış istatistiklerinizi takip edin ve stok uyarıları alın.",
    permissions: [
      { name: "Ürün listesini oku", description: "WooCommerce ürün kataloğunu okur.", value: "always" },
      { name: "Sipariş verilerini oku", description: "Sipariş geçmişini ve durumlarını okur.", value: "always" },
      { name: "Müşteri verilerini oku", description: "Müşteri profil bilgilerine erişir.", value: "ask" },
      { name: "Ürün güncelle", description: "Fiyat, stok ve açıklama güncellemesi yapar.", value: "ask" },
      { name: "Sipariş durumu güncelle", description: "Siparişleri işleme alır, tamamlar veya iptal eder.", value: "ask" },
      { name: "Stok uyarısı gönder", description: "Düşük stok durumunda bildirim üretir.", value: "always" },
    ],
    features: [
      {
        title: "Ürün Yönetimi",
        items: [
          { label: "Toplu güncelleme", description: "Fiyat ve stok bilgilerini CSV ile toplu olarak güncelleyin." },
          { label: "Kategori yönetimi", description: "Ürün kategorilerini ve alt kategorilerini düzenleyin." },
        ],
      },
      {
        title: "Satış & Sipariş",
        items: [
          { label: "Sipariş takibi", description: "Tüm siparişlerin durumunu tek ekrandan izleyin." },
          { label: "Gelir raporları", description: "Günlük, haftalık ve aylık satış geliri raporları alın." },
        ],
      },
    ],
    createdBy: "WooCommerce / Automattic",
    docsUrl: "https://woocommerce.com/document/woocommerce-rest-api",
  },
  "8": {
    overview:
      "Çok Dil Desteği ile sitenizi farklı dillere uyarlayın. Yapay zeka destekli otomatik çeviri ve insan çevirisini birlikte kullanarak küresel müşterilere ulaşın. URL yapısı ve SEO her dil için ayrı ayrı optimize edilir.",
    permissions: [
      { name: "İçerik çevir", description: "Sayfa metinlerini otomatik olarak çevirir.", value: "ask" },
      { name: "Dil tespiti", description: "Ziyaretçinin tarayıcı diline göre otomatik yönlendirme yapar.", value: "always" },
      { name: "SEO meta verilerini çevir", description: "Başlık ve açıklamaları her dil için ayrı çevirir.", value: "always" },
      { name: "Çeviri onayı iste", description: "Otomatik çevirileri yayınlamadan önce onay bekler.", value: "ask" },
      { name: "Dil ekle/kaldır", description: "Aktif dil listesini yönetir.", value: "ask" },
    ],
    features: [
      {
        title: "Çeviri",
        items: [
          { label: "Otomatik çeviri", description: "GPT destekli çeviri motoru ile içeriklerinizi anında çevirin." },
          { label: "Manuel düzenleme", description: "Otomatik çevirileri düzenleyerek yerel dile uygun hale getirin." },
        ],
      },
      {
        title: "SEO & URL",
        items: [
          { label: "Dil bazlı URL yapısı", description: "/tr/, /en/, /de/ gibi dile özgü URL yapısı otomatik oluşturulur." },
          { label: "hreflang etiketleri", description: "Arama motorlarına hangi sayfanın hangi dilde olduğunu bildirir." },
        ],
      },
    ],
    createdBy: "Moyduz",
    docsUrl: "https://moyduz.com/docs/multilang",
  },
  "9": {
    overview:
      "Custom Code ile sitenize özel HTML blokları, CSS stilleri ve JavaScript kodları enjekte edin. Üçüncü taraf widget'lar, piksel kodları veya özel animasyonlar gibi her türlü kodu güvenli bir şekilde ekleyin.",
    permissions: [
      { name: "HTML enjekte et", description: "Belirli sayfalara HTML blokları ekler.", value: "always" },
      { name: "CSS uygula", description: "Özel stil dosyaları yükler.", value: "always" },
      { name: "JavaScript çalıştır", description: "Sayfa yüklendiğinde özel JS çalıştırır.", value: "ask" },
      { name: "Head etiketi değiştir", description: "<head> bölümüne kod ekler.", value: "ask" },
      { name: "Kodu doğrula", description: "Eklenen kodun sözdizimini kontrol eder.", value: "always" },
    ],
    features: [
      {
        title: "Kod Enjeksiyonu",
        items: [
          { label: "Sayfa başlığına kod ekle", description: "Google Tag Manager, Facebook Pixel gibi scriptleri tek satırla ekleyin." },
          { label: "Gövde başlangıcına/sonuna ekle", description: "<body> açılış veya kapanış noktasına kod blokları yerleştirin." },
        ],
      },
      {
        title: "Yönetim",
        items: [
          { label: "Kod kitaplığı", description: "Sıklıkla kullandığınız kod parçacıklarını kaydedin ve yeniden kullanın." },
          { label: "Sayfa bazlı kural", description: "Belirli sayfalarda veya koşullarda çalışacak kurallar tanımlayın." },
        ],
      },
    ],
    createdBy: "Moyduz",
    docsUrl: "https://moyduz.com/docs/custom-code",
  },
  "10": {
    overview:
      "SSL & Güvenlik, sitenizi DDoS saldırılarına, kötü niyetli botlara ve veri ihlallerine karşı korur. Ücretsiz SSL sertifikası, otomatik yenileme ve güvenlik taraması dahildir.",
    permissions: [
      { name: "SSL sertifikasını yönet", description: "Sertifikayı yükler, yeniler ve yapılandırır.", value: "always" },
      { name: "Güvenlik taraması çalıştır", description: "Sitenizi açık güvenlik açıkları için tarar.", value: "always" },
      { name: "DDoS korumasını etkinleştir", description: "Anormal trafik trafiğini filtreler.", value: "always" },
      { name: "Bot filtresi uygula", description: "Kötü niyetli botları engeller.", value: "always" },
      { name: "Güvenlik raporunu oku", description: "Tehdit ve uyarı raporlarını görüntüler.", value: "always" },
      { name: "IP engelle", description: "Belirli IP adreslerini veya ülkeleri erişimden yasaklar.", value: "ask" },
    ],
    features: [
      {
        title: "SSL & Şifreleme",
        items: [
          { label: "Ücretsiz SSL sertifikası", description: "Let's Encrypt destekli ücretsiz SSL sertifikası otomatik kurulur ve yenilenir." },
          { label: "HTTPS zorlaması", description: "Tüm HTTP istekleri otomatik olarak HTTPS'e yönlendirilir." },
        ],
      },
      {
        title: "Koruma",
        items: [
          { label: "Güvenlik duvarı (WAF)", description: "Web uygulaması güvenlik duvarı ile SQL enjeksiyonu ve XSS saldırılarını önleyin." },
          { label: "Otomatik yedek", description: "Günlük otomatik yedekleme ile veri kaybına karşı koruma." },
        ],
      },
    ],
    createdBy: "Moyduz",
    docsUrl: "https://moyduz.com/docs/ssl-security",
  },
  "11": {
    overview:
      "Domain Yönetimi ile alan adı yönlendirmelerini, DNS kayıtlarını ve alt alan yapılandırmalarını merkezi olarak yönetin. Teknik bilgi gerektirmeyen arayüzle tüm domain ayarlarını kolayca yapın.",
    permissions: [
      { name: "DNS kayıtlarını oku", description: "Mevcut DNS yapılandırmalarını görüntüler.", value: "always" },
      { name: "DNS kayıtlarını güncelle", description: "A, CNAME, MX gibi kayıtları düzenler.", value: "ask" },
      { name: "Yönlendirme kur", description: "URL yönlendirmeleri ve 301/302 kuralları oluşturur.", value: "ask" },
      { name: "Alt alan oluştur", description: "Yeni alt alan adresleri ekler ve yapılandırır.", value: "ask" },
      { name: "SSL ile ilişkilendir", description: "Domaine SSL sertifikası atar.", value: "always" },
    ],
    features: [
      {
        title: "DNS Yönetimi",
        items: [
          { label: "Görsel DNS editörü", description: "Teknik bilgi gerektirmeden A, CNAME, MX ve TXT kayıtlarını yönetin." },
          { label: "TTL yönetimi", description: "DNS yayılma süresini projenize göre ayarlayın." },
        ],
      },
      {
        title: "Yönlendirme",
        items: [
          { label: "301/302 yönlendirme", description: "Eski URL'leri kalıcı veya geçici olarak yeni adreslere yönlendirin." },
          { label: "Alt alan yönetimi", description: "blog.sirketiniz.com gibi alt alanlar oluşturun ve yönetin." },
        ],
      },
    ],
    createdBy: "Moyduz",
    docsUrl: "https://moyduz.com/docs/domain-management",
  },
  "12": {
    overview:
      "AI İçerik Üretici, GPT tabanlı yapay zeka ile blog yazıları, ürün açıklamaları, meta etiketler ve sosyal medya içerikleri üretir. Marka sesinize uyarlanmış, SEO uyumlu içerikler dakikalar içinde hazır.",
    permissions: [
      { name: "İçerik üret", description: "Yapay zeka ile yeni metinler oluşturur.", value: "ask" },
      { name: "Mevcut içeriği oku", description: "İçerik tutarlılığı için mevcut sayfa metinlerini okur.", value: "always" },
      { name: "Taslak kaydet", description: "Üretilen içerikleri taslak olarak saklar.", value: "always" },
      { name: "İçeriği yayınla", description: "Onaylanan içerikleri doğrudan sayfaya ekler.", value: "ask" },
      { name: "SEO önerisi sun", description: "Üretilen içerik için anahtar kelime önerileri yapar.", value: "always" },
    ],
    features: [
      {
        title: "İçerik Üretimi",
        items: [
          { label: "Blog makaleleri", description: "Konuyu belirtin, yapay zeka SEO uyumlu uzun form içerik üretsin." },
          { label: "Ürün açıklamaları", description: "E-ticaret ürünleriniz için dönüşüm odaklı açıklamalar oluşturun." },
        ],
      },
      {
        title: "Optimizasyon",
        items: [
          { label: "Meta etiket üreteci", description: "Her sayfa için otomatik SEO başlığı ve meta açıklaması üretin." },
          { label: "Sosyal medya içerikleri", description: "Aynı içerikten Twitter, LinkedIn ve Instagram için farklı formatlar üretin." },
        ],
      },
    ],
    createdBy: "Moyduz AI",
    docsUrl: "https://moyduz.com/docs/ai-content",
  },
  "13": {
    overview:
      "Rapor Oluşturucu, site performans metriklerini, ziyaretçi istatistiklerini ve SEO verilerini otomatik raporlara dönüştürür. Markanıza özel rapor şablonları oluşturun, müşterilere veya ekibinize zamanlanmış raporlar gönderin.",
    permissions: [
      { name: "Analitik verilerini oku", description: "Google Analytics ve dahili istatistiklere erişir.", value: "always" },
      { name: "Rapor oluştur", description: "Belirlenen şablona göre PDF/HTML rapor üretir.", value: "always" },
      { name: "Rapor gönder", description: "Raporları e-posta ile belirtilen adreslere iletir.", value: "ask" },
      { name: "Zamanlama kur", description: "Haftalık/aylık otomatik rapor zamanlaması oluşturur.", value: "ask" },
      { name: "Şablon düzenle", description: "Rapor şablonlarını özelleştirir.", value: "always" },
    ],
    features: [
      {
        title: "Raporlama",
        items: [
          { label: "Beyaz etiket raporlar", description: "Logonuz ve renklerinizle müşterilerinize profesyonel raporlar gönderin." },
          { label: "Zamanlanmış dağıtım", description: "Haftalık veya aylık raporlar otomatik olarak belirlenen e-postalara gönderilir." },
        ],
      },
      {
        title: "Veri Kaynakları",
        items: [
          { label: "Çoklu kaynak birleştirme", description: "Analytics, SEO ve sosyal medya verilerini tek raporda birleştirin." },
          { label: "Özel metrikler", description: "İzlemek istediğiniz özel KPI'ları raporlara ekleyin." },
        ],
      },
    ],
    createdBy: "Moyduz",
    docsUrl: "https://moyduz.com/docs/report-builder",
  },
  "14": {
    overview:
      "Takvim & Randevu sistemi ile müşterilerinizin online randevu almasını sağlayın. Google Takvim, Outlook ve iCal entegrasyonuyla çift taraflı senkronizasyon, otomatik hatırlatma e-postaları ve özel müsaitlik saatleri.",
    permissions: [
      { name: "Randevu oluştur", description: "Müşterinin seçtiği slota randevu atar.", value: "always" },
      { name: "Takvim okuma", description: "Bağlı takvimleri okuyarak müsaitlik belirler.", value: "always" },
      { name: "Müşteriye bildirim gönder", description: "Onay ve hatırlatma e-postaları iletir.", value: "always" },
      { name: "Randevu iptal et", description: "İptal isteklerini işler.", value: "ask" },
      { name: "Müsaitlik güncelle", description: "Çalışma saatlerini ve kapalı günleri günceller.", value: "ask" },
    ],
    features: [
      {
        title: "Randevu Yönetimi",
        items: [
          { label: "Çevrimiçi rezervasyon sayfası", description: "Müşterilerin 7/24 randevu alabileceği kişiselleştirilmiş bir sayfa oluşturun." },
          { label: "Buffer süresi", description: "Randevular arasına otomatik hazırlık/geçiş süresi ekleyin." },
        ],
      },
      {
        title: "Entegrasyon",
        items: [
          { label: "Google Takvim senkronu", description: "Alınan randevular anında Google Takvim'e yansır." },
          { label: "Otomatik hatırlatmalar", description: "Randevu öncesi e-posta ve SMS hatırlatmaları gönderin." },
        ],
      },
    ],
    createdBy: "Moyduz",
    docsUrl: "https://moyduz.com/docs/appointments",
  },
};

const CATEGORIES: ToolCategory[] = [
  "Tümü",
  "SEO & Analitik",
  "E-posta & İletişim",
  "Entegrasyon",
  "Geliştirme",
  "Güvenlik",
  "Yapay Zeka",
];

const PERMISSION_LABELS: Record<PermissionValue, string> = {
  always: "Her zaman izin ver",
  ask: "Her seferinde sor",
  never: "Hiçbir zaman",
};

// ─── Status badge ───────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ToolStatus }) {
  const config = {
    active: { label: "Aktif", cls: "bg-teal-50 text-teal-700", dot: "bg-teal-600" },
    inactive: { label: "Pasif", cls: "bg-zinc-100 text-zinc-600", dot: "bg-zinc-400" },
    beta: { label: "Beta", cls: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
    new: { label: "Yeni", cls: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
    soon: { label: "Yakında", cls: "bg-purple-50 text-purple-700", dot: "bg-purple-400" },
  }[status];

  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", config.cls)}>
      <span className={cn("inline-block size-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}

// ─── Hero Banner ─────────────────────────────────────────────────────────────

function HeroBanner({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <div className={cn("relative flex h-40 w-full overflow-hidden rounded-xl", tool.bgColor)}>
      {/* grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative flex w-full items-center justify-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 shadow-sm backdrop-blur-sm">
          <Icon className={cn("size-8", tool.accentColor)} />
        </div>
        <div>
          <p className="text-xl font-bold text-foreground">{tool.name}</p>
          <p className="text-sm text-muted-foreground">{tool.category}</p>
        </div>
      </div>
    </div>
  );
}

// ─── PermissionRow ────────────────────────────────────────────────────────────

function PermissionRow({
  perm,
  value,
  onChange,
}: {
  perm: Permission;
  value: PermissionValue;
  onChange: (v: PermissionValue) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-sm font-medium text-foreground">{perm.name}</p>
        <p className="text-sm text-muted-foreground">{perm.description}</p>
      </div>
      <div className="shrink-0">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as PermissionValue)}
          className="flex h-8 w-[160px] items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="always">{PERMISSION_LABELS.always}</option>
          <option value="ask">{PERMISSION_LABELS.ask}</option>
          <option value="never">{PERMISSION_LABELS.never}</option>
        </select>
      </div>
    </div>
  );
}

// ─── PermissionsCard ─────────────────────────────────────────────────────────

function PermissionsCard({ permissions }: { permissions: Permission[] }) {
  const [expanded, setExpanded] = useState(false);
  const [values, setValues] = useState<PermissionValue[]>(permissions.map((p) => p.value));
  const VISIBLE = 4;
  const hasMore = permissions.length > VISIBLE;

  return (
    <div className="relative mt-2 rounded-lg border border-border p-4">
      <div className="flex flex-col gap-4">
        {(expanded ? permissions : permissions.slice(0, VISIBLE)).map((perm, i) => (
          <PermissionRow
            key={i}
            perm={perm}
            value={values[i] ?? perm.value}
            onChange={(v) => setValues((prev) => { const next = [...prev]; next[i] = v; return next; })}
          />
        ))}
      </div>

      {hasMore && !expanded && (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-lg bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex h-7 items-center gap-1.5 rounded-full border border-border bg-background px-3 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              <RiAddCircleLine className="size-3.5" />
              Daha fazla göster
            </button>
          </div>
          <div className="h-8" />
        </>
      )}

      {hasMore && expanded && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="inline-flex h-7 items-center gap-1.5 rounded-full border border-border bg-background px-3 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            <RiSubtractLine className="size-3.5" />
            Daha az göster
          </button>
        </div>
      )}
    </div>
  );
}

// ─── ToolDetailView ───────────────────────────────────────────────────────────

function ToolDetailView({ tool, onBack }: { tool: Tool; onBack: () => void }) {
  const detail = TOOL_DETAILS[tool.id];
  const isActive = tool.status === "active";
  const isSoon = tool.status === "soon";

  return (
    <div className="flex flex-col gap-8 pb-12 lg:mx-auto lg:max-w-[720px]">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <RiArrowLeftLine className="size-4" />
        Araçlar
      </button>

      {/* Header */}
      <header className="flex flex-col flex-wrap items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <div className={cn("flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg transition-colors", tool.bgColor)}>
            {(() => { const Icon = tool.icon; return <Icon className={cn("size-6", tool.accentColor)} />; })()}
          </div>
          <div className="flex flex-col justify-center gap-1.5">
            <h1 className="text-xl font-medium leading-none">{tool.name}</h1>
            <p className="text-sm leading-none text-muted-foreground">{tool.description}</p>
          </div>
        </div>
        <StatusBadge status={tool.status} />
      </header>

      {/* Hero */}
      <HeroBanner tool={tool} />

      {/* Overview */}
      {detail && (
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">Genel Bakış</h2>
          <p className="whitespace-pre-line text-sm text-muted-foreground">{detail.overview}</p>
        </div>
      )}

      {/* Permissions */}
      {detail && !isSoon && (
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">İzinleri Yönet</h2>
          <PermissionsCard permissions={detail.permissions} />
        </div>
      )}

      {/* Features */}
      {detail && (
        <div className="flex flex-col gap-4">
          {detail.features.map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              <h3 className="text-base font-medium">{section.title}</h3>
              <ul className="list-disc space-y-2 pl-4 text-sm">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <strong>{item.label}:</strong>{" "}
                    <span className="text-muted-foreground">{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      {!isSoon && (
        <div className="flex gap-3">
          {isActive ? (
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
            >
              <RiArrowRightUpLine className="size-4" />
              Entegrasyonu Yönet
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm transition-opacity hover:opacity-90"
            >
              <RiAddLine className="size-4" />
              Etkinleştir
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      {detail && (
        <footer className="flex flex-col gap-2 border-t border-border pt-6">
          <h2 className="text-lg font-medium">Detaylar</h2>
          <div className="flex flex-wrap gap-8 text-sm">
            <div className="flex shrink-0 flex-col gap-0.5">
              <p className="text-muted-foreground">Geliştiren</p>
              <p className="font-medium">{detail.createdBy}</p>
            </div>
            {detail.docsUrl && (
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="text-muted-foreground">Dokümantasyon</p>
                <a
                  href={detail.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center gap-1 font-medium hover:underline"
                >
                  <span className="truncate">{detail.docsUrl.replace("https://", "")}</span>
                  <RiExternalLinkLine className="size-4 shrink-0" />
                </a>
              </div>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}

// ─── ToolCard ─────────────────────────────────────────────────────────────────

function ToolCard({ tool, onSelect }: { tool: Tool; onSelect: (t: Tool) => void }) {
  const Icon = tool.icon;
  const isActive = tool.status === "active";
  const isSoon = tool.status === "soon";

  return (
    <div
      className="flex cursor-pointer flex-col rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-5 transition-all duration-200 hover:shadow-lg/5 hover:-translate-y-0.5"
      onClick={() => onSelect(tool)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", tool.bgColor)}>
          <Icon className={cn("size-5", tool.accentColor)} />
        </div>
        <StatusBadge status={tool.status} />
      </div>

      {/* Name + description */}
      <div className="mt-4 flex-1">
        <p className="text-label-sm font-semibold text-text-strong-950">{tool.name}</p>
        <p className="mt-1 text-paragraph-xs text-text-sub-600 leading-relaxed">{tool.description}</p>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-stroke-soft-200" />

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        {tool.usedBy !== undefined && tool.usedBy > 0 ? (
          <span className="text-label-xs text-text-sub-600">{tool.usedBy} sitede aktif</span>
        ) : (
          <span className="text-label-xs text-text-soft-400">
            {isSoon ? "Henüz erişilemiyor" : "Bağlı değil"}
          </span>
        )}

        {isSoon ? (
          <span className="text-label-xs text-text-soft-400">Yakında</span>
        ) : isActive ? (
          <Button.Root variant="neutral" mode="stroke" size="xsmall" onClick={(e) => { e.stopPropagation(); onSelect(tool); }}>
            <Button.Icon as={RiArrowRightLine} />
            Detay
          </Button.Root>
        ) : (
          <Button.Root variant="primary" mode="lighter" size="xsmall" onClick={(e) => { e.stopPropagation(); onSelect(tool); }}>
            <Button.Icon as={RiAddLine} />
            Bağla
          </Button.Root>
        )}
      </div>
    </div>
  );
}

// ─── KPI Cards ─────────────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, icon: Icon, color }: {
  label: string; value: string; sub: string; icon: React.ElementType; color: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-5">
      <div className="flex items-center justify-between">
        <span className="text-label-sm text-text-sub-600">{label}</span>
        <div className={cn("flex size-8 items-center justify-center rounded-full bg-bg-weak-50", color)}>
          <Icon className="size-4" />
        </div>
      </div>
      <div>
        <div className="text-title-h4 text-text-strong-950">{value}</div>
        <p className="mt-0.5 text-paragraph-xs text-text-sub-600">{sub}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ToolsContent() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ToolCategory>("Tümü");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [toolsModalOpen, setToolsModalOpen] = useState(false);
  const [toolsModalTab, setToolsModalTab] = useState<"mevcut" | "ozel">("mevcut");
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestDescription, setRequestDescription] = useState("");
  const [requestSite, setRequestSite] = useState("");
  const [requestSubmitting, setRequestSubmitting] = useState(false);

  const filtered = TOOLS.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "Tümü" || t.category === category;
    return matchesSearch && matchesCategory;
  });

  const activeCount = TOOLS.filter((t) => t.status === "active").length;
  const connectedSites = Math.max(...TOOLS.map((t) => t.usedBy ?? 0));
  const newCount = TOOLS.filter((t) => t.status === "new" || t.status === "beta").length;

  const handleOpenToolsModal = (open: boolean) => {
    setToolsModalOpen(open);
    if (!open) setToolsModalTab("mevcut");
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestDescription.trim()) return;
    setRequestSubmitting(true);
    setTimeout(() => {
      setRequestSubmitting(false);
      setRequestModalOpen(false);
      setRequestDescription("");
      setRequestSite("");
      setToolsModalOpen(false);
      toast.success("Özel araç talebiniz alındı. En kısa sürede dönüş yapacağız.");
    }, 600);
  };

  // ── Detail view ──────────────────────────────────────────────────────────────
  if (selectedTool) {
    return (
      <div className="px-4 py-6 lg:px-8">
        <ToolDetailView tool={selectedTool} onBack={() => setSelectedTool(null)} />
      </div>
    );
  }

  // ── List view ────────────────────────────────────────────────────────────────
  return (
    <div className="px-4 pb-6 lg:px-8">
        {/* Sayfa başlığı */}
        <div className="flex w-full flex-col items-center gap-1.5 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
          <div className="flex flex-col items-center gap-1.5 lg:items-start">
            <h1 className="text-center text-lg font-medium leading-snug text-text-strong-950 lg:text-left">
              Araçlar
            </h1>
            <p className="text-center text-sm font-medium text-text-soft-400 lg:text-left">
              Aktif araçlarınızı tek bir yerden yönetin ve mevcut entegrasyonları keşfedin.
            </p>
          </div>
          <Button.Root
            variant="primary"
            mode="filled"
            size="small"
            className="hidden h-8 gap-1.5 rounded-10 pl-2 pr-3 lg:flex"
            onClick={() => setToolsModalOpen(true)}
          >
            <Button.Icon as={RiAddLine} className="size-5 shrink-0" />
            Araç ekle
          </Button.Root>
        </div>

        {/* Mevcut araçlar modal */}
        <Modal.Root open={toolsModalOpen} onOpenChange={handleOpenToolsModal}>
          <Modal.Content showClose className="max-w-[480px]" onPointerDownOutside={(e) => e.preventDefault()}>
            <div className="p-6">
              <TabMenuHorizontal.Root value={toolsModalTab} onValueChange={(v) => setToolsModalTab(v as "mevcut" | "ozel")}>
                <TabMenuHorizontal.List wrapperClassName="-mx-6 px-6">
                  <TabMenuHorizontal.Trigger value="mevcut">Mevcut araçlar</TabMenuHorizontal.Trigger>
                  <TabMenuHorizontal.Trigger value="ozel">Özel araç talebi</TabMenuHorizontal.Trigger>
                </TabMenuHorizontal.List>
                <TabMenuHorizontal.Content value="mevcut" className="px-0">
                  <p className="mt-2 text-paragraph-sm text-text-sub-600">
                    Bağlayabileceğiniz veya yönetebileceğiniz tüm araçlar aşağıda listelenir.
                  </p>
                  <ul className="mt-4 flex max-h-[50vh] flex-col gap-2 overflow-y-auto">
                    {TOOLS.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <li
                          key={tool.id}
                          className="flex items-center justify-between gap-3 rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 transition-colors hover:bg-bg-weak-50 cursor-pointer"
                          onClick={() => { setToolsModalOpen(false); setSelectedTool(tool); }}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", tool.bgColor)}>
                              <Icon className={cn("size-4", tool.accentColor)} />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-label-sm font-medium text-text-strong-950">{tool.name}</p>
                              <p className="truncate text-paragraph-xs text-text-sub-600">{tool.category}</p>
                            </div>
                          </div>
                          <div className="shrink-0">
                            <StatusBadge status={tool.status} />
                          </div>
                          {tool.status === "active" ? (
                            <Button.Root variant="neutral" mode="stroke" size="xsmall" className="shrink-0" onClick={(e) => { e.stopPropagation(); setToolsModalOpen(false); setSelectedTool(tool); }}>
                              Yönet
                            </Button.Root>
                          ) : tool.status !== "soon" ? (
                            <Button.Root variant="primary" mode="lighter" size="xsmall" className="shrink-0" onClick={(e) => { e.stopPropagation(); setToolsModalOpen(false); setSelectedTool(tool); }}>
                              Bağla
                            </Button.Root>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </TabMenuHorizontal.Content>
                <TabMenuHorizontal.Content value="ozel" className="px-0">
                  <div className="mt-2 flex flex-col gap-4">
                    <p className="text-paragraph-sm text-text-sub-600">
                      Listede olmayan, sadece sizin siteniz için özel bir araç veya eklenti mi istiyorsunuz? Talebinizi iletin, birlikte çözüm üretelim.
                    </p>
                    <div className="rounded-10 border border-stroke-soft-200 bg-bg-weak-50 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                          <RiMagicLine className="size-4 text-primary-600" />
                        </div>
                        <div>
                          <p className="text-label-sm font-medium text-text-strong-950">Siteme özel araç / eklenti</p>
                          <p className="mt-0.5 text-paragraph-xs text-text-sub-600">
                            Özel entegrasyon, eklenti geliştirme veya satın alma talebi oluşturabilirsiniz.
                          </p>
                          <Button.Root type="button" variant="primary" mode="filled" size="small" className="mt-3" onClick={() => setRequestModalOpen(true)}>
                            Talep oluştur
                          </Button.Root>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabMenuHorizontal.Content>
              </TabMenuHorizontal.Root>
            </div>
          </Modal.Content>
        </Modal.Root>

        {/* Özel araç talebi form modal */}
        <Modal.Root open={requestModalOpen} onOpenChange={setRequestModalOpen}>
          <Modal.Content showClose className="max-w-[400px]" onPointerDownOutside={(e) => e.preventDefault()}>
            <form onSubmit={handleRequestSubmit} className="p-6">
              <h2 className="text-label-md text-text-strong-950">Özel araç talebi</h2>
              <p className="mt-1 text-paragraph-sm text-text-sub-600">
                İstediğiniz araç veya özelliği kısaca açıklayın; size özel teklif hazırlayalım.
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <label htmlFor="request-desc" className="block text-label-xs font-medium text-text-strong-950">
                    Araç / özellik açıklaması <span className="text-error-base">*</span>
                  </label>
                  <TextareaRoot
                    id="request-desc"
                    simple
                    placeholder="Örn: Siteme özel ödeme entegrasyonu, raporlama eklentisi..."
                    value={requestDescription}
                    onChange={(e) => setRequestDescription(e.target.value)}
                    rows={3}
                    className="mt-1.5 min-h-20"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="request-site" className="block text-label-xs font-medium text-text-strong-950">
                    Hangi sitede kullanacaksınız? <span className="text-text-soft-400">(isteğe bağlı)</span>
                  </label>
                  <input
                    id="request-site"
                    type="text"
                    placeholder="Site adı veya URL"
                    value={requestSite}
                    onChange={(e) => setRequestSite(e.target.value)}
                    className="mt-1.5 h-9 w-full rounded-xl border-0 bg-bg-white-0 px-3 py-2 text-paragraph-sm text-text-strong-950 shadow-regular-xs outline-none ring-1 ring-inset ring-stroke-soft-200 transition placeholder:text-text-soft-400 focus:ring-2 focus:ring-stroke-strong-950"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button.Root type="button" variant="neutral" mode="stroke" size="small" onClick={() => setRequestModalOpen(false)}>
                  İptal
                </Button.Root>
                <Button.Root type="submit" variant="primary" mode="filled" size="small" disabled={requestSubmitting || !requestDescription.trim()}>
                  {requestSubmitting ? "Gönderiliyor…" : "Talep gönder"}
                </Button.Root>
              </div>
            </form>
          </Modal.Content>
        </Modal.Root>

        {/* KPI bar */}
        <div className="grid grid-cols-2 gap-4 py-6 lg:grid-cols-4">
          <KpiCard label="Toplam Araç" value={String(TOOLS.length)} sub="14 entegrasyon mevcut" icon={RiSpeedLine} color="text-amber-500" />
          <KpiCard label="Aktif Araçlar" value={String(activeCount)} sub="Şu an çalışıyor" icon={RiCheckLine} color="text-teal-600" />
          <KpiCard label="Bağlı Siteler" value={String(connectedSites)} sub="En fazla bağlı site" icon={RiGlobalLine} color="text-sky-600" />
          <KpiCard label="Yeni / Beta" value={String(newCount)} sub="Yakında çıkacak araçlar" icon={RiRobot2Line} color="text-purple-600" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-3 pb-6 md:flex-row">
          <div className="group relative flex flex-1 overflow-hidden rounded-10 bg-bg-white-0 text-text-strong-950 shadow-regular-xs transition duration-200 ease-out before:absolute before:inset-0 before:rounded-[inherit] before:ring-1 before:ring-inset before:ring-stroke-soft-200 before:transition before:duration-200 before:ease-out hover:shadow-none has-[input:focus]:shadow-button-important-focus has-[input:focus]:before:ring-stroke-strong-950">
            <label className="flex w-full cursor-text items-center gap-2 px-2.5">
              <RiSearchLine className="size-5 shrink-0 text-text-sub-600 group-has-[:placeholder-shown]:text-text-soft-400" />
              <input
                type="text"
                placeholder="Araç ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full bg-transparent text-paragraph-sm text-text-strong-950 outline-none placeholder:text-text-soft-400 focus:outline-none"
              />
            </label>
          </div>
          <button
            type="button"
            className="group relative inline-flex h-9 items-center justify-center gap-3 whitespace-nowrap rounded-10 bg-bg-white-0 px-3 text-label-sm text-text-sub-600 shadow-regular-xs outline-none ring-1 ring-inset ring-stroke-soft-200 transition duration-200 ease-out hover:bg-bg-weak-50 hover:text-text-strong-950 hover:shadow-none hover:ring-transparent focus:outline-none focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950"
          >
            Aktif önce
            <RiArrowDownSLine className="-mx-1 size-5" />
          </button>
        </div>

        {/* Category filter tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "inline-flex h-7 items-center rounded-full px-3 text-label-xs transition duration-200 ease-out",
                category === cat
                  ? "bg-bg-strong-950 text-text-white-0"
                  : "bg-bg-weak-50 text-text-sub-600 hover:bg-bg-soft-200 hover:text-text-strong-950",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tool cards grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <p className="text-paragraph-sm text-text-sub-600">Arama sonucu bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onSelect={setSelectedTool} />
            ))}
          </div>
        )}
    </div>
  );
}

export default function ToolsPage() {
  return (
    <div className="flex flex-1 flex-col min-w-0">
      <header className="sticky top-0 z-10 bg-background flex h-12 shrink-0 items-center gap-2 border-b border-border/60 px-4">
        <SidebarTrigger className="-ml-1 text-foreground" />
        <div className="mx-2 h-4 w-px bg-border" />
        <p className="text-base font-medium">Araçlar</p>
      </header>
      <ToolsContent />
    </div>
  );
}
