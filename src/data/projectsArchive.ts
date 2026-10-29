import nexestateCover from "@/assets/nexestate-cover.jpg";
import financialEngineCover from "@/assets/financial-engine-cover.jpg";
import cafeEcommerceCover from "@/assets/cafe-ecommerce-cover.png";
import healthgridCover from "@/assets/healthgrid-cover.png";
import packpilotCover from "@/assets/packpilot-cover.jpg";

export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface ProjectModule {
  title: string;
  desc: string;
  badge?: string;
  isImplemented?: boolean;
}

export interface ProjectImpactPoint {
  title: string;
  desc: string;
}

export interface ProjectScreenshotItem {
  url: string;
  alt: string;
  caption: string;
  tag?: string;
  isPlaceholder?: boolean;
}

export interface ProjectItem {
  id: string;
  projectNumber: string;
  title: string;
  subtitle: string;
  category: string;
  filterCategory: "ai-ml" | "web-dev" | "data-sec" | "all";
  description: string;
  technologies: string[];
  subtleIndicator?: string;
  status?: string;
  isRuleBased?: boolean;
  metrics?: ProjectMetric[];
  problem?: string;
  problemHeading?: string;
  solution?: string;
  solutionHeading?: string;
  modules?: ProjectModule[];
  architecture?: {
    title: string;
    steps: string[];
  };
  challenges?: string[];
  learnings?: string[];
  impactPoints?: ProjectImpactPoint[];
  teamName?: string;
  institution?: string;
  projectTrack?: string;
  closingLine?: string;
  gallery?: ProjectScreenshotItem[];
  screenshotUrl?: string; // Reserved for authentic screenshots
  screenshotAlt?: string;
  screenshotWidth?: number;
  screenshotHeight?: number;
  githubUrl?: string; // Reserved for authentic repository link
  liveUrl?: string; // Reserved for authentic live demo link
  placeholderType: "nexestate" | "financial" | "cafe" | "packpilot" | "healthgrid";
  accentHue: "cyan" | "violet" | "magenta";
}

