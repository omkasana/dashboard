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
            label: "Payment gateways (Razorpay etc.)",
            value: "Payment gateway",
          },
          { label: "Biometric / attendance device", value: "Biometric device" },
          { label: "Barcode / QR scanner", value: "Barcode scanner" },
          { label: "Hospital / HIS system", value: "HIS integration" },
          { label: "POS terminal", value: "POS" },
          { label: "SAP / Oracle legacy data", value: "Legacy ERP" },
        ],
        multi: true,
      },
      {
        id: "infrastructure",
        text: "What is your preferred deployment model and infrastructure?",
        helper:
          "Cloud ERP offers fast deployment and zero maintenance. On-premise gives full data control but requires IT investment. Your choice affects total cost of ownership.",
        placeholder:
          "e.g. Cloud preferred, mobile access for field sales, no on-premise servers",
        chips: [
          { label: "Cloud SaaS (preferred)", value: "Cloud SaaS" },
          { label: "On-premise server (IT team)", value: "On-premise" },
          { label: "Hybrid (cloud + local backup)", value: "Hybrid" },
          { label: "Mobile app for field teams", value: "Mobile app" },
          { label: "Offline mode required", value: "Offline mode" },
        ],
      },
    ],
  },
  {
    id: "rollout",
    label: "Rollout Priorities",
    icon: <Rocket size={15} />,
    questions: [
      {
        id: "pain_points",
        text: "What are the top 3 operational pain points ERP must fix on day one?",
        helper:
          "Phase 1 must deliver visible ROI quickly. Anchoring to the most painful problems ensures adoption and executive buy-in.",
        placeholder:
          "e.g. No real-time stock visibility, manual invoicing errors, zero purchase tracking",
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
            label: "Siloed data, no single source of truth",
            value: "Data silos",
          },
          { label: "No purchase order tracking", value: "No PO tracking" },
          { label: "Delayed financial reporting", value: "Slow reporting" },
          { label: "Compliance / GST errors", value: "GST errors" },
        ],
        multi: true,
      },
      {
        id: "go_live_timeline",
        text: "What is your target go-live timeline, and what is driving that deadline?",
        helper:
          "Timeline impacts module scoping, change management effort, and implementation approach. Aggressive timelines require phased rollouts.",
        placeholder: "e.g. 3 months — new financial year starts April 1st",
        chips: [
          { label: "ASAP — within 4 weeks", value: "4 weeks" },
          { label: "2–3 months", value: "2–3 months" },
          { label: "3–6 months", value: "3–6 months" },
          { label: "6–12 months (large rollout)", value: "6–12 months" },
          {
            label: "Phased — pilot first, then expand",
            value: "Phased rollout",
          },
        ],
      },
      {
        id: "priority_focus",
        text: "What is the single most important outcome you expect from this ERP?",
        helper:
          "Clarity on the primary success metric helps us recommend the right module priorities and implementation sequence.",
        placeholder:
          "e.g. Full inventory control and automated purchasing to reduce stock-outs",
        chips: [
          { label: "Speed — faster operations", value: "Speed" },
          { label: "Control — approvals, limits, audits", value: "Control" },
          { label: "Automation — reduce manual work", value: "Automation" },
          {
            label: "Visibility — real-time data for decisions",
            value: "Visibility",
          },
          { label: "Compliance — tax, audit, statutory", value: "Compliance" },
          { label: "Scale — grow without adding headcount", value: "Scale" },
        ],
      },
    ],
  },
];

const ALL_QUESTIONS: {
  sectionIdx: number;
  questionIdx: number;
  question: Question;
}[] = [];
ERP_SECTIONS.forEach((section, sIdx) => {
  section.questions.forEach((q, qIdx) => {
    ALL_QUESTIONS.push({ sectionIdx: sIdx, questionIdx: qIdx, question: q });
  });
});
const TOTAL_QUESTIONS = ALL_QUESTIONS.length;

