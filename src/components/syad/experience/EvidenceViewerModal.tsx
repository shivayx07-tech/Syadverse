import { useEffect, useRef, useState, useCallback } from "react";
import {
  X,
  ExternalLink,
  FileText,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import type { EvidenceDocument } from "@/data/experienceArchive";

interface EvidenceViewerModalProps {
  document: EvidenceDocument | null;
  documents?: EvidenceDocument[];
  currentIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

export function EvidenceViewerModal({
  document: activeDoc,
  documents = [],
  currentIndex = 0,
  isOpen,
  onClose,
  onNavigate,
}: EvidenceViewerModalProps) {
  const [zoom, setZoom] = useState(1);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const doc = documents.length > 0 && currentIndex >= 0 ? documents[currentIndex] : activeDoc;
  const hasMultiple = documents.length > 1;

  // Reset zoom on document change or open
  useEffect(() => {
    setZoom(1);
  }, [currentIndex, isOpen]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.25, 2.5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.25, 1));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  const handleNext = useCallback(() => {
    if (!hasMultiple || !onNavigate) return;
    setZoom(1);
    onNavigate((currentIndex + 1) % documents.length);
  }, [hasMultiple, onNavigate, currentIndex, documents.length]);

  const handlePrev = useCallback(() => {
    if (!hasMultiple || !onNavigate) return;
    setZoom(1);
    onNavigate((currentIndex - 1 + documents.length) % documents.length);
  }, [hasMultiple, onNavigate, currentIndex, documents.length]);

  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = window.document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    const originalOverflow = window.document.body.style.overflow;
    window.document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight" && zoom === 1 && hasMultiple) {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" && zoom === 1 && hasMultiple) {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === "-") {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === "0") {
        e.preventDefault();
        handleResetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [
    isOpen,
    onClose,
    handleNext,
    handlePrev,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    zoom,
    hasMultiple,
  ]);

  if (!isOpen || !doc) return null;

  const isPdf = doc.fileUrl?.toLowerCase().endsWith(".pdf");
  const previewSource = doc.previewUrl || doc.fileUrl;
  const downloadHref = doc.fileUrl || doc.previewUrl || "#";
  const downloadFilename = doc.downloadName || `${doc.title.replace(/\s+/g, "_")}.jpg`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="evidence-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#07080e]/95 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative flex flex-col w-full max-w-5xl h-[94vh] overflow-hidden rounded-2xl border border-border/50 bg-[#0d0f18] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-border/40 bg-[#121422]/90 px-4 sm:px-6 py-3.5 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-accent">
              <FileText size={18} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
                  {doc.type}
                </span>
                {doc.verified && (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-success">
                    <ShieldCheck size={12} /> Verified Document
                  </span>
                )}
                {hasMultiple && (
                  <span className="font-mono text-[10px] text-dim">
                    {currentIndex + 1} / {documents.length}
                  </span>
                )}
              </div>
              <h3
                id="evidence-modal-title"
                className="mt-0.5 truncate font-display text-sm sm:text-base font-bold text-foreground"
              >
                {doc.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Direct Download in header */}
            <a
              href={downloadHref}
              download={downloadFilename}
              title="Download original file"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-surface-2 px-3 py-1.5 text-xs font-mono font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download</span>
            </a>

            {/* External link */}
            <a
              href={downloadHref}
              target="_blank"
              rel="noreferrer"
              title="Open full resolution in new tab"
              className="grid h-8 w-8 place-items-center rounded-lg border border-border/50 bg-surface-2 text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <ExternalLink size={14} />
            </a>

            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close document viewer"
              className="grid h-8 w-8 place-items-center rounded-full border border-border/40 text-foreground transition-colors hover:border-foreground/30 hover:bg-surface-2 hover:text-accent ml-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Central Document Canvas */}
        <div
          ref={containerRef}
          className="relative flex-1 overflow-auto bg-[#07080e] p-4 sm:p-6 flex items-center justify-center select-none"
        >
          {/* Navigation Arrows for multi-document viewing */}
          {hasMultiple && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous document"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full border border-border/50 bg-[#121422]/80 text-foreground backdrop-blur-md transition-all hover:border-accent hover:bg-accent/20 hover:text-accent hover:scale-105"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next document"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full border border-border/50 bg-[#121422]/80 text-foreground backdrop-blur-md transition-all hover:border-accent hover:bg-accent/20 hover:text-accent hover:scale-105"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Document Preview (100% full document, zero cropping, with zoom) */}
          <div
            className="flex items-center justify-center transition-transform duration-200 ease-out"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
            }}
          >
            {isPdf && doc.fileUrl ? (
              <iframe
                src={doc.fileUrl}
                title={doc.title}
                className="h-[68vh] w-[80vw] max-w-4xl rounded-lg border border-border/40 shadow-2xl"
              />
            ) : previewSource ? (
              <img
                src={previewSource}
                alt={doc.title}
                className="max-h-[70vh] w-auto max-w-full rounded-md border border-[#202538] shadow-2xl object-contain"
                style={{ imageRendering: "auto" }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center text-dim">
                <FileText size={40} />
                <p className="mt-3 text-sm">Document preview unavailable</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Controls & Metadata Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/40 bg-[#121422]/95 px-4 sm:px-6 py-3 shrink-0">
          {/* Metadata details */}
          <div className="min-w-0 text-center sm:text-left">
            <p className="text-xs font-medium text-foreground">
              {[doc.issuer, doc.signatory].filter(Boolean).join(" • ")}
            </p>
            <p className="font-mono text-[11px] text-dim">
              {doc.issueDate ? `Dated: ${doc.issueDate}` : ""}
              {doc.description ? ` — ${doc.description}` : ""}
            </p>
          </div>

          {/* Zoom controls & quick actions */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center rounded-lg border border-border/50 bg-surface-2 p-0.5">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                aria-label="Zoom out"
                className="grid h-7 w-7 place-items-center rounded text-foreground transition-colors hover:bg-accent/20 hover:text-accent disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground"
              >
                <ZoomOut size={14} />
              </button>
              <span className="font-mono text-[11px] font-semibold text-dim px-2">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 2.5}
                aria-label="Zoom in"
                className="grid h-7 w-7 place-items-center rounded text-foreground transition-colors hover:bg-accent/20 hover:text-accent disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground"
              >
                <ZoomIn size={14} />
              </button>
              {zoom !== 1 && (
                <button
                  onClick={handleResetZoom}
                  aria-label="Reset zoom"
                  className="grid h-7 w-7 place-items-center rounded text-foreground transition-colors hover:bg-accent/20 hover:text-accent ml-0.5 border-l border-border/30 pl-1"
                >
                  <RotateCcw size={12} />
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg border border-border/50 bg-surface-2 px-3.5 py-1.5 text-xs font-mono font-medium text-foreground transition-colors hover:bg-surface-2/80"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
