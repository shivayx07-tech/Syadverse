import {
  galleryFilterOptions,
  type GalleryFilterCategory,
  galleryChronicleArchive,
} from "@/data/galleryArchive";
import { Filter } from "lucide-react";

interface GalleryFiltersProps {
  activeCategory: GalleryFilterCategory;
  onSelectCategory: (category: GalleryFilterCategory) => void;
  activeYear: "ALL" | 2025 | 2026;
  onSelectYear: (year: "ALL" | 2025 | 2026) => void;
}

export function GalleryFilters({
  activeCategory,
  onSelectCategory,
  activeYear,
  onSelectYear,
}: GalleryFiltersProps) {
  // Compute counts per category dynamically
  const categoryCounts = galleryFilterOptions.reduce(
    (acc, opt) => {
      acc[opt.id] = galleryChronicleArchive.filter(
        (e) => opt.id === "ALL" || e.filterCategories.includes(opt.id),
      ).length;
      return acc;
    },
    {} as Record<GalleryFilterCategory, number>,
  );

  return (
    <div className="mb-14 flex flex-col md:flex-row md:items-center justify-between gap-6 border-y border-[#5D6C8C]/20 py-4">
      {/* Category Filter Pills (horizontally scrollable on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full">
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#5D6C8C] pr-2 shrink-0">
          <Filter size={13} className="text-[#ACBDD4]" />
          <span>FOCUS:</span>
        </div>

        {galleryFilterOptions.map((opt) => {
          const isActive = activeCategory === opt.id;
          const count = categoryCounts[opt.id];

          return (
            <button
              key={opt.id}
              onClick={() => onSelectCategory(opt.id)}
              className={`relative inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-mono transition-all duration-300 shrink-0 ${
                isActive
                  ? "bg-[#ACBDD4]/15 text-[#F2E0DC] border border-[#ACBDD4]/50 shadow-[0_0_15px_-3px_rgba(172,189,212,0.25)]"
                  : "bg-[#151626]/40 text-[#5D6C8C] border border-[#5D6C8C]/20 hover:border-[#5D6C8C]/40 hover:text-[#ACBDD4]"
              }`}
            >
              <span className="font-medium tracking-wider">{opt.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isActive ? "bg-[#ACBDD4]/25 text-[#F2E0DC]" : "bg-[#151626] text-[#5D6C8C]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Year Filter Switch */}
      <div className="flex items-center gap-1.5 shrink-0 self-start md:self-auto">
        <span className="font-mono text-[11px] text-[#5D6C8C] mr-1.5">CHAPTER:</span>
        {(["ALL", 2025, 2026] as const).map((year) => {
          const isYearActive = activeYear === year;
          return (
            <button
              key={year}
              onClick={() => onSelectYear(year)}
              className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-all ${
                isYearActive
                  ? "bg-[#D9BACB]/20 text-[#F2E0DC] border border-[#D9BACB]/40 font-semibold"
                  : "bg-transparent text-[#5D6C8C] hover:text-[#ACBDD4] border border-transparent"
              }`}
            >
              {year === "ALL" ? "All Years" : year}
            </button>
          );
        })}
      </div>
    </div>
  );
}
