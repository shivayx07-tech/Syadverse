import { useEffect, useRef, useState } from "react";
import type { GalleryEvent } from "@/data/galleryArchive";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Camera,
  LayoutGrid,
  Maximize2,
  Sparkles,
  Quote,
  Eye,
  ArrowLeft,
} from "lucide-react";

interface GalleryAlbumModalProps {
  event: GalleryEvent | null;
  initialIndex?: number;
  initialMode?: "grid" | "viewer";
  onClose: () => void;
}

export function GalleryAlbumModal({
  event,
  initialIndex = 0,
  initialMode = "grid",
  onClose,
}: GalleryAlbumModalProps) {
  const [viewMode, setViewMode] = useState<"grid" | "viewer">(initialMode);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, event]);

  useEffect(() => {
    setViewMode(initialMode);
  }, [initialMode, event]);

  // Lock body scroll while modal is active to prevent background shifting
  useEffect(() => {
    if (!event) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [event]);

  const photos = event?.photos ?? [];
  const total = photos.length;

  const handlePrev = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleOpenViewerAt = (index: number) => {
    setCurrentIndex(index);
    setViewMode("viewer");
  };

  useEffect(() => {
    if (!event || total === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (viewMode === "viewer" && total > 1) {
          setViewMode("grid");
        } else {
          onClose();
        }
      }
      if (viewMode === "viewer") {
        if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + total) % total);
        if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % total);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [event, total, viewMode, onClose]);

  if (!event || total === 0) return null;

  const currentPhoto = photos[currentIndex];
  // Subsequent photos (excluding cover, which is featured at index 0 in the lead hero card)
  const subsequentPhotos = photos.slice(1);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) handlePrev();
      else handleNext();
    }
    touchStartX.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo album: ${event.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#090A0D]/95 backdrop-blur-xl p-2 sm:p-4 md:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-6xl h-[92vh] max-h-[92vh] overflow-hidden rounded-2xl border border-[#5D6C8C]/30 bg-[#121422] shadow-[0_25px_70px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-[#5D6C8C]/20 px-4 sm:px-6 py-3.5 bg-[#151626]/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-3">
            {viewMode === "viewer" && total > 1 ? (
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Back to Album Grid"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#ACBDD4]/30 bg-[#ACBDD4]/10 text-xs font-mono text-[#ACBDD4] hover:bg-[#ACBDD4] hover:text-[#090A0D] transition-colors shrink-0"
              >
                <ArrowLeft size={13} />
                <span className="hidden sm:inline">Album Grid</span>
              </button>
            ) : (
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-[#ACBDD4]/15 text-[#ACBDD4] border border-[#ACBDD4]/30 shrink-0">
                {event.eventNumber}
              </span>
            )}

            <div className="truncate">
              <h3 className="font-serif text-base sm:text-lg md:text-xl text-[#F2E0DC] truncate">
                {event.title}
              </h3>
              <div className="flex items-center gap-3 font-mono text-[11px] text-[#5D6C8C]">
                <span className="flex items-center gap-1">
                  <Calendar size={11} className="text-[#ACBDD4]" />
                  {event.date}
                </span>
                {event.location && (
                  <span className="hidden sm:flex items-center gap-1">
                    <MapPin size={11} className="text-[#ACBDD4]" />
                    {event.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* View Mode Switcher */}
            <div className="flex items-center rounded-xl border border-[#5D6C8C]/30 bg-[#090A0D]/70 p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Editorial album grid view"
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
                  viewMode === "grid"
                    ? "bg-[#ACBDD4] text-[#090A0D] font-semibold shadow-sm"
                    : "text-[#5D6C8C] hover:text-[#F2E0DC]"
                }`}
              >
                <LayoutGrid size={13} />
                <span className="hidden sm:inline">Album Grid</span>
              </button>
              <button
                onClick={() => setViewMode("viewer")}
                aria-label="Full-size photo viewer"
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
                  viewMode === "viewer"
                    ? "bg-[#ACBDD4] text-[#090A0D] font-semibold shadow-sm"
                    : "text-[#5D6C8C] hover:text-[#F2E0DC]"
                }`}
              >
                <Maximize2 size={13} />
                <span className="hidden sm:inline">Viewer</span>
              </button>
            </div>

            {/* Photo Counter Pill */}
            <span className="hidden xs:inline-flex items-center gap-1 font-mono text-xs text-[#ACBDD4] bg-[#090A0D]/60 px-3 py-1 rounded-full border border-[#5D6C8C]/25">
              <Camera size={12} className="text-[#ACBDD4]" />
              {viewMode === "viewer" ? `${currentIndex + 1} / ${total}` : `${total} Photos`}
            </span>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close album viewer"
              className="grid h-9 w-9 place-items-center rounded-xl border border-[#5D6C8C]/30 bg-[#151626] text-[#5D6C8C] hover:text-[#F2E0DC] hover:border-[#ACBDD4]/50 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* MODE 1: EDITORIAL ALBUM GRID                                         */}
        {/* ==================================================================== */}
        {viewMode === "grid" ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8 bg-[#0c0e17]">
            {/* Editorial Context & Quote */}
            <div className="rounded-2xl border border-[#5D6C8C]/20 bg-[#121422]/60 p-5 md:p-6 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <Quote size={20} className="text-[#D9BACB]/60 shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif italic text-base sm:text-lg text-[#F2E0DC]/95 leading-relaxed">
                    {event.quote}
                  </p>
                  <p className="mt-2 font-sans text-xs sm:text-sm text-[#8C96AE] leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>

            {/* 1. HERO OFFICIAL COVER PRESENTATION */}
            <div className="relative group overflow-hidden rounded-2xl border border-[#5D6C8C]/30 bg-[#090A0D] shadow-xl">
              <div className="flex flex-col lg:flex-row items-stretch">
                {/* Visual side: Large image container */}
                <div
                  onClick={() => handleOpenViewerAt(0)}
                  className="relative cursor-pointer flex-1 min-h-[280px] sm:min-h-[360px] md:min-h-[420px] max-h-[520px] bg-[#07080f] flex items-center justify-center p-4 sm:p-6 overflow-hidden"
                >
                  <img
                    src={photos[0].url}
                    alt={photos[0].alt || photos[0].caption || "Official Cover Image"}
                    className="w-auto h-auto max-h-[460px] max-w-full object-contain rounded-lg shadow-lg transition-opacity duration-300"
                    loading="eager"
                    style={{ maxHeight: "460px", maxWidth: "100%" }}
                  />
                  <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#ACBDD4]/40 bg-[#090A0D]/85 px-3 py-1 text-[11px] font-mono font-medium text-[#ACBDD4] backdrop-blur-md">
                    <Sparkles size={11} className="text-[#ACBDD4]" />
                    <span>{`OFFICIAL COVER · ${event.location ? event.location.toUpperCase() : event.category.toUpperCase()}`}</span>
                  </div>
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#ACBDD4]/40 bg-[#151626]/95 px-3 py-1.5 font-mono text-xs text-[#F2E0DC] backdrop-blur-md shadow-lg">
                      <Maximize2 size={12} className="text-[#ACBDD4]" />
                      View Full Size
                    </span>
                  </div>
                </div>

                {/* Editorial Metadata side */}
                <div className="lg:w-80 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#5D6C8C]/20 bg-[#121422]/90 p-5 sm:p-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#5D6C8C] block mb-1.5">
                      Lead Editorial Photograph · #01
                    </span>
                    <h4 className="font-serif text-lg text-[#F2E0DC] leading-snug">
                      {event.slots?.[0]?.label || "Official Cover Photograph"}
                    </h4>
                    <p className="mt-3 font-sans text-xs sm:text-sm text-[#8C96AE] leading-relaxed">
                      {photos[0].caption}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#5D6C8C]/20 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#5D6C8C]">
                      Aspect {photos[0].aspectRatio || "Original"}
                    </span>
                    <button
                      onClick={() => handleOpenViewerAt(0)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#ACBDD4]/40 bg-[#ACBDD4]/15 px-3 py-1.5 font-mono text-xs font-semibold text-[#F2E0DC] hover:bg-[#ACBDD4] hover:text-[#090A0D] transition-colors"
                    >
                      <Maximize2 size={12} />
                      <span>OPEN FULL VIEW</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. SUBSEQUENT ALBUM GRID (PHOTOS 2 TO N) */}
            {subsequentPhotos.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#5D6C8C]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <Camera size={14} className="text-[#ACBDD4]" />
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#F2E0DC]">
                      Archived Event Chronicle & Proceedings
                    </h4>
                  </div>
                  <span className="font-mono text-[11px] text-[#5D6C8C]">
                    {subsequentPhotos.length} Subsequent Archived Moments
                  </span>
                </div>

                {/* Refined editorial masonry grid preserving natural dimensions */}
                <div className="columns-1 md:columns-2 gap-6 [column-fill:_balance]">
                  {subsequentPhotos.map((photo, index) => {
                    const actualIndex = index + 1; // 1-based index (photo 2 = index 1)
                    return (
                      <div
                        key={photo.id || actualIndex}
                        onClick={() => handleOpenViewerAt(actualIndex)}
                        className="break-inside-avoid mb-6 group relative flex flex-col overflow-hidden rounded-2xl border border-[#5D6C8C]/25 bg-[#121422] transition-all duration-300 hover:border-[#ACBDD4]/60 hover:shadow-2xl cursor-pointer"
                      >
                        {/* Photo Canvas with neutral dark background — 100% full photograph, zero cropping */}
                        <div className="relative flex w-full items-center justify-center bg-[#07080f] p-3 sm:p-4 overflow-hidden">
                          <img
                            src={photo.url}
                            alt={photo.alt || photo.caption || `Summit moment #${actualIndex + 1}`}
                            className="w-full h-auto max-h-[540px] object-contain rounded-lg transition-opacity duration-300"
                            loading="lazy"
                            style={{
                              maxHeight: "540px",
                              maxWidth: "100%",
                            }}
                          />
                          {/* Top Moment Badge */}
                          <div className="absolute top-4 left-4 rounded-md border border-[#5D6C8C]/30 bg-[#090A0D]/85 px-2.5 py-1 font-mono text-[10px] tracking-wider text-[#ACBDD4] backdrop-blur-md">
                            MOMENT #{String(actualIndex + 1).padStart(2, "0")}
                          </div>

                          {/* Hover Expand Icon */}
                          <div className="absolute top-4 right-4 rounded-md border border-[#ACBDD4]/40 bg-[#151626]/90 px-2.5 py-1 font-mono text-[10px] tracking-wider text-[#F2E0DC] opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 flex items-center gap-1.5 shadow-lg">
                            <Maximize2 size={11} className="text-[#ACBDD4]" />
                            <span>VIEW FULL SIZE</span>
                          </div>
                        </div>

                        {/* Caption Bar */}
                        <div className="flex flex-col justify-between border-t border-[#5D6C8C]/20 bg-[#151626]/90 p-4 sm:p-5 backdrop-blur-sm">
                          <p className="font-sans text-xs sm:text-sm text-[#F2E0DC]/95 leading-relaxed">
                            {photo.caption}
                          </p>
                          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#5D6C8C] pt-2 border-t border-[#5D6C8C]/15">
                            <span>
                              Photo #{actualIndex + 1} of {total} ·{" "}
                              {photo.aspectRatio || "Original"}
                            </span>
                            <span className="text-[#ACBDD4] font-medium group-hover:underline flex items-center gap-1">
                              Open Photo →
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ==================================================================== */
          /* MODE 2: FULL-SIZE PHOTO VIEWER                                      */
          /* ==================================================================== */
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-[#090A0D]">
            {/* Center Main Photograph Surface */}
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative flex-1 min-h-0 w-full bg-[#07080f] flex items-center justify-center p-3 sm:p-6 md:p-8 select-none overflow-hidden"
            >
              {currentPhoto?.url ? (
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.alt || currentPhoto.caption || event.title}
                  className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl transition-opacity duration-300 pointer-events-none select-none"
                  style={{
                    maxHeight: "calc(92vh - 210px)",
                    maxWidth: "100%",
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-8">
                  <Camera size={32} className="text-[#5D6C8C]" />
                  <p className="mt-2 font-mono text-xs text-[#ACBDD4]">Image placeholder</p>
                </div>
              )}

              {/* Navigation Arrows */}
              {total > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous photograph"
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center rounded-full border border-[#5D6C8C]/40 bg-[#151626]/90 text-[#F2E0DC] hover:bg-[#ACBDD4] hover:text-[#090A0D] transition-all shadow-xl backdrop-blur-md"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next photograph"
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center rounded-full border border-[#5D6C8C]/40 bg-[#151626]/90 text-[#F2E0DC] hover:bg-[#ACBDD4] hover:text-[#090A0D] transition-all shadow-xl backdrop-blur-md"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption & Thumbnails Strip */}
            <div className="border-t border-[#5D6C8C]/20 p-3 sm:p-4 bg-[#151626]/95 backdrop-blur-md shrink-0">
              <div className="flex items-center justify-between gap-4 mb-2 max-w-4xl mx-auto">
                <span className="font-mono text-xs text-[#ACBDD4] bg-[#090A0D]/70 px-2.5 py-0.5 rounded border border-[#5D6C8C]/30 shrink-0">
                  {currentIndex === 0 ? "Official Cover" : `Moment #${currentIndex + 1}`}
                </span>
                {currentPhoto?.caption && (
                  <p className="font-sans text-xs sm:text-sm text-[#F2E0DC]/95 text-center flex-1 leading-relaxed line-clamp-2">
                    {currentPhoto.caption}
                  </p>
                )}
                <button
                  onClick={() => setViewMode("grid")}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#ACBDD4] hover:text-[#F2E0DC] bg-[#090A0D]/60 border border-[#5D6C8C]/30 px-2.5 py-1 rounded-lg transition-colors shrink-0"
                >
                  <LayoutGrid size={13} />
                  <span>Album Grid</span>
                </button>
              </div>

              {/* Interactive Thumbnail Filmstrip */}
              {total > 1 && (
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 px-2">
                  {photos.map((photo, idx) => (
                    <button
                      key={photo.id || idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`View photo ${idx + 1}`}
                      className={`relative h-12 sm:h-14 w-16 sm:w-20 overflow-hidden rounded-lg border transition-all shrink-0 bg-[#07080f] ${
                        currentIndex === idx
                          ? "border-[#ACBDD4] ring-2 ring-[#ACBDD4]/50 scale-105"
                          : "border-[#5D6C8C]/30 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={photo.url} alt="" className="h-full w-full object-contain p-0.5" />
                      {idx === 0 && (
                        <div className="absolute top-0.5 left-0.5 bg-[#ACBDD4] text-[#090A0D] font-mono text-[7px] sm:text-[8px] font-bold px-1 rounded-sm">
                          COVER
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
