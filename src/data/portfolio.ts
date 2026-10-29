// Edit everything about the portfolio here. Empty strings = "not configured yet"
// and the UI shows a disabled / "Coming soon" state instead of a fake link.

export const profile = {
  name: "Shiva Yadav",
  brand: "Syadverse",
  role: "AI/ML Engineer & Full-Stack Developer",
  tagline:
    "I build intelligent systems and digital experiences that turn complex ideas into useful products.",
  status: "Exploring the intersection of AI, engineering, and creative technology.",
  github: "https://github.com/shivayx07-tech",
  linkedin: "https://www.linkedin.com/in/shivayx07/",
  email: "shivayx07@gmail.com",
  resume: "/Shiva_Yadav_Resume.pdf",
  portrait: "", // optional: image URL for the hero portrait
};

export const navigationItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export type AcademicRecord = {
  id: string;
  level: string;
  degree: string;
  institution: string;
  board?: string;
  duration: string;
  score?: string;
  scores?: { label: string; value: string }[];
  status: "current" | "completed";
  highlight?: string;
};

export const educationHistory: AcademicRecord[] = [
  {
    id: "schooling",
    level: "Secondary & Senior Secondary",
    degree: "Senior Secondary Education",
    institution: "Nurture International School, Kanpur",
    duration: "2022 – 2024",
    status: "completed",
    scores: [
      { label: "Class X", value: "90%" },
      { label: "Class XII", value: "75%" },
    ],
    highlight:
      "Rigorous academic grounding in mathematics, physical sciences, and computer science foundations.",
  },
  {
    id: "undergrad",
    level: "Undergraduate Degree",
    degree: "B.Tech — Computer Science & Engineering",
    institution: "UIET, Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur",
    duration: "2024 – 2028",
    score: "7.0 / 10 CGPA",
    status: "current",
    highlight:
      "Core focus: Artificial Intelligence, Deep Learning & Scalable Full-Stack Architectures.",
  },
];

// Preserving legacy education object for backward compatibility
export const education = {
  institution: "UIET, CSJMU, Kanpur",
  degree: "B.Tech in Computer Science and Engineering",
  duration: "2024 – 2028",
  cgpa: "7.0 / 10",
};

export const quickFacts = [
  { label: "Full Name", value: "Shiva Yadav", highlight: true },
  { label: "Current Education", value: "B.Tech, Computer Science & Engineering" },
  { label: "Institution", value: "UIET, CSJMU, Kanpur" },
  { label: "Graduation Year", value: "2028", badge: "Class of 2028" },
  { label: "Professional Focus", value: "AI/ML Engineering & Full-Stack Development" },
  {
    label: "GitHub",
    value: "github.com/shivayx07-tech",
    href: "https://github.com/shivayx07-tech",
    isExternal: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/shivayx07",
    href: "https://www.linkedin.com/in/shivayx07/",
    isExternal: true,
  },
  {
    label: "Email",
    value: "shivayx07@gmail.com",
    href: "mailto:shivayx07@gmail.com",
    isExternal: true,
  },
];

export type Experience = {
  id: string;
  org: string;
  title: string;
  dates?: string;
  context: string;
  points: string[];
  hue: "cyan" | "violet" | "magenta";
};
export const experienceItems: Experience[] = [
  {
    id: "iitk",
    org: "IIT Kanpur",
    title: "AI/ML Summer Research Intern",
    dates: "May – July 2026",
    context: "Research internship under Professor Nitin Saxena.",
    points: [
      "Research-oriented work in AI/ML within an academic research environment.",
      "Exposure to research methodology, experimentation and technical discussion.",
    ],
    hue: "cyan",
  },
  {
    id: "gsa",
    org: "Google",
    title: "Google Student Ambassador '26",
    context: "Student ambassador programme role (not Google employment).",
    points: [
      "Representing the programme on campus.",
      "Helping students discover technology learning opportunities.",
    ],
    hue: "violet",
  },
];

