import { AlbumIcon, Heart, LayoutTemplate, Instagram, Youtube } from 'lucide-react';
import type { BaseLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/shared';
import { MoyduzIcon } from '@/app/layout.client';

export const linkItems: LinkItemType[] = [
  // {
  //   icon: <AlbumIcon />,
  //   text: 'Blog',
  //   url: '/blog',
  //   active: 'nested-url',
  // },

  {
    type: 'icon',
    url: 'https://moyduz.com',
    label: 'moyduz',
    text: 'Moyduz',
    icon: <MoyduzIcon />,
    external: true,
  },
  {
    type: 'icon',
    url: 'https://www.instagram.com/moyduz',
    label: 'instagram',
    text: 'Instagram',
    icon: <Instagram />,
    external: true,
  },
  {
    type: 'icon',
    url: 'https://www.youtube.com/@moyduz',
    label: 'youtube',
    text: 'Youtube',
    icon: <Youtube />,
    external: true,
  },
];

export const logo = (
  <>
    <MoyduzIcon className="size-5 in-[.uwu]:hidden" />
  </>
);

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          {logo}
          <span className="font-medium in-[.uwu]:hidden">Moyduz</span>
        </>
      ),
    },
  };
}
