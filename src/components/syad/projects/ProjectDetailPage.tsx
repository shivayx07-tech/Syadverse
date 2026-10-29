import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Globe,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { ProjectItem } from "@/data/projectsArchive";
import { getAdjacentProjects } from "@/data/projectsArchive";
import { ProjectPreviewSurface } from "./ProjectPreviewSurface";

interface ProjectDetailPageProps {
  project: ProjectItem;
}

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const { prev, next } = getAdjacentProjects(project.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project.id]);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-foreground">
      {/* Ambient Celestial Glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-15"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(217, 186, 203, 0.25), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            hash="projects"
            className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-dim transition-colors hover:text-accent focus:outline-none"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            <span>RETURN TO INNOVATION LAB</span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs text-dim">
            <span className="rounded border border-border/40 bg-surface-2/60 px-2 py-0.5">
              {project.projectNumber}
            </span>
            <span className="hidden sm:inline">· {project.category}</span>
          </div>
        </div>
      </header>

      {/* Main Content Article */}
      <main className="relative mx-auto max-w-5xl px-6 py-12 md:py-20 space-y-16">
        {/* 1. HERO HEADER & OVERVIEW */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent font-semibold tracking-wider uppercase">
              {project.id === "healthgrid" ? "HEALTHCARE INTELLIGENCE / PROJECT" : project.category}
            </span>
            {project.status && (
              <span className="rounded-full border border-border/40 bg-surface-2 px-3 py-1 font-mono text-xs text-dim uppercase tracking-wider">
                {project.status}
              </span>
            )}
            {project.isRuleBased && (
              <span className="rounded-full border border-border/30 bg-[#090A0D]/70 px-3 py-1 font-mono text-xs text-dim">
                Deterministic Rule Engine
              </span>
            )}
          </div>

          <div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
              {project.title}
            </h1>
            <p className="mt-3 font-display text-xl sm:text-2xl text-accent font-semibold">
              {project.subtitle}
            </p>
          </div>

          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">
            {project.description}
          </p>

          {/* Action Links Bar: Primary Live Demo & Secondary GitHub Repository */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Primary Action: Live Demo / Prototype */}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-accent bg-accent/20 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent transition-all duration-300 hover:bg-accent hover:text-[#090A0D] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label={`Open live deployment for ${project.title} (opens in new tab)`}
              >
                <Globe size={14} />
                <span>{project.id === "healthgrid" ? "LIVE PROTOTYPE" : "LIVE DEMO"}</span>
                <ArrowUpRight size={13} />
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-2 rounded-xl border border-border/40 bg-surface-2/40 px-4 py-2 font-mono text-xs text-dim opacity-70 cursor-not-allowed"
                title="Live deployment URL scheduled for Phase 2 integration"
              >
                <Globe size={14} /> <span>Live Demo (Phase 2 Integration)</span>
              </span>
            )}

            {/* Secondary Action: GitHub Repository */}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-surface-2/80 px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider text-foreground transition-all duration-300 hover:border-accent/60 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label={`Open GitHub repository for ${project.title} (opens in new tab)`}
              >
                <FaGithub size={14} />
                <span>GITHUB REPOSITORY</span>
                <ArrowUpRight size={13} />
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-2 rounded-xl border border-border/40 bg-surface-2/40 px-4 py-2 font-mono text-xs text-dim opacity-70 cursor-not-allowed"
                title="Repository link scheduled for Phase 2 integration"
              >
                <FaGithub size={14} /> <span>Code Repository (Phase 2 Integration)</span>
              </span>
            )}
          </div>
        </section>

        {/* 2. VERIFIED METRICS (IF PRESENT, e.g. NEXESTATE) */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="rounded-2xl border border-border/40 bg-surface/60 p-6 sm:p-8">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6">
              VERIFIED BENCHMARKS & PERFORMANCE METRICS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-border/30 bg-[#090A0D]/70 p-4"
                >
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                    {m.value}
                  </p>
                  <p className="mt-1 font-mono text-xs font-semibold text-accent uppercase">
                    {m.label}
                  </p>
                  {m.detail && <p className="mt-1 text-xs text-dim leading-relaxed">{m.detail}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. VISUAL SHOWCASE & APPLICATION PREVIEW */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/30 pb-3">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              APPLICATION PREVIEW & VISUAL TELEMETRY
            </h2>
            <span className="font-mono text-[10px] text-dim">
              {project.screenshotUrl
                ? "AUTHENTIC APPLICATION PREVIEW"
                : "PHASE 1 SCREENSHOT CONTAINER"}
            </span>
          </div>
          <div className="rounded-2xl border border-border/40 bg-[#07080e] p-2 sm:p-4 shadow-2xl overflow-hidden flex items-center justify-center">
            <ProjectPreviewSurface
              project={project}
              className={`w-full ${
                project.id === "financial-engine"
                  ? "aspect-[1024/564]"
                  : project.id === "cafe-ecommerce"
                    ? "aspect-[1024/567]"
                    : project.id === "healthgrid"
                      ? "aspect-[1024/562]"
                      : project.id === "packpilot"
                        ? "aspect-[1024/502]"
                        : "aspect-[1024/682]"
              } max-h-[640px]`}
              isFeatured={true}
            />
          </div>
        </section>

        {/* 4. PROBLEM & SOLUTION DUALITY */}
        {(project.problem || project.solution) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.problem && (
              <div className="rounded-2xl border border-border/40 bg-surface/40 p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-rose-300">
                  <AlertCircle size={15} /> <span>The Core Challenge</span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {project.problemHeading || "Problem Context"}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="rounded-2xl border border-border/40 bg-surface/40 p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400">
                  <CheckCircle2 size={15} /> <span>Engineering Response</span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {project.solutionHeading || "Architectural Solution"}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{project.solution}</p>
              </div>
            )}
          </section>
        )}

        {/* 4B. ECOSYSTEM SUBSYSTEMS & MODULES (IF DEFINED, e.g. HEALTHGRID) */}
        {project.modules && project.modules.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-border/30 pb-3">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                ECOSYSTEM MODULES & ARCHITECTURAL SCOPE
              </h2>
              <span className="font-mono text-[10px] text-dim">
                PROTOTYPE VS PROPOSED CAPABILITIES
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.modules.map((m) => (
                <div
                  key={m.title}
                  className="flex flex-col justify-between rounded-2xl border border-border/40 bg-surface/30 p-5 space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider font-semibold ${
                          m.isImplemented
                            ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                            : "border border-amber-500/40 bg-amber-500/10 text-amber-300"
                        }`}
                      >
                        {m.badge || (m.isImplemented ? "PROTOTYPE" : "PROPOSED")}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-bold text-foreground">{m.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. ARCHITECTURE & WORKFLOW PIPELINE */}
        {project.architecture && (
          <section className="rounded-2xl border border-border/40 bg-surface/40 p-6 sm:p-8 space-y-6">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {project.architecture.title.toUpperCase()}
            </h2>
            <div className="space-y-3">
              {project.architecture.steps.map((step, idx) => (
                <div
                  key={step}
                  className="flex items-center gap-3 sm:gap-4 rounded-xl border border-border/30 bg-[#090A0D]/70 p-3.5 sm:p-4"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-accent/40 bg-accent/10 font-mono text-xs font-semibold text-accent">
                    0{idx + 1}
                  </span>
                  <span className="text-sm text-foreground/90 font-medium">{step}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. TECHNICAL CHALLENGES & KEY LEARNINGS */}
        {(project.challenges || project.learnings) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.challenges && (
              <div className="rounded-2xl border border-border/40 bg-surface/30 p-6 sm:p-8 space-y-4">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  TECHNICAL CHALLENGES
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.learnings && (
              <div className="rounded-2xl border border-border/40 bg-surface/30 p-6 sm:p-8 space-y-4">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  KEY ARCHITECTURAL LEARNINGS
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {project.learnings.map((l, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      <span className="leading-relaxed">{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* 7. TECHNOLOGY STACK TAGS */}
        <section className="rounded-2xl border border-border/40 bg-surface/30 p-6 sm:p-8 space-y-4">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            TECHNOLOGY STACK & RUNTIMES
          </h2>
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-border/40 bg-surface-2 px-3 py-1.5 text-foreground/90 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* 7B. SCREENSHOTS & EVIDENCE GALLERY (IF DEFINED, e.g. HEALTHGRID) */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-border/30 pb-3">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                INSIDE {project.title.toUpperCase()} — SCREENSHOTS & EVIDENCE
              </h2>
              <span className="font-mono text-[10px] text-dim">VERIFIED TELEMETRY</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl border border-border/40 bg-surface/30 p-3 sm:p-4 space-y-3 transition-all hover:border-accent/40 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border/30 bg-[#090A0D] flex items-center justify-center">
                    {item.url && !item.isPlaceholder ? (
                      <img
                        src={item.url}
                        alt={item.alt}
                        className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="p-6 text-center space-y-2">
                        <div className="mx-auto grid h-10 w-10 place-items-center rounded-lg border border-border/40 bg-surface-2/60 text-dim">
                          <Layers size={18} />
                        </div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                          {item.tag || "REPLACEABLE PLACEHOLDER"}
                        </p>
                        <p className="text-xs text-dim max-w-xs mx-auto">{item.alt}</p>
                      </div>
                    )}
                  </div>
                  <div className="px-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-mono text-xs font-semibold text-foreground">{item.alt}</p>
                      {item.tag && (
                        <span className="rounded border border-border/40 bg-surface-2 px-2 py-0.5 font-mono text-[9px] text-accent">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7C. INNOVATION & IMPACT FEATURE BLOCKS (IF DEFINED, e.g. HEALTHGRID) */}
        {project.impactPoints && project.impactPoints.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-border/30 pb-3">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                A MORE CONNECTED HEALTHCARE FUTURE — INNOVATION & IMPACT
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.impactPoints.map((pt) => (
                <div
                  key={pt.title}
                  className="rounded-xl border border-border/30 bg-[#090A0D]/70 p-5 space-y-2"
                >
                  <div className="flex items-center gap-2 text-accent">
                    <Sparkles size={14} />
                    <h3 className="font-display text-sm font-bold text-foreground">{pt.title}</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{pt.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7D. TEAM & INSTITUTIONAL ATTRIBUTION (IF DEFINED, e.g. HEALTHGRID) */}
        {project.teamName && (
          <section className="rounded-2xl border border-border/40 bg-surface/30 p-6 sm:p-8 space-y-4">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              TEAM & INSTITUTIONAL ATTRIBUTION
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div>
                <span className="font-mono text-[10px] uppercase text-dim tracking-wider">
                  TEAM
                </span>
                <p className="mt-1 font-display text-base font-bold text-foreground">
                  {project.teamName}
                </p>
              </div>
              {project.institution && (
                <div>
                  <span className="font-mono text-[10px] uppercase text-dim tracking-wider">
                    INSTITUTION
                  </span>
                  <p className="mt-1 font-display text-base font-bold text-foreground">
                    {project.institution}
                  </p>
                </div>
              )}
              {project.projectTrack && (
                <div>
                  <span className="font-mono text-[10px] uppercase text-dim tracking-wider">
                    PROJECT TRACK
                  </span>
                  <p className="mt-1 font-display text-base font-bold text-accent">
                    {project.projectTrack}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 7E. PROJECT LINKS & SUBTLE CLOSING CALL */}
        <section className="rounded-2xl border border-border/40 bg-surface/40 p-8 sm:p-10 text-center space-y-6">
          {project.closingLine && (
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold">
              {project.closingLine}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-accent bg-accent/20 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-accent transition-all duration-300 hover:bg-accent hover:text-[#090A0D] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <Globe size={14} />
                <span>{project.id === "healthgrid" ? "LIVE PROTOTYPE" : "LIVE DEMO"}</span>
                <ArrowUpRight size={13} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-surface-2/80 px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-foreground transition-all duration-300 hover:border-accent/60 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <FaGithub size={14} />
                <span>GITHUB REPOSITORY</span>
                <ArrowUpRight size={13} />
              </a>
            )}
            <Link
              to="/"
              hash="projects"
              className="inline-flex items-center gap-2 rounded-xl border border-border/40 bg-surface/60 px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-dim transition-all hover:text-foreground hover:border-border"
            >
              <ArrowLeft size={14} />
              <span>BACK TO PROJECTS</span>
            </Link>
          </div>
        </section>

        {/* 8. ADJACENT PROJECT NAVIGATION */}
        <nav
          aria-label="Adjacent project navigation"
          className="flex flex-col sm:flex-row items-stretch justify-between gap-4 pt-12 border-t border-border/30"
        >
          <Link
            to="/projects/$projectId"
            params={{ projectId: prev.id }}
            className="group flex flex-1 items-center gap-4 rounded-xl border border-border/40 bg-surface/30 p-5 transition-all hover:border-border hover:bg-surface/70"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface-2 text-foreground transition-transform group-hover:-translate-x-1">
              <ArrowLeft size={18} />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase text-dim">
                Previous Project // {prev.projectNumber}
              </p>
              <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                {prev.title}
              </p>
            </div>
          </Link>

          <Link
            to="/projects/$projectId"
            params={{ projectId: next.id }}
            className="group flex flex-1 items-center justify-between gap-4 rounded-xl border border-border/40 bg-surface/30 p-5 text-right transition-all hover:border-border hover:bg-surface/70"
          >
            <div>
              <p className="font-mono text-[10px] uppercase text-dim">
                Next Project // {next.projectNumber}
              </p>
              <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                {next.title}
              </p>
            </div>
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface-2 text-foreground transition-transform group-hover:translate-x-1">
              <ArrowRight size={18} />
            </div>
          </Link>
        </nav>
      </main>
    </div>
  );
}
