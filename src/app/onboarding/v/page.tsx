// "use client";

// import { KeyboardEvent, useEffect, useMemo, useState } from "react";
// import {
//   ArrowUp,
//   Building2,
//   ChevronRight,
//   Factory,
//   Hospital,
//   Moon,
//   ShoppingBag,
//   Sun,
//   Warehouse,
// } from "lucide-react";

// const suggestions = [
//   "I want an ERP for inventory and warehouse management",
//   "Build an ERP for HR, payroll, and attendance",
//   "Need a manufacturing ERP with production tracking",
//   "Create a CRM + ERP for sales and customer management",
//   "Build a hospital ERP with patient and billing modules",
//   "Need a retail ERP with POS and stock sync",
// ];

// const industries = [
//   {
//     title: "Manufacturing",
//     icon: Factory,
//   },
//   {
//     title: "Retail",
//     icon: ShoppingBag,
//   },
//   {
//     title: "Healthcare",
//     icon: Hospital,
//   },
//   {
//     title: "Warehouse",
//     icon: Warehouse,
//   },
//   {
//     title: "Corporate",
//     icon: Building2,
//   },
// ];

// const onboardingQuestions = [
//   "What type of business are you running?",
//   "How many employees will use the ERP?",
//   "Do you need inventory management?",
//   "Do you want accounting and invoicing modules?",
//   "Should the ERP support multi-branch operations?",
//   "Do you need HR, payroll, and attendance tracking?",
//   "Do you want CRM and customer management?",
//   "Do you need analytics dashboards and reports?",
// ];

// const modules = ["Inventory", "HRMS", "CRM", "Finance", "Analytics"];

// export default function ERPOnboardingPage() {
//   const [prompt, setPrompt] = useState("");
//   const [messages, setMessages] = useState<string[]>([]);
//   const [darkMode, setDarkMode] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("erp-theme");

//     if (savedTheme) {
//       setDarkMode(savedTheme === "dark");
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("erp-theme", darkMode ? "dark" : "light");
//   }, [darkMode]);

//   const isDisabled = useMemo(() => {
//     return !prompt.trim();
//   }, [prompt]);

//   const toggleTheme = () => {
//     setDarkMode((prev) => !prev);
//   };

//   const handleSuggestionClick = (value: string) => {
//     setPrompt(value);
//   };

//   const handleIndustrySelect = (industry: string) => {
//     setPrompt(`Build an ERP for ${industry.toLowerCase()}`);
//   };

//   const handleModuleAdd = (tag: string) => {
//     setPrompt((prev) =>
//       prev ? `${prev}, ${tag} module` : `Need ${tag} module`,
//     );
//   };

//   const handleSubmit = async () => {
//     const trimmedPrompt = prompt.trim();

//     if (!trimmedPrompt || isSubmitting) return;

//     try {
//       setIsSubmitting(true);

//       setMessages((prev) => [...prev, trimmedPrompt]);

//       // TODO:
//       // API CALL / ROUTER PUSH / NEXT STEP

//       console.log("ERP Prompt:", trimmedPrompt);

//       setPrompt("");
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
//     // Enter = Submit
//     // Shift + Enter = New Line

//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();

//       handleSubmit();
//     }
//   };

//   return (
//     <main
//       className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
//         darkMode ? "bg-[#060816] text-white" : "bg-[#f7f8fc] text-[#0f172a]"
//       }`}
//     >
//       {/* Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div
//           className={`absolute left-[-10%] top-[-5%] h-[450px] w-[450px] rounded-full blur-[140px] ${
//             darkMode ? "bg-blue-500/40" : "bg-blue-300/40"
//           }`}
//         />

//         <div
//           className={`absolute right-[-10%] top-[5%] h-[420px] w-[420px] rounded-full blur-[140px] ${
//             darkMode ? "bg-violet-500/40" : "bg-violet-300/40"
//           }`}
//         />

//         <div
//           className={`absolute bottom-[-15%] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-[160px] ${
//             darkMode ? "bg-pink-500/40" : "bg-pink-300/40"
//           }`}
//         />

//         <div
//           className={`absolute bottom-[-20%] left-[15%] h-[350px] w-[350px] rounded-full blur-[120px] ${
//             darkMode ? "bg-orange-500/30" : "bg-orange-200/40"
//           }`}
//         />

//         <div
//           className={`absolute bottom-[-15%] right-[15%] h-[350px] w-[350px] rounded-full blur-[120px] ${
//             darkMode ? "bg-rose-500/30" : "bg-rose-300/40"
//           }`}
//         />
//       </div>

//       {/* Grid */}
//       <div
//         className={`absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:42px_42px] ${
//           darkMode ? "opacity-10" : "opacity-40"
//         }`}
//       />

//       {/* Theme Toggle */}
//       <div className="absolute right-6 top-6 z-50">
//         <button
//           onClick={toggleTheme}
//           className={`flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
//             darkMode
//               ? "border-white/10 bg-white/10 text-white"
//               : "border-slate-200 bg-white/80 text-slate-800 shadow-sm"
//           }`}
//         >
//           {darkMode ? (
//             <Sun className="h-5 w-5" />
//           ) : (
//             <Moon className="h-5 w-5" />
//           )}
//         </button>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 flex min-h-screen flex-col items-center px-6 py-12">
//         {/* Hero */}
//         <div className="mx-auto mt-10 max-w-5xl text-center">
//           <div
//             className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm backdrop-blur-xl ${
//               darkMode
//                 ? "border-white/10 bg-white/10 text-white/70"
//                 : "border-slate-200 bg-white/70 text-slate-600 shadow-sm"
//             }`}
//           >
//             <span className="h-2 w-2 rounded-full bg-emerald-500" />
//             AI ERP Builder
//           </div>