export type Skill = { name: string; desc: string; project?: string };
export const skillGroups: {
  id: string;
  title: string;
  hue: "cyan" | "violet" | "magenta";
  blurb: string;
  skills: Skill[];
}[] = [
  {
    id: "ai",
    title: "AI/ML Nebula",
    hue: "cyan",
    blurb: "Modelling, explainability and generative tooling.",
    skills: [
      {
        name: "Python",
        desc: "Primary language for data work, modelling and backend services.",
        project: "nexestate",
      },
      {
        name: "Generative AI",
        desc: "Building applications on top of large language and generative models.",
      },
      {
        name: "Prompt Engineering",
        desc: "Designing and iterating prompts for reliable model behaviour.",
      },
      {
        name: "XGBoost",
        desc: "Gradient-boosted trees for tabular prediction.",
        project: "nexestate",
      },
      { name: "Random Forest", desc: "Ensemble tree models for classification and regression." },
      {
        name: "SHAP",
        desc: "Explaining individual model predictions via feature attributions.",
        project: "nexestate",
      },
    ],
  },
  {
    id: "core",
    title: "Backend & Core CS",
    hue: "violet",
    blurb: "Services, data stores and foundational languages.",
    skills: [
      {
        name: "Flask",
        desc: "Lightweight Python web framework for model-serving APIs.",
        project: "nexestate",
      },
      { name: "Node.js", desc: "JavaScript runtime for APIs and tooling." },
      { name: "C++", desc: "Systems programming and data-structures practice." },
      { name: "Java", desc: "Object-oriented programming and coursework." },
      { name: "C", desc: "Low-level programming fundamentals." },
      { name: "MongoDB", desc: "Document database design and schema modelling." },
      { name: "SQL", desc: "Relational querying and data analysis." },
    ],
  },
  {
    id: "front",
    title: "Frontend & Cloud",
    hue: "magenta",
    blurb: "Interfaces, deployment and delivery workflows.",
    skills: [
      { name: "React", desc: "Component-driven interfaces." },
      { name: "Next.js", desc: "Full-stack React framework for production web apps." },
      { name: "Tailwind CSS", desc: "Utility-first styling with design tokens." },
      { name: "AWS", desc: "Cloud services and prompt-engineering coursework." },
      { name: "Azure", desc: "Azure AI services for intelligent applications." },
      { name: "Git", desc: "Version control and collaboration." },
      { name: "CI/CD", desc: "Automated build and deployment pipelines." },
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  title: string;
  context?: string;
  problem: string;
  solution: string;
  stack: string[];
  metrics?: string[];
  pipeline?: string[];
  code: string;
  demo: string;
  art: "estate" | "sentinel" | "tourism" | "pack";
};
export const projects: Project[] = [
  {
    id: "nexestate",
    name: "NexEstate / ClimaHome Predictor",
    title: "AI-Powered Real Estate Valuation Platform",
    problem: "Property prices are hard to estimate transparently.",
    solution:
      "A Flask service serving an XGBoost valuation model, with SHAP explanations showing which features drive each prediction.",
    stack: ["Flask", "XGBoost", "SHAP"],
    metrics: ["250K+ records", "Sub-45 ms latency"],
    pipeline: ["Property data", "Feature engineering", "XGBoost valuation", "SHAP explanation"],
    code: "",
    demo: "",
    art: "estate",
  },
  {
    id: "sentinelq",
    name: "SentinelQ",
    title: "Financial Intelligence Engine",
    context: "Presented at Microsoft Cognitive Chaos 2026",
    problem: "Fraudulent transactions and tampered audit logs are costly to catch.",
    solution:
      "AI fraud detection combined with SHA-256 hash-chained audit records for integrity verification (conceptual blockchain-style audit, not a production network).",
    stack: ["Machine Learning", "SHA-256", "Python"],
    pipeline: [
      "Transaction data",
      "Fraud analysis",
      "Alert / investigation",
      "Hash-verified audit record",
    ],
    code: "",
    demo: "",
    art: "sentinel",
  },
  {
    id: "jharkhand",
    name: "Jharkhand Tourist Platform",
    title: "Regional Tourism Discovery",
    context: "Smart India Hackathon 2025 — national-level participation",
    problem: "Travellers lack a single place to discover Jharkhand's destinations.",
    solution: "A tourism platform concept with destination discovery and map-oriented exploration.",
    stack: ["Web", "Maps"],
    code: "",
    demo: "",
    art: "tourism",
  },
  {
    id: "packpilot",
    name: "PackPilot",
    title: "Intelligent Packing Application",
    context: "Buildathon 2025",
    problem: "Trip preparation is repetitive and easy to get wrong.",
    solution: "A packing assistant that organises checklists by category and trip.",
    stack: ["Web"],
    code: "",
    demo: "",
    art: "pack",
  },
];

export type GalleryItem = {
  id: string;
  group: string;
  title: string;
  date?: string;
  caption: string;
  location?: string;
  image: string;
  link?: string;
};
// Replace `image: ""` with real photo URLs/imports. Empty = clearly marked placeholder.
export const galleryGroups = [
  { id: "ms", title: "Microsoft Cognitive Chaos 2026" },
  { id: "iitk", title: "IIT Kanpur Research & TRIPS 2025" },
  { id: "uiet", title: "UIET & Community Leadership" },
  { id: "hack", title: "Hackathons & Tech Events" },
  { id: "talks", title: "Thought Leadership" },
];
export const galleryItems: GalleryItem[] = [
  {
    id: "ms1",
    group: "ms",
    title: "SentinelQ presentation",
    date: "2026",
    location: "Microsoft office, Noida",
    caption: "Presenting SentinelQ as a team finalist.",
    image: "",
  },
  {
    id: "ms2",
    group: "ms",
    title: "Lanyard & event goodies",
    date: "2026",
    location: "Microsoft office, Noida",
    caption: "Finalist lanyard and event goodies.",
    image: "",
  },
  {
    id: "ik1",
    group: "iitk",
    title: "Rajeev Motwani Building",
    date: "2026",
    location: "IIT Kanpur",
    caption: "Research internship at IIT Kanpur.",
    image: "",
  },
  {
    id: "ik2",
    group: "iitk",
    title: "Certificate reception",
    location: "IIT Kanpur",
    caption: "Receiving the certificate from Deputy Registrar Mr. Bhupinder Singh Negi.",
    image: "",
  },
  {
    id: "ik3",
    group: "iitk",
    title: "IWM Regional Workshop",
    caption: "Regional workshop with Professor Pooja Singla.",
    image: "",
  },
  {
    id: "ik4",
    group: "iitk",
    title: "TRIPS Policy Summit",
    date: "2025",
    location: "Blue World Castle",
    caption: "TRIPS 2025 Policy Summit.",
    image: "",
  },
  {
    id: "u1",
    group: "uiet",
    title: "AI Workshop",
    date: "14 Sep 2026",
    location: "UIET, CSJMU",
    caption: "AI workshop with 100+ student participants, featuring CTO Rajeev Chandran.",
    image: "",
  },
  {
    id: "u2",
    group: "uiet",
    title: "Organising team",
    location: "UIET, CSJMU",
    caption: "With Suvi Gupta, Ayush Sharma and Vaibhav Gupta.",
    image: "",
  },
  {
    id: "u3",
    group: "uiet",
    title: "Women in AI World",
    location: "CSJMU",
    caption: "Women in AI World event at CSJMU.",
    image: "",
  },
  {
    id: "h1",
    group: "hack",
    title: "Spark Hack 2026",
    location: "Sanskriti University",
    caption: "Team Cookie_Byte advanced past the PPT round.",
    image: "",
  },
  {
    id: "h2",
    group: "hack",
    title: "AI Builder Workshop",
    location: "Paytm office",
    caption: "Paytm AI Builder Workshop.",
    image: "",
  },
  {
    id: "t1",
    group: "talks",
    title: "TEDxIITKanpur",
    caption: "Attended — takeaway: “Decoding the Default”.",
    image: "",
  },
  {
    id: "t2",
    group: "talks",
    title: "Google DevFest Lucknow 2025",
    date: "2025",
    location: "Lucknow",
    caption: "Attended Google DevFest Lucknow.",
    image: "",
  },
];

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  image: string;
  verify: string;
  file: string;
};
export const certificates: Certificate[] = [
  {
    id: "az",
    title: "Azure AI Apps Associate",
    issuer: "Microsoft",
    image: "",
    verify: "",
    file: "",
  },
  {
    id: "oci",
    title: "OCI 2025 AI Foundations Associate",
    issuer: "Oracle Cloud",
    image: "",
    verify: "",
    file: "",
  },
  { id: "gai", title: "Google AI Essentials", issuer: "Google", image: "", verify: "", file: "" },
  { id: "aws", title: "Prompt Engineering", issuer: "AWS", image: "", verify: "", file: "" },
  { id: "mdb", title: "Schema Design", issuer: "MongoDB", image: "", verify: "", file: "" },
  {
    id: "ibm",
    title: "Cybersecurity Fundamentals",
    issuer: "IBM",
    image: "",
    verify: "",
    file: "",
  },
];
