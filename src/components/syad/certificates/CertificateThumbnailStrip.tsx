import { useEffect, useRef } from "react";
import type { CertificateItem } from "@/data/certificatesArchive";

interface CertificateThumbnailStripProps {
  items: CertificateItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function CertificateThumbnailStrip({
  items,
  activeIndex,
  onSelect,
}: CertificateThumbnailStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  // Scroll active thumbnail smoothly into view
  useEffect(() => {
    if (activeThumbRef.current && containerRef.current) {
      const container = containerRef.current;
      const thumb = activeThumbRef.current;
      const containerLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const thumbLeft = thumb.offsetLeft;
      const thumbWidth = thumb.clientWidth;

      if (thumbLeft < containerLeft || thumbLeft + thumbWidth > containerLeft + containerWidth) {
        container.scrollTo({
          left: thumbLeft - containerWidth / 2 + thumbWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  if (items.length <= 1) return null;

  return (
    <div className="relative mt-8 w-full">
      <div className="mb-3 flex items-center justify-between text-xs font-mono text-[#5D6C8C]">
        <span className="tracking-wider uppercase">Vault Filmstrip</span>
        <span>
          {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <div
        ref={containerRef}
        tabIndex={0}
        aria-label="Certificate thumbnails preview strip. Use left and right arrow keys to navigate."
        className="no-scrollbar flex w-full items-center gap-3 overflow-x-auto pb-4 pt-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan/40"
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.id}
              ref={isActive ? activeThumbRef : null}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Select certificate ${index + 1} of ${items.length}: ${item.title}`}
              aria-current={isActive ? "true" : undefined}
              className={`group relative flex h-20 w-28 shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl border bg-[#090A0D] p-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
                isActive
                  ? "border-cyan ring-1 ring-cyan/40 shadow-[0_0_15px_rgba(40,210,240,0.25)] scale-105 z-10"
                  : "border-foreground/10 opacity-60 hover:opacity-100 hover:border-foreground/30 hover:scale-102"
              }`}
            >
              <img
                src={item.thumbnailImage}
                alt=""
                loading="lazy"
                className="h-full w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-102"
              />
              <span
                className={`absolute bottom-1 right-1.5 rounded bg-black/80 px-1 font-mono text-[9px] backdrop-blur-sm ${
                  isActive ? "text-cyan" : "text-foreground/60"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
