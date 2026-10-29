import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Code2, Globe, Sparkles } from "lucide-react";
import type { ProjectItem } from "@/data/projectsArchive";
import { ProjectPreviewSurface } from "./ProjectPreviewSurface";

interface FeaturedProjectCardProps {
  project: ProjectItem;
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <article className="h-full">
      <Link
        to="/projects/$projectId"
        params={{ projectId: project.id }}
        className="group relative block overflow-hidden rounded-3xl border border-border/40 bg-surface/60 transition-all duration-500 hover:border-accent/40 hover:bg-surface/90 hover:shadow-2xl text-left focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label={`Explore featured project: ${project.title} — ${project.subtitle}`}
      >
        {/* Background celestial ambient illumination */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full opacity-15 blur-3xl transition-opacity duration-700 group-hover:opacity-25"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 md:p-10 items-center">
          {/* LEFT COLUMN: Project Briefing & Metadata (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Featured Anchor Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
                  <Sparkles size={11} /> FEATURED PROJECT
                </span>
                <span className="rounded-full border border-border/40 bg-surface-2/80 px-2.5 py-1 font-mono text-[10px] font-medium text-dim">
                  {project.category}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <p className="font-mono text-xs text-dim uppercase tracking-widest">
                  {project.projectNumber}
                </p>
                <h3 className="mt-1 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base font-medium text-accent">
                  {project.subtitle}
                </p>
              </div>

              {/* Concise Description */}
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {/* Subtle SHAP Indicator */}
              {project.subtleIndicator && (
                <div className="inline-flex items-center gap-2 rounded-lg border border-border/30 bg-[#090A0D]/60 px-3 py-1.5 font-mono text-xs text-dim">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>Feature Attribution:</span>
                  <span className="text-foreground font-medium">{project.subtleIndicator}</span>
                </div>
              )}

              {/* Confirmed Technologies Chips */}
              <div className="pt-2">
                <p className="font-mono text-[10px] uppercase tracking-wider text-dim mb-2">
                  CORE TECHNICAL PIPELINE
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border/40 bg-surface-2/60 px-2.5 py-1 text-foreground/90 transition-colors group-hover:border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA & Reserved Space for Phase 2 Links */}
            <div className="pt-4 border-t border-border/30 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                {/* Primary Explore CTA (styled as visual indicator within card Link) */}
                <span
                  className="inline-flex items-center gap-2 rounded-xl border border-accent bg-accent/15 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-[#090A0D] group-hover:shadow-lg"
                  aria-hidden="true"
                >
                  <span>EXPLORE PROJECT</span>
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>

                {/* Reserved Link Slots for Phase 2 */}
                <div
                  className="flex items-center gap-2 font-mono text-[11px] text-dim"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-border/50 bg-surface-2/70 px-3 py-2 text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      <Code2 size={13} />
                      <span>Source</span>
                    </a>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1 rounded-lg border border-border/40 bg-surface-2/40 px-3 py-2 opacity-60 cursor-not-allowed"
                      title="GitHub repository link will be connected in Phase 2"
                    >
                      <Code2 size={13} />
                      <span>Code (Phase 2)</span>
                    </span>
                  )}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-border/50 bg-surface-2/70 px-3 py-2 text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      <Globe size={13} />
                      <span>Live Demo</span>
                    </a>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1 rounded-lg border border-border/40 bg-surface-2/40 px-3 py-2 opacity-60 cursor-not-allowed"
                      title="Live platform deployment will be connected in Phase 2"
                    >
                      <Globe size={13} />
                      <span>Live Demo (Phase 2)</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Large Visual Preview Surface (7 cols on desktop) */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div className="w-full relative transform transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-2xl">
              <ProjectPreviewSurface
                project={project}
                isFeatured={true}
                className="w-full aspect-[1024/682]"
              />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
