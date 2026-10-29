import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import type { GalleryPhoto } from "@/data/experienceArchive";

interface ImageLightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ImageLightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: ImageLightboxProps) {
  const currentPhoto = photos[currentIndex];
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Touch tracking for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Reset zoom on slide change
  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex]);

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  // Manage focus and keydown events
  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "z" || e.key === "Z") {
        e.preventDefault();
        toggleZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen, onClose, onNext, onPrev, toggleZoom]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY =
      touchStartY.current !== null ? e.changedTouches[0].clientY - touchStartY.current : 0;

    // Trigger swipe only if horizontal movement is dominant and exceeds threshold
    if (!isZoomed && Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        onNext();
      } else {
        onPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-2 sm:p-6 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top action controls */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={toggleZoom}
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          title={isZoomed ? "Zoom out (Z)" : "Zoom in (Z)"}
          className="grid h-11 w-11 place-items-center rounded-full border border-foreground/20 bg-surface/80 text-foreground transition-all hover:border-foreground/40 hover:bg-surface hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {isZoomed ? <ZoomOut size={19} /> : <ZoomIn size={19} />}
        </button>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close lightbox"
          className="grid h-11 w-11 place-items-center rounded-full border border-foreground/20 bg-surface/80 text-foreground transition-all hover:border-foreground/40 hover:bg-surface hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <X size={20} />
        </button>
      </div>

      {/* Prev button */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
          className="absolute left-2 sm:left-4 top-1/2 z-40 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-foreground/20 bg-surface/80 text-foreground transition-all hover:border-foreground/40 hover:bg-surface hover:scale-105 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Next button */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
          className="absolute right-2 sm:right-4 top-1/2 z-40 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-foreground/20 bg-surface/80 text-foreground transition-all hover:border-foreground/40 hover:bg-surface hover:scale-105 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Image and caption container */}
      <div
        className="relative flex flex-col items-center max-h-[94vh] max-w-6xl w-full overflow-hidden rounded-2xl border border-border/40 bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative flex max-h-[78vh] w-full items-center justify-center overflow-auto bg-[#07080e] p-2 sm:p-4 select-none ${
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
          onClick={toggleZoom}
        >
          <img
            src={currentPhoto.url}
            alt={currentPhoto.alt || currentPhoto.caption}
            className={`max-w-full object-contain transition-transform duration-300 ease-out ${
              isZoomed ? "scale-[1.6] sm:scale-[1.8] my-8 py-4 max-h-none" : "max-h-[74vh] w-auto"
            }`}
          />
        </div>

        {/* Caption bar */}
        <div className="flex w-full flex-col gap-1.5 border-t border-border/40 bg-surface/90 px-5 py-3.5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 pr-2">
            <p className="text-xs sm:text-sm font-medium text-foreground">{currentPhoto.caption}</p>
            {(currentPhoto.date || currentPhoto.location) && (
              <p className="mt-0.5 font-mono text-[11px] sm:text-xs text-dim">
                {[currentPhoto.location, currentPhoto.date].filter(Boolean).join(" • ")}
              </p>
            )}
          </div>
          <div className="shrink-0 font-mono text-xs font-semibold text-dim">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
}
