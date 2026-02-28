'use client';

import { useState } from 'react';

type TemplateId = 'ai' | 'hr' | 'finance' | 'marketing' | 'crypto';

interface TemplatePage {
  id: string;
  label: string;
  title: string;
  description: string;
  iconType: 'chat' | 'folder' | 'user' | 'calendar' | 'money' | 'chart' | 'settings' | 'megaphone' | 'cart';
  desktopImage: string;
  mobileImage: string;
}

interface Template {
  id: TemplateId;
  name: string;
  shortName?: string;
  icon: string;
  colorClass: string;
  shadowClass: string;
  activeColorClass: string;
  pages: TemplatePage[];
  isNew?: boolean;
  disabled?: boolean;
  comingSoon?: boolean;
  link: string;
}

/* ─── Icons ──────────────────────────────────────────────────────── */

function PageIcon({ type, className }: { type: TemplatePage['iconType']; className?: string }) {
  const cls = className || 'size-4';
  switch (type) {
    case 'chat':
      return (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' className={cls}>
          <path fill='currentColor' fillRule='evenodd' d='M1.334 6a4 4 0 0 1 4-4h5.333a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H2a.667.667 0 0 1-.667-.667zM6 6a.667.667 0 0 0 0 1.333h4A.667.667 0 1 0 10 6zm0 2.667A.667.667 0 1 0 6 10h2a.667.667 0 1 0 0-1.333z' clipRule='evenodd' />
        </svg>
      );
    case 'folder':
      return (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' className={cls}>
          <path fill='currentColor' fillRule='evenodd' d='M3.334 2a2 2 0 0 0-2 2v7.706c0 .899.728 1.627 1.627 1.627h9.106a2 2 0 0 0 1.862-1.403l1.104-3.532A1.334 1.334 0 0 0 14 6.688V6a2 2 0 0 0-2-2H8.357l-.74-1.11A2 2 0 0 0 5.953 2zm9.333 4.667V6A.667.667 0 0 0 12 5.333H8.357c-.446 0-.862-.222-1.11-.593l-.739-1.11a.67.67 0 0 0-.555-.297h-2.62A.667.667 0 0 0 2.668 4v7.706a.294.294 0 0 0 .574.088L4.405 8.07a2 2 0 0 1 1.909-1.403z' clipRule='evenodd' />
        </svg>
      );
    case 'user':
      return (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' className={cls}>
          <path fill='currentColor' fillRule='evenodd' d='M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334m2-8a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-2 6.667a5.32 5.32 0 0 1-3.81-1.601C5.08 10.67 6.404 10 8 10s2.922.67 3.81 1.733a5.32 5.32 0 0 1-3.81 1.6Z' clipRule='evenodd' />
        </svg>
      );
    case 'calendar':
      return (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' className={cls}>
          <path fill='currentColor' fillRule='evenodd' d='M5.333 1.333v1.334H3.333A1.333 1.333 0 0 0 2 4v9.333a1.333 1.333 0 0 0 1.333 1.334h9.334A1.333 1.333 0 0 0 14 13.333V4a1.333 1.333 0 0 0-1.333-1.333h-2V1.333h-1.334v1.334H6.667V1.333H5.333ZM3.333 6h9.334v7.333H3.333V6Z' clipRule='evenodd' />
        </svg>
      );
    case 'money':
      return (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' className={cls}>
          <path fill='currentColor' fillRule='evenodd' d='M8 1.333A6.667 6.667 0 1 0 8 14.667 6.667 6.667 0 0 0 8 1.333ZM8.667 4a.667.667 0 0 0-1.334 0v.333a2 2 0 0 0 .334 3.974l.666.111a.667.667 0 0 1-.11 1.249h-.89a.667.667 0 0 1-.625-.434.667.667 0 0 0-1.253.454 2 2 0 0 0 1.212 1.246V11.333a.667.667 0 0 0 1.334 0V11a2 2 0 0 0-.334-3.974l-.666-.111A.667.667 0 0 1 7.11 5.667h.89a.667.667 0 0 1 .625.433.667.667 0 1 0 1.252-.454A2 2 0 0 0 8.667 4.4V4Z' clipRule='evenodd' />
        </svg>
      );
    case 'chart':
      return (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' className={cls}>
          <path fill='currentColor' fillRule='evenodd' d='M1.333 2.667a.667.667 0 0 1 1.334 0v9.666h11.666a.667.667 0 1 1 0 1.334H2A.667.667 0 0 1 1.333 13V2.667Zm3.334 6a.667.667 0 0 1 .666.666V11a.667.667 0 1 1-1.333 0V9.333a.667.667 0 0 1 .667-.666Zm3.333-2a.667.667 0 0 0-1.333 0V11A.667.667 0 1 0 8 11V6.667Zm2.667-1.334a.667.667 0 0 1 .666.667v5a.667.667 0 1 1-1.333 0V6a.667.667 0 0 1 .667-.667Zm3.333-1.333a.667.667 0 0 0-1.333 0v7a.667.667 0 1 0 1.333 0V4Z' clipRule='evenodd' />
        </svg>
      );
    case 'settings':
      return (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' className={cls}>
          <path fill='currentColor' fillRule='evenodd' d='M7.334 1.333a1 1 0 0 0-.98.8l-.274 1.373a5.36 5.36 0 0 0-1.192.688l-1.331-.446a1 1 0 0 0-1.169.453L1.055 6.132a1 1 0 0 0 .19 1.253l1.057.927a5.4 5.4 0 0 0 0 1.376l-1.057.927a1 1 0 0 0-.19 1.253l1.333 2.308a1 1 0 0 0 1.169.453l1.33-.446c.364.28.764.512 1.193.688l.274 1.372a1 1 0 0 0 .98.801h2.666a1 1 0 0 0 .98-.8l.274-1.373a5.36 5.36 0 0 0 1.192-.688l1.331.446a1 1 0 0 0 1.169-.453l1.333-2.308a1 1 0 0 0-.19-1.253l-1.057-.927a5.4 5.4 0 0 0 0-1.376l1.057-.927a1 1 0 0 0 .19-1.253l-1.333-2.308a1 1 0 0 0-1.169-.453l-1.33.446a5.36 5.36 0 0 0-1.193-.688l-.274-1.372a1 1 0 0 0-.98-.801H7.334ZM8.667 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z' clipRule='evenodd' />
        </svg>
      );
    case 'megaphone':
      return (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' className={cls}>
          <path fill='currentColor' fillRule='evenodd' d='M12 2.026a.667.667 0 0 1 .667.667v10.614a.667.667 0 0 1-.943.607L7.63 11.588a.67.67 0 0 0-.297-.07H4.667a2 2 0 0 1-2-2V6.482a2 2 0 0 1 2-2h2.666a.67.67 0 0 0 .297-.07l4.094-2.326A.667.667 0 0 1 12 2.026ZM4.667 11.518h1.777l-.889 2.26a.667.667 0 0 0 1.242.487l1.178-2.996 3.359 1.908V2.823L7.975 4.731a2 2 0 0 1-.89.212H4.667a.667.667 0 0 0-.667.667v5.241a.667.667 0 0 0 .667.667Z' clipRule='evenodd' />
        </svg>
      );
    case 'cart':
      return (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' className={cls}>
          <path fill='currentColor' fillRule='evenodd' d='M1.333 2A.667.667 0 0 1 2 1.333h1.333a1 1 0 0 1 .976.783L4.59 3.333h8.743a1 1 0 0 1 .97 1.242l-1.067 4.267a1 1 0 0 1-.97.758H5.733L5.467 11h7.866a.667.667 0 1 1 0 1.333H5.333a1 1 0 0 1-.976-.783L3.067 5.333l-.29-1.333H2A.667.667 0 0 1 1.333 3.333V2ZM5.333 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z' clipRule='evenodd' />
        </svg>
      );
  }
}

