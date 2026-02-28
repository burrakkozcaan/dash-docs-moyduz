'use client';

import { useId, useState, useEffect, useRef } from 'react';

const DESKTOP_LABELS = [
  'Add social login buttons',
  'Add a divider between login types',
  'Make submit button blue',
] as const;
const MOBILE_LABELS = [
  'Add social buttons',
  'Add a divider',
  'Make the button blue',
] as const;
const AUTO_ADVANCE_MS = 1000;
const BORDER_BEAM_RED = 'rgb(220, 38, 38)'; // kırmızı dönen halka

export default function RapidDevelopment() {
  const id = useId();
  const [activeStep, setActiveStep] = useState(0);
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Yaklaşık 1 saniye sonra otomatik sonraki adıma geç; bitince başa dön, döngü
  useEffect(() => {
    autoAdvanceRef.current = setTimeout(() => {
      setActiveStep((prev) => (prev >= 2 ? 0 : prev + 1));
    }, AUTO_ADVANCE_MS);
    return () => {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, [activeStep]);

  const buttonActiveClasses =
    'relative flex h-11 items-center gap-3 whitespace-nowrap rounded-full bg-ln-gray-0 pl-[15px] pr-4 text-[14px]/[20px] font-599 -tracking-[0.02em] text-ln-gray-700 shadow-ln-badge-gray transition duration-500 ease-nc';
  const buttonInactiveClasses =
    'flex h-11 items-center gap-3 whitespace-nowrap rounded-full bg-ln-gray-50 pl-[15px] pr-4 text-[14px]/[20px] font-599 -tracking-[0.02em] text-ln-gray-500 shadow-ln-badge-gray ring-1 ring-inset ring-ln-gray-200 transition duration-500 ease-nc md:shadow-none';
  const buttonCompletedClasses =
    'flex h-11 items-center gap-3 whitespace-nowrap rounded-full bg-ln-gray-50 pl-[15px] pr-4 text-[14px]/[20px] font-599 -tracking-[0.02em] text-ln-gray-700 shadow-ln-badge-gray ring-1 ring-inset ring-ln-gray-200 transition duration-500 ease-nc md:shadow-none';

  const getButtonClassName = (index: number) =>
    index < activeStep
      ? buttonCompletedClasses
      : activeStep === index
        ? buttonActiveClasses
        : buttonInactiveClasses;

  return (
    <div className='container pb-10 md:pb-[120px]'>
      {/* Header */}
      <div className='flex flex-col items-start pb-4 md:items-center md:pb-14 md:text-center'>
        <div className='flex h-7 items-center gap-1.5 rounded-[9px] bg-ln-gray-0 pl-1.5 pr-2.5 text-ln-label-sm text-ln-gray-700 shadow-ln-subheading xl:h-8 xl:pl-2 xl:pr-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 19 18'
            className='size-[18px] text-ln-gray-400'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.25'
              d='M9.5 5.813V9l2.063 2.063M16.436 9A6.937 6.937 0 1 1 2.563 9a6.937 6.937 0 0 1 13.874 0Z'
            />
          </svg>
          Rapid Development
        </div>
        <h2 className='font-550 mt-4 text-[28px]/[36px] -tracking-[0.02em] text-ln-gray-900 xl:text-[48px]/[56px] xl:-tracking-[0.028em]'>
          Make your customer happy
          <br className='hidden min-[390px]:inline' /> by building faster
        </h2>
        <p className='mt-3 text-ln-paragraph-md text-ln-gray-600 md:mt-5 xl:text-ln-paragraph-lg'>
          Rapidly build{' '}
          <span className='text-ln-label-lg text-ln-gray-800'>
            unique designs
          </span>{' '}
          with our{' '}
          <span className='text-ln-label-lg text-ln-gray-800'>adaptable</span>{' '}
          component library.
        </p>
      </div>

      {/* Desktop: action buttons — tıklanınca adım tamamlanır, sonraki aktif olur */}
      <div className='hidden items-center justify-center gap-1 xl:flex'>
        {DESKTOP_LABELS.map((label, index) => {
          const completed = index < activeStep;
          const active = activeStep === index;
          return (
            <span key={label} className='flex items-center gap-1'>
              {index > 0 && <DividerSvgDesktop id={`${id}-d${index}`} />}
              <button
                type='button'
                onClick={() =>
                  setActiveStep((prev) =>
                    index === prev ? Math.min(prev + 1, 2) : index,
                  )
                }
                className={getButtonClassName(index)}
              >
                {active && (
                  <div
                    className='pointer-events-none absolute -inset-px rounded-full p-px transition duration-200 ease-nc'
                    style={{
                      mask: 'linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) exclude, linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) content-box',
                    }}
                  >
                    <div
                      className='absolute left-1/2 top-1/2 aspect-square w-full origin-center -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full'
                      style={{
                        backgroundImage: `conic-gradient(from -100deg, rgba(0, 0, 0, 0) 0deg, rgba(0, 0, 0, 0) 4deg, ${BORDER_BEAM_RED} 45deg, ${BORDER_BEAM_RED} 90deg, rgba(0, 0, 0, 0) 90deg, rgba(0, 0, 0, 0))`,
                      }}
                    />
                  </div>
                )}
                <div className='grid size-4 shrink-0 items-center justify-center'>
                  {completed ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 15 14'
                      className='text-template-ai size-[15px]'
                      aria-hidden
                    >
                      <path
                        fill='currentColor'
                        fillRule='evenodd'
                        d='M7.5 0a7 7 0 1 0 0 14 7 7 0 0 0 0-14m2.642 5.693a.7.7 0 0 0-1.084-.886l-2.66 3.251-.853-.853a.7.7 0 0 0-.99.99l1.4 1.4a.7.7 0 0 0 1.037-.052z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : active ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 16 16'
                      className='size-4 text-ln-orange'
                    >
                      <path
                        fill='currentColor'
                        fillRule='evenodd'
                        d='M8 .375c.345 0 .625.28.625.625v2.649a.625.625 0 0 1-1.25 0V.999c0-.344.28-.624.625-.624M2.61 2.608a.625.625 0 0 1 .883 0l1.873 1.873a.625.625 0 1 1-.884.884L2.608 3.492a.625.625 0 0 1 0-.884Zm10.783 0a.625.625 0 0 1 0 .885L11.52 5.365a.625.625 0 0 1-.884-.883l1.873-1.873a.625.625 0 0 1 .884 0ZM.375 8.002c0-.346.28-.625.625-.625h2.649a.625.625 0 1 1 0 1.25H1A.625.625 0 0 1 .375 8Zm11.351 0c0-.346.28-.625.625-.625H15a.625.625 0 1 1 0 1.25h-2.649A.625.625 0 0 1 11.726 8Zm-1.09 2.634a.625.625 0 0 1 .883 0l1.873 1.873a.625.625 0 1 1-.884.884l-1.873-1.873a.625.625 0 0 1 0-.884Zm-5.27 0a.625.625 0 0 1 0 .884l-1.873 1.873a.625.625 0 1 1-.884-.884l1.873-1.873a.625.625 0 0 1 .883 0ZM8 11.726c.345 0 .625.28.625.625V15a.625.625 0 1 1-1.25 0v-2.649c0-.345.28-.625.625-.625'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 16 16'
                      className='size-4 text-ln-gray-400'
                    >
                      <path
                        fill='currentColor'
                        fillRule='evenodd'
                        d='M8 1.625a6.375 6.375 0 1 0 0 12.75 6.375 6.375 0 0 0 0-12.75M.375 8a7.625 7.625 0 1 1 15.25 0A7.625 7.625 0 0 1 .375 8'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                </div>
                {label}
              </button>
            </span>
          );
        })}
      </div>

      {/* Mobile: scrollable action buttons — alttaki işleme göre aktif buton, duration-500 ease-nc */}
      <div className='scrollbar-hide -mx-4 mb-3 flex items-center justify-start gap-1 overflow-x-auto overflow-y-hidden px-4 pb-2 pt-1 md:mx-0 md:justify-center md:px-0 xl:hidden'>
        {MOBILE_LABELS.map((label, index) => {
          const completed = index < activeStep;
          const active = activeStep === index;
          return (
            <span key={label} className='flex shrink-0 items-center gap-1'>
              {index > 0 && <DividerSvgMobile id={`${id}-m${index}`} />}
              <button
                type='button'
                onClick={() =>
                  setActiveStep((prev) =>
                    index === prev ? Math.min(prev + 1, 2) : index,
                  )
                }
                className={getButtonClassName(index)}
              >
                {active && (
                  <div
                    className='pointer-events-none absolute -inset-px rounded-full p-px transition duration-200 ease-nc'
                    style={{
                      mask: 'linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) exclude, linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) content-box',
                    }}
                  >
                    <div
                      className='absolute left-1/2 top-1/2 aspect-square w-full origin-center -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full'
                      style={{
                        backgroundImage: `conic-gradient(from -100deg, rgba(0, 0, 0, 0) 0deg, rgba(0, 0, 0, 0) 4deg, ${BORDER_BEAM_RED} 45deg, ${BORDER_BEAM_RED} 90deg, rgba(0, 0, 0, 0) 90deg, rgba(0, 0, 0, 0))`,
                      }}
                    />
                  </div>
                )}
                <div className='grid size-4 shrink-0 items-center justify-center'>
                  {completed ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 15 14'
                      className='text-template-ai size-[15px]'
                      aria-hidden
                    >
                      <path
                        fill='currentColor'
                        fillRule='evenodd'
                        d='M7.5 0a7 7 0 1 0 0 14 7 7 0 0 0 0-14m2.642 5.693a.7.7 0 0 0-1.084-.886l-2.66 3.251-.853-.853a.7.7 0 0 0-.99.99l1.4 1.4a.7.7 0 0 0 1.037-.052z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : active ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 16 16'
                      className='size-4 text-ln-orange'
                    >
                      <path
                        fill='currentColor'
                        fillRule='evenodd'
                        d='M8 .375c.345 0 .625.28.625.625v2.649a.625.625 0 0 1-1.25 0V.999c0-.344.28-.624.625-.624M2.61 2.608a.625.625 0 0 1 .883 0l1.873 1.873a.625.625 0 1 1-.884.884L2.608 3.492a.625.625 0 0 1 0-.884Zm10.783 0a.625.625 0 0 1 0 .885L11.52 5.365a.625.625 0 0 1-.884-.883l1.873-1.873a.625.625 0 0 1 .884 0ZM.375 8.002c0-.346.28-.625.625-.625h2.649a.625.625 0 1 1 0 1.25H1A.625.625 0 0 1 .375 8Zm11.351 0c0-.346.28-.625.625-.625H15a.625.625 0 1 1 0 1.25h-2.649A.625.625 0 0 1 11.726 8Zm-1.09 2.634a.625.625 0 0 1 .883 0l1.873 1.873a.625.625 0 1 1-.884.884l-1.873-1.873a.625.625 0 0 1 0-.884Zm-5.27 0a.625.625 0 0 1 0 .884l-1.873 1.873a.625.625 0 1 1-.884-.884l1.873-1.873a.625.625 0 0 1 .883 0ZM8 11.726c.345 0 .625.28.625.625V15a.625.625 0 1 1-1.25 0v-2.649c0-.345.28-.625.625-.625'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 16 16'
                      className='size-4 text-ln-gray-400'
                    >
                      <path
                        fill='currentColor'
                        fillRule='evenodd'
                        d='M8 1.625a6.375 6.375 0 1 0 0 12.75 6.375 6.375 0 0 0 0-12.75M.375 8a7.625 7.625 0 1 1 15.25 0A7.625 7.625 0 0 1 .375 8'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                </div>
                {label}
              </button>
            </span>
          );
        })}
      </div>

      {/* Connector (desktop) */}
      <div className='hidden justify-center pb-3 pt-3.5 xl:flex'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 786 54'
          className='h-[54px] w-auto'
        >
          <path
            fill='#E0E0E0'
            fillRule='evenodd'
            d='M2.5 5.287a2.668 2.668 0 1 1 1 0v5.38c0 8.56 6.94 15.5 15.5 15.5h358c7.716 0 14.195 5.296 16 12.453 1.804-7.156 8.284-12.453 16-12.453h358c8.56 0 15.5-6.94 15.5-15.5v-5.38a2.668 2.668 0 1 1 1 0v5.38c0 9.112-7.387 16.5-16.5 16.5H409c-8.56 0-15.5 6.94-15.5 15.5v5.38a2.668 2.668 0 1 1-1 0v-5.38c0-8.56-6.94-15.5-15.5-15.5H19c-9.113 0-16.5-7.388-16.5-16.5zm390 0a2.668 2.668 0 1 1 1 0v13.38h-1z'
            clipRule='evenodd'
          />
        </svg>
      </div>

      {/* Code + Preview panel */}
      <div className='relative -mx-3 flex max-w-[1004px] flex-col rounded-20 bg-ln-gray-50 ring-1 ring-ln-gray-200 md:mx-auto md:h-[594px] md:w-full xl:rounded-[28px] xl:bg-ln-gray-25'>
        <div
          className='pointer-events-none absolute -inset-px rounded-[inherit] p-px xl:hidden'
          style={{
            opacity: 0.08,
            background: 'linear-gradient(rgb(51, 51, 51), rgba(0, 0, 0, 0))',
            mask: 'linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) exclude, linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) content-box',
          }}
        />
        <div className='grid w-full items-center px-2.5 py-3 md:grid-cols-[minmax(0,1fr),350px] xl:grid-cols-[minmax(0,1fr),400px] xl:py-4'>
          <div className='flex w-full items-center border-ln-gray-200 pl-3.5 md:border-r md:pl-4'>
            <div className='flex items-center gap-1 font-mono text-ln-label-sm text-ln-gray-600'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 21 20'
                className='size-4 text-ln-orange'
              >
                <path
                  stroke='currentColor'
                  strokeLinejoin='round'
                  strokeWidth='1.25'
                  d='m7.964 4.202 1.947-1.946a.833.833 0 0 1 1.178 0l1.947 1.946a.833.833 0 0 1 0 1.179l-1.947 1.946a.833.833 0 0 1-1.178 0L7.964 5.381a.833.833 0 0 1 0-1.179Zm0 10.417 1.947-1.947a.833.833 0 0 1 1.178 0l1.947 1.947a.833.833 0 0 1 0 1.178l-1.947 1.947a.833.833 0 0 1-1.178 0l-1.947-1.947a.833.833 0 0 1 0-1.178ZM2.756 9.41l1.946-1.946a.833.833 0 0 1 1.179 0l1.946 1.947a.833.833 0 0 1 0 1.178l-1.946 1.947a.833.833 0 0 1-1.179 0l-1.946-1.947a.833.833 0 0 1 0-1.178Zm10.416 0 1.947-1.946a.833.833 0 0 1 1.178 0l1.947 1.947a.833.833 0 0 1 0 1.178l-1.947 1.947a.833.833 0 0 1-1.178 0l-1.947-1.947a.833.833 0 0 1 0-1.178Z'
                />
              </svg>
              login-page.tsx
              <div className='ml-0.5 size-1.5 shrink-0 translate-y-px rounded-full bg-ln-gray-600' />
            </div>
          </div>
          <div className='hidden pl-5 md:block'>
            <div className='flex items-center gap-1 font-mono text-ln-label-sm text-ln-gray-450'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
                className='size-5 text-ln-gray-300'
              >
                <path
                  stroke='currentColor'
                  strokeLinejoin='round'
                  strokeWidth='1.25'
                  d='M13.523 9.1 7.612 5.174c-.695-.462-1.612.05-1.612.9v7.852c0 .85.917 1.362 1.612.9l5.91-3.926a1.088 1.088 0 0 0 0-1.8Z'
                />
              </svg>
              preview
            </div>
          </div>
        </div>
        <div className='flex min-h-0 w-full flex-1 flex-col p-2 !pt-0 xl:p-2.5'>
          <div
            className='grid min-h-0 w-full flex-1 items-start gap-2 max-[768px]:!shadow-none md:grid-cols-[minmax(0,1fr),350px] md:gap-0 md:overflow-hidden md:rounded-20 md:bg-ln-gray-0 xl:grid-cols-[minmax(0,1fr),400px]'
            style={{
              boxShadow:
                'rgba(41, 41, 41, 0.04) 0px 1px 1px 0.5px, rgba(41, 41, 41, 0.02) 0px 3px 3px -1.5px, rgba(41, 41, 41, 0.04) 0px 6px 6px -3px, rgba(41, 41, 41, 0.04) 0px 12px 12px -6px, rgba(41, 41, 41, 0.04) 0px 24px 24px -12px, rgba(41, 41, 41, 0.04) 0px 48px 48px -24px, rgba(51, 51, 51, 0.06) 0px -1px 1px -0.5px inset',
            }}
          >
            {/* Code column — adıma göre resim değişir (rapid-code-0.png, rapid-code-1.png, rapid-code-2.png veya rapid-code.png) */}
            <div
              className='relative flex h-[388px] min-h-0 flex-col overflow-hidden rounded-2xl bg-ln-gray-0 before:absolute before:inset-y-3 before:right-0 before:z-10 before:hidden before:w-px before:bg-ln-gray-100 md:h-full md:rounded-none md:bg-transparent md:!shadow-none md:before:block'
              style={{
                boxShadow:
                  'rgba(41, 41, 41, 0.04) 0px 1px 1px 0.5px, rgba(41, 41, 41, 0.02) 0px 3px 3px -1.5px, rgba(41, 41, 41, 0.04) 0px 6px 6px -3px, rgba(41, 41, 41, 0.04) 0px 12px 12px -6px, rgba(41, 41, 41, 0.04) 0px 24px 24px -12px, rgba(41, 41, 41, 0.04) 0px 48px 48px -24px, rgba(51, 51, 51, 0.06) 0px -1px 1px -0.5px inset',
              }}
            >
              <div
                key={activeStep}
                className='relative flex flex-1 overflow-hidden'
              >
                <img
                  src={`/images/landing/rapid-code-${activeStep}.png`}
                  alt={`Login page code step ${activeStep + 1}`}
                  className='h-full w-full object-cover object-left-top'
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (el.dataset.fallback) return;
                    el.dataset.fallback = '1';
                    el.src = '/images/landing/rapid-code.png';
                  }}
                />
              </div>
            </div>
            {/* Preview column — alttaki işleme göre divider / mavi buton */}
            <div
              className='flex h-[532px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-ln-gray-0 md:h-full md:rounded-none md:bg-transparent md:!shadow-none'
              style={{
                boxShadow:
                  'rgba(41, 41, 41, 0.04) 0px 1px 1px 0.5px, rgba(41, 41, 41, 0.02) 0px 3px 3px -1.5px, rgba(41, 41, 41, 0.04) 0px 6px 6px -3px, rgba(41, 41, 41, 0.04) 0px 12px 12px -6px, rgba(41, 41, 41, 0.04) 0px 24px 24px -12px, rgba(51, 51, 51, 0.06) 0px -1px 1px -0.5px inset',
              }}
            >
              <div className='flex w-full max-w-[400px] shrink-0 flex-col gap-5 rounded-2xl bg-white p-7 shadow-ln-xs'>
                <div className='text-center'>
                  <div className='text-ln-title-h6 text-ln-gray-900'>
                    Welcome back
                  </div>
                  <div className='mt-1 text-ln-paragraph-sm text-ln-gray-600'>
                    Please enter your details to login.
                  </div>
                </div>
                <button
                  type='button'
                  className='flex h-10 w-full items-center justify-center gap-2 rounded-[10px] border border-ln-gray-200 bg-ln-gray-0 text-ln-label-sm text-ln-gray-700'
                >
                  Login with Google
                </button>
                {activeStep >= 1 && (
                  <div className='flex items-center gap-2'>
                    <div className='h-px flex-1 bg-ln-gray-200' />
                    <span className='text-ln-label-xs text-ln-gray-500'>
                      or
                    </span>
                    <div className='h-px flex-1 bg-ln-gray-200' />
                  </div>
                )}
                <div className='flex flex-col gap-1'>
                  <label
                    className='text-ln-label-sm text-ln-gray-800'
                    htmlFor='rapid-email'
                  >
                    Email Address
                  </label>
                  <input
                    id='rapid-email'
                    type='email'
                    placeholder='hello@alignui.com'
                    className='h-10 w-full rounded-[10px] border border-ln-gray-200 bg-white px-3 text-ln-paragraph-sm text-ln-gray-800 outline-none placeholder:text-ln-gray-450'
                    readOnly
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label
                    className='text-ln-label-sm text-ln-gray-800'
                    htmlFor='rapid-password'
                  >
                    Password
                  </label>
                  <input
                    id='rapid-password'
                    type='password'
                    placeholder='••••••••'
                    className='h-10 w-full rounded-[10px] border border-ln-gray-200 bg-white px-3 text-ln-paragraph-sm text-ln-gray-800 outline-none placeholder:text-ln-gray-450'
                    readOnly
                  />
                </div>
                <button
                  type='button'
                  className={`h-10 w-full rounded-[10px] text-ln-label-sm text-white shadow-ln-button-gray transition duration-500 ease-nc ${activeStep === 2 ? 'bg-blue-600' : 'bg-ln-gray-900'}`}
                >
                  Login
                </button>
                <div className='flex justify-center gap-1 text-ln-paragraph-sm text-ln-gray-600'>
                  Don&apos;t have an account?{' '}
                  <span className='text-ln-label-sm text-ln-gray-900 underline'>
                    Register
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom connector + feature cards */}
      <div className='hidden justify-center py-3.5 xl:flex'>
        <div className='relative w-fit'>
          <div className='absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ln-gray-200' />
          <div className='absolute bottom-0 left-0 size-1.5 -translate-x-0.5 translate-y-1/2 rounded-full bg-ln-gray-200' />
          <svg
            width='701'
            height='48'
            viewBox='0 0 701 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-ln-gray-200'
            strokeWidth='1'
          >
            <path
              d='M1 48V40C1 31.1634 8.16344 24 17 24H335C343.837 24 351 16.8366 351 8V0'
              strokeDasharray='1 1'
            />
          </svg>
          <div className='absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-ln-gray-200' />
          <svg
            width='701'
            height='48'
            viewBox='0 0 701 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='absolute left-px top-0 stroke-ln-gray-200'
            strokeWidth='1'
          >
            <path d='M350 32L350 48' strokeDasharray='1 1' />
          </svg>
          <div className='absolute bottom-0 right-0 size-1.5 translate-x-1/2 translate-y-1/2 rounded-full bg-ln-gray-200' />
          <svg
            width='701'
            height='48'
            viewBox='0 0 701 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='absolute left-px top-0 stroke-ln-gray-200'
            strokeWidth='1'
          >
            <path
              d='M700 48V40C700 31.1634 692.837 24 684 24H366C357.163 24 350 16.8366 350 8V0'
              strokeDasharray='1 1'
            />
          </svg>
        </div>
      </div>
      <div className='relative mt-10 flex flex-col justify-center gap-6 md:flex-row md:py-7 xl:gap-8 before:absolute before:left-0 before:top-0 before:hidden before:h-px before:w-full before:bg-ln-gray-200 md:before:block after:absolute after:bottom-0 after:left-0 after:hidden after:h-px after:w-full after:bg-ln-gray-200 md:after:block'>
        <img
          src='https://alignui.com/images/landing/dot.png'
          width={9}
          height={9}
          alt=''
          className='absolute -left-px -top-1 z-30 hidden min-h-[9px] min-w-[9px] md:block'
        />
        <img
          src='https://alignui.com/images/landing/dot.png'
          width={9}
          height={9}
          alt=''
          className='absolute -right-px -top-1 z-30 hidden min-h-[9px] min-w-[9px] md:block'
        />
        <img
          src='https://alignui.com/images/landing/dot.png'
          width={9}
          height={9}
          alt=''
          className='absolute -bottom-1 -left-px z-30 hidden min-h-[9px] min-w-[9px] md:block'
        />
        <img
          src='https://alignui.com/images/landing/dot.png'
          width={9}
          height={9}
          alt=''
          className='absolute -bottom-1 -right-px z-30 hidden min-h-[9px] min-w-[9px] md:block'
        />
        <div
          className='xl:animate-rapid-b-item flex flex-1 flex-row items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center xl:w-[270px] xl:translate-y-2 xl:opacity-0 xl:blur-sm'
          style={{ animationDelay: '1.2s' }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='size-6 shrink-0 text-template-hr'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='M10 10 5.5 5.5m6.5-.25v-2.5A9.25 9.25 0 1 1 3.657 8m11.093 4a2.75 2.75 0 1 1-5.5 0 2.75 2.75 0 0 1 5.5 0'
            />
          </svg>
          <div className='md:mt-4'>
            <div className='text-ln-label-md text-ln-gray-800'>
              10X Faster Development
            </div>
            <div className='mt-1 text-ln-paragraph-sm text-ln-gray-600 md:max-w-64'>
              Speed up your development with ready-to-use components
            </div>
          </div>
        </div>
        <div className='hidden w-px bg-ln-gray-200 md:block' />
        <div
          className='h-px w-full text-ln-gray-300 md:hidden'
          style={{
            background:
              'linear-gradient(90deg, currentcolor 4px, transparent 4px) 50% 50% / 8px 1px repeat-x',
          }}
        />
        <div
          className='xl:animate-rapid-b-item flex flex-1 flex-row items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center xl:w-[270px] xl:translate-y-2 xl:opacity-0 xl:blur-sm'
          style={{ animationDelay: '1.8s' }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='size-6 shrink-0 text-template-ai'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='M15 9.5 10.5 15l-2-2m12.75-1a9.25 9.25 0 1 1-18.5 0 9.25 9.25 0 0 1 18.5 0'
            />
          </svg>
          <div className='md:mt-4'>
            <div className='text-ln-label-md text-ln-gray-800'>
              Pre-built Templates
            </div>
            <div className='mt-1 text-ln-paragraph-sm text-ln-gray-600 md:max-w-64'>
              Kickstart your project with sector-specific designs.
            </div>
          </div>
        </div>
        <div className='hidden w-px bg-ln-gray-200 md:block' />
        <div
          className='h-px w-full text-ln-gray-300 md:hidden'
          style={{
            background:
              'linear-gradient(90deg, currentcolor 4px, transparent 4px) 50% 50% / 8px 1px repeat-x',
          }}
        />
        <div
          className='xl:animate-rapid-b-item flex flex-1 flex-row items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center xl:w-[270px] xl:translate-y-2 xl:opacity-0 xl:blur-sm'
          style={{ animationDelay: '2.4s' }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='size-6 shrink-0 text-template-marketing'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='M8.25 3.75h-1.5a2 2 0 0 0-2 2V10a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4.25a2 2 0 0 0 2 2h1.5m7.5-16.5h1.5a2 2 0 0 1 2 2V10a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4.25a2 2 0 0 1-2 2h-1.5'
            />
          </svg>
          <div className='md:mt-4'>
            <div className='text-ln-label-md text-ln-gray-800'>
              30% Less Code
            </div>
            <div className='mt-1 text-ln-paragraph-sm text-ln-gray-600 md:max-w-64'>
              Create cleaner, more maintainable projects effortlessly.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DividerSvgDesktop({ id }: { id: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 48 18'
      className='h-[18px] w-12 shrink-0'
      aria-hidden
    >
      <path stroke='#E0E0E0' d='M0 8.5h48' />
      <g clipPath={`url(#${id})`}>
        <rect width='16' height='16' x='16' y='1' fill='#F7F7F7' rx='8' />
        <path
          fill='#B8B8B8'
          fillRule='evenodd'
          d='M20.813 5.98a.5.5 0 0 1 .707 0l2.195 2.195a1.167 1.167 0 0 1 0 1.65L21.52 12.02a.5.5 0 1 1-.707-.707l2.195-2.195a.167.167 0 0 0 0-.236l-2.195-2.195a.5.5 0 0 1 0-.707m4.667 0a.5.5 0 0 1 .707 0l2.195 2.195a1.167 1.167 0 0 1 0 1.65l-2.195 2.195a.5.5 0 1 1-.707-.707l2.195-2.195a.167.167 0 0 0 0-.236L25.48 6.687a.5.5 0 0 1 0-.707'
          clipRule='evenodd'
        />
      </g>
      <rect
        width='17'
        height='17'
        x='15.5'
        y='0.5'
        stroke='#E0E0E0'
        rx='8.5'
        fill='none'
      />
      <defs>
        <clipPath id={id}>
          <rect width='16' height='16' x='16' y='1' fill='#fff' rx='8' />
        </clipPath>
      </defs>
    </svg>
  );
}

function DividerSvgMobile({ id }: { id: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 36 18'
      className='h-[18px] w-9 shrink-0'
      aria-hidden
    >
      <path stroke='#E0E0E0' d='M0 8.5h36' />
      <g clipPath={`url(#${id})`}>
        <rect width='16' height='16' x='10' y='1' fill='#F7F7F7' rx='8' />
        <path
          fill='#B8B8B8'
          fillRule='evenodd'
          d='M14.813 5.98a.5.5 0 0 1 .707 0l2.195 2.196a1.167 1.167 0 0 1 0 1.65L15.52 12.02a.5.5 0 1 1-.707-.707l2.195-2.195a.167.167 0 0 0 0-.236l-2.195-2.195a.5.5 0 0 1 0-.708Zm4.667 0a.5.5 0 0 1 .707 0l2.195 2.196a1.167 1.167 0 0 1 0 1.65l-2.195 2.195a.5.5 0 1 1-.707-.707l2.195-2.195a.167.167 0 0 0 0-.236L19.48 6.688a.5.5 0 0 1 0-.708'
          clipRule='evenodd'
        />
      </g>
      <rect
        width='17'
        height='17'
        x='9.5'
        y='0.5'
        stroke='#E0E0E0'
        rx='8.5'
        fill='none'
      />
      <defs>
        <clipPath id={id}>
          <rect width='16' height='16' x='10' y='1' fill='#fff' rx='8' />
        </clipPath>
      </defs>
    </svg>
  );
}