//           <h1
//             className={`text-4xl font-semibold tracking-tight sm:text-6xl ${
//               darkMode ? "text-white" : "text-slate-900"
//             }`}
//           >
//             Build Your ERP
//             <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
//               {" "}
//               With AI
//             </span>
//           </h1>

//           <p
//             className={`mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg ${
//               darkMode ? "text-white/60" : "text-slate-500"
//             }`}
//           >
//             Create a fully customized ERP system for your business operations,
//             inventory, HR, finance, CRM, manufacturing, and workflows by simply
//             describing your requirements.
//           </p>
//         </div>

//         {/* Industry Pills */}
//         <div className="mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-3">
//           {industries.map((item) => {
//             const Icon = item.icon;

//             return (
//               <button
//                 key={item.title}
//                 onClick={() => handleIndustrySelect(item.title)}
//                 className={`group flex items-center gap-3 rounded-2xl border px-5 py-3 text-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 ${
//                   darkMode
//                     ? "border-white/10 bg-white/[0.06] text-white/80 hover:bg-white/10"
//                     : "border-slate-200 bg-white/80 text-slate-700 shadow-sm hover:border-slate-300 hover:shadow-md"
//                 }`}
//               >
//                 <div
//                   className={`rounded-xl p-2 ${
//                     darkMode ? "bg-white/10" : "bg-slate-100"
//                   }`}
//                 >
//                   <Icon className="h-4 w-4" />
//                 </div>

//                 <span>{item.title}</span>

//                 <ChevronRight className="h-4 w-4 opacity-40 transition-all group-hover:translate-x-0.5" />
//               </button>
//             );
//           })}
//         </div>

//         {/* Prompt Box */}
//         <div className="mt-12 w-full max-w-4xl">
//           <div
//             className={`rounded-[32px] border p-4 backdrop-blur-2xl transition-all ${
//               darkMode
//                 ? "border-white/10 bg-[#121212]/90 shadow-2xl"
//                 : "border-slate-200 bg-white/80 shadow-[0_20px_80px_rgba(15,23,42,0.08)]"
//             }`}
//           >
//             <textarea
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Describe the ERP system you want to build..."
//               className={`min-h-[170px] w-full resize-none bg-transparent px-3 py-3 text-lg focus:outline-none ${
//                 darkMode
//                   ? "text-white placeholder:text-white/35"
//                   : "text-slate-800 placeholder:text-slate-400"
//               }`}
//             />

//             <div
//               className={`mt-5 flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between ${
//                 darkMode ? "border-white/10" : "border-slate-200"
//               }`}
//             >
//               {/* Module Tags */}
//               <div className="flex flex-wrap gap-2">
//                 {modules.map((tag) => (
//                   <button
//                     key={tag}
//                     onClick={() => handleModuleAdd(tag)}
//                     className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
//                       darkMode
//                         ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
//                         : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
//                     }`}
//                   >
//                     {tag}
//                   </button>
//                 ))}
//               </div>

//               {/* Submit */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={isDisabled || isSubmitting}
//                 className={`flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 ${
//                   darkMode ? "bg-white text-black" : "bg-slate-900 text-white"
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
//                 ) : (
//                   <ArrowUp className="h-5 w-5" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Suggestions */}
//           <div className="mt-6 flex flex-wrap justify-center gap-3">
//             {suggestions.map((item) => (
//               <button
//                 key={item}
//                 onClick={() => handleSuggestionClick(item)}
//                 className={`rounded-full border px-4 py-2 text-sm transition-all ${
//                   darkMode
//                     ? "border-white/10 bg-white/[0.05] text-white/65 hover:bg-white/10 hover:text-white"
//                     : "border-slate-200 bg-white/70 text-slate-600 shadow-sm hover:border-slate-300 hover:bg-white hover:text-slate-900"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Questions */}
//         <div className="mt-16 w-full max-w-4xl">
//           <div
//             className={`rounded-3xl border p-6 backdrop-blur-xl ${
//               darkMode
//                 ? "border-white/10 bg-white/[0.04]"
//                 : "border-slate-200 bg-white/75 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
//             }`}
//           >
//             <div className="mb-6 flex items-center justify-between">
//               <div>
//                 <h2
//                   className={`text-xl font-semibold ${
//                     darkMode ? "text-white" : "text-slate-900"
//                   }`}
//                 >
//                   ERP Discovery Questions
//                 </h2>

//                 <p
//                   className={`mt-1 text-sm ${
//                     darkMode ? "text-white/50" : "text-slate-500"
//                   }`}
//                 >
//                   These questions help generate a better ERP architecture.
//                 </p>
//               </div>

//               <div
//                 className={`rounded-full px-4 py-1 text-xs font-medium ${
//                   darkMode
//                     ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
//                     : "border border-emerald-200 bg-emerald-50 text-emerald-700"
//                 }`}
//               >
//                 AI Assisted
//               </div>
//             </div>

//             <div className="space-y-3">
//               {onboardingQuestions.map((question, index) => (
//                 <div
//                   key={question}
//                   className={`group flex items-center justify-between rounded-2xl border px-5 py-4 transition-all ${
//                     darkMode
//                       ? "border-white/8 bg-black/20 hover:border-white/15 hover:bg-white/[0.03]"
//                       : "border-slate-200 bg-white/70 hover:border-slate-300 hover:shadow-sm"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <div
//                       className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
//                         darkMode
//                           ? "bg-white/10 text-white/70"
//                           : "bg-slate-100 text-slate-600"
//                       }`}
//                     >
//                       {index + 1}
//                     </div>

//                     <p
//                       className={`text-sm font-medium ${
//                         darkMode ? "text-white/80" : "text-slate-700"
//                       }`}
//                     >
//                       {question}
//                     </p>
//                   </div>

//                   <ChevronRight
//                     className={`h-4 w-4 transition-all group-hover:translate-x-1 ${
//                       darkMode ? "text-white/40" : "text-slate-400"
//                     }`}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//       </div>
//     </main>
//   );
// }