/* ─── Template Data ──────────────────────────────────────────────── */

const templates: Template[] = [
  {
    id: 'ai',
    name: 'Yapay Zeka Şablonu',
    icon: '/images/landing/template-ai-icon.png',
    colorClass: 'template-ai',
    shadowClass: 'shadow-ln-special-light-ai',
    activeColorClass: 'text-template-ai',
    isNew: true,
    link: 'https://moyduz.com/marketplace/templates/ai-template',
    pages: [
      {
        id: 'chat',
        label: 'Chat',
        title: 'Chat Page',
        description: 'AI-powered real-time messaging for smart conversations and quick responses.',
        iconType: 'chat',
        desktopImage: '/images/landing/template-ai-chat-page.webp',
        mobileImage: '/images/landing/template-ai-chat-page-mobile.webp',
      },
      {
        id: 'analytics',
        label: 'Project',
        title: 'Analytics Page',
        description: 'A focused workspace to plan, manage, and track AI-driven projects.',
        iconType: 'folder',
        desktopImage: '/images/landing/template-ai-analytics-page.webp',
        mobileImage: '/images/landing/template-ai-analytics-page-mobile.webp',
      },
      {
        id: 'auth',
        label: 'Auth',
        title: 'Add Product',
        description: 'Secure and seamless authentication for AI-powered applications.',
        iconType: 'user',
        desktopImage: '/images/landing/template-ai-add-product.webp',
        mobileImage: '/images/landing/template-ai-add-product-mobile.webp',
      },
    ],
  },
  {
    id: 'hr',
    name: 'İnsan Kaynakları Yönetimi',
    icon: '/images/landing/template-hr-icon.png',
    colorClass: 'template-hr',
    shadowClass: 'shadow-ln-special-light-hr',
    activeColorClass: 'text-template-hr',
    link: 'https://pro.alignui.com/templates/hr-management',
    pages: [
      {
        id: 'overview',
        label: 'Overview',
        title: 'Overview',
        description: 'Manage your workforce with a centralized HR dashboard.',
        iconType: 'folder',
        desktopImage: '/images/landing/template-hr-overview.webp',
        mobileImage: '/images/landing/template-hr-overview-mobile.webp',
      },
      {
        id: 'calendar',
        label: 'Calendar',
        title: 'Calendar',
        description: 'Track schedules, leaves, and important dates at a glance.',
        iconType: 'calendar',
        desktopImage: '/images/landing/template-hr-calendar.webp',
        mobileImage: '/images/landing/template-hr-calendar-mobile.webp',
      },
      {
        id: 'settings',
        label: 'Settings',
        title: 'Settings',
        description: 'Configure your HR workspace preferences and policies.',
        iconType: 'settings',
        desktopImage: '/images/landing/template-hr-settings.webp',
        mobileImage: '/images/landing/template-hr-settings-mobile.webp',
      },
    ],
  },
  {
    id: 'finance',
    name: 'Finans ve Bankacılık',
    icon: '/images/landing/template-finance-icon.png',
    colorClass: 'template-finance',
    shadowClass: 'shadow-ln-special-light-finance',
    activeColorClass: 'text-template-finance',
    link: 'https://pro.alignui.com/templates/finance-banking',
    pages: [
      {
        id: 'overview',
        label: 'Overview',
        title: 'Overview',
        description: 'Track your finances with a comprehensive banking dashboard.',
        iconType: 'chart',
        desktopImage: '/images/landing/template-finance-overview.webp',
        mobileImage: '/images/landing/template-finance-overview-mobile.webp',
      },
      {
        id: 'send-money',
        label: 'Send Money',
        title: 'Send Money',
        description: 'Send and receive payments quickly and securely.',
        iconType: 'money',
        desktopImage: '/images/landing/template-finance-send-money.webp',
        mobileImage: '/images/landing/template-finance-send-money-mobile.webp',
      },
      {
        id: 'settings',
        label: 'Settings',
        title: 'Settings',
        description: 'Manage your account settings and security preferences.',
        iconType: 'settings',
        desktopImage: '/images/landing/template-finance-settings.webp',
        mobileImage: '/images/landing/template-finance-settings-mobile.webp',
      },
    ],
  },
  {
    id: 'marketing',
    name: 'Pazarlama ve Satış',
    icon: '/images/landing/template-marketing-icon.png',
    colorClass: 'template-marketing',
    shadowClass: 'shadow-ln-special-light-marketing',
    activeColorClass: 'text-template-marketing',
    link: 'https://pro.alignui.com/templates/marketing-sales',
    pages: [
      {
        id: 'overview',
        label: 'Overview',
        title: 'Overview',
        description: 'Monitor your marketing campaigns and sales performance.',
        iconType: 'megaphone',
        desktopImage: '/images/landing/template-marketing-overview.webp',
        mobileImage: '/images/landing/template-marketing-overview-mobile.webp',
      },
      {
        id: 'analytics',
        label: 'Analytics',
        title: 'Analytics',
        description: 'Deep dive into your marketing metrics and insights.',
        iconType: 'chart',
        desktopImage: '/images/landing/template-marketing-analytics.webp',
        mobileImage: '/images/landing/template-marketing-analytics-mobile.webp',
      },
      {
        id: 'add-product',
        label: 'Add Product',
        title: 'Add Product',
        description: 'Create and manage products for your sales pipeline.',
        iconType: 'cart',
        desktopImage: '/images/landing/template-marketing-add-product.webp',
        mobileImage: '/images/landing/template-marketing-add-product-mobile.webp',
      },
    ],
  },
  {
    id: 'crypto',
    name: 'Kripto Para',
    icon: '/images/landing/template-crypto-icon.png',
    colorClass: 'template-crypto',
    shadowClass: 'shadow-ln-special-light-crypto',
    activeColorClass: 'text-template-crypto',
    disabled: true,
    comingSoon: true,
    link: '#',
    pages: [],
  },
];

