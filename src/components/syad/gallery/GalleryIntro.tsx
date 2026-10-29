import { useMemo } from "react";
import { getGalleryStats } from "@/data/galleryArchive";
import { Sparkles, Calendar, Compass, Camera } from "lucide-react";

export function GalleryIntro() {
  const stats = useMemo(() => getGalleryStats(), []);

  return (
    <div className="relative mb-16 md:mb-20">
      {/* Background ambient lighting glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-[380px] w-[500px] rounded-full bg-[#5D6C8C]/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-[300px] w-[450px] rounded-full bg-[#D9BACB]/5 blur-[120px]" />

      <div className="relative z-10 max-w-4xl">
        {/* Editorial Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#5D6C8C]/30 bg-[#151626]/60 px-3.5 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ACBDD4] animate-pulse" />
          <p className="font-mono text-[11px] font-medium tracking-[0.2em] text-[#ACBDD4] uppercase">
            08 · A PERSONAL CHRONICLE · 2025—2026
          </p>
        </div>

        {/* Main Title */}
        <h2 className="mt-5 font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] tracking-tight text-[#F2E0DC]">
          THE JOURNEY, UNFOLDED.
        </h2>

        {/* Supporting Line */}
        <p className="mt-4 font-sans text-lg md:text-xl text-[#ACBDD4]/90 font-light leading-relaxed max-w-2xl">
          A visual archive of moments that shaped me.
        </p>

        {/* Descriptive Note */}
        <p className="mt-3 font-mono text-xs md:text-sm text-[#5D6C8C] max-w-2xl leading-relaxed">
          Documenting milestones, technical breakthroughs, hackathons, academic research, and
          leadership experiences across an evolving engineering expedition.
        </p>

        {/* Dynamic Editorial Metric Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-xl border border-[#5D6C8C]/30 bg-[#151626]/70 px-3.5 py-2 text-xs font-mono text-[#F2E0DC] shadow-sm backdrop-blur-sm">
            <Camera size={14} className="text-[#ACBDD4]" />
            <span className="font-semibold text-[#ACBDD4]">{stats.statusText}</span>
          </div>

          {/* Chapters Count */}
          <div className="inline-flex items-center gap-2 rounded-xl border border-[#5D6C8C]/20 bg-[#151626]/40 px-3.5 py-2 text-xs font-mono text-[#5D6C8C] backdrop-blur-sm">
            <Compass size={14} className="text-[#ACBDD4]/70" />
            <span>
              <strong className="text-[#F2E0DC] font-medium">{stats.totalEvents}</strong> Milestone
              Chapters
            </span>
          </div>

          {/* Temporal Span */}
          <div className="inline-flex items-center gap-2 rounded-xl border border-[#5D6C8C]/20 bg-[#151626]/40 px-3.5 py-2 text-xs font-mono text-[#5D6C8C] backdrop-blur-sm">
            <Calendar size={14} className="text-[#ACBDD4]/70" />
            <span>
              Timeline: <strong className="text-[#F2E0DC] font-medium">{stats.yearsSpan}</strong> (
              {stats.totalYears} Years)
            </span>
          </div>

          {/* Verified Journal Label */}
          <div className="inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono text-[#5D6C8C]">
            <Sparkles size={12} className="text-[#D9BACB]/80" />
            <span>Ascending Chronology</span>
          </div>
        </div>
      </div>
    </div>
  );
}
