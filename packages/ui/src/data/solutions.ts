import { cache } from "react";

export type FAQ = { q: string; a: string };

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string };

export type Section = {
  h2: string;
  blocks: ContentBlock[];
};

export type Solution = {
  slug: string;
  keyword: string;
  pageName: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  datePublished: string;
  sections: Section[];
  faqs: FAQ[];
  extraFaqs?: FAQ[];
  tags: string[];
  seoKeywords?: string[];
};

export const BRAND = {
  name: "PanelManage",
  url: "https://panelmanage.com",
  logo: "https://panelmanage.com/logo.png",
  buildTime: process.env.NEXT_PUBLIC_BUILD_TIME,
};

export const BASE_FAQS: FAQ[] = [
  {
    q: "Is this a ready-made SaaS or custom-built?",
    a: "It's custom-built. We design modules, roles, and workflows around how your team works, then deliver a production-ready management system.",
  },
  {
    q: "How long does it take to build?",
    a: "Most systems ship in weeks depending on scope. Delivery follows milestones: planning, design, build, testing, and launch.",
  },
  {
    q: "Do you include maintenance?",
    a: "Yes. Maintenance covers updates, fixes, monitoring, backups, and small iterative improvements based on real usage.",
  },
  {
    q: "Can you support roles and approvals?",
    a: "Yes. We implement RBAC, multi-step approvals, status tracking, and audit-friendly workflows for accountability.",
  },
  {
    q: "Can it handle uploads and exports?",
    a: "Yes. File uploads and CSV/PDF exports can be included based on your requirements.",
  },
  {
    q: "Can we integrate with other tools?",
    a: "Yes. Calendars, messaging, spreadsheets, and automation hooks for reminders, approvals, and reporting can be added.",
  },
  {
    q: "Can this system be adapted to different programs or workflows?",
    a: "Yes. Workflows, logic, forms, and approval processes are fully customizable and can be tailored to each program's specific requirements.",
  },
];

// Reusable "Why Custom?" section for all solutions
export const WHY_CUSTOM_SECTION: Section = {
  h2: "Why Custom Instead of Ready-Made Software",
  blocks: [
    {
      type: "ul",
      items: [
        "No limits on workflow logic or business rules",
        "Custom roles for your team structure",
        "Full ownership of your data and processes",
        "Easy extensions for future programs",
        "No per-seat subscription fees",
      ],
    },
  ],
};

export function buildFaqs(extra?: FAQ[]) {
  return [...(extra || []), ...BASE_FAQS];
}

const PUBLISHED = "2025-01-15T00:00:00Z";

