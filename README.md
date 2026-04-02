This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# PRD: AI-Powered CRM & Dynamic Website Management Dashboard

### TL;DR

A fully dynamic CRM and admin panel dashboard enabling businesses, teams, and individuals to manage any website—blog, e-commerce, portfolio, and more—using a config-driven, industry-agnostic system. Built with Next.js, Tailwind CSS, Node.js/Express, and MongoDB, featuring a premium Liquid Glass UI. This solution competes with HubSpot, Zoho, and Salesforce, but zeroes in on streamlined website content and data management without custom development.

---

## Goals

### Business Goals

- Capture the underserved SMBs/individuals needing flexible, branded admin panels without custom development costs.
- Deliver a config-driven architecture enabling entirely new dashboards for any industry without additional coding.
- Establish a scalable SaaS platform rivaling HubSpot and Zoho for website content/data management.
- Reduce new client setup to under 1 hour via streamlined configuration.

### User Goals

- Manage all website content (blog posts, products, portfolio items, etc.) from one unified interface.
- Experience a dashboard tailored precisely to their vertical and usage needs.
- Add/update/delete any data without developer intervention or knowledge.
- Collaborate with team members, maintain data integrity, and secure their workflows with role-based permissioning.

### Non-Goals

- Not a website/page builder—no drag-and-drop or direct visual web design.
- Not competing as a drop-in replacement for WordPress/Webflow (focus: managing data, not website layouts).
- Not offering native mobile app capability in this phase.

---

## User Stories

**Solo Blogger**

- As a Blogger, I want to create, edit, or delete blog posts, so that I can easily maintain content freshness.
- As a Blogger, I want to manage categories and tags, so that posts are well organized for readers.
- As a Blogger, I want to moderate comments, so that I can maintain quality discourse on my site.

**E-commerce Store Owner**

- As a Store Owner, I want to manage products, inventory, and pricing, so that my shop is always up-to-date.
- As an Owner, I want to handle orders and track customer status, so that I can quickly fulfill sales and reduce errors.
- As an Owner, I want to bulk update products (import/export), so that high-volume management is efficient.

**Portfolio Owner**

- As a Portfolio Owner, I want to add or update projects and testimonials, so my public-facing site looks current.
- As a Portfolio Owner, I want to review and respond to contact inquiries, so I can capture opportunities.

**Agency Admin**

- As an Agency Admin, I want to manage multiple client dashboards in one place, so administration is streamlined.
- As an Admin, I want to assign roles/permissions to team members per client/project, ensuring correct data access.

**Team Member/Editor**

- As a Team Member, I want limited access to the modules I’m responsible for (e.g., just blog posts), so that I don’t get overwhelmed by unrelated options.
- As an Editor, I want robust search/filter tools, so I can quickly find and update records.

---

## Functional Requirements

- **Core Dashboard & Navigation (Priority: High)**
  - Dynamic, configurable sidebar (vertical/horizontal), breadcrumbs, and global search.
  - Notification center and dashboard-level theme/palette switching (Liquid Glass UI).

- **Dynamic Module System (Priority: High)**
  - Model-driven CRUD: all list, form, and view layouts are config-based.
  - Supports Table, Grid, Kanban, Calendar, and List views.
  - Form engine supports 20+ field types (including media, tags, object/array fields, etc.).

- **Authentication & Profile (Priority: High)**
  - Secure login page, with theme-matched design.
  - Profile pages with tabs: Account Overview, Activity Timeline, Preferences, Security settings.

- **Settings System (Priority: Medium)**
  - UI, navigation, palette, and notification configuration—editable per workspace/client.

- **Data Management (Priority: High)**
  - Add, update, delete, and view actions for any defined model.
  - Bulk actions, exporting, import, filter panel, advanced pagination, and in-list search.

- **Backend API (Priority: High)**
  - Node.js/Express REST API, config-driven dynamic endpoints, model-to-MongoDB mapping.
  - JWT/session auth, file upload APIs.

