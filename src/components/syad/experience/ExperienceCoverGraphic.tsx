import { useState } from "react";
import type { ExperienceMission } from "@/data/experienceArchive";

interface ExperienceCoverGraphicProps {
  mission: ExperienceMission;
  className?: string;
  variant?: "card" | "hero";
}

export function ExperienceCoverGraphic({
  mission,
  className = "",
  variant = "card",
}: ExperienceCoverGraphicProps) {
  const [imageError, setImageError] = useState(false);
  const hasImage = Boolean(mission.coverImage && !imageError);

  if (hasImage) {
    const isContain = mission.coverImageFit === "contain";
    const aspectRatio = mission.coverImageAspectRatio || (variant === "hero" ? "16/9" : "16/10");

    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden ${
          isContain ? "bg-[#060814]" : "bg-surface"
        } ${className}`}
        style={{
          aspectRatio,
          backgroundColor: mission.coverImageBg || undefined,
        }}
      >
        <img
          src={mission.coverImage}
          alt={mission.coverImageAlt}
          onError={() => setImageError(true)}
          style={
            mission.coverImagePosition ? { objectPosition: mission.coverImagePosition } : undefined
          }
          className={`h-full w-full ${
            isContain
              ? "object-contain"
              : "object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          }`}
          loading="lazy"
        />
        {/* Minimal cinematic gradient vignette to keep the authentic photograph as primary focus (disabled when overlays are suppressed) */}
        {!mission.hideCoverOverlays && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        )}

        {/* Mission watermark stamp (disabled when overlays are suppressed to preserve full photo visibility) */}
        {!mission.hideCoverOverlays && (
          <div className="absolute top-3 left-3 rounded-md border border-foreground/15 bg-background/70 px-2.5 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] font-semibold tracking-wider text-foreground">
              {mission.missionNumber}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Refined intentional placeholder graphic matching Syadverse identity
  const hueColor =
    mission.accentHue === "cyan"
      ? "var(--cyan)"
      : mission.accentHue === "magenta"
        ? "var(--magenta)"
        : "var(--violet)";

  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden border border-border/40 bg-gradient-to-br from-surface to-background p-6 transition-all duration-500 ${className}`}
      style={{
        aspectRatio: variant === "hero" ? "16/9" : "16/10",
        minHeight: variant === "hero" ? "280px" : "200px",
      }}
    >
      {/* Background technical grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${hueColor} 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative cosmic alignment ring */}
      <svg
        className="pointer-events-none absolute -right-12 -bottom-12 h-52 w-52 opacity-20 transition-transform duration-700 ease-out group-hover:scale-110"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
      >
        <circle cx="50" cy="50" r="46" stroke={hueColor} strokeWidth="1" strokeDasharray="3 4" />
        <circle
          cx="50"
          cy="50"
          r="32"
          stroke="currentColor"
          strokeWidth="0.8"
          className="text-foreground"
        />
        <line
          x1="0"
          y1="50"
          x2="100"
          y2="50"
          stroke={hueColor}
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="100"
          stroke={hueColor}
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />
      </svg>

      {/* Top bar with mission code and category */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wider"
          style={{
            borderColor: `color-mix(in oklab, ${hueColor} 30%, transparent)`,
            backgroundColor: "color-mix(in oklab, var(--background) 80%, transparent)",
            color: hueColor,
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: hueColor }} />
          {mission.missionNumber}
        </span>
        <span className="font-mono text-[10px] tracking-widest text-dim uppercase">
          {mission.category}
        </span>
      </div>

      {/* Central iconographic representation */}
      <div className="relative z-10 my-auto py-2">
        <div className="mb-2 font-display text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {mission.organization}
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
          {mission.title}
        </p>
      </div>

      {/* Bottom technical asset status */}
      <div className="relative z-10 flex items-center justify-between border-t border-border/30 pt-3">
        <span className="font-mono text-[10px] text-dim tracking-wider">
          {mission.date || mission.duration || "VERIFIED RECORD"}
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/70">
          <span className="inline-block h-1 w-1 rounded-full bg-border" />
          Authentic Asset Slot
        </span>
      </div>
    </div>
  );
}
