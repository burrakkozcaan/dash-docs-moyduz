export type FaqItem = {
  value: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    value: "what-build",
    question: "What kind of management systems do you build?",
    answer:
      "We build management system software delivered as custom admin panels -- appointment/booking systems, clinic & doctor dashboards, employee management (shifts/tasks), scholarship and school workflows, psychologist practice management, case/workflow management, and internal operations systems. If you can describe the steps, roles, and rules -- we can build it.",
  },
  {
    value: "starter-vs-suite",
    question: "Starter vs Suite vs Custom - how do I choose?",
    answer:
      "Starter is best for a focused panel with one main workflow and faster delivery. Suite is for teams that need more modules, advanced permissions, approvals, exports, and reporting. Custom is for complex systems (multi-tenant, heavy integrations, custom automations) -- scoped per project after discovery.",
  },
  {
    value: "timeline",
    question: "How long does a typical panel take to ship?",
    answer:
      "Most projects ship in 2-8 weeks, depending on scope. We follow a clear path: planning -> design -> build -> testing -> launch. Timeline starts after scope is confirmed (modules + roles) and required access/content is available.",
  },
  {
    value: "what-included",
    question: "What's included in the build?",
    answer:
      "A complete, workflow-ready panel: custom tables and forms, actions, roles & permissions (RBAC), file uploads (docs/images), exports (CSV/PDF when needed), approval states, and a reporting view. We also include QA, launch support, and documentation for your team.",
  },
  {
    value: "maintenance",
    question: "Do you offer maintenance after launch?",
    answer:
      "Yes. Maintenance covers updates, monitoring, backups, security hardening, performance checks, and small improvements. It's ideal when you want the panel to stay fast, secure, and evolving as your process grows.",
  },
  {
    value: "integrations",
    question: "Can you integrate with tools we already use?",
    answer:
      "Yes. We integrate with Google/Microsoft login, calendars, email/SMS notifications, CRMs, spreadsheets, and automation tools (Zapier/Make). For enterprise workflows we can also support APIs and webhooks -- scoped up front so delivery stays predictable.",
  },
];
