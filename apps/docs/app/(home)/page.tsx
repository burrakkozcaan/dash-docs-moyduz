
import Image from 'next/image';
import { cn } from '@/lib/cn';
import Link from 'next/link';
import { cva } from 'class-variance-authority';
import {
  BatteryChargingIcon,
  CreditCardIcon,
  FileIcon,
  GlobeIcon,
  Heart,
  LayoutTemplateIcon,
  SearchIcon,
  ShoppingBag,
  StoreIcon,
  TimerIcon,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { Marquee } from '@/app/(home)/marquee';
import { CodeBlock } from '@/components/code-block';
import {
  Hero,
  AgnosticBackground,
  CreateAppAnimation,
  PreviewImages,
  Writing,
  ContentAdoptionBackground,
} from '@/app/(home)/page.client';
import ShadcnImage from './shadcn.png';
import ContributorCounter from '@/components/contributor-count';
import { owner, repo } from '@/lib/github';

const headingVariants = cva('font-medium tracking-tight', {
  variants: {
    variant: {
      h2: 'text-3xl lg:text-4xl',
      h3: 'text-xl lg:text-2xl',
    },
  },
});

const buttonVariants = cva(
  'inline-flex justify-center px-5 py-3 rounded-full font-medium tracking-tight transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground hover:bg-brand-200',
        secondary: 'border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const cardVariants = cva('rounded-2xl text-sm p-6', {
  variants: {
    variant: {
      secondary: 'bg-transparent ',
      default: 'border bg-fd-card',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export default function Page() {
  return (
    <main className="text-landing-foreground pt-4 pb-6 dark:text-landing-foreground-dark md:pb-12">
      <div className="relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px] bg-origin-border">
        <Hero />
        <div className="flex flex-col z-2 px-4 size-full md:p-12 max-md:items-center max-md:text-center">
          <p className="mt-12 text-xs text-brand font-medium rounded-full p-2 border border-brand/50 w-fit">
            Moyduz: Türkiye'nin En İyi E-ticaret Altyapısı
          </p>
          <h1 className="text-4xl my-8 leading-tighter font-medium xl:text-5xl xl:mb-12">
            <span className="text-brand">Moyduz</span> ile İşinizi
            <br />
            E-ticarete Taşıyın.
          </h1>
          <p className="text-lg mb-8 max-w-xl text-fd-muted-foreground">
            Moyduz hazır e-ticaret paketleri ile dakikalar içinde online mağazanızı açın. 
            Güvenli ödeme, kargo entegrasyonları ve mobil uyumlu temalarla satışa hemen başlayın.
          </p>
          <div className="flex flex-row items-center justify-center gap-4 flex-wrap w-fit">
            <Link href="/docs" className={cn(buttonVariants(), 'max-sm:text-sm')}>
              Paketleri İncele
            </Link>
            <Link
               href="https://moyduz.com"
               className={cn(buttonVariants({ variant: 'secondary' }), 'max-sm:text-sm')}
            >
              Demo Talep Et
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2">
        <p className="text-2xl tracking-tight leading-snug font-light col-span-full md:text-3xl xl:text-4xl">
          Moyduz E-ticaret, <span className="text-brand font-medium">KOBİ'ler</span> ve <span className="text-brand font-medium">Girişimciler</span> için 
          geliştirilmiş, <span className="text-brand font-medium">SEO uyumlu</span> ve yüksek performanslı bir e-ticaret yazılımıdır. 
          Pazaryeri entegrasyonları ve sosyal medya satış araçları ile işinizi büyütün.
        </p>
        <div className="p-4 bg-radial-[circle_at_top_center] rounded-xl col-span-full">
          <h2 className="text-xl text-center text-brand font-mono font-bold uppercase mb-2">
            Hemen Başlayın
          </h2>
          <div className="flex justify-center mb-8">
             <p className="text-center max-w-md">Profesyonel e-ticaret sitenizi kurmak için tek yapmanız gereken bize ulaşmak.</p>
          </div>
          <CreateAppAnimation />
        </div>
        <Feedback />
        <Aesthetics />
        <AnybodyCanWrite />
        <ForEngineers />
        <OpenSource />
      </div>
    </main>
  );
}

function Aesthetics() {
  return (
    <>
      <div
        className={cn(
          cardVariants({
            variant: 'secondary',
            className: 'flex items-center justify-center p-0',
          }),
        )}
      >
        <PreviewImages />
      </div>
      <div className={cn(cardVariants(), 'flex flex-col')}>
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          Mobil Uyumlu Modern Temalar.
        </h3>
        <p className="mb-4">
          Sektörünüze özel, dönüşüm odaklı ve %100 mobil uyumlu hazır tasarım şablonları.
        </p>
        <p className="mb-4">Tasarım bilgisine gerek kalmadan vitrinizi özelleştirin.</p>
        <div className="mt-auto">
             <Link href="/docs/e-ticaret-paketleri/theme" className="text-brand font-medium hover:underline">Temaları Görüntüle →</Link>
        </div>
      </div>
    </>
  );
}

function AnybodyCanWrite() {
  return (
    <Writing
      tabs={{
        writer: (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="max-lg:row-start-1">
              <h3 className={cn(headingVariants({ variant: 'h3', className: 'my-4' }))}>
                Pazaryeri Entegrasyonları
              </h3>
              <p>
                Trendyol, Hepsiburada, N11, Amazon ve daha fazlası. Tüm siparişlerinizi ve stoklarınızı tek panelden yönetin.
              </p>
              <ul className="text-xs list-disc list-inside mt-8">
                <li>Otomatik Stok Eşitleme</li>
                <li>Toplu Ürün Gönderimi</li>
                <li>Sipariş Aktarımı</li>
                <li>Kargo Etiketi Yazdırma</li>
              </ul>
            </div>
             <div className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 rounded-xl p-4">
                 <StoreIcon className="size-32 text-brand" />
            </div>
          </div>
        ),
        developer: (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
             <div className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 rounded-xl p-4">
                 <CreditCardIcon className="size-32 text-brand" />
            </div>
            <div className="max-lg:row-start-1">
              <h3 className={cn(headingVariants({ variant: 'h3', className: 'my-4' }))}>
                Güvenli Ödeme Altyapısı
              </h3>
              <p>Iyzico, PayTR, Stripe ve tüm bankaların sanal POS altyapıları ile entegre.</p>
              <ul className="text-xs list-disc list-inside mt-8">
                <li>3D Secure Güvenlik</li>
                <li>Taksitli Satış İmkanı</li>
                <li>Kapıda Ödeme Seçeneği</li>
                <li>Havale/EFT Yönetimi</li>
              </ul>
            </div>
          </div>
        ),
        automation: (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="max-lg:row-start-1">
              <h3 className={cn(headingVariants({ variant: 'h3', className: 'my-4' }))}>
                Gelişmiş SEO Yönetimi
              </h3>
              <p>
                Google'da üst sıralara çıkmak için ihtiyacınız olan tüm SEO araçları panelinizde hazır.
              </p>
              <ul className="text-xs list-disc list-inside mt-8">
                <li>Otomatik Sitemap Oluşturma</li>
                <li>Meta Tag Yönetimi</li>
                <li>SEO Uyumlu URL Yapısı</li>
                <li>Google Merchant Center Entegrasyonu</li>
              </ul>
            </div>
             <div className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 rounded-xl p-4">
                 <SearchIcon className="size-32 text-brand" />
            </div>
          </div>
        ),
      }}
    />
  );
}

const feedback = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/124599',
    user: 'Ahmet Y.',
    role: 'Giyim Markası Sahibi',
    message: `İkas ve Ticimax arasında kalmıştım ama buradaki fiyat/performans gerçekten harika. Satışlarım %30 arttı.`,
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/35677084',
    user: 'Ayşe K.',
    role: 'Ev Dekorasyon',
    message: `Teknik bilgim hiç yoktu ama panel o kadar kolay ki mağazamı 1 günde açtım. Müşteri desteği de süper.`,
  },
  {
    user: 'Mehmet T.',
    avatar: 'https://avatars.githubusercontent.com/u/38025074',
    role: 'Elektronik Mağazası',
    message: 'Pazaryeri entegrasyonları sorunsuz çalışıyor. Stok takibi derdinden kurtuldum.',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/10645823',
    user: 'Zeynep S.',
    role: 'Butik Sahibi',
    message: `Mobil temalar çok şık, müşterilerimden sürekli övgü alıyorum. Teşekkürler!`,
  },
];

function Feedback() {
  return (
    <>
      <div className={cn(cardVariants())}>
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          Binlerce mutlu müşteri.
        </h3>
        <p className="mb-6">
          Türkiye'nin dört bir yanından KOBİ'ler ve girişimciler e-ticaret süreçlerini bize emanet ediyor.
        </p>
        <span className="text-brand font-medium">
          <TrendingUp className="size-4" />
          Moyduz</span> ile işinizi büyütün.
      </div>
      <div
        className={cn(
          cardVariants({
            variant: 'secondary',
            className: 'relative p-0',
          }),
        )}
      >
        <div className="absolute inset-0 z-2 rounded-2xl" />
        <Marquee className="p-8">
          {feedback.map((item) => (
            <div
              key={item.user}
              className="flex flex-col rounded-xl border bg-fd-card text-landing-foreground p-4 shadow-lg w-[320px]"
            >
              <p className="text-sm whitespace-pre-wrap">{item.message}</p>

              <div className="mt-auto flex flex-row items-center gap-2 pt-4">
                <Image
                  src={item.avatar}
                  alt="avatar"
                  width="32"
                  height="32"
                  unoptimized
                  className="size-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{item.user}</p>
                  <p className="text-xs text-fd-muted-foreground">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
}

function ForEngineers() {
  return (
    <>
      <h2
        className={cn(
          headingVariants({
            variant: 'h2',
            className: 'text-brand text-center mb-4 col-span-full',
          }),
        )}
      >
        Güçlü Altyapı.
      </h2>

      <div className={cn(cardVariants(), 'relative flex flex-col overflow-hidden z-2')}>
        <h3
          className={cn(
            headingVariants({
              variant: 'h3',
              className: 'mb-6',
            }),
          )}
        >
          Bulut Tabanlı Mimari
        </h3>
        <p className="mb-20">
          Kesintisiz hizmet ve %99.9 uptime garantisi. Trafik yoğunluğuna göre otomatik ölçeklenen sunucular.
        </p>
        <div className="flex flex-row gap-2 mt-auto bg-brand text-brand-foreground rounded-xl p-2 w-fit">
           <LayoutTemplateIcon className="size-6"/>
        </div>

        <AgnosticBackground />
      </div>
      <div
        className={cn(
          cardVariants({
            className: 'flex flex-col',
          }),
        )}
      >
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          Esnek Paket Seçenekleri
        </h3>
        <p className="mb-8">
            İhtiyacınıza uygun paketi seçin, fazlasına ödeme yapmayın. İstediğiniz zaman paketinizi yükseltebilirsiniz.
        </p>
        <div className="mt-auto flex flex-col gap-2 @container mask-[linear-gradient(to_bottom,white,transparent)]">
          {[
            {
              name: 'Başlangıç Paketi',
              description: 'Yeni başlayanlar için temel özellikler.',
            },
            {
              name: 'Profesyonel Paket',
              description: 'Büyüyen işletmeler için gelişmiş özellikler.',
            },
            {
              name: 'Premium Paket',
              description: 'Sınırsız ürün ve özel destek.',
            },
            {
              name: 'Kurumsal Paket',
              description: 'Size özel sunucu ve tasarım çözümleri.',
            },
          ].map((item) => (
            <div
              key={item.name}
              className="flex flex-col text-sm gap-2 p-2 border border-dashed border-brand-secondary @lg:flex-row @lg:items-center last:@max-lg:hidden"
            >
              <p className="font-medium text-nowrap">{item.name}</p>
              <p className="text-xs flex-1 @lg:text-end">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={cn(cardVariants())}>
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          Rakiplerden Farkımız
        </h3>
        <p className="mb-4">
          Neden bizi tercih etmelisiniz?
        </p>
        <div className="ml-4 mb-6">
            <ul className="list-disc text-sm space-y-2">
                <li>Yıllık ücret yok, ömür boyu lisans seçenekleri.</li>
                <li>Gizli maliyet yok.</li>
                <li>7/24 Ücretsiz Teknik Destek.</li>
            </ul>
        </div>
        <CodeBlock
          wrapper={{
            title: 'Hızlı Kurulum',
          }}
          code={`
// 1. Hesap Oluşturun
// 2. Temanızı Seçin
// 3. Ürünlerinizi Yükleyin
// 4. Satışa Başlayın!
`.trim()}
          lang="ts"
        />
      </div>
      <div className={cn(cardVariants({ className: 'relative overflow-hidden min-h-[400px]' }))}>
        <ContentAdoptionBackground className="absolute inset-0" />
        <div className="absolute top-8 left-4 w-[70%] flex flex-col bg-neutral-50/80 backdrop-blur-lg border text-neutral-800 p-2 rounded-xl shadow-lg shadow-black dark:bg-neutral-900/80 dark:text-neutral-200">
          <p className="px-2 pb-2 font-medium border-b mb-2 text-neutral-500 dark:text-neutral-400">
            Yönetim Paneli
          </p>
          {['Siparişler', 'Ürünler', 'Müşteriler', 'Raporlar'].map((page) => (
            <div
              key={page}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-400/20"
            >
              <FileIcon className="stroke-neutral-500 size-4 dark:stroke-neutral-400" />
              <span className="text-sm">{page}</span>
              <div className="px-3 py-1 font-mono rounded-full bg-brand text-xs text-brand-foreground ms-auto">
                Aktif
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 right-4 w-[70%] flex flex-col bg-neutral-100 text-neutral-800 rounded-xl border shadow-lg shadow-black dark:bg-neutral-900 dark:text-neutral-200">
          <div className="px-4 py-2 text-neutral-500 border-b font-medium dark:text-neutral-400">
            Satış Özeti
          </div>
          <pre className="text-base text-neutral-800 overflow-auto p-4 dark:text-neutral-400">
            {`Bugünkü Satış: 12.500 TL
Bekleyen Sipariş: 15
Yeni Üye: 8`}
          </pre>
        </div>
      </div>
      <div className={cn(cardVariants(), 'flex flex-col max-md:pb-0')}>
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          Akıllı Arama
        </h3>
        <p className="mb-6">Müşterileriniz aradıklarını saniyeler içinde bulsun.</p>
        <Link
          href="/docs/e-ticaret-paketleri/search"
          className={cn(buttonVariants({ className: 'w-fit mb-8' }))}
        >
          Detayları Gör
        </Link>
        <Search />
      </div>
      <div className={cn(cardVariants(), 'flex flex-col p-0 overflow-hidden')}>
        <div className="p-6 mb-2">
          <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
            E-ticaret Bileşenleri
          </h3>
          <p className="mb-6">
            Hazır bileşenlerle sitenizi dilediğiniz gibi özelleştirin.
          </p>
          <Link href="/docs/e-ticaret-paketleri/components" className={cn(buttonVariants({ className: 'w-fit' }))}>
            Bileşenleri İncele
          </Link>
        </div>
        <Image src={ShadcnImage} alt="shadcn" className="mt-auto flex-1 w-full object-cover" />
      </div>
    </>
  );
}

const searchItemVariants = cva('rounded-md p-2 text-sm text-fd-popover-foreground');

function Search() {
  return (
    <div className="flex select-none flex-col mt-auto bg-fd-popover rounded-xl border mask-[linear-gradient(to_bottom,white_40%,transparent_90%)] max-md:-mx-4">
      <div className="inline-flex items-center gap-2 px-4 py-3 text-sm text-fd-muted-foreground">
        <SearchIcon className="size-4" />
        Ürün ara...
      </div>
      <div className="border-t p-2">
        {[
          ['Erkek Ayakkabı', 'Spor ve Klasik modeller.'],
          ['Kadın Çanta', 'Deri, süet ve özel tasarım çantalar.'],
          ['Elektronik', 'Telefon, bilgisayar ve aksesuarlar.'],
          ['İndirimli Ürünler', '%50\'ye varan indirimler.'],
        ].map(([title, description], i) => (
          <div key={i} className={cn(searchItemVariants(), i === 0 && 'bg-fd-accent')}>
            <div className="flex flex-row items-center gap-2">
              <ShoppingBag className="size-4 text-fd-muted-foreground" />
              <p>{title}</p>
              {i === 7 && <p className="ms-auto text-xs text-fd-muted-foreground">Open</p>}
            </div>
            <p className="text-xs mt-2 text-fd-muted-foreground ps-6">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OpenSource() {
  return (
    <>
      <h2
        className={cn(
          headingVariants({
            variant: 'h2',
            className: 'mt-8 text-brand text-center mb-4 col-span-full',
          }),
        )}
      >
        Mutlu Müşteriler.
      </h2>

      <div className={cn(cardVariants({ className: 'flex flex-col' }))}>
        <Heart fill="currentColor" className="text-pink-500 mb-4" />
        <h3
          className={cn(
            headingVariants({
              variant: 'h3',
              className: 'mb-6',
            }),
          )}
        >
          Sizin Başarınız, Bizim Gururumuz.
        </h3>
        <p className="mb-8">Yüzlerce işletme işini büyütmek için bizi tercih etti.</p>
        <div className="mb-8 flex flex-row items-center gap-2">
        </div>
        <ContributorCounter repoOwner={owner} repoName={repo} />
      </div>
      <div
        className={cn(
          cardVariants({
            className: 'flex flex-col p-0 pt-8',
          }),
        )}
      >
        <h2 className="text-3xl text-center font-extrabold font-mono uppercase mb-4 lg:text-4xl">
          E-ticarete Başla
        </h2>
        <p className="text-center font-mono text-xs opacity-50 mb-8">
            Hayallerinizdeki mağazayı bugün açın.
        </p>
        <div className="h-[200px] mt-auto overflow-hidden p-8 bg-gradient-to-b from-brand-secondary/10">
          <div className="mx-auto bg-radial-[circle_at_0%_100%] from-60% from-transparent to-brand-secondary size-[500px] rounded-full" />
        </div>
      </div>

      <ul
        className={cn(
          cardVariants({
            className: 'flex flex-col gap-6 col-span-full',
          }),
        )}
      >
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <BatteryChargingIcon className="size-5" />
            Kesintisiz Hizmet.
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            %99.9 Uptime garantisi ile mağazanız 7/24 açık.
          </span>
        </li>
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <GlobeIcon className="size-5" />
            Global Satış.
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            Çoklu dil ve para birimi desteği ile dünyaya açılın.
          </span>
        </li>
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <TimerIcon className="size-5" />
            Anında Kurulum.
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            Dakikalar içinde mağazanızı aktif edin ve satışa başlayın.
          </span>
        </li>
        <li className="flex flex-row flex-wrap gap-2 mt-auto">
          <Link href="/docs" className={cn(buttonVariants())}>
            Paketleri İncele
          </Link>
        </li>
      </ul>
    </>
  );
}
