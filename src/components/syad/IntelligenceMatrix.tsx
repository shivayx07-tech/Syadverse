import { useState, useRef, useEffect, type ReactNode } from "react";
import { Cpu, Layers, Database } from "lucide-react";

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          r.current?.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (r.current) io.observe(r.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={r} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

interface TechCategory {
  id: string;
  num: string;
  title: string;
  description: string;
  accent: string;
  accentBg: string;
  icon: typeof Cpu;
  skills: string[];
  appliedIn?: string;
}

const PRIMARY_CATEGORIES: TechCategory[] = [
  {
    id: "ai",
    num: "01",
    title: "AI & Machine Learning",
    description:
      "Predictive statistical modeling, deep learning architectures, and explainable AI pipelines tailored for real-world decision intelligence.",
    accent: "#D9BACB", // Muted Lavender-Pink
    accentBg: "rgba(217, 186, 203, 0.1)",
    icon: Cpu,
    skills: [
      "Python",
      "Generative AI",
      "Prompt Engineering",
      "XGBoost",
      "Random Forest",
      "SHAP (Explainability)",
      "Deep Learning",
    ],
    appliedIn: "NexEstate · SentinelQ",
  },
  {
    id: "fullstack",
    num: "02",
    title: "Full-Stack Development",
    description:
      "Modern reactive web applications, low-latency API services, and typed component systems engineered with rigorous performance and design fidelity.",
    accent: "#5D6C8C", // Blue-Gray
    accentBg: "rgba(93, 108, 140, 0.14)",
    icon: Layers,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Flask",
      "C++",
      "Java",
      "C",
    ],
    appliedIn: "PackPilot · Jharkhand Tourist Platform · NexEstate",
  },
];

const SUPPORTING_CATEGORY: TechCategory = {
  id: "infrastructure",
  num: "03",
  title: "Data & Infrastructure",
  description:
    "Scalable datastores, relational querying, automated CI/CD deployment pipelines, and contract-first RESTful services.",
  accent: "#F2E0DC", // Warm Ivory
  accentBg: "rgba(242, 224, 220, 0.1)",
  icon: Database,
  skills: [
    "MongoDB",
    "SQL & PostgreSQL",
    "AWS Cloud",
    "Azure Services",
    "Git & GitHub",
    "CI/CD Pipelines",
    "RESTful APIs",
  ],
  appliedIn: "Cloud deployments · Version control · API integrations",
};

export function IntelligenceMatrix() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="skills" className="relative px-6 py-28 md:py-36 scroll-mt-28">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/3 top-1/3 h-96 w-96 rounded-full bg-surface/30 blur-3xl opacity-50" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* ================= SECTION HEADER ================= */}
        <Reveal className="mb-14 md:mb-18">
          <div className="syad-eyebrow-chip inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
              02 / TECHNICAL ARSENAL
            </span>
          </div>

          <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-foreground">
            WHAT I BUILD WITH.
          </h2>

          <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground font-sans">
            The tools and technologies behind my ideas.
          </p>
        </Reveal>

        {/* ================= BENTO GRID LAYOUT ================= */}
        <div className="space-y-6 lg:space-y-8">
          {/* Top Row: Two Primary Cards (AI & Machine Learning + Full-Stack Development) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {PRIMARY_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isHovered = hoveredCard === cat.id;

              return (
                <Reveal key={cat.id} className="h-full">
                  <div
                    onMouseEnter={() => setHoveredCard(cat.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`syad-arsenal-card group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-surface/40 p-7 md:p-9 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-surface/60 ${
                      isHovered ? "shadow-2xl" : "shadow-lg"
                    }`}
                    style={{
                      borderTopColor: isHovered ? cat.accent : undefined,
                      borderTopWidth: isHovered ? "2px" : "1px",
                    }}
                  >
                    <div>
                      {/* Top metadata row */}
                      <div className="flex items-center justify-between gap-4">
                        <span
                          className="font-mono text-xs font-bold tracking-widest uppercase rounded-full px-2.5 py-1"
                          style={{
                            backgroundColor: cat.accentBg,
                            color: cat.accent,
                          }}
                        >
                          {cat.num}
                        </span>

                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-muted-foreground transition-colors group-hover:border-white/20 group-hover:text-foreground"
                          style={{ color: isHovered ? cat.accent : undefined }}
                        >
                          <Icon size={18} />
                        </div>
                      </div>

                      {/* Category Title */}
                      <h3 className="mt-5 font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-foreground leading-tight">
                        {cat.title}
                      </h3>

                      {/* Concise Description */}
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-sans">
                        {cat.description}
                      </p>

                      <div className="my-6 border-t border-white/5" />

                      {/* Compact Technology Chips */}
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-foreground/90 transition-all duration-200 hover:border-cyan/30 hover:bg-white/[0.06] hover:text-foreground"
                          >
                            <span className="h-1 w-1 rounded-full bg-cyan/60" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Subtle Context Footer */}
                    {cat.appliedIn && (
                      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-muted-foreground/80">
                        <span className="uppercase tracking-wider">APPLIED IN:</span>
                        <span className="text-foreground/75 truncate max-w-[240px]">
                          {cat.appliedIn}
                        </span>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Bottom Row: Wider Supporting Card (Data & Infrastructure) */}
          <Reveal>
            <div
              onMouseEnter={() => setHoveredCard(SUPPORTING_CATEGORY.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`syad-arsenal-card group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/40 p-7 md:p-9 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-surface/60 ${
                hoveredCard === SUPPORTING_CATEGORY.id ? "shadow-2xl" : "shadow-lg"
              }`}
              style={{
                borderTopColor:
                  hoveredCard === SUPPORTING_CATEGORY.id ? SUPPORTING_CATEGORY.accent : undefined,
                borderTopWidth: hoveredCard === SUPPORTING_CATEGORY.id ? "2px" : "1px",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-6 lg:gap-10 items-start">
                {/* Left: Metadata & Overview */}
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className="font-mono text-xs font-bold tracking-widest uppercase rounded-full px-2.5 py-1"
                      style={{
                        backgroundColor: SUPPORTING_CATEGORY.accentBg,
                        color: SUPPORTING_CATEGORY.accent,
                      }}
                    >
                      {SUPPORTING_CATEGORY.num}
                    </span>

                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-muted-foreground transition-colors group-hover:border-white/20 group-hover:text-foreground"
                      style={{
                        color:
                          hoveredCard === SUPPORTING_CATEGORY.id
                            ? SUPPORTING_CATEGORY.accent
                            : undefined,
                      }}
                    >
                      <Database size={18} />
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-foreground leading-tight">
                    {SUPPORTING_CATEGORY.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-sans max-w-md">
                    {SUPPORTING_CATEGORY.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-muted-foreground/80">
                    <span className="uppercase tracking-wider">APPLIED IN:</span>
                    <span className="text-foreground/75 truncate max-w-[260px]">
                      {SUPPORTING_CATEGORY.appliedIn}
                    </span>
                  </div>
                </div>

                {/* Right: Technologies & Infrastructure Pillars */}
                <div className="lg:border-l lg:border-white/5 lg:pl-10 flex flex-col justify-center h-full">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70 mb-3 block">
                    FOUNDATIONAL TECHNOLOGIES
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {SUPPORTING_CATEGORY.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-xs text-foreground/90 transition-all duration-200 hover:border-cyan/30 hover:bg-white/[0.06] hover:text-foreground"
                      >
                        <span className="h-1 w-1 rounded-full bg-cyan/60" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export const TechnicalArsenal = IntelligenceMatrix;
