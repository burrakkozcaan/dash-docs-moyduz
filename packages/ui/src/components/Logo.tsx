import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "default" | "dark";
}

export const Logo = ({ className, variant = "default" }: LogoProps) => {
  return (
    <div className={`flex items-end gap-0.5 ${className || ""}`}>
      {/* Wrapper sabit oranlı olsun */}
      <div className="relative  h-[18px] flex-shrink-0 flex items-center ">
        {/* Light mode logo */}
        <Link href="/" className="mb-5">
          <div className="z-10 inline-flex cursor-pointer rounded-xl items-center gap-2  text-center shadow-lg shadow-[#26bd6c]"></div>

          <svg
            width="22"
            height="22"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_242_824)">
              <path
                d="M4 7.5C4 5.51088 4.79018 3.60322 6.1967 2.1967C7.60322 0.790176 9.51088 0 11.5 0H25.5C27.4891 0 29.3968 0.790176 30.8033 2.1967C32.2098 3.60322 33 5.51088 33 7.5V11H22.508C20.5189 11 18.6112 11.7902 17.2047 13.1967C15.7982 14.6032 15.008 16.5109 15.008 18.5V29H11.5C10.5151 29 9.53982 28.806 8.62987 28.4291C7.71993 28.0522 6.89314 27.4997 6.1967 26.8033C5.50026 26.1069 4.94781 25.2801 4.5709 24.3701C4.19399 23.4602 4 22.4849 4 21.5V7.5Z"
                fill="currentColor"
              />
              <path
                d="M15.0078 29H25.4998C26.4847 29 27.46 28.806 28.3699 28.4291C29.2799 28.0522 30.1067 27.4997 30.8031 26.8033C31.4996 26.1069 32.052 25.2801 32.4289 24.3701C32.8058 23.4602 32.9998 22.4849 32.9998 21.5V11H36.5078C38.4969 11 40.4046 11.7902 41.8111 13.1967C43.2176 14.6032 44.0078 16.5109 44.0078 18.5V32.5C44.0078 34.4891 43.2176 36.3968 41.8111 37.8033C40.4046 39.2098 38.4969 40 36.5078 40H22.5078C20.5187 40 18.611 39.2098 17.2045 37.8033C15.798 36.3968 15.0078 34.4891 15.0078 32.5V29Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_242_824"
                x="0"
                y="0"
                width="48.0078"
                height="48"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_242_824"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_242_824"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </Link>
        {/* <Image
          src="/un.svg"
          alt="Panel management"
          fill
          className={`object-contain ${
            variant === "dark" ? "hidden" : "block dark:hidden"
          }`}
          sizes="72px"
        /> */}

        {/* Dark mode logo */}
        {/* <Image
          src="/un.svg"
          alt="Panel management"
          fill
          className={`object-contain ${
            variant === "dark" ? "block" : "hidden dark:block"
          }`}
          sizes="72px"
        /> */}
        {/* <span className="text-[7px]  font-medium text-white leading-none select-none pt-0.4 -mb-4 ml-8">
          ®
        </span> */}
      </div>
      {/* <span className="text-sm font-medium text-white leading-none select-none p-1">
        Moydus
      </span> */}
    </div>
  );
};