const bgLevels = ['bg-ln-gray-100', 'bg-ln-gray-50', 'bg-ln-gray-25'] as const;

/* ─── Shared Sub-components ──────────────────────────────────────── */

function ProgressiveBlur() {
  return (
    <div className='pointer-events-none isolate h-80 w-full absolute bottom-0 left-0'>
      <div
        className='absolute inset-0'
        style={{ background: 'linear-gradient(rgba(247, 247, 247, 0), rgb(247, 247, 247) 72%)' }}
      />
      {Array.from({ length: 11 }, (_, i) => (
        <div
          key={i}
          className='progressive-blur-mask absolute bottom-0 z-10'
          style={{ '--blur': 11 - i, transform: `translate3d(0px, ${16 - i * 16}px, 0px)` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */

export default function SectorTemplates() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('ai');
  const [activePageIdx, setActivePageIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const currentTemplate = templates.find((t) => t.id === activeTemplate)!;
  const currentPage = currentTemplate.pages[activePageIdx];

  const handleTemplateChange = (id: TemplateId) => {
    if (id === activeTemplate) return;
    setActiveTemplate(id);
    setActivePageIdx(0);
    setAnimKey((k) => k + 1);
  };

  const handlePageChange = (idx: number) => {
    setActivePageIdx(idx);
    setAnimKey((k) => k + 1);
  };

  return (
    <div className='container mt-16 md:mt-0'>
      <div>
        {/* ─── Header ─── */}
        <div className='flex flex-col items-start md:items-center'>
          <div className='flex h-7 items-center gap-1.5 rounded-[9px] bg-ln-gray-0 pl-1.5 pr-2.5 text-ln-label-sm text-ln-gray-700 shadow-ln-subheading xl:h-8 xl:pl-2 xl:pr-3'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 21 20' className='size-[18px] text-ln-gray-400'>
              <path fill='currentColor' d='M16.75 5.792v8.416H18V5.792zM14.708 16.25H6.292v1.25h8.416zM4.25 14.208V5.792H3v8.416zM6.292 3.75h8.416V2.5H6.292zm0 12.5c-.477 0-.798 0-1.044-.02-.24-.02-.354-.055-.43-.093l-.567 1.113c.281.143.579.2.895.225.31.025.69.025 1.146.025zM3 14.208c0 .457 0 .837.025 1.146.026.317.082.614.225.895l1.114-.568c-.039-.075-.074-.19-.093-.429-.02-.247-.021-.567-.021-1.044zm1.819 1.929a1.04 1.04 0 0 1-.455-.456l-1.114.568c.22.43.57.782 1.001 1.001zm11.931-1.929c0 .477 0 .797-.02 1.044-.02.24-.055.354-.093.43l1.113.567c.143-.281.2-.578.225-.895.025-.31.025-.69.025-1.146zM14.708 17.5c.457 0 .837 0 1.146-.025.317-.026.614-.082.895-.225l-.568-1.113c-.075.038-.19.073-.429.092-.247.02-.567.021-1.044.021zm1.929-1.819c-.1.196-.26.356-.456.456l.568 1.113c.43-.22.782-.57 1.001-1.001zM18 5.791c0-.456 0-.836-.025-1.145-.026-.316-.082-.614-.225-.895l-1.113.568c.038.075.073.19.092.429.02.246.021.567.021 1.044H18ZM14.708 3.75c.477 0 .797 0 1.044.02.24.02.354.055.43.094l.567-1.114c-.281-.143-.578-.2-.895-.225-.31-.025-.69-.025-1.146-.025zm3.042.001a2.3 2.3 0 0 0-1-1.001l-.568 1.114c.196.1.356.259.456.455zm-13.5 2.04c0-.476 0-.797.02-1.043.02-.24.055-.354.094-.43L3.25 3.752c-.143.281-.2.579-.225.895C3 4.956 3 5.336 3 5.792zM6.292 2.5c-.457 0-.837 0-1.146.025-.316.026-.614.082-.895.225l.568 1.114c.075-.039.19-.074.429-.093.246-.02.567-.021 1.044-.021zM4.364 4.319c.1-.196.259-.356.455-.455L4.25 2.75c-.43.22-.782.57-1.001 1.001z' />
              <path fill='currentColor' d='M9.25 3.125V2.5H8v.625zM8 16.875v.625h1.25v-.625zM9.25 10V3.125H8V10zM8 10v6.875h1.25V10z' />
              <path stroke='currentColor' strokeWidth='1.25' d='M8.833 10h8.334' />
            </svg>
            Sector-specific Templates
            <div className='rounded-[5px] bg-ln-orange/[.12] px-[5px] py-[3px] text-ln-subheading-xs text-ln-orange shadow-ln-badge-orange'>
              PRO
            </div>
          </div>

          <h4 className='mt-4 text-pretty text-[28px]/[36px] font-[550] -tracking-[0.02em] text-ln-gray-900 md:text-center xl:text-[48px]/[56px] xl:-tracking-[0.028em]'>
            Ready-made multi-page <br /> user flows for apps
          </h4>
        </div>

        {/* ─── Mobile template selector ─── */}
        <div className='-mx-4 xl:hidden'>
          <div className='mx-auto mt-8 flex w-full max-w-md items-center justify-between rounded-full bg-ln-gray-50 p-1 shadow-ln-badge-gray'>
            {templates.map((template, idx) => {
              const isActive = activeTemplate === template.id;
              return (
                <div key={template.id} className='contents'>
                  {idx > 0 && (
                    <div
                      className='h-6 w-px bg-ln-gray-300'
                      style={{
                        opacity: isActive || activeTemplate === templates[idx - 1]?.id ? 0 : 1,
                        transform: 'none',
                        transformOrigin: '50% 50% 0px',
                      }}
                    />
                  )}
                  <button
                    type='button'
                    disabled={template.disabled}
                    onClick={() => !template.disabled && handleTemplateChange(template.id)}
                    className={`relative isolate flex h-9 min-w-9 items-center rounded-full px-2 ${
                      isActive ? 'bg-ln-gray-0 shadow-ln-toggle-active' : ''
                    } ${template.disabled ? 'opacity-50 mix-blend-luminosity' : ''}`}
                    style={!isActive ? { transform: 'none', transformOrigin: '50% 50% 0px' } : undefined}
                  >
                    <div className={`size-5 shrink-0 overflow-hidden rounded-full bg-${template.colorClass} ${template.shadowClass}`}>
                      <img src={template.icon} width={20} height={20} alt='' />
                    </div>
                    {isActive && (
                      <div className='overflow-hidden' style={{ opacity: 1, width: 'auto' }}>
                        <div className='flex items-center gap-1 whitespace-nowrap px-1.5 text-ln-label-sm text-ln-gray-800 min-[390px]:gap-2 min-[390px]:pl-2.5 min-[390px]:pr-[7px] min-[390px]:text-ln-label-md'>
                          <span>{template.shortName || template.name}</span>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Desktop template selector ─── */}
        <div className='mx-auto mt-12 hidden w-full max-w-3xl flex-wrap justify-center gap-4 xl:flex'>
          {templates.map((template) => {
            const isActive = activeTemplate === template.id;
            return (
              <button
                key={template.id}
                type='button'
                disabled={template.disabled}
                onClick={() => !template.disabled && handleTemplateChange(template.id)}
                className={`flex h-12 items-center gap-3 rounded-[15px] px-3 transition duration-200 ease-nc ${
                  isActive ? 'bg-ln-gray-100' : 'bg-ln-gray-25 ring-1 ring-ln-gray-100'
                }`}
                style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}
              >
                <div className={`size-6 overflow-hidden rounded-[7px] bg-${template.colorClass} ${template.shadowClass}`}>
                  <img src={template.icon} width={24} height={24} alt='' />
                </div>
                <span className='pr-1 text-ln-label-md text-ln-gray-800'>{template.name}</span>
                {template.isNew && (
                  <div className='flex h-5 items-center rounded-full bg-[#12A557]/[.12] px-1.5 text-ln-subheading-xs text-[#12A557] -ml-2.5'>
                    YENİ
                  </div>
                )}
                {template.comingSoon && (
                  <div className='flex h-5 items-center rounded-full bg-ln-gray-100 px-1.5 text-ln-subheading-xs text-ln-gray-500 -ml-2.5'>
                    YAKINDA
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* ─── Mobile content ─── */}
        {currentTemplate.pages.length > 0 && (
          <div className='relative -mx-4 mt-4 md:mt-8 xl:hidden'>
            <div className='rounded-20 bg-ln-gray-50 shadow-ln-badge-gray'>
              <div className='px-4' style={{ opacity: 1, filter: 'blur(0px)' }}>
                {/* Inner page tabs */}
                <div className='flex items-center gap-3.5 whitespace-nowrap border-b border-ln-gray-200'>
                  {currentTemplate.pages.map((page, idx) => {
                    const isPageActive = activePageIdx === idx;
                    return (
                      <div key={page.id} className='contents'>
                        {idx > 0 && <div className='h-5 w-px bg-ln-gray-200' />}
                        <button
                          type='button'
                          onClick={() => handlePageChange(idx)}
                          className={`group relative flex min-w-0 flex-1 items-center justify-center gap-1.5 px-1 py-4 text-ln-label-sm transition duration-200 ease-out before:transition before:duration-200 before:ease-out before:absolute before:inset-x-0 before:-bottom-px before:h-px before:bg-${currentTemplate.colorClass} ${
                            isPageActive ? 'text-ln-gray-800 before:opacity-100' : 'text-ln-gray-600 before:opacity-0'
                          }`}
                        >
                          <PageIcon
                            type={page.iconType}
                            className={`size-[18px] shrink-0 transition duration-200 ease-out ${isPageActive ? currentTemplate.activeColorClass : 'text-ln-gray-400'}`}
                          />
                          {page.label}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Page content */}
                <div className='mt-6 pb-2'>
                  {currentPage && (
                    <div key={`${activeTemplate}-${activePageIdx}`} style={{ opacity: 1, transform: 'none' }}>
                      <p className='mx-auto w-72 text-pretty text-center text-ln-paragraph-sm text-ln-gray-600'>
                        {currentPage.description}
                      </p>
                      <div
                        className='relative mx-auto mt-[22px] h-[447px] w-[278px] overflow-hidden rounded-2xl'
                        style={{
                          boxShadow:
                            'rgba(41, 41, 41, 0.04) 0px 1px 1px 0.5px, rgba(41, 41, 41, 0.02) 0px 3px 3px -1.5px, rgba(41, 41, 41, 0.04) 0px 6px 6px -3px, rgba(41, 41, 41, 0.04) 0px 12px 12px -6px, rgba(41, 41, 41, 0.04) 0px 24px 24px -12px, rgba(41, 41, 41, 0.04) 0px 48px 48px -24px, rgba(51, 51, 51, 0.06) 0px -1px 1px -0.5px inset',
                        }}
                      >
                        <img
                          src={currentPage.mobileImage}
                          loading='lazy'
                          width={278}
                          height={601}
                          alt=''
                          className='absolute left-0 top-0 h-auto w-full object-contain'
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <ProgressiveBlur />

            <div style={{ opacity: 1, filter: 'blur(0px)', transform: 'none' }}>
              <a
                className='group inline-flex items-center justify-center whitespace-nowrap transition duration-200 ease-out outline-none focus:outline-none disabled:pointer-events-none bg-ln-gray-900 text-ln-gray-0 shadow-ln-button-gray hover:bg-ln-gray-800 disabled:bg-ln-gray-25 disabled:text-ln-gray-450 disabled:shadow-none h-11 gap-3.5 rounded-[13px] px-[18px] text-ln-label-sm absolute bottom-10 left-1/2 -translate-x-1/2'
                href={currentTemplate.link}
              >
                <span className='flex items-center gap-1'>
                  <span>Explore Template </span>
                  <span className='text-ln-paragraph-sm text-ln-gray-0/[.32]'>-</span>
                  <span className='relative text-ln-gray-0/[.72]'>
                    <div style={{ opacity: 1, transform: 'none' }}>{currentTemplate.name}</div>
                  </span>
                </span>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='-mx-1.5 size-5 shrink-0 text-ln-gray-0/[.72]'>
                  <path stroke='currentColor' strokeLinecap='square' strokeWidth='1.25' d='M8.333 13.333 11.667 10 8.333 6.667' />
                </svg>
              </a>
            </div>
          </div>
        )}

        {/* ─── Desktop content ─── */}
        {currentTemplate.pages.length > 0 && (
          <div className='relative hidden overflow-hidden xl:block'>
            <div key={animKey} className='relative overflow-hidden pt-36 template-container-enter'>
              <div
                className='grid justify-items-center'
                style={{ transformStyle: 'preserve-3d', perspective: '10000px', aspectRatio: '1.64571 / 1' }}
              >
                {currentTemplate.pages.map((page, idx) => {
                  const widthPercent = 100 - idx * 12.5;
                  const translateY = -(idx * 48);
                  return (
                    <div
                      key={page.id}
                      className='origin-top [grid-area:1/1]'
                      style={{
                        width: `${widthPercent}%`,
                        transform: idx === 0 ? 'none' : `translateY(${translateY}px) translateZ(-${idx}px)`,
                      }}
                    >
                      <div
                        className={`w-full origin-top select-none overflow-hidden rounded-t-3xl ring-1 ring-inset ring-ln-gray-200 transition duration-300 ease-out cursor-pointer template-frame-enter ${bgLevels[idx]}`}
                        style={{ '--i': idx, backfaceVisibility: 'hidden', aspectRatio: '1.64571 / 1' } as React.CSSProperties}
                      >
                        <div className='flex items-center justify-between px-4 py-3'>
                          <div className='flex items-center gap-2.5'>
                            <div className='flex size-6 items-center justify-center rounded-[7px] bg-ln-gray-0 shadow-ln-button-white'>
                              <PageIcon
                                type={page.iconType}
                                className={`size-4 transition duration-300 ease-out ${idx === 0 ? currentTemplate.activeColorClass : 'text-ln-gray-400'}`}
                              />
                            </div>
                            <div className={`text-ln-label-md ${idx === 0 ? 'text-ln-gray-800' : 'text-ln-gray-600'}`}>
                              {page.title}
                            </div>
                            <div className='text-ln-label-sm text-ln-gray-300'>&middot;</div>
                            <div className='text-ln-paragraph-sm text-ln-gray-600'>{page.description}</div>
                          </div>
                          <div className='flex gap-3'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' className='size-5 text-ln-gray-400'>
                              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.25' d='M9 2.813v8.437m0-8.438 3.375 3.376M9 2.813 5.625 6.187m9.563 3.375v4.126a1.5 1.5 0 0 1-1.5 1.5H4.312a1.5 1.5 0 0 1-1.5-1.5V9.561' />
                            </svg>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='size-5 text-ln-gray-400'>
                              <path stroke='currentColor' strokeLinecap='round' strokeWidth='1.5' d='M10 5.625V10m0 0v4.375M10 10H5.625M10 10h4.375' />
                            </svg>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='size-5 text-ln-gray-400'>
                              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.25' d='M12.708 7.292V3.333c0-.575-.466-1.042-1.041-1.042H3.333c-.575 0-1.041.467-1.041 1.042v8.334a1.04 1.04 0 0 0 1.041 1.041h3.959m1.041-5.417h8.334c.575 0 1.041.467 1.041 1.042v8.333c0 .576-.466 1.042-1.041 1.042H8.333a1.04 1.04 0 0 1-1.041-1.041V8.332c0-.575.466-1.042 1.041-1.042Z' />
                            </svg>
                          </div>
                        </div>
                        <div className='px-3'>
                          <img src={page.desktopImage} alt='' className='w-full rounded-20 shadow-ln-xs' />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <ProgressiveBlur />

            <div style={{ opacity: 1, filter: 'blur(0px)', transform: 'none' }}>
              <a
                className='group inline-flex items-center justify-center whitespace-nowrap transition duration-200 ease-out outline-none focus:outline-none disabled:pointer-events-none bg-ln-gray-900 text-ln-gray-0 shadow-ln-button-gray hover:bg-ln-gray-800 disabled:bg-ln-gray-25 disabled:text-ln-gray-450 disabled:shadow-none h-11 gap-3.5 rounded-[13px] px-[18px] text-ln-label-sm absolute bottom-8 left-1/2 -translate-x-1/2'
                href={currentTemplate.link}
              >
                <span className='flex items-center gap-1'>
                  <span>Explore Template </span>
                  <span className='text-ln-paragraph-sm text-ln-gray-0/[.32]'>-</span>
                  <span className='relative text-ln-gray-0/[.72]'>
                    <div style={{ opacity: 1, transform: 'none' }}>{currentTemplate.name}</div>
                  </span>
                </span>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className='-mx-1.5 size-5 shrink-0 text-ln-gray-0/[.72]'>
                  <path stroke='currentColor' strokeLinecap='square' strokeWidth='1.25' d='M8.333 13.333 11.667 10 8.333 6.667' />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
