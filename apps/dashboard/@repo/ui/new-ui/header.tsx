'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { CommandMenuDemo } from './CommandMenuDemo';
import { 
  X, 
  LayoutTemplate, 
  Building2, 
  Library, 
  HelpCircle, 
  FileText, 
  CreditCard,
  Users,
  BookOpen,
  Briefcase,
  Smile,
  LifeBuoy,
  Mail,
  Settings,
  Rocket,
  Play,
  Activity,
  Lightbulb,
  Grid
} from 'lucide-react';
import * as Modal from '@/components/new-ui/modal';

const menuItems = [
  { name: 'Blocks', href: '/blocks' },
  { name: 'Templates', href: '/templates' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Docs', href: 'https://alignui.com/docs/v1.2/introduction' },
  { name: 'FAQ', href: '/faq' },
];

const cdn = (path: string, w: number, q: number) => `${path}`;

const DynamicThemeSwitch = dynamic(() => import('./theme-switch'), {
  ssr: false,
});

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="relative z-50 w-full flex-col items-center xl:container lg:flex xl:mx-auto lg:mt-6">
        <div className="relative z-20 flex w-full items-center justify-center gap-8 mac:justify-stretch">
          <div className="relative hidden h-px flex-1 bg-ln-gray-200 bleed-bg-l bleed-ln-gray-200 mac:block">
            <img src="https://alignui.com/images/landing/dot.png" width={9} height={9} alt="" className="absolute z-30 min-h-[9px] min-w-[9px] -top-1 -left-[37px]" />
            <img src="https://alignui.com/images/landing/dot.png" width={9} height={9} alt="" className="absolute z-30 min-h-[9px] min-w-[9px] -right-px -top-1" />
          </div>
          <header className="relative z-10 flex h-16 w-full items-center justify-between gap-4 bg-ln-gray-25 dark:bg-ln-gray-900 px-4 lg:h-auto lg:w-auto lg:justify-start lg:rounded-3xl lg:bg-ln-gray-0 dark:lg:bg-ln-gray-950 lg:p-[18px] lg:shadow-ln-xs dark:lg:shadow-none dark:lg:ring-1 dark:lg:ring-ln-gray-800">
            <div className="flex items-center gap-2.5 pr-3">
              <Link className="focus:outline-none" href="/">
                <div className="relative size-9">
                  <img src="/images/logo.svg" alt="" className="absolute -top-0.5 left-1/2 max-w-none -translate-x-1/2 object-contain" width={42} height={42} />
                </div>
              </Link>
              <div className="rounded-[5px] bg-ln-orange/[.12] px-1.5 py-1 text-ln-subheading-xs text-ln-orange shadow-ln-badge-orange">Keşfet</div>
            </div>
            <nav className="hidden items-center gap-2.5 lg:flex">
              <div className="group relative z-50">
                <button type="button" className="flex items-center text-ln-label-sm text-ln-gray-600 dark:text-ln-gray-400 transition duration-200 ease-linear group-hover:text-ln-gray-800 dark:group-hover:text-white">
                  Products
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-500 transition duration-200 ease-out group-hover:-rotate-180 group-hover:text-ln-orange">
                    <path fill="currentColor" fillRule="evenodd" d="M10.147 10.635a.21.21 0 0 1-.294 0L7.109 7.891a.625.625 0 0 0-.884.884l2.744 2.744c.57.57 1.493.57 2.062 0l2.744-2.744a.625.625 0 1 0-.884-.884z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute left-0 top-full pt-9 pointer-events-none -translate-y-3 opacity-0 transition duration-300 ease-nc group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex w-[380px] rounded-20 bg-ln-gray-0 dark:bg-ln-gray-900 shadow-ln-xs dark:shadow-xl dark:ring-1 dark:ring-ln-gray-800">
                    <div className="flex flex-1 flex-col gap-2 p-2">
                      <a className="group/link flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition ease-linear hover:bg-ln-gray-25 dark:hover:bg-ln-gray-800" href="https://alignui.com">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ln-gray-0 dark:bg-ln-gray-800 ring-1 ring-inset ring-ln-gray-100 dark:ring-ln-gray-700 transition ease-linear group-hover/link:shadow-ln-xs group-hover/link:ring-transparent">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-5 text-ln-gray-500 transition ease-linear group-hover/link:text-ln-orange">
                            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="m8.957 5.043 2.336-2.336a1 1 0 0 1 1.414 0l2.336 2.336a1 1 0 0 1 0 1.414l-2.336 2.336a1 1 0 0 1-1.414 0L8.957 6.457a1 1 0 0 1 0-1.414Zm0 12.5 2.336-2.336a1 1 0 0 1 1.414 0l2.336 2.336a1 1 0 0 1 0 1.414l-2.336 2.336a1 1 0 0 1-1.414 0l-2.336-2.336a1 1 0 0 1 0-1.414Zm-6.25-6.25 2.336-2.336a1 1 0 0 1 1.414 0l2.336 2.336a1 1 0 0 1 0 1.414l-2.336 2.336a1 1 0 0 1-1.414 0l-2.336-2.336a1 1 0 0 1 0-1.414Zm12.5 0 2.336-2.336a1 1 0 0 1 1.414 0l2.336 2.336a1 1 0 0 1 0 1.414l-2.336 2.336a1 1 0 0 1-1.414 0l-2.336-2.336a1 1 0 0 1 0-1.414Z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-ln-label-sm text-ln-gray-900 dark:text-white">Base Components</div>
                          <div className="mt-1 text-ln-paragraph-xs text-ln-gray-600 dark:text-ln-gray-400">40+ open-source components available</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-400">
                          <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                        </svg>
                      </a>
                      <a className="group/link flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition ease-linear hover:bg-ln-gray-25 dark:hover:bg-ln-gray-800" href="/">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ln-gray-0 dark:bg-ln-gray-800 ring-1 ring-inset ring-ln-gray-100 dark:ring-ln-gray-700 transition ease-linear group-hover/link:shadow-ln-xs group-hover/link:ring-transparent">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-500 transition ease-linear group-hover/link:text-ln-orange">
                            <path fill="currentColor" d="M2.917 14.375v-8.75h-1.25v8.75zm14.166-8.75v8.75h1.25v-8.75zm-1.041 9.792H3.958v1.25h12.084zM3.958 4.583h12.084v-1.25H3.958zm13.125 9.792c0 .575-.466 1.042-1.041 1.042v1.25a2.29 2.29 0 0 0 2.291-2.292zm1.25-8.75a2.29 2.29 0 0 0-2.291-2.292v1.25c.575 0 1.041.467 1.041 1.042zm-15.416 0c0-.575.466-1.042 1.041-1.042v-1.25a2.29 2.29 0 0 0-2.291 2.292zm-1.25 8.75a2.29 2.29 0 0 0 2.291 2.292v-1.25a1.04 1.04 0 0 1-1.041-1.042z" />
                            <path fill="currentColor" d="M9.375 16.042v.625h1.25v-.625zm1.25-12.084v-.625h-1.25v.625zm0 12.084V3.958h-1.25v12.084z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-ln-label-sm text-ln-gray-900 dark:text-white">Components & Blocks</div>
                          <div className="mt-1 text-ln-paragraph-xs text-ln-gray-600 dark:text-ln-gray-400">100+ ready-made components for speed</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-400">
                          <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                        </svg>
                      </a>
                      <a className="group/link flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition ease-linear hover:bg-ln-gray-25 dark:hover:bg-ln-gray-800" href="/templates">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ln-gray-0 dark:bg-ln-gray-800 ring-1 ring-inset ring-ln-gray-100 dark:ring-ln-gray-700 transition ease-linear group-hover/link:shadow-ln-xs group-hover/link:ring-transparent">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-500 transition ease-linear group-hover/link:text-ln-orange">
                            <path fill="currentColor" d="M16.25 5.792v8.416h1.25V5.792zM14.208 16.25H5.792v1.25h8.416zM3.75 14.208V5.792H2.5v8.416zM5.792 3.75h8.416V2.5H5.792zm0 12.5c-.477 0-.798 0-1.044-.02-.24-.02-.354-.055-.43-.093l-.567 1.113c.281.143.579.2.895.225.31.025.69.025 1.146.025zM2.5 14.208c0 .457 0 .837.025 1.146.026.317.082.614.225.895l1.114-.568c-.039-.075-.074-.19-.093-.429-.02-.247-.021-.567-.021-1.044zm1.819 1.929a1.04 1.04 0 0 1-.455-.456l-1.114.568c.22.43.57.782 1.001 1.001zm11.931-1.929c0 .477 0 .797-.02 1.044-.02.24-.055.354-.093.43l1.113.567c.143-.281.2-.578.225-.895.025-.31.025-.69.025-1.146zM14.208 17.5c.457 0 .837 0 1.146-.025.317-.026.614-.082.895-.225l-.568-1.113c-.075.038-.19.073-.429.092-.247.02-.567.021-1.044.021zm1.929-1.819c-.1.196-.26.356-.456.456l.568 1.113c.43-.22.782-.57 1.001-1.001zm1.363-9.89c0-.456 0-.836-.025-1.145-.026-.316-.082-.614-.225-.895l-1.113.568c.038.075.073.19.092.429.02.246.021.567.021 1.044h1.25ZM14.208 3.75c.477 0 .797 0 1.044.02.24.02.354.055.43.094l.567-1.114c-.281-.143-.578-.2-.895-.225-.31-.025-.69-.025-1.146-.025zm3.042.001a2.3 2.3 0 0 0-1-1.001l-.568 1.114c.196.1.356.259.456.455l1.113-.568Zm-13.5  2.04c0-.476 0-.797.02-1.043.02-.24.055-.354.094-.43L2.75 3.752c-.143.281-.2.579-.225.895-.025.31-.025.69-.025 1.146h1.25ZM5.792 2.5c-.457 0-.837 0-1.146.025-.316.026-.614.082-.895.225l.568 1.114c.075-.039.19-.074.429-.093.246-.02.567-.021 1.044-.021zM3.864 4.319c.1-.196.259-.356.455-.455L3.75 2.75c-.43.22-.782.57-1.001 1.001z" />
                            <path fill="currentColor" d="M8.75 3.125V2.5H7.5v.625zM7.5 16.875v.625h1.25v-.625zM8.75 10V3.125H7.5V10zM7.5 10v6.875h1.25V10z" />
                            <path stroke="currentColor" strokeWidth="1.25" d="M8.333 10h8.334" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-ln-label-sm text-ln-gray-900 dark:text-white">Sectoral Templates</div>
                          <div className="mt-1 text-ln-paragraph-xs text-ln-gray-600 dark:text-ln-gray-400">Designs for various sectoral needs</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-400">
                          <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                        </svg>
                      </a>
                      <a className="group/link flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition ease-linear hover:bg-ln-gray-25 dark:hover:bg-ln-gray-800" href="https://figma.alignui.com">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ln-gray-0 dark:bg-ln-gray-800 ring-1 ring-inset ring-ln-gray-100 dark:ring-ln-gray-700 transition ease-linear group-hover/link:shadow-ln-xs group-hover/link:ring-transparent">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-500 transition ease-linear group-hover/link:text-ln-orange">
                            <path stroke="currentColor" strokeWidth="1.25" d="M9.99 2H7.32a2.67 2.67 0 0 0-2.67 2.667 2.67 2.67 0 0 0 2.67 2.666M9.99 2v5.333M9.99 2h2.67a2.67 2.67 0 0 1 2.67 2.667 2.67 2.67 0 0 1-2.67 2.666m-2.67 0H7.32m2.67 0v5.334m0-5.334h2.67m-5.34 0A2.67 2.67 0 0 0 4.65 10a2.67 2.67 0 0 0 2.67 2.667m2.67 0H7.32m2.67 0v2.666A2.67 2.67 0 0 1 7.32 18a2.67 2.67 0 0 1-2.67-2.667 2.67 2.67 0 0 1 2.67-2.666m5.34-5.334A2.67 2.67 0 0 0 9.99 10a2.67 2.67 0 0 0 2.67 2.667A2.67 2.67 0 0 0 15.33 10a2.67 2.67 0 0 0-2.67-2.667Z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-ln-label-sm text-ln-gray-900 dark:text-white">Aligned with Figma</div>
                          <div className="mt-1 text-ln-paragraph-xs text-ln-gray-600 dark:text-ln-gray-400">Always-updated Figma file library</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-400">
                          <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5 whitespace-nowrap">
                <Link className="text-ln-label-sm text-ln-gray-600 dark:text-ln-gray-400 transition duration-200 ease-linear hover:text-ln-gray-800 dark:hover:text-white" href="/blocks">
                  Blocks
                </Link>
                <Link className="text-ln-label-sm text-ln-gray-600 dark:text-ln-gray-400 transition duration-200 ease-linear hover:text-ln-gray-800 dark:hover:text-white" href="/templates">
                  Templates
                </Link>
                <Link className="text-ln-label-sm text-ln-gray-600 dark:text-ln-gray-400 transition duration-200 ease-linear hover:text-ln-gray-800 dark:hover:text-white" href="/pricing">
                  Pricing
                </Link>
                <Link target="_blank" className="text-ln-label-sm text-ln-gray-600 dark:text-ln-gray-400 transition duration-200 ease-linear hover:text-ln-gray-800 dark:hover:text-white" href="https://alignui.com/docs/v1.2/introduction">
                  Docs
                </Link>
                <div className="group relative z-50">
                  <button type="button" className="flex items-center text-ln-label-sm text-ln-gray-600 dark:text-ln-gray-400 transition duration-200 ease-linear group-hover:text-ln-gray-800 dark:group-hover:text-white">
                    Resources
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-500 transition duration-200 ease-out group-hover:-rotate-180 group-hover:text-ln-orange">
                      <path fill="currentColor" fillRule="evenodd" d="M10.147 10.635a.21.21 0 0 1-.294 0L7.109 7.891a.625.625 0 0 0-.884.884l2.744 2.744c.57.57 1.493.57 2.062 0l2.744-2.744a.625.625 0 1 0-.884-.884z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="absolute left-0 top-full pt-9 pointer-events-none -translate-y-3 opacity-0 transition duration-300 ease-nc group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex w-[380px] rounded-20 bg-ln-gray-0 dark:bg-ln-gray-900 shadow-ln-xs dark:shadow-xl dark:ring-1 dark:ring-ln-gray-800">
                      <div className="flex flex-1 flex-col gap-2 p-2">
                        <a target="_blank" className="group/link flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition ease-linear hover:bg-ln-gray-25 dark:hover:bg-ln-gray-800" href="https://alignui.com/roadmap">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ln-gray-0 dark:bg-ln-gray-800 ring-1 ring-inset ring-ln-gray-100 dark:ring-ln-gray-700 transition ease-linear group-hover/link:shadow-ln-xs group-hover/link:ring-transparent">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-500 transition ease-linear group-hover/link:text-ln-orange">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M9.999 13.542v3.333m0-3.333h-4.97c-.541 0-1.05-.263-1.361-.706l-1.324-1.875a1.67 1.67 0 0 1 0-1.922l1.324-1.875c.312-.443.82-.706 1.361-.706h4.137c.46 0 .833.373.833.834zm.833-10.417h4.137c.541 0 1.049.263 1.361.706l1.324 1.875a1.67 1.67 0 0 1 0 1.922L16.33 9.503c-.312.442-.82.705-1.361.705h-4.137A.833.833 0 0 1 10 9.375V3.958c0-.46.373-.833.833-.833Z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-ln-label-sm text-ln-gray-900 dark:text-white">Roadmap</div>
                            <div className="mt-1 text-ln-paragraph-xs text-ln-gray-600 dark:text-ln-gray-400">Always-updated Figma file library.</div>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-400">
                            <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                          </svg>
                        </a>
                        <a className="group/link flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition ease-linear hover:bg-ln-gray-25 dark:hover:bg-ln-gray-800" href="/faq">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ln-gray-0 dark:bg-ln-gray-800 ring-1 ring-inset ring-ln-gray-100 dark:ring-ln-gray-700 transition ease-linear group-hover/link:shadow-ln-xs group-hover/link:ring-transparent">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-500 transition ease-linear group-hover/link:text-ln-orange">
                              <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.25" d="M10.018 9.928c.085-.564.4-.869.717-1.083.309-.21.618-.483.618-.989 0-.697-.56-1.262-1.25-1.262s-1.25.565-1.25 1.262m-1.108 7.547 1.721 1.443a.83.83 0 0 0 1.067.003l1.749-1.45a.83.83 0 0 1 .531-.19h2.395c.92 0 1.667-.747 1.667-1.667v-8.75c0-.92-.746-1.667-1.667-1.667H4.792c-.92 0-1.667.746-1.667 1.667v8.75c0 .92.746 1.666 1.667 1.666H7.21c.196 0 .385.07.535.195Z" />
                              <path fill="currentColor" stroke="currentColor" strokeWidth="0.417" d="M9.375 11.875a.625.625 0 1 0 1.25 0 .625.625 0 0 0-1.25 0Z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-ln-label-sm text-ln-gray-900 dark:text-white">FAQ's</div>
                            <div className="mt-1 text-ln-paragraph-xs text-ln-gray-600 dark:text-ln-gray-400">40+ open-source components available.</div>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-400">
                            <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                          </svg>
                        </a>
                        <a target="_blank" className="group/link flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition ease-linear hover:bg-ln-gray-25 dark:hover:bg-ln-gray-800" href="https://alignui.com/blog">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ln-gray-0 dark:bg-ln-gray-800 ring-1 ring-inset ring-ln-gray-100 dark:ring-ln-gray-700 transition ease-linear group-hover/link:shadow-ln-xs group-hover/link:ring-transparent">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-500 transition ease-linear group-hover/link:text-ln-orange">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M1.457 4.792h6.25m-6.25 3.333h3.75m12.572-2.314-1.092-1.09a1.667 1.667 0 0 0-2.357 0l-7.385 7.384a1.67 1.67 0 0 0-.488 1.179v2.758h2.758c.442 0 .866-.176 1.178-.489l7.386-7.385c.65-.65.65-1.706 0-2.357" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-ln-label-sm text-ln-gray-900 dark:text-white">Blog</div>
                            <div className="mt-1 text-ln-paragraph-xs text-ln-gray-600 dark:text-ln-gray-400">Always-updated Figma file library</div>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-400">
                            <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                          </svg>
                        </a>
                        <a target="_blank" className="group/link flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition ease-linear hover:bg-ln-gray-25 dark:hover:bg-ln-gray-800" href="https://alignui.com/about">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ln-gray-0 dark:bg-ln-gray-800 ring-1 ring-inset ring-ln-gray-100 dark:ring-ln-gray-700 transition ease-linear group-hover/link:shadow-ln-xs group-hover/link:ring-transparent">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-500 transition ease-linear group-hover/link:text-ln-orange">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M9.88 17.708c-.86-.217-2.633-.756-4.54-2.684C2.15 11.8 1.333 7.4 3.515 5.194c1.793-1.812 5.277-1.706 8.152.223m2.917 2.916c2.48 2.894 3.216 5.664 1.313 7.203-1.426 1.153-3.23-.18-4.283-1.208m-.623-3.286H8.96V9.024c0-.442.175-.866.488-1.179l4.582-4.582a1.667 1.667 0 0 1 2.358 0l.354.355c.65.65.65 1.704 0 2.355l-4.57 4.58a1.67 1.67 0 0 1-1.18.489Z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-ln-label-sm text-ln-gray-900 dark:text-white">About us</div>
                            <div className="mt-1 text-ln-paragraph-xs text-ln-gray-600 dark:text-ln-gray-400">Always-updated Figma file library</div>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-400">
                            <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="hidden size-5 shrink-0 text-ln-gray-300 lg:block">
              <path fill="currentColor" d="M10.003 11.108a1.183 1.183 0 0 1-1.176-1.176c0-.644.532-1.176 1.176-1.176s1.176.532 1.176 1.176-.532 1.176-1.176 1.176" />
            </svg>
            <div className="flex items-center gap-4 whitespace-nowrap lg:gap-2">
              <button 
                type="button" 
                aria-label="Search Menu" 
                className="flex size-6 items-center justify-center transition duration-200 ease-linear lg:size-9"
                onClick={() => setIsSearchOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" className="size-6 text-ln-gray-700 lg:size-5 lg:text-ln-gray-500 dark:text-ln-gray-400">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="m15.188 15.188-3.093-3.093m0 0a5.437 5.437 0 1 0-7.69-7.69 5.437 5.437 0 0 0 7.69 7.69" />
                </svg>
              </button>
              <div className="lg:hidden">
                <button 
                  type="button" 
                  aria-haspopup="dialog" 
                  aria-expanded={isMobileMenuOpen} 
                  className="flex size-6 items-center justify-center" 
                  aria-label="Open Menu"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-6 text-ln-gray-700 dark:text-white">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.75 12h18.5M2.75 5.75h18.5m-10.5 12.5h10.5" />
                  </svg>
                </button>
              </div>
              <Link href="/studio" className="hidden px-2.5 py-2 text-ln-label-sm text-ln-gray-800 dark:text-white transition duration-200 ease-linear hover:text-ln-gray-950 dark:hover:text-ln-gray-200 lg:block">
                Sign in
              </Link>
              <Link className="group relative items-center justify-center whitespace-nowrap transition duration-200 ease-out outline-none focus:outline-none disabled:pointer-events-none bg-ln-gray-0 dark:bg-white text-ln-gray-900 dark:text-ln-gray-950 shadow-ln-button-white hover:bg-ln-gray-50 hover:shadow-none disabled:opacity-50 h-9 gap-2.5 rounded-[11px] px-3.5 text-ln-label-sm hidden lg:flex" href="/pricing">
                Get all-access
              </Link>
            </div>
            <div className="hidden lg:block ml-2">
               <DynamicThemeSwitch />
            </div>
          </header>
          <div className="relative hidden h-px flex-1 bg-ln-gray-200 bleed-bg-r bleed-ln-gray-200 mac:block">
            <img src="https://alignui.com/images/landing/dot.png" width={9} height={9} alt="" className="absolute z-30 min-h-[9px] min-w-[9px] -top-1 -right-[37px] left-auto" />
            <img src="https://alignui.com/images/landing/dot.png" width={9} height={9} alt="" className="absolute z-30 min-h-[9px] min-w-[9px] -top-1 -left-px" />
          </div>
        </div>
        <Link target="_blank" className="relative z-30 block px-2 lg:z-10 lg:px-0" href="https://figma.alignui.com">
          <div className="flex h-9 items-center gap-1 rounded-[9px] border-ln-gray-200 bg-ln-gray-100 px-1.5 shadow-ln-badge-gray min-[380px]:gap-3 min-[380px]:px-3 lg:h-11 lg:gap-2 lg:rounded-b-[18px] lg:rounded-t-none lg:border-x lg:border-b lg:bg-ln-gray-50 lg:px-4 lg:shadow-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5">
              <path fill="#1ABCFE" fillRule="evenodd" d="M10 10a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0" clipRule="evenodd" />
              <path fill="#0ACF83" fillRule="evenodd" d="M5 15a2.5 2.5 0 0 1 2.5-2.5H10V15a2.5 2.5 0 0 1-5 0" clipRule="evenodd" />
              <path fill="#FF7262" fillRule="evenodd" d="M10 2.5v5h2.5a2.5 2.5 0 0 0 0-5z" clipRule="evenodd" />
              <path fill="#F24E1E" fillRule="evenodd" d="M5 5a2.5 2.5 0 0 0 2.5 2.5H10v-5H7.5A2.5 2.5 0 0 0 5 5" clipRule="evenodd" />
              <path fill="#A259FF" fillRule="evenodd" d="M5 10a2.5 2.5 0 0 0 2.5 2.5H10v-5H7.5A2.5 2.5 0 0 0 5 10" clipRule="evenodd" />
            </svg>
            <span className="hidden text-ln-label-sm text-ln-gray-600 lg:inline">Up-to-date Figma file synced with code library!</span>
            <span className="flex-1 text-ln-paragraph-sm text-ln-gray-600 lg:hidden">Up-to-date <span className="text-ln-label-sm text-ln-gray-800">Figma</span> file synced with code<span className="hidden md:inline"> library</span>!</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-600 lg:hidden">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M14.5 12.204V6m0 0H8.296M14.5 6l-8 8" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="-mx-1 hidden size-5 text-ln-gray-400 lg:block">
              <path fill="currentColor" d="M10.003 11.108a1.183 1.183 0 0 1-1.176-1.176c0-.644.532-1.176 1.176-1.176s1.176.532 1.176 1.176-.532 1.176-1.176 1.176" />
            </svg>
            <div className="hidden items-center gap-0.5 text-ln-label-sm text-ln-gray-900 lg:flex">
              Preview
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-500">
                <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Mobile Menu Dropdown************ */}
      <Modal.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <Modal.Content 
          className="lg:hidden h-[85vh] p-0 flex flex-col items-center w-full max-w-md overflow-hidden dark:bg-ln-gray-950"
          showClose={false}
        >
          <div className="flex w-full items-center px-6 py-4">
            <div className="flex-auto">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="outline-hidden transition text-ln-gray-900 duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7"
              >
                 <img src="/images/logo.svg" alt="AlignUI" className="w-[96px] h-[30px] object-contain" />
              </Link>
            </div>
            <div className="flex flex-auto justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-md p-1 text-ln-gray-500 transition ease-in-out hover:bg-ln-gray-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ln-gray-200"
                type="button"
                aria-label="Close menu"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex-1 w-full py-4 lg:hidden">
            <div className="relative w-full">
              {/* Main Menu */}
              <div
                className={`absolute top-0 left-0 min-h-full px-6 w-full ${
                  activeSubmenu ? "hidden" : ""
                }`}
              >
                <Link
                  href="/studio"
                  className="inline-flex items-center justify-center border select-none relative cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 bg-bg-weak-50 border-transparent text-text-strong-950 not-disabled:hover:bg-bg-soft-200 focus-visible:bg-bg-soft-200 focus-visible:ring-stroke-soft-200 focus-visible:ring-2 focus-visible:outline-hidden text-ln-label-sm h-10 px-4 rounded-xl gap-2 mb-4 w-full"
                >
                  Log In
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center border select-none relative cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 bg-bg-strong-950 border-transparent text-text-white-0 not-disabled:hover:bg-bg-surface-800 focus-visible:bg-bg-surface-800 focus-visible:ring-bg-surface-800 focus-visible:ring-2 focus-visible:outline-hidden text-ln-label-sm h-10 px-4 rounded-xl gap-2 mb-4 w-full"
                >
                  Get Started
                </Link>
                <button
                onClick={() => setActiveSubmenu("templates")}
                className="group flex items-center justify-between text-ln-label-sm w-full border-b border-stroke-soft-200 dark:border-ln-gray-800 py-4 text-text-strong-950 dark:text-white transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
              >
                <span className="flex items-center gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ln-gray-0 dark:bg-ln-gray-800 ring-1 ring-inset ring-ln-gray-100 dark:ring-ln-gray-700 transition ease-linear group-hover:shadow-ln-xs group-hover:ring-transparent">
                    <LayoutTemplate className="size-5 text-ln-gray-500 transition ease-linear group-hover:text-ln-orange" />
                  </div>
                  Templates
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-text-soft-400">
                  <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                </svg>
              </button>
              <button
                onClick={() => setActiveSubmenu("company")}
                className="group flex items-center justify-between text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
              >
                <span className="flex items-center gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ln-gray-0 dark:bg-ln-gray-800 ring-1 ring-inset ring-ln-gray-100 dark:ring-ln-gray-700 transition ease-linear group-hover:shadow-ln-xs group-hover:ring-transparent">
                    <Building2 className="size-5 text-ln-gray-500 transition ease-linear group-hover:text-ln-orange" />
                  </div>
                  Company
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-text-soft-400">
                  <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                </svg>
              </button>
              <button
                onClick={() => setActiveSubmenu("resources")}
                className="group flex items-center justify-between text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
              >
                <span className="flex items-center gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ln-gray-0 dark:bg-ln-gray-800 ring-1 ring-inset ring-ln-gray-100 dark:ring-ln-gray-700 transition ease-linear group-hover:shadow-ln-xs group-hover:ring-transparent">
                    <Library className="size-5 text-ln-gray-500 transition ease-linear group-hover:text-ln-orange" />
                  </div>
                  Resources
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-text-soft-400">
                  <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                </svg>
              </button>
              <button
                onClick={() => setActiveSubmenu("help")}
                className="group flex items-center justify-between text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
              >
                <span className="flex items-center gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ln-gray-0 dark:bg-ln-gray-800 ring-1 ring-inset ring-ln-gray-100 dark:ring-ln-gray-700 transition ease-linear group-hover:shadow-ln-xs group-hover:ring-transparent">
                    <HelpCircle className="size-5 text-ln-gray-500 transition ease-linear group-hover:text-ln-orange" />
                  </div>
                  Help
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-text-soft-400">
                  <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                </svg>
              </button>
              <button
                onClick={() => setActiveSubmenu("docs")}
                className="group flex items-center justify-between text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
              >
                <span className="flex items-center gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ln-gray-0 dark:bg-ln-gray-800 ring-1 ring-inset ring-ln-gray-100 dark:ring-ln-gray-700 transition ease-linear group-hover:shadow-ln-xs group-hover:ring-transparent">
                    <FileText className="size-5 text-ln-gray-500 transition ease-linear group-hover:text-ln-orange" />
                  </div>
                  Docs
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-text-soft-400">
                  <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                </svg>
              </button>
              <Link
                href="/pricing"
                className="group flex items-center justify-between text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ln-gray-0 dark:bg-ln-gray-800 ring-1 ring-inset ring-ln-gray-100 dark:ring-ln-gray-700 transition ease-linear group-hover:shadow-ln-xs group-hover:ring-transparent">
                    <CreditCard className="size-5 text-ln-gray-500 transition ease-linear group-hover:text-ln-orange" />
                  </div>
                  Pricing
                </span>
              </Link>
              </div>

              {/* Templates Submenu */}
              <div
                className={`absolute top-0 left-0 min-h-full px-6 w-full bg-bg-white-0 dark:bg-ln-gray-950 rounded-lg ${
                  activeSubmenu === "templates" ? "" : "hidden"
                }`}
              >
                <button
                  onClick={() => setActiveSubmenu(null)}
                  className="inline-flex items-center justify-center border disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 focus-visible:ring-2 focus-visible:outline-hidden h-8 w-8 min-w-8 rounded-xl bg-transparent border-none text-text-sub-600 not-disabled:hover:bg-bg-weak-50 focus-visible:bg-bg-weak-50 focus-visible:ring-stroke-soft-200 -ml-1"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 rotate-180">
                    <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                  </svg>
                </button>
                <div className="my-6">
                  <div className="flex gap-2 items-stretch h-32">
                    <Link
                      href="/templates"
                      className="w-1/2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-stroke-soft-200 group/nav-card relative h-full overflow-hidden rounded-xl bg-bg-weak-50 p-px">
                        <div className="h-full w-full rounded-[calc(0.75rem-2px)] bg-bg-weak-50 overflow-hidden relative flex items-end">
                          <span className="font-medium text-text-strong-950 group/nav-card:focus-visible:text-text-strong-950 text-ln-label-sm absolute top-0 pt-3 pl-3 flex flex-col gap-1">
                            <LayoutTemplate className="size-5 text-text-sub-600 mb-1" />
                            <span>
                              Template
                              <br />
                              Categories
                            </span>
                          </span>
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/templates"
                      className="w-1/2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-stroke-soft-200 group/nav-card relative h-full overflow-hidden rounded-xl bg-bg-weak-50 p-px">
                        <div className="h-full w-full rounded-[calc(0.75rem-2px)] bg-bg-weak-50 overflow-hidden relative flex items-end">
                          <span className="font-medium text-text-strong-950 group/nav-card:focus-visible:text-text-strong-950 text-ln-label-sm absolute top-0 pt-3 pl-3 flex flex-col gap-1">
                            <Grid className="size-5 text-text-sub-600 mb-1" />
                            <span>
                              All
                              <br />
                              Templates
                            </span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <Link
                  href="/services"
                  className="flex items-center gap-2 text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 font-medium text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Briefcase className="size-4 text-text-sub-600" />
                  Services
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 font-medium text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Lightbulb className="size-4 text-text-sub-600" />
                  Insights
                </Link>
                <Link
                  href="/pricing"
                  className="flex items-center gap-2 text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 font-medium text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <CreditCard className="size-4 text-text-sub-600" />
                  Pricing
                </Link>
              </div>

              {/* Company Submenu */}
              <div
                className={`absolute top-0 left-0 min-h-full px-6 w-full bg-bg-white-0 dark:bg-ln-gray-950 rounded-lg ${
                  activeSubmenu === "company" ? "" : "hidden"
                }`}
              >
                <button
                  onClick={() => setActiveSubmenu(null)}
                  className="inline-flex items-center justify-center border disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 focus-visible:ring-2 focus-visible:outline-hidden h-8 w-8 min-w-8 rounded-xl bg-transparent border-none text-text-sub-600 not-disabled:hover:bg-bg-weak-50 focus-visible:bg-bg-weak-50 focus-visible:ring-stroke-soft-200 -ml-1"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 rotate-180">
                    <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                  </svg>
                </button>
                <div className="my-6">
                  <div className="flex flex-col gap-2 items-stretch h-full">
                    <Link
                      href="/about"
                      className="h-1/2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-stroke-soft-200 group/nav-card relative h-full overflow-hidden rounded-xl bg-bg-weak-50 p-px">
                        <div className="relative h-full w-full rounded-[calc(0.75rem-2px)] bg-bg-weak-50 overflow-hidden">
                          <div className="relative flex gap-5 justify-start items-center px-3 h-full">
                            
                            <div className="flex flex-col gap-0.5">
                              <span className="flex items-center gap-2 font-medium text-text-strong-950 group/nav-card:focus-visible:text-text-strong-950 text-ln-label-sm">
                                <Users className="size-4 text-text-sub-600" />
                                About Us
                              </span>
                              <span className="text-xs text-text-sub-600 font-normal pl-6">
                                Learn about our company
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/stories"
                      className="h-1/2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-stroke-soft-200 group/nav-card relative h-full overflow-hidden rounded-xl bg-bg-weak-50 p-px">
                        <div className="relative h-full w-full rounded-[calc(0.75rem-2px)] bg-bg-weak-50 overflow-hidden">
                          <div className="relative flex gap-5 justify-start items-center px-3 h-full">
                            <div className="flex flex-col gap-0.5">
                              <span className="flex items-center gap-2 font-medium text-text-strong-950 group/nav-card:focus-visible:text-text-strong-950 text-ln-label-sm">
                                <BookOpen className="size-4 text-text-sub-600" />
                                Stories
                              </span>
                              <span className="text-xs text-text-sub-600 font-normal pl-6">
                                Customer success stories
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 font-medium text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileText className="size-4 text-text-sub-600" />
                  Blog
                </Link>
                <Link
                  href="/careers"
                  className="flex items-center gap-2 text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 font-medium text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Rocket className="size-4 text-text-sub-600" />
                  Careers
                </Link>
                <Link
                  href="/customers"
                  className="flex items-center gap-2 text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 font-medium text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Smile className="size-4 text-text-sub-600" />
                  Customers
                </Link>
              </div>

              {/* Resources Submenu */}
              <div
                className={`absolute top-0 left-0 min-h-full px-6 w-full bg-bg-white-0 dark:bg-ln-gray-950 rounded-lg ${
                  activeSubmenu === "resources" ? "" : "hidden"
                }`}
              >
                <button
                  onClick={() => setActiveSubmenu(null)}
                  className="inline-flex items-center justify-center border disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 focus-visible:ring-2 focus-visible:outline-hidden h-8 w-8 min-w-8 rounded-xl bg-transparent border-none text-text-sub-600 not-disabled:hover:bg-bg-weak-50 focus-visible:bg-bg-weak-50 focus-visible:ring-stroke-soft-200 -ml-1"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 rotate-180">
                    <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                  </svg>
                </button>
                <div className="my-6">
                  <Link
                    href="/blog"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-stroke-soft-200 group/nav-card relative h-full overflow-hidden rounded-xl bg-bg-weak-50 p-px">
                      <div className="h-full w-full rounded-[calc(0.75rem-2px)] bg-bg-weak-50 overflow-hidden relative flex items-end">
             
                        <span className="font-medium text-text-strong-950 group/nav-card:focus-visible:text-text-strong-950 text-ln-label-sm absolute top-0 pt-3 pl-3 flex flex-col gap-1">
                          <FileText className="size-5 text-text-sub-600 mb-1" />
                          <span>Blog</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <Link
                  href="/services"
                  className="flex items-center gap-2 text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 font-medium text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="size-4 text-text-sub-600" />
                  Service Hub
                </Link>
                <Link
                  href="/pricing"
                  className="flex items-center gap-2 text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 font-medium text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <CreditCard className="size-4 text-text-sub-600" />
                  Pricing
                </Link>
              </div>

              {/* Help Submenu */}
              <div
                className={`absolute top-0 left-0 min-h-full px-6 w-full bg-bg-white-0 dark:bg-ln-gray-950 rounded-lg ${
                  activeSubmenu === "help" ? "" : "hidden"
                }`}
              >
                <button
                  onClick={() => setActiveSubmenu(null)}
                  className="inline-flex items-center justify-center border disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 focus-visible:ring-2 focus-visible:outline-hidden h-8 w-8 min-w-8 rounded-xl bg-transparent border-none text-text-sub-600 not-disabled:hover:bg-bg-weak-50 focus-visible:bg-bg-weak-50 focus-visible:ring-stroke-soft-200 -ml-1"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 rotate-180">
                    <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                  </svg>
                </button>
                <div className="my-6">
                  <Link
                    href="/support"
                    className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-stroke-soft-200 group/nav-card relative h-full overflow-hidden rounded-xl bg-bg-weak-50 p-px">
                      <div className="h-full w-full rounded-[calc(0.75rem-2px)] bg-bg-weak-50 overflow-hidden relative flex items-end">
                        <span className="font-medium text-text-strong-950 group/nav-card:focus-visible:text-text-strong-950 text-ln-label-sm absolute top-0 pt-3 pl-3 flex flex-col gap-1">
                          <LifeBuoy className="size-5 text-text-sub-600 mb-1" />
                          <span>Support</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <Link
                  href="/support"
                  className="flex items-center gap-2 text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 font-medium text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LifeBuoy className="size-4 text-text-sub-600" />
                  Support
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 font-medium text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Mail className="size-4 text-text-sub-600" />
                  Contact
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 font-medium text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BookOpen className="size-4 text-text-sub-600" />
                  Guides
                </Link>
                <Link
                  href="https://status.moydus.com"
                  target="_blank"
                  className="flex items-center gap-2 text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 font-medium text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Activity className="size-4 text-text-sub-600" />
                  Status
                </Link>
              </div>

              {/* Docs Submenu */}
              <div
                className={`absolute top-0 left-0 min-h-full px-6 w-full bg-bg-white-0 dark:bg-ln-gray-950 rounded-lg ${
                  activeSubmenu === "docs" ? "" : "hidden"
                }`}
              >
                <button
                  onClick={() => setActiveSubmenu(null)}
                  className="inline-flex items-center justify-center border disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 focus-visible:ring-2 focus-visible:outline-hidden h-8 w-8 min-w-8 rounded-xl bg-transparent border-none text-text-sub-600 not-disabled:hover:bg-bg-weak-50 focus-visible:bg-bg-weak-50 focus-visible:ring-stroke-soft-200 -ml-1"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 rotate-180">
                    <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.25" d="M8.333 13.333 11.667 10 8.333 6.667" />
                  </svg>
                </button>
                <div className="my-6">
                  <Link
                    href="https://docs.moydus.com"
                    target="_blank"
                    className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-stroke-soft-200 group/nav-card relative h-full overflow-hidden rounded-xl bg-bg-weak-50 p-px">
                      <div className="h-full w-full rounded-[calc(0.75rem-2px)] bg-bg-weak-50 overflow-hidden relative flex items-end">
                        <div className="absolute top-0 pt-3 pl-3">
                          <span className="text-xs text-text-sub-600 font-normal block tracking-wide">
                            Docs
                          </span>
                          <span className="font-medium text-text-strong-950 group/nav-card:focus-visible:text-text-strong-950 text-ln-label-sm">
                            Complete documentation and guides
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <Link
                  href="https://docs.moydus.com"
                  target="_blank"
                  className="flex items-center gap-2 text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 font-medium text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileText className="size-4 text-text-sub-600" />
                  Documentation
                </Link>
                <Link
                  href="https://docs.moydus.com/docs/packages"
                  target="_blank"
                  className="flex items-center gap-2 text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 font-medium text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <HelpCircle className="size-4 text-text-sub-600" />
                  How to Choose a Package
                </Link>
                <Link
                  href="https://app.moydus.com"
                  target="_blank"
                  className="flex items-center gap-2 text-ln-label-sm w-full border-b border-stroke-soft-200 py-4 font-medium text-text-strong-950 transition duration-200 ease-in-out last:border-none hover:text-text-sub-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Play className="size-4 text-text-sub-600" />
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          </Modal.Content>
      </Modal.Root>

      {/* Search Modal */}
      {isSearchOpen && (
        <CommandMenuDemo 
          open={isSearchOpen} 
          setOpen={setIsSearchOpen} 
          className="fixed inset-0 z-[100] flex items-start justify-center pt-20" 
        />
      )}
    </>
  );
}
