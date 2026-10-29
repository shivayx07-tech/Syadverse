import { useState, useMemo } from "react";
import {
  galleryChronicleArchive,
  type GalleryFilterCategory,
  type GalleryEvent,
} from "@/data/galleryArchive";
import { GalleryIntro } from "./GalleryIntro";
import { GalleryFilters } from "./GalleryFilters";
import { YearDivider } from "./YearDivider";
import { EventCard } from "./EventCard";
import { GalleryAlbumModal } from "./GalleryAlbumModal";

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryFilterCategory>("ALL");
  const [activeYear, setActiveYear] = useState<"ALL" | 2025 | 2026>("ALL");
  const [selectedAlbum, setSelectedAlbum] = useState<{
    event: GalleryEvent;
    initialIndex: number;
    initialMode?: "grid" | "viewer";
  } | null>(null);

  // Filter events based on active category and active year
  const filteredEvents = useMemo(() => {
    return galleryChronicleArchive.filter((event) => {
      const matchesCategory =
        activeCategory === "ALL" || event.filterCategories.includes(activeCategory);
      const matchesYear = activeYear === "ALL" || event.year === activeYear;
      return matchesCategory && matchesYear;
    });
  }, [activeCategory, activeYear]);

  // Partition events into 2025 and 2026 for chapter dividers
  const events2025 = useMemo(() => filteredEvents.filter((e) => e.year === 2025), [filteredEvents]);
  const events2026 = useMemo(() => filteredEvents.filter((e) => e.year === 2026), [filteredEvents]);

  const handleOpenAlbum = (
    event: GalleryEvent,
    photoIndex: number = 0,
    mode: "grid" | "viewer" = "grid",
  ) => {
    if (event.photos && event.photos.length > 0) {
      setSelectedAlbum({ event, initialIndex: photoIndex, initialMode: mode });
    }
  };

  return (
    <section id="gallery" className="relative px-6 py-24 md:py-36 overflow-hidden">
      {/* Background ambient lighting accents */}
      <div className="pointer-events-none absolute left-1/3 top-1/4 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-[#5D6C8C]/5 blur-[160px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/3 h-[500px] w-[700px] rounded-full bg-[#D9BACB]/5 blur-[150px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Gallery Introduction */}
        <GalleryIntro />

        {/* Category & Year Navigation Controls */}
        <GalleryFilters
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          activeYear={activeYear}
          onSelectYear={setActiveYear}
        />

        {/* CHRONOLOGICAL MASTER TIMELINE */}
        <div className="relative">
          {/* Year 2025 Chapter */}
          {events2025.length > 0 && (
            <div className="relative">
              <YearDivider year={2025} eventCount={events2025.length} />
              <div className="mt-8">
                {events2025.map((event, idx) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    index={idx}
                    onOpenAlbum={handleOpenAlbum}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Year 2026 Chapter */}
          {events2026.length > 0 && (
            <div className="relative">
              <YearDivider year={2026} eventCount={events2026.length} />
              <div className="mt-8">
                {events2026.map((event, idx) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    index={idx}
                    onOpenAlbum={handleOpenAlbum}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Fallback empty state if filter yields zero events */}
          {filteredEvents.length === 0 && (
            <div className="my-20 rounded-2xl border border-dashed border-[#5D6C8C]/30 bg-[#151626]/40 p-12 text-center max-w-xl mx-auto">
              <p className="font-serif text-xl text-[#F2E0DC]">No chapters in this focus filter</p>
              <p className="mt-2 font-mono text-xs text-[#5D6C8C]">
                Select another category or reset to All Journeys to explore the chronicle.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("ALL");
                  setActiveYear("ALL");
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#ACBDD4]/40 bg-[#ACBDD4]/15 px-4 py-2 font-mono text-xs text-[#F2E0DC] hover:bg-[#ACBDD4] hover:text-[#090A0D] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Album Viewer Modal */}
      <GalleryAlbumModal
        event={selectedAlbum?.event ?? null}
        initialIndex={selectedAlbum?.initialIndex ?? 0}
        initialMode={selectedAlbum?.initialMode ?? "grid"}
        onClose={() => setSelectedAlbum(null)}
      />
    </section>
  );
}

export const Gallery = GallerySection;