- **AI Features (Priority: Future/Low)**
  - Auto-suggest content, smart filters for models, anomaly detection in lists/data.

---

## User Experience

**Entry Point & First-Time User Experience**

- Users land on a login page with a striking Liquid Glass card—translucent, frosted, and animated for premium feel.
- After logging in, new users are greeted with a brief, optional onboarding wizard (explaining modules, navigation, theme settings).
- Returning users go directly to their configured Main Dashboard.

**Core Experience**

- **Step 1:** Dashboard landing — shows summary widgets, recent activity stream, and prominent navigation/sidebar.
  - UI must load rapidly, validate user session instantly, and indicate errors clearly.
- **Step 2:** Navigation via Sidebar, which reflects modules from navigation.config.ts (e.g., Blog Posts, Products, Orders).
  - Tappable/clickable with active indication, instant transitions, keyboard shortcuts.
- **Step 3:** List view for selected module — user sees data in Table, Grid, Kanban, Calendar, or List format (ViewSwitcher).
  - In-list search with instant feedback, column sorting, and dynamic filters panel.
  - Bulk select for mass actions (delete, update, export).
- **Step 4:** Add/Edit Records via FormEngine—fields dynamically rendered by FieldRenderer.
  - Client-side and server-side field validation; clear error messaging for missing/wrong data.
  - Upon save, user is redirected back to their list or the updated/viewed item.
- **Step 5:** View Pages employ configurable layouts (Card, Grid, Profile, Sidebar).
  - Edit, delete, and related-object links as appropriate; activity log visible.
- **Step 6:** Profile and Settings Pages: update personal info, tweak workspace palette, add 2FA, manage nav and notification settings.
  - Responsive tabs, accessibility-compliant controls.
- **Step 7:** Team/Role management (if applicable): Admins invite users, set roles per module—access rules reflected instantly.

**Advanced Features & Edge Cases**

- Power users can customize visible fields, default view modes, export configurations.
- Robust error handling for API/network failures, config errors, and unsupported data types.
- Deep object/array field editing, including nested records, with clear rollbacks if saves fail.
- Unsaved changes prompts on navigation attempt.
- Graceful UI for empty states (no records, first time adding data).

**UI/UX Highlights**

- Prominent Liquid Glass look: Backdrop blur, translucent panels, soft/neon highlights, subtle micro-animations for interactions.
- Fully responsive: mobile, tablet, and desktop — all layouts must degrade gracefully.
- Accessibility: high-contrast options, full keyboard navigation, screen reader support.
- Built-in dark/light mode with instantly switchable themes.
- Notification center and snackbars for action feedback.

---

## Narrative

Riya is the founder of an ambitious e-commerce brand, while also maintaining an active blog to engage her customers. Running both platforms, she finds herself hindered by two outdated admin systems; one is a rigid, freelancer-built backend that can't adapt to her changing needs, while the other is an off-the-shelf WordPress dashboard her team dreads. She struggles to update products or publish blog posts quickly, relies on developers for every small change, and has zero flexibility over user permissions.

When Riya discovers this AI-powered, dynamic CRM/dashboard, everything changes. In under an hour, she connects her MongoDB collections and configures her site's data models using a simple configuration interface—no code needed. Instantly, she is presented with a stunning Liquid Glass admin panel unifying her products, orders, blog posts, and customer inquiries. Her trusted editor now has access solely to blog modules, while her operations lead manages orders without risk of tampering with content. Riya watches recent sales stats and blog activity on her elegant dashboard, all without developer bottlenecks. Now she quickly adapts her workflows for new campaigns, manages team access, and experiments with AI-powered content suggestions as they launch. The result? Less time spent on technical hurdles, more on growing her business.

---

## Success Metrics

### User-Centric Metrics

- Time-to-first-dashboard for a new workspace under 60 minutes (tracked per user/workspace).
- 30-day user retention rate exceeding 60%.
- CSAT (Customer Satisfaction) score > 4.2/5 on post-onboarding surveys.

