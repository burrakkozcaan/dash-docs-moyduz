 "use client";

import * as React from "react";
import * as Modal from "@/components/new-ui/modal";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content
        showClose={false}
        className="flex w-full items-end overflow-hidden transition-transform duration-400 ease-out lg:h-[720px] lg:max-h-[80vh] lg:w-[918px] lg:items-center lg:gap-1.5 lg:rounded-[28px] lg:bg-bg-white-0 lg:p-1.5 lg:shadow-complex xl:h-[720px] xl:w-[1158px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {/* Left navigation column */}
        <div className="flex h-dvh w-full flex-col rounded-t-3xl bg-bg-white-0 py-4 lg:h-full lg:min-h-full lg:w-1/5 lg:min-w-60 lg:rounded-none lg:p-3.5">
          {/* Mobile header */}
          <div className="flex w-full flex-shrink-0 lg:hidden">
            <div className="flex w-full justify-between gap-4 px-0 lg:px-7">
              <div className="flex w-full items-center justify-between border-b border-stroke-soft-200 px-5 pb-5 lg:px-0 lg:pb-7">
                <div className="flex flex-col gap-1">
                  <h2 className="text-sm font-medium tracking-spacing-tiny-2 text-text-strong-950">
                    Settings
                  </h2>
                  <p className="text-xs font-medium tracking-spacing-tiny-2 text-text-soft-400 lg:text-sm">
                    Manage your workspace ownership and settings.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="group relative inline-flex size-6 cursor-pointer items-center justify-center gap-3 rounded-md bg-bg-white-0 px-3 text-label-sm text-static-white outline-none transition duration-200 ease-out hover:bg-bg-weak-50 focus:outline-none focus-visible:shadow-button-primary-focus"
                >
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon -mx-1 flex size-4.5 shrink-0 items-center justify-center text-text-soft-400 duration-200 ease group-hover:text-text-sub-600"
                  >
                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Nav groups */}
          <div className="flex min-h-0 w-full flex-1 flex-col gap-4 overflow-y-auto lg:gap-3">
            {/* Workspace */}
            <div className="border-t-0 border-t border-stroke-soft-200 flex flex-col gap-1 pt-4 lg:border-none lg:pt-0">
              <div className="px-7 py-1 text-xs font-medium text-text-soft-400 lg:px-2">
                Workspace
              </div>
              <div className="flex flex-col gap-1 px-4 lg:px-0">
                <div className="group flex cursor-pointer items-center gap-2 rounded-10 bg-bg-weak-50 p-2 text-sm font-medium text-text-strong-950 transition-colors duration-200">
                  <div className="ease flex size-5 items-center justify-center rounded-full bg-gray-200 transition duration-200">
                    <div className="text-xs font-medium text-static-black">J</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="ease text-sm font-medium text-text-strong-950 transition duration-200">
                      James Brown
                    </div>
                    <div className="rounded-[5px] bg-feature-lighter px-1.5 py-0.5 text-2xs font-semibold uppercase text-feature-base">
                      PRO
                    </div>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon ml-auto size-4 text-text-soft-400"
                  >
                    <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                  </svg>
                </div>
                <div className="group flex cursor-pointer items-center gap-2 rounded-10 p-2 text-sm font-medium text-text-sub-600 transition-colors duration-200 hover:bg-bg-weak-50 hover:text-text-sub-600">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon size-5 text-text-disabled-300 transition duration-200 ease group-hover:text-text-soft-400"
                  >
                    <path d="M16 2L21 7V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918C3 2.44405 3.44495 2 3.9934 2H16ZM12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5ZM7.52746 17H16.4725C16.2238 14.75 14.3163 13 12 13C9.68372 13 7.77619 14.75 7.52746 17Z" />
                  </svg>
                  People
                </div>
                <div className="group flex cursor-pointer items-center gap-2 rounded-10 p-2 text-sm font-medium text-text-sub-600 transition-colors duration-200 hover:bg-bg-weak-50 hover:text-text-sub-600">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon size-5 text-text-disabled-300 transition duration-200 ease group-hover:text-text-soft-400"
                  >
                    <path d="M22.0049 9.99979V19.9998C22.0049 20.5521 21.5572 20.9998 21.0049 20.9998H3.00488C2.4526 20.9998 2.00488 20.5521 2.00488 19.9998V9.99979H22.0049ZM22.0049 7.99979H2.00488V3.99979C2.00488 3.4475 2.4526 2.99979 3.00488 2.99979H21.0049C21.5572 2.99979 22.0049 3.4475 22.0049 3.99979V7.99979ZM15.0049 15.9998V17.9998H19.0049V15.9998H15.0049Z" />
                  </svg>
                  Plans &amp; Billing
                </div>
              </div>
            </div>

            {/* Account */}
            <div className="border-t border-stroke-soft-200 flex flex-col gap-1 pt-4 lg:border-none lg:pt-0">
              <div className="px-7 py-1 text-xs font-medium text-text-soft-400 lg:px-2">
                Account
              </div>
              <div className="flex flex-col gap-1 px-4 lg:px-0">
                <div className="group flex cursor-pointer items-center gap-2 rounded-10 p-2 text-sm font-medium text-text-sub-600 transition-colors duration-200 hover:bg-bg-weak-50 hover:text-text-sub-600">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon size-5 text-text-disabled-300 transition duration-200 ease group-hover:text-text-soft-400"
                  >
                    <path d="M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z" />
                  </svg>
                  Profile
                </div>
                <div className="group flex cursor-pointer items-center gap-2 rounded-10 p-2 text-sm font-medium text-text-sub-600 transition-colors duration-200 hover:bg-bg-weak-50 hover:text-text-sub-600">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon size-5 text-text-disabled-300 transition duration-200 ease group-hover:text-text-soft-400"
                  >
                    <path d="M5.33409 4.54491C6.3494 3.63637 7.55145 2.9322 8.87555 2.49707C9.60856 3.4128 10.7358 3.99928 12 3.99928C13.2642 3.99928 14.3914 3.4128 15.1245 2.49707C16.4486 2.9322 17.6506 3.63637 18.6659 4.54491C18.2405 5.637 18.2966 6.90531 18.9282 7.99928C19.5602 9.09388 20.6314 9.77679 21.7906 9.95392C21.9279 10.6142 22 11.2983 22 11.9993C22 12.7002 21.9279 13.3844 21.7906 14.0446C20.6314 14.2218 19.5602 14.9047 18.9282 15.9993C18.2966 17.0932 18.2405 18.3616 18.6659 19.4536C17.6506 20.3622 16.4486 21.0664 15.1245 21.5015C14.3914 20.5858 13.2642 19.9993 12 19.9993C10.7358 19.9993 9.60856 20.5858 8.87555 21.5015C7.55145 21.0664 6.3494 20.3622 5.33409 19.4536C5.75952 18.3616 5.7034 17.0932 5.0718 15.9993C4.43983 14.9047 3.36862 14.2218 2.20935 14.0446C2.07212 13.3844 2 12.7002 2 11.9993C2 11.2983 2.07212 10.6142 2.20935 9.95392C3.36862 9.77679 4.43983 9.09388 5.0718 7.99928C5.7034 6.90531 5.75952 5.637 5.33409 4.54491ZM13.5 14.5974C14.9349 13.7689 15.4265 11.9342 14.5981 10.4993C13.7696 9.0644 11.9349 8.57277 10.5 9.4012C9.06512 10.2296 8.5735 12.0644 9.40192 13.4993C10.2304 14.9342 12.0651 15.4258 13.5 14.5974Z" />
                  </svg>
                  Preferences
                </div>
                <div className="group flex cursor-pointer items-center gap-2 rounded-10 p-2 text-sm font-medium text-text-sub-600 transition-colors duration-200 hover:bg-bg-weak-50 hover:text-text-sub-600">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon size-5 text-text-disabled-300 transition duration-200 ease group-hover:text-text-soft-400"
                  >
                    <path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z" />
                  </svg>
                  Appearance
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="border-t border-stroke-soft-200 flex flex-col gap-1 pt-4 lg:border-none lg:pt-0">
              <div className="px-7 py-1 text-xs font-medium text-text-soft-400 lg:px-2">
                Security
              </div>
              <div className="flex flex-col gap-1 px-4 lg:px-0">
                <div className="group flex cursor-pointer items-center gap-2 rounded-10 p-2 text-sm font-medium text-text-sub-600 transition-colors duration-200 hover:bg-bg-weak-50 hover:text-text-sub-600">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon size-5 text-text-disabled-300 transition duration-200 ease group-hover:text-text-soft-400"
                  >
                    <path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM11 15.7324V18H13V15.7324C13.5978 15.3866 14 14.7403 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 14.7403 10.4022 15.3866 11 15.7324ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z" />
                  </svg>
                  Security
                </div>
                <div className="group flex cursor-pointer items-center gap-2 rounded-10 p-2 text-sm font-medium text-text-sub-600 transition-colors duration-200 hover:bg-bg-weak-50 hover:text-text-sub-600">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon size-5 text-text-disabled-300 transition duration-200 ease group-hover:text-text-soft-400"
                  >
                    <path d="M3.78307 2.82598L12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598ZM12 11C13.3807 11 14.5 9.88071 14.5 8.5C14.5 7.11929 13.3807 6 12 6C10.6193 6 9.5 7.11929 9.5 8.5C9.5 9.88071 10.6193 11 12 11ZM7.52746 16H16.4725C16.2238 13.75 14.3163 12 12 12C9.68372 12 7.77619 13.75 7.52746 16Z" />
                  </svg>
                  Privacy &amp; Data
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-stroke-soft-200 flex flex-col gap-1 pt-4 pb-3 lg:border-none lg:pt-0">
              <div className="px-7 py-1 text-xs font-medium text-text-soft-400 lg:px-2">
                Features
              </div>
              <div className="flex flex-col gap-1 px-4 lg:px-0">
                <div className="group flex cursor-pointer items-center gap-2 rounded-10 p-2 text-sm font-medium text-text-sub-600 transition-colors duration-200 hover:bg-bg-weak-50 hover:text-text-sub-600">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon size-5 text-text-disabled-300 transition duration-200 ease group-hover:text-text-soft-400"
                  >
                    <path d="M11 2.53513C10.4117 2.19479 9.72857 2 9 2 6.79086 2 5 3.79086 5 6V7.77422C4.14895 8.11644 3.45143 8.64785 2.94126 9.34933 2.29239 10.2415 2 11.3347 2 12.5 2 14.0614 2.79529 15.4356 4 16.242V17.5C4 19.9853 6.01472 22 8.5 22 9.42507 22 10.285 21.7209 11 21.2422V17.5C11 16.167 10.67 15.3147 10.1402 14.7408 9.59743 14.1528 8.71622 13.7165 7.3356 13.4864L7.6644 11.5136C8.96602 11.7305 10.1058 12.1373 11 12.8271V2.53513ZM13 2.53513V12.8271C13.8942 12.1373 15.034 11.7305 16.3356 11.5136L16.6644 13.4864C15.2838 13.7165 14.4026 14.1528 13.8598 14.7408 13.33 15.3147 13 16.167 13 17.5V21.2422C13.715 21.7209 14.5749 22 15.5 22 17.9853 22 20 19.9853 20 17.5V16.242C21.2047 15.4356 22 14.0614 22 12.5 22 11.3347 21.7076 10.2415 21.0587 9.34933 20.5486 8.64785 19.8511 8.11644 19 7.77422V6C19 3.79086 17.2091 2 15 2 14.2714 2 13.5883 2.19479 13 2.53513Z" />
                  </svg>
                  AI Settings
                </div>
                <div className="group flex cursor-pointer items-center gap-2 rounded-10 p-2 text-sm font-medium text-text-sub-600 transition-colors duration-200 hover:bg-bg-weak-50 hover:text-text-sub-600">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon size-5 text-text-disabled-300 transition duration-200 ease group-hover:text-text-soft-400"
                  >
                    <path d="M6.17071 18C6.58254 16.8348 7.69378 16 9 16C10.3062 16 11.4175 16.8348 11.8293 18H22V20H11.8293C11.4175 21.1652 10.3062 22 9 22C7.69378 22 6.58254 21.1652 6.17071 20H2V18H6.17071ZM12.1707 11C12.5825 9.83481 13.6938 9 15 9C16.3062 9 17.4175 9.83481 17.8293 11H22V13H17.8293C17.4175 14.1652 16.3062 15 15 15C13.6938 15 12.5825 14.1652 12.1707 13H2V11H12.1707ZM6.17071 4C6.58254 2.83481 7.69378 2 9 2C10.3062 2 11.4175 2.83481 11.8293 4H22V6H11.8293C11.4175 7.16519 10.3062 8 9 8C7.69378 8 6.58254 7.16519 6.17071 6H2V4H6.17071Z" />
                  </svg>
                  Integrations
                </div>
                <div className="group flex cursor-pointer items-center gap-2 rounded-10 p-2 text-sm font-medium text-text-sub-600 transition-colors duration-200 hover:bg-bg-weak-50 hover:text-text-sub-600">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon size-5 text-text-disabled-300 transition duration-200 ease group-hover:text-text-soft-400"
                  >
                    <path d="M4.7134 7.12811L4.46682 7.69379C4.28637 8.10792 3.71357 8.10792 3.53312 7.69379L3.28656 7.12811C2.84706 6.11947 2.05545 5.31641 1.06767 4.87708L0.308047 4.53922C-0.102682 4.35653 -0.102682 3.75881 0.308047 3.57612L1.0252 3.25714C2.03838 2.80651 2.84417 1.97373 3.27612 0.930828L3.52932 0.319534C3.70578 -0.106511 4.29417 -0.106511 4.47063 0.319534L4.72382 0.930828C5.15577 1.97373 5.96158 2.80651 6.9748 3.25714L7.69188 3.57612C8.10271 3.75881 8.10271 4.35653 7.69188 4.53922L6.93228 4.87708C5.94451 5.31641 5.15288 6.11947 4.7134 7.12811ZM3.06361 21.6132C4.08854 15.422 6.31105 1.99658 21 1.99658C19.5042 4.99658 18.5 6.49658 17.5 7.49658L16.5 8.49658L18 9.49658C17 12.4966 14 15.9966 10 16.4966C7.33146 16.8301 5.66421 18.6635 4.99824 21.9966H3C3.02074 21.8722 3.0419 21.7443 3.06361 21.6132Z" />
                  </svg>
                  Advanced
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right content panel */}
        <div className="bg-overlay-gray visible absolute left-0 top-0 flex h-full w-full flex-1 items-end opacity-100 transition-all duration-400 lg:pointer-events-auto lg:relative lg:h-full lg:bg-transparent lg:opacity-100">
          <div className="shadow-custom-input flex h-[calc(100dvh-32px)] w-full shrink-0 flex-col rounded-t-3xl bg-bg-white-0 pt-5 transition-transform duration-400 ease-out lg:h-full lg:translate-y-0 lg:rounded-3xl lg:bg-transparent lg:pb-7 lg:pt-5.5">
            {/* Desktop header */}
            <div className="flex w-full justify-between gap-4 px-0 lg:px-7">
              <div className="flex w-full items-center justify-between border-b border-stroke-soft-200 px-5 pb-5 lg:px-0 lg:pb-7">
                <div className="flex flex-col gap-1">
                  <h2 className="text-sm font-medium tracking-spacing-tiny-2 text-text-strong-950">
                    Workspace overview
                  </h2>
                  <p className="text-xs font-medium tracking-spacing-tiny-2 text-text-soft-400 lg:text-sm">
                    Manage your workspace ownership and settings.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="group relative inline-flex size-6 cursor-pointer items-center justify-center gap-3 rounded-md bg-bg-white-0 px-3 text-label-sm text-static-white outline-none transition duration-200 ease-out hover:bg-bg-weak-50 focus:outline-none focus-visible:shadow-button-primary-focus"
                >
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon -mx-1 flex size-4.5 shrink-0 items-center justify-center text-text-soft-400 duration-200 ease group-hover:text-text-sub-600"
                  >
                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex h-full w-full flex-col gap-5 overflow-y-auto px-0 pb-8 lg:gap-7 lg:px-7 lg:pb-0">
              {/* Overview section */}
              <div className="flex flex-col gap-5 pt-5 lg:flex-row lg:gap-4 lg:pt-7">
                <div className="flex flex-col gap-1 px-5 lg:max-w-50 lg:min-w-50 lg:px-0 xl:max-w-75 xl:min-w-75">
                  <h3 className="text-sm font-medium tracking-spacing-tiny-2 text-text-strong-950">
                    Overview
                  </h3>
                  <p className="text-xs font-medium text-text-soft-400 lg:text-sm lg:tracking-spacing-tiny-2">
                    Workspace summary and details.
                  </p>
                </div>
                <div className="flex w-full flex-col">
                  <div className="flex flex-col items-start justify-between px-5 lg:flex-row lg:items-center lg:px-0">
                    <div className="mb-3 flex items-center gap-3 lg:mb-0">
                      <div className="flex size-10 items-center justify-center rounded-full bg-neutral-200 text-base font-medium tracking-spacing-tiny-4 text-stroke-strong-950 lg:size-8 lg:text-sm xl:size-10 xl:text-base">
                        JB
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <div className="text-sm font-medium tracking-spacing-tiny-2 text-text-strong-950">
                            James Brown
                          </div>
                          <div className="text-sm font-medium tracking-spacing-tiny-2 text-text-soft-400">
                            (james@gmail.com)
                          </div>
                        </div>
                        <div className="text-xs font-medium text-text-disabled-300">
                          Member since{" "}
                          <span className="text-text-sub-600">May 16, 2025</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-13 inline-flex h-8 w-[calc(100%-52px)] cursor-pointer items-center justify-center gap-2.5 rounded-10 bg-bg-white-0 px-3 text-sm font-medium text-text-sub-600 shadow-regular-xs ring-1 ring-inset ring-stroke-soft-200 outline-none transition duration-200 ease-out hover:bg-bg-weak-50 hover:text-text-strong-950 hover:shadow-none hover:ring-transparent focus-visible:text-text-strong-950 focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950 lg:ml-0 lg:w-fit"
                    >
                      Manage
                    </button>
                  </div>
                  <div className="mt-5 flex flex-col gap-3.5 border-t border-stroke-soft-200 px-5 pt-5 lg:px-0">
                    <div className="flex items-center gap-3">
                      <span className="w-3/5 text-sm font-medium tracking-spacing-tiny-2 text-text-soft-400 lg:w-2/5">
                        Workspace
                      </span>
                      <span className="text-sm font-medium tracking-spacing-tiny-2 text-text-strong-950">
                        Spectrum™
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3/5 text-sm font-medium tracking-spacing-tiny-2 text-text-soft-400 lg:w-2/5">
                        Your role
                      </span>
                      <span className="text-sm font-medium tracking-spacing-tiny-2 text-text-strong-950">
                        Admin
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3/5 text-sm font-medium tracking-spacing-tiny-2 text-text-soft-400 lg:w-2/5">
                        Team members
                      </span>
                      <span className="text-sm font-medium tracking-spacing-tiny-2 text-text-strong-950">
                        3/10 seats
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3/5 text-sm font-medium tracking-spacing-tiny-2 text-text-soft-400 lg:w-2/5">
                        Plan renewal
                      </span>
                      <span className="text-sm font-medium tracking-spacing-tiny-2 text-text-strong-950">
                        June 20, 2025
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div className="flex flex-col gap-5 border-t border-stroke-soft-200 px-5 pt-5 lg:flex-row lg:gap-4 lg:px-0 lg:pt-7">
                <div className="flex flex-col gap-1 lg:max-w-50 lg:min-w-50 xl:max-w-75 xl:min-w-75">
                  <h3 className="text-sm font-medium tracking-spacing-tiny-2 text-text-strong-950">
                    Activity
                  </h3>
                  <p className="text-xs font-medium tracking-spacing-tiny-2 text-text-soft-400 lg:text-sm">
                    Usage analytics and metrics.
                  </p>
                </div>
                <div className="flex w-full flex-wrap gap-4">
                  <div className="flex max-w-3/5 min-w-3/5 flex-col lg:max-w-2/5 lg:min-w-2/5">
                    <span className="text-sm font-medium tracking-spacing-tiny-2 text-text-soft-400">
                      Conversations
                    </span>
                    <span className="text-sm font-medium tracking-spacing-tiny-2 text-text-strong-950">
                      2.847
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium tracking-spacing-tiny-2 text-text-soft-400">
                      Active projects
                    </span>
                    <span className="text-sm font-medium tracking-spacing-tiny-2 text-text-strong-950">
                      59
                    </span>
                  </div>
                  <div className="flex max-w-3/5 min-w-3/5 flex-col lg:max-w-2/5 lg:min-w-2/5">
                    <span className="text-sm font-medium tracking-spacing-tiny-2 text-text-soft-400">
                      Files uploaded
                    </span>
                    <span className="text-sm font-medium tracking-spacing-tiny-2 text-text-strong-950">
                      156
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium tracking-spacing-tiny-2 text-text-soft-400">
                      Storage used
                    </span>
                    <span className="text-sm font-medium tracking-spacing-tiny-2 text-text-strong-950">
                      24%
                    </span>
                  </div>
                </div>
              </div>

              {/* Plan usage */}
              <div className="flex flex-col gap-5 border-t border-stroke-soft-200 px-5 pt-5 lg:flex-row lg:gap-4 lg:px-0 lg:pt-7">
                <div className="flex flex-col gap-1 lg:max-w-50 lg:min-w-50 xl:max-w-75 xl:min-w-75">
                  <h3 className="text-sm font-medium tracking-spacing-tiny-2 text-text-strong-950">
                    Plan usage
                  </h3>
                  <p className="text-xs font-medium tracking-spacing-tiny-2 text-text-soft-400 lg:text-sm">
                    Usage limits and current consumption.
                  </p>
                </div>
                <div className="planUseWrapper flex w-full flex-col gap-3.5 overflow-hidden">
                  {/* Team seats */}
                  <div className="flex items-center gap-2 lg:gap-4">
                    <span className="flex w-2/5 flex-shrink-0 text-sm font-medium tracking-spacing-tiny-2 text-text-soft-400 lg:max-w-2/5 lg:min-w-2/5">
                      Team seats
                    </span>
                    <div className="flex min-w-0 flex-1 items-center gap-2 lg:gap-4">
                      <div className="progressContainer flex min-w-0 flex-1 gap-0.75">
                        {Array.from({ length: 23 }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-3 w-1 flex-shrink-0 rounded-[0.8px] ${
                              idx < 14 ? "bg-purple-500" : "bg-bg-weak-50"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="w-8 flex-shrink-0 text-right text-xs font-medium text-text-soft-400 lg:min-w-10">
                        60%
                      </span>
                    </div>
                  </div>

                  {/* Storage */}
                  <div className="flex items-center gap-2 lg:gap-4">
                    <span className="flex w-2/5 flex-shrink-0 text-sm font-medium tracking-spacing-tiny-2 text-text-soft-400 lg:max-w-2/5 lg:min-w-2/5">
                      Storage
                    </span>
                    <div className="flex min-w-0 flex-1 items-center gap-2 lg:gap-4">
                      <div className="progressContainer flex min-w-0 flex-1 gap-0.75">
                        {Array.from({ length: 23 }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-3 w-1 flex-shrink-0 rounded-[0.8px] ${
                              idx < 2 ? "bg-teal-500" : "bg-bg-weak-50"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="w-8 flex-shrink-0 text-right text-xs font-medium text-text-soft-400 lg:min-w-10">
                        8%
                      </span>
                    </div>
                  </div>

                  {/* API */}
                  <div className="flex items-center gap-2 lg:gap-4">
                    <span className="flex w-2/5 flex-shrink-0 text-sm font-medium tracking-spacing-tiny-2 text-text-soft-400 lg:max-w-2/5 lg:min-w-2/5">
                      API
                    </span>
                    <div className="flex min-w-0 flex-1 items-center gap-2 lg:gap-4">
                      <div className="progressContainer flex min-w-0 flex-1 gap-0.75">
                        {Array.from({ length: 23 }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-3 w-1 flex-shrink-0 rounded-[0.8px] ${
                              idx < 6 ? "bg-orange-500" : "bg-bg-weak-50"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="w-8 flex-shrink-0 text-right text-xs font-medium text-text-soft-400 lg:min-w-10">
                        25%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
