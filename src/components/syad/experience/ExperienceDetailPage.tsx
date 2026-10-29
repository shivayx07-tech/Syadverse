import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Building2,
  UserCheck,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  Download,
  ZoomIn,
  ShieldCheck,
} from "lucide-react";
import type { ExperienceMission, EvidenceDocument } from "@/data/experienceArchive";
import { getAdjacentExperiences } from "@/data/experienceArchive";
import { ExperienceCoverGraphic } from "./ExperienceCoverGraphic";
import { ImageLightbox } from "./ImageLightbox";
import { EvidenceViewerModal } from "./EvidenceViewerModal";

interface ExperienceDetailPageProps {
  mission: ExperienceMission;
}

export function ExperienceDetailPage({ mission }: ExperienceDetailPageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedEvidenceIndex, setSelectedEvidenceIndex] = useState<number | null>(null);
  const [evidenceCategory, setEvidenceCategory] = useState<string>("all");

  const { prev, next } = getAdjacentExperiences(mission.slug);

  const hueColor =
    mission.accentHue === "cyan"
      ? "var(--cyan)"
      : mission.accentHue === "magenta"
        ? "var(--magenta)"
        : "var(--violet)";

  const dateDisplay = mission.date || mission.duration;

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased">
      {/* Background stars / ambient gradient */}
      <div
        className="pointer-events-none fixed inset-0 opacity-25"
        style={{
          background: "radial-gradient(ellipse at 50% 10%, #151626 0%, #090A0D 70%)",
        }}
        aria-hidden
      />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            hash="experience"
            className="group inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            <span>BACK TO MISSION LOG</span>
          </Link>

          <div className="flex items-center gap-3">
            <span
              className="rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold"
              style={{
                borderColor: `color-mix(in oklab, ${hueColor} 40%, transparent)`,
                color: hueColor,
              }}
            >
              {mission.missionNumber}
            </span>
            <Link
              to="/"
              className="hidden sm:inline-block font-display text-xs font-bold tracking-widest text-dim hover:text-foreground uppercase transition-colors"
            >
              SYADVERSE ARCHIVE
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative mx-auto max-w-5xl px-6 py-12 md:py-20">
        {/* A. EXPERIENCE HERO */}
        <section aria-labelledby="mission-title" className="space-y-8">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="rounded-md border px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider"
              style={{
                borderColor: `color-mix(in oklab, ${hueColor} 50%, transparent)`,
                backgroundColor: "color-mix(in oklab, var(--surface) 60%, transparent)",
                color: hueColor,
              }}
            >
              {mission.missionNumber}
            </span>
            <span className="rounded-md border border-border/50 bg-surface/40 px-3 py-1 font-mono text-xs text-dim">
              {mission.category}
            </span>
          </div>

          {/* Title and Organization */}
          <div>
            <h1
              id="mission-title"
              className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-[1.1]"
            >
              {mission.title}
            </h1>
            <p className="mt-4 font-mono text-lg text-accent sm:text-xl">{mission.organization}</p>
          </div>

          {/* Key Facts Ribbon */}
          <div className="grid gap-4 rounded-xl border border-border/40 bg-surface/40 p-4 sm:grid-cols-3 sm:p-5">
            {mission.role && (
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-dim">
                  <UserCheck size={16} />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-dim">Official Role</p>
                  <p className="text-xs font-semibold text-foreground">{mission.role}</p>
                </div>
              </div>
            )}

            {dateDisplay && (
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-dim">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-dim">Duration / Timeline</p>
                  <p className="text-xs font-semibold text-foreground">{dateDisplay}</p>
                </div>
              </div>
            )}

            {mission.location ? (
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-dim">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-dim">Location</p>
                  <p className="text-xs font-semibold text-foreground">{mission.location}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-dim">
                  <Building2 size={16} />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-dim">Category</p>
                  <p className="text-xs font-semibold text-foreground">{mission.category}</p>
                </div>
              </div>
            )}
          </div>

          {/* Featured Cover Photograph / Visual */}
          <div className="overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
            <ExperienceCoverGraphic mission={mission} variant="hero" />
          </div>

          {/* Short Introduction */}
          <div className="rounded-xl border-l-2 border-accent bg-surface/20 p-5 md:p-6">
            <p className="text-base text-foreground/90 leading-relaxed md:text-lg">
              {mission.shortDescription}
            </p>
          </div>
        </section>

        {/* B. OVERVIEW */}
        <section className="mt-16 border-t border-border/30 pt-12">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            ARCHIVAL CONTEXT & OVERVIEW
          </h2>
          <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed text-muted-foreground">
            <p>{mission.overview}</p>
            {mission.researchAssociation && (
              <div className="rounded-lg border border-border/40 bg-surface/30 p-4">
                <p className="font-mono text-xs text-dim">Research Association:</p>
                <p className="mt-1 font-semibold text-foreground">{mission.researchAssociation}</p>
              </div>
            )}
          </div>
        </section>

        {/* C. MY CONTRIBUTIONS / RESPONSIBILITIES */}
        <section className="mt-16 border-t border-border/30 pt-12">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            KEY RESPONSIBILITIES & CONTRIBUTIONS
          </h2>
          <div className="mt-6 grid gap-4">
            {mission.responsibilities.map((resp, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-border/30 bg-surface/40 p-5 transition-all hover:border-border/60 hover:bg-surface/70"
              >
                <span
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md font-mono text-xs font-bold"
                  style={{
                    backgroundColor: "color-mix(in oklab, var(--surface-2) 80%, transparent)",
                    color: hueColor,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm md:text-base leading-relaxed text-foreground/90">{resp}</p>
              </div>
            ))}
          </div>
        </section>

        {/* D. TECHNOLOGIES & TOOLS (Only verified) */}
        {mission.technologies && mission.technologies.length > 0 && (
          <section className="mt-16 border-t border-border/30 pt-12">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              VERIFIED TOOLS & METHODOLOGIES
            </h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {mission.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border/50 bg-surface/60 px-3.5 py-1.5 font-mono text-xs text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* E. OUTCOMES & LEARNING */}
        {mission.outcomes && mission.outcomes.length > 0 && (
          <section className="mt-16 border-t border-border/30 pt-12">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              OUTCOMES & PERSPECTIVES
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {mission.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border/30 bg-surface/30 p-5"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-success" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{outcome}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* F. RELATED MEMORIES / PHOTO GALLERY */}
        <section id="gallery-section" className="mt-16 border-t border-border/30 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {mission.slug === "iit-kanpur-research"
                  ? "MEMORIES FROM IIT KANPUR"
                  : mission.slug === "google-student-ambassador"
                    ? "MEMORIES & GALLERY"
                    : mission.slug === "ignishun-tech"
                      ? "MEMORIES FROM IGNISHUN TECH"
                      : mission.slug === "ai-career-guidance-seminar" ||
                          mission.slug === "matlab-workshop" ||
                          mission.slug === "cognitive-chaos-hackathon"
                        ? "MEMORIES & GALLERY"
                        : "RELATED MEMORIES & PHOTOGRAPHS"}
              </h2>
              <p className="mt-1 text-sm text-dim">
                {mission.slug === "ignishun-tech"
                  ? "A visual journey through my web development internship."
                  : mission.slug === "ai-career-guidance-seminar"
                    ? "Moments, people, and memories from the AI & Career Guidance Seminar."
                    : mission.slug === "matlab-workshop"
                      ? "Moments, people, and memories from the 2-Day MATLAB Workshop 2026."
                      : mission.slug === "cognitive-chaos-hackathon"
                        ? "Moments, people, and memories from Cognitive Chaos Hackathon 2026."
                        : mission.slug === "iit-kanpur-research" ||
                            mission.slug === "google-student-ambassador"
                          ? "Moments, experiences, and memories from my journey."
                          : "Authentic visual moments and documentation from this experience."}
              </p>
            </div>
            {mission.gallery.length > 0 && (
              <span className="font-mono text-xs text-dim">
                {mission.gallery.length} Photographs
              </span>
            )}
          </div>

          {mission.gallery.length > 0 ? (
            <div
              className={`mt-8 grid grid-cols-1 ${
                mission.gallery.length === 3 || mission.slug === "matlab-workshop"
                  ? "md:grid-cols-2 lg:grid-cols-3"
                  : "md:grid-cols-2"
              } gap-6`}
            >
              {mission.gallery.map((photo, index) => {
                const isWide =
                  photo.colSpan === 2 ||
                  (photo.colSpan === undefined &&
                    photo.aspectRatio === "landscape" &&
                    mission.gallery.length > 2);
                return (
                  <button
                    key={photo.id}
                    onClick={() => setLightboxIndex(index)}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-surface/60 text-left transition-all duration-300 hover:border-accent/40 hover:bg-surface/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent ${
                      isWide ? "md:col-span-2" : "md:col-span-1"
                    }`}
                  >
                    {/* Image canvas with neutral dark background — 100% full photograph, zero cropping */}
                    <div
                      className={`relative flex w-full items-center justify-center overflow-hidden bg-[#0a0b12] p-4 transition-colors group-hover:bg-[#07080e] ${
                        isWide
                          ? "h-[340px] sm:h-[420px] md:h-[500px]"
                          : "h-[380px] sm:h-[460px] md:h-[520px]"
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        className="max-h-full max-w-full h-auto w-auto object-contain transition-opacity duration-300"
                        loading="eager"
                      />
                      {/* Subtle expand indicator icon */}
                      <div className="absolute top-3 right-3 rounded-md border border-foreground/15 bg-background/80 px-2 py-1 font-mono text-[10px] tracking-wider text-dim opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                        OPEN
                      </div>
                    </div>

                    {/* Caption Bar */}
                    <div className="flex items-center justify-between gap-3 border-t border-border/30 bg-surface/80 px-5 py-3.5 backdrop-blur-sm">
                      <p className="text-xs md:text-sm font-medium text-foreground/90">
                        {photo.caption}
                      </p>
                      <span className="shrink-0 font-mono text-[10px] uppercase text-accent font-semibold tracking-wider">
                        FULL VIEW
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-border/40 bg-surface/20 p-8 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-surface-2 text-dim">
                <ImageIcon size={22} />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">Photograph Gallery Ready</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Authentic memory photographs from this experience will appear here as assets are
                integrated.
              </p>
            </div>
          )}
        </section>

        {/* G. SEPARATE CERTIFICATES & EVIDENCE VAULT */}
        <section id="evidence-section" className="mt-16 border-t border-border/30 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                CERTIFICATES & EVIDENCE
              </h2>
              <p className="mt-1 text-sm text-dim">
                {mission.slug === "google-student-ambassador"
                  ? "Recognizing milestones and documenting my journey as a Google Student Ambassador."
                  : mission.slug === "iit-kanpur-research"
                    ? "Verified milestones and documents from my research journey."
                    : mission.slug === "ai-career-guidance-seminar"
                      ? "Official certificate of appreciation recognizing leadership and organization of the seminar."
                      : mission.slug === "matlab-workshop"
                        ? "Official certificate of completion recognizing participation and numerical computing coursework."
                        : mission.slug === "cognitive-chaos-hackathon"
                          ? "Official certificate of appreciation recognizing participation and building at Cognitive Chaos Hackathon 2026."
                          : "The documents, recognitions, and artifacts that support this experience."}
              </p>
            </div>
            {mission.evidence.length > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1 font-mono text-xs text-success shrink-0 self-start sm:self-auto">
                <ShieldCheck size={14} />
                {mission.evidence.length === 1
                  ? "1 Verified Certificate"
                  : `${mission.evidence.length} Verified Documents`}
              </span>
            )}
          </div>

          {/* Category Filter Tabs */}
          {(() => {
            const categories = Array.from(
              new Set(mission.evidence.map((d) => d.category).filter(Boolean)),
            ) as string[];

            const filtered =
              evidenceCategory === "all"
                ? mission.evidence
                : mission.evidence.filter((d) => d.category === evidenceCategory);

            return (
              <>
                {categories.length > 1 && (
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setEvidenceCategory("all")}
                      className={`rounded-lg border px-3.5 py-1.5 font-mono text-xs font-medium transition-all ${
                        evidenceCategory === "all"
                          ? "border-accent bg-accent/15 text-accent shadow-sm"
                          : "border-border/40 bg-surface/40 text-dim hover:border-border hover:text-foreground"
                      }`}
                    >
                      All Documents ({mission.evidence.length})
                    </button>
                    {categories.map((cat) => {
                      const count = mission.evidence.filter((d) => d.category === cat).length;
                      return (
                        <button
                          key={cat}
                          onClick={() => setEvidenceCategory(cat)}
                          className={`rounded-lg border px-3.5 py-1.5 font-mono text-xs font-medium transition-all ${
                            evidenceCategory === cat
                              ? "border-accent bg-accent/15 text-accent shadow-sm"
                              : "border-border/40 bg-surface/40 text-dim hover:border-border hover:text-foreground"
                          }`}
                        >
                          {cat} ({count})
                        </button>
                      );
                    })}
                  </div>
                )}

                {filtered.length > 0 ? (
                  <div
                    className={
                      filtered.length === 1
                        ? "mt-8 max-w-2xl mx-auto w-full"
                        : "mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    }
                  >
                    {filtered.map((doc) => {
                      const originalIndex = mission.evidence.indexOf(doc);
                      return (
                        <div
                          key={doc.id}
                          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-surface/60 transition-all duration-300 hover:border-accent/40 hover:bg-surface/90 hover:shadow-xl"
                        >
                          {/* Card Top Meta */}
                          <div className="flex items-center justify-between gap-2 border-b border-border/30 bg-surface/80 px-5 py-3 backdrop-blur-sm">
                            <span className="rounded border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                              {doc.type}
                            </span>
                            {doc.verified && (
                              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-success">
                                <CheckCircle2 size={12} /> Verified Record
                              </span>
                            )}
                          </div>

                          {/* Document Canvas (100% full document without cropping) */}
                          <button
                            onClick={() => setSelectedEvidenceIndex(originalIndex)}
                            className="group/canvas relative flex min-h-[280px] sm:min-h-[320px] md:min-h-[360px] max-h-[460px] w-full items-center justify-center overflow-hidden bg-[#090A0D] p-4 transition-colors hover:bg-[#050608] focus:outline-none"
                            aria-label={`Inspect ${doc.title}`}
                          >
                            <img
                              src={doc.previewUrl || doc.fileUrl}
                              alt={doc.title}
                              className="max-h-[340px] max-w-full h-auto w-auto object-contain rounded border border-[#1e2336] shadow-lg transition-transform duration-300 group-hover/canvas:scale-[1.015]"
                              loading="eager"
                            />
                            {/* Inspect Badge on hover */}
                            <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-background/90 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-accent opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover/canvas:opacity-100 shadow-md">
                              <ZoomIn size={12} /> INSPECT & ZOOM
                            </div>
                          </button>

                          {/* Card Footer Details & Actions */}
                          <div className="flex flex-col gap-3 border-t border-border/30 bg-surface/80 p-5 backdrop-blur-sm">
                            <div>
                              <h3 className="font-display text-sm font-bold text-foreground line-clamp-1">
                                {doc.title}
                              </h3>
                              <p className="mt-1 font-mono text-xs text-dim line-clamp-1">
                                {[doc.issuer, doc.signatory].filter(Boolean).join(" • ")}
                              </p>
                              {doc.issueDate && (
                                <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                                  Dated: {doc.issueDate}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-2 pt-1 border-t border-border/20">
                              <button
                                onClick={() => setSelectedEvidenceIndex(originalIndex)}
                                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
                              >
                                <ZoomIn size={13} /> View Document
                              </button>
                              {doc.fileUrl && (
                                <a
                                  href={doc.fileUrl}
                                  download={doc.downloadName || `${doc.title}.jpg`}
                                  title="Download original file"
                                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border/50 bg-surface-2 text-foreground transition-colors hover:border-accent hover:text-accent"
                                >
                                  <Download size={14} />
                                </a>
                              )}
                              {doc.fileUrl && (
                                <a
                                  href={doc.fileUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  title="Open full size in new tab"
                                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border/50 bg-surface-2 text-foreground transition-colors hover:border-accent hover:text-accent"
                                >
                                  <ExternalLink size={14} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-6 rounded-xl border border-dashed border-border/40 bg-surface/20 p-8 text-center">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-surface-2 text-dim">
                      <FileText size={22} />
                    </div>
                    <p className="mt-3 text-sm font-medium text-foreground">
                      No documents found in this category
                    </p>
                  </div>
                )}
              </>
            );
          })()}
        </section>

        {/* H. PREVIOUS / NEXT MISSION NAVIGATION */}
        <nav
          aria-label="Mission navigation"
          className="mt-20 flex flex-col sm:flex-row items-stretch justify-between gap-4 border-t border-border/40 pt-10"
        >
          <Link
            to="/experience/$experienceId"
            params={{ experienceId: prev.slug }}
            className="group flex flex-1 items-center gap-4 rounded-xl border border-border/40 bg-surface/30 p-5 transition-all hover:border-border hover:bg-surface/70"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface-2 text-foreground transition-transform group-hover:-translate-x-1">
              <ArrowLeft size={18} />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase text-dim">
                Previous Mission // {prev.missionNumber}
              </p>
              <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                {prev.title}
              </p>
            </div>
          </Link>

          <Link
            to="/experience/$experienceId"
            params={{ experienceId: next.slug }}
            className="group flex flex-1 items-center justify-between gap-4 rounded-xl border border-border/40 bg-surface/30 p-5 text-right transition-all hover:border-border hover:bg-surface/70"
          >
            <div>
              <p className="font-mono text-[10px] uppercase text-dim">
                Next Mission // {next.missionNumber}
              </p>
              <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                {next.title}
              </p>
            </div>
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface-2 text-foreground transition-transform group-hover:translate-x-1">
              <ArrowRight size={18} />
            </div>
          </Link>
        </nav>
      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <ImageLightbox
          photos={mission.gallery}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          onNext={() =>
            setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % mission.gallery.length))
          }
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev === null ? 0 : (prev - 1 + mission.gallery.length) % mission.gallery.length,
            )
          }
        />
      )}

      {/* Evidence Viewer Modal */}
      <EvidenceViewerModal
        document={selectedEvidenceIndex !== null ? mission.evidence[selectedEvidenceIndex] : null}
        documents={mission.evidence}
        currentIndex={selectedEvidenceIndex ?? 0}
        isOpen={selectedEvidenceIndex !== null}
        onClose={() => setSelectedEvidenceIndex(null)}
        onNavigate={(idx) => setSelectedEvidenceIndex(idx)}
      />
    </div>
  );
}