### Business Metrics

- 100 active workspaces within 3 months of launch.
- 20% month-over-month MRR (Monthly Recurring Revenue) growth.

### Technical Metrics

- API response times under 200ms for list queries (measured via synthetic and real-user tests).
- 99.9% platform uptime, with automated health and availability monitoring.
- FormEngine successfully renders and validates any config, zero critical errors in production.

### Tracking Plan

- User login events (success/failure)
- Module opened (module name, timestamp)
- Record created/updated/deleted (model, user, status)
- View type switched (table, grid, etc.)
- Data export/import triggered
- Filter/search applied
- Bulk action used
- Profile/Settings updated
- Theme/Palette changed

---

## Technical Considerations

### Technical Needs

- **Front-End:** Next.js (App Router), Tailwind CSS, shadcn/ui, Liquid Glass design system, full component reuse.
- **Dynamic Module System:** model-driven config (model.config.ts) for all views/forms, rendering via FieldRenderer.
- **Back-End:** Node.js/Express REST API, dynamic route resolution, multi-tenant workspace logic, role-permissions.
- **Data Models:** Configurable MongoDB collections, per-workspace and per-model.
- **Authentication:** JWT or session, secure password, 2FA optional, session management.
- **File Uploads:** Support for various media field types, cloud storage integration.

### Integration Points

- MongoDB Atlas as the primary database.
- 3rd-party file storage (e.g., AWS S3) for file and image uploads.
- Optional: Integrations with existing client CMSes or e-commerce platforms via REST APIs.

### Data Storage & Privacy

- All structured content stored as MongoDB documents per model.
- User and workspace configs securely stored (server-side or as encrypted DB fields).
- Role-based access: strict endpoint and data-access controls.
- GDPR-compliant: data export, right-to-forget on request; access and audit logs.

### Scalability & Performance

- Multi-tenant: each workspace segmented, with indexes on owner and model fields.
- Anticipated initial load: 100–500 concurrent users, scaling via stateless services.
- User-visible actions must trigger within 200ms under expected load.

### Potential Challenges

- Config system must remain flexible yet intuitive—ensure UI for non-devs is simple.
- Secure dynamic API endpoints to prevent privilege escalation or config injection.
- Support for deep/nested objects (ObjectField, ArrayField) without frustrating end users or causing validation bugs.

---

## Milestones & Sequencing

### Project Estimate

- Large: 4–8 weeks for MVP, leveraging existing component/library work (approx. 40-50% of frontend foundation in place).

### Team Size & Composition

- 2–3 people:
  - 1 Full-Stack Developer (backend and integration; lead)
  - 1 Frontend/UI Specialist (Liquid Glass, component integration)
  - 1 PM/Designer Hybrid (config system, QA, docs, light UX)

### Suggested Phases

**Phase 1: Backend API Foundation (Weeks 1–2)**

- Deliverables: Express/MongoDB dynamic CRUD endpoints, basic auth, configuration model parsing.
- Dependencies: Database/cloud setup, initial model configs.

**Phase 2: Frontend Wiring & Liquid Glass Design (Weeks 2–4)**

- Deliverables: Frontend components connected to live API, dummy data replacement, Liquid Glass UI polish, full login/protected routes.
- Dependencies: API readiness, design QA.

**Phase 3: Settings, Profile, Notifications, Theme System (Weeks 4–6)**

- Deliverables: Full workspace settings, user profile, notification/alerts, palette switching, export/import modules.
- Dependencies: Stable dashboard navigation, complete field type implementations.

**Phase 4: Testing, Polish, Multi-Workspace, Deployment (Weeks 6–8)**

- Deliverables: End-to-end QA, role/permission checks, workspace switching, deployment scripts, initial customer onboarding materials.
- Dependencies: All prior phases complete, production hosting environment.

Already completed: Core component library, FormEngine, List & View layouts, config system (\~40-50% frontend maturity means condensed timeline).

---
