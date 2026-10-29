import { useState } from "react";
import { Camera, Sparkles, Image as ImageIcon } from "lucide-react";

interface PhotoPlaceholderSlotProps {
  imageSrc?: string;
  altText?: string;
  label?: string;
  aspectRatio?: "16:9" | "4:3" | "3:4" | "1:1" | "9:16" | "auto";
  captionPlaceholder?: string;
  onClick?: () => void;
  className?: string;
  isPrimary?: boolean;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  badgeText?: string;
}

export function PhotoPlaceholderSlot({
  imageSrc,
  altText = "Gallery event photograph",
  label = "Cover image slot",
  aspectRatio = "16:9",
  captionPlaceholder = "Authentic photographs from this event will be archived here.",
  onClick,
  className = "",
  isPrimary = false,
  objectFit = "contain",
  objectPosition = "center",
  badgeText,
}: PhotoPlaceholderSlotProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const aspectClass =
    aspectRatio === "16:9"
      ? "aspect-[16/9]"
      : aspectRatio === "4:3"
        ? "aspect-[4/3]"
        : aspectRatio === "3:4"
          ? "aspect-[3/4]"
          : aspectRatio === "9:16"
            ? "aspect-[9/16]"
            : aspectRatio === "1:1"
              ? "aspect-square"
              : "";

  const hasValidImage = imageSrc && imageSrc.trim() !== "" && !imageError;

  return (
    <div
      onClick={hasValidImage ? onClick : undefined}
      className={`relative group overflow-hidden rounded-2xl border transition-all duration-500 ${
        hasValidImage
          ? "cursor-pointer border-[#5D6C8C]/30 hover:border-[#ACBDD4]/60 hover:shadow-[0_12px_40px_-10px_rgba(93,108,140,0.25)]"
          : "border-[#5D6C8C]/20 hover:border-[#5D6C8C]/40"
      } bg-[#0c0e17] backdrop-blur-sm ${aspectClass} ${className}`}
    >
      {hasValidImage ? (
        <>
          <div className="relative w-full h-full flex items-center justify-center bg-[#07080f] overflow-hidden p-1 sm:p-1.5">
            <img
              src={imageSrc}
              alt={altText}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              style={{ objectPosition }}
              className={`max-h-full max-w-full w-auto h-auto object-contain transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#151626]/80 animate-pulse">
              <span className="font-mono text-xs text-[#ACBDD4]">Loading photo...</span>
            </div>
          )}

          {/* Badge Overlay (e.g. +2 more in album) */}
          {badgeText && (
            <div className="absolute inset-0 bg-[#090A0D]/65 backdrop-blur-[2px] flex items-center justify-center transition-colors group-hover:bg-[#090A0D]/50 z-10">
              <div className="rounded-xl border border-[#ACBDD4]/50 bg-[#151626]/90 px-3.5 py-2 text-center shadow-lg">
                <span className="font-mono text-xs font-semibold text-[#F2E0DC] block">
                  {badgeText}
                </span>
                <span className="font-mono text-[10px] text-[#ACBDD4] block mt-0.5">
                  View Full Album
                </span>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 z-20 pointer-events-none">
            <span className="font-mono text-xs text-[#F2E0DC] flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#ACBDD4]" />
              View full memory
            </span>
            {label && (
              <span className="font-mono text-[10px] text-[#ACBDD4]/90 uppercase tracking-wider bg-[#151626]/80 px-2 py-0.5 rounded border border-[#5D6C8C]/30">
                {label}
              </span>
            )}
          </div>
        </>
      ) : (
        /* Refined Editorial Placeholder Surface */
        <div className="absolute inset-0 flex flex-col justify-between p-5 select-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#181B2C] via-[#10121D] to-[#0A0B10]">
          {/* Subtle architectural grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#F2E0DC 1px, transparent 1px), linear-gradient(90deg, #F2E0DC 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Top meta strip */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#5D6C8C]/25 bg-[#151626]/70 px-2.5 py-1 text-[10px] font-mono tracking-wider text-[#ACBDD4]/90 uppercase backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ACBDD4]/70" />
              {label}
            </div>
            <span className="font-mono text-[10px] text-[#5D6C8C] tracking-widest uppercase">
              {aspectRatio}
            </span>
          </div>

          {/* Center editorial focal mark */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4 py-2">
            <div
              className={`grid place-items-center rounded-2xl border border-[#5D6C8C]/30 bg-[#151626]/80 text-[#ACBDD4]/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-transform duration-500 group-hover:scale-105 ${
                isPrimary ? "h-14 w-14" : "h-11 w-11"
              }`}
            >
              {isPrimary ? (
                <Camera size={22} strokeWidth={1.5} />
              ) : (
                <ImageIcon size={18} strokeWidth={1.5} />
              )}
            </div>

            <p className="mt-3 font-mono text-[11px] font-medium tracking-wider text-[#F2E0DC]/90 uppercase">
              Memories will appear here
            </p>
            <p className="mt-1 font-sans text-xs text-[#5D6C8C] max-w-[260px] leading-relaxed line-clamp-2">
              {captionPlaceholder}
            </p>
          </div>

          {/* Bottom subtle edge info */}
          <div className="relative z-10 flex items-center justify-between pt-2 border-t border-[#5D6C8C]/15">
            <span className="font-mono text-[9px] text-[#5D6C8C]/80 tracking-widest uppercase">
              Syadverse Visual Chronicle
            </span>
            <span className="font-mono text-[9px] text-[#5D6C8C]/70">UNPOPULATED ARCHIVE SLOT</span>
          </div>
        </div>
      )}
    </div>
  );
}
