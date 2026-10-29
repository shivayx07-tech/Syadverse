import { useEffect, useState, useRef, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import type { CertificateItem } from "@/data/certificatesArchive";

interface CertificateViewerModalProps {
  item: CertificateItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCount: number;
}

export function CertificateViewerModal({
  item,
  isOpen,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}: CertificateViewerModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);

  // Reset zoom when item changes or modal closes
  useEffect(() => {
    setZoomLevel(1);
  }, [item?.id, isOpen]);

  // Touch swipe handling in modal (when zoom is 1x)
  const handleModalTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel > 1) return;
    touchStartPosRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleModalTouchEnd = (e: React.TouchEvent) => {
    if (zoomLevel > 1 || !touchStartPosRef.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartPosRef.current.x;
    const deltaY = touchEndY - touchStartPosRef.current.y;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        onNext();
      } else {
        onPrev();
      }
    }
    touchStartPosRef.current = null;
  };

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setZoomLevel((z) => Math.min(z + 0.5, 2.5));
      } else if (e.key === "-") {
        e.preventDefault();
        setZoomLevel((z) => Math.max(z - 0.5, 1));
      } else if (e.key === "0") {
        e.preventDefault();
        setZoomLevel(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  const toggleZoom = useCallback(() => {
    setZoomLevel((prev) => (prev === 1 ? 1.75 : prev === 1.75 ? 2.5 : 1));
  }, []);

  if (!isOpen || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate viewer: ${item.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-xl bg-black/90 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative flex h-full max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-foreground/15 bg-[#090A0D]/95 shadow-[0_0_60px_rgba(0,0,0,0.85)]"
      >
        {/* Top Header Bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-foreground/10 px-5 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan/15 text-cyan">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div className="truncate">
              <p className="font-mono text-[11px] tracking-wider uppercase text-cyan">
                {item.issuer}
              </p>
              <h3 className="truncate font-sans text-sm font-semibold text-[#F2E0DC] sm:text-base">
                {item.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center rounded-xl border border-foreground/10 bg-foreground/5 p-0.5">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(z - 0.5, 1))}
                disabled={zoomLevel <= 1}
                aria-label="Zoom out"
                className="rounded-lg p-1.5 text-dim hover:text-white disabled:opacity-30"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="px-2 font-mono text-[10px] text-foreground/70">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(z + 0.5, 2.5))}
                disabled={zoomLevel >= 2.5}
                aria-label="Zoom in"
                className="rounded-lg p-1.5 text-dim hover:text-white disabled:opacity-30"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>

            {/* Position indicator */}
            <span className="hidden md:inline-block font-mono text-xs text-[#5D6C8C] px-2">
              {String(currentIndex + 1).padStart(2, "0")} / {String(totalCount).padStart(2, "0")}
            </span>

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close certificate viewer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/15 bg-surface text-foreground/80 hover:border-foreground/30 hover:bg-foreground/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area with Swipe Support */}
        <div
          onTouchStart={handleModalTouchStart}
          onTouchEnd={handleModalTouchEnd}
          className="relative flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-[#090A0D]"
        >
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous certificate"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-2xl border border-foreground/15 bg-black/70 text-foreground/80 backdrop-blur-md hover:border-cyan/50 hover:bg-black/90 hover:text-cyan transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next certificate"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-2xl border border-foreground/15 bg-black/70 text-foreground/80 backdrop-blur-md hover:border-cyan/50 hover:bg-black/90 hover:text-cyan transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Certificate Image Frame */}
          <div
            onClick={toggleZoom}
            className={`relative max-h-full max-w-full cursor-zoom-in transition-transform duration-200 select-none ${
              zoomLevel > 1 ? "cursor-grab" : ""
            }`}
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "center center",
            }}
          >
            <img
              src={item.displayImage}
              alt={item.title}
              className="max-h-[62vh] w-auto max-w-full rounded-xl object-contain shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>

        {/* Bottom Details Tray */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-foreground/10 bg-[#151626]/80 px-6 py-4 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            {item.date && (
              <div>
                <span className="font-mono text-[10px] uppercase text-[#5D6C8C]">Issued</span>
                <p className="font-mono text-foreground/90">{item.date}</p>
              </div>
            )}
            {item.credentialId && (
              <div>
                <span className="font-mono text-[10px] uppercase text-[#5D6C8C]">
                  Credential ID
                </span>
                <p className="font-mono text-cyan truncate max-w-[200px]">{item.credentialId}</p>
              </div>
            )}
            {item.category && (
              <div>
                <span className="font-mono text-[10px] uppercase text-[#5D6C8C]">Category</span>
                <p className="font-mono text-[#D9BACB]">{item.category}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {item.documentPath && (
              <a
                href={item.documentPath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-surface px-3 py-1.5 text-xs font-mono text-[#F2E0DC] hover:border-foreground/30 hover:bg-foreground/10 transition-colors"
              >
                <FileText className="h-3.5 w-3.5 text-dim" />
                <span>Original Document</span>
              </a>
            )}

            {item.verificationUrl && (
              <a
                href={item.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-xs font-mono text-cyan hover:bg-cyan/20 transition-colors"
              >
                <span>Verify Credential</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
