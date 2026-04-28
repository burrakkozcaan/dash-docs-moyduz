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
import { Book, ComponentIcon, Pencil, PlusIcon } from 'lucide-react';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          type: 'menu',
          on: 'menu',
          text: 'Rehberler',
          items: [
            {
              text: 'Paketleri İncele',
              url: '/docs',
              icon: <Book />,
            },
            {
              text: 'Karar Motoru',
              url: '/docs/karar-motoru',
              icon: <ComponentIcon />,
            },
          ],
        },
        {
          type: 'custom',
          on: 'nav',
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger>
                <Link href="/docs">Rehberler</Link>
              </NavbarMenuTrigger>
              <NavbarMenuContent>
                <NavbarMenuLink href="/docs" className="md:row-span-2">
                  <div className="-mx-3 -mt-3">
                    <Image
                      src={Preview}
                      alt="Perview"
                      className="rounded-t-lg object-cover"
                      style={{
                        maskImage: 'linear-gradient(to bottom,white 60%,transparent)',
                      }}
                    />
                  </div>
                  <p className="font-medium">Paketleri İncele</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Moyduz ile e-ticaret sitenizi oluşturun.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink href="/docs/karar-motoru" className="lg:col-start-2">
                  <ComponentIcon className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Karar Motoru</p>
                  <p className="text-fd-muted-foreground text-sm">
                    İhtiyacınıza uygun altyapıyı adım adım seçin.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink href="/docs/rehber/b2b-e-ticaret-nedir" className="lg:col-start-2">
                  <Pencil className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">B2B E-Ticaret</p>
                  <p className="text-fd-muted-foreground text-sm">
                    B2B e-ticarete giriş ve temel kavramlar rehberi.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink href="/docs/karsilastirmalar" className="lg:col-start-3 lg:row-start-1">
                  <Pencil className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Karşılaştırmalar</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Moyduz ile popüler alternatifleri karşılaştırın.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="/docs/teknik-mimari"
                  className="lg:col-start-3 lg:row-start-2"
                >
                  <PlusIcon className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Teknik Mimari</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Kaynak kod, özgürlük ve altyapı kararlarını inceleyin.
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
