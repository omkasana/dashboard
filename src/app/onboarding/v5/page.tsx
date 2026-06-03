"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  Sparkles,
  CheckCircle2,
  Circle,
  AlertCircle,
  ArrowRight,
  Users,
  Package,
  DollarSign,
  BarChart3,
  Plug,
  Rocket,
  Shield,
  Target,
  Clock,
  MapPin,
  Layers,
  Workflow,
  HeartHandshake,
  Send,
  CornerDownLeft,
  X,
  ChevronDown,
  Globe,
  Briefcase,
  Factory,
  ShoppingCart,
  Hospital,
  Truck,
  GraduationCap,
  Zap,
  RefreshCw,
} from "lucide-react";

interface QuickChip {
  label: string;
  value: string;
}
interface Question {
  id: string;
  text: string;
  helper: string;
  placeholder: string;
  chips?: QuickChip[];
  multi?: boolean;
}
interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
  questions: Question[];
}
interface Answer {
  questionId: string;
  value: string;
}
interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  questionId?: string;
}

const ERP_SECTIONS: Section[] = [
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

const ALL_QUESTIONS = ERP_SECTIONS.flatMap((s) =>
  s.questions.map((q) => ({ ...q, sectionId: s.id, sectionLabel: s.label })),
);
const TOTAL_QUESTIONS = ALL_QUESTIONS.length;

const SUGGESTION_CHIPS = [
  "I want an ERP for inventory and warehouse management",
  "Build an ERP for HR, payroll, and attendance",
  "I need a manufacturing ERP with BOM and production planning",
  "Set up a trading company ERP with GST and multi-branch",
];

function inferModules(answers: Answer[]): string[] {
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
  if (wh && !wh.includes("no warehouse"))
    modules.add("Warehouse Management (WMS)");
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

function getMissingInfo(answers: Answer[]): string[] {
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

export default function Page() {
  const [isDark, setIsDark] = useState(true);
  const [phase, setPhase] = useState<"landing" | "builder">("landing");
  const [landingInput, setLandingInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionFlat, setCurrentQuestionFlat] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const landingInputRef = useRef<HTMLTextAreaElement>(null);

  const toggleTheme = () => setIsDark((d) => !d);

  const currentQ = ALL_QUESTIONS[currentQuestionFlat] as
    | ((typeof ALL_QUESTIONS)[0] & { sectionId: string; sectionLabel: string })
    | undefined;
  const currentSectionIdx = currentQ
    ? ERP_SECTIONS.findIndex((s) => s.id === currentQ.sectionId)
    : -1;
  const currentSectionInfo =
    currentSectionIdx >= 0 ? ERP_SECTIONS[currentSectionIdx] : null;
  const answeredCount = answers.length;
  const progressPct = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);
  const readiness = Math.min(
    100,
    Math.round((answeredCount / TOTAL_QUESTIONS) * 100),
  );

  const modules = inferModules(answers);
  const missingInfo = getMissingInfo(answers);

  const businessName =
    answers.find((a) => a.questionId === "business_name")?.value || "";
  const industry =
    answers.find((a) => a.questionId === "industry")?.value || "";
  const employees =
    answers.find((a) => a.questionId === "employee_count")?.value || "";
  const geoOps =
    answers.find((a) => a.questionId === "geographies")?.value || "";
  const painPoints =
    answers.find((a) => a.questionId === "pain_points")?.value || "";
  const timeline =
    answers.find((a) => a.questionId === "timeline")?.value || "";
  const integrationsList =
    answers.find((a) => a.questionId === "existing_tools")?.value || "";
  const depts =
    answers.find((a) => a.questionId === "departments")?.value || "";

  const sectionProgress = ERP_SECTIONS.map((section) => {
    const sqs = section.questions.map((q) => q.id);
    const answered = sqs.filter((id) =>
      answers.some((a) => a.questionId === id),
    ).length;
    return {
      id: section.id,
      label: section.label,
      answered,
      total: sqs.length,
      complete: answered === sqs.length,
    };
  });

  const addMessage = useCallback(
    (role: "assistant" | "user", content: string, questionId?: string) => {
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-${Math.random()}`, role, content, questionId },
      ]);
    },
    [],
  );

  const askQuestion = useCallback(
    (
      q: (typeof ALL_QUESTIONS)[0] & {
        sectionId: string;
        sectionLabel: string;
      },
    ) => {
      addMessage("assistant", q.text, q.id);
    },
    [addMessage],
  );

  const startBuilder = useCallback(
    (initialText: string) => {
      if (!initialText.trim()) return;
      setPhase("builder");
      setTimeout(() => {
        addMessage(
          "assistant",
          `Welcome! I'm going to help you design a complete ERP blueprint for your business.\n\nLet's start with the basics. I'll ask you ${TOTAL_QUESTIONS} focused questions across 8 key areas — from your business profile to integrations and rollout priorities.\n\nYour answers will be used to generate a custom ERP module map, integration plan, and phased rollout blueprint.`,
        );
        setTimeout(() => {
          addMessage("user", initialText);
          setTimeout(() => {
            askQuestion(
              ALL_QUESTIONS[0] as (typeof ALL_QUESTIONS)[0] & {
                sectionId: string;
                sectionLabel: string;
              },
            );
          }, 400);
        }, 600);
      }, 200);
    },
    [addMessage, askQuestion],
  );

  const submitAnswer = useCallback(
    (value: string) => {
      if (!value.trim() || !currentQ) return;
      addMessage("user", value);
      setAnswers((prev) => {
        const filtered = prev.filter((a) => a.questionId !== currentQ.id);
        return [...filtered, { questionId: currentQ.id, value }];
      });
      setInputValue("");
      setSelectedChips([]);
      const next = currentQuestionFlat + 1;
      if (next >= TOTAL_QUESTIONS) {
        setIsDone(true);
        setTimeout(() => {
          addMessage(
            "assistant",
            `Discovery complete!\n\nYou've answered all ${TOTAL_QUESTIONS} questions. Your ERP blueprint is now being compiled.\n\nReview your business profile, activated modules, integration requirements, and rollout priorities in the panel on the right. You can export this as a scoping document to share with your implementation partner.`,
          );
        }, 400);
      } else {
        setCurrentQuestionFlat(next);
        const nextQ = ALL_QUESTIONS[next] as (typeof ALL_QUESTIONS)[0] & {
          sectionId: string;
          sectionLabel: string;
        };
        const prevSection = currentQ.sectionId;
        const nextSection = nextQ.sectionId;
        if (prevSection !== nextSection) {
          setTimeout(() => {
            addMessage(
              "assistant",
              `Great. Now let's move to ${nextQ.sectionLabel}.`,
            );
            setTimeout(() => askQuestion(nextQ), 400);
          }, 300);
        } else {
          setTimeout(() => askQuestion(nextQ), 300);
        }
      }
    },
    [currentQ, currentQuestionFlat, addMessage, askQuestion],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (currentQ?.multi && selectedChips.length > 0)
          submitAnswer(selectedChips.join(", "));
        else if (inputValue.trim()) submitAnswer(inputValue);
      }
    },
    [currentQ, selectedChips, inputValue, submitAnswer],
  );

  const toggleChip = useCallback(
    (val: string) => {
      if (!currentQ?.multi) {
        submitAnswer(val);
        return;
      }
      setSelectedChips((prev) =>
        prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val],
      );
    },
    [currentQ, submitAnswer],
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (phase === "builder") inputRef.current?.focus();
  }, [phase, currentQuestionFlat]);

  // ─── Landing Phase ──────────────────────────────────────────────────────────

  if (phase === "landing") {
    return (
      <div
        className="h-screen overflow-hidden flex flex-col relative"
        style={{ fontFamily: "'Inter','system-ui',sans-serif" }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: isDark
              ? "linear-gradient(135deg, #0d0d14 0%, #111018 40%, #0e0c1a 70%, #110d1c 100%)"
              : "linear-gradient(135deg, #eef2ff 0%, #f0f4ff 30%, #f5f0ff 60%, #fff0f8 100%)",
          }}
        />
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full blur-3xl opacity-30"
            style={{
              width: 520,
              height: 520,
              top: -120,
              left: -80,
              background: isDark
                ? "radial-gradient(circle, #4f46e5 0%, transparent 70%)"
                : "radial-gradient(circle, #c7d2fe 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: 400,
              height: 400,
              bottom: -80,
              right: -60,
              background: isDark
                ? "radial-gradient(circle, #7c3aed 0%, transparent 70%)"
                : "radial-gradient(circle, #e9d5ff 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full blur-3xl opacity-15"
            style={{
              width: 300,
              height: 300,
              top: "40%",
              right: "15%",
              background: isDark
                ? "radial-gradient(circle, #2563eb 0%, transparent 70%)"
                : "radial-gradient(circle, #bfdbfe 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-8 pt-6">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              }}
            >
              <Layers size={15} className="text-white" />
            </div>
            <span
              className={`text-sm font-semibold tracking-tight ${isDark ? "text-white/80" : "text-gray-700"}`}
            >
              ERPBlueprint
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.85)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(0,0,0,0.06)",
              backdropFilter: "blur(12px)",
            }}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={15} className="text-white/60" />
            ) : (
              <Moon size={15} className="text-gray-500" />
            )}
          </button>
        </div>

        {/* Main centred content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[680px] flex flex-col items-center gap-5"
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium shadow-sm"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.07)"
                  : "rgba(255,255,255,0.9)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.06)",
                backdropFilter: "blur(12px)",
                color: isDark ? "rgba(255,255,255,0.6)" : "#6366f1",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                style={{ boxShadow: "0 0 6px #4ade80" }}
              />
              AI ERP Builder
            </div>

            {/* Headline */}
            <div className="text-center space-y-3">
              <h1
                className={`text-5xl sm:text-6xl font-bold tracking-tight leading-[1.08] ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Build Your ERP{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  With AI
                </span>
              </h1>
              <p
                className={`text-base leading-relaxed max-w-lg mx-auto ${isDark ? "text-white/45" : "text-gray-500"}`}
              >
                Create a fully customised ERP system for your business by simply
                describing your operations, teams, and requirements.
              </p>
            </div>

            {/* Industry chips */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: "Manufacturing", icon: <Factory size={13} /> },
                { label: "Retail", icon: <ShoppingCart size={13} /> },
                { label: "Healthcare", icon: <Hospital size={13} /> },
                { label: "Warehouse", icon: <Package size={13} /> },
                { label: "Corporate", icon: <Briefcase size={13} /> },
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() =>
                    setLandingInput(
                      `Help me build an ERP for a ${chip.label.toLowerCase()} business`,
                    )
                  }
                  className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-2xl transition-all hover:scale-105"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.85)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(0,0,0,0.07)",
                    backdropFilter: "blur(12px)",
                    color: isDark ? "rgba(255,255,255,0.6)" : "#374151",
                    boxShadow: isDark ? "none" : "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  <span className={isDark ? "text-white/40" : "text-gray-400"}>
                    {chip.icon}
                  </span>
                  {chip.label}
                  <ChevronRight
                    size={13}
                    className={isDark ? "text-white/25" : "text-gray-300"}
                  />
                </button>
              ))}
            </div>

            {/* Prompt card */}
            <div
              className="w-full rounded-3xl overflow-hidden"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.92)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.09)"
                  : "1px solid rgba(0,0,0,0.07)",
                backdropFilter: "blur(20px)",
                boxShadow: isDark
                  ? "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)"
                  : "0 4px 24px rgba(99,102,241,0.08), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)",
              }}
            >
              <textarea
                ref={landingInputRef}
                value={landingInput}
                onChange={(e) => setLandingInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    startBuilder(landingInput);
                  }
                }}
                placeholder="Describe the ERP system you want to build..."
                rows={4}
                className="w-full px-6 pt-5 pb-3 text-sm resize-none outline-none border-none leading-relaxed bg-transparent"
                style={{
                  color: isDark ? "rgba(255,255,255,0.8)" : "#1f2937",
                  caretColor: "#6366f1",
                }}
              />
              <div
                className="flex items-center justify-between px-5 py-4 border-t"
                style={{
                  borderColor: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.05)",
                }}
              >
                <div className="flex flex-wrap gap-1.5">
                  {["Inventory", "HRMS", "CRM", "Finance", "Analytics"].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() =>
                          setLandingInput((p) => (p ? `${p}, ${tag}` : tag))
                        }
                        className="text-xs px-3 py-1.5 rounded-full transition-all"
                        style={{
                          background: isDark
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(99,102,241,0.06)",
                          border: isDark
                            ? "1px solid rgba(255,255,255,0.08)"
                            : "1px solid rgba(99,102,241,0.12)",
                          color: isDark ? "rgba(255,255,255,0.4)" : "#6366f1",
                        }}
                      >
                        {tag}
                      </button>
                    ),
                  )}
                </div>
                <button
                  onClick={() => startBuilder(landingInput)}
                  disabled={!landingInput.trim()}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 text-white flex-shrink-0"
                  style={{
                    background: landingInput.trim()
                      ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                      : isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.1)",
                    boxShadow: landingInput.trim()
                      ? "0 4px 16px rgba(99,102,241,0.4)"
                      : "none",
                  }}
                  aria-label="Start Discovery"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTION_CHIPS.map((s) => (
                <button
                  key={s}
                  onClick={() => startBuilder(s)}
                  className="text-sm px-4 py-2 rounded-full transition-all"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(255,255,255,0.8)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(0,0,0,0.06)",
                    backdropFilter: "blur(8px)",
                    color: isDark ? "rgba(255,255,255,0.45)" : "#6b7280",
                    boxShadow: isDark ? "none" : "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── Builder Phase ──────────────────────────────────────────────────────────

  return (
    <div
      className="h-screen overflow-hidden flex flex-col relative"
      style={{ fontFamily: "'Inter','system-ui',sans-serif" }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #0d0d14 0%, #111018 50%, #0e0c1a 100%)"
            : "linear-gradient(135deg, #eef2ff 0%, #f5f0ff 50%, #fff0f8 100%)",
        }}
      />
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: 500,
            height: 500,
            top: -100,
            left: -80,
            background: isDark
              ? "radial-gradient(circle, #4f46e5 0%, transparent 70%)"
              : "radial-gradient(circle, #c7d2fe 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-15"
          style={{
            width: 350,
            height: 350,
            bottom: -60,
            right: -40,
            background: isDark
              ? "radial-gradient(circle, #7c3aed 0%, transparent 70%)"
              : "radial-gradient(circle, #e9d5ff 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Header */}
      <header
        className="relative z-20 flex-shrink-0 flex items-center justify-between px-5"
        style={{
          background: isDark ? "rgba(13,13,20,0.7)" : "rgba(238,242,255,0.75)",
          backdropFilter: "blur(16px)",
          borderBottom: isDark
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid rgba(99,102,241,0.1)",
          height: "52px",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              }}
            >
              <Layers size={12} className="text-white" />
            </div>
            <span
              className={`text-sm font-semibold ${isDark ? "text-white/75" : "text-gray-700"}`}
            >
              ERPBlueprint
            </span>
          </div>
          <span
            className={`text-xs ${isDark ? "text-white/15" : "text-gray-300"}`}
          >
            ·
          </span>
          <span
            className={`text-xs font-medium ${isDark ? "text-white/35" : "text-gray-400"}`}
          >
            {isDone
              ? "Blueprint Complete"
              : currentSectionInfo?.label || "Discovery"}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 flex-1 max-w-xs mx-8">
          <div
            className="flex-1 h-1 rounded-full overflow-hidden"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(99,102,241,0.1)",
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)" }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span
            className={`text-xs whitespace-nowrap ${isDark ? "text-white/30" : "text-gray-400"}`}
          >
            {progressPct}%
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span
            className={`text-xs hidden sm:block ${isDark ? "text-white/20" : "text-gray-400"}`}
          >
            {isDone
              ? `${TOTAL_QUESTIONS}/${TOTAL_QUESTIONS}`
              : `${currentQuestionFlat + 1} / ${TOTAL_QUESTIONS}`}
          </span>
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.07)"
                : "rgba(255,255,255,0.85)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(0,0,0,0.06)",
            }}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={13} className="text-white/50" />
            ) : (
              <Moon size={13} className="text-gray-400" />
            )}
          </button>
        </div>
      </header>

      {/* Workspace */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row min-h-0 relative z-10">
        {/* Left: Chat */}
        <div
          className="flex flex-col min-h-0 flex-1"
          style={{
            borderRight: isDark
              ? "1px solid rgba(255,255,255,0.05)"
              : "1px solid rgba(99,102,241,0.08)",
          }}
        >
          {/* Section nav */}
          <div
            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto"
            style={{
              borderBottom: isDark
                ? "1px solid rgba(255,255,255,0.05)"
                : "1px solid rgba(99,102,241,0.08)",
              background: isDark
                ? "rgba(255,255,255,0.015)"
                : "rgba(255,255,255,0.5)",
            }}
          >
            {ERP_SECTIONS.map((section, idx) => {
              const isActive = idx === currentSectionIdx && !isDone;
              const isDoneSection = idx < currentSectionIdx || isDone;
              return (
                <div
                  key={section.id}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all"
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15))",
                          border: "1px solid rgba(99,102,241,0.25)",
                          color: isDark ? "#a5b4fc" : "#6366f1",
                        }
                      : isDoneSection
                        ? {
                            background: "rgba(74,222,128,0.08)",
                            border: "1px solid rgba(74,222,128,0.15)",
                            color: isDark ? "#4ade80" : "#16a34a",
                          }
                        : {
                            background: "transparent",
                            border: "1px solid transparent",
                            color: isDark
                              ? "rgba(255,255,255,0.2)"
                              : "rgba(0,0,0,0.25)",
                          }
                  }
                >
                  {isDoneSection && !isActive ? (
                    <CheckCircle2 size={11} />
                  ) : (
                    section.icon
                  )}
                  <span className="hidden sm:block">{section.label}</span>
                </div>
              );
            })}
          </div>

          {/* Messages — centred */}
          <div className="flex-1 overflow-y-auto min-h-0 py-6">
            <div className="w-full max-w-xl mx-auto px-4 flex flex-col gap-3">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="max-w-[86%] space-y-1">
                        <div
                          className="px-4 py-3.5 rounded-3xl rounded-tl-lg text-sm leading-relaxed"
                          style={{
                            background: isDark
                              ? "rgba(255,255,255,0.06)"
                              : "rgba(255,255,255,0.92)",
                            border: isDark
                              ? "1px solid rgba(255,255,255,0.08)"
                              : "1px solid rgba(0,0,0,0.06)",
                            backdropFilter: "blur(12px)",
                            color: isDark
                              ? "rgba(255,255,255,0.78)"
                              : "#1f2937",
                            whiteSpace: "pre-wrap",
                            boxShadow: isDark
                              ? "none"
                              : "0 1px 6px rgba(0,0,0,0.05)",
                          }}
                        >
                          {msg.content}
                        </div>
                        {msg.questionId === currentQ?.id &&
                          currentQ &&
                          !isDone && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.18 }}
                              className="flex items-start gap-1.5 px-2 text-xs"
                              style={{
                                color: isDark
                                  ? "rgba(165,180,252,0.5)"
                                  : "#6366f1",
                                opacity: 0.7,
                              }}
                            >
                              <AlertCircle
                                size={11}
                                className="mt-0.5 flex-shrink-0"
                              />
                              <span>{currentQ.helper}</span>
                            </motion.div>
                          )}
                      </div>
                    ) : (
                      <div
                        className="max-w-[80%] px-4 py-3.5 rounded-3xl rounded-tr-lg text-sm leading-relaxed"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.12))",
                          border: isDark
                            ? "1px solid rgba(99,102,241,0.2)"
                            : "1px solid rgba(99,102,241,0.15)",
                          backdropFilter: "blur(8px)",
                          color: isDark ? "rgba(199,210,254,0.9)" : "#4338ca",
                          boxShadow: isDark
                            ? "none"
                            : "0 1px 6px rgba(99,102,241,0.08)",
                        }}
                      >
                        {msg.content}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Composer — centred, sticky bottom */}
          {!isDone && (
            <div
              className="flex-shrink-0 px-4 py-4"
              style={{
                borderTop: isDark
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "1px solid rgba(99,102,241,0.08)",
                background: isDark
                  ? "rgba(13,13,20,0.5)"
                  : "rgba(238,242,255,0.5)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="w-full max-w-xl mx-auto flex flex-col gap-2.5">
                {/* Chips */}
                {currentQ?.chips && currentQ.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {currentQ.chips.map((chip) => {
                      const isSelected = selectedChips.includes(chip.value);
                      return (
                        <button
                          key={chip.value}
                          onClick={() => toggleChip(chip.value)}
                          className="text-xs px-3 py-1.5 rounded-full transition-all font-medium"
                          style={
                            isSelected
                              ? {
                                  background:
                                    "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))",
                                  border: "1px solid rgba(99,102,241,0.35)",
                                  color: isDark ? "#a5b4fc" : "#6366f1",
                                }
                              : {
                                  background: isDark
                                    ? "rgba(255,255,255,0.05)"
                                    : "rgba(255,255,255,0.8)",
                                  border: isDark
                                    ? "1px solid rgba(255,255,255,0.08)"
                                    : "1px solid rgba(0,0,0,0.07)",
                                  color: isDark
                                    ? "rgba(255,255,255,0.45)"
                                    : "#6b7280",
                                }
                          }
                        >
                          {chip.label}
                        </button>
                      );
                    })}
                  </div>
                )}
                {currentQ?.multi && (
                  <p
                    className="text-xs"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.2)"
                        : "rgba(99,102,241,0.5)",
                    }}
                  >
                    Select all that apply, then click Continue.
                  </p>
                )}

                {/* Input */}
                <div
                  className="flex items-end gap-2 rounded-2xl px-4 py-3"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.9)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.09)"
                      : "1px solid rgba(99,102,241,0.12)",
                    backdropFilter: "blur(12px)",
                    boxShadow: isDark
                      ? "none"
                      : "0 1px 8px rgba(99,102,241,0.07)",
                  }}
                >
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={currentQ?.placeholder || "Type your answer…"}
                    rows={1}
                    className="flex-1 text-sm bg-transparent outline-none border-none resize-none leading-relaxed min-h-[26px] max-h-28"
                    style={{
                      color: isDark ? "rgba(255,255,255,0.8)" : "#1f2937",
                      caretColor: "#6366f1",
                      overflowY: "auto",
                    }}
                    onInput={(e) => {
                      const t = e.target as HTMLTextAreaElement;
                      t.style.height = "auto";
                      t.style.height = `${Math.min(t.scrollHeight, 112)}px`;
                    }}
                  />
                  {currentQ?.multi && selectedChips.length > 0 ? (
                    <button
                      onClick={() => submitAnswer(selectedChips.join(", "))}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all text-white flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        boxShadow: "0 2px 10px rgba(99,102,241,0.35)",
                      }}
                    >
                      Continue <ChevronRight size={13} />
                    </button>
                  ) : (
                    <button
                      onClick={() => submitAnswer(inputValue)}
                      disabled={!inputValue.trim()}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-25 text-white flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        boxShadow: inputValue.trim()
                          ? "0 2px 10px rgba(99,102,241,0.35)"
                          : "none",
                      }}
                      aria-label="Send"
                    >
                      <Send size={13} />
                    </button>
                  )}
                </div>

                {/* Hint */}
                <div
                  className="flex items-center justify-between text-xs"
                  style={{
                    color: isDark
                      ? "rgba(255,255,255,0.18)"
                      : "rgba(0,0,0,0.3)",
                  }}
                >
                  <span className="flex items-center gap-1">
                    <CornerDownLeft size={10} /> Enter to submit · Shift+Enter
                    for new line
                  </span>
                  {currentQuestionFlat > 0 && (
                    <button
                      onClick={() => {
                        const p = currentQuestionFlat - 1;
                        setCurrentQuestionFlat(p);
                        setMessages((prev) => {
                          const li = [...prev]
                            .reverse()
                            .findIndex((m) => m.role === "user");
                          return li === -1
                            ? prev
                            : prev.slice(0, prev.length - li - 1);
                        });
                      }}
                      className="flex items-center gap-1 transition-colors"
                      style={{
                        color: isDark ? "rgba(165,180,252,0.4)" : "#6366f1",
                      }}
                    >
                      <ChevronLeft size={11} /> Back
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {isDone && (
            <div
              className="flex-shrink-0 px-4 py-3 flex items-center justify-center gap-2"
              style={{
                borderTop: isDark
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "1px solid rgba(99,102,241,0.08)",
                background: isDark
                  ? "rgba(74,222,128,0.04)"
                  : "rgba(74,222,128,0.04)",
              }}
            >
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span
                className="text-xs"
                style={{ color: isDark ? "rgba(74,222,128,0.6)" : "#16a34a" }}
              >
                Discovery complete — review your ERP blueprint on the right.
              </span>
            </div>
          )}
        </div>

        {/* Right: Blueprint Panel */}
        <div
          className="flex-shrink-0 lg:w-[380px] xl:w-[420px] overflow-y-auto flex flex-col gap-3 p-4"
          style={{
            background: isDark ? "rgba(10,9,18,0.5)" : "rgba(245,243,255,0.6)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Readiness */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 10 }}
            className="rounded-2xl p-4"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.88)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.07)"
                : "1px solid rgba(99,102,241,0.1)",
              backdropFilter: "blur(12px)",
              boxShadow: isDark ? "none" : "0 1px 8px rgba(99,102,241,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{
                  color: isDark
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(99,102,241,0.5)",
                }}
              >
                Blueprint Readiness
              </span>
              <span
                className={`text-xs font-bold ${
                  readiness >= 80
                    ? "text-emerald-400"
                    : readiness >= 40
                      ? "text-amber-400"
                      : isDark
                        ? "text-indigo-400"
                        : "text-indigo-500"
                }`}
              >
                {readiness}%
              </span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(99,102,241,0.08)",
              }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    readiness >= 80
                      ? "#4ade80"
                      : "linear-gradient(90deg, #6366f1, #a855f7)",
                }}
                animate={{ width: `${readiness}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <div
              className="flex justify-between mt-2.5 text-xs"
              style={{
                color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)",
              }}
            >
              <span>
                {answeredCount} of {TOTAL_QUESTIONS} answered
              </span>
              <span>
                {isDone
                  ? "Ready to build"
                  : `${TOTAL_QUESTIONS - answeredCount} remaining`}
              </span>
            </div>
          </motion.div>

          {/* Business Profile */}
          {(businessName || industry || employees) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-2xl p-4"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.88)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "1px solid rgba(99,102,241,0.1)",
                backdropFilter: "blur(12px)",
                boxShadow: isDark ? "none" : "0 1px 8px rgba(99,102,241,0.06)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{
                  color: isDark
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(99,102,241,0.5)",
                }}
              >
                Business Profile
              </p>
              <div className="space-y-2">
                {businessName && (
                  <div className="flex items-center gap-2">
                    <Building2
                      size={13}
                      style={{
                        color: isDark
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(99,102,241,0.4)",
                      }}
                    />
                    <span
                      className={`text-sm font-medium ${isDark ? "text-white/75" : "text-gray-700"}`}
                    >
                      {businessName}
                    </span>
                  </div>
                )}
                {industry && (
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs w-16"
                      style={{
                        color: isDark
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.3)",
                      }}
                    >
                      Industry
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: isDark ? "#a5b4fc" : "#6366f1" }}
                    >
                      {industry}
                    </span>
                  </div>
                )}
                {employees && (
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs w-16"
                      style={{
                        color: isDark
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.3)",
                      }}
                    >
                      Employees
                    </span>
                    <span
                      className={`text-xs ${isDark ? "text-white/45" : "text-gray-500"}`}
                    >
                      {employees}
                    </span>
                  </div>
                )}
                {geoOps && (
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs w-16"
                      style={{
                        color: isDark
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.3)",
                      }}
                    >
                      Geography
                    </span>
                    <span
                      className={`text-xs ${isDark ? "text-white/45" : "text-gray-500"}`}
                    >
                      {geoOps}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Activated Modules */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-4"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.88)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.07)"
                : "1px solid rgba(99,102,241,0.1)",
              backdropFilter: "blur(12px)",
              boxShadow: isDark ? "none" : "0 1px 8px rgba(99,102,241,0.06)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{
                color: isDark
                  ? "rgba(255,255,255,0.25)"
                  : "rgba(99,102,241,0.5)",
              }}
            >
              Activated Modules
            </p>
            {modules.length <= 2 ? (
              <p
                className="text-xs"
                style={{
                  color: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.3)",
                }}
              >
                Answer questions to activate ERP modules.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {modules.map((mod, i) => (
                  <motion.span
                    key={mod}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      background: isDark
                        ? "rgba(99,102,241,0.1)"
                        : "rgba(99,102,241,0.07)",
                      border: isDark
                        ? "1px solid rgba(99,102,241,0.2)"
                        : "1px solid rgba(99,102,241,0.15)",
                      color: isDark ? "#a5b4fc" : "#6366f1",
                    }}
                  >
                    {mod}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Missing Info */}
          {missingInfo.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl p-4"
              style={{
                background: isDark
                  ? "rgba(251,191,36,0.05)"
                  : "rgba(255,251,235,0.95)",
                border: isDark
                  ? "1px solid rgba(251,191,36,0.12)"
                  : "1px solid rgba(245,158,11,0.15)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{
                  color: isDark
                    ? "rgba(251,191,36,0.5)"
                    : "rgba(180,120,0,0.7)",
                }}
              >
                Missing Information
              </p>
              <div className="space-y-1.5">
                {missingInfo.slice(0, 5).map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Circle
                      size={6}
                      style={{
                        color: isDark
                          ? "rgba(251,191,36,0.4)"
                          : "rgba(245,158,11,0.6)",
                      }}
                    />
                    <span
                      className="text-xs"
                      style={{
                        color: isDark ? "rgba(253,230,138,0.6)" : "#92400e",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
                {missingInfo.length > 5 && (
                  <span
                    className="text-xs"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.18)"
                        : "rgba(0,0,0,0.3)",
                    }}
                  >
                    +{missingInfo.length - 5} more
                  </span>
                )}
              </div>
            </motion.div>
          )}

          {/* Rollout */}
          {(painPoints || timeline) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-4"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.88)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "1px solid rgba(99,102,241,0.1)",
                backdropFilter: "blur(12px)",
                boxShadow: isDark ? "none" : "0 1px 8px rgba(99,102,241,0.06)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{
                  color: isDark
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(99,102,241,0.5)",
                }}
              >
                Rollout & Priorities
              </p>
              {painPoints && (
                <div className="mb-2">
                  <p
                    className="text-xs mb-1"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.2)"
                        : "rgba(0,0,0,0.3)",
                    }}
                  >
                    Pain Points
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: isDark ? "rgba(255,255,255,0.45)" : "#4b5563",
                    }}
                  >
                    {painPoints}
                  </p>
                </div>
              )}
              {timeline && (
                <div className="flex items-center gap-1.5">
                  <Clock
                    size={11}
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.2)"
                        : "rgba(99,102,241,0.4)",
                    }}
                  />
                  <span
                    className="text-xs"
                    style={{
                      color: isDark ? "rgba(255,255,255,0.4)" : "#4b5563",
                    }}
                  >
                    Go-live: {timeline}
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {/* Integrations */}
          {integrationsList && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="rounded-2xl p-4"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.88)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "1px solid rgba(99,102,241,0.1)",
                backdropFilter: "blur(12px)",
                boxShadow: isDark ? "none" : "0 1px 8px rgba(99,102,241,0.06)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{
                  color: isDark
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(99,102,241,0.5)",
                }}
              >
                Integrations
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#4b5563" }}
              >
                {integrationsList}
              </p>
            </motion.div>
          )}

          {/* Departments */}
          {depts && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="rounded-2xl p-4"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.88)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "1px solid rgba(99,102,241,0.1)",
                backdropFilter: "blur(12px)",
                boxShadow: isDark ? "none" : "0 1px 8px rgba(99,102,241,0.06)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{
                  color: isDark
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(99,102,241,0.5)",
                }}
              >
                Departments on ERP
              </p>
              <div className="flex flex-wrap gap-1.5">
                {depts.split(",").map((d) => (
                  <span
                    key={d}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(99,102,241,0.06)",
                      border: isDark
                        ? "1px solid rgba(255,255,255,0.07)"
                        : "1px solid rgba(99,102,241,0.1)",
                      color: isDark ? "rgba(255,255,255,0.4)" : "#6b7280",
                    }}
                  >
                    {d.trim()}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Section Progress */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="rounded-2xl p-4"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.88)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.07)"
                : "1px solid rgba(99,102,241,0.1)",
              backdropFilter: "blur(12px)",
              boxShadow: isDark ? "none" : "0 1px 8px rgba(99,102,241,0.06)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{
                color: isDark
                  ? "rgba(255,255,255,0.25)"
                  : "rgba(99,102,241,0.5)",
              }}
            >
              Discovery Sections
            </p>
            <div className="space-y-2.5">
              {sectionProgress.map((section) => (
                <div key={section.id} className="flex items-center gap-2.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={
                      section.complete
                        ? {
                            background: "rgba(74,222,128,0.12)",
                            color: "#4ade80",
                          }
                        : section.answered > 0
                          ? {
                              background: "rgba(99,102,241,0.12)",
                              color: isDark ? "#a5b4fc" : "#6366f1",
                            }
                          : {
                              background: isDark
                                ? "rgba(255,255,255,0.04)"
                                : "rgba(0,0,0,0.04)",
                              color: isDark
                                ? "rgba(255,255,255,0.15)"
                                : "rgba(0,0,0,0.2)",
                            }
                    }
                  >
                    {section.complete ? (
                      <CheckCircle2 size={12} />
                    ) : section.answered > 0 ? (
                      <RefreshCw size={10} />
                    ) : (
                      <Circle size={10} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-xs font-medium"
                        style={{
                          color: section.complete
                            ? "#4ade80"
                            : section.answered > 0
                              ? isDark
                                ? "rgba(255,255,255,0.65)"
                                : "#374151"
                              : isDark
                                ? "rgba(255,255,255,0.22)"
                                : "rgba(0,0,0,0.3)",
                        }}
                      >
                        {section.label}
                      </span>
                      <span
                        className="text-xs"
                        style={{
                          color: isDark
                            ? "rgba(255,255,255,0.18)"
                            : "rgba(0,0,0,0.25)",
                        }}
                      >
                        {section.answered}/{section.total}
                      </span>
                    </div>
                    <div
                      className="h-1 rounded-full"
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(99,102,241,0.07)",
                      }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: section.complete
                            ? "#4ade80"
                            : "linear-gradient(90deg, #6366f1, #a855f7)",
                        }}
                        animate={{
                          width: `${(section.answered / section.total) * 100}%`,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Done CTA */}
          {isDone && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-4"
              style={{
                background: isDark
                  ? "rgba(74,222,128,0.05)"
                  : "rgba(240,253,244,0.95)",
                border: isDark
                  ? "1px solid rgba(74,222,128,0.12)"
                  : "1px solid rgba(34,197,94,0.15)",
              }}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={16}
                  className="text-emerald-400 mt-0.5 flex-shrink-0"
                />
                <div>
                  <p
                    className={`text-sm font-semibold mb-1 ${isDark ? "text-emerald-400" : "text-emerald-700"}`}
                  >
                    Blueprint Ready
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: isDark ? "rgba(255,255,255,0.35)" : "#4b5563",
                    }}
                  >
                    Your ERP discovery is complete. Export this blueprint to
                    share with your implementation partner.
                  </p>
                  <button
                    className="mt-3 flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all text-white"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                    }}
                  >
                    Export Blueprint <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