"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUp,
  Blocks,
  Bot,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronRight,
  Factory,
  GitBranch,
  Hospital,
  LayoutDashboard,
  Moon,
  Network,
  ShoppingBag,
  Sparkles,
  Sun,
  Warehouse,
} from "lucide-react";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

const suggestions = [
  "I want an ERP for inventory and warehouse management",
  "Build an ERP for HR, payroll, and attendance",
  "Need a manufacturing ERP with production tracking",
  "Create a CRM + ERP for sales and customer management",
  "Build a hospital ERP with patient and billing modules",
  "Need a retail ERP with POS and stock sync",
];

const industries = [
  { title: "Manufacturing", icon: Factory },
  { title: "Retail", icon: ShoppingBag },
  { title: "Healthcare", icon: Hospital },
  { title: "Warehouse", icon: Warehouse },
  { title: "Corporate", icon: Building2 },
];

const onboardingQuestions = [
  "What type of business are you running?",
  "How many employees will use the ERP?",
  "Do you need inventory management?",
  "Do you want accounting and invoicing modules?",
  "Should the ERP support multi-branch operations?",
  "Do you need HR, payroll, and attendance tracking?",
  "Do you want CRM and customer management?",
  "Do you need analytics dashboards and reports?",
];

const modules = ["Inventory", "HRMS", "CRM", "Finance", "Analytics"];

type Role = "user" | "assistant" | "system";

type ChatMessage = {
  id: string;
  role: Role;
  content: string;
};

type BuilderStage = "idle" | "discovery" | "mapping" | "architecture" | "ready";

type ModuleCard = {
  name: string;
  active: boolean;
  readiness: number;
  description: string;
};

const defaultModuleCards: ModuleCard[] = [
  {
    name: "Inventory",
    active: false,
    readiness: 0,
    description: "Stock levels, inward-outward movement, reorder rules",
  },
  {
    name: "HRMS",
    active: false,
    readiness: 0,
    description: "Employees, attendance, payroll, roles and permissions",
  },
  {
    name: "CRM",
    active: false,
    readiness: 0,
    description: "Leads, customer records, sales pipeline, follow-ups",
  },
  {
    name: "Finance",
    active: false,
    readiness: 0,
    description: "Accounting, invoicing, GST-ready workflows, reconciliation",
  },
  {
    name: "Analytics",
    active: false,
    readiness: 0,
    description: "Dashboards, KPIs, business reporting, forecasting",
  },
  {
    name: "Operations",
    active: false,
    readiness: 0,
    description: "Production, procurement, internal workflows, approvals",
  },
];

function inferModulesFromText(input: string) {
  const text = input.toLowerCase();

  return {
    Inventory:
      text.includes("inventory") ||
      text.includes("warehouse") ||
      text.includes("stock") ||
      text.includes("pos"),
    HRMS:
      text.includes("hr") ||
      text.includes("payroll") ||
      text.includes("attendance") ||
      text.includes("employee"),
    CRM:
      text.includes("crm") ||
      text.includes("sales") ||
      text.includes("customer") ||
      text.includes("lead"),
    Finance:
      text.includes("finance") ||
      text.includes("accounting") ||
      text.includes("invoice") ||
      text.includes("billing"),
    Analytics:
      text.includes("analytics") ||
      text.includes("dashboard") ||
      text.includes("report"),
    Operations:
      text.includes("manufacturing") ||
      text.includes("production") ||
      text.includes("workflow") ||
      text.includes("branch"),
  };
}

function buildAcknowledgement(questionIndex: number, answer: string) {
  const trimmed = answer.trim();

  switch (questionIndex) {
    case 0:
      return `Got it — you're building for ${trimmed}. I'll shape the ERP around that business model.`;
    case 1:
      return `Understood. A user base of ${trimmed} helps define access control, roles, and scalability.`;
    case 2:
      return trimmed.toLowerCase().includes("yes")
        ? "Perfect — inventory flows will be included in the system map."
        : "Noted — I’ll keep inventory optional and avoid overloading the architecture.";
    case 3:
      return trimmed.toLowerCase().includes("yes")
        ? "Finance and invoicing are now being attached to the core ERP plan."
        : "Understood — finance can remain modular or integrate later.";
    case 4:
      return trimmed.toLowerCase().includes("yes")
        ? "Multi-branch support will be reflected in permissions, data sync, and reporting."
        : "Okay — I’ll optimize the architecture for a single operational entity.";
    case 5:
      return trimmed.toLowerCase().includes("yes")
        ? "HR, payroll, and attendance are now part of the build path."
        : "Noted — HRMS will stay outside the default architecture unless added later.";
    case 6:
      return trimmed.toLowerCase().includes("yes")
        ? "CRM is being connected to the customer and sales workflow layer."
        : "Okay — customer relationship workflows will remain minimal.";
    case 7:
      return trimmed.toLowerCase().includes("yes")
        ? "Analytics dashboards will be generated as a decision layer on top of operational modules."
        : "Understood — reporting can remain lightweight for the first version.";
    default:
      return "Captured. Updating the ERP structure.";
  }
}

function stageLabel(stage: BuilderStage) {
  switch (stage) {
    case "idle":
      return "Waiting to start";
    case "discovery":
      return "Discovering requirements";
    case "mapping":
      return "Mapping modules";
    case "architecture":
      return "Generating architecture";
    case "ready":
      return "Blueprint ready";
    default:
      return "In progress";
  }
}