function inferModules(answers: Answer[]): string[] {
  const modules: Set<string> = new Set();
  const get = (id: string) =>
    answers.find((a) => a.questionId === id)?.value || "";
  modules.add("Core ERP Framework");
  modules.add("User & Access Management");
  const inventory = get("inventory_needs").toLowerCase();
  const mfg = get("manufacturing_needs").toLowerCase();
  const wh = get("warehouse_needs").toLowerCase();
  const sales = get("sales_workflow").toLowerCase();
  const proc = get("procurement_workflow").toLowerCase();
  const hr = get("hr_needs").toLowerCase();
  const gst = get("gst_compliance").toLowerCase();
  const crm = get("crm_needs").toLowerCase();
  const infra = get("infrastructure").toLowerCase();
  const integrations = get("existing_tools").toLowerCase();
  const reporting = get("dashboard_needs").toLowerCase();
  if (!inventory.includes("no inventory")) modules.add("Inventory Management");
  if (wh && !wh.includes("no warehouse")) modules.add("Warehouse Management");
  if (mfg && !mfg.includes("no manufacturing")) {
    modules.add("Manufacturing / Production");
    modules.add("Bill of Materials (BOM)");
  }
  if (proc && !proc.includes("ad-hoc")) modules.add("Procurement & Purchase");
  if (sales) modules.add("Sales & Order Management");
  if (hr) modules.add("HR & Payroll");
  if (gst) modules.add("Finance & Accounting");
  if (gst.includes("gst") || gst.includes("e-invoicing"))
    modules.add("GST & Tax Compliance");
  if (crm && !crm.includes("no crm")) modules.add("CRM & Lead Management");
  if (reporting) modules.add("Reporting & Analytics");
  if (integrations.includes("barcode") || integrations.includes("biometric"))
    modules.add("Device Integrations");
  if (integrations.includes("shopify") || integrations.includes("e-commerce"))
    modules.add("E-commerce Integration");
  if (integrations.includes("whatsapp")) modules.add("WhatsApp Notifications");
  if (infra.includes("mobile")) modules.add("Mobile App");
  return Array.from(modules);
}

function inferMissingInfo(answers: Answer[]): string[] {
  const missing: string[] = [];
  const criticalFields = [
    { id: "business_name", label: "Business name" },
    { id: "industry", label: "Industry" },
    { id: "employee_count", label: "Team size" },
    { id: "branches", label: "Number of locations" },
    { id: "inventory_needs", label: "Inventory requirements" },
    { id: "gst_compliance", label: "GST / tax needs" },
    { id: "pain_points", label: "Top pain points" },
    { id: "go_live_timeline", label: "Go-live timeline" },
  ];
  criticalFields.forEach((f) => {
    if (!answers.find((a) => a.questionId === f.id)?.value?.trim())
      missing.push(f.label);
  });
  return missing;
}

function computeReadiness(answers: Answer[]): number {
  return Math.round(
    (answers.filter((a) => a.value.trim()).length / TOTAL_QUESTIONS) * 100,
  );
}

const SUGGESTION_CHIPS = [
  "Help me set up ERP for a polymer manufacturing company",
  "We're a trading company with 5 warehouses — help us plan ERP",
  "Multi-branch retail with GST compliance and CRM needs",
  "Build ERP blueprint for a 200-person manufacturing company",
];

