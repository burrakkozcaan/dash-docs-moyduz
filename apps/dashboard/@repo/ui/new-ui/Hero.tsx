'use client';

import dynamic from 'next/dynamic';

const HeroBackground = dynamic(() => import('@/components/HeroBackground'), {
  ssr: false,
});

export default function Hero() {
  return (
    <>
      <div className='relative overflow-hidden'>
        <div className='relative flex min-h-[60vh] w-full flex-col items-start px-4 pt-11 md:items-center md:px-0 md:pt-20'>
          {/* Arka planda sadece HeroBackground */}

          <div className='pointer-events-none absolute inset-0 -z-10'>
            <HeroBackground />
          </div>

          <div className='flex flex-col gap-3 rounded-full ring-ln-gray-200 md:flex-row md:items-center md:bg-ln-gray-25 md:px-2 md:py-1.5 md:ring-1'>
            <div className='flex shrink-0 -space-x-1'>
              <img
                src='/images/1.png'
                width={24}
                height={24}
                alt=''
                style={{ background: '#D3B496' }}
                className='size-7 rounded-full ring-2 ring-ln-gray-25 md:size-6'
              />
              <img
                src='/images/2.png'
                width={24}
                height={24}
                alt=''
                style={{ background: '#D3CC96' }}
                className='size-7 rounded-full ring-2 ring-ln-gray-25 md:size-6'
              />
              <img
                src='/images/3.png'
                width={24}
                height={24}
                alt=''
                style={{ background: '#A1BBCD' }}
                className='size-7 rounded-full ring-2 ring-ln-gray-25 md:size-6'
              />
              <img
                src='/images/4.png'
                width={24}
                height={24}
                alt=''
                style={{ background: '#A7CDAE' }}
                className='size-7 rounded-full ring-2 ring-ln-gray-25 md:size-6'
              />
            </div>
            <div className='relative hidden h-4 w-0 before:absolute before:inset-y-0 before:w-px before:bg-ln-gray-200 md:block' />
            <p className='text-ln-paragraph-sm text-ln-gray-600 md:pr-1.5'>
              Trusted by{/* */}{' '}
              <span className='text-ln-label-sm text-ln-gray-900'>2,000+</span>{' '}
              Figma users for seamless design!
            </p>
          </div>
          <h1 className='font-550 md:text-ln-title-h3 xl:text-ln-title-h1 mt-3 text-[34px]/[40px] -tracking-[0.022em] text-ln-gray-900 md:mt-5 md:text-center'>
            <div className='whitespace-nowrap'>
              <span>Founder &amp; Startup</span>
              <span
                style={{ color: '#F05023' }}
                className='jsx-1cdd4e77911232a7 blinkingCursor blinking'
              >
                |
              </span>
            </div>
            perfectly aligned
          </h1>
          <p className='mt-4 text-pretty text-ln-paragraph-md text-ln-gray-700 md:mt-6 md:text-center xl:text-ln-paragraph-lg'>
            Flexible components, consistent UI, quick development, easy
            integration.
          </p>
          <div className='mt-4 flex items-center justify-center whitespace-nowrap md:mt-7 md:gap-1.5'>
            <div className='flex items-center gap-1.5 xl:gap-2.5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
                className='size-5'
              >
                <path
                  fill='#23B2E7'
                  d='M16.444 6.834a14 14 0 0 0-.644-.205q.055-.226.1-.444c.487-2.393.168-4.321-.92-4.956-1.043-.609-2.75.026-4.473 1.543q-.248.219-.498.462-.165-.16-.331-.31C7.872 1.304 6.06.62 4.974 1.257c-1.042.61-1.35 2.422-.912 4.69q.063.33.148.67-.385.11-.74.236C1.352 7.599 0 8.769 0 9.983c0 1.254 1.452 2.511 3.657 3.274q.262.09.54.171-.09.37-.156.722c-.418 2.229-.092 3.998.948 4.605 1.074.626 2.876-.018 4.63-1.57q.209-.183.418-.388.27.264.54.499c1.7 1.48 3.38 2.077 4.418 1.468 1.072-.628 1.421-2.529.969-4.841a12 12 0 0 0-.12-.541q.19-.057.371-.118C18.508 12.496 20 11.254 20 9.983c0-1.218-1.396-2.397-3.556-3.149m-.497 5.61q-.165.055-.336.106a20 20 0 0 0-1.013-2.563c.399-.87.727-1.72.973-2.525q.308.09.595.19c1.85.644 2.98 1.597 2.98 2.331 0 .782-1.22 1.797-3.2 2.46Zm-.822 1.646c.2 1.023.229 1.948.096 2.67-.119.65-.358 1.083-.654 1.256-.63.37-1.979-.11-3.432-1.376q-.25-.218-.503-.463a20 20 0 0 0 1.676-2.154c.967-.086 1.88-.228 2.709-.422q.06.25.108.49Zm-8.307 3.863c-.615.22-1.106.226-1.402.053-.631-.368-.893-1.789-.536-3.695q.062-.327.146-.671c.82.183 1.726.315 2.696.394a21 21 0 0 0 1.716 2.146q-.19.187-.38.355c-.777.686-1.554 1.173-2.24 1.418m-2.885-5.514c-.975-.337-1.78-.775-2.332-1.254-.496-.43-.747-.856-.747-1.202 0-.737 1.086-1.676 2.897-2.315q.33-.116.688-.22c.25.824.579 1.685.975 2.556a21 21 0 0 0-.987 2.591 11 11 0 0 1-.494-.156m.968-6.659c-.376-1.943-.127-3.409.501-3.776.67-.392 2.15.166 3.709 1.567q.15.135.3.28a21 21 0 0 0-1.704 2.133 21 21 0 0 0-2.669.42q-.078-.318-.137-.624m8.627 2.155a28 28 0 0 0-.609-1.012c.639.082 1.25.19 1.824.323a19 19 0 0 1-.64 1.742 30 30 0 0 0-.575-1.053M10.009 4.47c.395.432.79.914 1.178 1.437a25 25 0 0 0-2.364 0q.584-.78 1.186-1.437M6.47 7.94a26 26 0 0 0-.565 1.046 19 19 0 0 1-.635-1.75c.57-.13 1.179-.235 1.813-.315q-.315.497-.613 1.019m.631 5.165a18 18 0 0 1-1.843-.3c.177-.577.394-1.176.648-1.786A26 26 0 0 0 7.1 13.106Zm2.933 2.452c-.405-.442-.809-.93-1.203-1.457a30 30 0 0 0 2.377-.004c-.39.535-.782 1.025-1.174 1.461m4.078-4.57q.403.927.672 1.78c-.58.134-1.206.242-1.866.322a31 31 0 0 0 1.194-2.101Zm-1.32.641a28 28 0 0 1-.96 1.566q-.892.065-1.831.065-.935 0-1.81-.058a24.4 24.4 0 0 1-1.83-3.198 24 24 0 0 1 1.82-3.193 24 24 0 0 1 3.646 0 28.5 28.5 0 0 1 1.826 3.18 26 26 0 0 1-.861 1.638m1.762-9.651c.67.39.93 1.966.51 4.032q-.04.198-.09.402a20 20 0 0 0-2.674-.427 20 20 0 0 0-1.69-2.134q.23-.225.46-.427c1.476-1.3 2.856-1.813 3.484-1.446M10 8.176c.986 0 1.786.81 1.786 1.807 0 .998-.8 1.806-1.786 1.806a1.796 1.796 0 0 1-1.786-1.806c0-.998.8-1.807 1.786-1.807'
                />
              </svg>
              <span className='text-ln-paragraph-sm text-ln-gray-600 xl:text-ln-paragraph-md'>
                Built for{/* */}{' '}
                <span className='font-medium text-ln-gray-800'>React</span>
              </span>
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
              className='size-5 text-ln-gray-300'
            >
              <path
                fill='currentColor'
                d='M10.003 11.108a1.183 1.183 0 0 1-1.176-1.176c0-.644.532-1.176 1.176-1.176s1.176.532 1.176 1.176-.532 1.176-1.176 1.176'
              />
            </svg>
            <div className='flex items-center gap-1.5 xl:gap-2.5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
                className='size-5'
              >
                <path
                  fill='#23B2E7'
                  fillRule='evenodd'
                  d='M10 5Q6 5 5 8.334q1.5-1.668 3.5-1.25c.76.158 1.305.618 1.906 1.127C11.386 9.041 12.522 10 15 10q4 0 5-3.333-1.5 1.667-3.5 1.25c-.76-.159-1.305-.619-1.906-1.128C13.614 5.96 12.479 5 10 5m-5 5q-4 0-5 3.334 1.5-1.668 3.5-1.25c.76.158 1.305.618 1.906 1.127C6.386 14.041 7.521 15 10 15q4 0 5-3.333-1.5 1.667-3.5 1.25c-.76-.159-1.305-.619-1.906-1.128C8.614 10.96 7.478 10 5 10'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-ln-paragraph-sm text-ln-gray-600 xl:text-ln-paragraph-md'>
                Styled with{/* */}{' '}
                <span className='font-medium text-ln-gray-800'>
                  TailwindCSS
                </span>
              </span>
            </div>
          </div>
          <div className='mt-8 flex justify-center'>
            <a
              className='group relative inline-flex h-11 items-center justify-center gap-3.5 whitespace-nowrap rounded-[13px] bg-ln-gray-900 px-[18px] text-ln-label-sm text-ln-gray-0 shadow-ln-button-gray outline-none transition duration-200 ease-out hover:bg-ln-gray-800 focus:outline-none disabled:pointer-events-none disabled:bg-ln-gray-25 disabled:text-ln-gray-450 disabled:shadow-none'
              href='/docs/v1.2/introduction'
            >
              <span className='flex items-center gap-1'>
                <span>Get Started</span>
                <span className='text-ln-paragraph-sm text-ln-gray-700'>-</span>
                <span className='text-ln-paragraph-sm text-ln-gray-500'>
                  It&apos;s free
                </span>
              </span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
                className='-mx-1.5 size-5 shrink-0 text-ln-gray-500 group-disabled:text-ln-gray-450'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='square'
                  strokeWidth='1.25'
                  d='M8.333 13.333 11.667 10 8.333 6.667'
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
