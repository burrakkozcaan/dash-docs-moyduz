'use client';

import { useState, useRef, useLayoutEffect } from 'react';

function CornerDot({ className }: { className?: string }) {
  return (
    <svg
      width={9}
      height={9}
      viewBox='0 0 9 9'
      fill='none'
      className={className}
      aria-hidden
    >
      <circle cx='4.5' cy='4.5' r='3.5' fill='#a3a3a3' />
    </svg>
  );
}

export default function PanelManage() {
  const [activeTab, setActiveTab] = useState(3);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const tab0Ref = useRef<HTMLButtonElement>(null);
  const tab1Ref = useRef<HTMLButtonElement>(null);
  const tab2Ref = useRef<HTMLButtonElement>(null);
  const tab3Ref = useRef<HTMLButtonElement>(null);
  const tabRefs = [tab0Ref, tab1Ref, tab2Ref, tab3Ref];
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 16, width: 36 });

  useLayoutEffect(() => {
    const el = tabRefs[activeTab]?.current;
    const bar = tabBarRef.current;
    if (!el || !bar) return;
    const barRect = bar.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicatorStyle({
      left: elRect.left - barRect.left + elRect.width / 2 - 22,
      width: 44,
    });
  }, [activeTab]);

  return (
    <div className='pt-11 xl:pt-20'>
      <div
        ref={tabBarRef}
        className='relative -mx-6 mb-4 flex h-[76px] border-y border-ln-gray-200 before:absolute before:left-0 before:top-0 before:hidden before:h-px before:w-full before:bg-ln-gray-200 after:absolute after:bottom-0 after:left-0 after:hidden after:h-px after:w-full after:bg-ln-gray-200 md:mx-0 xl:mb-0 xl:h-auto xl:gap-8 xl:border-none xl:px-[26px] xl:py-7 xl:before:block xl:after:block'
      >
        <div
          className='absolute left-10 top-0 hidden h-px bg-ln-orange transition-all duration-500 xl:block'
          style={{
            transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />
        <div className='absolute -top-px left-4 h-px w-9 bg-ln-orange xl:hidden' />

        <CornerDot className='absolute -left-px -top-1 z-30 hidden min-h-[9px] min-w-[9px] xl:block' />
        <CornerDot className='absolute -right-px -top-1 z-30 hidden min-h-[9px] min-w-[9px] xl:block' />
        <CornerDot className='absolute -bottom-1 -left-px z-30 hidden min-h-[9px] min-w-[9px] xl:block' />
        <CornerDot className='absolute -bottom-1 -right-px z-30 hidden min-h-[9px] min-w-[9px] xl:block' />

        {/* Tab 1 - Base Components */}
        <button
          ref={tabRefs[0]}
          type='button'
          onClick={() => setActiveTab(0)}
          className={`group relative mx-4 min-w-0 flex-1 items-center gap-3.5 text-left xl:mx-0 xl:flex-none xl:flex-col xl:gap-0 xl:text-center ${activeTab === 0 ? 'flex' : 'hidden'} xl:flex`}
        >
          <div
            className={`before:shadow-ln-button-orange relative flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-ln-gray-100 transition duration-200 before:absolute before:inset-0 before:rounded-[9px] before:bg-ln-orange before:transition before:duration-200 xl:h-8 xl:w-11 ${activeTab === 0 ? 'before:opacity-100' : 'before:opacity-0'} shadow-ln-badge-gray group-hover:shadow-ln-badge-orange group-hover:bg-ln-orange/[.12]`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 21 20'
              className={`relative z-10 size-5 transition duration-300 xl:!animate-none ${activeTab === 0 ? 'text-ln-gray-0 duration-300 animate-in fade-in-0 zoom-in-95' : 'text-ln-gray-500 group-hover:text-ln-orange'}`}
            >
              <path
                stroke='currentColor'
                strokeLinejoin='round'
                strokeWidth='1.25'
                d='m7.964 4.202 1.947-1.946a.833.833 0 0 1 1.178 0l1.947 1.946a.833.833 0 0 1 0 1.179l-1.947 1.946a.833.833 0 0 1-1.178 0L7.964 5.381a.833.833 0 0 1 0-1.179Zm0 10.417 1.947-1.947a.833.833 0 0 1 1.178 0l1.947 1.947a.833.833 0 0 1 0 1.178l-1.947 1.947a.833.833 0 0 1-1.178 0l-1.947-1.947a.833.833 0 0 1 0-1.178ZM2.756 9.41l1.946-1.946a.833.833 0 0 1 1.179 0l1.946 1.947a.833.833 0 0 1 0 1.178l-1.946 1.947a.833.833 0 0 1-1.179 0l-1.946-1.947a.833.833 0 0 1 0-1.178Zm10.416 0 1.947-1.946a.833.833 0 0 1 1.178 0l1.947 1.947a.833.833 0 0 1 0 1.178l-1.947 1.947a.833.833 0 0 1-1.178 0l-1.947-1.947a.833.833 0 0 1 0-1.178Z'
              />
            </svg>
          </div>
          <div
            key={activeTab === 0 ? 'a0' : 'i0'}
            className={`min-w-0 xl:mt-4 xl:!animate-none ${activeTab === 0 ? 'duration-300 animate-in fade-in-0 slide-in-from-bottom-2' : ''}`}
          >
            <div
              className={`flex items-center gap-1.5 truncate text-ln-label-sm transition duration-200 xl:justify-center ${activeTab === 0 ? 'text-ln-gray-900' : 'text-ln-gray-700 group-hover:text-ln-gray-800'}`}
            >
              Base Components
              <div className='shadow-ln-badge-gray rounded-[5px] bg-ln-gray-100 px-[5px] py-[3px] text-ln-subheading-xs text-ln-gray-600'>
                FREE
              </div>
            </div>
            <div className='mt-1 text-ln-paragraph-sm text-ln-gray-600'>
              <span className='hidden md:inline'>
                40+ open-source components available
              </span>
              <span className='md:hidden'>40+ open-source components</span>
            </div>
          </div>
        </button>

        <div className='relative hidden w-0 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-ln-gray-200 xl:block' />

        {/* Tab 2 - Components & Blocks */}
        <button
          ref={tabRefs[1]}
          type='button'
          onClick={() => setActiveTab(1)}
          className={`group relative mx-4 min-w-0 flex-1 items-center gap-3.5 text-left xl:mx-0 xl:flex-none xl:flex-col xl:gap-0 xl:text-center ${activeTab === 1 ? 'flex' : 'hidden'} xl:flex`}
        >
          <div
            className={`before:shadow-ln-button-orange relative flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-ln-gray-100 transition duration-200 before:absolute before:inset-0 before:rounded-[9px] before:bg-ln-orange before:transition before:duration-200 xl:h-8 xl:w-11 ${activeTab === 1 ? 'before:opacity-100' : 'before:opacity-0'} shadow-ln-badge-gray group-hover:shadow-ln-badge-orange group-hover:bg-ln-orange/[.12]`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 21 20'
              className={`relative z-10 size-5 transition duration-300 xl:!animate-none ${activeTab === 1 ? 'text-ln-gray-0 duration-300 animate-in fade-in-0 zoom-in-95' : 'text-ln-gray-500 group-hover:text-ln-orange'}`}
            >
              <path
                fill='currentColor'
                d='M3.417 14.375v-8.75h-1.25v8.75zm14.166-8.75v8.75h1.25v-8.75zm-1.041 9.792H4.458v1.25h12.084zM4.458 4.583h12.084v-1.25H4.458zm13.125 9.792c0 .575-.466 1.042-1.041 1.042v1.25a2.29 2.29 0 0 0 2.291-2.292zm1.25-8.75a2.29 2.29 0 0 0-2.291-2.292v1.25c.575 0 1.041.467 1.041 1.042zm-15.416 0c0-.575.466-1.042 1.041-1.042v-1.25a2.29 2.29 0 0 0-2.291 2.292zm-1.25 8.75a2.29 2.29 0 0 0 2.291 2.292v-1.25a1.04 1.04 0 0 1-1.041-1.042z'
              />
              <path
                fill='currentColor'
                d='M9.875 16.042v.625h1.25v-.625zm1.25-12.084v-.625h-1.25v.625zm0 12.084V3.958h-1.25v12.084z'
              />
            </svg>
          </div>
          <div
            key={activeTab === 1 ? 'a1' : 'i1'}
            className={`min-w-0 xl:mt-4 xl:!animate-none ${activeTab === 1 ? 'duration-300 animate-in fade-in-0 slide-in-from-bottom-2' : ''}`}
          >
            <div
              className={`flex items-center gap-1.5 truncate text-ln-label-sm transition duration-200 xl:justify-center ${activeTab === 1 ? 'text-ln-gray-900' : 'text-ln-gray-700 group-hover:text-ln-gray-800'}`}
            >
              Components & Blocks
              <div className='shadow-ln-badge-orange rounded-[5px] bg-ln-orange/[.12] px-[5px] py-[3px] text-ln-subheading-xs text-ln-orange'>
                PRO
              </div>
            </div>
            <div className='mt-1 text-ln-paragraph-sm text-ln-gray-600'>
              <span className='hidden md:inline'>
                100+ ready-made components for speed
              </span>
              <span className='md:hidden'>100+ ready-made components</span>
            </div>
          </div>
        </button>

        <div className='relative hidden w-0 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-ln-gray-200 xl:block' />

        {/* Tab 3 - Sectoral Templates */}
        <button
          ref={tabRefs[2]}
          type='button'
          onClick={() => setActiveTab(2)}
          className={`group relative mx-4 min-w-0 flex-1 items-center gap-3.5 text-left xl:mx-0 xl:flex-none xl:flex-col xl:gap-0 xl:text-center ${activeTab === 2 ? 'flex' : 'hidden'} xl:flex`}
        >
          <div
            className={`before:shadow-ln-button-orange relative flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-ln-gray-100 transition duration-200 before:absolute before:inset-0 before:rounded-[9px] before:bg-ln-orange before:transition before:duration-200 xl:h-8 xl:w-11 ${activeTab === 2 ? 'before:opacity-100' : 'before:opacity-0'} shadow-ln-badge-gray group-hover:shadow-ln-badge-orange group-hover:bg-ln-orange/[.12]`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 21 20'
              className={`relative z-10 size-5 transition duration-300 xl:!animate-none ${activeTab === 2 ? 'text-ln-gray-0 duration-300 animate-in fade-in-0 zoom-in-95' : 'text-ln-gray-500 group-hover:text-ln-orange'}`}
            >
              <path
                fill='currentColor'
                d='M16.75 5.792v8.416H18V5.792zM14.708 16.25H6.292v1.25h8.416zM4.25 14.208V5.792H3v8.416zM6.292 3.75h8.416V2.5H6.292zm0 12.5c-.477 0-.798 0-1.044-.02-.24-.02-.354-.055-.43-.093l-.567 1.113c.281.143.579.2.895.225.31.025.69.025 1.146.025zM3 14.208c0 .457 0 .837.025 1.146.026.317.082.614.225.895l1.114-.568c-.039-.075-.074-.19-.093-.429-.02-.247-.021-.567-.021-1.044zm1.819 1.929a1.04 1.04 0 0 1-.455-.456l-1.114.568c.22.43.57.782 1.001 1.001zm11.931-1.929c0 .477 0 .797-.02 1.044-.02.24-.055.354-.093.43l1.113.567c.143-.281.2-.578.225-.895.025-.31.025-.69.025-1.146zM14.708 17.5c.457 0 .837 0 1.146-.025.317-.026.614-.082.895-.225l-.568-1.113c-.075.038-.19.073-.429.092-.247.02-.567.021-1.044.021zm1.929-1.819c-.1.196-.26.356-.456.456l.568 1.113c.43-.22.782-.57 1.001-1.001zM18 5.791c0-.456 0-.836-.025-1.145-.026-.316-.082-.614-.225-.895l-1.113.568c.038.075.073.19.092.429.02.246.021.567.021 1.044H18ZM14.708 3.75c.477 0 .797 0 1.044.02.24.02.354.055.43.094l.567-1.114c-.281-.143-.578-.2-.895-.225-.31-.025-.69-.025-1.146-.025zm3.042.001a2.3 2.3 0 0 0-1-1.001l-.568 1.114c.196.1.356.259.456.455zm-13.5 2.04c0-.476 0-.797.02-1.043.02-.24.055-.354.094-.43L3.25 3.752c-.143.281-.2.579-.225.895C3 4.956 3 5.336 3 5.792zM6.292 2.5c-.457 0-.837 0-1.146.025-.316.026-.614.082-.895.225l.568 1.114c.075-.039.19-.074.429-.093.246-.02.567-.021 1.044-.021zM4.364 4.319c.1-.196.259-.356.455-.455L4.25 2.75c-.43.22-.782.57-1.001 1.001z'
              />
              <path
                fill='currentColor'
                d='M9.25 3.125V2.5H8v.625zM8 16.875v.625h1.25v-.625zM9.25 10V3.125H8V10zM8 10v6.875h1.25V10z'
              />
              <path
                stroke='currentColor'
                strokeWidth='1.25'
                d='M8.833 10h8.334'
              />
            </svg>
          </div>
          <div
            key={activeTab === 2 ? 'a2' : 'i2'}
            className={`min-w-0 xl:mt-4 xl:!animate-none ${activeTab === 2 ? 'duration-300 animate-in fade-in-0 slide-in-from-bottom-2' : ''}`}
          >
            <div
              className={`flex items-center gap-1.5 truncate text-ln-label-sm transition duration-200 xl:justify-center ${activeTab === 2 ? 'text-ln-gray-900' : 'text-ln-gray-700 group-hover:text-ln-gray-800'}`}
            >
              Sectoral Templates
              <div className='shadow-ln-badge-orange rounded-[5px] bg-ln-orange/[.12] px-[5px] py-[3px] text-ln-subheading-xs text-ln-orange'>
                PRO
              </div>
            </div>
            <div className='mt-1 text-ln-paragraph-sm text-ln-gray-600'>
              <span className='hidden md:inline'>
                Designs for various sectoral needs
              </span>
              <span className='md:hidden'>
                Designs for various sectoral needs
              </span>
            </div>
          </div>
        </button>

        <div className='relative hidden w-0 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-ln-gray-200 xl:block' />

        {/* Tab 4 - Aligned with Figma */}
        <button
          ref={tabRefs[3]}
          type='button'
          onClick={() => setActiveTab(3)}
          className={`group relative mx-4 min-w-0 flex-1 items-center gap-3.5 text-left xl:mx-0 xl:flex-none xl:flex-col xl:gap-0 xl:text-center ${activeTab === 3 ? 'flex' : 'hidden'} xl:flex`}
        >
          <div
            className={`before:shadow-ln-button-orange relative flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-ln-gray-100 transition duration-200 before:absolute before:inset-0 before:rounded-[9px] before:bg-ln-orange before:transition before:duration-200 xl:h-8 xl:w-11 ${activeTab === 3 ? 'before:opacity-100' : 'before:opacity-0'} shadow-ln-badge-gray group-hover:shadow-ln-badge-orange group-hover:bg-ln-orange/[.12]`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 21 20'
              className={`relative z-10 size-5 transition duration-300 xl:!animate-none ${activeTab === 3 ? 'text-ln-gray-0 duration-300 animate-in fade-in-0 zoom-in-95' : 'text-ln-gray-500 group-hover:text-ln-orange'}`}
            >
              <path
                stroke='currentColor'
                strokeWidth='1.25'
                d='M10.49 2H7.82a2.67 2.67 0 0 0-2.67 2.667 2.67 2.67 0 0 0 2.67 2.666M10.49 2v5.333m0-5.333h2.67a2.67 2.67 0 0 1 2.67 2.667 2.67 2.67 0 0 1-2.67 2.666m-2.67 0H7.82m2.67 0v5.334m0-5.334h2.67m-5.34 0A2.67 2.67 0 0 0 5.15 10a2.67 2.67 0 0 0 2.67 2.667m2.67 0H7.82m2.67 0v2.666A2.67 2.67 0 0 1 7.82 18a2.67 2.67 0 0 1-2.67-2.667 2.67 2.67 0 0 1 2.67-2.666m5.34-5.334A2.67 2.67 0 0 0 10.49 10a2.67 2.67 0 0 0 2.67 2.667A2.67 2.67 0 0 0 15.83 10a2.67 2.67 0 0 0-2.67-2.667Z'
              />
            </svg>
          </div>
          <div
            key={activeTab === 3 ? 'a3' : 'i3'}
            className={`min-w-0 xl:mt-4 xl:!animate-none ${activeTab === 3 ? 'duration-300 animate-in fade-in-0 slide-in-from-bottom-2' : ''}`}
          >
            <div
              className={`flex items-center gap-1.5 truncate text-ln-label-sm transition duration-200 xl:justify-center ${activeTab === 3 ? 'text-ln-gray-900' : 'text-ln-gray-700 group-hover:text-ln-gray-800'}`}
            >
              Aligned with Figma
              <div className='shadow-ln-badge-orange rounded-[5px] bg-ln-orange/[.12] px-[5px] py-[3px] text-ln-subheading-xs text-ln-orange'>
                PRO
              </div>
            </div>
            <div className='mt-1 text-ln-paragraph-sm text-ln-gray-600'>
              <span className='hidden md:inline'>
                Always-updated Figma file library
              </span>
              <span className='md:hidden'>
                Always-updated Figma file library
              </span>
            </div>
          </div>
        </button>

        {/* Mobile nav arrows */}
        <div className='flex items-center gap-2.5 border-l border-ln-gray-200 px-4 xl:hidden'>
          <button
            type='button'
            aria-label='Go Previous'
            onClick={() => setActiveTab((a) => (a - 1 + 4) % 4)}
            className='shadow-ln-button-white flex size-6 shrink-0 items-center justify-center rounded-full bg-ln-gray-0'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
              className='size-5 text-ln-gray-700'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M11.321 13.334 8.577 10.59a.833.833 0 0 1 0-1.179l2.744-2.744'
              />
            </svg>
          </button>
          <button
            type='button'
            aria-label='Go Next'
            onClick={() => setActiveTab((a) => (a + 1) % 4)}
            className='shadow-ln-button-white flex size-6 shrink-0 items-center justify-center rounded-full bg-ln-gray-0'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
              className='size-5 text-ln-gray-700'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='m8.333 13.334 2.744-2.744a.833.833 0 0 0 0-1.179L8.333 6.667'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile: hero-figma preview + "Preview Figma File" CTA */}
      <div className='-mx-[13px] flex h-[542px] flex-col overflow-hidden p-px md:mx-0 xl:hidden'>
        <div
          className='relative flex max-h-full flex-1 origin-bottom flex-col'
          style={{ opacity: 1, transform: 'none' }}
        >
          <div className='relative flex w-full flex-1 flex-col rounded-20 bg-ln-gray-50 ring-1 ring-transparent xl:rounded-[28px]'>
            <div className='flex items-center px-4 py-4 xl:px-6'>
              <div className='flex flex-1 gap-2'>
                <div
                  className='size-2 rounded-full xl:size-2.5'
                  style={{
                    background: 'rgb(237, 106, 94)',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0.75px 0.75px inset',
                  }}
                />
                <div
                  className='size-2 rounded-full xl:size-2.5'
                  style={{
                    background: 'rgb(244, 191, 78)',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0.75px 0.75px inset',
                  }}
                />
                <div
                  className='size-2 rounded-full xl:size-2.5'
                  style={{
                    background: 'rgb(97, 198, 85)',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0.75px 0.75px inset',
                  }}
                />
              </div>
              <div className='hidden items-center gap-1 text-ln-label-sm text-ln-gray-500 xl:flex' />
              <div className='hidden flex-1 justify-end gap-4 xl:flex' />
            </div>
            <div
              className='pointer-events-none absolute -inset-px rounded-[inherit] p-px'
              style={{
                opacity: 0.08,
                background:
                  'linear-gradient(rgb(51, 51, 51), rgba(0, 0, 0, 0))',
                mask: 'linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) exclude, linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) content-box',
              }}
            />
            <div className='w-full flex-1 px-3'>
              <div className='relative size-full overflow-hidden rounded-2xl shadow-ln-xs'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src='/images/1.png'
                  alt=''
                  width={2256}
                  height={1408}
                  className='absolute left-0 top-0 min-w-[860px] object-cover object-left-top'
                />
              </div>
            </div>
            <div className='pointer-events-none absolute -bottom-px left-0 top-12 isolate h-auto w-full'>
              <div
                className='absolute inset-0'
                style={{
                  background:
                    'linear-gradient(rgba(247, 247, 247, 0) 0%, rgb(247, 247, 247) 64%)',
                }}
              />
            </div>
            <div className='absolute inset-x-0 bottom-8 z-10 flex flex-col items-center text-center'>
              <div className='relative flex size-[72px] items-center justify-center overflow-hidden rounded-full ring-1 ring-inset ring-ln-gray-100'>
                <div
                  className='absolute inset-0 size-[72px] animate-spin rounded-full p-px'
                  style={{
                    animationDirection: 'reverse',
                    animationDuration: '3s',
                    background:
                      'conic-gradient(rgb(240, 80, 35), rgba(240, 80, 35, 0) 180deg, transparent 180deg)',
                    mask: 'linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) exclude, linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) content-box',
                  }}
                />
                <div className='flex size-12 items-center justify-center rounded-full bg-ln-gray-0 shadow-ln-toggle-active'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'
                    className='size-6 text-ln-orange'
                  >
                    <path
                      stroke='currentColor'
                      strokeWidth='1.25'
                      d='M9.99 2H7.32a2.67 2.67 0 0 0-2.67 2.667 2.67 2.67 0 0 0 2.67 2.666M9.99 2v5.333M9.99 2h2.67a2.67 2.67 0 0 1 2.67 2.667 2.67 2.67 0 0 1-2.67 2.666m-2.67 0H7.32m2.67 0v5.334m0-5.334h2.67m-5.34 0A2.67 2.67 0 0 0 4.65 10a2.67 2.67 0 0 0 2.67 2.667m2.67 0H7.32m2.67 0v2.666A2.67 2.67 0 0 1 7.32 18a2.67 2.67 0 0 1-2.67-2.667 2.67 2.67 0 0 1 2.67-2.666m5.34-5.334A2.67 2.67 0 0 0 9.99 10a2.67 2.67 0 0 0 2.67 2.667A2.67 2.67 0 0 0 15.33 10a2.67 2.67 0 0 0-2.67-2.667Z'
                    />
                  </svg>
                </div>
              </div>
              <div className='mt-4 text-ln-label-lg text-ln-gray-800'>
                Preview Figma File
              </div>
              <div className='mt-1 text-balance text-ln-paragraph-md text-ln-gray-600'>
                Explore 8000+ components, unique widgets,
                <br />
                dashboards, and others.
              </div>
              <div className='mt-6 flex justify-center'>
                <a
                  className='inline-flex h-11 items-center justify-center gap-3.5 rounded-[13px] bg-ln-gray-900 px-[18px] text-ln-label-sm text-ln-gray-0 shadow-ln-button-gray transition-colors hover:bg-ln-gray-800'
                  href='https://figma.alignui.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='flex items-center gap-1'>
                    <span>Explore </span>
                    <span className='text-ln-paragraph-sm text-ln-gray-0 opacity-[.32]'>
                      -
                    </span>
                    <span className='text-ln-paragraph-sm text-ln-gray-0 opacity-[.72]'>
                      on the Figma
                    </span>
                  </span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'
                    className='-mx-1.5 size-5 shrink-0 text-ln-gray-500'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      d='m8.333 13.334 2.744-2.744a.833.833 0 0 0 0-1.179L8.333 6.667'
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: code editor mockup */}
      <div className='relative mt-8 hidden xl:block'>
        <div className='duration-450 ease-nc relative origin-bottom transition'>
          <div className='w-full rounded-20 bg-ln-gray-25 ring-1 ring-ln-gray-200 xl:rounded-[28px]'>
            <div className='flex items-center px-4 py-4 xl:px-6'>
              <div className='flex flex-1 gap-2'>
                <div
                  className='size-2 rounded-full xl:size-2.5'
                  style={{
                    background: 'rgb(237, 106, 94)',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0.75px 0.75px inset',
                  }}
                />
                <div
                  className='size-2 rounded-full xl:size-2.5'
                  style={{
                    background: 'rgb(244, 191, 78)',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0.75px 0.75px inset',
                  }}
                />
                <div
                  className='size-2 rounded-full xl:size-2.5'
                  style={{
                    background: 'rgb(97, 198, 85)',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0.75px 0.75px inset',
                  }}
                />
              </div>
              <div className='hidden items-center gap-1 text-ln-label-sm text-ln-gray-500 xl:flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 15 14'
                  className='size-3.5 text-[#bbb]'
                >
                  <path
                    fill='currentColor'
                    fillRule='evenodd'
                    d='M7.5 1.313a2.917 2.917 0 0 0-2.917 2.916V5.25h-.146c-.885 0-1.604.718-1.604 1.604v4.375c0 .886.719 1.604 1.604 1.604h6.125c.886 0 1.605-.718 1.605-1.604V6.854c0-.886-.719-1.604-1.604-1.604h-.146V4.23A2.917 2.917 0 0 0 7.5 1.311ZM9.542 5.25V4.23a2.042 2.042 0 1 0-4.084 0v1.02z'
                    clipRule='evenodd'
                  />
                </svg>
                alignui.com
              </div>
              <div className='hidden flex-1 justify-end gap-4 xl:flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  className='size-[18px] text-ln-gray-300'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.25'
                    d='M9 2.813v8.437m0-8.438 3.375 3.376M9 2.813 5.625 6.187m9.563 3.375v4.126a1.5 1.5 0 0 1-1.5 1.5H4.312a1.5 1.5 0 0 1-1.5-1.5V9.561'
                  />
                </svg>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 18 18'
                  className='size-[18px] text-ln-gray-300'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.125'
                    d='M9 2.813V9m0 0v6.188M9 9H2.813M9 9h6.188'
                  />
                </svg>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 19 18'
                  className='size-[18px] text-ln-gray-300'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.25'
                    d='M12.073 6.563V3c0-.518-.443-.938-.99-.938H3.167c-.547 0-.99.42-.99.938v7.5c0 .518.443.938.99.938h3.76m.99-4.876h7.916c.547 0 .99.42.99.938V15c0 .518-.443.938-.99.938H7.917c-.547 0-.99-.42-.99-.938V7.5c0-.518.443-.938.99-.938'
                  />
                </svg>
              </div>
            </div>
            <div className='p-2.5 pt-0'>
              <div className='relative'>
                <div
                  className='relative w-full origin-bottom rounded-20 bg-ln-gray-50'
                  style={{
                    boxShadow: 'rgba(0, 0, 0, 0.04) 0px 0.75px 0.75px inset',
                  }}
                >
                  <div className='flex items-center px-1.5 py-3'>
                    <div className='flex w-60 shrink-0 items-center gap-1 border-r border-ln-gray-200 px-5'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 20 20'
                        className='size-5 text-ln-gray-300'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='1.25'
                          d='M4 6.161v7.678C4 14.48 4.58 15 5.297 15h9.406c.716 0 1.297-.52 1.297-1.161V7.903c0-.641-.58-1.161-1.297-1.161h-4.009c-.433 0-.839-.194-1.08-.517l-.526-.708A1.34 1.34 0 0 0 8.008 5h-2.71C4.58 5 4 5.52 4 6.161'
                        />
                      </svg>
                      <span className='font-mono text-ln-label-sm text-ln-gray-450'>
                        alignui-library
                      </span>
                      <div
                        className='shadow-ln-badge-gray rounded-[5px] bg-ln-gray-100 px-1 py-[3px] text-ln-subheading-xs text-ln-gray-500'
                        style={{
                          boxShadow:
                            'rgba(61, 61, 61, 0.12) 0px 0px 0px 1px, rgba(255, 255, 255, 0.64) 0px 0.75px 0.75px inset',
                        }}
                      >
                        V1.0
                      </div>
                    </div>
                    <div className='flex flex-1 items-center gap-1 border-r border-ln-gray-200 px-5'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 16 16'
                        className='size-5 text-ln-gray-300'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinejoin='round'
                          d='m6.095 3.645 1.462-1.462a.626.626 0 0 1 .886 0l1.462 1.462a.626.626 0 0 1 0 .886L8.443 5.993a.626.626 0 0 1-.886 0L6.095 4.53a.626.626 0 0 1 0-.886Zm0 7.825 1.462-1.463a.626.626 0 0 1 .886 0l1.462 1.462a.626.626 0 0 1 0 .886l-1.462 1.462a.626.626 0 0 1-.886 0l-1.462-1.462a.626.626 0 0 1 0-.886ZM2.183 7.557l1.462-1.462a.626.626 0 0 1 .886 0l1.462 1.462a.626.626 0 0 1 0 .886L4.53 9.905a.626.626 0 0 1-.886 0L2.183 8.443a.626.626 0 0 1 0-.886Zm7.824 0 1.462-1.462a.626.626 0 0 1 .886 0l1.462 1.462a.626.626 0 0 1 0 .886l-1.462 1.462a.626.626 0 0 1-.886 0l-1.462-1.462a.626.626 0 0 1 0-.886Z'
                        />
                      </svg>
                      <span className='font-mono text-ln-label-sm text-ln-gray-450'>
                        button.tsx
                      </span>
                    </div>
                    <div className='flex w-[340px] shrink-0 items-center gap-1 px-5'>
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
                      <span className='font-mono text-ln-label-sm text-ln-gray-450'>
                        preview
                      </span>
                    </div>
                  </div>
                  <div className='p-1.5 pt-0 !font-sans'>
                    <div className='relative flex h-[508px] overflow-hidden rounded-2xl bg-ln-gray-0'>
                      <div className='flex h-full w-full items-center justify-center text-ln-gray-500'>
                        <div className='text-center'>
                          <div className='mb-2 text-ln-title-h6 text-ln-gray-800'>
                            Code editor preview
                          </div>
                          <div className='text-ln-paragraph-sm'>
                            Interactive code editor would appear here
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Try live editor overlay */}
        <button type='button' className='absolute -inset-px top-24 z-40'>
          <div className='pointer-events-none isolate h-full w-full'>
            <div
              className='absolute inset-0'
              style={{
                background:
                  'linear-gradient(rgba(247, 247, 247, 0) 0%, rgb(247, 247, 247) 65%)',
              }}
            />
          </div>
          <div className='absolute inset-0 z-20 flex items-end justify-center py-8'>
            <div
              className='relative flex w-80 flex-col items-center text-center'
              style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}
            >
              <div className='relative flex size-16 items-center justify-center overflow-hidden rounded-full ring-1 ring-inset ring-ln-gray-100'>
                <div
                  className='absolute inset-0 size-16 animate-spin rounded-full p-px'
                  style={{
                    animationDirection: 'reverse',
                    animationDuration: '3s',
                    background:
                      'conic-gradient(rgb(240, 80, 35), rgba(240, 80, 35, 0) 180deg, transparent 180deg)',
                    mask: 'linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) exclude, linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) content-box',
                  }}
                />
                <div
                  className='flex size-12 items-center justify-center rounded-full bg-ln-gray-0 text-ln-orange'
                  style={{
                    boxShadow:
                      'rgba(116, 27, 2, 0.06) 0px 4px 8px, rgba(116, 27, 2, 0.04) 0px 2px 4px, rgba(116, 27, 2, 0.04) 0px 1px 2px, rgba(240, 80, 35, 0.08) 0px -0.5px 0.5px inset',
                  }}
                >
                  <span className='text-ln-label-sm'>⌘</span>
                </div>
              </div>
              <div className='mt-4 text-ln-title-h6 text-[#3D3D3D]'>
                Try live editor
              </div>
              <div className='mt-1 text-ln-paragraph-sm text-[#7A7A7A]'>
                Click on the button to use the code editor
              </div>
              <div className='mt-6 flex h-8 items-center gap-0.5 rounded-[11px] bg-ln-gray-900 pl-[14px] pr-[6px] text-ln-label-sm text-ln-gray-0 shadow-ln-button-gray transition-colors hover:bg-ln-gray-800'>
                Try live
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                  className='size-5 text-ln-gray-500'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='square'
                    strokeWidth='1.25'
                    d='M8.333 13.333 11.667 10 8.333 6.667'
                  />
                </svg>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