export const SOLUTIONS: Solution[] = [
  {
    slug: "appointment-management-system",
    keyword: "appointment management system",
    pageName: "Appointment Management System",
    seoTitle: "Appointment Management System | PanelManage",
    metaDescription:
      "Custom appointment management system with scheduling, approvals, reminders, roles, uploads, exports, and workflow modules.",
    h1: "Custom Appointment Management System",
    intro:
      "Replace spreadsheets and fragmented tools with a custom-built appointment management system that adapts to your scheduling logic, approval process, and reporting needs.",
    datePublished: PUBLISHED,
    tags: ["scheduling", "healthcare", "operations", "workflow"],
    seoKeywords: [
      "appointment scheduling software",
      "doctor booking system",
      "calendar management panel",
      "appointment management system",
      "patient scheduling software",
      "medical appointment system",
      "clinic booking software",
      "healthcare scheduling system",
      "custom admin panel",
      "management system",
    ],
    sections: [
      {
        h2: "Who This Custom Appointment System Is For",
        blocks: [
          {
            type: "ul",
            items: [
              "Clinics and practices coordinating staff + patients",
              "Service businesses running time-based bookings",
              "Teams needing approval steps and attendance tracking",
              "Organizations replacing spreadsheets and manual ops",
            ],
          },
        ],
      },
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Appointments & availability",
              "Client/patient records",
              "Staff schedules",
              "Reminders & notifications",
              "Statuses & approvals",
              "Reports & exports",
            ],
          },
        ],
      },
      {
        h2: "Typical Appointment Workflow (Customizable)",
        blocks: [
          {
            type: "steps",
            items: [
              "Request/booking is created",
              "Availability is checked and assigned",
              "Approval rules run (optional)",
              "Confirmation and reminders are triggered",
              "Attendance is recorded",
              "Invoices/exports/reports generated",
              "Audit trail stored for accountability",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "Tables, forms, actions" },
          {
            type: "p",
            text: "Custom tables, forms, and actions designed around your booking logic — not generic templates.",
          },
          { type: "h3", text: "Uploads and exports" },
          {
            type: "p",
            text: "Document/image uploads plus CSV/PDF exports for operations and reporting.",
          },
          { type: "h3", text: "Roles and permissions" },
          {
            type: "p",
            text: "RBAC so each user sees only what they need.",
          },
        ],
      },
      {
        h2: "Security & permissions",
        blocks: [
          {
            type: "p",
            text: "Secure architecture, rate limiting, and RBAC. Optional audit logs and session controls.",
          },
        ],
      },
      {
        h2: "Integrations & automations",
        blocks: [
          {
            type: "p",
            text: "Optional calendar and messaging integrations, plus automation hooks for reminders, approvals, and reporting.",
          },
        ],
      },
    ],
    faqs: BASE_FAQS,
  },
  {
    slug: "clinic-management-system",
    keyword: "clinic management system",
    pageName: "Clinic Management System",
    seoTitle: "Clinic Management System | PanelManage",
    metaDescription:
      "Custom clinic management system for appointments, staff, patient workflows, permissions, uploads, reporting, and approvals.",
    h1: "Custom Clinic Management System",
    intro:
      "Replace fragmented systems with a custom-built clinic management system that adapts to your patient workflows, staff roles, and operational processes.",
    datePublished: PUBLISHED,
    tags: ["healthcare", "operations", "workflow"],
    seoKeywords: [
      "clinic management software",
      "medical practice panel",
      "healthcare admin dashboard",
      "clinic management system",
      "medical practice management software",
      "doctor management panel",
      "patient management system",
      "healthcare admin panel",
      "custom admin panel",
      "management system",
    ],
    sections: [
      {
        h2: "Who This Custom Clinic System Is For",
        blocks: [
          {
            type: "ul",
            items: [
              "Clinics and medical centers",
              "Multi-provider practices",
              "Ops teams managing capacity and staff",
              "Organizations needing audit-friendly workflows",
            ],
          },
        ],
      },
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Appointments & rooms",
              "Staff & roles",
              "Patient intake workflows",
              "Documents & uploads",
              "Approvals and handoffs",
              "Dashboards & reporting",
            ],
          },
        ],
      },
      {
        h2: "Typical Clinic Workflow (Customizable)",
        blocks: [
          {
            type: "steps",
            items: [
              "Intake created",
              "Assignment to provider",
              "Documents collected",
              "Visit tracked",
              "Billing/export generated",
              "Follow-ups scheduled",
              "Reporting reviewed",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "Patient intake & records" },
          {
            type: "p",
            text: "Structured forms, uploads, and status tracking tailored to your clinic flow.",
          },
          { type: "h3", text: "Staff scheduling & permissions" },
          { type: "p", text: "RBAC, shift logic, and role-specific views." },
          { type: "h3", text: "Reporting & exports" },
          {
            type: "p",
            text: "Operational dashboards and exports for admin/finance workflows.",
          },
        ],
      },
      {
        h2: "Security & permissions",
        blocks: [
          {
            type: "p",
            text: "RBAC, rate limiting, optional audit logs, and secure workflow design for regulated environments.",
          },
        ],
      },
      {
        h2: "Integrations & automations",
        blocks: [
          {
            type: "p",
            text: "Calendar, messaging, and spreadsheet integrations with automation hooks for reminders and status updates.",
          },
        ],
      },
    ],
    faqs: BASE_FAQS,
  },
  {
    slug: "employee-management-system",
    keyword: "employee management system",
    pageName: "Employee Management System",
    seoTitle: "Employee Management System | PanelManage",
    metaDescription:
      "Custom employee management system for shifts, tasks, approvals, timesheets, exports, and role-based access.",
    h1: "Custom Employee Management System",
    intro:
      "Replace spreadsheets and disconnected tools with a custom-built employee management system that adapts to your shift planning, task workflows, and approval structure.",
    datePublished: PUBLISHED,
    tags: ["workforce", "operations", "workflow"],
    seoKeywords: [
      "employee management system",
      "HRMS",
      "staff management software",
      "employee tracking system",
      "workforce management software",
      "staff scheduling system",
      "custom admin panel",
      "management system",
    ],
    sections: [
      {
        h2: "Who This Custom Employee System Is For",
        blocks: [
          {
            type: "ul",
            items: [
              "Operations teams managing shifts",
              "Companies needing task + approval flows",
              "Organizations replacing spreadsheets",
              "Teams needing exports and reporting",
            ],
          },
        ],
      },
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Shift planning",
              "Tasks & assignments",
              "Time tracking",
              "Approvals",
              "Exports (CSV/PDF)",
              "Role-based permissions",
            ],
          },
        ],
      },
      {
        h2: "Typical Employee Workflow (Customizable)",
        blocks: [
          {
            type: "steps",
            items: [
              "Shifts created",
              "Employees assigned",
              "Tasks tracked",
              "Approvals completed",
              "Exports generated",
              "Reports reviewed",
              "Improvements iterated",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "Shift, task, and approval modules" },
          { type: "p", text: "Tables, forms, and actions for daily workforce operations." },
          { type: "h3", text: "Exports and reporting" },
          { type: "p", text: "CSV/PDF exports plus dashboards for leadership visibility." },
        ],
      },
      { h2: "Security & permissions", blocks: [{ type: "p", text: "RBAC, rate limiting, and optional audit logs for accountability." }] },
      { h2: "Integrations & automations", blocks: [{ type: "p", text: "Automation hooks for reminders, approvals, and scheduled exports." }] },
    ],
    faqs: BASE_FAQS,
  },
  {
    slug: "scholarship-management-system",
    keyword: "scholarship management system",
    pageName: "Scholarship Management System",
    seoTitle: "Scholarship Management System | PanelManage",
    metaDescription:
      "Custom scholarship management system for applications, document uploads, scoring, approvals, and reporting.",
    h1: "Custom Scholarship Management System",
    intro:
      "Replace spreadsheets, emails, and disconnected tools with a custom-built scholarship management system that adapts to your review process, scoring logic, and approval structure.",
    datePublished: PUBLISHED,
    tags: ["education", "workflow", "operations"],
    seoKeywords: [
      "scholarship management system",
      "student aid tracking",
      "grant management software",
      "burs yönetim sistemi",
      "scholarship tracking system",
      "student financial aid system",
      "custom admin panel",
      "management system",
    ],
    sections: [
      {
        h2: "Who This Custom Scholarship System Is For",
        blocks: [
          {
            type: "ul",
            items: [
              "Scholarship programs",
              "Schools and foundations",
              "Selection committees",
              "Teams needing scoring and approvals",
            ],
          },
        ],
      },
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Applications",
              "Document uploads",
              "Scoring and rubric",
              "Approvals and decisions",
              "Notifications",
              "Exports and reporting",
            ],
          },
        ],
      },
      {
        h2: "Typical Scholarship Review Workflow (Customizable)",
        blocks: [
          {
            type: "steps",
            items: [
              "Applicant submits",
              "Docs uploaded",
              "Eligibility checks",
              "Scoring by reviewers",
              "Approvals and decisions",
              "Notifications sent",
              "Reporting exported",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "Applications and document handling" },
          { type: "p", text: "Structured forms, required uploads, and status tracking per applicant." },
          { type: "h3", text: "Scoring and committee review" },
          { type: "p", text: "Rubrics, reviewer assignments, and final decision workflows." },
        ],
      },
      { h2: "Security & permissions", blocks: [{ type: "p", text: "RBAC for reviewers, admins, and committee roles, plus optional audit logs." }] },
      { h2: "Integrations & automations", blocks: [{ type: "p", text: "Automation hooks for reminders, deadlines, and reporting exports." }] },
    ],
    faqs: BASE_FAQS,
  },
  {
    slug: "school-management-system",
    keyword: "school management system",
    pageName: "School Management System",
    seoTitle: "School Management System | PanelManage",
    metaDescription:
      "Custom school management system for admissions, student records, staff workflows, document uploads, approvals, and reporting.",
    h1: "Custom School Management System",
    intro:
      "Skip SaaS limits. Build a custom school management system designed around your admissions, records, staff roles, approvals, and reporting needs.",
    datePublished: PUBLISHED,
    tags: ["education", "operations", "workflow"],
    sections: [
      {
        h2: "Who This Custom School System Is For",
        blocks: [
          {
            type: "ul",
            items: [
              "Schools and training centers",
              "Admin teams managing admissions",
              "Programs needing approvals",
              "Teams needing structured records",
            ],
          },
        ],
      },
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Admissions workflows",
              "Student records",
              "Teacher/admin roles",
              "Document uploads",
              "Approvals",
              "Reports and exports",
            ],
          },
        ],
      },
      {
        h2: "Typical School Workflow (Customizable)",
        blocks: [
          {
            type: "steps",
            items: [
              "Application submitted",
              "Docs collected",
              "Review and approvals",
              "Enrollment created",
              "Updates tracked",
              "Reports exported",
              "Ongoing improvements",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "Admissions & records" },
          {
            type: "p",
            text: "Structured intake, uploads, and status tracking for enrollment workflows.",
          },
        ],
      },
      { h2: "Security & permissions", blocks: [{ type: "p", text: "RBAC across admin, teachers, and staff. Optional audit logs for sensitive actions." }] },
      { h2: "Integrations & automations", blocks: [{ type: "p", text: "Automation hooks for reminders, approvals, and exports. Optional calendar/email integrations." }] },
    ],
    faqs: BASE_FAQS,
  },
  {
    slug: "practice-management-system",
    keyword: "practice management system",
    pageName: "Practice Management System",
    seoTitle: "Practice Management System | PanelManage",
    metaDescription:
      "Custom practice management system for scheduling, staff workflows, uploads, reporting, and approvals.",
    h1: "Custom Practice Management System",
    intro:
      "Skip generic SaaS tools. Build a custom practice management system that adapts to your roles, approvals, and operational steps.",
    datePublished: PUBLISHED,
    tags: ["operations", "workflow"],
    seoKeywords: [
      "practice management system",
      "medical practice software",
      "doctor management panel",
      "practice management software",
      "medical practice management system",
      "healthcare practice panel",
      "custom admin panel",
      "management system",
    ],
    sections: [
      {
        h2: "Who This Custom Practice System Is For",
        blocks: [
          {
            type: "ul",
            items: [
              "Service-based practices",
              "Teams needing scheduling + approvals",
              "Organizations with structured intake",
              "Ops teams needing visibility",
            ],
          },
        ],
      },
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Intake and requests",
              "Scheduling",
              "Tasks and handoffs",
              "Uploads and documents",
              "Approvals",
              "Reports and exports",
            ],
          },
        ],
      },
      {
        h2: "Typical Practice Workflow (Customizable)",
        blocks: [
          {
            type: "steps",
            items: [
              "Request created",
              "Assignment and scheduling",
              "Docs collected",
              "Work completed",
              "Approvals finalized",
              "Reporting exported",
              "Next steps scheduled",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "Workflow modules" },
          {
            type: "p",
            text: "Custom states and approvals with role-specific views and actions.",
          },
        ],
      },
      { h2: "Security & permissions", blocks: [{ type: "p", text: "RBAC and rate limiting, with optional audit logs and session controls." }] },
      { h2: "Integrations & automations", blocks: [{ type: "p", text: "Automations for reminders, approval triggers, and periodic exports." }] },
    ],
    faqs: BASE_FAQS,
  },
  {
    slug: "workflow-management-system",
    keyword: "workflow management system",
    pageName: "Workflow Management System",
    seoTitle: "Workflow Management System | PanelManage",
    metaDescription:
      "Custom workflow management system with roles, approvals, automation hooks, uploads, exports, and dashboards.",
    h1: "Custom Workflow Management System",
    intro:
      "Bring structure to complex operations with a custom-built workflow management system designed around your states, roles, approvals, and reporting needs.",
    datePublished: PUBLISHED,
    tags: ["workflow", "operations", "automation"],
    sections: [
      {
        h2: "Who This Custom Workflow System Is For",
        blocks: [
          {
            type: "ul",
            items: [
              "Teams with multi-step approvals",
              "Operations with handoffs and statuses",
              "Organizations needing automation hooks",
              "Companies replacing manual ops",
            ],
          },
        ],
      },
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "States and transitions",
              "Approvals and assignments",
              "Notifications",
              "Uploads and documents",
              "Dashboards",
              "Exports and APIs (optional)",
            ],
          },
        ],
      },
      {
        h2: "Typical Workflow Process (Customizable)",
        blocks: [
          {
            type: "steps",
            items: [
              "Item created",
              "Assigned to role",
              "Moves through states",
              "Approvals triggered",
              "Notifications sent",
              "Export/report generated",
              "Audit trail stored",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "State machine + approvals" },
          {
            type: "p",
            text: "Define statuses, transitions, and who can act at each step.",
          },
        ],
      },
      {
        h2: "Security & permissions",
        blocks: [
          {
            type: "p",
            text: "RBAC with optional audit logs. Built for accountability and least-privilege access.",
          },
        ],
      },
      {
        h2: "Integrations & automations",
        blocks: [
          {
            type: "p",
            text: "Automation hooks for reminders, SLAs, escalations, and scheduled exports.",
          },
        ],
      },
    ],
    faqs: BASE_FAQS,
  },
  {
    slug: "case-management-system",
    keyword: "case management system",
    pageName: "Case Management System",
    seoTitle: "Case Management System | PanelManage",
    metaDescription:
      "Custom case management system for intake, documents, approvals, timelines, tasks, and reporting.",
    h1: "Custom Case Management System",
    intro:
      "Manage intake, documents, tasks, and approvals with a case management system built to match your team’s case lifecycle.",
    datePublished: PUBLISHED,
    tags: ["workflow", "operations", "compliance"],
    sections: [
      {
        h2: "Who This Custom Case System Is For",
        blocks: [
          {
            type: "ul",
            items: [
              "Legal and compliance teams",
              "Program operations",
              "Organizations handling sensitive cases",
              "Teams needing audit-friendly workflows",
            ],
          },
        ],
      },
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Case intake",
              "Documents & uploads",
              "Tasks and timelines",
              "Approvals",
              "Notes and updates",
              "Reporting and exports",
            ],
          },
        ],
      },
      {
        h2: "Typical Case Workflow (Customizable)",
        blocks: [
          {
            type: "steps",
            items: [
              "Case created",
              "Docs collected",
              "Assigned to team",
              "Tasks tracked",
              "Approvals completed",
              "Outcome recorded",
              "Reports exported",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "Intake + timeline tracking" },
          {
            type: "p",
            text: "Structured intake forms and timeline views to keep teams aligned.",
          },
        ],
      },
      {
        h2: "Security & permissions",
        blocks: [
          {
            type: "p",
            text: "RBAC, optional audit logs, and secure handling for sensitive information.",
          },
        ],
      },
      {
        h2: "Integrations & automations",
        blocks: [
          {
            type: "p",
            text: "Automations for reminders, status changes, and scheduled exports.",
          },
        ],
      },
    ],
    faqs: BASE_FAQS,
  },
  {
    slug: "admin-panel-software",
    keyword: "admin panel software",
    pageName: "Admin Panel Software",
    seoTitle: "Admin Panel Software | PanelManage",
    metaDescription:
      "Custom admin panel software for internal operations: tables, forms, actions, uploads, approvals, RBAC, and reporting dashboards.",
    h1: "Custom Admin Panel Software",
    intro:
      "Skip generic templates. Build custom admin panel software designed around your internal operations—modules, roles, approvals, uploads, exports, and reporting dashboards.",
    datePublished: PUBLISHED,
    tags: ["platform", "operations", "workflow"],
    sections: [
      {
        h2: "Who This Custom Admin Panel Is For",
        blocks: [
          {
            type: "ul",
            items: [
              "Teams needing internal tools",
              "Ops workflows with approvals",
              "Companies replacing spreadsheets",
              "Organizations requiring RBAC",
            ],
          },
        ],
      },
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Tables, forms, actions",
              "Uploads and documents",
              "Approvals and states",
              "Roles and permissions",
              "Dashboards and reporting",
              "Integrations (optional)",
            ],
          },
        ],
      },
      {
        h2: "Typical workflow",
        blocks: [
          {
            type: "steps",
            items: [
              "Define modules",
              "Design UI",
              "Build core workflows",
              "Add roles and approvals",
              "Testing and QA",
              "Launch and train users",
              "Iterate improvements",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "Module builder approach" },
          {
            type: "p",
            text: "We design your panel as a set of modules that map to real operations.",
          },
        ],
      },
      {
        h2: "Security & permissions",
        blocks: [
          {
            type: "p",
            text: "RBAC, rate limiting, and optional audit logs to protect internal operations.",
          },
        ],
      },
      {
        h2: "Integrations & automations",
        blocks: [
          {
            type: "p",
            text: "Optional integrations and automation hooks for reporting and notifications.",
          },
        ],
      },
    ],
    faqs: BASE_FAQS,
  },
  {
    slug: "internal-management-system",
    keyword: "internal management system",
    pageName: "Internal Management System",
    seoTitle: "Internal Management System | PanelManage",
    metaDescription:
      "Custom internal management system to centralize operations, approvals, reporting, and internal workflows with RBAC and automations.",
    h1: "Internal Management System",
    intro:
      "Centralize operations in an internal management system built for your roles, approvals, reporting, and automations.",
    datePublished: PUBLISHED,
    tags: ["operations", "workflow", "platform"],
    sections: [
      {
        h2: "Who this is for",
        blocks: [
          {
            type: "ul",
            items: [
              "Growing teams with manual ops",
              "Multi-role organizations",
              "Businesses needing approvals",
              "Companies needing internal visibility",
            ],
          },
        ],
      },
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Internal requests",
              "Approvals",
              "Tasks and ownership",
              "Documents and uploads",
              "Reporting",
              "Automation triggers",
            ],
          },
        ],
      },
      {
        h2: "Typical workflow",
        blocks: [
          {
            type: "steps",
            items: [
              "Request created",
              "Assigned to owner",
              "Approval steps run",
              "Work completed",
              "Exports generated",
              "Reporting reviewed",
              "Process improved",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "Operations hub" },
          {
            type: "p",
            text: "A single place to run internal workflows with structured modules and dashboards.",
          },
        ],
      },
      {
        h2: "Security & permissions",
        blocks: [
          {
            type: "p",
            text: "RBAC and least-privilege access. Optional audit logs for accountability.",
          },
        ],
      },
      {
        h2: "Integrations & automations",
        blocks: [
          {
            type: "p",
            text: "Automation hooks for reminders, escalations, and scheduled exports.",
          },
        ],
      },
    ],
    faqs: BASE_FAQS,
  },
  {
    slug: "mental-health-practice-management-system",
    keyword: "mental health practice management system",
    pageName: "Mental Health Practice Management System",
    seoTitle: "Mental Health Practice Management System | PanelManage",
    metaDescription:
      "Custom mental health practice management system with scheduling, intakes, uploads, RBAC, approvals, and reporting workflows.",
    h1: "Mental Health Practice Management System",
    intro:
      "Run intake, scheduling, documentation, and operations with a mental health practice management system built around your real workflow.",
    datePublished: PUBLISHED,
    tags: ["healthcare", "mental-health", "workflow"],
    seoKeywords: [
      "mental health practice management system",
      "psychologist practice management software",
      "terapi randevu sistemi",
      "therapy scheduling software",
      "mental health admin panel",
      "therapy practice management",
      "custom admin panel",
      "management system",
    ],
    sections: [
      {
        h2: "Who this is for",
        blocks: [
          {
            type: "ul",
            items: [
              "Mental health clinics",
              "Therapy centers",
              "Practice admins and coordinators",
              "Teams needing structured intakes",
            ],
          },
        ],
      },
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Intake workflows",
              "Appointments",
              "Documents & uploads",
              "Staff roles and permissions",
              "Reminders",
              "Reporting",
            ],
          },
        ],
      },
      {
        h2: "Typical workflow",
        blocks: [
          {
            type: "steps",
            items: [
              "Intake submitted",
              "Eligibility/triage",
              "Scheduling",
              "Session tracking",
              "Documentation uploaded",
              "Follow-ups triggered",
              "Reporting reviewed",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "Intake + documentation" },
          {
            type: "p",
            text: "Custom forms, uploads, and status tracking to keep work consistent and visible.",
          },
        ],
      },
      { h2: "Security & permissions", blocks: [{ type: "p", text: "RBAC, secure handling, and optional audit logs for sensitive workflows." }] },
      { h2: "Integrations & automations", blocks: [{ type: "p", text: "Optional calendar and messaging integrations with automation hooks for reminders." }] },
    ],
    faqs: BASE_FAQS,
  },
  {
    slug: "psychologist-practice-management-software",
    keyword: "psychologist practice management software",
    pageName: "Psychologist Practice Management Software",
    seoTitle: "Psychologist Practice Management Software | PanelManage",
    metaDescription:
      "Custom psychologist practice management software for intakes, scheduling, documentation, roles, reminders, and reporting.",
    h1: "Psychologist Practice Management Software",
    intro:
      "We build psychologist practice management software that supports intake, scheduling, documentation, reminders, and reporting — tailored to your practice.",
    datePublished: PUBLISHED,
    tags: ["healthcare", "mental-health", "workflow"],
    seoKeywords: [
      "psychologist practice management software",
      "terapi randevu sistemi",
      "therapy scheduling software",
      "mental health practice management",
      "psychologist admin panel",
      "therapy management system",
      "custom admin panel",
      "management system",
    ],
    sections: [
      {
        h2: "Who this is for",
        blocks: [
          {
            type: "ul",
            items: [
              "Psychology practices",
              "Therapists with admin teams",
              "Centers managing multiple providers",
              "Practices needing structured workflows",
            ],
          },
        ],
      },
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Client intake",
              "Appointments",
              "Documentation uploads",
              "Notes/workflow states",
              "Reminders",
              "Reports & exports",
            ],
          },
        ],
      },
      {
        h2: "Typical workflow",
        blocks: [
          {
            type: "steps",
            items: [
              "Client intake",
              "Scheduling",
              "Session tracking",
              "Documentation",
              "Reminders",
              "Exports/reports",
              "Continuous improvement",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "Practice workflows" },
          { type: "p", text: "Role-aware modules for admins, providers, and coordinators." },
        ],
      },
      { h2: "Security & permissions", blocks: [{ type: "p", text: "RBAC, secure workflows, and optional audit logs." }] },
      { h2: "Integrations & automations", blocks: [{ type: "p", text: "Calendar, messaging, and automation hooks for reminders and follow-ups." }] },
    ],
    faqs: BASE_FAQS,
  },
  {
    slug: "teacher-management-system",
    keyword: "teacher management system",
    pageName: "Teacher Management System",
    seoTitle: "Teacher Management System | PanelManage",
    metaDescription:
      "Custom teacher management system for schedules, assignments, approvals, uploads, and reporting.",
    h1: "Custom Teacher Management System",
    intro:
      "Coordinate schedules, approvals, and reporting with a teacher management system built around your school’s operations.",
    datePublished: PUBLISHED,
    tags: ["education", "operations", "workflow"],
    sections: [
      {
        h2: "Who this is for",
        blocks: [
          {
            type: "ul",
            items: [
              "Schools and training centers",
              "Education admin teams",
              "Programs managing teacher schedules",
              "Organizations needing approvals + reporting",
            ],
          },
        ],
      },
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Teacher schedules",
              "Assignments and tasks",
              "Approvals",
              "Document uploads",
              "Exports and reporting",
              "Role-based access",
            ],
          },
        ],
      },
      {
        h2: "Typical workflow",
        blocks: [
          {
            type: "steps",
            items: [
              "Schedules created",
              "Assignments distributed",
              "Approvals completed",
              "Docs uploaded",
              "Reports exported",
              "Issues tracked",
              "Operations improved",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "Schedules + approvals" },
          {
            type: "p",
            text: "Custom modules for scheduling, approvals, and admin workflows.",
          },
        ],
      },
      { h2: "Security & permissions", blocks: [{ type: "p", text: "RBAC for admin vs teachers, with optional audit trails." }] },
      { h2: "Integrations & automations", blocks: [{ type: "p", text: "Automations for reminders and reporting. Optional integrations with school tools." }] },
    ],
    faqs: BASE_FAQS,
  },
];

