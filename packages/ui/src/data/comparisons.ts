import { cache } from "react";

export interface Comparison {
  solutionSlug: string;
  competitorSlug: string;
  competitorName: string;
  competitorTrademark: string; // e.g., "SimplePractice®"
  competitorUrl: string;
  title: string;
  description: string;
  keywords: string[];
  advantages: string[];
  comparisonPoints: {
    feature: string;
    panelmanage: string | boolean;
    competitor: string | boolean;
  }[];
}

export const COMPARISONS: Comparison[] = [
  {
    solutionSlug: "clinic-management-system",
    competitorSlug: "simplepractice",
    competitorName: "SimplePractice",
    competitorTrademark: "SimplePractice®",
    competitorUrl: "https://www.simplepractice.com",
    title: "Custom Clinic Management System vs SimplePractice® - Custom vs SaaS",
    description:
      "Compare custom clinic management systems vs SimplePractice®. Why businesses choose custom-built clinic panels over SaaS subscriptions — tailored workflows, no monthly fees, full ownership.",
    keywords: [
      "clinic management system vs simplepractice",
      "custom clinic software vs simplepractice",
      "clinic panel vs simplepractice pricing",
      "simplepractice alternative",
      "custom clinic management",
    ],
    advantages: [
      "100% customizable to your clinic's workflow",
      "One-time build cost vs monthly subscription fees",
      "Full source code ownership — no vendor lock-in",
      "Tailored modules, roles, and approvals",
      "No per-user or per-feature pricing tiers",
      "Complete data ownership and privacy control",
    ],
    comparisonPoints: [
      {
        feature: "Customization",
        panelmanage: "100% customizable",
        competitor: "Limited templates",
      },
      {
        feature: "Pricing Model",
        panelmanage: "One-time build + maintenance",
        competitor: "Monthly subscription per user",
      },
      {
        feature: "Ownership",
        panelmanage: "Full source code ownership",
        competitor: "Vendor lock-in",
      },
      {
        feature: "Workflow Fit",
        panelmanage: "Built around your process",
        competitor: "Adapt to their structure",
      },
      {
        feature: "Data Control",
        panelmanage: "Complete ownership",
        competitor: "Hosted by vendor",
      },
      {
        feature: "Feature Requests",
        panelmanage: "Custom development",
        competitor: "Roadmap dependent",
      },
    ],
  },
  {
    solutionSlug: "practice-management-system",
    competitorSlug: "carecloud",
    competitorName: "CareCloud",
    competitorTrademark: "CareCloud®",
    competitorUrl: "https://www.carecloud.com",
    title: "Custom Practice Management System vs CareCloud® - Custom vs SaaS",
    description:
      "Compare custom practice management systems vs CareCloud®. Why medical practices choose custom-built panels over SaaS — tailored workflows, no subscription fees, full control.",
    keywords: [
      "practice management system vs carecloud",
      "custom practice software vs carecloud",
      "practice panel vs carecloud pricing",
      "carecloud alternative",
      "custom practice management",
    ],
    advantages: [
      "Tailored to your practice's specific workflow",
      "One-time investment vs recurring monthly fees",
      "Complete source code ownership",
      "Custom modules for your specialty",
      "No user-based pricing increases",
      "Full data privacy and security control",
    ],
    comparisonPoints: [
      {
        feature: "Customization",
        panelmanage: "Built for your practice",
        competitor: "Standard templates",
      },
      {
        feature: "Pricing",
        panelmanage: "One-time + maintenance",
        competitor: "Monthly per provider",
      },
      {
        feature: "Specialty Fit",
        panelmanage: "Custom modules",
        competitor: "Generic features",
      },
      {
        feature: "Ownership",
        panelmanage: "Your system",
        competitor: "Vendor platform",
      },
    ],
  },
  {
    solutionSlug: "appointment-management-system",
    competitorSlug: "calendly",
    competitorName: "Calendly",
    competitorTrademark: "Calendly®",
    competitorUrl: "https://calendly.com",
    title: "Custom Appointment Management System vs Calendly® - Custom vs SaaS",
    description:
      "Compare custom appointment management systems vs Calendly®. Why businesses choose custom-built scheduling panels over SaaS — integrated workflows, approvals, full control.",
    keywords: [
      "appointment management system vs calendly",
      "custom scheduling software vs calendly",
      "appointment panel vs calendly pricing",
      "calendly alternative",
      "custom appointment scheduling",
    ],
    advantages: [
      "Integrated with your existing systems",
      "Custom approval workflows",
      "No per-user subscription fees",
      "Full control over booking logic",
      "Custom reminders and notifications",
      "Complete data ownership",
    ],
    comparisonPoints: [
      {
        feature: "Integration",
        panelmanage: "Custom integrations",
        competitor: "Limited integrations",
      },
      {
        feature: "Approval Workflows",
        panelmanage: "Custom multi-step",
        competitor: "Basic rules",
      },
      {
        feature: "Pricing",
        panelmanage: "One-time build",
        competitor: "Monthly per user",
      },
      {
        feature: "Customization",
        panelmanage: "Full control",
        competitor: "Template-based",
      },
    ],
  },
  {
    solutionSlug: "hr-management-system",
    competitorSlug: "bamboohr",
    competitorName: "BambooHR",
    competitorTrademark: "BambooHR®",
    competitorUrl: "https://www.bamboohr.com",
    title: "Custom HR Management System vs BambooHR® - Custom vs SaaS",
    description:
      "Compare custom HR management systems vs BambooHR®. Why companies choose custom-built HR panels over SaaS — tailored processes, no subscription fees, full ownership.",
    keywords: [
      "hr management system vs bamboohr",
      "custom hr software vs bamboohr",
      "hr panel vs bamboohr pricing",
      "bamboohr alternative",
      "custom hr management",
    ],
    advantages: [
      "Tailored to your HR processes",
      "One-time build vs monthly fees",
      "Full source code ownership",
      "Custom approval workflows",
      "No per-employee pricing",
      "Complete data privacy",
    ],
    comparisonPoints: [
      {
        feature: "Process Fit",
        panelmanage: "Built for your process",
        competitor: "Adapt to their structure",
      },
      {
        feature: "Pricing",
        panelmanage: "One-time + maintenance",
        competitor: "Monthly per employee",
      },
      {
        feature: "Customization",
        panelmanage: "100% customizable",
        competitor: "Limited configuration",
      },
      {
        feature: "Ownership",
        panelmanage: "Your system",
        competitor: "Vendor platform",
      },
    ],
  },
  {
    solutionSlug: "restaurant-management-system",
    competitorSlug: "toast",
    competitorName: "Toast",
    competitorTrademark: "Toast®",
    competitorUrl: "https://pos.toasttab.com",
    title: "Custom Restaurant Management System vs Toast® - Custom vs SaaS",
    description:
      "Compare custom restaurant management systems vs Toast®. Why restaurants choose custom-built panels over SaaS — tailored workflows, no subscription fees, full control.",
    keywords: [
      "restaurant management system vs toast",
      "custom restaurant software vs toast",
      "restaurant panel vs toast pricing",
      "toast alternative",
      "custom restaurant management",
    ],
    advantages: [
      "Built for your restaurant's workflow",
      "One-time investment vs monthly fees",
      "Full source code ownership",
      "Custom modules for your needs",
      "No transaction fees",
      "Complete data ownership",
    ],
    comparisonPoints: [
      {
        feature: "Workflow Fit",
        panelmanage: "Custom for your restaurant",
        competitor: "Standard POS features",
      },
      {
        feature: "Pricing",
        panelmanage: "One-time + maintenance",
        competitor: "Monthly + transaction fees",
      },
      {
        feature: "Customization",
        panelmanage: "Full control",
        competitor: "Limited customization",
      },
      {
        feature: "Ownership",
        panelmanage: "Your system",
        competitor: "Vendor platform",
      },
    ],
  },
  {
    solutionSlug: "employee-management-system",
    competitorSlug: "bamboohr",
    competitorName: "BambooHR",
    competitorTrademark: "BambooHR®",
    competitorUrl: "https://www.bamboohr.com",
    title: "Custom Employee Management System vs BambooHR® - Custom vs SaaS",
    description:
      "Compare custom employee management systems vs BambooHR®. Why companies choose custom-built employee panels over SaaS — tailored processes, no subscription fees, full ownership.",
    keywords: [
      "employee management system vs bamboohr",
      "custom employee software vs bamboohr",
      "employee panel vs bamboohr pricing",
      "bamboohr alternative",
      "custom employee management",
      "staff management system vs bamboohr",
    ],
    advantages: [
      "Tailored to your employee management processes",
      "One-time build vs monthly per-employee fees",
      "Full source code ownership",
      "Custom approval workflows for your organization",
      "No per-employee pricing increases",
      "Complete data privacy and security control",
    ],
    comparisonPoints: [
      {
        feature: "Process Fit",
        panelmanage: "Built for your process",
        competitor: "Adapt to their structure",
      },
      {
        feature: "Pricing",
        panelmanage: "One-time + maintenance",
        competitor: "Monthly per employee",
      },
      {
        feature: "Customization",
        panelmanage: "100% customizable",
        competitor: "Limited configuration",
      },
      {
        feature: "Ownership",
        panelmanage: "Your system",
        competitor: "Vendor platform",
      },
      {
        feature: "Scalability",
        panelmanage: "No per-user fees",
        competitor: "Costs increase with team size",
      },
    ],
  },
  {
    solutionSlug: "admin-panel-software",
    competitorSlug: "zoho",
    competitorName: "Zoho",
    competitorTrademark: "Zoho®",
    competitorUrl: "https://www.zoho.com",
    title: "Custom Management System vs Zoho® - Custom vs SaaS Platform",
    description:
      "Compare custom management systems vs Zoho®. Why businesses choose custom-built admin panels over Zoho's SaaS platform — tailored workflows, no subscription fees, full ownership.",
    keywords: [
      "custom management system vs zoho",
      "custom admin panel vs zoho",
      "management system vs zoho pricing",
      "zoho alternative",
      "custom admin panel software",
      "custom vs zoho",
    ],
    advantages: [
      "100% tailored to your business workflow",
      "One-time investment vs monthly Zoho subscriptions",
      "Full source code ownership — no vendor lock-in",
      "Custom modules for your specific needs",
      "No per-user or per-module pricing",
      "Complete data ownership and privacy",
    ],
    comparisonPoints: [
      {
        feature: "Customization",
        panelmanage: "Built for your business",
        competitor: "Standard modules",
      },
      {
        feature: "Pricing",
        panelmanage: "One-time + maintenance",
        competitor: "Monthly per user/module",
      },
      {
        feature: "Workflow Fit",
        panelmanage: "Custom workflows",
        competitor: "Adapt to their structure",
      },
      {
        feature: "Ownership",
        panelmanage: "Your system",
        competitor: "Vendor platform",
      },
      {
        feature: "Integration",
        panelmanage: "Custom integrations",
        competitor: "Limited to Zoho ecosystem",
      },
    ],
  },
  {
    solutionSlug: "admin-panel-software",
    competitorSlug: "wordpress",
    competitorName: "WordPress",
    competitorTrademark: "WordPress®",
    competitorUrl: "https://wordpress.org",
    title: "Custom Content Management System vs WordPress® - Custom vs CMS",
    description:
      "Compare custom content management systems vs WordPress®. Why businesses choose custom-built CMS over WordPress — tailored workflows, no plugin dependencies, full ownership.",
    keywords: [
      "content management system vs wordpress",
      "custom cms vs wordpress",
      "content management system",
      "custom cms",
      "wordpress alternative",
      "custom content management",
      "cms vs wordpress",
    ],
    advantages: [
      "100% tailored to your content workflow",
      "No plugin dependencies or security vulnerabilities",
      "Full source code ownership — no vendor lock-in",
      "Custom content types and fields",
      "No monthly hosting or plugin fees",
      "Complete control over performance and security",
    ],
    comparisonPoints: [
      {
        feature: "Customization",
        panelmanage: "Built for your content needs",
        competitor: "Limited by themes/plugins",
      },
      {
        feature: "Security",
        panelmanage: "Custom secure code",
        competitor: "Plugin vulnerabilities",
      },
      {
        feature: "Pricing",
        panelmanage: "One-time + maintenance",
        competitor: "Hosting + premium plugins",
      },
      {
        feature: "Performance",
        panelmanage: "Optimized for your use",
        competitor: "Plugin bloat",
      },
      {
        feature: "Ownership",
        panelmanage: "Your system",
        competitor: "Open source but plugin-dependent",
      },
    ],
  },
  {
    solutionSlug: "project-management-system",
    competitorSlug: "asana",
    competitorName: "Asana",
    competitorTrademark: "Asana®",
    competitorUrl: "https://asana.com",
    title: "Custom Project Management System vs Asana® - Custom vs SaaS",
    description:
      "Compare custom project management systems vs Asana®. Why teams choose custom-built project panels over SaaS — tailored workflows, no subscription fees, full ownership.",
    keywords: [
      "project management system vs asana",
      "custom project management vs asana",
      "project management system",
      "custom project management",
      "asana alternative",
      "project management software",
    ],
    advantages: [
      "Tailored to your project workflow",
      "One-time build vs monthly per-user fees",
      "Full source code ownership",
      "Custom project templates and workflows",
      "No per-user pricing increases",
      "Complete data ownership and privacy",
    ],
    comparisonPoints: [
      {
        feature: "Workflow Fit",
        panelmanage: "Built for your process",
        competitor: "Adapt to their structure",
      },
      {
        feature: "Pricing",
        panelmanage: "One-time + maintenance",
        competitor: "Monthly per user",
      },
      {
        feature: "Customization",
        panelmanage: "100% customizable",
        competitor: "Limited templates",
      },
      {
        feature: "Ownership",
        panelmanage: "Your system",
        competitor: "Vendor platform",
      },
    ],
  },
  {
    solutionSlug: "admin-panel-software",
    competitorSlug: "salesforce",
    competitorName: "Salesforce",
    competitorTrademark: "Salesforce®",
    competitorUrl: "https://www.salesforce.com",
    title: "Custom CRM Management System vs Salesforce® - Custom vs SaaS",
    description:
      "Compare custom CRM management systems vs Salesforce®. Why businesses choose custom-built CRM panels over Salesforce — tailored workflows, no subscription fees, full ownership.",
    keywords: [
      "crm management system vs salesforce",
      "custom crm vs salesforce",
      "crm management system",
      "custom crm",
      "salesforce alternative",
      "custom crm software",
    ],
    advantages: [
      "100% tailored to your sales process",
      "One-time investment vs monthly Salesforce fees",
      "Full source code ownership",
      "Custom sales workflows and pipelines",
      "No per-user or per-feature pricing",
      "Complete data ownership and privacy",
    ],
    comparisonPoints: [
      {
        feature: "Process Fit",
        panelmanage: "Built for your sales process",
        competitor: "Adapt to their structure",
      },
      {
        feature: "Pricing",
        panelmanage: "One-time + maintenance",
        competitor: "Monthly per user (high cost)",
      },
      {
        feature: "Customization",
        panelmanage: "100% customizable",
        competitor: "Limited configuration",
      },
      {
        feature: "Ownership",
        panelmanage: "Your system",
        competitor: "Vendor platform",
      },
      {
        feature: "Scalability",
        panelmanage: "No per-user fees",
        competitor: "Costs increase with team size",
      },
    ],
  },
];

export const COMPARISON_BY_SLUG = new Map<string, Comparison>(
  COMPARISONS.map((c) => [`${c.solutionSlug}-vs-${c.competitorSlug}`, c])
);

export const COMPARISONS_BY_SOLUTION = new Map<string, Comparison[]>();
for (const comparison of COMPARISONS) {
  const list = COMPARISONS_BY_SOLUTION.get(comparison.solutionSlug);
  if (list) {
    list.push(comparison);
  } else {
    COMPARISONS_BY_SOLUTION.set(comparison.solutionSlug, [comparison]);
  }
}

export const getComparisonBySlug = cache(
  (slug: string): Comparison | undefined => COMPARISON_BY_SLUG.get(slug)
);

export const getComparisonsBySolutionSlug = cache(
  (solutionSlug: string): Comparison[] =>
    COMPARISONS_BY_SOLUTION.get(solutionSlug) ?? []
);