export default function ERPOnboardingPage() {
  const [prompt, setPrompt] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState<"hero" | "builder">("hero");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [buildStage, setBuildStage] = useState<BuilderStage>("idle");
  const [progress, setProgress] = useState(0);
  const [moduleCards, setModuleCards] =
    useState<ModuleCard[]>(defaultModuleCards);
  const [activityLog, setActivityLog] = useState<string[]>([
    "System idle. Awaiting ERP brief.",
  ]);

  const shouldReduceMotion = useReducedMotion();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("erp-theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("erp-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [chatMessages, shouldReduceMotion]);

  const isDisabled = useMemo(() => !prompt.trim(), [prompt]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const handleSuggestionClick = (value: string) => {
    setPrompt(value);
  };

  const handleIndustrySelect = (industry: string) => {
    setPrompt(`Build an ERP for ${industry.toLowerCase()}`);
  };

  const handleModuleAdd = (tag: string) => {
    setPrompt((prev) =>
      prev ? `${prev}, ${tag} module` : `Need ${tag} module`,
    );
  };

  const pushMessage = (role: Role, content: string) => {
    setChatMessages((prev) => [
      ...prev,
      { id: `${role}-${Date.now()}-${Math.random()}`, role, content },
    ]);
  };

  const activateModules = (text: string, boost = 18) => {
    const inferred = inferModulesFromText(text);

    setModuleCards((prev) =>
      prev.map((module) => {
        const enabled = inferred[module.name as keyof typeof inferred];

        if (!enabled) return module;

        return {
          ...module,
          active: true,
          readiness: Math.min(100, Math.max(module.readiness, boost)),
        };
      }),
    );
  };

  const progressModulesFromAnswers = (text: string) => {
    const lowered = text.toLowerCase();

    setModuleCards((prev) =>
      prev.map((module) => {
        let readiness = module.readiness;
        let active = module.active;

        if (
          module.name === "Inventory" &&
          (lowered.includes("yes") ||
            lowered.includes("inventory") ||
            lowered.includes("warehouse") ||
            lowered.includes("stock"))
        ) {
          active = true;
          readiness = Math.max(readiness, 72);
        }

        if (
          module.name === "Finance" &&
          (lowered.includes("yes") ||
            lowered.includes("accounting") ||
            lowered.includes("invoice") ||
            lowered.includes("billing"))
        ) {
          active = true;
          readiness = Math.max(readiness, 72);
        }

        if (
          module.name === "HRMS" &&
          (lowered.includes("yes") ||
            lowered.includes("hr") ||
            lowered.includes("payroll") ||
            lowered.includes("attendance") ||
            lowered.includes("employee"))
        ) {
          active = true;
          readiness = Math.max(readiness, 72);
        }

        if (
          module.name === "CRM" &&
          (lowered.includes("yes") ||
            lowered.includes("crm") ||
            lowered.includes("sales") ||
            lowered.includes("customer"))
        ) {
          active = true;
          readiness = Math.max(readiness, 72);
        }

        if (
          module.name === "Analytics" &&
          (lowered.includes("yes") ||
            lowered.includes("analytics") ||
            lowered.includes("dashboard") ||
            lowered.includes("report"))
        ) {
          active = true;
          readiness = Math.max(readiness, 72);
        }

        if (
          module.name === "Operations" &&
          (lowered.includes("manufacturing") ||
            lowered.includes("production") ||
            lowered.includes("workflow") ||
            lowered.includes("branch"))
        ) {
          active = true;
          readiness = Math.max(readiness, 72);
        }

        return { ...module, active, readiness };
      }),
    );
  };

  const finalizeArchitecture = () => {
    setBuildStage("ready");
    setProgress(100);

    setModuleCards((prev) =>
      prev.map((module) => ({
        ...module,
        readiness: module.active ? 100 : module.readiness,
      })),
    );

    setActivityLog((prev) => [
      ...prev,
      "Architecture graph stabilized.",
      "Module relationships validated.",
      "ERP blueprint ready for generation.",
    ]);

    pushMessage(
      "assistant",
      "Your discovery flow is complete. I now have enough context to generate a structured ERP blueprint with modules, workflows, user roles, and reporting layers.",
    );
  };

  const startFlow = (initialPrompt: string) => {
    setMode("builder");
    setBuildStage("discovery");
    setProgress(12);

    pushMessage("user", initialPrompt);
    pushMessage(
      "assistant",
      "I’m starting your ERP discovery flow. I’ll ask a few focused questions and build the architecture in real time.",
    );
    pushMessage("assistant", onboardingQuestions[0]);

    activateModules(initialPrompt, 30);

    setQuestionIndex(0);

    setActivityLog((prev) => [
      ...prev,
      "Initial ERP brief received.",
      "Discovery engine activated.",
      "Core modules being inferred from prompt.",
    ]);
  };

  const handleSubmit = async () => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || isSubmitting) return;

    try {
      setIsSubmitting(true);

      if (mode === "hero") {
        startFlow(trimmedPrompt);
        setPrompt("");
        return;
      }

      pushMessage("user", trimmedPrompt);
      setAnswers((prev) => ({
        ...prev,
        [questionIndex]: trimmedPrompt,
      }));

      progressModulesFromAnswers(trimmedPrompt);

      const ack = buildAcknowledgement(questionIndex, trimmedPrompt);
      const nextIndex = questionIndex + 1;
      const nextProgress = Math.min(
        100,
        Math.round(((nextIndex + 1) / onboardingQuestions.length) * 88) + 12,
      );

      if (nextIndex <= 2) {
        setBuildStage("discovery");
      } else if (nextIndex <= 5) {
        setBuildStage("mapping");
      } else {
        setBuildStage("architecture");
      }

      setProgress(nextProgress);

      setActivityLog((prev) => [
        ...prev,
        `Answer captured for Q${questionIndex + 1}.`,
        ack,
      ]);

      setTimeout(
        () => {
          pushMessage("assistant", ack);

          if (nextIndex < onboardingQuestions.length) {
            pushMessage("assistant", onboardingQuestions[nextIndex]);
            setQuestionIndex(nextIndex);
          } else {
            finalizeArchitecture();
          }
        },
        shouldReduceMotion ? 0 : 500,
      );

      setPrompt("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const activeModules = moduleCards.filter((item) => item.active);
  const completedQuestions = Object.keys(answers).length;

  return (
    <LayoutGroup>
      <main
        className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
          darkMode ? "bg-[#060816] text-white" : "bg-[#f7f8fc] text-[#0f172a]"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute left-[-10%] top-[-5%] h-[450px] w-[450px] rounded-full blur-[140px] ${
              darkMode ? "bg-blue-500/35" : "bg-blue-300/35"
            }`}
          />
          <div
            className={`absolute right-[-10%] top-[5%] h-[420px] w-[420px] rounded-full blur-[140px] ${
              darkMode ? "bg-violet-500/30" : "bg-violet-300/35"
            }`}
          />
          <div
            className={`absolute bottom-[-15%] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-[160px] ${
              darkMode ? "bg-pink-500/30" : "bg-pink-300/35"
            }`}
          />
          <div
            className={`absolute bottom-[-20%] left-[15%] h-[350px] w-[350px] rounded-full blur-[120px] ${
              darkMode ? "bg-orange-500/20" : "bg-orange-200/35"
            }`}
          />
          <div
            className={`absolute bottom-[-15%] right-[15%] h-[350px] w-[350px] rounded-full blur-[120px] ${
              darkMode ? "bg-rose-500/20" : "bg-rose-300/35"
            }`}
          />
        </div>

        <div
          className={`absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:42px_42px] ${
            darkMode ? "opacity-10" : "opacity-40"
          }`}
        />

        <AnimatePresence>
          {mode === "builder" && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-x-0 top-0 z-30"
            >
              <div
                className={`mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-3xl border px-4 py-3 backdrop-blur-xl sm:px-6 ${
                  darkMode
                    ? "border-white/10 bg-white/[0.05]"
                    : "border-slate-200 bg-white/70 shadow-sm"
                }`}
              >
                <div className="pointer-events-auto flex items-center gap-3">
                  <div
                    className={`rounded-2xl border p-2 ${
                      darkMode
                        ? "border-white/10 bg-white/10"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <Blocks className="h-5 w-5" />
                  </div>
                  <div>
                    <p
                      className={`text-xs uppercase tracking-[0.18em] ${
                        darkMode ? "text-white/45" : "text-slate-500"
                      }`}
                    >
                      ERP Builder
                    </p>
                    <p className="text-sm font-medium">
                      {stageLabel(buildStage)}
                    </p>
                  </div>
                </div>

                <div className="pointer-events-auto flex items-center gap-3">
                  <div className="hidden sm:block">
                    <p
                      className={`text-xs ${
                        darkMode ? "text-white/50" : "text-slate-500"
                      }`}
                    >
                      Discovery progress
                    </p>
                    <div
                      className={`mt-1 h-2 w-40 overflow-hidden rounded-full ${
                        darkMode ? "bg-white/10" : "bg-slate-200"
                      }`}
                    >
                      <motion.div
                        className={`h-full rounded-full ${
                          darkMode ? "bg-white" : "bg-slate-900"
                        }`}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={toggleTheme}
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
                      darkMode
                        ? "border-white/10 bg-white/10 text-white"
                        : "border-slate-200 bg-white/80 text-slate-800 shadow-sm"
                    }`}
                  >
                    {darkMode ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`relative z-10 ${
            mode === "builder" ? "px-4 pb-32 pt-24 sm:px-6" : "px-6 py-12"
          }`}
        >
          <AnimatePresence mode="wait">
            {mode === "hero" ? (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.985 }}
                transition={{ duration: 0.45 }}
                className="flex min-h-screen flex-col items-center"
              >
                <div className="absolute right-6 top-6 z-50">
                  <button
                    onClick={toggleTheme}
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
                      darkMode
                        ? "border-white/10 bg-white/10 text-white"
                        : "border-slate-200 bg-white/80 text-slate-800 shadow-sm"
                    }`}
                  >
                    {darkMode ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="mx-auto mt-10 max-w-5xl text-center">
                  <div
                    className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm backdrop-blur-xl ${
                      darkMode
                        ? "border-white/10 bg-white/10 text-white/70"
                        : "border-slate-200 bg-white/70 text-slate-600 shadow-sm"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    AI ERP Builder
                  </div>

                  <h1
                    className={`text-4xl font-semibold tracking-tight sm:text-6xl ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Build Your ERP
                    <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                      {" "}
                      With AI
                    </span>
                  </h1>

                  <p
                    className={`mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg ${
                      darkMode ? "text-white/60" : "text-slate-500"
                    }`}
                  >
                    Create a fully customized ERP system for your business
                    operations, inventory, HR, finance, CRM, manufacturing, and
                    workflows by simply describing your requirements.
                  </p>
                </div>

                <div className="mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-3">
                  {industries.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.title}
                        onClick={() => handleIndustrySelect(item.title)}
                        className={`group flex items-center gap-3 rounded-2xl border px-5 py-3 text-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 ${
                          darkMode
                            ? "border-white/10 bg-white/[0.06] text-white/80 hover:bg-white/10"
                            : "border-slate-200 bg-white/80 text-slate-700 shadow-sm hover:border-slate-300 hover:shadow-md"
                        }`}
                      >
                        <div
                          className={`rounded-xl p-2 ${
                            darkMode ? "bg-white/10" : "bg-slate-100"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <span>{item.title}</span>
                        <ChevronRight className="h-4 w-4 opacity-40 transition-all group-hover:translate-x-0.5" />
                      </button>
                    );
                  })}
                </div>

                <div className="mt-12 w-full max-w-4xl">
                  <motion.div
                    layoutId="erp-composer"
                    className={`rounded-[32px] border p-4 backdrop-blur-2xl transition-all ${
                      darkMode
                        ? "border-white/10 bg-[#121212]/90 shadow-2xl"
                        : "border-slate-200 bg-white/80 shadow-[0_20px_80px_rgba(15,23,42,0.08)]"
                    }`}
                  >
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Describe the ERP system you want to build..."
                      className={`min-h-[170px] w-full resize-none bg-transparent px-3 py-3 text-lg focus:outline-none ${
                        darkMode
                          ? "text-white placeholder:text-white/35"
                          : "text-slate-800 placeholder:text-slate-400"
                      }`}
                    />

                    <div
                      className={`mt-5 flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between ${
                        darkMode ? "border-white/10" : "border-slate-200"
                      }`}
                    >
                      <div className="flex flex-wrap gap-2">
                        {modules.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleModuleAdd(tag)}
                            className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                              darkMode
                                ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleSubmit}
                        disabled={isDisabled || isSubmitting}
                        className={`flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 ${
                          darkMode
                            ? "bg-white text-black"
                            : "bg-slate-900 text-white"
                        }`}
                      >
                        {isSubmitting ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                          <ArrowUp className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </motion.div>

                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {suggestions.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleSuggestionClick(item)}
                        className={`rounded-full border px-4 py-2 text-sm transition-all ${
                          darkMode
                            ? "border-white/10 bg-white/[0.05] text-white/65 hover:bg-white/10 hover:text-white"
                            : "border-slate-200 bg-white/70 text-slate-600 shadow-sm hover:border-slate-300 hover:bg-white hover:text-slate-900"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-16 w-full max-w-4xl">
                  <div
                    className={`rounded-3xl border p-6 backdrop-blur-xl ${
                      darkMode
                        ? "border-white/10 bg-white/[0.04]"
                        : "border-slate-200 bg-white/75 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
                    }`}
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h2
                          className={`text-xl font-semibold ${
                            darkMode ? "text-white" : "text-slate-900"
                          }`}
                        >
                          ERP Discovery Questions
                        </h2>

                        <p
                          className={`mt-1 text-sm ${
                            darkMode ? "text-white/50" : "text-slate-500"
                          }`}
                        >
                          These questions help generate a better ERP
                          architecture.
                        </p>
                      </div>

                      <div
                        className={`rounded-full px-4 py-1 text-xs font-medium ${
                          darkMode
                            ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                            : "border border-emerald-200 bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        AI Assisted
                      </div>
                    </div>

                    <div className="space-y-3">
                      {onboardingQuestions.map((question, index) => (
                        <div
                          key={question}
                          className={`group flex items-center justify-between rounded-2xl border px-5 py-4 transition-all ${
                            darkMode
                              ? "border-white/8 bg-black/20 hover:border-white/15 hover:bg-white/[0.03]"
                              : "border-slate-200 bg-white/70 hover:border-slate-300 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                                darkMode
                                  ? "bg-white/10 text-white/70"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {index + 1}
                            </div>

                            <p
                              className={`text-sm font-medium ${
                                darkMode ? "text-white/80" : "text-slate-700"
                              }`}
                            >
                              {question}
                            </p>
                          </div>

                          <ChevronRight
                            className={`h-4 w-4 transition-all group-hover:translate-x-1 ${
                              darkMode ? "text-white/40" : "text-slate-400"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="builder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="mx-auto grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-[1.15fr_0.85fr]"
              >
                <section
                  className={`flex min-h-[72vh] flex-col overflow-hidden rounded-[32px] border backdrop-blur-xl ${
                    darkMode
                      ? "border-white/10 bg-white/[0.04]"
                      : "border-slate-200 bg-white/70 shadow-[0_20px_80px_rgba(15,23,42,0.08)]"
                  }`}
                >
                  <div
                    className={`border-b px-5 py-4 sm:px-6 ${
                      darkMode ? "border-white/10" : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className={`text-xs uppercase tracking-[0.18em] ${
                            darkMode ? "text-white/45" : "text-slate-500"
                          }`}
                        >
                          Guided setup
                        </p>
                        <h2 className="mt-1 text-xl font-semibold">
                          ERP discovery conversation
                        </h2>
                        <p
                          className={`mt-1 text-sm ${
                            darkMode ? "text-white/55" : "text-slate-500"
                          }`}
                        >
                          Answer the questions and the blueprint updates in real
                          time.
                        </p>
                      </div>

                      <div
                        className={`rounded-2xl border px-3 py-2 text-right ${
                          darkMode
                            ? "border-white/10 bg-white/[0.05]"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <p
                          className={`text-xs ${
                            darkMode ? "text-white/45" : "text-slate-500"
                          }`}
                        >
                          Completed
                        </p>
                        <p className="text-sm font-semibold">
                          {completedQuestions}/{onboardingQuestions.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
                    <AnimatePresence initial={false}>
                      {chatMessages.map((message, index) => {
                        const isUser = message.role === "user";
                        const isAssistant = message.role === "assistant";

                        return (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.02 }}
                            className={`flex ${
                              isUser ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[88%] rounded-[24px] px-4 py-3 sm:max-w-[80%] ${
                                isUser
                                  ? darkMode
                                    ? "bg-white text-black"
                                    : "bg-slate-900 text-white"
                                  : isAssistant
                                    ? darkMode
                                      ? "border border-white/10 bg-white/[0.05] text-white"
                                      : "border border-slate-200 bg-white text-slate-800"
                                    : darkMode
                                      ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-100"
                                      : "border border-emerald-200 bg-emerald-50 text-emerald-800"
                              }`}
                            >
                              {!isUser && (
                                <div className="mb-2 flex items-center gap-2 text-xs font-medium opacity-70">
                                  {isAssistant ? (
                                    <>
                                      <Bot className="h-3.5 w-3.5" />
                                      AI Architect
                                    </>
                                  ) : (
                                    <>
                                      <Sparkles className="h-3.5 w-3.5" />
                                      System
                                    </>
                                  )}
                                </div>
                              )}
                              <p className="text-sm leading-7 sm:text-[15px]">
                                {message.content}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>
                </section>

                <aside className="grid gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`overflow-hidden rounded-[32px] border backdrop-blur-xl ${
                      darkMode
                        ? "border-white/10 bg-white/[0.04]"
                        : "border-slate-200 bg-white/75 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
                    }`}
                  >
                    <div
                      className={`border-b px-5 py-4 ${
                        darkMode ? "border-white/10" : "border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p
                            className={`text-xs uppercase tracking-[0.18em] ${
                              darkMode ? "text-white/45" : "text-slate-500"
                            }`}
                          >
                            Live blueprint
                          </p>
                          <h3 className="mt-1 text-lg font-semibold">
                            ERP architecture map
                          </h3>
                        </div>
                        <div
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            buildStage === "ready"
                              ? darkMode
                                ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                                : "border border-emerald-200 bg-emerald-50 text-emerald-700"
                              : darkMode
                                ? "border border-white/10 bg-white/5 text-white/70"
                                : "border border-slate-200 bg-slate-50 text-slate-600"
                          }`}
                        >
                          {stageLabel(buildStage)}
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div
                        className={`rounded-[28px] border p-4 ${
                          darkMode
                            ? "border-white/10 bg-black/20"
                            : "border-slate-200 bg-slate-50/80"
                        }`}
                      >
                        <div className="relative mx-auto min-h-[260px]">
                          <motion.div
                            animate={
                              shouldReduceMotion
                                ? {}
                                : {
                                    boxShadow: darkMode
                                      ? [
                                          "0 0 0 rgba(255,255,255,0.0)",
                                          "0 0 0 8px rgba(255,255,255,0.04)",
                                          "0 0 0 rgba(255,255,255,0.0)",
                                        ]
                                      : [
                                          "0 0 0 rgba(15,23,42,0.0)",
                                          "0 0 0 8px rgba(15,23,42,0.05)",
                                          "0 0 0 rgba(15,23,42,0.0)",
                                        ],
                                  }
                            }
                            transition={{
                              duration: 2.6,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className={`absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center ${
                              darkMode
                                ? "border-white/10 bg-white/[0.08]"
                                : "border-slate-200 bg-white shadow-sm"
                            }`}
                          >
                            <Network className="h-5 w-5" />
                            <span className="mt-1 text-xs font-semibold">
                              ERP Core
                            </span>
                          </motion.div>

                          <svg
                            className="pointer-events-none absolute inset-0 h-full w-full"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                          >
                            {[
                              {
                                x1: 50,
                                y1: 50,
                                x2: 22,
                                y2: 18,
                                active: moduleCards[0].active,
                              },
                              {
                                x1: 50,
                                y1: 50,
                                x2: 78,
                                y2: 18,
                                active: moduleCards[1].active,
                              },
                              {
                                x1: 50,
                                y1: 50,
                                x2: 16,
                                y2: 72,
                                active: moduleCards[2].active,
                              },
                              {
                                x1: 50,
                                y1: 50,
                                x2: 84,
                                y2: 72,
                                active: moduleCards[3].active,
                              },
                              {
                                x1: 50,
                                y1: 50,
                                x2: 50,
                                y2: 88,
                                active: moduleCards[4].active,
                              },
                              {
                                x1: 50,
                                y1: 50,
                                x2: 50,
                                y2: 12,
                                active: moduleCards[5].active,
                              },
                            ].map((line, i) => (
                              <motion.line
                                key={i}
                                x1={line.x1}
                                y1={line.y1}
                                x2={line.x2}
                                y2={line.y2}
                                strokeWidth="1.2"
                                stroke={darkMode ? "white" : "#0f172a"}
                                strokeOpacity={line.active ? 0.5 : 0.14}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, delay: i * 0.08 }}
                                style={{
                                  filter: line.active
                                    ? "drop-shadow(0px 0px 6px rgba(255,255,255,0.18))"
                                    : "none",
                                }}
                              />
                            ))}
                          </svg>

                          {[
                            {
                              label: "Inventory",
                              top: "8%",
                              left: "6%",
                              active: moduleCards[0].active,
                              readiness: moduleCards[0].readiness,
                              icon: Warehouse,
                            },
                            {
                              label: "HRMS",
                              top: "8%",
                              right: "6%",
                              active: moduleCards[1].active,
                              readiness: moduleCards[1].readiness,
                              icon: Building2,
                            },
                            {
                              label: "CRM",
                              top: "64%",
                              left: "0%",
                              active: moduleCards[2].active,
                              readiness: moduleCards[2].readiness,
                              icon: BrainCircuit,
                            },
                            {
                              label: "Finance",
                              top: "64%",
                              right: "0%",
                              active: moduleCards[3].active,
                              readiness: moduleCards[3].readiness,
                              icon: GitBranch,
                            },
                            {
                              label: "Analytics",
                              bottom: "0%",
                              left: "50%",
                              active: moduleCards[4].active,
                              readiness: moduleCards[4].readiness,
                              icon: LayoutDashboard,
                              centerX: true,
                            },
                            {
                              label: "Operations",
                              top: "0%",
                              left: "50%",
                              active: moduleCards[5].active,
                              readiness: moduleCards[5].readiness,
                              icon: Factory,
                              centerX: true,
                            },
                          ].map((item) => {
                            const Icon = item.icon;

                            return (
                              <motion.div
                                key={item.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{
                                  opacity: item.active ? 1 : 0.72,
                                  scale: item.active ? 1 : 0.96,
                                  y:
                                    item.active && !shouldReduceMotion
                                      ? [0, -2, 0]
                                      : 0,
                                }}
                                transition={{
                                  duration: 0.45,
                                  y: {
                                    duration: 2.4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  },
                                }}
                                className={`absolute w-28 rounded-2xl border px-3 py-2 ${
                                  item.centerX ? "-translate-x-1/2" : ""
                                } ${
                                  item.active
                                    ? darkMode
                                      ? "border-white/15 bg-white/[0.09] text-white"
                                      : "border-slate-300 bg-white text-slate-900 shadow-sm"
                                    : darkMode
                                      ? "border-white/8 bg-white/[0.04] text-white/55"
                                      : "border-slate-200 bg-white/70 text-slate-500"
                                }`}
                                style={{
                                  top: item.top,
                                  left: item.left,
                                  right: item.right,
                                  bottom: item.bottom,
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <Icon className="h-3.5 w-3.5" />
                                  <span className="text-[11px] font-semibold">
                                    {item.label}
                                  </span>
                                </div>
                                <div
                                  className={`mt-2 h-1.5 overflow-hidden rounded-full ${
                                    darkMode ? "bg-white/10" : "bg-slate-200"
                                  }`}
                                >
                                  <motion.div
                                    className={`h-full rounded-full ${
                                      item.active
                                        ? darkMode
                                          ? "bg-white"
                                          : "bg-slate-900"
                                        : darkMode
                                          ? "bg-white/30"
                                          : "bg-slate-400"
                                    }`}
                                    animate={{ width: `${item.readiness}%` }}
                                    transition={{ duration: 0.6 }}
                                  />
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {moduleCards.map((module) => (
                          <div
                            key={module.name}
                            className={`rounded-2xl border p-3 ${
                              module.active
                                ? darkMode
                                  ? "border-white/10 bg-white/[0.06]"
                                  : "border-slate-200 bg-white"
                                : darkMode
                                  ? "border-white/6 bg-white/[0.03]"
                                  : "border-slate-200/80 bg-slate-50/70"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold">
                                  {module.name}
                                </p>
                                <p
                                  className={`mt-1 text-xs leading-5 ${
                                    darkMode
                                      ? "text-white/50"
                                      : "text-slate-500"
                                  }`}
                                >
                                  {module.description}
                                </p>
                              </div>

                              {module.active && (
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <div
                    className={`rounded-[32px] border p-5 backdrop-blur-xl ${
                      darkMode
                        ? "border-white/10 bg-white/[0.04]"
                        : "border-slate-200 bg-white/75 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`text-xs uppercase tracking-[0.18em] ${
                            darkMode ? "text-white/45" : "text-slate-500"
                          }`}
                        >
                          Build activity
                        </p>
                        <h3 className="mt-1 text-lg font-semibold">
                          System timeline
                        </h3>
                      </div>

                      <div
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          darkMode
                            ? "border border-white/10 bg-white/5 text-white/65"
                            : "border border-slate-200 bg-slate-50 text-slate-600"
                        }`}
                      >
                        {progress}%
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {activityLog.slice(-5).map((item, index) => (
                        <motion.div
                          key={`${item}-${index}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`flex items-start gap-3 rounded-2xl border px-3 py-3 ${
                            darkMode
                              ? "border-white/8 bg-black/20"
                              : "border-slate-200 bg-white/70"
                          }`}
                        >
                          <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                          <p
                            className={`text-sm leading-6 ${
                              darkMode ? "text-white/75" : "text-slate-700"
                            }`}
                          >
                            {item}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    <div
                      className={`mt-4 rounded-2xl border p-4 ${
                        darkMode
                          ? "border-white/8 bg-white/[0.03]"
                          : "border-slate-200 bg-slate-50/80"
                      }`}
                    >
                      <p
                        className={`text-xs uppercase tracking-[0.16em] ${
                          darkMode ? "text-white/45" : "text-slate-500"
                        }`}
                      >
                        Draft blueprint
                      </p>
                      <p className="mt-2 text-sm leading-7">
                        {activeModules.length > 0
                          ? `Core ERP includes ${activeModules
                              .map((m) => m.name)
                              .join(", ")}. The system is being shaped using ${
                              completedQuestions || 1
                            } captured business inputs.`
                          : "Modules will appear here as soon as the discovery flow starts."}
                      </p>
                    </div>
                  </div>
                </aside>

                <motion.div
                  layoutId="erp-composer"
                  className={`fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-7xl p-4 sm:p-6 ${
                    mode === "builder" ? "block" : "hidden"
                  }`}
                >
                  <div
                    className={`mx-auto rounded-[30px] border p-3 backdrop-blur-2xl ${
                      darkMode
                        ? "border-white/10 bg-[#121212]/90 shadow-2xl"
                        : "border-slate-200 bg-white/85 shadow-[0_20px_80px_rgba(15,23,42,0.14)]"
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                      <div className="min-w-0 flex-1">
                        <label className="sr-only" htmlFor="erp-builder-input">
                          Reply to ERP onboarding
                        </label>
                        <textarea
                          id="erp-builder-input"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder={
                            buildStage === "ready"
                              ? "Refine the blueprint, ask for modules, or request the final ERP plan..."
                              : "Answer the current question..."
                          }
                          className={`min-h-[72px] w-full resize-none bg-transparent px-3 py-3 text-[15px] focus:outline-none ${
                            darkMode
                              ? "text-white placeholder:text-white/35"
                              : "text-slate-800 placeholder:text-slate-400"
                          }`}
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <div className="flex flex-wrap gap-2">
                          {modules.slice(0, 3).map((tag) => (
                            <button
                              key={tag}
                              onClick={() => handleModuleAdd(tag)}
                              className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
                                darkMode
                                  ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                                  : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                              }`}
                            >
                              + {tag}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={handleSubmit}
                          disabled={isDisabled || isSubmitting}
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 ${
                            darkMode
                              ? "bg-white text-black"
                              : "bg-slate-900 text-white"
                          }`}
                        >
                          {isSubmitting ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          ) : (
                            <ArrowUp className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </LayoutGroup>
  );
}
