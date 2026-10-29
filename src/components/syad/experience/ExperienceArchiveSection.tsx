import { useState, useMemo } from "react";
import { EXPERIENCE_CATEGORIES, experienceMissions } from "@/data/experienceArchive";
import { ExperienceCard } from "./ExperienceCard";

export function ExperienceArchiveSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredMissions = useMemo(() => {
    if (selectedCategory === "all") return experienceMissions;
    return experienceMissions.filter((m) => m.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="experience" className="relative px-6 py-24 md:py-36">
      {/* Subtle ambient background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 h-96 w-[80vw] max-w-5xl rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(ellipse at center, var(--violet) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            03 / THE MISSION LOG
          </p>

          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            EVERY EXPERIENCE. A NEW DIMENSION.
          </h2>

          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            A journey through research, technology, leadership, and the moments that shaped my
            growth.
          </p>

          <p className="mt-2 text-xs md:text-sm text-dim italic">
            Every experience leaves a trace. Explore the work, the people, the discoveries, and the
            evidence behind my journey.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-border/30 pb-6">
          {EXPERIENCE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={isSelected}
                className={`rounded-full px-4 py-1.5 font-mono text-xs transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent ${
                  isSelected
                    ? "border border-accent bg-accent/15 text-foreground shadow-sm font-semibold"
                    : "border border-border/50 bg-surface/50 text-dim hover:border-border hover:text-foreground hover:bg-surface"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Experience Cards Grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMissions.map((mission) => (
            <ExperienceCard key={mission.id} mission={mission} />
          ))}
        </div>

        {/* Bottom Archival Footnote */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border/30 bg-surface/30 px-6 py-4 text-xs text-dim">
          <div className="flex items-center gap-2 font-mono">
            <span className="h-2 w-2 rounded-full bg-cyan/70 animate-pulse" />
            <span>{experienceMissions.length} ARCHIVAL MISSIONS REGISTERED</span>
          </div>
          <p className="text-center sm:text-right text-muted-foreground text-[11px]">
            Every entry contains dedicated narrative chapters, verified responsibilities, and
            evidence vaults.
          </p>
        </div>
      </div>
    </section>
  );
}