export default function Page() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [phase, setPhase] = useState<"landing" | "builder">("landing");
  const [messages, setMessages] = useState<Message[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionFlat, setCurrentQuestionFlat] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [landingInput, setLandingInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const landingInputRef = useRef<HTMLTextAreaElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    try {
      const s = localStorage.getItem("erp-theme") as "dark" | "light" | null;
      if (s) setTheme(s);
    } catch {}
  }, []);

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("erp-theme", next);
    } catch {}
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    if (phase === "builder") setTimeout(() => inputRef.current?.focus(), 400);
  }, [phase]);

  const currentEntry = ALL_QUESTIONS[currentQuestionFlat] || null;
  const currentSection = currentEntry
    ? ERP_SECTIONS[currentEntry.sectionIdx]
    : null;

  function getSectionIntro(id: string): string {
    const map: Record<string, string> = {
      operations: "let's map your operational workflows.",
      teams_roles:
        "let's define who will use the ERP and what access they need.",
      finance: "let's cover your accounting, tax, and compliance requirements.",
      crm: "let's understand your customer and sales management needs.",
      reporting: "let's define what data and insights your team needs.",
      integrations:
        "let's map every system and device the ERP must connect to.",
      rollout: "finally, let's set your priorities and go-live plan.",
    };
    return map[id] || "continuing your ERP discovery.";
  }

  const startBuilder = useCallback((initialPrompt: string) => {
    if (!initialPrompt.trim()) return;
    const firstQ = ALL_QUESTIONS[0];
    setMessages([
      { id: "user-init", role: "user", content: initialPrompt },
      {
        id: "welcome",
        role: "assistant",
        content: `I've received your request. Let's build your custom ERP blueprint together.\n\nI'll ask you targeted questions across 8 discovery areas — business profile, operations, teams, finance, CRM, reporting, integrations, and rollout priorities. Your answers directly shape the ERP architecture we generate.\n\nLet's start with the basics.`,
      },
      {
        id: `q-${firstQ.question.id}`,
        role: "assistant",
        content: firstQ.question.text,
        questionId: firstQ.question.id,
      },
    ]);
    setCurrentQuestionFlat(0);
    setPhase("builder");
  }, []);

  const submitAnswer = useCallback(
    (value: string) => {
      if (!value.trim() || !currentEntry) return;
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: value.trim(),
      };
      setAnswers((prev) => [
        ...prev.filter((a) => a.questionId !== currentEntry.question.id),
        { questionId: currentEntry.question.id, value: value.trim() },
      ]);
      const nextFlat = currentQuestionFlat + 1;
      if (nextFlat < TOTAL_QUESTIONS) {
        const nextEntry = ALL_QUESTIONS[nextFlat];
        const isNewSection = nextEntry.sectionIdx !== currentEntry.sectionIdx;
        const nextMessages: Message[] = [userMsg];
        if (isNewSection) {
          const nextSection = ERP_SECTIONS[nextEntry.sectionIdx];
          nextMessages.push({
            id: `section-${nextSection.id}`,
            role: "assistant",
            content: `✓ ${ERP_SECTIONS[currentEntry.sectionIdx].label} complete.\n\nMoving to ${nextSection.label} — ${getSectionIntro(nextSection.id)}`,
          });
        }
        nextMessages.push({
          id: `q-${nextEntry.question.id}`,
          role: "assistant",
          content: nextEntry.question.text,
          questionId: nextEntry.question.id,
        });
        setMessages((prev) => [...prev, ...nextMessages]);
        setCurrentQuestionFlat(nextFlat);
      } else {
        setMessages((prev) => [
          ...prev,
          userMsg,
          {
            id: "done",
            role: "assistant",
            content:
              "That covers all discovery areas. Your ERP blueprint is now ready — review the complete summary in the panel on the right. You can edit any answer by going back to previous questions.",
          },
        ]);
        setCurrentQuestionFlat(TOTAL_QUESTIONS);
      }
      setInputValue("");
      setSelectedChips([]);
    },
    [currentEntry, currentQuestionFlat],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitAnswer(
        selectedChips.length > 0 ? selectedChips.join(", ") : inputValue,
      );
    }
  };

  const toggleChip = (value: string) => {
    if (currentEntry?.question.multi) {
      setSelectedChips((prev) =>
        prev.includes(value)
          ? prev.filter((c) => c !== value)
          : [...prev, value],
      );
    } else {
      setSelectedChips([value]);
      submitAnswer(value);
    }
  };

  const modules = inferModules(answers);
  const missingInfo = inferMissingInfo(answers);
  const readiness = computeReadiness(answers);
  const answeredCount = answers.filter((a) => a.value.trim()).length;
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
    answers.find((a) => a.questionId === "go_live_timeline")?.value || "";
  const integrationsList =
    answers.find((a) => a.questionId === "existing_tools")?.value || "";
  const depts =
    answers.find((a) => a.questionId === "departments")?.value || "";
  const isDone = currentQuestionFlat >= TOTAL_QUESTIONS;
  const currentSectionIdx = currentEntry?.sectionIdx ?? ERP_SECTIONS.length - 1;
  const currentSectionInfo = ERP_SECTIONS[currentSectionIdx];
  const progressPct = Math.round((currentQuestionFlat / TOTAL_QUESTIONS) * 100);
  const currentQ = currentEntry?.question;

  const sectionProgress = ERP_SECTIONS.map((section) => {
    const sectionQIds = section.questions.map((q) => q.id);
    const answeredInSection = answers.filter(
      (a) => sectionQIds.includes(a.questionId) && a.value.trim(),
    ).length;
    return {
      ...section,
      answered: answeredInSection,
      total: section.questions.length,
      complete: answeredInSection === section.questions.length,
    };
  });

  const bg = isDark ? "bg-[#0f0f10]" : "bg-[#f5f4f0]";
  const cardBg = isDark ? "bg-[#17171a]" : "bg-white";
  const cardBorder = isDark ? "border-white/[0.06]" : "border-black/[0.07]";
  const surfaceAlt = isDark ? "bg-[#1e1e22]" : "bg-[#f0efe9]";
  const textPrimary = isDark ? "text-[#e8e8ea]" : "text-[#1a1a1c]";
  const textMuted = isDark ? "text-[#7a7a8a]" : "text-[#6b6b78]";
  const textFaint = isDark ? "text-[#454550]" : "text-[#b0b0b8]";
  const accent = isDark ? "text-[#5ba4cf]" : "text-[#0f6694]";
  const accentBg = isDark ? "bg-[#5ba4cf]/10" : "bg-[#0f6694]/10";
  const accentBorder = isDark ? "border-[#5ba4cf]/20" : "border-[#0f6694]/20";
  const inputBg = isDark ? "bg-[#1e1e22]" : "bg-[#f0efe9]";
  const inputBorder = isDark ? "border-white/[0.08]" : "border-black/[0.09]";

  if (phase === "landing") {
    return (
      <div
        className={`h-screen overflow-hidden flex flex-col items-center justify-center ${bg} ${textPrimary} relative`}
        style={{ fontFamily: "'Inter','system-ui',sans-serif" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(91,164,207,0.07) 0%, transparent 70%)"
              : "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(15,102,148,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-5 right-5 z-10">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border ${cardBorder} ${cardBg} ${textMuted} transition-all`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl px-5 flex flex-col gap-7 relative z-10"
        >
          <div className="flex justify-center">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${accentBg} ${accentBorder} ${accent}`}
            >
              <Sparkles size={11} />
              AI-Powered ERP Discovery
            </span>
          </div>
          <div className="text-center">
            <h1
              className={`text-4xl font-semibold tracking-tight mb-3 ${textPrimary}`}
            >
              Build Your ERP With AI
            </h1>
            <p
              className={`text-base leading-relaxed ${textMuted} max-w-lg mx-auto`}
            >
              Answer guided questions about your business and operations. Get a
              complete, custom ERP blueprint in minutes — with modules,
              integrations, roles, and a phased rollout plan.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "Manufacturing", icon: <Factory size={13} /> },
              { label: "Trading", icon: <Truck size={13} /> },
              { label: "Retail", icon: <ShoppingCart size={13} /> },
              { label: "Healthcare", icon: <Hospital size={13} /> },
              { label: "Logistics", icon: <Package size={13} /> },
              { label: "Services", icon: <Briefcase size={13} /> },
            ].map((chip) => (
              <button
                key={chip.label}
                onClick={() =>
                  setLandingInput(
                    `Help me build an ERP for a ${chip.label.toLowerCase()} business`,
                  )
                }
                className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${cardBorder} ${cardBg} ${textMuted} transition-all`}
              >
                {chip.icon}
                {chip.label}
              </button>
            ))}
          </div>
          <div
            className={`rounded-2xl border ${cardBorder} ${cardBg} overflow-hidden`}
            style={{
              boxShadow: isDark
                ? "0 8px 40px rgba(0,0,0,0.45),0 2px 8px rgba(0,0,0,0.3)"
                : "0 8px 40px rgba(0,0,0,0.1),0 2px 8px rgba(0,0,0,0.06)",
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
              placeholder="Describe your business and what you need from an ERP..."
              rows={3}
              className={`w-full px-5 pt-4 pb-2 ${textPrimary} text-sm resize-none outline-none border-none leading-relaxed`}
              style={{ background: "transparent" }}
            />
            <div
              className={`flex items-center justify-between px-4 py-3 border-t ${cardBorder}`}
            >
              <span className={`text-xs ${textFaint}`}>
                Press{" "}
                <kbd
                  className={`px-1.5 py-0.5 rounded text-xs font-mono ${surfaceAlt}`}
                >
                  Enter
                </kbd>{" "}
                to start
              </span>
              <button
                onClick={() => startBuilder(landingInput)}
                disabled={!landingInput.trim()}
                className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all disabled:opacity-40 ${isDark ? "bg-[#5ba4cf] text-[#0f1520] hover:bg-[#4d94bf]" : "bg-[#0f6694] text-white hover:bg-[#0d5880]"}`}
              >
                Start Discovery
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className={`text-xs text-center ${textFaint}`}>
              Or start with a suggestion:
            </p>
            <div className="flex flex-col gap-1.5">
              {SUGGESTION_CHIPS.map((s) => (
                <button
                  key={s}
                  onClick={() => startBuilder(s)}
                  className={`text-left text-sm px-4 py-2.5 rounded-xl border ${cardBorder} ${surfaceAlt} ${textMuted} transition-all flex items-center gap-2`}
                >
                  <ChevronRight size={13} className={textFaint} />
                  {s}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`h-screen overflow-hidden flex flex-col ${bg} ${textPrimary}`}
      style={{ fontFamily: "'Inter','system-ui',sans-serif" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 100% 50% at 50% 0%, rgba(91,164,207,0.05) 0%, transparent 60%)"
            : "radial-gradient(ellipse 100% 50% at 50% 0%, rgba(15,102,148,0.04) 0%, transparent 60%)",
        }}
      />
      <header
        className={`relative z-20 flex-shrink-0 flex items-center justify-between px-4 h-12 border-b ${cardBorder} ${cardBg}`}
      >
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 ${accent}`}>
            <Layers size={16} />
            <span className="text-sm font-semibold">ERPBlueprint</span>
          </div>
          <span className={`text-xs ${textFaint}`}>•</span>
          <span className={`text-xs font-medium ${textMuted}`}>
            {isDone
              ? "Blueprint Complete"
              : currentSectionInfo?.label || "Discovery"}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 flex-1 max-w-sm mx-6">
          <div
            className={`flex-1 h-1.5 rounded-full ${isDark ? "bg-white/[0.06]" : "bg-black/[0.07]"}`}
          >
            <motion.div
              className={`h-full rounded-full ${isDark ? "bg-[#5ba4cf]" : "bg-[#0f6694]"}`}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span
            className={`text-xs font-medium ${textMuted} whitespace-nowrap`}
          >
            {progressPct}% complete
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs ${textFaint} hidden sm:block`}>
            {isDone
              ? `${TOTAL_QUESTIONS}/${TOTAL_QUESTIONS}`
              : `${currentQuestionFlat + 1} of ${TOTAL_QUESTIONS}`}
          </span>
          <button
            onClick={toggleTheme}
            className={`p-1.5 rounded-md ${surfaceAlt} ${textMuted} transition-colors`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row min-h-0 relative z-10">
        <div
          className={`flex flex-col min-h-0 flex-1 lg:max-w-[55%] border-r ${cardBorder}`}
        >
          <div
            className={`flex-shrink-0 flex items-center gap-1 px-3 py-2 border-b ${cardBorder} overflow-x-auto`}
          >
            {ERP_SECTIONS.map((section, idx) => {
              const isActive = idx === currentSectionIdx && !isDone;
              const isDoneSection = idx < currentSectionIdx || isDone;
              return (
                <div
                  key={section.id}
                  className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${isActive ? `${accentBg} ${accent} border ${accentBorder}` : isDoneSection ? (isDark ? "text-[#4caf86] bg-[#4caf86]/10" : "text-[#1a7a54] bg-[#1a7a54]/10") : textFaint}`}
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
          <div className="flex-1 overflow-y-auto min-h-0 px-4 py-4 space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" ? (
                    <div className="max-w-[88%] space-y-0.5">
                      <div
                        className={`px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed border ${isDark ? "bg-[#1c1c20] border-white/[0.06] text-[#d8d8dc]" : "bg-white border-black/[0.07] text-[#1a1a1c]"}`}
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {msg.content.replace(/\*\*(.*?)\*\*/g, "$1")}
                      </div>
                      {msg.questionId === currentQ?.id &&
                        currentQ &&
                        !isDone && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className={`px-3 py-2 text-xs ${textMuted} flex items-start gap-1.5 max-w-[88%]`}
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
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed ${isDark ? "bg-[#5ba4cf]/15 border border-[#5ba4cf]/20 text-[#c8e0ef]" : "bg-[#0f6694]/10 border border-[#0f6694]/15 text-[#0a4a6d]"}`}
                    >
                      {msg.content}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>
          {!isDone && (
            <div
              className={`flex-shrink-0 border-t ${cardBorder} px-3 py-3 space-y-2.5 ${cardBg}`}
            >
              {currentQ?.chips && currentQ.chips.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {currentQ.chips.map((chip) => {
                    const isSelected = selectedChips.includes(chip.value);
                    return (
                      <button
                        key={chip.value}
                        onClick={() => toggleChip(chip.value)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all font-medium ${isSelected ? (isDark ? "bg-[#5ba4cf]/20 border-[#5ba4cf]/40 text-[#5ba4cf]" : "bg-[#0f6694]/15 border-[#0f6694]/30 text-[#0f6694]") : `border ${cardBorder} ${textMuted}`}`}
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              )}
              {currentQ?.multi && (
                <p className={`text-xs ${textFaint}`}>
                  Select all that apply, then click Continue.
                </p>
              )}
              <div
                className={`flex items-end gap-2 rounded-xl border ${inputBorder} ${inputBg} px-3 py-2`}
              >
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={currentQ?.placeholder || "Type your answer…"}
                  rows={1}
                  className={`flex-1 text-sm bg-transparent outline-none border-none resize-none ${textPrimary} leading-relaxed min-h-[28px] max-h-28`}
                  style={{ overflowY: "auto" }}
                  onInput={(e) => {
                    const t = e.target as HTMLTextAreaElement;
                    t.style.height = "auto";
                    t.style.height = `${Math.min(t.scrollHeight, 112)}px`;
                  }}
                />
                <div className="flex items-center gap-1.5 flex-shrink-0 pb-0.5">
                  {currentQ?.multi && selectedChips.length > 0 ? (
                    <button
                      onClick={() => submitAnswer(selectedChips.join(", "))}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${isDark ? "bg-[#5ba4cf] text-[#0f1520] hover:bg-[#4d94bf]" : "bg-[#0f6694] text-white hover:bg-[#0d5880]"}`}
                    >
                      Continue
                      <ChevronRight size={13} />
                    </button>
                  ) : (
                    <button
                      onClick={() => submitAnswer(inputValue)}
                      disabled={!inputValue.trim()}
                      className={`p-1.5 rounded-lg transition-all disabled:opacity-30 ${isDark ? "bg-[#5ba4cf]/20 text-[#5ba4cf] hover:bg-[#5ba4cf]/30" : "bg-[#0f6694]/15 text-[#0f6694] hover:bg-[#0f6694]/25"}`}
                      aria-label="Send"
                    >
                      <Send size={14} />
                    </button>
                  )}
                </div>
              </div>
              <div
                className={`flex items-center justify-between text-xs ${textFaint}`}
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
                    className={`flex items-center gap-1 hover:${textMuted} transition-colors`}
                  >
                    <ChevronLeft size={11} />
                    Back
                  </button>
                )}
              </div>
            </div>
          )}
          {isDone && (
            <div
              className={`flex-shrink-0 border-t ${cardBorder} px-4 py-3 flex items-center gap-2 ${cardBg}`}
            >
              <CheckCircle2
                size={15}
                className="text-[#4caf86] flex-shrink-0"
              />
              <span className={`text-xs ${textMuted}`}>
                Discovery complete. Review your ERP blueprint on the right.
              </span>
            </div>
          )}
        </div>
        <div
          className={`flex-shrink-0 lg:w-[45%] overflow-y-auto flex flex-col gap-3 p-4 ${isDark ? "bg-[#0f0f12]" : "bg-[#eeede8]"}`}
        >
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 8 }}
            className={`rounded-xl border ${cardBorder} ${cardBg} p-4`}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-xs font-semibold uppercase tracking-wide ${textFaint}`}
              >
                Blueprint Readiness
              </span>
              <span
                className={`text-xs font-bold ${readiness >= 80 ? "text-[#4caf86]" : readiness >= 40 ? (isDark ? "text-[#f0b429]" : "text-[#9a7000]") : accent}`}
              >
                {readiness}%
              </span>
            </div>
            <div
              className={`h-2 rounded-full ${isDark ? "bg-white/[0.05]" : "bg-black/[0.07]"} overflow-hidden`}
            >
              <motion.div
                className={`h-full rounded-full ${readiness >= 80 ? "bg-[#4caf86]" : isDark ? "bg-[#5ba4cf]" : "bg-[#0f6694]"}`}
                animate={{ width: `${readiness}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className={`flex justify-between mt-2 text-xs ${textFaint}`}>
              <span>
                {answeredCount} of {TOTAL_QUESTIONS} questions answered
              </span>
              <span>
                {isDone
                  ? "Ready to build"
                  : `${TOTAL_QUESTIONS - answeredCount} remaining`}
              </span>
            </div>
          </motion.div>
          {(businessName || industry || employees) && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className={`rounded-xl border ${cardBorder} ${cardBg} p-4`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${textFaint} mb-3`}
              >
                Business Profile
              </p>
              <div className="space-y-2">
                {businessName && (
                  <div className="flex items-start gap-2">
                    <Building2
                      size={13}
                      className={`${textFaint} mt-0.5 flex-shrink-0`}
                    />
                    <span className={`text-sm font-medium ${textPrimary}`}>
                      {businessName}
                    </span>
                  </div>
                )}
                {industry && (
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${textFaint} w-16 flex-shrink-0`}>
                      Industry
                    </span>
                    <span className={`text-xs ${accent} font-medium`}>
                      {industry}
                    </span>
                  </div>
                )}
                {employees && (
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${textFaint} w-16 flex-shrink-0`}>
                      Employees
                    </span>
                    <span className={`text-xs ${textMuted}`}>{employees}</span>
                  </div>
                )}
                {geoOps && (
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${textFaint} w-16 flex-shrink-0`}>
                      Geography
                    </span>
                    <span className={`text-xs ${textMuted}`}>{geoOps}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`rounded-xl border ${cardBorder} ${cardBg} p-4`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-wide ${textFaint} mb-3`}
            >
              Activated Modules
            </p>
            {modules.length <= 2 ? (
              <p className={`text-xs ${textFaint}`}>
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
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${isDark ? "bg-[#5ba4cf]/10 text-[#5ba4cf] border border-[#5ba4cf]/15" : "bg-[#0f6694]/08 text-[#0f6694] border border-[#0f6694]/15"}`}
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
              className={`rounded-xl border ${isDark ? "border-amber-500/15" : "border-amber-400/25"} ${isDark ? "bg-amber-500/5" : "bg-amber-50"} p-4`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDark ? "text-amber-400/70" : "text-amber-700"}`}
              >
                Missing Information
              </p>
              <div className="space-y-1.5">
                {missingInfo.slice(0, 5).map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Circle
                      size={7}
                      className={
                        isDark ? "text-amber-400/50" : "text-amber-500"
                      }
                    />
                    <span
                      className={`text-xs ${isDark ? "text-amber-300/70" : "text-amber-800"}`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
                {missingInfo.length > 5 && (
                  <span className={`text-xs ${textFaint}`}>
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
              className={`rounded-xl border ${cardBorder} ${cardBg} p-4`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${textFaint} mb-3`}
              >
                Rollout & Priorities
              </p>
              <div className="space-y-2.5">
                {painPoints && (
                  <div>
                    <span className={`text-xs ${textFaint} block mb-1`}>
                      Top Pain Points
                    </span>
                    <p className={`text-xs ${textMuted} leading-relaxed`}>
                      {painPoints}
                    </p>
                  </div>
                )}
                {timeline && (
                  <div className="flex items-center gap-2">
                    <Clock size={12} className={textFaint} />
                    <span className={`text-xs ${textMuted}`}>
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
              className={`rounded-xl border ${cardBorder} ${cardBg} p-4`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${textFaint} mb-3`}
              >
                Integrations Required
              </p>
              <p className={`text-xs ${textMuted} leading-relaxed`}>
                {integrationsList}
              </p>
            </motion.div>
          )}
          {depts && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className={`rounded-xl border ${cardBorder} ${cardBg} p-4`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${textFaint} mb-3`}
              >
                Departments on ERP
              </p>
              <div className="flex flex-wrap gap-1.5">
                {depts.split(",").map((d) => (
                  <span
                    key={d}
                    className={`text-xs px-2.5 py-1 rounded-full ${surfaceAlt} ${textMuted} border ${cardBorder}`}
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
            className={`rounded-xl border ${cardBorder} ${cardBg} p-4`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-wide ${textFaint} mb-3`}
            >
              Discovery Sections
            </p>
            <div className="space-y-2">
              {sectionProgress.map((section) => (
                <div key={section.id} className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${section.complete ? "bg-[#4caf86]/15 text-[#4caf86]" : section.answered > 0 ? (isDark ? "bg-[#5ba4cf]/10 text-[#5ba4cf]" : "bg-[#0f6694]/10 text-[#0f6694]") : isDark ? "bg-white/[0.04] text-white/20" : "bg-black/[0.05] text-black/25"}`}
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
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-medium ${section.complete ? "text-[#4caf86]" : section.answered > 0 ? textPrimary : textFaint}`}
                      >
                        {section.label}
                      </span>
                      <span className={`text-xs ${textFaint}`}>
                        {section.answered}/{section.total}
                      </span>
                    </div>
                    <div
                      className={`mt-1 h-1 rounded-full ${isDark ? "bg-white/[0.04]" : "bg-black/[0.06]"}`}
                    >
                      <motion.div
                        className={`h-full rounded-full ${section.complete ? "bg-[#4caf86]" : isDark ? "bg-[#5ba4cf]" : "bg-[#0f6694]"}`}
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
              className={`rounded-xl border ${isDark ? "border-[#4caf86]/20" : "border-[#1a7a54]/20"} ${isDark ? "bg-[#4caf86]/05" : "bg-[#f0faf5]"} p-4`}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={16}
                  className={
                    isDark ? "text-[#4caf86] mt-0.5" : "text-[#1a7a54] mt-0.5"
                  }
                />
                <div>
                  <p
                    className={`text-sm font-semibold mb-1 ${isDark ? "text-[#4caf86]" : "text-[#1a7a54]"}`}
                  >
                    Blueprint Ready
                  </p>
                  <p className={`text-xs leading-relaxed ${textMuted}`}>
                    Your ERP discovery is complete. Share this blueprint with
                    your implementation partner or export it as a scoping
                    document.
                  </p>
                  <button
                    className={`mt-3 flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-all ${isDark ? "bg-[#4caf86] text-[#0a1a14] hover:bg-[#3d9a74]" : "bg-[#1a7a54] text-white hover:bg-[#146044]"}`}
                  >
                    Export Blueprint
                    <ArrowRight size={12} />
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