export const MORE_SOLUTIONS: Solution[] = [
  {
    slug: "law-firm-case-management-system",
    keyword: "law firm case management system",
    pageName: "Law Firm Case Management System",
    seoTitle: "Law Firm Case Management System | PanelManage",
    metaDescription:
      "Custom law firm case management system for intake, documents, timelines, approvals, tasks, and reporting.",
    h1: "Law Firm Case Management System",
    intro:
      "Replace scattered emails and documents with a case system built for legal workflows — intake, tasks, timelines, uploads, and approvals in one place.",
    datePublished: PUBLISHED,
    tags: ["legal", "workflow", "compliance", "operations"],
    extraFaqs: [
      {
        q: "Can you track case timelines and deadlines?",
        a: "Yes. We can build timeline views, deadline reminders, and role-based task ownership for each case stage.",
      },
      {
        q: "Can you support document-heavy cases?",
        a: "Yes. Uploads, versioning patterns, and structured document lists can be included based on requirements.",
      },
    ],
    faqs: buildFaqs([
      {
        q: "Can you track case timelines and deadlines?",
        a: "Yes. We can build timeline views, deadline reminders, and role-based task ownership for each case stage.",
      },
      {
        q: "Can you support document-heavy cases?",
        a: "Yes. Uploads, versioning patterns, and structured document lists can be included based on requirements.",
      },
    ]),
    sections: [
      {
        h2: "What this system solves",
        blocks: [
          {
            type: "ul",
            items: [
              "Centralized case intake and ownership",
              "Document uploads and structured folders",
              "Deadlines, timelines, and task tracking",
              "Approval steps and internal handoffs",
              "Reporting and exports for operations",
            ],
          },
        ],
      },
      {
        h2: "Typical workflow",
        blocks: [
          {
            type: "steps",
            items: [
              "Case intake is created",
              "Documents are collected and verified",
              "Case is assigned to roles",
              "Tasks and deadlines are tracked",
              "Approvals and reviews are completed",
              "Exports/reports generated",
              "Audit trail stored for accountability",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "Case stages and timelines" },
          {
            type: "p",
            text: "Custom stages and timeline views aligned to your real case lifecycle.",
          },
          { type: "h3", text: "Uploads, notes, and history" },
          {
            type: "p",
            text: "Document uploads, internal notes, and full change visibility when needed.",
          },
        ],
      },
    ],
  },
  {
    slug: "inventory-management-system",
    keyword: "inventory management system",
    pageName: "Inventory Management System",
    seoTitle: "Inventory Management System | PanelManage",
    metaDescription:
      "Custom inventory management system for stock, suppliers, approvals, uploads, exports, and internal workflows.",
    h1: "Inventory Management System",
    intro:
      "Track stock, suppliers, and approvals with a custom inventory system that matches how your business actually runs.",
    datePublished: PUBLISHED,
    tags: ["operations", "workflow", "inventory", "internal-tools"],
    seoKeywords: [
      "inventory management system",
      "stock control software",
      "warehouse management",
      "stok takip sistemi",
      "inventory tracking system",
      "warehouse management software",
      "custom admin panel",
      "management system",
    ],
    faqs: buildFaqs([
      {
        q: "Can you support purchase approvals?",
        a: "Yes. Multi-step approvals for procurement and supplier workflows can be included.",
      },
    ]),
    sections: [
      {
        h2: "Who this is for",
        blocks: [
          {
            type: "ul",
            items: [
              "Warehouses and distribution teams",
              "Businesses with multi-step purchasing",
              "Operations teams needing exports/reporting",
              "Companies replacing spreadsheets",
            ],
          },
        ],
      },
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Items, SKUs, categories",
              "Stock in/out movements",
              "Suppliers and purchase requests",
              "Approvals and audit-friendly actions",
              "Exports (CSV/PDF) and reports",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "Tables, forms, actions" },
          {
            type: "p",
            text: "Fast internal workflows for stock moves, purchase requests, and approvals.",
          },
          { type: "h3", text: "Exports and reporting" },
          {
            type: "p",
            text: "Stock snapshots, movement logs, and exportable operational reports.",
          },
        ],
      },
    ],
  },
  {
    slug: "property-management-system",
    keyword: "property management system",
    pageName: "Property Management System",
    seoTitle: "Property Management System | PanelManage",
    metaDescription:
      "Custom property management system for tenants, maintenance requests, approvals, uploads, and reporting.",
    h1: "Property Management System",
    intro:
      "Manage tenants, maintenance workflows, approvals, and reporting in one custom panel — built for property operations.",
    datePublished: PUBLISHED,
    tags: ["operations", "workflow", "property"],
    seoKeywords: [
      "property management system",
      "emlak yönetim paneli",
      "real estate management software",
      "property management software",
      "tenant management system",
      "rental management system",
      "custom admin panel",
      "management system",
    ],
    faqs: buildFaqs([
      {
        q: "Can tenants submit maintenance requests?",
        a: "Yes. We can add a request flow with uploads, statuses, and assignment rules.",
      },
    ]),
    sections: [
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Tenants and properties",
              "Maintenance requests and assignments",
              "Approvals and vendor handoffs",
              "Uploads (photos/docs)",
              "Reporting and exports",
            ],
          },
        ],
      },
      {
        h2: "Typical workflow",
        blocks: [
          {
            type: "steps",
            items: [
              "Request is submitted (tenant/admin)",
              "Assigned to staff/vendor",
              "Approval steps run if needed",
              "Work tracked with uploads",
              "Completion and reporting",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "project-management-system",
    keyword: "project management system",
    pageName: "Project Management System",
    seoTitle: "Project Management System | PanelManage",
    metaDescription:
      "Custom project management system with role-based access, approvals, file uploads, reporting, and workflow states.",
    h1: "Project Management System",
    intro:
      "If generic project tools don’t match your process, we build a custom project management system with your roles, approvals, and reporting.",
    datePublished: PUBLISHED,
    tags: ["workflow", "operations", "project"],
    faqs: buildFaqs([
      {
        q: "Can you tailor the workflow states to our process?",
        a: "Yes. We can define your stages, transitions, approvals, and role permissions for each step.",
      },
    ]),
    sections: [
      {
        h2: "What’s different here",
        blocks: [
          {
            type: "p",
            text: "This isn’t a generic task app. It’s a workflow panel designed around how your team actually delivers work.",
          },
          {
            type: "ul",
            items: [
              "Custom states (draft → review → approved → shipped)",
              "Approvals and handoffs",
              "Role-based access (RBAC)",
              "Uploads and exportable reports",
            ],
          },
        ],
      },
      {
        h2: "Typical workflow",
        blocks: [
          {
            type: "steps",
            items: [
              "Planning and scope",
              "Design and UI",
              "Build and implementation",
              "Testing and QA",
              "Launch and iteration",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "restaurant-management-system",
    keyword: "restaurant management system",
    pageName: "Restaurant Management System",
    seoTitle: "Restaurant Management System | PanelManage",
    metaDescription:
      "Custom restaurant management system for staff workflows, shift tracking, approvals, inventory modules, and reporting.",
    h1: "Restaurant Management System",
    intro:
      "Run restaurant operations with a custom management system that tracks shifts, tasks, approvals, and operational reporting in one place.",
    datePublished: PUBLISHED,
    tags: ["operations", "workforce", "workflow"],
    seoKeywords: [
      "restaurant POS system",
      "F&B management software",
      "table reservation system",
      "restaurant management system",
      "restaurant management software",
      "restoran pos sistemi",
      "custom admin panel",
      "management system",
    ],
    faqs: buildFaqs([
      {
        q: "Can you include shift planning and task tracking?",
        a: "Yes. Shift/role schedules, tasks, and exportable summaries can be included.",
      },
    ]),
    sections: [
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Shift planning and staff roles",
              "Daily tasks and checklists",
              "Approvals and manager controls",
              "Optional inventory modules",
              "Exports and reporting",
            ],
          },
        ],
      },
      {
        h2: "Key modules",
        blocks: [
          { type: "h3", text: "Workforce operations" },
          {
            type: "p",
            text: "A panel that matches how your restaurant runs day-to-day — simple, role-based, and fast.",
          },
        ],
      },
    ],
  },
  {
    slug: "salon-management-system",
    keyword: "salon management system",
    pageName: "Salon Management System",
    seoTitle: "Salon Management System | PanelManage",
    metaDescription:
      "Custom salon management system for appointments, staff workflows, reminders, approvals, uploads, and reporting.",
    h1: "Salon Management System",
    intro:
      "Appointments, staff schedules, and reminders — in a custom panel designed for how your salon operates.",
    datePublished: PUBLISHED,
    tags: ["scheduling", "operations", "workflow"],
    faqs: buildFaqs([
      {
        q: "Can you include appointment reminders?",
        a: "Yes. Reminders and notification flows can be built based on your preferred channels.",
      },
    ]),
    sections: [
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Appointments & availability",
              "Staff schedules",
              "Reminders and follow-ups",
              "Optional approvals",
              "Reporting and exports",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "gym-management-system",
    keyword: "gym management system",
    pageName: "Gym Management System",
    seoTitle: "Gym Management System | PanelManage",
    metaDescription:
      "Custom gym management system for scheduling, staff workflows, member operations, approvals, and reporting.",
    h1: "Gym Management System",
    intro:
      "A gym management system built as a custom operations panel — scheduling, staff workflows, and reporting in one place.",
    datePublished: PUBLISHED,
    tags: ["operations", "workflow", "scheduling"],
    faqs: buildFaqs([
      {
        q: "Can you tailor the system to classes vs appointments?",
        a: "Yes. We can model workflows around class schedules, bookings, and staff operations depending on your business.",
      },
    ]),
    sections: [
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Scheduling workflows",
              "Staff tasks and roles",
              "Approvals (optional)",
              "Exports and reporting",
              "Automation hooks for reminders",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "fleet-management-system",
    keyword: "fleet management system",
    pageName: "Fleet Management System",
    seoTitle: "Fleet Management System | PanelManage",
    metaDescription:
      "Custom fleet management system for vehicles, assignments, maintenance workflows, approvals, uploads, and reporting.",
    h1: "Fleet Management System",
    intro:
      "Track vehicles, assignments, maintenance, approvals, and reporting with a custom fleet panel built for operational clarity.",
    datePublished: PUBLISHED,
    tags: ["operations", "workflow", "logistics"],
    faqs: buildFaqs([
      {
        q: "Can you track maintenance and service history?",
        a: "Yes. We can build maintenance logs, status workflows, and reminder triggers.",
      },
    ]),
    sections: [
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Vehicles and assignments",
              "Maintenance workflows",
              "Approvals and handoffs",
              "Uploads (docs/photos)",
              "Dashboards and exports",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "maintenance-management-system",
    keyword: "maintenance management system",
    pageName: "Maintenance Management System",
    seoTitle: "Maintenance Management System | PanelManage",
    metaDescription:
      "Custom maintenance management system for work orders, approvals, uploads, assignments, and reporting.",
    h1: "Maintenance Management System",
    intro:
      "Run work orders cleanly with a custom maintenance management system — requests, approvals, assignments, uploads, and reporting.",
    datePublished: PUBLISHED,
    tags: ["operations", "workflow", "internal-tools"],
    faqs: buildFaqs([
      {
        q: "Can you include work order approvals?",
        a: "Yes. Multi-step approvals and role-based actions can be included.",
      },
    ]),
    sections: [
      {
        h2: "Typical workflow",
        blocks: [
          {
            type: "steps",
            items: [
              "Request created",
              "Assigned to team",
              "Approval if needed",
              "Work tracked + uploads",
              "Completion + reporting",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "vendor-management-system",
    keyword: "vendor management system",
    pageName: "Vendor Management System",
    seoTitle: "Vendor Management System | PanelManage",
    metaDescription:
      "Custom vendor management system for onboarding, documents, approvals, performance tracking, and reporting.",
    h1: "Vendor Management System",
    intro:
      "Onboard vendors, collect documents, and run approvals with a vendor management system built as a clean internal workflow panel.",
    datePublished: PUBLISHED,
    tags: ["operations", "workflow", "compliance"],
    faqs: buildFaqs([
      {
        q: "Can you include vendor onboarding forms and document uploads?",
        a: "Yes. We can build onboarding modules with uploads, review steps, and approvals.",
      },
    ]),
    sections: [
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Vendor onboarding",
              "Document collection & uploads",
              "Review and approvals",
              "Status tracking",
              "Reporting and exports",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "hr-management-system",
    keyword: "hr management system",
    pageName: "HR Management System",
    seoTitle: "HR Management System | PanelManage",
    metaDescription:
      "Custom HR management system for employee records, approvals, uploads, workflows, and reporting.",
    h1: "HR Management System",
    intro:
      "Centralize HR workflows with a custom panel — employee records, approvals, uploads, and reporting built to match your internal process.",
    datePublished: PUBLISHED,
    tags: ["operations", "workforce", "workflow"],
    seoKeywords: [
      "HR management system",
      "human resources software",
      "employee portal",
      "HRMS software",
      "HR management software",
      "human resources management system",
      "custom admin panel",
      "management system",
    ],
    faqs: buildFaqs([
      {
        q: "Can you manage employee documents and approvals?",
        a: "Yes. Uploads, approvals, and role-specific access can be included.",
      },
    ]),
    sections: [
      {
        h2: "What the system manages",
        blocks: [
          {
            type: "ul",
            items: [
              "Employee records",
              "Document uploads",
              "Approval workflows",
              "Role-based permissions",
              "Exports and reporting",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "insurance-claims-management-system",
    keyword: "claims management system",
    pageName: "Claims Management System",
    seoTitle: "Claims Management System | PanelManage",
    metaDescription:
      "Custom claims management system for intake, documents, approvals, assignments, and reporting.",
    h1: "Claims Management System",
    intro:
      "Manage claims with clarity: intake, document uploads, approvals, assignments, and reporting in a custom workflow panel.",
    datePublished: PUBLISHED,
    tags: ["workflow", "operations", "compliance"],
    faqs: buildFaqs([
      {
        q: "Can you support multi-step approvals and audits?",
        a: "Yes. We can build approvals, status history, and optional audit logs for compliance-friendly workflows.",
      },
    ]),
    sections: [
      {
        h2: "Typical workflow",
        blocks: [
          {
            type: "steps",
            items: [
              "Claim intake created",
              "Docs uploaded and verified",
              "Assigned to reviewers",
              "Approval steps completed",
              "Outcome recorded",
              "Exports/reports generated",
            ],
          },
        ],
      },
    ],
  },
];

export const SOLUTIONS_ALL: Solution[] = [...SOLUTIONS, ...MORE_SOLUTIONS].map(
  (s) => {
    // 1. Ensure H1 has "Custom" prefix
    let h1 = s.h1;
    if (!h1.startsWith("Custom ")) {
      h1 = `Custom ${h1}`;
    }

    // Helper for "System" name (e.g. Appointment Management System -> Appointment System)
    const shortName = s.pageName
      .replace("Management System", "System")
      .replace("Management Software", "System")
      .replace("Software", "System")
      .replace("  ", " "); // cleanup double spaces

    // 2. Transform sections
    const sections = s.sections.map((sec) => {
      // Improve "Who this is for" title with Custom + Short Name
      if (sec.h2.toLowerCase().includes("who this is for")) {
        return {
          ...sec,
          h2: `Who This Custom ${shortName} Is For`,
        };
      }
      // Improve "Typical workflow" title
      if (sec.h2.toLowerCase().includes("typical workflow")) {
        return {
          ...sec,
          h2: `Typical Workflow (Customizable)`,
        };
      }
      return sec;
    });

    // 3. Insert "Why Custom?" section
    const newSections = [...sections];
    // Find index of "Who this is for" section to insert after it
    const whoIndex = newSections.findIndex((sec) =>
      sec.h2.includes("Who This Custom")
    );
    const insertIndex = whoIndex !== -1 ? whoIndex + 1 : 0;

    // Avoid duplicates if already added manually
    if (!newSections.some((sec) => sec.h2.includes("Why Custom Instead"))) {
      newSections.splice(insertIndex, 0, WHY_CUSTOM_SECTION);
    }

    return {
      ...s,
      h1,
      sections: newSections,
    };
  }
);
export const SOLUTION_BY_SLUG = new Map(SOLUTIONS_ALL.map((s) => [s.slug, s]));

export const getSolutionBySlug = cache((slug: string) =>
  SOLUTION_BY_SLUG.get(slug)
);

export const pickRelated = cache((slug: string, count = 5) => {
  const current = SOLUTION_BY_SLUG.get(slug);
  if (!current) return [];
  const scored = SOLUTIONS_ALL.filter((s) => s.slug !== slug).map((s) => {
    const overlap = s.tags.filter((t) => current.tags.includes(t)).length;
    const isCore = ["workflow-management-system", "admin-panel-software", "internal-management-system"].includes(s.slug)
      ? 1
      : 0;
    return { s, score: overlap * 10 + isCore * 3 };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map(({ s }) => ({
    href: `/solutions/${s.slug}`,
    label: s.keyword,
  }));
});
