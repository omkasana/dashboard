import type React from "react";
import {
  BarChart3,
  Building2,
  DollarSign,
  HeartHandshake,
  Plug,
  Rocket,
  Users,
  Workflow,
} from "lucide-react";

export interface QuickChip {
  label: string;
  value: string;
}
export interface Question {
  id: string;
  text: string;
  helper: string;
  placeholder: string;
  chips?: QuickChip[];
  multi?: boolean;
}
export interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
  questions: Question[];
}
export interface Answer {
  questionId: string;
  value: string;
}
export interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  questionId?: string;
}

export const ERP_SECTIONS: Section[] = [
  {
    id: "business_profile",
    label: "Business Profile",
    icon: <Building2 size={15} />,
    questions: [
      {
        id: "business_name",
        text: "What is the name of your business?",
        helper:
          "This helps us personalise your ERP blueprint and generate accurate documentation.",
        placeholder: "e.g. Sparsh Polymer Industries Pvt. Ltd.",
        chips: [],
      },
      {
        id: "industry",
        text: "Which industry does your business operate in?",
        helper:
          "Industry determines which modules, compliance rules, and workflows are most relevant for your ERP.",
        placeholder: "Select or type your industry",
        chips: [
          { label: "Manufacturing", value: "Manufacturing" },
          { label: "Trading / Distribution", value: "Trading / Distribution" },
          { label: "Retail / E-commerce", value: "Retail / E-commerce" },
          { label: "Healthcare / Pharma", value: "Healthcare / Pharma" },
          {
            label: "Logistics / Supply Chain",
            value: "Logistics / Supply Chain",
          },
          { label: "Education / EdTech", value: "Education / EdTech" },
          {
            label: "Real Estate / Construction",
            value: "Real Estate / Construction",
          },
          { label: "IT / SaaS / Services", value: "IT / SaaS / Services" },
          { label: "FMCG / Consumer Goods", value: "FMCG / Consumer Goods" },
          { label: "Hospitality / F&B", value: "Hospitality / F&B" },
        ],
      },
      {
        id: "business_model",
        text: "What best describes your business model?",
        helper:
          "B2B, B2C, and hybrid businesses have fundamentally different sales cycles, invoicing, and CRM needs.",
        placeholder: "Describe your business model",
        chips: [
          { label: "B2B — Business to Business", value: "B2B" },
          { label: "B2C — Business to Consumer", value: "B2C" },
          { label: "B2B + B2C Hybrid", value: "B2B + B2C Hybrid" },
          { label: "D2C — Direct to Consumer", value: "D2C" },
          { label: "Marketplace / Platform", value: "Marketplace / Platform" },
          { label: "Government / PSU Contracts", value: "Government / PSU" },
        ],
      },
      {
        id: "employee_count",
        text: "How many employees does your company currently have?",
        helper:
          "Headcount determines user licensing, HR module scope, role hierarchy depth, and onboarding complexity.",
        placeholder: "e.g. 85 employees",
        chips: [
          { label: "1–10 (Startup)", value: "1–10" },
          { label: "11–50 (Small)", value: "11–50" },
          { label: "51–200 (Mid-size)", value: "51–200" },
          { label: "201–500 (Growing)", value: "201–500" },
          { label: "500+ (Enterprise)", value: "500+" },
        ],
      },
      {
        id: "branches",
        text: "How many locations, branches, plants, or warehouses do you operate?",
        helper:
          "Multi-location setups require branch-specific inventory, stock transfer workflows, consolidated reporting, and inter-branch accounting.",
        placeholder: "e.g. 3 plants, 2 warehouses, 5 sales offices",
        chips: [
          { label: "Single location", value: "1 location" },
          { label: "2–5 locations", value: "2–5 locations" },
          { label: "6–20 locations", value: "6–20 locations" },
          { label: "20+ locations", value: "20+ locations" },
        ],
      },
      {
        id: "geographies",
        text: "In which states or countries does your business operate?",
        helper:
          "Geographic scope defines tax compliance (GST, VAT, customs), currency handling, and regional regulatory requirements.",
        placeholder: "e.g. Pan-India, 3 states; or India + UAE",
        chips: [
          { label: "Single state (India)", value: "Single state" },
          { label: "Pan-India", value: "Pan-India" },
          { label: "India + GCC", value: "India + GCC" },
          { label: "India + SEA", value: "India + SEA" },
          { label: "Global", value: "Global" },
        ],
      },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    icon: <Workflow size={15} />,
    questions: [
      {
        id: "inventory_needs",
        text: "Do you manage physical inventory? If yes, describe your inventory complexity.",
        helper:
          "Inventory management is often the core of an ERP. Complexity determines whether you need batch tracking, serial numbers, expiry dates, or multi-unit storage.",
        placeholder: "e.g. 2,000 SKUs with batch and expiry tracking",
        chips: [
          { label: "No inventory — service business", value: "No inventory" },
          {
            label: "Simple inventory — basic stock",
            value: "Simple inventory",
          },
          { label: "Batch / lot tracked items", value: "Batch tracked" },
          { label: "Serial number tracked", value: "Serial number tracked" },
          { label: "Perishables / expiry-dated", value: "Perishables" },
          { label: "High-volume / fast-moving", value: "High-volume" },
        ],
      },
      {
        id: "warehouse_needs",
        text: "Do you have warehouse operations? Describe bin, rack, or zone management needs.",
        helper:
          "Warehousing requirements dictate whether you need WMS features like bin locations, put-away rules, pick-pack-ship workflows, and barcode scanning.",
        placeholder:
          "e.g. Two warehouses with zone-based racking and barcode scanning",
        chips: [
          { label: "No warehouse", value: "No warehouse" },
          { label: "Basic storage only", value: "Basic storage" },
          { label: "Bin / rack locations", value: "Bin / rack locations" },
          { label: "Pick-pack-ship workflow", value: "Pick-pack-ship" },
          { label: "Multi-warehouse", value: "Multi-warehouse" },
          { label: "3PL / outsourced warehouse", value: "3PL" },
        ],
      },
      {
        id: "manufacturing_needs",
        text: "Do you manufacture or assemble products? If yes, describe your production process.",
        helper:
          "Manufacturing requirements determine BOM (Bill of Materials), work orders, routing, production planning, MRP, and quality control needs.",
        placeholder:
          "e.g. Polymer compounding in 3 production lines with BOM and work orders",
        chips: [
          { label: "No manufacturing", value: "No manufacturing" },
          { label: "Simple assembly / kitting", value: "Assembly / kitting" },
          { label: "Discrete manufacturing", value: "Discrete manufacturing" },
          {
            label: "Process / batch manufacturing",
            value: "Process manufacturing",
          },
          { label: "Make-to-order", value: "Make-to-order" },
          { label: "Make-to-stock", value: "Make-to-stock" },
          { label: "Job work / subcontracting", value: "Job work" },
        ],
      },
      {
        id: "procurement_workflow",
        text: "How does your procurement / purchasing process work today?",
        helper:
          "Procurement workflow defines purchase requisition, vendor quotation, PO approval chains, GRN, and three-way matching needs.",
        placeholder:
          "e.g. Purchase team raises PRs, manager approves, vendor sends invoice matched to PO",
        chips: [
          { label: "Ad-hoc purchasing, no formal process", value: "Ad-hoc" },
          { label: "Basic PO → GRN → Invoice", value: "Basic PO flow" },
          {
            label: "Multi-level approval required",
            value: "Multi-level approval",
          },
          { label: "Vendor portal / bidding needed", value: "Vendor portal" },
          { label: "Import / global procurement", value: "Import procurement" },
        ],
      },
      {
        id: "sales_workflow",
        text: "Walk us through how a sale happens — from lead to delivery to payment.",
        helper:
          "Sales workflow mapping ensures the ERP covers your entire order-to-cash cycle: quotations, order confirmation, dispatch, invoicing, and collections.",
        placeholder:
          "e.g. Sales rep quotes → customer approves → dispatch with delivery challan → invoice on delivery → payment in 30 days",
        chips: [
          { label: "Counter sales (walk-in)", value: "Counter sales" },
          {
            label: "Order booking → dispatch → invoice",
            value: "Order → dispatch",
          },
          {
            label: "Quotation → PO from customer → delivery",
            value: "Quotation flow",
          },
          {
            label: "Online orders (e-commerce integration)",
            value: "E-commerce orders",
          },
          { label: "Project-based billing", value: "Project billing" },
          { label: "Subscription / recurring billing", value: "Subscription" },
        ],
      },
      {
        id: "approval_workflows",
        text: "What internal approval workflows do you currently rely on?",
        helper:
          "Approval matrices are critical for compliance and control. ERP should replicate and enforce your existing authorization hierarchy.",
        placeholder:
          "e.g. POs above ₹1L need CFO approval, discounts above 10% need Sales Head sign-off",
        chips: [
          { label: "No formal approvals", value: "No approvals" },
          { label: "Single-level manager approval", value: "Single-level" },
          { label: "Multi-level, amount-based", value: "Multi-level amount" },
          { label: "Role-based approval matrix", value: "Role matrix" },
          { label: "Digital signature required", value: "Digital signature" },
        ],
      },
    ],
  },
  {
    id: "teams_roles",
    label: "Teams & Roles",
    icon: <Users size={15} />,
    questions: [
      {
        id: "departments",
        text: "Which departments in your company will actively use the ERP?",
        helper:
          "Departments that use the ERP need dedicated modules, dashboards, and role-based access. This shapes your total user count and licensing.",
        placeholder: "e.g. Sales, Purchase, Warehouse, Finance, Production, HR",
        chips: [
          { label: "Sales & Marketing", value: "Sales & Marketing" },
          { label: "Purchase & Procurement", value: "Purchase" },
          { label: "Warehouse & Logistics", value: "Warehouse" },
          { label: "Finance & Accounts", value: "Finance" },
          { label: "Production / Manufacturing", value: "Production" },
          { label: "HR & Administration", value: "HR" },
          { label: "Customer Support", value: "Customer Support" },
          { label: "Management / Directors", value: "Management" },
        ],
        multi: true,
      },
      {
        id: "hr_needs",
        text: "What are your HR, payroll, and attendance management requirements?",
        helper:
          "HR module scope ranges from simple attendance to full payroll with statutory compliance (PF, ESI, TDS), leave management, and appraisals.",
        placeholder:
          "e.g. Payroll for 85 staff with PF/ESI, biometric attendance, leave tracking",
        chips: [
          { label: "Basic attendance only", value: "Basic attendance" },
          { label: "Leave management", value: "Leave management" },
          {
            label: "Payroll with statutory (PF/ESI/TDS)",
            value: "Full payroll",
          },
          { label: "Biometric / RFID integration", value: "Biometric" },
          { label: "Performance appraisals", value: "Appraisals" },
          { label: "Recruitment / onboarding", value: "Recruitment" },
        ],
        multi: true,
      },
      {
        id: "access_control",
        text: "How strict are your data access and security requirements?",
        helper:
          "Access control determines whether you need field-level restrictions, branch-level data segregation, audit logs, and user activity tracking.",
        placeholder:
          "e.g. Sales staff can view but not edit pricing; accounts can see all invoices",
        chips: [
          { label: "Basic role-based access", value: "Basic RBAC" },
          {
            label: "Branch-wise data segregation",
            value: "Branch segregation",
          },
          { label: "Field-level restrictions", value: "Field-level" },
          { label: "Full audit trail required", value: "Audit trail" },
          { label: "IP / device whitelisting", value: "IP whitelisting" },
        ],
      },
    ],
  },
  {
    id: "finance",
    label: "Finance & Compliance",
    icon: <DollarSign size={15} />,
    questions: [
      {
        id: "accounting_needs",
        text: "What are your core accounting and financial management requirements?",
        helper:
          "Accounting module complexity depends on whether you need multi-company books, cost centres, project accounting, or just standard P&L and balance sheet.",
        placeholder:
          "e.g. Full double-entry accounting, multi-cost-centre, monthly P&L for management",
        chips: [
          { label: "Basic bookkeeping", value: "Basic bookkeeping" },
          { label: "Full double-entry accounting", value: "Double-entry" },
          { label: "Multi-company / group accounting", value: "Multi-company" },
          { label: "Cost centre / profit centre", value: "Cost centres" },
          { label: "Project accounting", value: "Project accounting" },
          { label: "Budgeting & forecasting", value: "Budgeting" },
        ],
        multi: true,
      },
      {
        id: "gst_compliance",
        text: "What tax and compliance requirements do you need the ERP to handle?",
        helper:
          "Tax compliance is non-negotiable. Incorrect GST filing can attract penalties. Your ERP must generate accurate returns and reconcile with the GSTN portal.",
        placeholder:
          "e.g. GSTR-1, GSTR-3B, e-invoicing, e-way bills for goods dispatch",
        chips: [
          { label: "GST (GSTR-1, 3B, 2A/2B reconciliation)", value: "GST" },
          { label: "E-Invoicing (IRN generation)", value: "E-invoicing" },
          { label: "E-Way Bill generation", value: "E-Way Bill" },
          { label: "TDS / TCS tracking", value: "TDS/TCS" },
          { label: "VAT / customs (export/import)", value: "VAT/Customs" },
          { label: "Multi-currency transactions", value: "Multi-currency" },
        ],
        multi: true,
      },
      {
        id: "billing_invoicing",
        text: "Describe your invoicing and billing complexity.",
        helper:
          "Invoice customisation, multi-format templates, credit note workflows, and payment term tracking are common requirements that vary widely by business.",
        placeholder:
          "e.g. Customised invoices with company logo, GST details, and payment QR code",
        chips: [
          { label: "Standard tax invoices", value: "Standard invoices" },
          {
            label: "Proforma / quotation invoices",
            value: "Proforma invoices",
          },
          { label: "Delivery challan", value: "Delivery challan" },
          { label: "Credit / debit notes", value: "Credit notes" },
          {
            label: "Recurring / subscription billing",
            value: "Recurring billing",
          },
          { label: "Milestone-based billing", value: "Milestone billing" },
        ],
        multi: true,
      },
    ],
  },
  {
    id: "crm",
    label: "CRM & Sales",
    icon: <HeartHandshake size={15} />,
    questions: [
      {
        id: "crm_needs",
        text: "How do you currently manage your customers, leads, and sales pipeline?",
        helper:
          "CRM requirements determine whether you need lead capture, pipeline stages, follow-up automation, customer segmentation, and opportunity tracking.",
        placeholder:
          "e.g. Sales team tracks leads in Excel, follow-ups on WhatsApp, no formal pipeline",
        chips: [
          { label: "No CRM — manage in Excel / WhatsApp", value: "No CRM" },
          { label: "Basic customer master & history", value: "Basic customer" },
          { label: "Lead tracking & pipeline", value: "Lead pipeline" },
          {
            label: "Quotation → conversion workflow",
            value: "Quotation workflow",
          },
          { label: "After-sales support & tickets", value: "Support tickets" },
          { label: "Customer portal / self-service", value: "Customer portal" },
        ],
      },
    ],
  },
  {
    id: "reporting",
    label: "Reporting & Analytics",
    icon: <BarChart3 size={15} />,
    questions: [
      {
        id: "dashboard_needs",
        text: "Who needs dashboards, and what business KPIs must they track in real time?",
        helper:
          "Dashboards define which data surfaces to whom. Founders, ops managers, finance teams, and sales heads each need different KPIs and drill-down capabilities.",
        placeholder:
          "e.g. MD needs sales vs target daily; CFO needs cash flow; Ops Head needs inventory turnover",
        chips: [
          {
            label: "Founder / MD executive dashboard",
            value: "Executive dashboard",
          },
          { label: "Sales performance & pipeline", value: "Sales dashboard" },
          { label: "Inventory & stock movement", value: "Inventory dashboard" },
          { label: "Finance & cash flow", value: "Finance dashboard" },
          { label: "Production & efficiency", value: "Production dashboard" },
          { label: "HR & attendance", value: "HR dashboard" },
        ],
        multi: true,
      },
      {
        id: "reporting_frequency",
        text: "What reporting cadence and formats does your team currently rely on?",
        helper:
          "Scheduled reports save hours of manual data compilation. Knowing the cadence helps pre-configure automated report delivery.",
        placeholder:
          "e.g. Daily sales MIS at 9am, weekly purchase summary on Mondays, monthly P&L by 5th",
        chips: [
          { label: "Daily MIS reports", value: "Daily MIS" },
          { label: "Weekly operational summaries", value: "Weekly reports" },
          { label: "Monthly financial statements", value: "Monthly P&L" },
          { label: "On-demand custom reports", value: "On-demand" },
          { label: "Automated email delivery", value: "Auto email" },
          { label: "Export to Excel / PDF", value: "Excel/PDF export" },
        ],
        multi: true,
      },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: <Plug size={15} />,
    questions: [
      {
        id: "existing_tools",
        text: "What software, hardware, or services must the ERP integrate with?",
        helper:
          "Integration requirements often make or break an ERP selection. Mapping every integration point upfront prevents costly rework after go-live.",
        placeholder:
          "e.g. Tally for accounts, Shopify for e-commerce, WhatsApp for order notifications, biometric device for attendance",
        chips: [
          { label: "Tally / Zoho Books", value: "Tally/Zoho" },
          { label: "Shopify / WooCommerce", value: "E-commerce platform" },
          { label: "WhatsApp Business API", value: "WhatsApp" },
          {
            label: "Payment gateway (Razorpay / PayU)",
            value: "Payment gateway",
          },
          { label: "Barcode / QR scanner", value: "Barcode scanner" },
          { label: "Biometric / attendance device", value: "Biometric device" },
          { label: "Hospital / clinic system (HIS)", value: "HIS" },
          { label: "Logistics / courier API", value: "Logistics API" },
          { label: "GST portal / e-invoice API", value: "GST API" },
        ],
        multi: true,
      },
      {
        id: "infrastructure",
        text: "What are your infrastructure and deployment preferences?",
        helper:
          "Cloud vs on-premise, mobile access, and multi-branch sync requirements directly affect architecture choices and implementation timelines.",
        placeholder:
          "e.g. Cloud preferred, need mobile app for field sales, all branches must sync in real time",
        chips: [
          { label: "Cloud (SaaS) — no server needed", value: "Cloud SaaS" },
          { label: "On-premise — own servers", value: "On-premise" },
          { label: "Hybrid — cloud + local backup", value: "Hybrid" },
          { label: "Mobile app required", value: "Mobile app" },
          { label: "Offline mode needed", value: "Offline mode" },
          { label: "Multi-branch real-time sync", value: "Multi-branch sync" },
        ],
        multi: true,
      },
    ],
  },
  {
    id: "rollout",
    label: "Rollout Plan",
    icon: <Rocket size={15} />,
    questions: [
      {
        id: "pain_points",
        text: "What are your biggest operational pain points that the ERP must solve first?",
        helper:
          "Pain points define your Phase 1 priorities. Solving the highest-impact problems first ensures early ROI and user adoption.",
        placeholder:
          "e.g. Stock mismatches between branches, delayed invoicing, no real-time visibility on receivables",
        chips: [
          {
            label: "No real-time inventory visibility",
            value: "Inventory visibility",
          },
          {
            label: "Manual / error-prone invoicing",
            value: "Manual invoicing",
          },
          {
            label: "Poor receivables / collections tracking",
            value: "Receivables tracking",
          },
          {
            label: "No production planning / scheduling",
            value: "Production planning",
          },
          { label: "HR / payroll done in Excel", value: "HR in Excel" },
          {
            label: "Disconnected branch operations",
            value: "Branch disconnect",
          },
          { label: "No sales pipeline visibility", value: "Sales pipeline" },
        ],
        multi: true,
      },
      {
        id: "phase1_modules",
        text: "Which modules are absolute must-haves for your Phase 1 go-live?",
        helper:
          "Phase 1 scope defines your initial implementation timeline and budget. A focused Phase 1 leads to faster go-live and better adoption.",
        placeholder:
          "e.g. Inventory, Purchase, Sales, GST invoicing — everything else in Phase 2",
        chips: [
          { label: "Inventory & Warehouse", value: "Inventory" },
          { label: "Purchase & Procurement", value: "Purchase" },
          { label: "Sales & Order Management", value: "Sales" },
          { label: "Finance & Accounting", value: "Finance" },
          { label: "GST & Compliance", value: "GST" },
          { label: "HR & Payroll", value: "HR Payroll" },
          { label: "Manufacturing / Production", value: "Manufacturing" },
          { label: "CRM & Lead Management", value: "CRM" },
        ],
        multi: true,
      },
      {
        id: "timeline",
        text: "What is your target go-live timeline, and what is driving that deadline?",
        helper:
          "Timeline constraints affect implementation scope, team readiness, and data migration planning. Being realistic prevents go-live failures.",
        placeholder:
          "e.g. Need to go live before April 1 (new financial year), 3 months from now",
        chips: [
          { label: "ASAP — within 1 month", value: "1 month" },
          { label: "2–3 months", value: "2–3 months" },
          { label: "3–6 months", value: "3–6 months" },
          { label: "6–12 months", value: "6–12 months" },
          { label: "Flexible — quality over speed", value: "Flexible" },
        ],
      },
    ],
  },
];

export const ALL_QUESTIONS = ERP_SECTIONS.flatMap((s) =>
  s.questions.map((q) => ({ ...q, sectionId: s.id, sectionLabel: s.label })),
);
export const TOTAL_QUESTIONS = ALL_QUESTIONS.length;

export const SUGGESTION_CHIPS = [
  "I want an ERP for inventory and warehouse management",
  "Build an ERP for HR, payroll, and attendance",
  "I need a manufacturing ERP with BOM and production planning",
  "Set up a trading company ERP with GST and multi-branch",
];

export function inferModules(answers: Answer[]): string[] {
  const modules = new Set(["Core ERP", "User Management", "Reporting Engine"]);
  const get = (id: string) =>
    answers.find((a) => a.questionId === id)?.value?.toLowerCase() || "";
  const inv = get("inventory_needs");
  const wh = get("warehouse_needs");
  const mfg = get("manufacturing_needs");
  const proc = get("procurement_workflow");
  const sales = get("sales_workflow");
  const hr = get("hr_needs");
  const acc = get("accounting_needs");
  const gst = get("gst_compliance");
  const crm = get("crm_needs");
  const tools = get("existing_tools");
  const infra = get("infrastructure");
  const depts = get("departments");

  if (inv && !inv.includes("no inventory")) modules.add("Inventory Management");
  if (wh && !wh.includes("no warehouse")) {
    modules.add("Warehouse Management (WMS)");
  }
  if (
    inv.includes("batch") ||
    inv.includes("expiry") ||
    inv.includes("perishable")
  )
    modules.add("Batch & Expiry Tracking");
  if (inv.includes("serial")) modules.add("Serial Number Tracking");
  if (mfg && !mfg.includes("no manufacturing")) {
    modules.add("Manufacturing & Production");
    modules.add("Bill of Materials (BOM)");
    modules.add("Work Orders");
  }
  if (mfg.includes("process") || mfg.includes("batch"))
    modules.add("Process Manufacturing");
  if (mfg.includes("job work") || mfg.includes("subcontract"))
    modules.add("Job Work / Subcontracting");
  if (proc && !proc.includes("ad-hoc")) {
    modules.add("Purchase & Procurement");
    modules.add("Vendor Management");
  }
  if (proc.includes("multi-level") || proc.includes("approval"))
    modules.add("Approval Workflows");
  if (sales && sales.length > 0) modules.add("Sales & Order Management");
  if (sales.includes("quotation")) modules.add("Quotation Management");
  if (sales.includes("e-commerce") || tools.includes("shopify"))
    modules.add("E-commerce Integration");
  if (hr.includes("payroll") || hr.includes("pf") || hr.includes("esi"))
    modules.add("Payroll & Statutory Compliance");
  if (hr.includes("attendance") || hr.includes("biometric"))
    modules.add("Attendance Management");
  if (hr.includes("leave")) modules.add("Leave Management");
  if (hr.includes("appraisal")) modules.add("Performance Management");
  if (acc && acc.length > 0) modules.add("Accounting & Finance");
  if (acc.includes("cost centre") || acc.includes("profit centre"))
    modules.add("Cost Centre Accounting");
  if (acc.includes("budget")) modules.add("Budgeting & Forecasting");
  if (gst.includes("gst") || gst.includes("gstin"))
    modules.add("GST & Tax Compliance");
  if (gst.includes("e-invoic")) modules.add("E-Invoicing (IRN)");
  if (gst.includes("e-way")) modules.add("E-Way Bill Generation");
  if (gst.includes("tds")) modules.add("TDS / TCS Management");
  if (crm && !crm.includes("no crm")) modules.add("CRM & Customer Management");
  if (crm.includes("lead") || crm.includes("pipeline"))
    modules.add("Lead & Pipeline Tracking");
  if (crm.includes("support") || crm.includes("ticket"))
    modules.add("Support Ticket Management");
  if (tools.includes("whatsapp")) modules.add("WhatsApp Notifications");
  if (tools.includes("tally")) modules.add("Tally Migration / Integration");
  if (tools.includes("barcode") || tools.includes("scanner"))
    modules.add("Barcode / QR Scanning");
  if (tools.includes("biometric")) modules.add("Biometric Device Integration");
  if (infra.includes("mobile")) modules.add("Mobile App");
  if (infra.includes("offline")) modules.add("Offline Mode");
  if (depts.includes("management") || depts.includes("director"))
    modules.add("Executive Dashboard");
  return Array.from(modules);
}

export function getMissingInfo(answers: Answer[]): string[] {
  const missing: string[] = [];
  const answered = new Set(answers.map((a) => a.questionId));
  if (!answered.has("business_name")) missing.push("Business name");
  if (!answered.has("industry")) missing.push("Industry / sector");
  if (!answered.has("employee_count")) missing.push("Employee count");
  if (!answered.has("branches")) missing.push("Number of locations");
  if (!answered.has("inventory_needs")) missing.push("Inventory requirements");
  if (!answered.has("manufacturing_needs"))
    missing.push("Manufacturing / production needs");
  if (!answered.has("hr_needs")) missing.push("HR & payroll requirements");
  if (!answered.has("gst_compliance"))
    missing.push("GST & tax compliance scope");
  if (!answered.has("dashboard_needs"))
    missing.push("Dashboard & reporting needs");
  if (!answered.has("existing_tools")) missing.push("Integration requirements");
  if (!answered.has("pain_points")) missing.push("Top operational pain points");
  if (!answered.has("timeline")) missing.push("Go-live timeline");
  return missing;
}
