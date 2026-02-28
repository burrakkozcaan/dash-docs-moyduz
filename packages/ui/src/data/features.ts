import { cache } from "react";

export interface Feature {
  solutionSlug: string;
  featureSlug: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  content: {
    h2: string;
    text: string;
  }[];
}

export const FEATURES: Feature[] = [
  {
    solutionSlug: "clinic-management-system",
    featureSlug: "appointment-scheduling",
    title: "Clinic Appointment Scheduling Software | PanelManage",
    description:
      "Custom appointment scheduling software for clinics. Built-in availability management, reminders, cancellations, and multi-provider scheduling.",
    keywords: [
      "clinic appointment scheduling software",
      "doctor appointment scheduling",
      "medical appointment system",
      "clinic booking software",
      "appointment scheduling for clinics",
    ],
    h1: "Clinic Appointment Scheduling Software",
    content: [
      {
        h2: "Custom Appointment Scheduling for Your Clinic",
        text: "We build appointment scheduling systems tailored to your clinic's workflow. Manage provider availability, patient bookings, reminders, and cancellations in one custom panel.",
      },
      {
        h2: "Key Features",
        text: "Multi-provider scheduling, automated reminders, cancellation management, waitlist handling, and custom booking rules built around your clinic's operations.",
      },
    ],
  },
  {
    solutionSlug: "clinic-management-system",
    featureSlug: "patient-portal",
    title: "Clinic Patient Portal Software | PanelManage",
    description:
      "Custom patient portal software for clinics. Secure patient access to records, appointments, documents, and communication with providers.",
    keywords: [
      "clinic patient portal software",
      "patient portal system",
      "medical patient portal",
      "patient access portal",
      "clinic patient portal",
    ],
    h1: "Clinic Patient Portal Software",
    content: [
      {
        h2: "Custom Patient Portal for Clinics",
        text: "Build a secure patient portal that matches your clinic's needs. Patients can access their records, schedule appointments, view documents, and communicate with providers.",
      },
      {
        h2: "Key Features",
        text: "Secure patient login, appointment scheduling, document access, messaging with providers, prescription history, and custom modules based on your clinic's requirements.",
      },
    ],
  },
  {
    solutionSlug: "clinic-management-system",
    featureSlug: "ehr-integration",
    title: "EHR Integration for Clinic Management Systems | PanelManage",
    description:
      "Custom EHR integration for clinic management systems. Integrate with e-Nabız, Google Calendar, and other healthcare systems.",
    keywords: [
      "ehr integration",
      "e-nabız integration",
      "clinic ehr integration",
      "medical ehr integration",
      "healthcare system integration",
    ],
    h1: "EHR Integration for Clinic Management Systems",
    content: [
      {
        h2: "Custom EHR Integration",
        text: "Integrate your custom clinic management system with EHR systems like e-Nabız, Google Calendar, and other healthcare platforms. Custom integrations built for your workflow.",
      },
      {
        h2: "Supported Integrations",
        text: "e-Nabız integration, Google Calendar sync, WhatsApp notifications, SMS reminders, and custom API integrations based on your clinic's needs.",
      },
    ],
  },
  {
    solutionSlug: "clinic-management-system",
    featureSlug: "billing-invoicing",
    title: "Clinic Billing and Invoicing Software | PanelManage",
    description:
      "Custom billing and invoicing software for clinics. Automated invoicing, payment tracking, insurance claims, and financial reporting.",
    keywords: [
      "clinic billing software",
      "medical billing software",
      "clinic invoicing system",
      "healthcare billing software",
      "clinic payment system",
    ],
    h1: "Clinic Billing and Invoicing Software",
    content: [
      {
        h2: "Custom Billing for Clinics",
        text: "Automated billing and invoicing system built for your clinic. Track payments, manage insurance claims, generate invoices, and handle financial reporting.",
      },
      {
        h2: "Key Features",
        text: "Automated invoicing, payment tracking, insurance claim management, financial reporting, payment reminders, and custom billing workflows.",
      },
    ],
  },
];

export const FEATURE_BY_SLUG = new Map<string, Feature>(
  FEATURES.map((f) => [`${f.solutionSlug}/${f.featureSlug}`, f])
);

export const FEATURES_BY_SOLUTION = new Map<string, Feature[]>();
for (const feature of FEATURES) {
  const list = FEATURES_BY_SOLUTION.get(feature.solutionSlug);
  if (list) {
    list.push(feature);
  } else {
    FEATURES_BY_SOLUTION.set(feature.solutionSlug, [feature]);
  }
}

export const getFeatureBySlug = cache(
  (solutionSlug: string, featureSlug: string): Feature | undefined =>
    FEATURE_BY_SLUG.get(`${solutionSlug}/${featureSlug}`)
);

export const getFeaturesBySolutionSlug = cache(
  (solutionSlug: string): Feature[] =>
    FEATURES_BY_SOLUTION.get(solutionSlug) ?? []
);
