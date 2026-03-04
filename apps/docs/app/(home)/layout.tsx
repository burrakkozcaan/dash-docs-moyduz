import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions, linkItems } from '@/lib/layout.shared';
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar';
import Link from 'fumadocs-core/link';
import Image from 'next/image';
import Preview from '@/public/banner.png';
import { Scale, Calculator, ArrowRightLeft, Cpu, Wrench, BarChart2 } from 'lucide-react';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          type: 'menu',
          on: 'menu',
          text: 'Dokümantasyon',
          items: [
            {
              text: 'Karar Motoru',
              url: '/docs/karar-motoru',
              icon: <Scale />,
            },
            {
              text: 'Maliyet Analizi',
              url: '/docs/maliyet-analizi',
              icon: <Calculator />,
            },
            {
              text: 'Altyapı Taşıma',
              url: '/docs/altyapi-tasima',
              icon: <ArrowRightLeft />,
            },
            {
              text: 'Teknik Mimari',
              url: '/docs/teknik-mimari',
              icon: <Cpu />,
            },
            {
              text: 'Araçlar',
              url: '/docs/araclar',
              icon: <Wrench />,
            },
            {
              text: 'Karşılaştırmalar',
              url: '/docs/karsilastirmalar',
              icon: <BarChart2 />,
            },
          ],
        },
        {
          type: 'custom',
          on: 'nav',
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger>
                <Link href="/docs">Dokümantasyon</Link>
              </NavbarMenuTrigger>
              <NavbarMenuContent>
                <NavbarMenuLink href="/docs" className="md:row-span-3">
                  <div className="-mx-3 -mt-3">
                    <Image
                      src={Preview}
                      alt="Moyduz Docs"
                      className="rounded-t-lg object-cover"
                      style={{
                        maskImage: 'linear-gradient(to bottom,white 60%,transparent)',
                      }}
                    />
                  </div>
                  <p className="font-medium">Karar & Dönüşüm Motoru</p>
                  <p className="text-fd-muted-foreground text-sm">
                    E-ticaret altyapınız için doğru kararı verin.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink href="/docs/karar-motoru" className="lg:col-start-2">
                  <Scale className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md size-7" />
                  <p className="font-medium">Karar Motoru</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Kiralama mı, sahiplik mi? Doğru modeli seçin.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink href="/docs/maliyet-analizi" className="lg:col-start-2">
                  <Calculator className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md size-7" />
                  <p className="font-medium">Maliyet Analizi</p>
                  <p className="text-fd-muted-foreground text-sm">
                    3 yıllık gerçek maliyetinizi hesaplayın.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink href="/docs/altyapi-tasima" className="lg:col-start-2">
                  <ArrowRightLeft className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md size-7" />
                  <p className="font-medium">Altyapı Taşıma</p>
                  <p className="text-fd-muted-foreground text-sm">
                    SEO kaybetmeden geçiş rehberi.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink href="/docs/teknik-mimari" className="lg:col-start-3 lg:row-start-1">
                  <Cpu className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md size-7" />
                  <p className="font-medium">Teknik Mimari</p>
                  <p className="text-fd-muted-foreground text-sm">
                    AWS VPS, B2B ve enterprise altyapı.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink href="/docs/araclar" className="lg:col-start-3 lg:row-start-2">
                  <Wrench className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md size-7" />
                  <p className="font-medium">Araçlar</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Komisyon, kâr marjı ve maliyet hesaplayıcılar.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink href="/docs/karsilastirmalar" className="lg:col-start-3 lg:row-start-3">
                  <BarChart2 className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md size-7" />
                  <p className="font-medium">Karşılaştırmalar</p>
                  <p className="text-fd-muted-foreground text-sm">
                    İkas, IdeaSoft, Ticimax karşılaştırması.
                  </p>
                </NavbarMenuLink>
              </NavbarMenuContent>
            </NavbarMenu>
          ),
        },
        ...linkItems,
      ]}
      className="dark:bg-neutral-950 dark:[--color-fd-background:var(--color-neutral-950)] [--color-fd-primary:var(--color-brand)]"
    >
      {children}
    </HomeLayout>
  );
}
