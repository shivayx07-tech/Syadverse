import { useState, useRef, useEffect } from "react";
import { FaGithub } from "react-icons/fa6";
import { ArrowUpRight, Sparkles, Filter, Layers } from "lucide-react";
import { projectsArchive, type ProjectItem } from "@/data/projectsArchive";
import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { ProjectCard } from "./ProjectCard";

type FilterType = "all" | "ai-ml" | "web-dev" | "data-sec";

interface FilterOption {
  id: FilterType;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { id: "all", label: "All Projects" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "web-dev", label: "Web Development" },
  { id: "data-sec", label: "Data & Security" },
];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nexestate = projectsArchive.find((p) => p.id === "nexestate") || projectsArchive[0];
  const financialEngine =
    projectsArchive.find((p) => p.id === "financial-engine") || projectsArchive[1];
  const cafeEcommerce =
    projectsArchive.find((p) => p.id === "cafe-ecommerce") || projectsArchive[2];
  const healthgrid = projectsArchive.find((p) => p.id === "healthgrid") || projectsArchive[3];
  const packpilot = projectsArchive.find((p) => p.id === "packpilot") || projectsArchive[4];

  const filteredProjects =
    activeFilter === "all"
      ? projectsArchive
      : projectsArchive.filter((p) => p.filterCategory === activeFilter);

  const scrollToProject = (id: string) => {
    if (activeFilter !== "all") {
      setActiveFilter("all");
    }
    setTimeout(() => {
      const element = document.getElementById(`project-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-6 py-24 md:py-36 overflow-hidden"
    >
      {/* Cinematic Atmospheric Cosmic Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/6 -translate-x-1/2 h-[500px] w-[85vw] max-w-6xl rounded-full opacity-15 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217, 186, 203, 0.4) 0%, rgba(93, 108, 140, 0.2) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* A. CINEMATIC SECTION INTRODUCTION */}
        <div
          className={`max-w-3xl transition-all duration-1000 ease-out ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Section label */}
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              04 / THE INNOVATION LAB
            </p>
          </div>

          {/* Main heading */}
          <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
            IDEAS INTO REALITY.
          </h2>

          {/* Supporting text */}
          <p className="mt-4 text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground">
            From intelligent systems to real-world products — engineering ideas into meaningful
            experiences.
          </p>

          {/* Small descriptor */}
          <p className="mt-2 font-mono text-xs sm:text-sm text-dim italic">
            A collection of experiments, intelligent systems, and digital products.
          </p>
        </div>

        {/* B. COMPACT FILTER BAR & SUBTLE PROJECT INDEX */}
        <div
          className={`mt-10 pt-6 border-t border-border/30 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all duration-1000 delay-100 ease-out ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* 10. Technology Filters */}
          <nav
            aria-label="Filter projects by technology category"
            className="flex flex-wrap items-center gap-1.5"
          >
            {FILTER_OPTIONS.map((opt) => {
              const isActive = activeFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setActiveFilter(opt.id)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-accent ${
                    isActive
                      ? "border border-accent/60 bg-accent/20 text-accent shadow-sm"
                      : "border border-border/40 bg-surface-2/40 text-dim hover:border-border hover:text-foreground"
                  }`}
                  aria-pressed={isActive}
                >
                  {opt.label}
                </button>
              );
            })}
          </nav>

          {/* 11. Subtle Project Navigation Index */}
          <div className="hidden lg:flex items-center gap-3 font-mono text-[11px] text-dim">
            <span className="text-dim/60 uppercase tracking-widest text-[10px]">Jump to:</span>
            {projectsArchive.map((p) => (
              <button
                key={p.id}
                onClick={() => scrollToProject(p.id)}
                className="transition-colors hover:text-accent focus:outline-none"
                title={`Scroll to ${p.title}`}
              >
                <span className="text-accent/80 font-semibold">{p.projectNumber}</span>{" "}
                <span className="uppercase">{p.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* C. EDITORIAL PROJECT SHOWCASE */}
        {activeFilter === "all" ? (
          <div className="mt-12 space-y-12">
            {/* 1. Featured Anchor: NexEstate */}
            <div
              id="project-nexestate"
              className={`transition-all duration-1000 delay-150 ease-out ${
                isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <FeaturedProjectCard project={nexestate} />
            </div>

            {/* Editorial Showcase Subhead */}
            <div className="flex items-center justify-between border-t border-border/30 pt-6">
              <span className="font-mono text-xs uppercase tracking-widest text-dim">
                EDITORIAL SHOWCASE // SYSTEMS 02 – 05
              </span>
              <span className="font-mono text-[11px] text-accent">4 Modular Archetypes</span>
            </div>

            {/* 2 & 3. Asymmetric Grid Row 1: Financial Intelligence (7 cols) + Café E-commerce (5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div id="project-financial-engine" className="lg:col-span-7 flex flex-col">
                <ProjectCard project={financialEngine} layoutVariant="wide" />
              </div>
              <div id="project-cafe-ecommerce" className="lg:col-span-5 flex flex-col">
                <ProjectCard project={cafeEcommerce} layoutVariant="compact" />
              </div>
            </div>

            {/* 4 & 5. Asymmetric Grid Row 2: HealthGrid (7 cols) + PackPilot (5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div id="project-healthgrid" className="lg:col-span-7 flex flex-col">
                <ProjectCard project={healthgrid} layoutVariant="wide" />
              </div>
              <div id="project-packpilot" className="lg:col-span-5 flex flex-col">
                <ProjectCard project={packpilot} layoutVariant="compact" />
              </div>
            </div>
          </div>
        ) : (
          /* Filtered View */
          <div className="mt-12">
            {filteredProjects.length === 0 ? (
              <div className="rounded-2xl border border-border/40 bg-surface/40 p-12 text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  NO ACTIVE MATCHES
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  No projects currently tagged under this category.
                </p>
                <button
                  onClick={() => setActiveFilter("all")}
                  className="mt-4 rounded-lg border border-accent/40 bg-accent/15 px-4 py-2 font-mono text-xs font-semibold text-accent hover:bg-accent/25"
                >
                  View All Projects
                </button>
              </div>
            ) : filteredProjects.length === 1 && filteredProjects[0].id === "nexestate" ? (
              <div id="project-nexestate">
                <FeaturedProjectCard project={nexestate} />
              </div>
            ) : filteredProjects.length === 1 && filteredProjects[0].id === "financial-engine" ? (
              <div id="project-financial-engine" className="max-w-3xl mx-auto">
                <ProjectCard project={financialEngine} layoutVariant="wide" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map((p) => (
                  <div key={p.id} id={`project-${p.id}`} className="flex flex-col">
                    <ProjectCard project={p} layoutVariant="compact" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* D. SECTION CLOSING CTA */}
        <div className="mt-20 sm:mt-24 rounded-2xl border border-border/30 bg-surface/30 p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Atmospheric background gradient */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              background: "radial-gradient(circle at center, var(--accent) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              CONTINUOUS EVOLUTION
            </p>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              THE NEXT IDEA IS ALREADY IN MOTION.
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Every system in the Innovation Lab represents an ongoing exploration of algorithmic
              architecture, intuitive design, and software craftsmanship.
            </p>

            {/* GitHub-profile CTA with authentic profile link */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://github.com/shivayx07-tech"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl border border-border/50 bg-surface-2/80 px-5 py-2.5 font-mono text-xs font-semibold text-foreground transition-all duration-300 hover:border-accent/60 hover:bg-surface-2 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Explore Shiva's Codebase on GitHub"
              >
                <FaGithub size={15} />
                <span>EXPLORE CODEBASE ON GITHUB</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <span className="font-mono text-[11px] text-dim">· @shivayx07-tech</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
