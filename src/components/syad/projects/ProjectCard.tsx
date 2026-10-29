import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Code2, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { ProjectItem } from "@/data/projectsArchive";
import { ProjectPreviewSurface } from "./ProjectPreviewSurface";

interface ProjectCardProps {
  project: ProjectItem;
  layoutVariant?: "wide" | "compact" | "horizontal-banner";
}

export function ProjectCard({ project, layoutVariant = "compact" }: ProjectCardProps) {
  // Horizontal Banner Layout for Project 04 (PackPilot)
  if (layoutVariant === "horizontal-banner") {
    return (
      <article className="h-full">
        <Link
          to="/projects/$projectId"
          params={{ projectId: project.id }}
          className="group relative flex flex-col lg:flex-row justify-between overflow-hidden rounded-3xl border border-border/40 bg-surface/60 transition-all duration-500 hover:border-accent/40 hover:bg-surface/90 hover:shadow-xl text-left block focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label={`Explore project: ${project.title} — ${project.subtitle}`}
        >
          {/* Left Side: Briefing */}
          <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-dim uppercase tracking-widest">
                  {project.projectNumber}
                </span>
                <span className="rounded-full border border-border/40 bg-surface-2/80 px-2.5 py-0.5 font-mono text-[10px] text-accent">
                  {project.category}
                </span>
                {project.isRuleBased && (
                  <span className="rounded-full border border-border/30 bg-[#090A0D]/60 px-2 py-0.5 font-mono text-[9px] text-dim">
                    Deterministic Rule Engine
                  </span>
                )}
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {project.title}
              </h3>

              <p className="font-medium text-xs sm:text-sm text-accent">{project.subtitle}</p>

              <p className="text-sm leading-relaxed text-muted-foreground max-w-xl">
                {project.description}
              </p>

              {/* Confirmed Tech */}
              <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-xs">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-border/40 bg-surface-2/60 px-2 py-0.5 text-foreground/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/30">
              <span
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-foreground"
                aria-hidden="true"
              >
                <span>EXPLORE ENGINE</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>

              <div
                className="flex items-center gap-2 font-mono text-[10px] text-dim/70"
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
                    className="inline-flex items-center gap-1 hover:text-accent"
                  >
                    <Code2 size={12} /> Repo
                  </a>
                ) : (
                  <span>Repo Reserved (Phase 2)</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Visual Preview */}
          <div className="lg:w-1/2 p-4 sm:p-6 flex items-center justify-center bg-[#07080e]/60">
            <ProjectPreviewSurface
              project={project}
              className="w-full min-h-[260px] sm:min-h-[290px]"
            />
          </div>
        </Link>
      </article>
    );
  }

  // Standard Editorial Card (Variants: "wide" for Financial Engine, "compact" for Café)
  return (
    <article className="h-full">
      <Link
        to="/projects/$projectId"
        params={{ projectId: project.id }}
        className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/40 bg-surface/60 transition-all duration-500 hover:border-accent/40 hover:bg-surface/90 hover:shadow-xl h-full text-left block focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label={`Explore project: ${project.title} — ${project.subtitle}`}
      >
        {/* Top Visual Preview Container */}
        <div className="p-4 sm:p-5 bg-[#07080e]/50">
          <ProjectPreviewSurface
            project={project}
            className={
              project.screenshotUrl
                ? `w-full ${
                    project.id === "cafe-ecommerce"
                      ? "aspect-[1024/567]"
                      : project.id === "healthgrid"
                        ? "aspect-[1024/562]"
                        : project.id === "packpilot"
                          ? "aspect-[1024/502]"
                          : "aspect-[1024/564]"
                  }`
                : "min-h-[260px] sm:min-h-[290px] w-full"
            }
          />
        </div>

        {/* Content Area */}
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
          <div className="space-y-3">
            {/* Header Metadata */}
            <div className="flex items-center justify-between gap-2 border-b border-border/20 pb-2.5">
              <span className="font-mono text-xs text-dim uppercase tracking-widest">
                {project.projectNumber}
              </span>
              <span className="rounded-full border border-border/40 bg-surface-2/80 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent">
                {project.category}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-accent">{project.subtitle}</p>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {project.description}
            </p>

            {/* Technologies Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded border border-border/40 bg-surface-2/60 px-2 py-0.5 text-foreground/90"
                >
                  {t}
                </span>
              ))}
              {project.status && (
                <span className="rounded border border-accent/30 bg-accent/10 px-2 py-0.5 text-accent text-[10px] font-semibold">
                  {project.status}
                </span>
              )}
            </div>
          </div>

          {/* Bottom Bar: Explore Indicator & External Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/20 pt-4">
            <span
              className="inline-flex items-center gap-1 font-mono text-xs font-semibold tracking-wider text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-foreground"
              aria-hidden="true"
            >
              <span>EXPLORE</span>
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>

            {/* External Links Isolated from Card Navigation */}
            <div
              className="flex flex-wrap items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {/* Primary Action: Live Demo */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-accent bg-accent/15 px-3 py-1.5 font-mono text-xs font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-[#090A0D] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label={`Live Demo for ${project.title} (opens in new tab)`}
                >
                  <Globe size={13} />
                  <span>Live Demo</span>
                  <ArrowUpRight size={12} className="opacity-80" />
                </a>
              )}

              {/* Secondary Action: GitHub Repository */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-surface-2/80 px-3 py-1.5 font-mono text-xs font-medium text-foreground transition-all duration-300 hover:border-accent/60 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label={`GitHub Repository for ${project.title} (opens in new tab)`}
                >
                  <FaGithub size={13} />
                  <span className="hidden sm:inline">GitHub Repository</span>
                  <span className="sm:hidden">GitHub</span>
                  <ArrowUpRight size={12} className="opacity-80" />
                </a>
              )}

              {!project.liveUrl && !project.githubUrl && (
                <span className="font-mono text-[10px] text-dim/70">Phase 1 Showcase</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
