import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, FileText, Award } from "lucide-react";
import type { CertificateItem } from "@/data/certificatesArchive";

interface CertificateCarouselProps {
  items: CertificateItem[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  onOpenViewer: (item: CertificateItem) => void;
}

export function CertificateCarousel({
  items,
  activeIndex,
  onIndexChange,
  onOpenViewer,
}: CertificateCarouselProps) {
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef<number | null>(null);
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const isHorizontalGestureRef = useRef<boolean | null>(null);
  const hasDraggedRef = useRef<boolean>(false);

  const total = items.length;
  const current = items[activeIndex];

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setSlideDirection("right");
    onIndexChange((activeIndex - 1 + total) % total);
  }, [activeIndex, total, onIndexChange]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setSlideDirection("left");
    onIndexChange((activeIndex + 1) % total);
  }, [activeIndex, total, onIndexChange]);

  // Reset slide animation state after transition
  useEffect(() => {
    if (slideDirection) {
      const timer = setTimeout(() => {
        setSlideDirection(null);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [slideDirection, activeIndex]);

  // Keyboard navigation within section
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      document.activeElement?.tagName === "INPUT" ||
      document.activeElement?.tagName === "TEXTAREA"
    ) {
      return;
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "Home") {
      e.preventDefault();
      onIndexChange(0);
    } else if (e.key === "End") {
      e.preventDefault();
      onIndexChange(total - 1);
    }
  };

  // Touch Swipe Handlers (Optimized for reliable vertical page scroll & crisp horizontal gestures)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPosRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    isHorizontalGestureRef.current = null;
    hasDraggedRef.current = false;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPosRef.current) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartPosRef.current.x;
    const deltaY = currentY - touchStartPosRef.current.y;

    // Detect intent on first significant movement
    if (isHorizontalGestureRef.current === null) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX > 8 || absY > 8) {
        if (absX > absY) {
          // Deliberate horizontal swipe detected
          isHorizontalGestureRef.current = true;
        } else {
          // Vertical page scroll: abandon carousel drag to allow natural native scrolling
          isHorizontalGestureRef.current = false;
          setIsDragging(false);
          setDragOffset(0);
          return;
        }
      }
    }

    if (isHorizontalGestureRef.current === true) {
      if (Math.abs(deltaX) > 6) {
        hasDraggedRef.current = true;
      }
      // Apply slight elastic resistance when dragging
      const boundedDelta = deltaX * 0.85;
      setDragOffset(boundedDelta);
    }
  };

  const handleTouchEnd = () => {
    if (isHorizontalGestureRef.current === true) {
      const threshold = 55;
      if (dragOffset < -threshold) {
        handleNext();
      } else if (dragOffset > threshold) {
        handlePrev();
      }
    }

    // Reset touch state
    setIsDragging(false);
    setDragOffset(0);
    touchStartPosRef.current = null;
    isHorizontalGestureRef.current = null;

    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 60);
  };

  // Mouse Drag Handlers for Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only primary button
    if (e.button !== 0) return;
    dragStartXRef.current = e.clientX;
    hasDraggedRef.current = false;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartXRef.current === null) return;
    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 6) {
      hasDraggedRef.current = true;
    }
    setDragOffset(deltaX * 0.75);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const threshold = 55;
    if (dragOffset < -threshold) {
      handleNext();
    } else if (dragOffset > threshold) {
      handlePrev();
    }
    setIsDragging(false);
    dragStartXRef.current = null;
    setDragOffset(0);

    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 60);
  };

  if (!current || total === 0) return null;

  // Previous and next indices for side previews
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;
  const prevItem = items[prevIndex];
  const nextItem = items[nextIndex];

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Certificate showcase gallery. Use left and right arrow keys to navigate."
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative w-full select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/40 rounded-3xl"
    >
      {/* Top Meta Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan/15 text-cyan shadow-[0_0_15px_rgba(40,210,240,0.2)]">
            <Award className="h-4 w-4" />
          </span>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-cyan">
              {current.issuer}
            </p>
            <p className="font-mono text-[11px] text-[#5D6C8C]">
              {current.category} · {current.year}
            </p>
          </div>
        </div>

        {/* Live Index Counter & Arrow Controls */}
        <div className="flex items-center gap-3">
          <span aria-live="polite" className="font-mono text-sm tracking-wider text-[#F2E0DC]">
            <span className="text-cyan font-bold">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="text-dim"> / {String(total).padStart(2, "0")}</span>
          </span>

          <div className="flex items-center gap-1 rounded-2xl border border-foreground/10 bg-surface/80 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={`Previous certificate: ${prevItem.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-foreground/80 hover:bg-foreground/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={`Next certificate: ${nextItem.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-foreground/80 hover:bg-foreground/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Carousel Surface */}
      <div
        className="relative flex w-full items-center justify-center overflow-hidden py-4 cursor-grab active:cursor-grabbing touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Previous Side Preview (Desktop only) */}
        {total > 1 && (
          <div
            onClick={(e) => {
              if (hasDraggedRef.current) return;
              handlePrev();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handlePrev();
              }
            }}
            aria-label={`View previous certificate: ${prevItem.title}`}
            style={{
              transform: `translateX(${Math.min(0, dragOffset * 0.25)}px) scale(${
                0.9 + (dragOffset > 0 ? Math.min(0.08, dragOffset * 0.0006) : 0)
              })`,
              opacity: 0.35 + (dragOffset > 0 ? Math.min(0.4, dragOffset * 0.003) : 0),
              transition: isDragging
                ? "none"
                : "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms ease",
            }}
            className="hidden lg:block absolute left-[-6%] w-[38%] max-w-[420px] cursor-pointer z-0 blur-[1px] hover:blur-0"
          >
            <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-[#090A0D]/90 p-2 shadow-2xl">
              <img
                src={prevItem.displayImage}
                alt=""
                className="aspect-[1.4] w-full rounded-xl object-contain"
              />
            </div>
          </div>
        )}

        {/* Central Active Certificate Card */}
        <div
          style={{
            transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.015}deg)`,
            transition: isDragging
              ? "none"
              : "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms ease",
          }}
          className="relative z-10 w-full max-w-[860px]"
        >
          <div
            onClick={(e) => {
              // Prevent click opening modal if user just completed a drag gesture
              if (hasDraggedRef.current) {
                e.stopPropagation();
                return;
              }
              onOpenViewer(current);
            }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-foreground/15 bg-gradient-to-b from-[#151626]/90 to-[#090A0D]/95 p-3 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-cyan/40 hover:shadow-[0_20px_60px_rgba(40,210,240,0.12)] cursor-pointer"
          >
            {/* Certificate Canvas Frame */}
            <div className="relative flex aspect-[1.4] w-full items-center justify-center overflow-hidden rounded-2xl bg-black/60 p-2 sm:p-4">
              <img
                src={current.displayImage}
                alt={current.title}
                draggable={false}
                className="h-full w-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.015]"
              />

              {/* View Fullscreen Overlay Pill */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                <span className="flex items-center gap-2 rounded-full border border-cyan/40 bg-[#090A0D]/90 px-4 py-2 font-mono text-xs font-semibold text-cyan shadow-xl backdrop-blur-md">
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Inspect Fullscreen</span>
                </span>
              </div>
            </div>

            {/* Certificate Information Bar */}
            <div className="mt-4 flex flex-col justify-between gap-4 border-t border-foreground/10 pt-4 sm:flex-row sm:items-center px-1">
              <div className="min-w-0">
                <h3 className="truncate font-serif text-lg font-bold tracking-tight text-[#F2E0DC] sm:text-xl">
                  {current.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-[#5D6C8C]">
                  {current.issuer} {current.date ? `· ${current.date}` : ""}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex shrink-0 items-center gap-2">
                {current.documentPath && (
                  <a
                    href={current.documentPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (hasDraggedRef.current) {
                        e.preventDefault();
                        return;
                      }
                      e.stopPropagation();
                    }}
                    aria-label={`Open original document for ${current.title}`}
                    className="flex items-center gap-1.5 rounded-xl border border-foreground/10 bg-surface/90 px-3 py-1.5 font-mono text-xs text-foreground/80 hover:border-foreground/30 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                  >
                    <FileText className="h-3.5 w-3.5 text-dim" />
                    <span className="hidden sm:inline">Document</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    if (hasDraggedRef.current) {
                      e.preventDefault();
                      return;
                    }
                    e.stopPropagation();
                    onOpenViewer(current);
                  }}
                  aria-label={`View ${current.title} in fullscreen lightbox`}
                  className="flex items-center gap-1.5 rounded-xl border border-cyan/40 bg-cyan/10 px-3 py-1.5 font-mono text-xs font-semibold text-cyan hover:bg-cyan/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Fullscreen</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Next Side Preview (Desktop only) */}
        {total > 1 && (
          <div
            onClick={(e) => {
              if (hasDraggedRef.current) return;
              handleNext();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleNext();
              }
            }}
            aria-label={`View next certificate: ${nextItem.title}`}
            style={{
              transform: `translateX(${Math.max(0, dragOffset * 0.25)}px) scale(${
                0.9 + (dragOffset < 0 ? Math.min(0.08, Math.abs(dragOffset) * 0.0006) : 0)
              })`,
              opacity: 0.35 + (dragOffset < 0 ? Math.min(0.4, Math.abs(dragOffset) * 0.003) : 0),
              transition: isDragging
                ? "none"
                : "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms ease",
            }}
            className="hidden lg:block absolute right-[-6%] w-[38%] max-w-[420px] cursor-pointer z-0 blur-[1px] hover:blur-0"
          >
            <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-[#090A0D]/90 p-2 shadow-2xl">
              <img
                src={nextItem.displayImage}
                alt=""
                className="aspect-[1.4] w-full rounded-xl object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
