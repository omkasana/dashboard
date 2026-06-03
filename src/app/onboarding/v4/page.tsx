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
  const [isDark, setIsDark] = useState(false);
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
            `🎉 Discovery complete!\n\nYou've answered all ${TOTAL_QUESTIONS} questions. Your ERP blueprint is now being compiled.\n\nReview your business profile, activated modules, integration requirements, and rollout priorities in the panel on the right. You can export this as a scoping document to share with your implementation partner.`,
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
              `Great. Now let's move to **${nextQ.sectionLabel}**.`,
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

  // ─── Landing Phase ─────────────────────────────────────────────────────────

  if (phase === "landing") {
    return (
      <div
        className="h-screen overflow-hidden flex flex-col relative"
        style={{ fontFamily: "'Inter','system-ui',sans-serif" }}
      >
        {/* Animated mesh gradient background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 80% 70% at 10% 20%, rgba(255,120,50,0.28) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 85% 15%, rgba(180,80,255,0.30) 0%, transparent 50%), radial-gradient(ellipse 60% 70% at 75% 85%, rgba(50,120,255,0.25) 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255,60,120,0.22) 0%, transparent 50%), radial-gradient(ellipse 100% 100% at 50% 50%, rgba(12,10,18,0.82) 0%, rgba(12,10,18,0.95) 100%)"
              : "radial-gradient(ellipse 80% 70% at 10% 20%, rgba(255,140,60,0.22) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 85% 15%, rgba(180,80,255,0.18) 0%, transparent 50%), radial-gradient(ellipse 60% 70% at 75% 85%, rgba(50,120,255,0.18) 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255,60,120,0.15) 0%, transparent 50%), radial-gradient(ellipse 100% 100% at 50% 50%, rgba(248,246,255,0.88) 0%, rgba(240,238,255,0.97) 100%)",
          }}
        />
        {/* Noise texture */}
        <div
          className="absolute inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px",
          }}
        />
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-5">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,120,50,0.9), rgba(180,80,255,0.9))",
              }}
            >
              <Layers size={14} className="text-white" />
            </div>
            <span
              className={`text-sm font-semibold ${isDark ? "text-white/90" : "text-gray-800"}`}
            >
              ERPBlueprint
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all ${isDark ? "bg-white/[0.06] border-white/[0.1] text-white/60 hover:text-white/90" : "bg-black/[0.05] border-black/[0.08] text-gray-500 hover:text-gray-800"}`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
        {/* Main content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[1000px] h-[1000px] rounded-full blur-[180px]"
              style={{
                background: isDark
                  ? "radial-gradient(circle, rgba(168,85,247,.18), rgba(59,130,246,.15), transparent 70%)"
                  : "radial-gradient(circle, rgba(168,85,247,.10), rgba(59,130,246,.08), transparent 70%)",
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-5xl flex flex-col items-center"
          >
            <div
              className={`mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-xl ${
                isDark
                  ? "bg-white/[0.04] border-white/[0.08] text-white/70"
                  : "bg-white/70 border-black/5 text-gray-700"
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AI ERP Builder
            </div>

            <h1
              className={`text-center font-black tracking-[-0.05em] leading-[0.92] ${
                isDark ? "text-white" : "text-gray-900"
              }`}
              style={{
                fontSize: "clamp(4rem,8vw,7rem)",
              }}
            >
              Build Your ERP
              <span
                className="block"
                style={{
                  background:
                    "linear-gradient(90deg,#ff7a18,#ff4fd8,#8b5cf6,#3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                In Minutes
              </span>
            </h1>

            <p
              className={`mt-6 text-center max-w-2xl text-lg leading-8 ${
                isDark ? "text-white/50" : "text-gray-600"
              }`}
            >
              Describe your business operations and let AI generate a complete
              ERP architecture with modules, workflows, permissions,
              integrations and implementation roadmap.
            </p>

            <div
              className="w-full max-w-4xl mt-10 rounded-[32px] overflow-hidden border backdrop-blur-2xl"
              style={{
                background: isDark
                  ? "rgba(18,18,22,.82)"
                  : "rgba(255,255,255,.82)",

                borderColor: isDark
                  ? "rgba(255,255,255,.08)"
                  : "rgba(0,0,0,.08)",

                boxShadow: isDark
                  ? `
            0 20px 80px rgba(0,0,0,.45),
            0 0 120px rgba(168,85,247,.12),
            inset 0 1px 0 rgba(255,255,255,.06)
          `
                  : `
            0 20px 80px rgba(0,0,0,.08),
            0 0 100px rgba(168,85,247,.08),
            inset 0 1px 0 rgba(255,255,255,.8)
          `,
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
                placeholder={`Create an ERP for a manufacturing company with:

• Inventory Management
• Procurement
• Production Planning
• HR & Payroll
• Quality Control

Describe your requirements...`}
                className={`w-full min-h-[220px] px-8 pt-8 pb-6 resize-none bg-transparent outline-none text-[15px] leading-8 ${
                  isDark
                    ? "text-white placeholder:text-white/25"
                    : "text-gray-900 placeholder:text-gray-400"
                }`}
              />

              <div
                className="flex items-center justify-between px-6 py-4 border-t"
                style={{
                  borderColor: isDark
                    ? "rgba(255,255,255,.06)"
                    : "rgba(0,0,0,.06)",
                }}
              >
                <div className="flex flex-wrap gap-2">
                  {["Inventory", "HRMS", "CRM", "Finance", "Analytics"].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() =>
                          setLandingInput((prev) =>
                            prev ? `${prev}, ${tag}` : tag,
                          )
                        }
                        className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                          isDark
                            ? "bg-white/[0.04] border-white/[0.08] text-white/60 hover:bg-white/[0.08]"
                            : "bg-black/[0.03] border-black/[0.06] text-gray-600 hover:bg-black/[0.06]"
                        }`}
                      >
                        {tag}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() => startBuilder(landingInput)}
                  disabled={!landingInput.trim()}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-105 disabled:opacity-30"
                  style={{
                    background:
                      "linear-gradient(135deg,#ff7a18,#ff4fd8,#8b5cf6)",

                    boxShadow: landingInput.trim()
                      ? "0 12px 35px rgba(168,85,247,.35)"
                      : "none",
                  }}
                >
                  <ArrowRight className="text-white" size={18} />
                </button>
              </div>
            </div>

            {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8 w-full max-w-4xl">
              {[
                { label: "Manufacturing", icon: <Factory size={16} /> },
                { label: "Trading", icon: <Truck size={16} /> },
                { label: "Retail", icon: <ShoppingCart size={16} /> },
                { label: "Healthcare", icon: <Hospital size={16} /> },
                { label: "Logistics", icon: <Package size={16} /> },
                { label: "Services", icon: <Briefcase size={16} /> },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() =>
                    setLandingInput(
                      `Help me build an ERP for a ${item.label.toLowerCase()} business`,
                    )
                  }
                  className={`h-16 rounded-2xl border backdrop-blur-xl flex items-center gap-3 px-5 transition-all hover:scale-[1.02] ${
                    isDark
                      ? "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08]"
                      : "bg-white/60 border-black/[0.06] hover:bg-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div> */}

            {/* <div className="mt-8 w-full max-w-4xl">
              <p
                className={`text-xs text-center mb-3 ${
                  isDark ? "text-white/25" : "text-gray-400"
                }`}
              >
                Popular prompts
              </p>

              <div className="grid md:grid-cols-2 gap-3">
                {SUGGESTION_CHIPS.map((s) => (
                  <button
                    key={s}
                    onClick={() => startBuilder(s)}
                    className={`text-left p-4 rounded-2xl border backdrop-blur-xl transition-all hover:scale-[1.02] ${
                      isDark
                        ? "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]"
                        : "bg-white/60 border-black/[0.05] hover:bg-white"
                    }`}
                  >
                    <ChevronRight
                      size={14}
                      className="inline mr-2 opacity-50"
                    />
                    {s}
                  </button>
                ))}
              </div>
            </div> */}
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── Builder Phase ──────────────────────────────────────────────────────────

  //   return (
  //     <div
  //       className="h-screen overflow-hidden flex flex-col relative"
  //       style={{ fontFamily: "'Inter','system-ui',sans-serif" }}
  //     >
  //       <div
  //         className="absolute inset-0 z-0 pointer-events-none"
  //         style={{
  //           background: isDark
  //             ? "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(255,120,50,0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(180,80,255,0.07) 0%, transparent 50%), #0a0a0c"
  //             : "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(255,140,60,0.07) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(180,80,255,0.05) 0%, transparent 50%), #f5f4f8",
  //         }}
  //       />

  //       {/* Header */}
  //       <header
  //         className="relative z-20 flex-shrink-0 flex items-center justify-between px-4 h-12 backdrop-blur-md border-b"
  //         style={{
  //           background: isDark ? "rgba(10,10,14,0.8)" : "rgba(248,247,252,0.85)",
  //           borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
  //         }}
  //       >
  //         <div className="flex items-center gap-3">
  //           <div className="flex items-center gap-1.5">
  //             <div
  //               className="w-5 h-5 rounded-md flex items-center justify-center"
  //               style={{
  //                 background:
  //                   "linear-gradient(135deg, rgba(255,120,50,0.9), rgba(180,80,255,0.9))",
  //               }}
  //             >
  //               <Layers size={11} className="text-white" />
  //             </div>
  //             <span
  //               className={`text-sm font-semibold ${isDark ? "text-white/80" : "text-gray-800"}`}
  //             >
  //               ERPBlueprint
  //             </span>
  //           </div>
  //           <span
  //             className={`text-xs ${isDark ? "text-white/20" : "text-gray-300"}`}
  //           >
  //             •
  //           </span>
  //           <span
  //             className={`text-xs font-medium ${isDark ? "text-white/40" : "text-gray-500"}`}
  //           >
  //             {isDone
  //               ? "Blueprint Complete"
  //               : currentSectionInfo?.label || "Discovery"}
  //           </span>
  //         </div>
  //         <div className="hidden sm:flex items-center gap-3 flex-1 max-w-sm mx-6">
  //           <div
  //             className={`flex-1 h-1 rounded-full overflow-hidden ${isDark ? "bg-white/[0.06]" : "bg-black/[0.07]"}`}
  //           >
  //             <motion.div
  //               className="h-full rounded-full"
  //               style={{ background: "linear-gradient(90deg, #ff7832, #c050ff)" }}
  //               animate={{ width: `${progressPct}%` }}
  //               transition={{ duration: 0.4, ease: "easeOut" }}
  //             />
  //           </div>
  //           <span
  //             className={`text-xs font-medium whitespace-nowrap ${isDark ? "text-white/40" : "text-gray-400"}`}
  //           >
  //             {progressPct}% complete
  //           </span>
  //         </div>
  //         <div className="flex items-center gap-3">
  //           <span
  //             className={`text-xs hidden sm:block ${isDark ? "text-white/25" : "text-gray-400"}`}
  //           >
  //             {isDone
  //               ? `${TOTAL_QUESTIONS}/${TOTAL_QUESTIONS}`
  //               : `${currentQuestionFlat + 1} of ${TOTAL_QUESTIONS}`}
  //           </span>
  //           <button
  //             onClick={toggleTheme}
  //             className={`p-1.5 rounded-md transition-colors ${isDark ? "bg-white/[0.06] text-white/40 hover:text-white/70" : "bg-black/[0.05] text-gray-400 hover:text-gray-700"}`}
  //             aria-label="Toggle theme"
  //           >
  //             {isDark ? <Sun size={14} /> : <Moon size={14} />}
  //           </button>
  //         </div>
  //       </header>

  //       <div className="flex-1 overflow-hidden flex flex-col lg:flex-row min-h-0 relative z-10">
  //         {/* Left Panel */}
  //         <div
  //           className="flex flex-col min-h-0 flex-1 lg:max-w-[55%] border-r"
  //           style={{
  //             borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)",
  //           }}
  //         >
  //           {/* Section nav */}
  //           <div
  //             className="flex-shrink-0 flex items-center gap-1 px-3 py-2 border-b overflow-x-auto"
  //             style={{
  //               borderColor: isDark
  //                 ? "rgba(255,255,255,0.05)"
  //                 : "rgba(0,0,0,0.06)",
  //             }}
  //           >
  //             {ERP_SECTIONS.map((section, idx) => {
  //               const isActive = idx === currentSectionIdx && !isDone;
  //               const isDoneSection = idx < currentSectionIdx || isDone;
  //               return (
  //                 <div
  //                   key={section.id}
  //                   className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${isActive ? "text-white" : isDoneSection ? (isDark ? "text-emerald-400 bg-emerald-400/10" : "text-emerald-600 bg-emerald-500/10") : isDark ? "text-white/25" : "text-gray-400"}`}
  //                   style={
  //                     isActive
  //                       ? {
  //                           background:
  //                             "linear-gradient(135deg, rgba(255,120,50,0.2), rgba(180,80,255,0.2))",
  //                           border: "1px solid rgba(180,80,255,0.25)",
  //                         }
  //                       : {}
  //                   }
  //                 >
  //                   {isDoneSection && !isActive ? (
  //                     <CheckCircle2 size={11} />
  //                   ) : (
  //                     section.icon
  //                   )}
  //                   <span className="hidden sm:block">{section.label}</span>
  //                 </div>
  //               );
  //             })}
  //           </div>

  //           {/* Messages */}
  //           <div className="flex-1 overflow-y-auto min-h-0 py-4 flex flex-col">
  //             <div className="w-full max-w-2xl mx-auto px-4 space-y-3 flex-1">
  //               <AnimatePresence initial={false}>
  //                 {messages.map((msg) => (
  //                   <motion.div
  //                     key={msg.id}
  //                     initial={{ opacity: 0, y: 10 }}
  //                     animate={{ opacity: 1, y: 0 }}
  //                     transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
  //                     className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
  //                   >
  //                     {msg.role === "assistant" ? (
  //                       <div className="max-w-[88%] space-y-0.5">
  //                         <div
  //                           className="px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed border backdrop-blur-sm"
  //                           style={{
  //                             background: isDark
  //                               ? "rgba(255,255,255,0.04)"
  //                               : "rgba(255,255,255,0.75)",
  //                             borderColor: isDark
  //                               ? "rgba(255,255,255,0.06)"
  //                               : "rgba(0,0,0,0.07)",
  //                             color: isDark
  //                               ? "rgba(255,255,255,0.78)"
  //                               : "#1a1a1c",
  //                             whiteSpace: "pre-wrap",
  //                           }}
  //                         >
  //                           {msg.content.replace(/\*\*(.*?)\*\*/g, "$1")}
  //                         </div>
  //                         {msg.questionId === currentQ?.id &&
  //                           currentQ &&
  //                           !isDone && (
  //                             <motion.div
  //                               initial={{ opacity: 0 }}
  //                               animate={{ opacity: 1 }}
  //                               transition={{ delay: 0.15 }}
  //                               className="px-3 py-2 text-xs flex items-start gap-1.5 max-w-[88%]"
  //                               style={{
  //                                 color: isDark
  //                                   ? "rgba(255,255,255,0.35)"
  //                                   : "#6b6b78",
  //                               }}
  //                             >
  //                               <AlertCircle
  //                                 size={12}
  //                                 className="mt-0.5 flex-shrink-0"
  //                               />
  //                               <span>{currentQ.helper}</span>
  //                             </motion.div>
  //                           )}
  //                       </div>
  //                     ) : (
  //                       <div
  //                         className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed border"
  //                         style={{
  //                           background:
  //                             "linear-gradient(135deg, rgba(255,120,50,0.12), rgba(180,80,255,0.12))",
  //                           borderColor: isDark
  //                             ? "rgba(180,80,255,0.2)"
  //                             : "rgba(180,80,255,0.15)",
  //                           color: isDark ? "rgba(220,190,255,0.9)" : "#5a2d8a",
  //                         }}
  //                       >
  //                         {msg.content}
  //                       </div>
  //                     )}
  //                   </motion.div>
  //                 ))}
  //               </AnimatePresence>
  //               <div ref={chatEndRef} />
  //             </div>
  //           </div>

  //           {/* Composer */}
  //           {!isDone && (
  //             <div
  //               className="flex-shrink-0 border-t py-3"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(10,10,14,0.6)"
  //                   : "rgba(248,247,252,0.8)",
  //                 borderColor: isDark
  //                   ? "rgba(255,255,255,0.05)"
  //                   : "rgba(0,0,0,0.06)",
  //                 backdropFilter: "blur(12px)",
  //               }}
  //             >
  //               <div className="max-w-2xl mx-auto px-3 space-y-2.5">
  //                 {currentQ?.chips && currentQ.chips.length > 0 && (
  //                   <div className="flex flex-wrap gap-1.5">
  //                     {currentQ.chips.map((chip) => {
  //                       const isSelected = selectedChips.includes(chip.value);
  //                       return (
  //                         <button
  //                           key={chip.value}
  //                           onClick={() => toggleChip(chip.value)}
  //                           className="text-xs px-2.5 py-1 rounded-full border transition-all font-medium"
  //                           style={
  //                             isSelected
  //                               ? {
  //                                   background:
  //                                     "linear-gradient(135deg, rgba(255,120,50,0.15), rgba(180,80,255,0.15))",
  //                                   borderColor: "rgba(180,80,255,0.35)",
  //                                   color: isDark
  //                                     ? "rgba(210,160,255,0.95)"
  //                                     : "#7c3aed",
  //                                 }
  //                               : {
  //                                   background: isDark
  //                                     ? "rgba(255,255,255,0.04)"
  //                                     : "rgba(0,0,0,0.03)",
  //                                   borderColor: isDark
  //                                     ? "rgba(255,255,255,0.08)"
  //                                     : "rgba(0,0,0,0.08)",
  //                                   color: isDark
  //                                     ? "rgba(255,255,255,0.45)"
  //                                     : "#6b7280",
  //                                 }
  //                           }
  //                         >
  //                           {chip.label}
  //                         </button>
  //                       );
  //                     })}
  //                   </div>
  //                 )}
  //                 {currentQ?.multi && (
  //                   <p
  //                     className={`text-xs ${isDark ? "text-white/25" : "text-gray-400"}`}
  //                   >
  //                     Select all that apply, then click Continue.
  //                   </p>
  //                 )}
  //                 <div
  //                   className="flex items-end gap-2 rounded-xl border px-3 py-2"
  //                   style={{
  //                     background: isDark
  //                       ? "rgba(255,255,255,0.04)"
  //                       : "rgba(255,255,255,0.7)",
  //                     borderColor: isDark
  //                       ? "rgba(255,255,255,0.08)"
  //                       : "rgba(0,0,0,0.09)",
  //                   }}
  //                 >
  //                   <textarea
  //                     ref={inputRef}
  //                     value={inputValue}
  //                     onChange={(e) => setInputValue(e.target.value)}
  //                     onKeyDown={handleKeyDown}
  //                     placeholder={currentQ?.placeholder || "Type your answer…"}
  //                     rows={1}
  //                     className="flex-1 text-sm bg-transparent outline-none border-none resize-none leading-relaxed min-h-[28px] max-h-28"
  //                     style={{
  //                       color: isDark ? "rgba(255,255,255,0.82)" : "#1a1a1c",
  //                       overflowY: "auto",
  //                     }}
  //                     onInput={(e) => {
  //                       const t = e.target as HTMLTextAreaElement;
  //                       t.style.height = "auto";
  //                       t.style.height = `${Math.min(t.scrollHeight, 112)}px`;
  //                     }}
  //                   />
  //                   <div className="flex items-center gap-1.5 flex-shrink-0 pb-0.5">
  //                     {currentQ?.multi && selectedChips.length > 0 ? (
  //                       <button
  //                         onClick={() => submitAnswer(selectedChips.join(", "))}
  //                         className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all text-white"
  //                         style={{
  //                           background:
  //                             "linear-gradient(135deg, #ff7832, #c050ff)",
  //                           boxShadow: "0 2px 12px rgba(180,80,255,0.35)",
  //                         }}
  //                       >
  //                         Continue <ChevronRight size={13} />
  //                       </button>
  //                     ) : (
  //                       <button
  //                         onClick={() => submitAnswer(inputValue)}
  //                         disabled={!inputValue.trim()}
  //                         className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-30 text-white"
  //                         style={{
  //                           background:
  //                             "linear-gradient(135deg, #ff7832, #c050ff)",
  //                         }}
  //                         aria-label="Send"
  //                       >
  //                         <Send size={13} />
  //                       </button>
  //                     )}
  //                   </div>
  //                 </div>
  //                 <div
  //                   className={`flex items-center justify-between text-xs ${isDark ? "text-white/20" : "text-gray-400"}`}
  //                 >
  //                   <span className="flex items-center gap-1">
  //                     <CornerDownLeft size={10} />
  //                     Enter to submit · Shift+Enter for new line
  //                   </span>
  //                   {currentQuestionFlat > 0 && (
  //                     <button
  //                       onClick={() => {
  //                         const p = currentQuestionFlat - 1;
  //                         setCurrentQuestionFlat(p);
  //                         setMessages((prev) => {
  //                           const li = [...prev]
  //                             .reverse()
  //                             .findIndex((m) => m.role === "user");
  //                           return li === -1
  //                             ? prev
  //                             : prev.slice(0, prev.length - li - 1);
  //                         });
  //                       }}
  //                       className={`flex items-center gap-1 transition-colors ${isDark ? "hover:text-white/50" : "hover:text-gray-600"}`}
  //                     >
  //                       <ChevronLeft size={11} /> Back
  //                     </button>
  //                   )}
  //                 </div>
  //               </div>
  //             </div>
  //           )}
  //           {isDone && (
  //             <div
  //               className="flex-shrink-0 border-t px-4 py-3 flex items-center gap-2"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(10,10,14,0.6)"
  //                   : "rgba(248,247,252,0.8)",
  //                 borderColor: isDark
  //                   ? "rgba(255,255,255,0.05)"
  //                   : "rgba(0,0,0,0.06)",
  //               }}
  //             >
  //               <CheckCircle2
  //                 size={15}
  //                 className="text-emerald-400 flex-shrink-0"
  //               />
  //               <span
  //                 className={`text-xs ${isDark ? "text-white/40" : "text-gray-500"}`}
  //               >
  //                 Discovery complete. Review your ERP blueprint on the right.
  //               </span>
  //             </div>
  //           )}
  //         </div>

  //         {/* Right Panel */}
  //         <div
  //           className="flex-shrink-0 lg:w-[45%] overflow-y-auto flex flex-col gap-3 p-4"
  //           style={{
  //             background: isDark ? "rgba(8,8,11,0.6)" : "rgba(242,240,250,0.7)",
  //           }}
  //         >
  //           {/* Readiness */}
  //           <motion.div
  //             animate={{ opacity: 1, y: 0 }}
  //             initial={{ opacity: 0, y: 8 }}
  //             className="rounded-xl border p-4 backdrop-blur-sm"
  //             style={{
  //               background: isDark
  //                 ? "rgba(255,255,255,0.03)"
  //                 : "rgba(255,255,255,0.7)",
  //               borderColor: isDark
  //                 ? "rgba(255,255,255,0.06)"
  //                 : "rgba(0,0,0,0.07)",
  //             }}
  //           >
  //             <div className="flex items-center justify-between mb-3">
  //               <span
  //                 className={`text-xs font-semibold uppercase tracking-wide ${isDark ? "text-white/30" : "text-gray-400"}`}
  //               >
  //                 Blueprint Readiness
  //               </span>
  //               <span
  //                 className={`text-xs font-bold ${readiness >= 80 ? "text-emerald-400" : readiness >= 40 ? "text-amber-400" : isDark ? "text-violet-400" : "text-violet-600"}`}
  //               >
  //                 {readiness}%
  //               </span>
  //             </div>
  //             <div
  //               className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-white/[0.05]" : "bg-black/[0.06]"}`}
  //             >
  //               <motion.div
  //                 className="h-full rounded-full"
  //                 style={{
  //                   background:
  //                     readiness >= 80
  //                       ? "#4ade80"
  //                       : "linear-gradient(90deg, #ff7832, #c050ff)",
  //                 }}
  //                 animate={{ width: `${readiness}%` }}
  //                 transition={{ duration: 0.5, ease: "easeOut" }}
  //               />
  //             </div>
  //             <div
  //               className={`flex justify-between mt-2 text-xs ${isDark ? "text-white/25" : "text-gray-400"}`}
  //             >
  //               <span>
  //                 {answeredCount} of {TOTAL_QUESTIONS} answered
  //               </span>
  //               <span>
  //                 {isDone
  //                   ? "Ready to build"
  //                   : `${TOTAL_QUESTIONS - answeredCount} remaining`}
  //               </span>
  //             </div>
  //           </motion.div>

  //           {/* Business profile */}
  //           {(businessName || industry || employees) && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 8 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               transition={{ delay: 0.05 }}
  //               className="rounded-xl border p-4 backdrop-blur-sm"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(255,255,255,0.03)"
  //                   : "rgba(255,255,255,0.7)",
  //                 borderColor: isDark
  //                   ? "rgba(255,255,255,0.06)"
  //                   : "rgba(0,0,0,0.07)",
  //               }}
  //             >
  //               <p
  //                 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDark ? "text-white/30" : "text-gray-400"}`}
  //               >
  //                 Business Profile
  //               </p>
  //               <div className="space-y-2">
  //                 {businessName && (
  //                   <div className="flex items-start gap-2">
  //                     <Building2
  //                       size={13}
  //                       className={
  //                         isDark ? "text-white/20 mt-0.5" : "text-gray-400 mt-0.5"
  //                       }
  //                     />
  //                     <span
  //                       className={`text-sm font-medium ${isDark ? "text-white/80" : "text-gray-800"}`}
  //                     >
  //                       {businessName}
  //                     </span>
  //                   </div>
  //                 )}
  //                 {industry && (
  //                   <div className="flex items-center gap-2">
  //                     <span
  //                       className={`text-xs w-16 flex-shrink-0 ${isDark ? "text-white/25" : "text-gray-400"}`}
  //                     >
  //                       Industry
  //                     </span>
  //                     <span
  //                       className="text-xs font-medium"
  //                       style={{
  //                         color: isDark ? "rgba(200,150,255,0.9)" : "#7c3aed",
  //                       }}
  //                     >
  //                       {industry}
  //                     </span>
  //                   </div>
  //                 )}
  //                 {employees && (
  //                   <div className="flex items-center gap-2">
  //                     <span
  //                       className={`text-xs w-16 flex-shrink-0 ${isDark ? "text-white/25" : "text-gray-400"}`}
  //                     >
  //                       Employees
  //                     </span>
  //                     <span
  //                       className={`text-xs ${isDark ? "text-white/50" : "text-gray-600"}`}
  //                     >
  //                       {employees}
  //                     </span>
  //                   </div>
  //                 )}
  //                 {geoOps && (
  //                   <div className="flex items-center gap-2">
  //                     <span
  //                       className={`text-xs w-16 flex-shrink-0 ${isDark ? "text-white/25" : "text-gray-400"}`}
  //                     >
  //                       Geography
  //                     </span>
  //                     <span
  //                       className={`text-xs ${isDark ? "text-white/50" : "text-gray-600"}`}
  //                     >
  //                       {geoOps}
  //                     </span>
  //                   </div>
  //                 )}
  //               </div>
  //             </motion.div>
  //           )}

  //           {/* Modules */}
  //           <motion.div
  //             initial={{ opacity: 0, y: 8 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ delay: 0.1 }}
  //             className="rounded-xl border p-4 backdrop-blur-sm"
  //             style={{
  //               background: isDark
  //                 ? "rgba(255,255,255,0.03)"
  //                 : "rgba(255,255,255,0.7)",
  //               borderColor: isDark
  //                 ? "rgba(255,255,255,0.06)"
  //                 : "rgba(0,0,0,0.07)",
  //             }}
  //           >
  //             <p
  //               className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDark ? "text-white/30" : "text-gray-400"}`}
  //             >
  //               Activated Modules
  //             </p>
  //             {modules.length <= 2 ? (
  //               <p
  //                 className={`text-xs ${isDark ? "text-white/20" : "text-gray-400"}`}
  //               >
  //                 Answer questions to activate relevant ERP modules.
  //               </p>
  //             ) : (
  //               <div className="flex flex-wrap gap-1.5">
  //                 {modules.map((mod, i) => (
  //                   <motion.span
  //                     key={mod}
  //                     initial={{ opacity: 0, scale: 0.9 }}
  //                     animate={{ opacity: 1, scale: 1 }}
  //                     transition={{ delay: i * 0.03 }}
  //                     className="text-xs px-2.5 py-1 rounded-full font-medium border"
  //                     style={{
  //                       background:
  //                         "linear-gradient(135deg, rgba(255,120,50,0.08), rgba(180,80,255,0.08))",
  //                       borderColor: isDark
  //                         ? "rgba(180,80,255,0.18)"
  //                         : "rgba(180,80,255,0.2)",
  //                       color: isDark ? "rgba(200,150,255,0.9)" : "#6d28d9",
  //                     }}
  //                   >
  //                     {mod}
  //                   </motion.span>
  //                 ))}
  //               </div>
  //             )}
  //           </motion.div>

  //           {/* Missing info */}
  //           {missingInfo.length > 0 && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 8 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               transition={{ delay: 0.15 }}
  //               className="rounded-xl border p-4"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(251,191,36,0.04)"
  //                   : "rgba(254,243,199,0.8)",
  //                 borderColor: isDark
  //                   ? "rgba(251,191,36,0.12)"
  //                   : "rgba(245,158,11,0.2)",
  //               }}
  //             >
  //               <p
  //                 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDark ? "text-amber-400/60" : "text-amber-700"}`}
  //               >
  //                 Missing Information
  //               </p>
  //               <div className="space-y-1.5">
  //                 {missingInfo.slice(0, 5).map((item) => (
  //                   <div key={item} className="flex items-center gap-2">
  //                     <Circle
  //                       size={7}
  //                       className={
  //                         isDark ? "text-amber-400/40" : "text-amber-500"
  //                       }
  //                     />
  //                     <span
  //                       className={`text-xs ${isDark ? "text-amber-300/60" : "text-amber-800"}`}
  //                     >
  //                       {item}
  //                     </span>
  //                   </div>
  //                 ))}
  //                 {missingInfo.length > 5 && (
  //                   <span
  //                     className={`text-xs ${isDark ? "text-white/20" : "text-gray-400"}`}
  //                   >
  //                     +{missingInfo.length - 5} more fields needed
  //                   </span>
  //                 )}
  //               </div>
  //             </motion.div>
  //           )}

  //           {/* Rollout */}
  //           {(painPoints || timeline) && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 8 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               transition={{ delay: 0.2 }}
  //               className="rounded-xl border p-4 backdrop-blur-sm"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(255,255,255,0.03)"
  //                   : "rgba(255,255,255,0.7)",
  //                 borderColor: isDark
  //                   ? "rgba(255,255,255,0.06)"
  //                   : "rgba(0,0,0,0.07)",
  //               }}
  //             >
  //               <p
  //                 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDark ? "text-white/30" : "text-gray-400"}`}
  //               >
  //                 Rollout & Priorities
  //               </p>
  //               <div className="space-y-2.5">
  //                 {painPoints && (
  //                   <div>
  //                     <span
  //                       className={`text-xs block mb-1 ${isDark ? "text-white/25" : "text-gray-400"}`}
  //                     >
  //                       Top Pain Points
  //                     </span>
  //                     <p
  //                       className={`text-xs leading-relaxed ${isDark ? "text-white/50" : "text-gray-600"}`}
  //                     >
  //                       {painPoints}
  //                     </p>
  //                   </div>
  //                 )}
  //                 {timeline && (
  //                   <div className="flex items-center gap-2">
  //                     <Clock
  //                       size={12}
  //                       className={isDark ? "text-white/25" : "text-gray-400"}
  //                     />
  //                     <span
  //                       className={`text-xs ${isDark ? "text-white/50" : "text-gray-600"}`}
  //                     >
  //                       Target go-live: {timeline}
  //                     </span>
  //                   </div>
  //                 )}
  //               </div>
  //             </motion.div>
  //           )}

  //           {/* Integrations */}
  //           {integrationsList && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 8 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               transition={{ delay: 0.22 }}
  //               className="rounded-xl border p-4 backdrop-blur-sm"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(255,255,255,0.03)"
  //                   : "rgba(255,255,255,0.7)",
  //                 borderColor: isDark
  //                   ? "rgba(255,255,255,0.06)"
  //                   : "rgba(0,0,0,0.07)",
  //               }}
  //             >
  //               <p
  //                 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDark ? "text-white/30" : "text-gray-400"}`}
  //               >
  //                 Integrations Required
  //               </p>
  //               <p
  //                 className={`text-xs leading-relaxed ${isDark ? "text-white/50" : "text-gray-600"}`}
  //               >
  //                 {integrationsList}
  //               </p>
  //             </motion.div>
  //           )}

  //           {/* Departments */}
  //           {depts && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 8 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               transition={{ delay: 0.24 }}
  //               className="rounded-xl border p-4 backdrop-blur-sm"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(255,255,255,0.03)"
  //                   : "rgba(255,255,255,0.7)",
  //                 borderColor: isDark
  //                   ? "rgba(255,255,255,0.06)"
  //                   : "rgba(0,0,0,0.07)",
  //               }}
  //             >
  //               <p
  //                 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDark ? "text-white/30" : "text-gray-400"}`}
  //               >
  //                 Departments on ERP
  //               </p>
  //               <div className="flex flex-wrap gap-1.5">
  //                 {depts.split(",").map((d) => (
  //                   <span
  //                     key={d}
  //                     className={`text-xs px-2.5 py-1 rounded-full border ${isDark ? "bg-white/[0.04] border-white/[0.07] text-white/45" : "bg-black/[0.03] border-black/[0.07] text-gray-500"}`}
  //                   >
  //                     {d.trim()}
  //                   </span>
  //                 ))}
  //               </div>
  //             </motion.div>
  //           )}

  //           {/* Section progress */}
  //           <motion.div
  //             initial={{ opacity: 0, y: 8 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ delay: 0.28 }}
  //             className="rounded-xl border p-4 backdrop-blur-sm"
  //             style={{
  //               background: isDark
  //                 ? "rgba(255,255,255,0.03)"
  //                 : "rgba(255,255,255,0.7)",
  //               borderColor: isDark
  //                 ? "rgba(255,255,255,0.06)"
  //                 : "rgba(0,0,0,0.07)",
  //             }}
  //           >
  //             <p
  //               className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDark ? "text-white/30" : "text-gray-400"}`}
  //             >
  //               Discovery Sections
  //             </p>
  //             <div className="space-y-2">
  //               {sectionProgress.map((section) => (
  //                 <div key={section.id} className="flex items-center gap-2.5">
  //                   <div
  //                     className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${section.complete ? "bg-emerald-400/15 text-emerald-400" : section.answered > 0 ? "text-violet-400" : isDark ? "bg-white/[0.04] text-white/15" : "bg-black/[0.04] text-gray-300"}`}
  //                     style={
  //                       section.answered > 0 && !section.complete
  //                         ? {
  //                             background:
  //                               "linear-gradient(135deg, rgba(255,120,50,0.12), rgba(180,80,255,0.12))",
  //                           }
  //                         : {}
  //                     }
  //                   >
  //                     {section.complete ? (
  //                       <CheckCircle2 size={12} />
  //                     ) : section.answered > 0 ? (
  //                       <RefreshCw size={10} />
  //                     ) : (
  //                       <Circle size={10} />
  //                     )}
  //                   </div>
  //                   <div className="flex-1 min-w-0">
  //                     <div className="flex items-center justify-between">
  //                       <span
  //                         className={`text-xs font-medium ${section.complete ? "text-emerald-400" : section.answered > 0 ? (isDark ? "text-white/70" : "text-gray-700") : isDark ? "text-white/25" : "text-gray-400"}`}
  //                       >
  //                         {section.label}
  //                       </span>
  //                       <span
  //                         className={`text-xs ${isDark ? "text-white/20" : "text-gray-400"}`}
  //                       >
  //                         {section.answered}/{section.total}
  //                       </span>
  //                     </div>
  //                     <div
  //                       className={`mt-1 h-1 rounded-full ${isDark ? "bg-white/[0.04]" : "bg-black/[0.05]"}`}
  //                     >
  //                       <motion.div
  //                         className="h-full rounded-full"
  //                         style={{
  //                           background: section.complete
  //                             ? "#4ade80"
  //                             : "linear-gradient(90deg, #ff7832, #c050ff)",
  //                         }}
  //                         animate={{
  //                           width: `${(section.answered / section.total) * 100}%`,
  //                         }}
  //                         transition={{ duration: 0.4, ease: "easeOut" }}
  //                       />
  //                     </div>
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           </motion.div>

  //           {/* Done CTA */}
  //           {isDone && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 8 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               className="rounded-xl border p-4"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(74,222,128,0.04)"
  //                   : "rgba(240,253,244,0.9)",
  //                 borderColor: isDark
  //                   ? "rgba(74,222,128,0.15)"
  //                   : "rgba(34,197,94,0.2)",
  //               }}
  //             >
  //               <div className="flex items-start gap-3">
  //                 <CheckCircle2 size={16} className="text-emerald-400 mt-0.5" />
  //                 <div>
  //                   <p
  //                     className={`text-sm font-semibold mb-1 ${isDark ? "text-emerald-400" : "text-emerald-700"}`}
  //                   >
  //                     Blueprint Ready
  //                   </p>
  //                   <p
  //                     className={`text-xs leading-relaxed ${isDark ? "text-white/40" : "text-gray-500"}`}
  //                   >
  //                     Your ERP discovery is complete. Share this blueprint with
  //                     your implementation partner or export it as a scoping
  //                     document.
  //                   </p>
  //                   <button
  //                     className="mt-3 flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-all text-white"
  //                     style={{
  //                       background: "linear-gradient(135deg, #ff7832, #c050ff)",
  //                       boxShadow: "0 4px 16px rgba(180,80,255,0.35)",
  //                     }}
  //                   >
  //                     Export Blueprint <ArrowRight size={12} />
  //                   </button>
  //                 </div>
  //               </div>
  //             </motion.div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );

  //   return (
  //     <div
  //       className="h-screen overflow-hidden flex flex-col relative"
  //       style={{ fontFamily: "'Inter','system-ui',sans-serif" }}
  //     >
  //       <div
  //         className="absolute inset-0 z-0 pointer-events-none"
  //         style={{
  //           background: isDark
  //             ? "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(255,120,50,0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(180,80,255,0.07) 0%, transparent 50%), #0a0a0c"
  //             : "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(255,140,60,0.07) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(180,80,255,0.05) 0%, transparent 50%), #f5f4f8",
  //         }}
  //       />

  //       {/* Header */}
  //       <header
  //         className="relative z-20 flex-shrink-0 flex items-center justify-between px-4 h-12 backdrop-blur-md border-b"
  //         style={{
  //           background: isDark ? "rgba(10,10,14,0.8)" : "rgba(248,247,252,0.85)",
  //           borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
  //         }}
  //       >
  //         <div className="flex items-center gap-3">
  //           <div className="flex items-center gap-1.5">
  //             <div
  //               className="w-5 h-5 rounded-md flex items-center justify-center"
  //               style={{
  //                 background:
  //                   "linear-gradient(135deg, rgba(255,120,50,0.9), rgba(180,80,255,0.9))",
  //               }}
  //             >
  //               <Layers size={11} className="text-white" />
  //             </div>
  //             <span
  //               className={`text-sm font-semibold ${isDark ? "text-white/80" : "text-gray-800"}`}
  //             >
  //               ERPBlueprint
  //             </span>
  //           </div>
  //           <span
  //             className={`text-xs ${isDark ? "text-white/20" : "text-gray-300"}`}
  //           >
  //             •
  //           </span>
  //           <span
  //             className={`text-xs font-medium ${isDark ? "text-white/40" : "text-gray-500"}`}
  //           >
  //             {isDone
  //               ? "Blueprint Complete"
  //               : currentSectionInfo?.label || "Discovery"}
  //           </span>
  //         </div>

  //         <div className="hidden sm:flex items-center gap-3 flex-1 max-w-sm mx-6">
  //           <div
  //             className={`flex-1 h-0.5 rounded-full overflow-hidden ${isDark ? "bg-white/[0.06]" : "bg-black/[0.07]"}`}
  //           >
  //             <motion.div
  //               className="h-full rounded-full"
  //               style={{ background: "linear-gradient(90deg, #ff7832, #c050ff)" }}
  //               animate={{ width: `${progressPct}%` }}
  //               transition={{ duration: 0.4, ease: "easeOut" }}
  //             />
  //           </div>
  //           <span
  //             className={`text-xs font-medium whitespace-nowrap ${isDark ? "text-white/35" : "text-gray-400"}`}
  //           >
  //             {progressPct}% complete
  //           </span>
  //         </div>

  //         <div className="flex items-center gap-3">
  //           <span
  //             className={`text-xs hidden sm:block ${isDark ? "text-white/25" : "text-gray-400"}`}
  //           >
  //             {isDone
  //               ? `${TOTAL_QUESTIONS}/${TOTAL_QUESTIONS}`
  //               : `${currentQuestionFlat + 1} of ${TOTAL_QUESTIONS}`}
  //           </span>
  //           <button
  //             onClick={toggleTheme}
  //             className={`p-1.5 rounded-md transition-colors ${isDark ? "bg-white/[0.06] text-white/40 hover:text-white/70" : "bg-black/[0.05] text-gray-400 hover:text-gray-700"}`}
  //             aria-label="Toggle theme"
  //           >
  //             {isDark ? <Sun size={14} /> : <Moon size={14} />}
  //           </button>
  //         </div>
  //       </header>

  //       <div className="flex-1 overflow-hidden flex flex-col lg:flex-row min-h-0 relative z-10">
  //         {/* Left Panel */}
  //         <div
  //           className="flex flex-col min-h-0 flex-1 lg:basis-[74%] lg:max-w-[74%]"
  //           style={{
  //             borderColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)",
  //           }}
  //         >
  //           {/* Section nav */}
  //           <div
  //             className="flex-shrink-0 flex items-center gap-1 px-4 py-2.5 border-b overflow-x-auto"
  //             style={{
  //               borderColor: isDark
  //                 ? "rgba(255,255,255,0.04)"
  //                 : "rgba(0,0,0,0.05)",
  //               background: isDark
  //                 ? "rgba(255,255,255,0.01)"
  //                 : "rgba(255,255,255,0.32)",
  //             }}
  //           >
  //             {ERP_SECTIONS.map((section, idx) => {
  //               const isActive = idx === currentSectionIdx && !isDone;
  //               const isDoneSection = idx < currentSectionIdx || isDone;
  //               return (
  //                 <div
  //                   key={section.id}
  //                   className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
  //                     isActive
  //                       ? "text-white"
  //                       : isDoneSection
  //                         ? isDark
  //                           ? "text-emerald-400 bg-emerald-400/10"
  //                           : "text-emerald-600 bg-emerald-500/10"
  //                         : isDark
  //                           ? "text-white/25"
  //                           : "text-gray-400"
  //                   }`}
  //                   style={
  //                     isActive
  //                       ? {
  //                           background:
  //                             "linear-gradient(135deg, rgba(255,120,50,0.2), rgba(180,80,255,0.2))",
  //                           border: "1px solid rgba(180,80,255,0.25)",
  //                         }
  //                       : {}
  //                   }
  //                 >
  //                   {isDoneSection && !isActive ? (
  //                     <CheckCircle2 size={11} />
  //                   ) : (
  //                     section.icon
  //                   )}
  //                   <span className="hidden sm:block">{section.label}</span>
  //                 </div>
  //               );
  //             })}
  //           </div>

  //           {/* Messages */}
  //           <div className="flex-1 overflow-y-auto min-h-0 py-6 lg:py-8 flex flex-col">
  //             <div className="w-full max-w-3xl mx-auto px-4 lg:px-10 space-y-4 flex-1">
  //               <AnimatePresence initial={false}>
  //                 {messages.map((msg) => (
  //                   <motion.div
  //                     key={msg.id}
  //                     initial={{ opacity: 0, y: 10 }}
  //                     animate={{ opacity: 1, y: 0 }}
  //                     transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
  //                     className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
  //                   >
  //                     {msg.role === "assistant" ? (
  //                       <div className="max-w-[88%] space-y-1">
  //                         <div
  //                           className="px-5 py-4 rounded-[26px] rounded-tl-md text-sm leading-7 border backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
  //                           style={{
  //                             background: isDark
  //                               ? "rgba(255,255,255,0.045)"
  //                               : "rgba(255,255,255,0.82)",
  //                             borderColor: isDark
  //                               ? "rgba(255,255,255,0.06)"
  //                               : "rgba(0,0,0,0.05)",
  //                             color: isDark ? "rgba(255,255,255,0.8)" : "#1a1a1c",
  //                             whiteSpace: "pre-wrap",
  //                           }}
  //                         >
  //                           {msg.content.replace(/\*\*(.*?)\*\*/g, "$1")}
  //                         </div>

  //                         {msg.questionId === currentQ?.id &&
  //                           currentQ &&
  //                           !isDone && (
  //                             <motion.div
  //                               initial={{ opacity: 0 }}
  //                               animate={{ opacity: 1 }}
  //                               transition={{ delay: 0.15 }}
  //                               className="px-3 py-1.5 text-xs flex items-start gap-1.5 max-w-[88%]"
  //                               style={{
  //                                 color: isDark
  //                                   ? "rgba(255,255,255,0.32)"
  //                                   : "#6b6b78",
  //                               }}
  //                             >
  //                               <AlertCircle
  //                                 size={12}
  //                                 className="mt-0.5 flex-shrink-0"
  //                               />
  //                               <span>{currentQ.helper}</span>
  //                             </motion.div>
  //                           )}
  //                       </div>
  //                     ) : (
  //                       <div
  //                         className="max-w-[70%] px-4 py-3 rounded-[22px] rounded-tr-md text-sm leading-relaxed border shadow-[0_8px_20px_rgba(180,80,255,0.08)]"
  //                         style={{
  //                           background:
  //                             "linear-gradient(135deg, rgba(255,120,50,0.10), rgba(180,80,255,0.10))",
  //                           borderColor: isDark
  //                             ? "rgba(180,80,255,0.16)"
  //                             : "rgba(180,80,255,0.12)",
  //                           color: isDark ? "rgba(220,190,255,0.92)" : "#6b21a8",
  //                         }}
  //                       >
  //                         {msg.content}
  //                       </div>
  //                     )}
  //                   </motion.div>
  //                 ))}
  //               </AnimatePresence>
  //               <div ref={chatEndRef} />
  //             </div>
  //           </div>

  //           {/* Composer */}
  //           {!isDone && (
  //             <div
  //               className="flex-shrink-0 border-t py-4"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(10,10,14,0.58)"
  //                   : "rgba(248,247,252,0.8)",
  //                 borderColor: isDark
  //                   ? "rgba(255,255,255,0.05)"
  //                   : "rgba(0,0,0,0.05)",
  //                 backdropFilter: "blur(14px)",
  //               }}
  //             >
  //               <div className="max-w-3xl mx-auto px-4 lg:px-10 space-y-3">
  //                 {currentQ?.chips && currentQ.chips.length > 0 && (
  //                   <div className="flex flex-wrap gap-1.5">
  //                     {currentQ.chips.map((chip) => {
  //                       const isSelected = selectedChips.includes(chip.value);
  //                       return (
  //                         <button
  //                           key={chip.value}
  //                           onClick={() => toggleChip(chip.value)}
  //                           className="text-xs px-3 py-1.5 rounded-full border transition-all font-medium"
  //                           style={
  //                             isSelected
  //                               ? {
  //                                   background:
  //                                     "linear-gradient(135deg, rgba(255,120,50,0.15), rgba(180,80,255,0.15))",
  //                                   borderColor: "rgba(180,80,255,0.35)",
  //                                   color: isDark
  //                                     ? "rgba(210,160,255,0.95)"
  //                                     : "#7c3aed",
  //                                 }
  //                               : {
  //                                   background: isDark
  //                                     ? "rgba(255,255,255,0.04)"
  //                                     : "rgba(0,0,0,0.03)",
  //                                   borderColor: isDark
  //                                     ? "rgba(255,255,255,0.08)"
  //                                     : "rgba(0,0,0,0.08)",
  //                                   color: isDark
  //                                     ? "rgba(255,255,255,0.45)"
  //                                     : "#6b7280",
  //                                 }
  //                           }
  //                         >
  //                           {chip.label}
  //                         </button>
  //                       );
  //                     })}
  //                   </div>
  //                 )}

  //                 {currentQ?.multi && (
  //                   <p
  //                     className={`text-xs ${isDark ? "text-white/25" : "text-gray-400"}`}
  //                   >
  //                     Select all that apply, then click Continue.
  //                   </p>
  //                 )}

  //                 <div
  //                   className="flex items-end gap-2 rounded-[28px] border px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
  //                   style={{
  //                     background: isDark
  //                       ? "rgba(255,255,255,0.045)"
  //                       : "rgba(255,255,255,0.9)",
  //                     borderColor: isDark
  //                       ? "rgba(255,255,255,0.08)"
  //                       : "rgba(0,0,0,0.06)",
  //                     backdropFilter: "blur(16px)",
  //                   }}
  //                 >
  //                   <textarea
  //                     ref={inputRef}
  //                     value={inputValue}
  //                     onChange={(e) => setInputValue(e.target.value)}
  //                     onKeyDown={handleKeyDown}
  //                     placeholder={currentQ?.placeholder || "Type your answer…"}
  //                     rows={1}
  //                     className="flex-1 text-sm bg-transparent outline-none border-none resize-none leading-relaxed min-h-[28px] max-h-28"
  //                     style={{
  //                       color: isDark ? "rgba(255,255,255,0.82)" : "#1a1a1c",
  //                       overflowY: "auto",
  //                     }}
  //                     onInput={(e) => {
  //                       const t = e.target as HTMLTextAreaElement;
  //                       t.style.height = "auto";
  //                       t.style.height = `${Math.min(t.scrollHeight, 112)}px`;
  //                     }}
  //                   />
  //                   <div className="flex items-center gap-1.5 flex-shrink-0 pb-0.5">
  //                     {currentQ?.multi && selectedChips.length > 0 ? (
  //                       <button
  //                         onClick={() => submitAnswer(selectedChips.join(", "))}
  //                         className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all text-white"
  //                         style={{
  //                           background:
  //                             "linear-gradient(135deg, #ff7832, #c050ff)",
  //                           boxShadow: "0 2px 12px rgba(180,80,255,0.35)",
  //                         }}
  //                       >
  //                         Continue <ChevronRight size={13} />
  //                       </button>
  //                     ) : (
  //                       <button
  //                         onClick={() => submitAnswer(inputValue)}
  //                         disabled={!inputValue.trim()}
  //                         className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30 text-white"
  //                         style={{
  //                           background:
  //                             "linear-gradient(135deg, #ff7832, #c050ff)",
  //                           boxShadow: "0 8px 20px rgba(180,80,255,0.22)",
  //                         }}
  //                         aria-label="Send"
  //                       >
  //                         <Send size={13} />
  //                       </button>
  //                     )}
  //                   </div>
  //                 </div>

  //                 <div
  //                   className={`flex items-center justify-between text-xs ${isDark ? "text-white/20" : "text-gray-400"}`}
  //                 >
  //                   <span className="flex items-center gap-1">
  //                     <CornerDownLeft size={10} />
  //                     Enter to submit · Shift+Enter for new line
  //                   </span>
  //                   {currentQuestionFlat > 0 && (
  //                     <button
  //                       onClick={() => {
  //                         const p = currentQuestionFlat - 1;
  //                         setCurrentQuestionFlat(p);
  //                         setMessages((prev) => {
  //                           const li = [...prev]
  //                             .reverse()
  //                             .findIndex((m) => m.role === "user");
  //                           return li === -1
  //                             ? prev
  //                             : prev.slice(0, prev.length - li - 1);
  //                         });
  //                       }}
  //                       className={`flex items-center gap-1 transition-colors ${isDark ? "hover:text-white/50" : "hover:text-gray-600"}`}
  //                     >
  //                       <ChevronLeft size={11} /> Back
  //                     </button>
  //                   )}
  //                 </div>
  //               </div>
  //             </div>
  //           )}

  //           {isDone && (
  //             <div
  //               className="flex-shrink-0 border-t px-4 py-3 flex items-center gap-2"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(10,10,14,0.6)"
  //                   : "rgba(248,247,252,0.8)",
  //                 borderColor: isDark
  //                   ? "rgba(255,255,255,0.05)"
  //                   : "rgba(0,0,0,0.06)",
  //               }}
  //             >
  //               <CheckCircle2
  //                 size={15}
  //                 className="text-emerald-400 flex-shrink-0"
  //               />
  //               <span
  //                 className={`text-xs ${isDark ? "text-white/40" : "text-gray-500"}`}
  //               >
  //                 Discovery complete. Review your ERP blueprint on the right.
  //               </span>
  //             </div>
  //           )}
  //         </div>

  //         {/* Right Panel */}
  //         <div
  //           className="group flex-shrink-0 lg:w-[26%] hover:lg:w-[34%] xl:w-[24%] hover:xl:w-[30%] overflow-y-auto flex flex-col gap-2 p-3 transition-all duration-300 ease-out"
  //           style={{
  //             background: isDark ? "rgba(8,8,11,0.22)" : "rgba(242,240,250,0.34)",
  //             borderLeft: isDark
  //               ? "1px solid rgba(255,255,255,0.05)"
  //               : "1px solid rgba(0,0,0,0.05)",
  //             backdropFilter: "blur(18px)",
  //           }}
  //         >
  //           {/* Readiness */}
  //           <motion.div
  //             animate={{ opacity: 1, y: 0 }}
  //             initial={{ opacity: 0, y: 8 }}
  //             className="rounded-[24px] border p-3 backdrop-blur-sm transition-all duration-300 group-hover:p-4"
  //             style={{
  //               background: isDark
  //                 ? "rgba(255,255,255,0.028)"
  //                 : "rgba(255,255,255,0.52)",
  //               borderColor: isDark
  //                 ? "rgba(255,255,255,0.05)"
  //                 : "rgba(0,0,0,0.05)",
  //             }}
  //           >
  //             <div className="flex items-center justify-between mb-2">
  //               <span
  //                 className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-white/25" : "text-gray-400"}`}
  //               >
  //                 Readiness
  //               </span>
  //               <span
  //                 className={`text-xs font-bold ${readiness >= 80 ? "text-emerald-400" : readiness >= 40 ? "text-amber-400" : isDark ? "text-violet-400" : "text-violet-600"}`}
  //               >
  //                 {readiness}%
  //               </span>
  //             </div>
  //             <div
  //               className={`h-1 rounded-full overflow-hidden ${isDark ? "bg-white/[0.05]" : "bg-black/[0.06]"}`}
  //             >
  //               <motion.div
  //                 className="h-full rounded-full"
  //                 style={{
  //                   background:
  //                     readiness >= 80
  //                       ? "#4ade80"
  //                       : "linear-gradient(90deg, #ff7832, #c050ff)",
  //                 }}
  //                 animate={{ width: `${readiness}%` }}
  //                 transition={{ duration: 0.5, ease: "easeOut" }}
  //               />
  //             </div>
  //             <div
  //               className={`mt-2 text-xs transition-all duration-300 ${isDark ? "text-white/22 group-hover:text-white/40" : "text-gray-400 group-hover:text-gray-500"}`}
  //             >
  //               <div className="flex justify-between">
  //                 <span>{answeredCount} answered</span>
  //                 <span>{TOTAL_QUESTIONS - answeredCount} left</span>
  //               </div>
  //             </div>
  //           </motion.div>

  //           {/* Business profile */}
  //           {(businessName || industry || employees) && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 8 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               transition={{ delay: 0.05 }}
  //               className="rounded-[24px] border p-3 backdrop-blur-sm transition-all duration-300 group-hover:p-4"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(255,255,255,0.028)"
  //                   : "rgba(255,255,255,0.52)",
  //                 borderColor: isDark
  //                   ? "rgba(255,255,255,0.05)"
  //                   : "rgba(0,0,0,0.05)",
  //               }}
  //             >
  //               <p
  //                 className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-2 ${isDark ? "text-white/25" : "text-gray-400"}`}
  //               >
  //                 Business
  //               </p>
  //               <div className="space-y-2">
  //                 {businessName && (
  //                   <div className="flex items-start gap-2">
  //                     <Building2
  //                       size={13}
  //                       className={
  //                         isDark ? "text-white/20 mt-0.5" : "text-gray-400 mt-0.5"
  //                       }
  //                     />
  //                     <span
  //                       className={`text-sm font-medium ${isDark ? "text-white/80" : "text-gray-800"}`}
  //                     >
  //                       {businessName}
  //                     </span>
  //                   </div>
  //                 )}

  //                 <div className="space-y-1 group-hover:space-y-1.5 transition-all duration-300">
  //                   {industry && (
  //                     <div className="flex items-center justify-between gap-2">
  //                       <span
  //                         className={`text-xs ${isDark ? "text-white/25" : "text-gray-400"}`}
  //                       >
  //                         Industry
  //                       </span>
  //                       <span
  //                         className="text-xs font-medium text-right"
  //                         style={{
  //                           color: isDark ? "rgba(200,150,255,0.9)" : "#7c3aed",
  //                         }}
  //                       >
  //                         {industry}
  //                       </span>
  //                     </div>
  //                   )}
  //                   {employees && (
  //                     <div className="flex items-center justify-between gap-2">
  //                       <span
  //                         className={`text-xs ${isDark ? "text-white/25" : "text-gray-400"}`}
  //                       >
  //                         Employees
  //                       </span>
  //                       <span
  //                         className={`text-xs text-right ${isDark ? "text-white/50" : "text-gray-600"}`}
  //                       >
  //                         {employees}
  //                       </span>
  //                     </div>
  //                   )}
  //                   {geoOps && (
  //                     <div className="flex items-center justify-between gap-2 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300">
  //                       <span
  //                         className={`text-xs ${isDark ? "text-white/25" : "text-gray-400"}`}
  //                       >
  //                         Geography
  //                       </span>
  //                       <span
  //                         className={`text-xs text-right ${isDark ? "text-white/50" : "text-gray-600"}`}
  //                       >
  //                         {geoOps}
  //                       </span>
  //                     </div>
  //                   )}
  //                 </div>
  //               </div>
  //             </motion.div>
  //           )}

  //           {/* Modules */}
  //           <motion.div
  //             initial={{ opacity: 0, y: 8 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ delay: 0.1 }}
  //             className="rounded-[24px] border p-3 backdrop-blur-sm transition-all duration-300 group-hover:p-4"
  //             style={{
  //               background: isDark
  //                 ? "rgba(255,255,255,0.028)"
  //                 : "rgba(255,255,255,0.52)",
  //               borderColor: isDark
  //                 ? "rgba(255,255,255,0.05)"
  //                 : "rgba(0,0,0,0.05)",
  //             }}
  //           >
  //             <p
  //               className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-2 ${isDark ? "text-white/25" : "text-gray-400"}`}
  //             >
  //               Modules
  //             </p>
  //             {modules.length <= 2 ? (
  //               <p
  //                 className={`text-xs ${isDark ? "text-white/20" : "text-gray-400"}`}
  //               >
  //                 Answer questions to activate modules.
  //               </p>
  //             ) : (
  //               <div className="flex flex-wrap gap-1.5">
  //                 {modules.slice(0, 3).map((mod, i) => (
  //                   <motion.span
  //                     key={mod}
  //                     initial={{ opacity: 0, scale: 0.9 }}
  //                     animate={{ opacity: 1, scale: 1 }}
  //                     transition={{ delay: i * 0.03 }}
  //                     className="text-[11px] px-2.5 py-1 rounded-full font-medium border"
  //                     style={{
  //                       background:
  //                         "linear-gradient(135deg, rgba(255,120,50,0.08), rgba(180,80,255,0.08))",
  //                       borderColor: isDark
  //                         ? "rgba(180,80,255,0.18)"
  //                         : "rgba(180,80,255,0.2)",
  //                       color: isDark ? "rgba(200,150,255,0.9)" : "#6d28d9",
  //                     }}
  //                   >
  //                     {mod}
  //                   </motion.span>
  //                 ))}
  //                 {modules.length > 3 && (
  //                   <span
  //                     className={`text-[11px] px-2.5 py-1 rounded-full border ${isDark ? "border-white/10 text-white/35" : "border-black/10 text-gray-400"}`}
  //                   >
  //                     +{modules.length - 3}
  //                   </span>
  //                 )}
  //               </div>
  //             )}

  //             {modules.length > 3 && (
  //               <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-28 transition-all duration-300 mt-0 group-hover:mt-2">
  //                 <div className="flex flex-wrap gap-1.5">
  //                   {modules.slice(3).map((mod) => (
  //                     <span
  //                       key={mod}
  //                       className="text-[11px] px-2.5 py-1 rounded-full font-medium border"
  //                       style={{
  //                         background:
  //                           "linear-gradient(135deg, rgba(255,120,50,0.06), rgba(180,80,255,0.06))",
  //                         borderColor: isDark
  //                           ? "rgba(180,80,255,0.14)"
  //                           : "rgba(180,80,255,0.14)",
  //                         color: isDark ? "rgba(200,150,255,0.82)" : "#7c3aed",
  //                       }}
  //                     >
  //                       {mod}
  //                     </span>
  //                   ))}
  //                 </div>
  //               </div>
  //             )}
  //           </motion.div>

  //           {/* Missing info */}
  //           {missingInfo.length > 0 && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 8 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               transition={{ delay: 0.15 }}
  //               className="rounded-[24px] border p-3 transition-all duration-300 group-hover:p-4"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(251,191,36,0.04)"
  //                   : "rgba(254,243,199,0.68)",
  //                 borderColor: isDark
  //                   ? "rgba(251,191,36,0.12)"
  //                   : "rgba(245,158,11,0.16)",
  //               }}
  //             >
  //               <p
  //                 className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-2 ${isDark ? "text-amber-400/60" : "text-amber-700"}`}
  //               >
  //                 Missing Info
  //               </p>
  //               <div className="space-y-1.5">
  //                 {missingInfo.slice(0, 3).map((item) => (
  //                   <div key={item} className="flex items-center gap-2">
  //                     <Circle
  //                       size={6}
  //                       className={
  //                         isDark ? "text-amber-400/40" : "text-amber-500"
  //                       }
  //                     />
  //                     <span
  //                       className={`text-xs truncate ${isDark ? "text-amber-300/60" : "text-amber-800"}`}
  //                     >
  //                       {item}
  //                     </span>
  //                   </div>
  //                 ))}
  //               </div>

  //               <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-28 transition-all duration-300 mt-0 group-hover:mt-2">
  //                 <div className="space-y-1.5">
  //                   {missingInfo.slice(3, 6).map((item) => (
  //                     <div key={item} className="flex items-center gap-2">
  //                       <Circle
  //                         size={6}
  //                         className={
  //                           isDark ? "text-amber-400/40" : "text-amber-500"
  //                         }
  //                       />
  //                       <span
  //                         className={`text-xs ${isDark ? "text-amber-300/60" : "text-amber-800"}`}
  //                       >
  //                         {item}
  //                       </span>
  //                     </div>
  //                   ))}
  //                   {missingInfo.length > 6 && (
  //                     <span
  //                       className={`text-xs ${isDark ? "text-white/20" : "text-gray-400"}`}
  //                     >
  //                       +{missingInfo.length - 6} more fields needed
  //                     </span>
  //                   )}
  //                 </div>
  //               </div>
  //             </motion.div>
  //           )}

  //           {/* Rollout */}
  //           {(painPoints || timeline) && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 8 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               transition={{ delay: 0.2 }}
  //               className="rounded-[24px] border p-3 backdrop-blur-sm transition-all duration-300 group-hover:p-4"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(255,255,255,0.028)"
  //                   : "rgba(255,255,255,0.52)",
  //                 borderColor: isDark
  //                   ? "rgba(255,255,255,0.05)"
  //                   : "rgba(0,0,0,0.05)",
  //               }}
  //             >
  //               <p
  //                 className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-2 ${isDark ? "text-white/25" : "text-gray-400"}`}
  //               >
  //                 Rollout
  //               </p>
  //               <div className="space-y-2">
  //                 {timeline && (
  //                   <div className="flex items-center gap-2">
  //                     <Clock
  //                       size={12}
  //                       className={isDark ? "text-white/25" : "text-gray-400"}
  //                     />
  //                     <span
  //                       className={`text-xs ${isDark ? "text-white/50" : "text-gray-600"}`}
  //                     >
  //                       {timeline}
  //                     </span>
  //                   </div>
  //                 )}

  //                 {painPoints && (
  //                   <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-24 transition-all duration-300">
  //                     <span
  //                       className={`text-xs block mb-1 ${isDark ? "text-white/25" : "text-gray-400"}`}
  //                     >
  //                       Top Pain Points
  //                     </span>
  //                     <p
  //                       className={`text-xs leading-relaxed ${isDark ? "text-white/50" : "text-gray-600"}`}
  //                     >
  //                       {painPoints}
  //                     </p>
  //                   </div>
  //                 )}
  //               </div>
  //             </motion.div>
  //           )}

  //           {/* Integrations */}
  //           {integrationsList && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 8 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               transition={{ delay: 0.22 }}
  //               className="rounded-[24px] border p-3 backdrop-blur-sm transition-all duration-300 group-hover:p-4"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(255,255,255,0.028)"
  //                   : "rgba(255,255,255,0.52)",
  //                 borderColor: isDark
  //                   ? "rgba(255,255,255,0.05)"
  //                   : "rgba(0,0,0,0.05)",
  //               }}
  //             >
  //               <p
  //                 className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-2 ${isDark ? "text-white/25" : "text-gray-400"}`}
  //               >
  //                 Integrations
  //               </p>
  //               <p
  //                 className={`text-xs leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300 ${isDark ? "text-white/50" : "text-gray-600"}`}
  //               >
  //                 {integrationsList}
  //               </p>
  //             </motion.div>
  //           )}

  //           {/* Departments */}
  //           {depts && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 8 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               transition={{ delay: 0.24 }}
  //               className="rounded-[24px] border p-3 backdrop-blur-sm transition-all duration-300 group-hover:p-4"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(255,255,255,0.028)"
  //                   : "rgba(255,255,255,0.52)",
  //                 borderColor: isDark
  //                   ? "rgba(255,255,255,0.05)"
  //                   : "rgba(0,0,0,0.05)",
  //               }}
  //             >
  //               <p
  //                 className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-2 ${isDark ? "text-white/25" : "text-gray-400"}`}
  //               >
  //                 Departments
  //               </p>
  //               <div className="flex flex-wrap gap-1.5">
  //                 {depts
  //                   .split(",")
  //                   .slice(0, 3)
  //                   .map((d) => (
  //                     <span
  //                       key={d}
  //                       className={`text-[11px] px-2.5 py-1 rounded-full border ${isDark ? "bg-white/[0.04] border-white/[0.07] text-white/45" : "bg-black/[0.03] border-black/[0.07] text-gray-500"}`}
  //                     >
  //                       {d.trim()}
  //                     </span>
  //                   ))}
  //               </div>

  //               <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-24 transition-all duration-300 mt-0 group-hover:mt-2">
  //                 <div className="flex flex-wrap gap-1.5">
  //                   {depts
  //                     .split(",")
  //                     .slice(3)
  //                     .map((d) => (
  //                       <span
  //                         key={d}
  //                         className={`text-[11px] px-2.5 py-1 rounded-full border ${isDark ? "bg-white/[0.04] border-white/[0.07] text-white/45" : "bg-black/[0.03] border-black/[0.07] text-gray-500"}`}
  //                       >
  //                         {d.trim()}
  //                       </span>
  //                     ))}
  //                 </div>
  //               </div>
  //             </motion.div>
  //           )}

  //           {/* Section progress */}
  //           <motion.div
  //             initial={{ opacity: 0, y: 8 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ delay: 0.28 }}
  //             className="rounded-[24px] border p-3 backdrop-blur-sm transition-all duration-300 group-hover:p-4"
  //             style={{
  //               background: isDark
  //                 ? "rgba(255,255,255,0.028)"
  //                 : "rgba(255,255,255,0.52)",
  //               borderColor: isDark
  //                 ? "rgba(255,255,255,0.05)"
  //                 : "rgba(0,0,0,0.05)",
  //             }}
  //           >
  //             <p
  //               className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-2 ${isDark ? "text-white/25" : "text-gray-400"}`}
  //             >
  //               Sections
  //             </p>
  //             <div className="space-y-2">
  //               {sectionProgress.map((section) => (
  //                 <div key={section.id} className="flex items-center gap-2.5">
  //                   <div
  //                     className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${section.complete ? "bg-emerald-400/15 text-emerald-400" : section.answered > 0 ? "text-violet-400" : isDark ? "bg-white/[0.04] text-white/15" : "bg-black/[0.04] text-gray-300"}`}
  //                     style={
  //                       section.answered > 0 && !section.complete
  //                         ? {
  //                             background:
  //                               "linear-gradient(135deg, rgba(255,120,50,0.12), rgba(180,80,255,0.12))",
  //                           }
  //                         : {}
  //                     }
  //                   >
  //                     {section.complete ? (
  //                       <CheckCircle2 size={10} />
  //                     ) : section.answered > 0 ? (
  //                       <RefreshCw size={8} />
  //                     ) : (
  //                       <Circle size={8} />
  //                     )}
  //                   </div>
  //                   <div className="flex-1 min-w-0">
  //                     <div className="flex items-center justify-between gap-2">
  //                       <span
  //                         className={`text-xs truncate ${section.complete ? "text-emerald-400" : section.answered > 0 ? (isDark ? "text-white/70" : "text-gray-700") : isDark ? "text-white/25" : "text-gray-400"}`}
  //                       >
  //                         {section.label}
  //                       </span>
  //                       <span
  //                         className={`text-[11px] ${isDark ? "text-white/20" : "text-gray-400"}`}
  //                       >
  //                         {section.answered}/{section.total}
  //                       </span>
  //                     </div>
  //                     <div
  //                       className={`mt-1 h-1 rounded-full ${isDark ? "bg-white/[0.04]" : "bg-black/[0.05]"}`}
  //                     >
  //                       <motion.div
  //                         className="h-full rounded-full"
  //                         style={{
  //                           background: section.complete
  //                             ? "#4ade80"
  //                             : "linear-gradient(90deg, #ff7832, #c050ff)",
  //                         }}
  //                         animate={{
  //                           width: `${(section.answered / section.total) * 100}%`,
  //                         }}
  //                         transition={{ duration: 0.4, ease: "easeOut" }}
  //                       />
  //                     </div>
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           </motion.div>

  //           {/* Done CTA */}
  //           {isDone && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 8 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               className="rounded-[24px] border p-3 transition-all duration-300 group-hover:p-4"
  //               style={{
  //                 background: isDark
  //                   ? "rgba(74,222,128,0.04)"
  //                   : "rgba(240,253,244,0.9)",
  //                 borderColor: isDark
  //                   ? "rgba(74,222,128,0.15)"
  //                   : "rgba(34,197,94,0.2)",
  //               }}
  //             >
  //               <div className="flex items-start gap-3">
  //                 <CheckCircle2 size={16} className="text-emerald-400 mt-0.5" />
  //                 <div>
  //                   <p
  //                     className={`text-sm font-semibold mb-1 ${isDark ? "text-emerald-400" : "text-emerald-700"}`}
  //                   >
  //                     Blueprint Ready
  //                   </p>
  //                   <p
  //                     className={`text-xs leading-relaxed opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-24 transition-all duration-300 ${isDark ? "text-white/40" : "text-gray-500"}`}
  //                   >
  //                     Your ERP discovery is complete. Share this blueprint with
  //                     your implementation partner or export it as a scoping
  //                     document.
  //                   </p>
  //                   <button
  //                     className="mt-2 flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-full transition-all text-white"
  //                     style={{
  //                       background: "linear-gradient(135deg, #ff7832, #c050ff)",
  //                       boxShadow: "0 4px 16px rgba(180,80,255,0.28)",
  //                     }}
  //                   >
  //                     Export Blueprint <ArrowRight size={12} />
  //                   </button>
  //                 </div>
  //               </div>
  //             </motion.div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );

  return (
    <div
      className="h-screen overflow-hidden relative"
      style={{ fontFamily: "'Inter','system-ui',sans-serif" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 55% 45% at 0% 0%, rgba(255,120,50,0.07) 0%, transparent 52%), radial-gradient(ellipse 45% 40% at 100% 100%, rgba(180,80,255,0.07) 0%, transparent 48%), #0a0a0c"
            : "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(255,140,60,0.08) 0%, transparent 52%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(180,80,255,0.06) 0%, transparent 48%), #f6f4f9",
        }}
      />

      <div className="relative z-10 h-full p-3 lg:p-4">
        <div
          className="h-full rounded-[30px] border overflow-hidden backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
          style={{
            background: isDark
              ? "rgba(12,12,16,0.62)"
              : "rgba(255,255,255,0.52)",
            borderColor: isDark
              ? "rgba(255,255,255,0.08)"
              : "rgba(255,255,255,0.55)",
          }}
        >
          {/* Header */}
          <header
            className="relative z-20 flex-shrink-0 flex items-center justify-between px-4 lg:px-5 h-14 border-b backdrop-blur-md"
            style={{
              background: isDark
                ? "rgba(10,10,14,0.42)"
                : "rgba(255,255,255,0.30)",
              borderColor: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center shadow-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,120,50,0.92), rgba(180,80,255,0.92))",
                  }}
                >
                  <Layers size={13} className="text-white" />
                </div>
                <span
                  className={`text-sm font-semibold tracking-tight ${isDark ? "text-white/85" : "text-gray-900"}`}
                >
                  ERPBlueprint
                </span>
              </div>

              <span className={`${isDark ? "text-white/15" : "text-gray-300"}`}>
                •
              </span>

              <span
                className={`text-xs font-medium truncate ${isDark ? "text-white/40" : "text-gray-500"}`}
              >
                {isDone
                  ? "Blueprint Complete"
                  : currentSectionInfo?.label || "Discovery"}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-6">
              <div
                className={`flex-1 h-0.5 rounded-full overflow-hidden ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #ff7832, #c050ff)",
                  }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap ${isDark ? "text-white/35" : "text-gray-400"}`}
              >
                {progressPct}% complete
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-xs hidden sm:block ${isDark ? "text-white/25" : "text-gray-400"}`}
              >
                {isDone
                  ? `${TOTAL_QUESTIONS}/${TOTAL_QUESTIONS}`
                  : `${currentQuestionFlat + 1} of ${TOTAL_QUESTIONS}`}
              </span>

              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl transition-colors ${isDark ? "bg-white/[0.05] text-white/40 hover:text-white/70" : "bg-black/[0.04] text-gray-400 hover:text-gray-700"}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </div>
          </header>

          <div className="h-[calc(100%-56px)] p-3 lg:p-4">
            <div className="h-full flex gap-4">
              {/* Main Chat Box */}
              <div
                className="flex-1 min-w-0 rounded-[28px] border overflow-hidden backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.06)]"
                style={{
                  background: isDark
                    ? "rgba(14,14,18,0.58)"
                    : "rgba(255,255,255,0.48)",
                  borderColor: isDark
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(255,255,255,0.58)",
                }}
              >
                <div className="h-full flex flex-col min-h-0">
                  {/* Section nav */}
                  <div
                    className="flex-shrink-0 flex items-center gap-1 px-4 py-3 border-b overflow-x-auto"
                    style={{
                      borderColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.05)",
                      background: isDark
                        ? "rgba(255,255,255,0.015)"
                        : "rgba(255,255,255,0.22)",
                    }}
                  >
                    {ERP_SECTIONS.map((section, idx) => {
                      const isActive = idx === currentSectionIdx && !isDone;
                      const isDoneSection = idx < currentSectionIdx || isDone;
                      return (
                        <div
                          key={section.id}
                          className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            isActive
                              ? "text-white"
                              : isDoneSection
                                ? isDark
                                  ? "text-emerald-400 bg-emerald-400/10"
                                  : "text-emerald-600 bg-emerald-500/10"
                                : isDark
                                  ? "text-white/28"
                                  : "text-gray-400"
                          }`}
                          style={
                            isActive
                              ? {
                                  background:
                                    "linear-gradient(135deg, rgba(255,120,50,0.20), rgba(180,80,255,0.22))",
                                  border: "1px solid rgba(180,80,255,0.22)",
                                  boxShadow: "0 8px 20px rgba(180,80,255,0.10)",
                                }
                              : {}
                          }
                        >
                          {isDoneSection && !isActive ? (
                            <CheckCircle2 size={11} />
                          ) : (
                            section.icon
                          )}
                          <span className="hidden sm:block">
                            {section.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Messages */}
                  <div className="flex-1 min-h-0 overflow-y-auto">
                    <div className="w-full max-w-4xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
                      <div className="max-w-3xl mx-auto space-y-5">
                        <AnimatePresence initial={false}>
                          {messages.map((msg) => (
                            <motion.div
                              key={msg.id}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                              {msg.role === "assistant" ? (
                                <div className="max-w-[84%] space-y-1.5">
                                  <div className="flex items-center gap-2 px-1">
                                    <div
                                      className="w-5 h-5 rounded-lg flex items-center justify-center"
                                      style={{
                                        background:
                                          "linear-gradient(135deg, rgba(255,120,50,0.88), rgba(180,80,255,0.88))",
                                      }}
                                    >
                                      <Layers
                                        size={10}
                                        className="text-white"
                                      />
                                    </div>
                                    <span
                                      className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${isDark ? "text-white/28" : "text-gray-400"}`}
                                    >
                                      AI Builder
                                    </span>
                                  </div>

                                  <div
                                    className="px-5 py-4 rounded-[28px] rounded-tl-md text-[15px] leading-7 border backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
                                    style={{
                                      background: isDark
                                        ? "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))"
                                        : "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.72))",
                                      borderColor: isDark
                                        ? "rgba(255,255,255,0.07)"
                                        : "rgba(255,255,255,0.7)",
                                      color: isDark
                                        ? "rgba(255,255,255,0.82)"
                                        : "#17181c",
                                      whiteSpace: "pre-wrap",
                                    }}
                                  >
                                    {msg.content.replace(
                                      /\*\*(.*?)\*\*/g,
                                      "$1",
                                    )}
                                  </div>

                                  {msg.questionId === currentQ?.id &&
                                    currentQ &&
                                    !isDone && (
                                      <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.15 }}
                                        className="px-3 pt-1 text-xs flex items-start gap-1.5 max-w-[88%]"
                                        style={{
                                          color: isDark
                                            ? "rgba(255,255,255,0.34)"
                                            : "#7b7b88",
                                        }}
                                      >
                                        <AlertCircle
                                          size={12}
                                          className="mt-0.5 flex-shrink-0"
                                        />
                                        <span>{currentQ.helper}</span>
                                      </motion.div>
                                    )}
                                </div>
                              ) : (
                                <div className="max-w-[62%]">
                                  <div
                                    className="px-4 py-3.5 rounded-[24px] rounded-tr-md text-sm leading-relaxed border shadow-[0_10px_24px_rgba(180,80,255,0.08)]"
                                    style={{
                                      background: isDark
                                        ? "linear-gradient(135deg, rgba(255,120,50,0.13), rgba(180,80,255,0.13))"
                                        : "linear-gradient(135deg, rgba(255,120,50,0.10), rgba(180,80,255,0.12))",
                                      borderColor: isDark
                                        ? "rgba(180,80,255,0.18)"
                                        : "rgba(180,80,255,0.14)",
                                      color: isDark
                                        ? "rgba(230,205,255,0.95)"
                                        : "#6b21a8",
                                    }}
                                  >
                                    {msg.content}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        <div ref={chatEndRef} />
                      </div>
                    </div>
                  </div>

                  {/* Composer */}
                  {!isDone && (
                    <div
                      className="flex-shrink-0 border-t p-4"
                      style={{
                        background: isDark
                          ? "rgba(10,10,14,0.38)"
                          : "rgba(255,255,255,0.22)",
                        borderColor: isDark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.05)",
                        backdropFilter: "blur(16px)",
                      }}
                    >
                      <div className="max-w-3xl mx-auto space-y-3">
                        {currentQ?.chips && currentQ.chips.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {currentQ.chips.map((chip) => {
                              const isSelected = selectedChips.includes(
                                chip.value,
                              );
                              return (
                                <button
                                  key={chip.value}
                                  onClick={() => toggleChip(chip.value)}
                                  className="text-xs px-3 py-1.5 rounded-full border transition-all font-medium"
                                  style={
                                    isSelected
                                      ? {
                                          background:
                                            "linear-gradient(135deg, rgba(255,120,50,0.14), rgba(180,80,255,0.14))",
                                          borderColor: "rgba(180,80,255,0.32)",
                                          color: isDark
                                            ? "rgba(218,180,255,0.95)"
                                            : "#7c3aed",
                                          boxShadow:
                                            "0 8px 18px rgba(180,80,255,0.08)",
                                        }
                                      : {
                                          background: isDark
                                            ? "rgba(255,255,255,0.035)"
                                            : "rgba(255,255,255,0.62)",
                                          borderColor: isDark
                                            ? "rgba(255,255,255,0.07)"
                                            : "rgba(0,0,0,0.06)",
                                          color: isDark
                                            ? "rgba(255,255,255,0.48)"
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
                            className={`text-xs ${isDark ? "text-white/25" : "text-gray-400"}`}
                          >
                            Select all that apply, then click Continue.
                          </p>
                        )}

                        <div
                          className="rounded-[30px] border p-2.5 shadow-[0_18px_40px_rgba(0,0,0,0.04)]"
                          style={{
                            background: isDark
                              ? "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.035))"
                              : "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.74))",
                            borderColor: isDark
                              ? "rgba(255,255,255,0.08)"
                              : "rgba(255,255,255,0.7)",
                            backdropFilter: "blur(18px)",
                          }}
                        >
                          <div className="flex items-end gap-2">
                            <textarea
                              ref={inputRef}
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              onKeyDown={handleKeyDown}
                              placeholder={
                                currentQ?.placeholder || "Type your answer…"
                              }
                              rows={1}
                              className="flex-1 text-sm bg-transparent outline-none border-none resize-none leading-relaxed min-h-[30px] max-h-28 px-3 py-2"
                              style={{
                                color: isDark
                                  ? "rgba(255,255,255,0.84)"
                                  : "#17181c",
                                overflowY: "auto",
                              }}
                              onInput={(e) => {
                                const t = e.target as HTMLTextAreaElement;
                                t.style.height = "auto";
                                t.style.height = `${Math.min(t.scrollHeight, 112)}px`;
                              }}
                            />

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              {currentQ?.multi && selectedChips.length > 0 ? (
                                <button
                                  onClick={() =>
                                    submitAnswer(selectedChips.join(", "))
                                  }
                                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all text-white"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, #ff7832, #c050ff)",
                                    boxShadow:
                                      "0 8px 22px rgba(180,80,255,0.26)",
                                  }}
                                >
                                  Continue <ChevronRight size={13} />
                                </button>
                              ) : (
                                <button
                                  onClick={() => submitAnswer(inputValue)}
                                  disabled={!inputValue.trim()}
                                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 text-white"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, #ff7832, #c050ff)",
                                    boxShadow:
                                      "0 8px 22px rgba(180,80,255,0.26)",
                                  }}
                                  aria-label="Send"
                                >
                                  <Send size={14} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`flex items-center justify-between text-xs ${isDark ? "text-white/20" : "text-gray-400"}`}
                        >
                          <span className="flex items-center gap-1">
                            <CornerDownLeft size={10} />
                            Enter to submit · Shift+Enter for new line
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
                              className={`flex items-center gap-1 transition-colors ${isDark ? "hover:text-white/50" : "hover:text-gray-600"}`}
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
                      className="flex-shrink-0 border-t px-4 py-3 flex items-center gap-2"
                      style={{
                        background: isDark
                          ? "rgba(10,10,14,0.38)"
                          : "rgba(255,255,255,0.22)",
                        borderColor: isDark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.05)",
                      }}
                    >
                      <CheckCircle2
                        size={15}
                        className="text-emerald-400 flex-shrink-0"
                      />
                      <span
                        className={`text-xs ${isDark ? "text-white/40" : "text-gray-500"}`}
                      >
                        Discovery complete. Review your ERP blueprint on the
                        right.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Sidebar Box */}
              <aside
                className="hidden lg:flex w-[300px] xl:w-[320px] flex-col rounded-[28px] border overflow-hidden backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.08)]"
                style={{
                  background: isDark
                    ? "rgba(16,16,20,0.62)"
                    : "rgba(255,255,255,0.56)",
                  borderColor: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.65)",
                }}
              >
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {/* Readiness */}
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 8 }}
                    className="rounded-[22px] border p-4 backdrop-blur-sm"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(255,255,255,0.62)",
                      borderColor: isDark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-white/28" : "text-gray-400"}`}
                      >
                        Readiness
                      </span>
                      <span
                        className={`text-xs font-bold ${readiness >= 80 ? "text-emerald-400" : readiness >= 40 ? "text-amber-400" : isDark ? "text-violet-400" : "text-violet-600"}`}
                      >
                        {readiness}%
                      </span>
                    </div>
                    <div
                      className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-white/[0.05]" : "bg-black/[0.06]"}`}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            readiness >= 80
                              ? "#4ade80"
                              : "linear-gradient(90deg, #ff7832, #c050ff)",
                        }}
                        animate={{ width: `${readiness}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <div
                      className={`flex justify-between mt-2 text-xs ${isDark ? "text-white/25" : "text-gray-400"}`}
                    >
                      <span>{answeredCount} answered</span>
                      <span>{TOTAL_QUESTIONS - answeredCount} left</span>
                    </div>
                  </motion.div>

                  {(businessName || industry || employees) && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 }}
                      className="rounded-[22px] border p-4 backdrop-blur-sm"
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(255,255,255,0.62)",
                        borderColor: isDark
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(0,0,0,0.05)",
                      }}
                    >
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-3 ${isDark ? "text-white/28" : "text-gray-400"}`}
                      >
                        Business
                      </p>
                      <div className="space-y-2">
                        {businessName && (
                          <div className="flex items-start gap-2">
                            <Building2
                              size={13}
                              className={
                                isDark
                                  ? "text-white/20 mt-0.5"
                                  : "text-gray-400 mt-0.5"
                              }
                            />
                            <span
                              className={`text-sm font-medium ${isDark ? "text-white/82" : "text-gray-800"}`}
                            >
                              {businessName}
                            </span>
                          </div>
                        )}
                        {industry && (
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-xs ${isDark ? "text-white/25" : "text-gray-400"}`}
                            >
                              Industry
                            </span>
                            <span
                              className="text-xs font-medium text-right"
                              style={{
                                color: isDark
                                  ? "rgba(200,150,255,0.9)"
                                  : "#7c3aed",
                              }}
                            >
                              {industry}
                            </span>
                          </div>
                        )}
                        {employees && (
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-xs ${isDark ? "text-white/25" : "text-gray-400"}`}
                            >
                              Employees
                            </span>
                            <span
                              className={`text-xs ${isDark ? "text-white/50" : "text-gray-600"}`}
                            >
                              {employees}
                            </span>
                          </div>
                        )}
                        {geoOps && (
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-xs ${isDark ? "text-white/25" : "text-gray-400"}`}
                            >
                              Geography
                            </span>
                            <span
                              className={`text-xs text-right ${isDark ? "text-white/50" : "text-gray-600"}`}
                            >
                              {geoOps}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-[22px] border p-4 backdrop-blur-sm"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(255,255,255,0.62)",
                      borderColor: isDark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.05)",
                    }}
                  >
                    <p
                      className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-3 ${isDark ? "text-white/28" : "text-gray-400"}`}
                    >
                      Modules
                    </p>
                    {modules.length <= 2 ? (
                      <p
                        className={`text-xs ${isDark ? "text-white/20" : "text-gray-400"}`}
                      >
                        Answer questions to activate relevant ERP modules.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {modules.map((mod, i) => (
                          <motion.span
                            key={mod}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.03 }}
                            className="text-[11px] px-2.5 py-1 rounded-full font-medium border"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(255,120,50,0.08), rgba(180,80,255,0.08))",
                              borderColor: isDark
                                ? "rgba(180,80,255,0.18)"
                                : "rgba(180,80,255,0.18)",
                              color: isDark
                                ? "rgba(200,150,255,0.9)"
                                : "#6d28d9",
                            }}
                          >
                            {mod}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </motion.div>

                  {missingInfo.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="rounded-[22px] border p-4"
                      style={{
                        background: isDark
                          ? "rgba(251,191,36,0.04)"
                          : "rgba(254,243,199,0.72)",
                        borderColor: isDark
                          ? "rgba(251,191,36,0.12)"
                          : "rgba(245,158,11,0.16)",
                      }}
                    >
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-3 ${isDark ? "text-amber-400/60" : "text-amber-700"}`}
                      >
                        Missing Info
                      </p>
                      <div className="space-y-1.5">
                        {missingInfo.slice(0, 5).map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <Circle
                              size={6}
                              className={
                                isDark ? "text-amber-400/40" : "text-amber-500"
                              }
                            />
                            <span
                              className={`text-xs ${isDark ? "text-amber-300/60" : "text-amber-800"}`}
                            >
                              {item}
                            </span>
                          </div>
                        ))}
                        {missingInfo.length > 5 && (
                          <span
                            className={`text-xs ${isDark ? "text-white/20" : "text-gray-400"}`}
                          >
                            +{missingInfo.length - 5} more fields needed
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {(painPoints || timeline) && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="rounded-[22px] border p-4 backdrop-blur-sm"
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(255,255,255,0.62)",
                        borderColor: isDark
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(0,0,0,0.05)",
                      }}
                    >
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-3 ${isDark ? "text-white/28" : "text-gray-400"}`}
                      >
                        Rollout
                      </p>
                      <div className="space-y-2.5">
                        {painPoints && (
                          <div>
                            <span
                              className={`text-xs block mb-1 ${isDark ? "text-white/25" : "text-gray-400"}`}
                            >
                              Top Pain Points
                            </span>
                            <p
                              className={`text-xs leading-relaxed ${isDark ? "text-white/50" : "text-gray-600"}`}
                            >
                              {painPoints}
                            </p>
                          </div>
                        )}
                        {timeline && (
                          <div className="flex items-center gap-2">
                            <Clock
                              size={12}
                              className={
                                isDark ? "text-white/25" : "text-gray-400"
                              }
                            />
                            <span
                              className={`text-xs ${isDark ? "text-white/50" : "text-gray-600"}`}
                            >
                              Target go-live: {timeline}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {integrationsList && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.22 }}
                      className="rounded-[22px] border p-4 backdrop-blur-sm"
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(255,255,255,0.62)",
                        borderColor: isDark
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(0,0,0,0.05)",
                      }}
                    >
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-3 ${isDark ? "text-white/28" : "text-gray-400"}`}
                      >
                        Integrations
                      </p>
                      <p
                        className={`text-xs leading-relaxed ${isDark ? "text-white/50" : "text-gray-600"}`}
                      >
                        {integrationsList}
                      </p>
                    </motion.div>
                  )}

                  {depts && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.24 }}
                      className="rounded-[22px] border p-4 backdrop-blur-sm"
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(255,255,255,0.62)",
                        borderColor: isDark
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(0,0,0,0.05)",
                      }}
                    >
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-3 ${isDark ? "text-white/28" : "text-gray-400"}`}
                      >
                        Departments
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {depts.split(",").map((d) => (
                          <span
                            key={d}
                            className={`text-[11px] px-2.5 py-1 rounded-full border ${isDark ? "bg-white/[0.04] border-white/[0.07] text-white/45" : "bg-black/[0.03] border-black/[0.07] text-gray-500"}`}
                          >
                            {d.trim()}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 }}
                    className="rounded-[22px] border p-4 backdrop-blur-sm"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(255,255,255,0.62)",
                      borderColor: isDark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.05)",
                    }}
                  >
                    <p
                      className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-3 ${isDark ? "text-white/28" : "text-gray-400"}`}
                    >
                      Sections
                    </p>
                    <div className="space-y-2">
                      {sectionProgress.map((section) => (
                        <div
                          key={section.id}
                          className="flex items-center gap-2.5"
                        >
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${section.complete ? "bg-emerald-400/15 text-emerald-400" : section.answered > 0 ? "text-violet-400" : isDark ? "bg-white/[0.04] text-white/15" : "bg-black/[0.04] text-gray-300"}`}
                            style={
                              section.answered > 0 && !section.complete
                                ? {
                                    background:
                                      "linear-gradient(135deg, rgba(255,120,50,0.12), rgba(180,80,255,0.12))",
                                  }
                                : {}
                            }
                          >
                            {section.complete ? (
                              <CheckCircle2 size={10} />
                            ) : section.answered > 0 ? (
                              <RefreshCw size={8} />
                            ) : (
                              <Circle size={8} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-medium truncate ${section.complete ? "text-emerald-400" : section.answered > 0 ? (isDark ? "text-white/70" : "text-gray-700") : isDark ? "text-white/25" : "text-gray-400"}`}
                              >
                                {section.label}
                              </span>
                              <span
                                className={`text-[11px] ${isDark ? "text-white/20" : "text-gray-400"}`}
                              >
                                {section.answered}/{section.total}
                              </span>
                            </div>
                            <div
                              className={`mt-1 h-1 rounded-full ${isDark ? "bg-white/[0.04]" : "bg-black/[0.05]"}`}
                            >
                              <motion.div
                                className="h-full rounded-full"
                                style={{
                                  background: section.complete
                                    ? "#4ade80"
                                    : "linear-gradient(90deg, #ff7832, #c050ff)",
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

                  {isDone && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-[22px] border p-4"
                      style={{
                        background: isDark
                          ? "rgba(74,222,128,0.04)"
                          : "rgba(240,253,244,0.9)",
                        borderColor: isDark
                          ? "rgba(74,222,128,0.15)"
                          : "rgba(34,197,94,0.2)",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2
                          size={16}
                          className="text-emerald-400 mt-0.5"
                        />
                        <div>
                          <p
                            className={`text-sm font-semibold mb-1 ${isDark ? "text-emerald-400" : "text-emerald-700"}`}
                          >
                            Blueprint Ready
                          </p>
                          <p
                            className={`text-xs leading-relaxed ${isDark ? "text-white/40" : "text-gray-500"}`}
                          >
                            Your ERP discovery is complete. Share this blueprint
                            with your implementation partner or export it as a
                            scoping document.
                          </p>
                          <button
                            className="mt-3 flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-full transition-all text-white"
                            style={{
                              background:
                                "linear-gradient(135deg, #ff7832, #c050ff)",
                              boxShadow: "0 4px 16px rgba(180,80,255,0.28)",
                            }}
                          >
                            Export Blueprint <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
