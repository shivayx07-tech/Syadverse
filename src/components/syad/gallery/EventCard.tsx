import type { GalleryEvent } from "@/data/galleryArchive";
import { PhotoPlaceholderSlot } from "./PhotoPlaceholderSlot";
import {
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Quote,
  Clock,
  Camera,
} from "lucide-react";

interface EventCardProps {
  event: GalleryEvent;
  index: number;
  onOpenAlbum: (event: GalleryEvent, photoIndex?: number, mode?: "grid" | "viewer") => void;
}

export function EventCard({ event, index, onOpenAlbum }: EventCardProps) {
  // Desktop layout alternation: even index = content left, visual right; odd = reversed
  const isEven = index % 2 === 0;
  const isResearchInternship = event.id === "iit-kanpur-research-internship-2026";
  const hasPhotos = event.photos && event.photos.length > 0;
  const isLandscapeCover =
    hasPhotos &&
    (event.photos[0]?.aspectRatio === "16:9" ||
      event.photos[0]?.aspectRatio === "4:3" ||
      event.slots?.[0]?.aspectRatio === "16:9" ||
      event.slots?.[0]?.aspectRatio === "4:3");

  const handleCtaClick = () => {
    if (hasPhotos) {
      onOpenAlbum(event, 0, "grid");
    }
  };

  return (
    <article
      id={`event-${event.id}`}
      className="relative mb-16 md:mb-24 last:mb-8 scroll-mt-24 group"
    >
      {/* Central Timeline Spine Connection (Desktop) */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-[#5D6C8C]/35 via-[#5D6C8C]/20 to-transparent pointer-events-none" />

      {/* Central Timeline Node (Desktop) */}
      <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-20 items-center justify-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full border border-[#5D6C8C]/40 bg-[#090A0D] text-[#ACBDD4] shadow-[0_0_20px_rgba(93,108,140,0.3)] transition-transform duration-300 group-hover:scale-110 group-hover:border-[#ACBDD4]">
          <span className="font-mono text-xs font-semibold">{event.eventNumber}</span>
        </div>
      </div>

      {/* Mobile Timeline Node & Line */}
      <div className="md:hidden flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center h-8 w-8 rounded-full border border-[#5D6C8C]/40 bg-[#151626] text-[#ACBDD4] font-mono text-xs font-semibold shrink-0">
          {event.eventNumber}
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-[#5D6C8C]/40 to-transparent" />
      </div>

      {/* Main Grid Card Container */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center ${
          isEven ? "" : "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
        } ${isResearchInternship ? "bg-[#121422]/60 border border-[#5D6C8C]/25 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm" : ""}`}
      >
        {/* TEXT / STORYTELLING PANEL */}
        <div className={`flex flex-col ${isEven ? "md:pr-6" : "md:pl-6"}`}>
          {/* Metadata pill bar */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {/* Category */}
            <span className="inline-flex items-center gap-1 rounded-md border border-[#5D6C8C]/30 bg-[#151626]/70 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-[#ACBDD4]">
              {event.category}
            </span>

            {/* Date */}
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#5D6C8C]">
              <Calendar size={12} className="text-[#ACBDD4]/70" />
              {event.dateLabel || event.date}
            </span>

            {/* Location if present */}
            {event.location && (
              <span className="inline-flex items-center gap-1 font-mono text-xs text-[#5D6C8C]">
                <MapPin size={12} className="text-[#ACBDD4]/70" />
                {event.location}
              </span>
            )}
          </div>

          {/* Event Title */}
          <h3 className="font-serif text-[clamp(1.6rem,2.8vw,2.3rem)] font-normal leading-[1.08] tracking-tight text-[#F2E0DC] group-hover:text-[#FFFFFF] transition-colors">
            {event.title}
          </h3>

          {/* EDITORIAL QUOTE */}
          <div className="relative mt-5 pl-5 border-l-2 border-[#D9BACB]/50 py-1">
            <Quote
              size={14}
              className="absolute -left-2 -top-2 text-[#D9BACB]/40 fill-[#D9BACB]/10"
            />
            <p className="font-serif italic text-base md:text-lg leading-relaxed text-[#F2E0DC]/90">
              {event.quote}
            </p>
          </div>

          {/* Event Description */}
          <p className="mt-4 font-sans text-sm md:text-[15px] leading-relaxed text-[#8C96AE]">
            {event.description}
          </p>

          {/* Achievement or Special Detail Badge */}
          {event.achievement && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#D9BACB]/25 bg-[#D9BACB]/10 px-3.5 py-2 text-xs font-mono text-[#F2E0DC]">
              <ShieldCheck size={14} className="text-[#D9BACB] shrink-0" />
              <span>{event.achievement}</span>
            </div>
          )}

          {event.additionalDetail && (
            <p className="mt-2 font-mono text-xs text-[#5D6C8C]/90 italic">
              * {event.additionalDetail}
            </p>
          )}

          {/* PRIMARY INTERACTION CTA */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {hasPhotos ? (
              <>
                <button
                  onClick={handleCtaClick}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#ACBDD4]/40 bg-[#ACBDD4]/15 px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#F2E0DC] hover:bg-[#ACBDD4] hover:text-[#090A0D] hover:shadow-[0_0_20px_rgba(172,189,212,0.3)] transition-all duration-300"
                >
                  <span>VIEW FULL ALBUM</span>
                  <ArrowRight size={14} />
                </button>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#ACBDD4] bg-[#151626]/80 border border-[#5D6C8C]/30 px-3 py-2 rounded-xl">
                  <Camera size={13} className="text-[#ACBDD4]" />
                  <span>{event.photos.length} Photographs</span>
                </span>
              </>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-xl border border-[#5D6C8C]/25 bg-[#151626]/50 px-4 py-2 font-mono text-xs text-[#5D6C8C] cursor-default select-none">
                <Clock size={13} className="text-[#5D6C8C]" />
                <span className="tracking-wider uppercase">Photographs Coming Soon</span>
              </div>
            )}

            {isResearchInternship && (
              <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-[#D9BACB]/80">
                <Sparkles size={11} />
                Special Milestone Chapter
              </span>
            )}
          </div>
        </div>

        {/* VISUAL PANEL: EDITORIAL IMAGE / PLACEHOLDER SLOTS */}
        <div className="w-full">
          {isResearchInternship ? (
            /* Multi-slot Research Deep-dive composition */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <PhotoPlaceholderSlot
                  isPrimary
                  aspectRatio="16:9"
                  label={event.slots?.[0]?.label || "Research Lab & Workstation"}
                  captionPlaceholder={
                    event.slots?.[0]?.captionPlaceholder ||
                    "AI/ML model experimentation at Rajeev Motwani Building"
                  }
                  imageSrc={event.coverImage || event.photos?.[0]?.url}
                  altText={event.title}
                  onClick={() => onOpenAlbum(event, 0, "grid")}
                />
              </div>
              <PhotoPlaceholderSlot
                aspectRatio="4:3"
                label={event.slots?.[1]?.label || "Academic Campus Horizon"}
                captionPlaceholder={
                  event.slots?.[1]?.captionPlaceholder ||
                  "Campus grounds & Department of Computer Science"
                }
                imageSrc={event.photos?.[1]?.url}
                altText={event.photos?.[1]?.alt || "Campus grounds"}
                onClick={() => onOpenAlbum(event, 1, "viewer")}
              />
              <PhotoPlaceholderSlot
                aspectRatio="4:3"
                label={event.slots?.[2]?.label || "Internship Milestones"}
                captionPlaceholder={
                  event.slots?.[2]?.captionPlaceholder ||
                  "Formal research review & certificate reception"
                }
                imageSrc={event.photos?.[2]?.url}
                altText={event.photos?.[2]?.alt || "Internship milestones"}
                badgeText={
                  event.photos && event.photos.length > 3
                    ? `+${event.photos.length - 3} More`
                    : undefined
                }
                onClick={() =>
                  event.photos && event.photos.length > 3
                    ? onOpenAlbum(event, 0, "grid")
                    : onOpenAlbum(event, 2, "viewer")
                }
              />
            </div>
          ) : hasPhotos && event.photos.length > 1 ? (
            /* MULTI-PHOTO EVENT DISPLAY */
            isLandscapeCover ? (
              /* Landscape Cover Layout (e.g. Google DevFest: 16:9 cover top + 2 supporting previews beneath) */
              <div className="flex flex-col gap-3">
                {/* Prominent Full-Width Cover Photograph */}
                <PhotoPlaceholderSlot
                  isPrimary
                  aspectRatio={
                    event.slots?.[0]?.aspectRatio || event.photos[0]?.aspectRatio || "16:9"
                  }
                  label={event.slots?.[0]?.label || "Official Event Cover"}
                  imageSrc={event.coverImage || event.photos[0]?.url}
                  altText={event.title}
                  onClick={() => onOpenAlbum(event, 0, "grid")}
                />

                {/* Supporting Previews (side-by-side beneath) */}
                <div className="grid grid-cols-2 gap-3">
                  <PhotoPlaceholderSlot
                    aspectRatio={
                      event.slots?.[1]?.aspectRatio || event.photos[1]?.aspectRatio || "4:3"
                    }
                    label={event.slots?.[1]?.label || "Session Preview"}
                    imageSrc={event.photos[1]?.url}
                    altText={event.photos[1]?.alt || "Session Preview"}
                    onClick={() => onOpenAlbum(event, 1, "viewer")}
                  />
                  <PhotoPlaceholderSlot
                    aspectRatio={
                      event.slots?.[2]?.aspectRatio || event.photos[2]?.aspectRatio || "4:3"
                    }
                    label={event.slots?.[2]?.label || "Session Preview"}
                    imageSrc={event.photos[2]?.url}
                    altText={event.photos[2]?.alt || "Session Preview"}
                    badgeText={
                      event.photos.length > 3 ? `+${event.photos.length - 3} More` : undefined
                    }
                    onClick={() =>
                      event.photos.length > 3
                        ? onOpenAlbum(event, 0, "grid")
                        : onOpenAlbum(event, 2, "viewer")
                    }
                  />
                </div>
              </div>
            ) : (
              /* Portrait / Square Cover Layout (e.g. TRIPS 2025, CyberXplore: 5-col asymmetrical) */
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {/* 1 Prominent Cover Photograph */}
                <div className="sm:col-span-3">
                  <PhotoPlaceholderSlot
                    isPrimary
                    aspectRatio={
                      event.slots?.[0]?.aspectRatio || event.photos[0]?.aspectRatio || "3:4"
                    }
                    label={event.slots?.[0]?.label || "Official Cover"}
                    imageSrc={event.coverImage || event.photos[0]?.url}
                    altText={event.title}
                    onClick={() => onOpenAlbum(event, 0, "grid")}
                  />
                </div>

                {/* Supporting Preview Stacks (max 2) */}
                <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-1 gap-3">
                  <PhotoPlaceholderSlot
                    aspectRatio={
                      event.slots?.[1]?.aspectRatio || event.photos[1]?.aspectRatio || "4:3"
                    }
                    label={event.slots?.[1]?.label || "Session Preview"}
                    imageSrc={event.photos[1]?.url}
                    altText={event.photos[1]?.alt || "Session Preview"}
                    onClick={() => onOpenAlbum(event, 1, "viewer")}
                  />
                  <PhotoPlaceholderSlot
                    aspectRatio={
                      event.slots?.[2]?.aspectRatio || event.photos[2]?.aspectRatio || "4:3"
                    }
                    label={event.slots?.[2]?.label || "Session Preview"}
                    imageSrc={event.photos[2]?.url}
                    altText={event.photos[2]?.alt || "Session Preview"}
                    badgeText={
                      event.photos.length > 3 ? `+${event.photos.length - 3} More` : undefined
                    }
                    onClick={() =>
                      event.photos.length > 3
                        ? onOpenAlbum(event, 0, "grid")
                        : onOpenAlbum(event, 2, "viewer")
                    }
                  />
                </div>
              </div>
            )
          ) : event.slots && event.slots.length > 1 ? (
            /* Multi-slot composition (placeholder) */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <PhotoPlaceholderSlot
                  isPrimary
                  aspectRatio={event.slots[0].aspectRatio}
                  label={event.slots[0].label}
                  captionPlaceholder={event.slots[0].captionPlaceholder}
                  imageSrc={event.coverImage || event.photos?.[0]?.url}
                  altText={event.title}
                  onClick={() => onOpenAlbum(event, 0, "viewer")}
                />
              </div>
              <div className="sm:col-span-1">
                <PhotoPlaceholderSlot
                  aspectRatio={event.slots[1].aspectRatio}
                  label={event.slots[1].label}
                  captionPlaceholder={event.slots[1].captionPlaceholder}
                  imageSrc={event.photos?.[1]?.url}
                  altText={event.slots[1].label}
                  onClick={() => onOpenAlbum(event, 1, "viewer")}
                />
              </div>
            </div>
          ) : (
            /* Single featured image slot */
            <PhotoPlaceholderSlot
              isPrimary
              aspectRatio={event.slots?.[0]?.aspectRatio || "16:9"}
              label={event.slots?.[0]?.label || "Cover Image"}
              captionPlaceholder={
                event.slots?.[0]?.captionPlaceholder ||
                "Authentic photographs from this event will be archived here."
              }
              imageSrc={event.coverImage || event.photos?.[0]?.url}
              altText={event.title}
              onClick={() => onOpenAlbum(event, 0, "viewer")}
            />
          )}
        </div>
      </div>
    </article>
  );
}
