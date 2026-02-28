import { Check, TrendingUp } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Starter",
    priceLabel: "From $2,950",
    subLabel: "One-time build • maintenance optional",
    highlight: false,
    badge: null as string | null,
    description:
      "Focused custom panel for a single workflow — fast delivery, clean UI, ready to ship.",
    features: [
      "Appointment / booking OR employee tracking",
      "Up to 6 modules (tables, forms, actions)",
      "Basic roles & permissions",
      "QA + launch support",
    ],
  },
  {
    name: "Suite",
    priceLabel: "From $4,950",
    subLabel: "One-time build • maintenance available",
    highlight: true,

    badge: "Most Popular",
    description:
      "Advanced panel for teams — approvals, reporting, richer workflows and controls.",
    features: [
      "12+ modules (scoped)",
      "Advanced RBAC + approvals",
      "Reporting dashboard + exports",
      "Automation-ready hooks (optional)",
    ],
  },
  {
    name: "Custom",
    priceLabel: "Custom",
    subLabel: "Scoped per project",
    highlight: false,
    badge: null as string | null,
    description:
      "For complex systems — multi-tenant, heavy integrations, custom automations and SLAs.",
    features: [
      "Complex workflows & integrations",
      "SSO / OAuth / webhooks (scoped)",
      "Audit logs + security controls",
      "Roadmap-based ongoing development",
    ],
  },
] as const;

export function PricingSection() {
  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="section-below-fold w-full flex justify-center px-4 py-10 md:py-28"
    >
      <div className="flex w-full max-w-[1520px] flex-col items-center gap-10">
        {/* Section title */}
        <div className="flex w-full max-w-[803px] flex-col items-center gap-2 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            Pricing
          </h2>
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-[#d95808] text-sm underline hover:text-[#b94a07] transition-colors"
            >
              See pricing
              <TrendingUp className="size-4" />
            </Link>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            Choose the plan that matches your workflow — no hidden fees, no
            surprises.
          </p>
        </div>

        {/* Cards */}
        <div className="w-full flex flex-wrap items-stretch justify-center gap-4 md:gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="flex min-w-[300px] max-w-sm md:max-w-md flex-1 basis-[300px]"
            >
              <div className="relative flex h-full w-full flex-col justify-between rounded-2xl bg-card border border-border p-[1px]">
                <div className="absolute inset-[1px] rounded-[15px] bg-[#f5f5f5] dark:bg-gray-900 border border-gray-100 dark:border-gray-800" />
                {plan.highlight && (
                  <div className="pointer-events-none absolute inset-[1px] rounded-[15px] bg-primary/5 opacity-10" />
                )}

                <div className="relative z-10 flex h-full flex-col gap-6 p-5">
                  {/* Top */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        {plan.name}
                      </h3>
                      {plan.badge && (
                        <span className="rounded-lg bg-[#d95808] px-2.5 py-1 text-[11px] font-medium text-white">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-baseline gap-1.5 text-foreground">
                        <span className="text-2xl font-semibold">
                          {plan.priceLabel}
                        </span>
                      </div>
                      {plan.subLabel && (
                        <span className="text-xs text-muted-foreground">
                          {plan.subLabel}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <div className="mt-1 flex flex-col gap-2">
                    <ul className="flex flex-col gap-1.5">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <Check className="mt-[2px] size-3.5 text-[#d95808]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-4">
                    <Link
                      href="/contact"
                      className={
                        plan.highlight
                          ? "inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-lg transition hover:brightness-110"
                          : "inline-flex h-10 w-full items-center justify-center rounded-lg bg-secondary text-sm font-medium text-secondary-foreground shadow-lg transition hover:brightness-110"
                      }
                    >
                      {plan.name === "Starter"
                        ? "Request quote"
                        : plan.name === "Suite"
                          ? "Request proposal"
                          : "Talk to us"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
