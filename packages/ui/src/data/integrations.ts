import { cache } from "react";

export interface Integration {
  solutionSlug: string;
  integrationSlug: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  content: {
    h2: string;
    text: string;
  }[];
}

export const INTEGRATIONS: Integration[] = [
  {
    solutionSlug: "clinic-management-system",
    integrationSlug: "e-nabiz-integration",
    title: "e-Nabız Integration for Clinic Management System | PanelManage",
    description:
      "Custom e-Nabız integration for clinic management systems. Sync patient data, appointments, and records with Turkey's national health system.",
    keywords: [
      "e-nabız integration",
      "e-nabız entegrasyonu",
      "clinic e-nabız integration",
      "medical e-nabız integration",
      "healthcare e-nabız integration",
    ],
    h1: "e-Nabız Integration for Clinic Management Systems",
    content: [
      {
        h2: "Custom e-Nabız Integration",
        text: "Integrate your custom clinic management system with e-Nabız (Turkey's national health information system). Sync patient data, appointments, and medical records seamlessly.",
      },
      {
        h2: "Benefits",
        text: "Automatic patient data sync, appointment synchronization, medical record integration, and compliance with Turkish healthcare regulations.",
      },
    ],
  },
  {
    solutionSlug: "clinic-management-system",
    integrationSlug: "google-calendar-sync",
    title: "Google Calendar Integration for Clinic Management | PanelManage",
    description:
      "Custom Google Calendar sync for clinic management systems. Automatically sync appointments, availability, and schedules with Google Calendar.",
    keywords: [
      "google calendar integration",
      "google calendar sync",
      "clinic google calendar",
      "appointment calendar sync",
      "medical calendar integration",
    ],
    h1: "Google Calendar Integration for Clinic Management",
    content: [
      {
        h2: "Custom Google Calendar Sync",
        text: "Automatically sync your clinic appointments with Google Calendar. Two-way sync ensures your calendar stays updated across all platforms.",
      },
      {
        h2: "Features",
        text: "Automatic appointment sync, availability management, two-way calendar updates, and custom sync rules based on your clinic's workflow.",
      },
    ],
  },
  {
    solutionSlug: "clinic-management-system",
    integrationSlug: "whatsapp-integration",
    title: "WhatsApp Integration for Clinic Management | PanelManage",
    description:
      "Custom WhatsApp integration for clinic management systems. Send appointment reminders, notifications, and communicate with patients via WhatsApp.",
    keywords: [
      "whatsapp integration",
      "whatsapp clinic integration",
      "whatsapp appointment reminders",
      "medical whatsapp integration",
      "clinic whatsapp notifications",
    ],
    h1: "WhatsApp Integration for Clinic Management",
    content: [
      {
        h2: "Custom WhatsApp Integration",
        text: "Send appointment reminders, notifications, and communicate with patients via WhatsApp. Automated messaging integrated with your clinic management system.",
      },
      {
        h2: "Features",
        text: "Automated appointment reminders, patient notifications, two-way messaging, template messages, and custom WhatsApp workflows.",
      },
    ],
  },
  {
    solutionSlug: "hr-management-system",
    integrationSlug: "zapier-integration",
    title: "Zapier Integration for HR Management System | PanelManage",
    description:
      "Custom Zapier integration for HR management systems. Connect your HR panel with 5000+ apps including Slack, Gmail, and more.",
    keywords: [
      "zapier integration",
      "hr zapier integration",
      "zapier hr management",
      "hr automation zapier",
      "custom zapier integration",
    ],
    h1: "Zapier Integration for HR Management Systems",
    content: [
      {
        h2: "Custom Zapier Integration",
        text: "Connect your custom HR management system with 5000+ apps via Zapier. Automate workflows between your HR panel and tools like Slack, Gmail, and more.",
      },
      {
        h2: "Popular Integrations",
        text: "Slack notifications, Gmail integration, Google Sheets sync, Trello task creation, and custom automation workflows based on your HR processes.",
      },
    ],
  },
];

export const INTEGRATION_BY_SLUG = new Map<string, Integration>(
  INTEGRATIONS.map((i) => [`${i.solutionSlug}/${i.integrationSlug}`, i])
);

export const INTEGRATIONS_BY_SOLUTION = new Map<string, Integration[]>();
for (const integration of INTEGRATIONS) {
  const list = INTEGRATIONS_BY_SOLUTION.get(integration.solutionSlug);
  if (list) {
    list.push(integration);
  } else {
    INTEGRATIONS_BY_SOLUTION.set(integration.solutionSlug, [integration]);
  }
}

export const getIntegrationBySlug = cache(
  (solutionSlug: string, integrationSlug: string): Integration | undefined =>
    INTEGRATION_BY_SLUG.get(`${solutionSlug}/${integrationSlug}`)
);

export const getIntegrationsBySolutionSlug = cache(
  (solutionSlug: string): Integration[] =>
    INTEGRATIONS_BY_SOLUTION.get(solutionSlug) ?? []
);
