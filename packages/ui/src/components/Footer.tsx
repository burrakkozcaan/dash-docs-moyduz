"use client";

import Link from "next/link";
import { Button } from "./ui/button";

import { TrendingUp } from "lucide-react";
import { FlickeringFooter } from "./flickering-footer";
import { Logo } from "./Logo";
const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const;

const solutionLinks = [
  {
    label: "Appointment management system",
    href: "/solutions/appointment-management-system",
  },
  {
    label: "Clinic management system",
    href: "/solutions/clinic-management-system",
  },
  {
    label: "Employee management system",
    href: "/solutions/employee-management-system",
  },
  {
    label: "Scholarship management system",
    href: "/solutions/scholarship-management-system",
  },
] as const;

const socialLinks = [
  { label: "Twitter", href: "https://x.com/kreativnik_" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
] as const;

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Responsible Disclosure", href: "/responsible-disclosure" },
  { label: "Terms Of Service", href: "/terms-of-service" },
  { label: "Security", href: "/security" },
] as const;

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-black text-zinc-900 dark:text-white/10 relative">
      <div className="bg-white dark:bg-black h-[100px] md:h-full relative overflow-hidden">
        {/* <video
          src="/moyduz.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="bg-white dark:bg-black w-full h-full object-cover opacity-80"
        /> */}

      </div>
      <div className="mx-auto flex w-full max-w-[1520px] flex-col gap-10 px-4 py-12 md:px-16 md:py-16">
        {/* Top grid */}
        <div className="col-span-2 mb-8 lg:mb-0">
          <div className="flex items-center gap-2 lg:justify-start">
            <Link href="/" className="flex max-h-8 items-center gap-3">

            </Link>
            <span className="text-zinc-900 dark:text-white"><Logo variant="default" /></span>
          </div>
          <p className="mt-4 max-w-xs text-sm font-semibold text-zinc-600 dark:text-white/50">
            We are everywhere, including{" "}
            <span className="font-bold">your city</span>{" "}
            - Growth playbooks, technical delivery, and analytics built for
            operators.
          </p>
          <div className="mt-4 space-y-7 mb-4 sm:mb-0 ">
            <div>
              <p className="text-sm text-zinc-600 dark:text-[#b8b9b9] mb-2">
                <strong className="text-zinc-900 dark:text-white">Office Address:</strong>
                <br />
                Moyduz
                <br />

              </p>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff4d00] hover:text-[#ff4d00]/80 transition-colors text-sm inline-flex items-center gap-1"
              >
                📍 View our location on Google Maps
              </a>
            </div>

          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-5 md:gap-x-8 md:gap-y-12">
          {/* Navigation */}
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Navigation
            </p>
            <nav className="flex flex-col gap-2 text-sm">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-zinc-700 dark:text-zinc-100 transition-colors hover:text-zinc-900 dark:hover:text-white/90"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Solutions
            </p>
            <nav className="flex flex-col gap-2 text-sm">
              {solutionLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-zinc-700 dark:text-zinc-100 transition-colors hover:text-zinc-900 dark:hover:text-white/90"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Social
            </p>
            <div className="flex flex-col gap-2 text-sm">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-700 dark:text-zinc-100 transition-colors hover:text-zinc-900 dark:hover:text-white/90"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Legal
            </p>
            <nav className="flex flex-col gap-2 text-sm">
              {legalLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-zinc-700 dark:text-zinc-100 transition-colors hover:text-zinc-900 dark:hover:text-white/90"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter form */}
          <div className="space-y-4 md:col-span-1">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Product updates & system insights{" "}
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="w-full">
                <input
                  type="email"
                  required
                  placeholder="your@company.com"
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700/70 bg-zinc-100 dark:bg-zinc-900/60 px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-colors focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/40"
                />
              </div>
              <Button className="w-full rounded-lg">
                Subscribe
                <TrendingUp className="size-4 ml-2" />
              </Button>
              {/* <button
                type="submit"
                className="inline-flex h-9 w-full items-center justify-center rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-900 text-sm font-medium text-white shadow-md shadow-black/40 transition hover:brightness-110"
              >
                Subscribe
              </button> */}
            </form>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
              By subscribing, you agree to our{" "}
              <Link
                href="/privacy-policy"
                className="text-zinc-700 dark:text-zinc-100 hover:text-zinc-900 dark:hover:text-white/90"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-800 to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-500 md:flex-row">
          <p>© 2025 Panel Management Systems. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Created by</span>
            <Link
              href="https://moydus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white"
            >
              Moydus
            </Link>
          </div>
        </div>
      </div>
      <FlickeringFooter />
    </footer>
  );
}