export const projectsArchive: ProjectItem[] = [
  {
    id: "nexestate",
    projectNumber: "01",
    title: "NexEstate",
    subtitle: "AI-Powered Real Estate Valuation Platform",
    category: "AI / MACHINE LEARNING",
    filterCategory: "ai-ml",
    description:
      "An AI-powered real estate valuation platform combining machine learning, explainable predictions, and sustainability-aware property insights.",
    technologies: ["Python", "Flask", "REST API", "XGBoost", "Random Forest"],
    subtleIndicator: "SHAP Feature Attribution Analysis",
    status: "PROTOTYPE ARCHITECTURE",
    metrics: [
      {
        value: "250K+",
        label: "Records Processed",
        detail: "Structured municipal, geospatial & structural property records",
      },
      {
        value: "R² = 0.912",
        label: "Validation Score",
        detail: "91.2% R² coefficient on out-of-fold cross-validation benchmarks",
      },
      {
        value: "< 45 ms",
        label: "Inference Latency",
        detail: "Optimized REST API endpoint response on standard server nodes",
      },
    ],
    problem:
      "Traditional property appraisal often relies on delayed comparable sales and opaque manual heuristics, resulting in valuation inconsistencies and friction for buyers, institutional analysts, and real estate advisors.",
    solution:
      "Engineered an automated valuation regression pipeline that ingests structural and spatial attributes. The ensemble architecture leverages XGBoost and Random Forest regression algorithms paired with SHAP TreeExplainer attribution to make individual predictive factors transparent.",
    architecture: {
      title: "Valuation Pipeline & Inference Architecture",
      steps: [
        "Raw municipal & geospatial property dataset ingestion",
        "Spatial feature normalization, encoding & outlier bounding",
        "XGBoost & Random Forest multi-model regression ensemble",
        "SHAP TreeExplainer feature attribution computation",
        "Flask RESTful inference service delivering sub-45ms appraisals",
      ],
    },
    challenges: [
      "Balancing high predictive fidelity across diverse urban property micro-markets while maintaining sub-45ms API response latency.",
      "Computing localized SHAP feature attribution weights on-demand without introducing computational bottlenecks during peak API queries.",
    ],
    learnings: [
      "Ensemble stacking of gradient boosting with bagged trees significantly reduces residual variance over individual regressor architectures.",
      "Explainability is paramount in financial and valuation models: providing clear feature impact percentages builds institutional user trust.",
    ],
    placeholderType: "nexestate",
    accentHue: "cyan",
    screenshotUrl: nexestateCover,
    screenshotAlt: "NexEstate AI-Powered Real Estate Intelligence project cover image",
    screenshotWidth: 1024,
    screenshotHeight: 682,
    githubUrl: undefined,
    liveUrl: undefined,
  },
  {
    id: "financial-engine",
    projectNumber: "02",
    title: "Financial Intelligence Engine",
    subtitle: "AI Fraud Detection & Blockchain Audit System",
    category: "FINANCIAL INTELLIGENCE",
    filterCategory: "data-sec",
    description:
      "A fraud-intelligence project combining behavioral analytics, anomaly detection, and blockchain-backed forensic audit concepts.",
    technologies: ["Python", "Machine Learning", "SHA-256 Hashing", "Forensic Auditing"],
    status: "ARCHITECTURAL PROTOTYPE",
    problem:
      "Financial monitoring systems often struggle with tamper vulnerability in centralized log repositories and latency in flagging anomalous behavioral deviations across streaming transaction corridors.",
    solution:
      "Architected an experimental forensic intelligence pipeline that subjects incoming transaction batches to machine learning anomaly scoring while immutably anchoring verification states into cryptographically linked SHA-256 hash chains.",
    architecture: {
      title: "Forensic Audit & Anomaly Detection Pipeline",
      steps: [
        "Streaming transactional attribute extraction & vectorization",
        "Behavioral anomaly classification using calibrated sigmoid thresholds",
        "Cryptographic SHA-256 hash-chaining of sequential verification states",
        "Tamper-evident forensic audit verification & reporting interface",
      ],
    },
    challenges: [
      "Designing an audit verification flow that preserves transactional privacy while proving state integrity mathematically.",
      "Tuning anomaly detection threshold sensitivity to minimize false positives in high-frequency simulated transaction streams.",
    ],
    learnings: [
      "Pairing statistical deviation scoring with hash-chained state trees enables decentralized verification without third-party audit dependencies.",
      "Behavioral feature engineering across temporal windows yields significantly better anomaly separation than single-point analysis.",
    ],
    placeholderType: "financial",
    accentHue: "violet",
    screenshotUrl: financialEngineCover,
    screenshotAlt:
      "Financial Intelligence Engine — FraudGuard AI Detection Platform dashboard and real-time fraud monitoring",
    screenshotWidth: 1024,
    screenshotHeight: 564,
    githubUrl: "https://github.com/shivayx07-tech/fraud-detection-platform",
    liveUrl: "https://fraud-detection-bycookiebyte.vercel.app",
  },
  {
    id: "cafe-ecommerce",
    projectNumber: "03",
    title: "Café E-commerce Website",
    subtitle: "Frontend Shopping & Artisanal Menu Experience",
    category: "WEB DEVELOPMENT",
    filterCategory: "web-dev",
    description:
      "A frontend-focused café shopping experience featuring product presentation, intuitive browsing, and a polished storefront interface.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "UI Architecture"],
    status: "FRONTEND COMPLETE",
    problem:
      "Digital storefronts for artisanal culinary brands often compromise between rich editorial storytelling and frictionless, responsive catalog browsing.",
    solution:
      "Designed and implemented a focused frontend shopping interface with curated product presentation cards, interactive menu browsing, responsive micro-interactions, and a tactile shopping bag preview.",
    architecture: {
      title: "Frontend Component Hierarchy & State Architecture",
      steps: [
        "Artisanal product catalog schema & category filtering logic",
        "Interactive single-origin roast showcase with tasting-note typography",
        "Client-side cart drawer state with instant price and quantity synthesis",
        "Responsive multi-breakpoint layout with fluid touch interactions",
      ],
    },
    challenges: [
      "Crafting bespoke typography and warm cosmic palette transitions that elevate brand prestige without cluttering UI hierarchy.",
      "Ensuring fluid touch gestures and responsive performance across mobile and tablet viewports.",
    ],
    learnings: [
      "Micro-animations and deliberate typographic contrast create an engaging editorial atmosphere that mirrors artisanal craftsmanship.",
      "Clear component boundaries between display cards and interactive bag state simplify future backend API integration.",
    ],
    placeholderType: "cafe",
    accentHue: "magenta",
    screenshotUrl: cafeEcommerceCover,
    screenshotAlt: "Café E-commerce Website cover screenshot",
    screenshotWidth: 1024,
    screenshotHeight: 567,
    githubUrl: "https://github.com/shivayx07-tech/THE-CLASSIC-CRUSH",
    liveUrl: "https://the-classic-crush-brown.vercel.app",
  },
  {
    id: "healthgrid",
    projectNumber: "04",
    title: "HealthGrid",
    subtitle:
      "Connecting Traditional Medicine, Hospital Resources, and Global Health Intelligence.",
    category: "AI & HEALTHCARE INNOVATION",
    filterCategory: "ai-ml",
    description:
      "An AI-powered healthcare platform concept designed to bridge traditional and modern medical systems, improve hospital resource coordination, and make health information more accessible.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Healthcare Interoperability",
      "AI/ML Architecture",
    ],
    status: "WORKING PROTOTYPE",
    teamName: "Alpha Debuggers",
    institution: "CSJM University, Kanpur, Uttar Pradesh, India",
    projectTrack: "SDG 3 (Good Health & Well-being) + SDG 4 (Quality Education)",
    problemHeading: "Bridging the Healthcare Data Divide",
    problem:
      "Traditional medical systems and modern clinical frameworks can operate in disconnected ways. Fragmented health records and limited hospital resource visibility can make coordination more difficult for patients, clinicians, and healthcare authorities.",
    solutionHeading: "One Connected Healthcare Ecosystem",
    solution:
      "HealthGrid proposes a unified digital healthcare ecosystem that connects traditional medical coding, portable patient records, AI-assisted health information, and hospital resource coordination.",
    modules: [
      {
        title: "Dual Medical Coding Engine",
        desc: "Proposed mapping of traditional NAMASTE diagnoses to the international ICD-11 framework for diagnostic semantic alignment.",
        badge: "PROPOSED ARCHITECTURE",
        isImplemented: false,
      },
      {
        title: "Portable Digital Health Records",
        desc: "Universal patient records architecture designed around ABHA linkage and FHIR-compatible interoperability.",
        badge: "ARCHITECTURE SPEC",
        isImplemented: false,
      },
      {
        title: "AI-Driven Health Assistant",
        desc: "A multilingual conversational health guidance assistant concept leveraging LLMs and retrieval-augmented generation (RAG).",
        badge: "PROTOTYPE INTERFACE",
        isImplemented: true,
      },
      {
        title: "Hospital Bed and Resource Dashboard",
        desc: "Operational interface providing hospital resource visibility, occupancy telemetry, and bed-availability coordination.",
        badge: "WORKING PROTOTYPE",
        isImplemented: true,
      },
      {
        title: "Unified Hospital Discovery",
        desc: "Geospatial mapping and discovery enabling patients to locate care facilities by proximity, service tier, and capacity.",
        badge: "WORKING PROTOTYPE",
        isImplemented: true,
      },
      {
        title: "Disease Surveillance and Alerts",
        desc: "Proposed anomaly-based trend monitoring and location-relevant public health advisory broadcasts.",
        badge: "PLANNED CAPABILITY",
        isImplemented: false,
      },
    ],
    architecture: {
      title: "Designed for Healthcare Interoperability",
      steps: [
        "Citizen & Hospital Gateway: Responsive authentication, appointment dispatch & triage telemetry",
        "Clinical Coding Interop Layer: Traditional AYUSH/NAMASTE to WHO ICD-11 classification mappings",
        "Encrypted Health Information Exchange: ABHA-linked citizen identity & FHIR document portability",
        "Resource Optimization Engine: Real-time bed availability tracking & emergency care discovery",
      ],
    },
    challenges: [
      "Bridging the semantic taxonomy gap between traditional holistic diagnostic principles and standardized ICD-11 alphanumeric disease entities without losing clinical context.",
      "Designing multi-tenant hospital dashboard interfaces that remain performant and legible under urgent real-time clinical workflows.",
    ],
    learnings: [
      "Clear separation between patient-facing discovery portals and clinical bed-management dashboards prevents cognitive overload during emergency routing.",
      "Modular interoperability adapters allow legacy hospital information systems to integrate incrementally without costly infrastructure overhauls.",
    ],
    impactPoints: [
      {
        title: "Medical Terminology Interoperability",
        desc: "Cross-system translation between indigenous medicine (NAMASTE) and modern clinical standards (ICD-11).",
      },
      {
        title: "Portable Health Information",
        desc: "Citizen-controlled, encrypted medical history that travels frictionlessly across clinical transitions.",
      },
      {
        title: "AI-Assisted Health Guidance",
        desc: "Multilingual guidance helping patients navigate symptom context and triage before clinical consultation.",
      },
      {
        title: "Hospital Resource Coordination",
        desc: "Dynamic bed allocation and resource transparency reducing hospital transfer delays during acute care surges.",
      },
      {
        title: "Geospatial Healthcare Discovery",
        desc: "Proximity-aware facility lookup connecting citizens directly to available emergency infrastructure.",
      },
      {
        title: "Public Health Monitoring",
        desc: "Aggregated, anonymized anomaly detection to flag localized health trends and potential community outbreaks.",
      },
    ],
    closingLine: "BETTER CONNECTIONS. BETTER COORDINATION. BETTER HEALTHCARE.",
    placeholderType: "healthgrid",
    accentHue: "cyan",
    screenshotUrl: healthgridCover,
    screenshotAlt: "Kanpur Metro Hospital powered by HealthGrid platform preview",
    screenshotWidth: 1024,
    screenshotHeight: 562,
    githubUrl: "https://github.com/shivayx07-tech/Healthgrid",
    liveUrl: "https://alphadebuggers.vercel.app",
    gallery: [
      {
        url: healthgridCover,
        alt: "Kanpur Metro Hospital — HealthGrid Portal Welcome Interface",
        caption: "Kanpur Metro Hospital portal landing view — 'One bridge. A healthier tomorrow.'",
        tag: "AUTHENTIC PROTOTYPE VIEW",
      },
      {
        url: "",
        alt: "Hospital Bed and Resource Dashboard",
        caption:
          "Operational bed-availability coordination & facility telemetry dashboard (Asset pending upload)",
        tag: "GALLERY PLACEHOLDER",
        isPlaceholder: true,
      },
      {
        url: "",
        alt: "Dual Medical Coding NAMASTE-to-ICD11 Engine",
        caption:
          "Interoperability translation interface mapping traditional medicine to global codes (Asset pending upload)",
        tag: "GALLERY PLACEHOLDER",
        isPlaceholder: true,
      },
    ],
  },
  {
    id: "packpilot",
    projectNumber: "05",
    title: "PackPilot",
    subtitle: "Intelligent Packing-List Application",
    category: "BUILDATHON PROJECT",
    filterCategory: "all",
    description:
      "A rule-based packing-list application developed through the Dreamflow × FlutterFlow Buildathon 2025.",
    technologies: ["FlutterFlow", "Dart", "Rule Engine", "UI Architecture"],
    status: "BUILDATHON SUBMISSION",
    isRuleBased: true,
    problem:
      "Travelers often overlook critical regional travel items, overpack unnecessary luggage, or miscalculate weight limits due to generic, static checklists.",
    solution:
      "Synthesized a dynamic packing-list application that evaluates destination climate parameters, travel duration, and transit weight constraints to generate structured, category-sorted packing checklists.",
    architecture: {
      title: "Rule-Based Packing Synthesis Architecture",
      steps: [
        "Destination climate & journey duration parameter intake",
        "Deterministic rule matrix & activity checklist category mapper",
        "Dynamic checklist synthesis with category tagging",
        "Interactive luggage weight balance & capacity visualization",
      ],
    },
    challenges: [
      "Structuring comprehensive luggage category trees that adapt accurately to extreme climate edge cases.",
      "Rapid prototyping and iterative interface polish within the competitive constraints of the Buildathon 2025 sprint.",
    ],
    learnings: [
      "Deterministic rule engines provide predictable, explainable user recommendations for constraint-bounded workflows like travel packing.",
      "Visual weight distribution feedback encourages proactive luggage optimization before travel departure.",
    ],
    placeholderType: "packpilot",
    accentHue: "cyan",
    screenshotUrl: packpilotCover,
    screenshotAlt: "PackPilot — Intelligent Packing-List Application cover screenshot",
    screenshotWidth: 1024,
    screenshotHeight: 502,
    githubUrl: undefined,
    liveUrl: undefined,
  },
];

export function getAllProjects(): ProjectItem[] {
  return projectsArchive;
}

export function getProjectById(id: string): ProjectItem | undefined {
  return projectsArchive.find((p) => p.id === id);
}

export function getAdjacentProjects(currentId: string): {
  prev: ProjectItem;
  next: ProjectItem;
} {
  const index = projectsArchive.findIndex((p) => p.id === currentId);
  const total = projectsArchive.length;
  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;

  return {
    prev: projectsArchive[prevIndex],
    next: projectsArchive[nextIndex],
  };
}
