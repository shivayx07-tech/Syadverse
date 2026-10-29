import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, Image as ImageIcon } from "lucide-react";
import type { ExperienceMission } from "@/data/experienceArchive";
import { ExperienceCoverGraphic } from "./ExperienceCoverGraphic";

interface ExperienceCardProps {
  mission: ExperienceMission;
}

export function ExperienceCard({ mission }: ExperienceCardProps) {
  const hueColor =
    mission.accentHue === "cyan"
      ? "var(--cyan)"
      : mission.accentHue === "magenta"
        ? "var(--magenta)"
        : "var(--violet)";

  const dateDisplay = mission.date || mission.duration;
  const hasEvidence = mission.evidence.length > 0;
  const hasGallery = mission.gallery.length > 0;

  return (
    <article className="h-full">
      <Link
        to="/experience/$experienceId"
        params={{ experienceId: mission.slug }}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-surface/60 transition-all duration-500 hover:-translate-y-1 hover:border-border hover:bg-surface/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer block text-left"
        aria-label={`Explore experience: ${mission.title} at ${mission.organization}`}
      >
        {/* Cover Photograph / Intentional Visual Graphic */}
        <div className="relative overflow-hidden">
          <ExperienceCoverGraphic mission={mission} variant="card" />

          {/* Category Pill floating on cover (rendered only when overlays over cover are permitted) */}
          {!mission.hideCoverOverlays && (
            <div className="absolute bottom-3 left-3 z-10 flex flex-wrap items-center gap-1.5">
              <span
                className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium backdrop-blur-md"
                style={{
                  borderColor: `color-mix(in oklab, ${hueColor} 40%, transparent)`,
                  backgroundColor: "color-mix(in oklab, var(--background) 85%, transparent)",
                  color: hueColor,
                }}
              >
                {mission.category}
              </span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            {/* Header Row: Organization, Badges & Date */}
            <div className="flex items-center justify-between gap-2 border-b border-border/20 pb-2.5">
              <div className="flex items-center gap-2 truncate">
                {mission.hideCoverOverlays && (
                  <span className="shrink-0 rounded border border-border/40 bg-surface-2 px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-foreground">
                    {mission.missionNumber}
                  </span>
                )}
                <span className="font-mono text-xs font-semibold text-foreground tracking-wide truncate">
                  {mission.organization}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {mission.hideCoverOverlays && (
                  <span
                    className="rounded-full border px-2 py-0.5 font-mono text-[9px] font-medium"
                    style={{
                      borderColor: `color-mix(in oklab, ${hueColor} 40%, transparent)`,
                      backgroundColor: "color-mix(in oklab, var(--background) 85%, transparent)",
                      color: hueColor,
                    }}
                  >
                    {mission.category}
                  </span>
                )}
                {dateDisplay && (
                  <span className="shrink-0 font-mono text-[11px] text-dim">{dateDisplay}</span>
                )}
              </div>
            </div>

            {/* Title & Role */}
            <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {mission.title}
            </h3>

            {mission.role && mission.role !== mission.title && (
              <p className="mt-1 font-mono text-xs text-accent">{mission.role}</p>
            )}

            {mission.researchAssociation && (
              <p className="mt-1 font-mono text-xs text-dim">
                Association: <span className="text-foreground">{mission.researchAssociation}</span>
              </p>
            )}

            {/* Short Factual Description */}
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {mission.shortDescription}
            </p>
          </div>

          {/* Bottom Bar: Indicators & Action Indicator */}
          <div className="mt-6 flex items-center justify-between border-t border-border/20 pt-4">
            {/* Indicators */}
            <div className="flex items-center gap-2 font-mono text-[11px] text-dim">
              {hasGallery && (
                <span
                  className="inline-flex items-center gap-1 text-dim"
                  title="Photographs available"
                >
                  <ImageIcon size={13} /> {mission.gallery.length}
                </span>
              )}
              {hasEvidence && (
                <span
                  className="inline-flex items-center gap-1 text-dim"
                  title="Documents & certificates"
                >
                  <ShieldCheck size={13} /> {mission.evidence.length}
                </span>
              )}
              {!hasGallery && !hasEvidence && (
                <span className="font-mono text-[10px] tracking-wider text-dim/70">
                  ARCHIVAL LOG
                </span>
              )}
            </div>

            {/* Visual Explore Action Indicator */}
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
          </div>
        </div>
      </Link>
    </article>
  );
}
