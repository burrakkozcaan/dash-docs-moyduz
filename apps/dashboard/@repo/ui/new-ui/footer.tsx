'use client';

import Link from 'next/link';
import * as Button from './ui/button';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/utils/cn';
import FlickeringFooter from './flickering-footer';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
] as const;

const solutionLinks = [
  {
    label: 'Appointment management system',
    href: '/solutions/appointment-management-system',
  },
  {
    label: 'Clinic management system',
    href: '/solutions/clinic-management-system',
  },
  {
    label: 'Employee management system',
    href: '/solutions/employee-management-system',
  },
  {
    label: 'Scholarship management system',
    href: '/solutions/scholarship-management-system',
  },
] as const;

const socialLinks = [
  { label: 'Twitter', href: 'https://x.com/kreativnik_' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
] as const;

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Responsible Disclosure', href: '/responsible-disclosure' },
  { label: 'Terms Of Service', href: '/terms-of-service' },
  { label: 'Security', href: '/security' },
] as const;

export default function Footer() {
  return (
    <div className='mt-10 overflow-hidden border-t border-ln-gray-200 xl:mt-[108px]'>
      <footer className='container relative flex-col gap-12 overflow-hidden xl:flex xl:pt-[68px]'>
        <div className='mx-auto flex w-full flex-col gap-10 py-12 md:py-16'>
          {/* Top grid */}
          <div className='col-span-2 mb-8 lg:mb-0'>
            <div className='flex items-center gap-2 lg:justify-start'>
              <Link
                href='/'
                className='flex max-h-8 items-center gap-3 focus:outline-none'
              >
                <div className='relative size-9'>
                  <img
                    src='/images/logo.svg'
                    alt='Moydus Logo'
                    className='absolute -top-0.5 left-1/2 max-w-none -translate-x-1/2 object-contain'
                    width={42}
                    height={42}
                  />
                </div>
              </Link>
              <span className='text-ln-title-h6 font-bold text-ln-gray-900 dark:text-ln-gray-0'>
                {/* Moydus */}
              </span>
            </div>
            <div className='font-550 mt-4 max-w-lg text-[28px]/[36px] -tracking-[0.02em] text-ln-gray-900 dark:text-white'>
              We are everywhere, including{' '}
              <span className='text-ln-gray-500 dark:text-ln-gray-400'>
                your city
              </span>{' '}
              - Growth playbooks, technical delivery, and analytics built for
              operators.
            </div>
            <div className='mb-4 mt-4 space-y-7 sm:mb-0'>
              <div>
                <p className='mb-2 text-ln-paragraph-sm text-ln-gray-600 dark:text-ln-gray-400'>
                  <strong className='text-ln-gray-900 dark:text-ln-gray-100'>
                    Office Address:
                  </strong>
                  <br />
                  {/* Moyduz HQ */}
                  <br />
                  Istanbul, Turkey
                </p>
                <a
                  href=''
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1 text-ln-label-sm text-ln-orange transition-colors hover:text-ln-orange/80'
                >
                  📍 View our location on Google Maps
                </a>
              </div>
            </div>
          </div>
          <div className='grid gap-10 md:grid-cols-5 md:gap-x-8 md:gap-y-12'>
            {/* Navigation */}
            <div className='space-y-4'>
              <p className='text-ln-label-md text-ln-gray-900 dark:text-white'>
                Navigation
              </p>
              <nav className='flex flex-col gap-2'>
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className='block text-ln-paragraph-sm text-ln-gray-600 transition-colors hover:text-ln-gray-900 dark:text-ln-gray-400 dark:hover:text-white'
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Solutions */}
            <div className='space-y-4'>
              <p className='text-ln-label-md text-ln-gray-900 dark:text-white'>
                Solutions
              </p>
              <nav className='flex flex-col gap-2'>
                {solutionLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className='block text-ln-paragraph-sm text-ln-gray-600 transition-colors hover:text-ln-gray-900'
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social */}
            <div className='space-y-4'>
              <p className='text-ln-label-md text-ln-gray-900 dark:text-white'>
                Social
              </p>
              <div className='flex items-center gap-2'>
                <a
                  href='https://x.com/alignui'
                  target='_blank'
                  rel='noopener nofollow'
                  className='shadow-ln-button-white flex size-8 items-center justify-center rounded-[9px] bg-ln-gray-0 text-ln-gray-400 transition duration-200 ease-linear hover:bg-ln-gray-25 hover:text-ln-gray-500 hover:shadow-none'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 18 18'
                    className='size-[18px]'
                  >
                    <path
                      fill='currentColor'
                      d='M13.053 2.625h2.16l-4.721 5.4 5.555 7.35h-4.35l-3.406-4.457-3.899 4.457H2.23l5.05-5.777-5.329-6.973h4.46l3.08 4.074zm-.76 11.455h1.199L5.76 3.852H4.476l7.819 10.228Z'
                    />
                  </svg>
                </a>
                <a
                  href='https://github.com/alignui'
                  target='_blank'
                  rel='noopener nofollow'
                  className='shadow-ln-button-white flex size-8 items-center justify-center rounded-[9px] bg-ln-gray-0 text-ln-gray-400 transition duration-200 ease-linear hover:bg-ln-gray-25 hover:text-ln-gray-500 hover:shadow-none'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 18 18'
                    className='size-[18px]'
                  >
                    <path
                      fill='currentColor'
                      d='M9 1.463c4.144 0 7.5 3.356 7.5 7.5a7.51 7.51 0 0 1-5.11 7.116c-.374.075-.515-.16-.515-.357 0-.253.01-1.059.01-2.062 0-.703-.235-1.153-.507-1.388 1.669-.187 3.422-.825 3.422-3.703 0-.825-.29-1.49-.769-2.015.075-.188.338-.957-.075-1.988 0 0-.628-.206-2.062.769a7 7 0 0 0-1.875-.253 7 7 0 0 0-1.875.253c-1.435-.966-2.063-.769-2.063-.769-.412 1.031-.15 1.8-.075 1.988a2.92 2.92 0 0 0-.769 2.015c0 2.869 1.744 3.516 3.413 3.703-.216.188-.413.516-.478 1.003-.431.197-1.51.516-2.184-.618-.141-.225-.563-.778-1.154-.769-.628.01-.253.356.01.497.318.178.684.844.768 1.06.15.421.638 1.227 2.522.88 0 .629.01 1.22.01 1.397 0 .197-.14.422-.516.357A7.5 7.5 0 0 1 1.5 8.963c0-4.144 3.356-7.5 7.5-7.5'
                    />
                  </svg>
                </a>
                <a
                  href='https://discord.gg/alignui'
                  target='_blank'
                  rel='noopener nofollow'
                  className='shadow-ln-button-white flex size-8 items-center justify-center rounded-[9px] bg-ln-gray-0 text-ln-gray-400 transition duration-200 ease-linear hover:bg-ln-gray-25 hover:text-ln-gray-500 hover:shadow-none'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 18 18'
                    className='size-[18px]'
                  >
                    <path
                      fill='currentColor'
                      d='M14.727 3.767a13.6 13.6 0 0 0-3.404-1.053q-.24.435-.436.891a12.6 12.6 0 0 0-3.778 0 10 10 0 0 0-.436-.89A13.7 13.7 0 0 0 3.266 3.77C1.112 6.974.528 10.099.82 13.179a13.7 13.7 0 0 0 4.175 2.107q.508-.687.894-1.45a9 9 0 0 1-1.408-.675q.178-.13.345-.261a9.76 9.76 0 0 0 8.348 0q.17.14.345.26-.677.401-1.41.678.385.762.893 1.448a13.6 13.6 0 0 0 4.178-2.106c.343-3.572-.585-6.668-2.453-9.413M6.26 11.285c-.814 0-1.486-.743-1.486-1.656s.649-1.662 1.483-1.662 1.502.749 1.488 1.662-.656 1.655-1.485 1.655Zm5.482 0c-.815 0-1.485-.743-1.485-1.656s.65-1.662 1.485-1.662 1.498.749 1.483 1.662-.654 1.655-1.483 1.655Z'
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Legal */}
            <div className='space-y-4'>
              <p className='text-ln-label-md text-ln-gray-900 dark:text-white'>
                Legal
              </p>
              <nav className='flex flex-col gap-2'>
                {legalLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className='block text-ln-paragraph-sm text-ln-gray-600 transition-colors hover:text-ln-gray-900'
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Newsletter form */}
            <div className='space-y-4 md:col-span-1'>
              <p className='text-ln-label-md text-ln-gray-900 dark:text-white'>
                Product updates & system insights
              </p>
              <form
                className='flex flex-col gap-3'
                onSubmit={(e) => e.preventDefault()}
              >
                <div className='w-full'>
                  <input
                    type='email'
                    required
                    placeholder='your@company.com'
                    className='w-full rounded-xl border border-ln-gray-200 bg-ln-gray-50 px-3 py-2.5 text-ln-label-sm text-ln-gray-900 outline-none transition-colors placeholder:text-ln-gray-400 focus:border-ln-orange focus:ring-2 focus:ring-ln-orange/20 dark:border-ln-gray-800 dark:bg-ln-gray-900 dark:text-ln-gray-100'
                  />
                </div>
                {/* Using a standard button here since imports might differ */}
                <button className='flex w-full items-center justify-center rounded-lg bg-ln-gray-900 py-2.5 text-ln-label-sm font-medium text-ln-gray-0 transition-colors hover:bg-ln-gray-800 dark:bg-ln-gray-0 dark:text-ln-gray-900 dark:hover:bg-ln-gray-100'>
                  Subscribe
                  <TrendingUp className='ml-2 size-4' />
                </button>
              </form>
              <p className='text-xs leading-relaxed text-ln-gray-500 dark:text-ln-gray-400'>
                By subscribing, you agree to our{' '}
                <Link
                  href='/privacy-policy'
                  className='text-ln-gray-700 underline decoration-ln-gray-300 underline-offset-2 hover:text-ln-gray-900 hover:decoration-ln-gray-500 dark:text-ln-gray-300 dark:hover:text-ln-gray-0'
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className='h-px w-full bg-ln-gray-200 dark:bg-ln-gray-800' />

          {/* Bottom row */}
          <div className='text-xs flex flex-col items-center justify-between gap-3 text-ln-gray-500 dark:text-ln-gray-400 md:flex-row'>
            <p>© 2025 Panel Management Systems. All rights reserved.</p>
            <div className='flex items-center gap-1.5'>
              <span>Created by</span>
              <Link
                href='https://moydus.com'
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium text-ln-gray-700 hover:text-ln-gray-900 dark:text-ln-gray-300 dark:hover:text-ln-gray-0'
              >
                Moydus
              </Link>
            </div>
          </div>
        </div>
        <FlickeringFooter />
      </footer>
    </div>
  );
}
