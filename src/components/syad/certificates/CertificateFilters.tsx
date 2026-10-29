import { type CertificateCategory, certificateCategories } from "@/data/certificatesArchive";

interface CertificateFiltersProps {
  activeCategory: CertificateCategory;
  onSelectCategory: (category: CertificateCategory) => void;
  categoryCounts: Record<CertificateCategory, number>;
}

export function CertificateFilters({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}: CertificateFiltersProps) {
  return (
    <div className="relative mb-10 w-full">
      <div
        className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto pb-2 pt-1"
        role="tablist"
        aria-label="Filter certificates by category"
      >
        {certificateCategories.map((category) => {
          const count = categoryCounts[category] ?? 0;
          if (count === 0 && category !== "All") return null;
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(category)}
              className={`group relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 ${
                isActive
                  ? "border-cyan/40 bg-surface/90 text-[#F2E0DC] shadow-[0_0_20px_rgba(40,210,240,0.12)]"
                  : "border-foreground/10 bg-background/60 text-[#5D6C8C] hover:border-foreground/25 hover:text-[#F2E0DC]"
              }`}
            >
              <span>{category}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] transition-colors ${
                  isActive
                    ? "bg-cyan/15 text-cyan"
                    : "bg-foreground/5 text-dim group-hover:text-foreground/80"
                }`}
              >
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
