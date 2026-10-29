import { yearChapters } from "@/data/galleryArchive";
import { Compass, Sparkles } from "lucide-react";

interface YearDividerProps {
  year: 2025 | 2026;
  eventCount: number;
}

export function YearDivider({ year, eventCount }: YearDividerProps) {
  const chapter = yearChapters[year];
  if (!chapter) return null;

  return (
    <div id={`year-${year}`} className="relative my-16 md:my-24 pt-6 first:mt-4 scroll-mt-28">
      {/* Delicate horizontal connector line with center glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5D6C8C]/40 to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center px-4">
        {/* Subtle chapter chip */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D9BACB]/30 bg-[#151626]/70 px-4 py-1.5 shadow-sm backdrop-blur-md">
          <Sparkles size={13} className="text-[#D9BACB]" />
          <span className="font-mono text-[11px] font-semibold tracking-[0.22em] text-[#D9BACB] uppercase">
            {chapter.tagline}
          </span>
          <span className="h-1 w-1 rounded-full bg-[#5D6C8C]" />
          <span className="font-mono text-[11px] text-[#ACBDD4]">
            {eventCount} {eventCount === 1 ? "Chapter" : "Chapters"}
          </span>
        </div>

        {/* Chapter Title */}
        <h3 className="mt-4 font-serif text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.08] tracking-tight text-[#F2E0DC]">
          {chapter.title}
        </h3>

        {/* Chapter Subtitle */}
        <p className="mt-2 font-sans text-sm md:text-base text-[#ACBDD4]/90 max-w-xl mx-auto font-light leading-relaxed">
          {chapter.subtitle}
        </p>

        {/* Downward connecting spine marker */}
        <div className="mt-6 flex flex-col items-center">
          <div className="grid h-8 w-8 place-items-center rounded-full border border-[#5D6C8C]/35 bg-[#151626] text-[#ACBDD4] shadow-[0_0_15px_-2px_rgba(93,108,140,0.3)]">
            <Compass size={15} />
          </div>
          <div className="h-8 w-px bg-gradient-to-b from-[#5D6C8C]/50 to-[#5D6C8C]/10" />
        </div>
      </div>
    </div>
  );
}
