import { useState, useMemo, useRef, useEffect, type ReactNode } from "react";
import {
  certificatesArchive,
  certificateCategories,
  type CertificateCategory,
  type CertificateItem,
} from "@/data/certificatesArchive";
import { CertificateFilters } from "./CertificateFilters";
import { CertificateCarousel } from "./CertificateCarousel";
import { CertificateThumbnailStrip } from "./CertificateThumbnailStrip";
import { CertificateViewerModal } from "./CertificateViewerModal";

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e?.isIntersecting && (r.current?.classList.add("in"), io.disconnect()),
      { threshold: 0.12 },
    );
    if (r.current) io.observe(r.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={r} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function CertificatesSection() {
  const [activeCategory, setActiveCategory] = useState<CertificateCategory>("All");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedItemForModal, setSelectedItemForModal] = useState<CertificateItem | null>(null);

  // Compute category counts dynamically from archive data
  const categoryCounts = useMemo(() => {
    const counts: Record<CertificateCategory, number> = {
      All: certificatesArchive.length,
      "AI & Machine Learning": 0,
      "Space Science & Research": 0,
      "Cloud, Data & DevOps": 0,
      Cybersecurity: 0,
      "Hackathons & Competitions": 0,
      "Development & Workshops": 0,
    };

    certificatesArchive.forEach((cert) => {
      if (counts[cert.category] !== undefined) {
        counts[cert.category]++;
      }
    });

    return counts;
  }, []);

  // Filtered items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return certificatesArchive;
    }
    return certificatesArchive.filter((cert) => cert.category === activeCategory);
  }, [activeCategory]);

  // Safely clamp activeIndex when filtered collection changes
  const safeActiveIndex = Math.min(activeIndex, Math.max(0, filteredItems.length - 1));

  const handleSelectCategory = (category: CertificateCategory) => {
    setActiveCategory(category);
    setActiveIndex(0);
  };

  const handlePrev = () => {
    if (filteredItems.length === 0) return;
    const nextIdx = (safeActiveIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveIndex(nextIdx);
    if (selectedItemForModal) {
      setSelectedItemForModal(filteredItems[nextIdx]);
    }
  };

  const handleNext = () => {
    if (filteredItems.length === 0) return;
    const nextIdx = (safeActiveIndex + 1) % filteredItems.length;
    setActiveIndex(nextIdx);
    if (selectedItemForModal) {
      setSelectedItemForModal(filteredItems[nextIdx]);
    }
  };

  return (
    <section id="certificates" className="relative px-6 py-24 md:py-36 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[900px] rounded-full bg-cyan/5 blur-[140px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[400px] w-[600px] rounded-full bg-violet/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <Reveal className="mb-12 max-w-3xl">
          <p className="eyebrow">07 · ACHIEVEMENTS / VERIFIED JOURNEY</p>
          <h2 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-tight text-[#F2E0DC]">
            Proof of the Journey.
          </h2>
          <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-[#5D6C8C]">
            A collection of certifications, achievements, and milestones reflecting continuous
            learning, technical exploration, and professional growth.
          </p>
        </Reveal>

        {/* Category Filters */}
        <CertificateFilters
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          categoryCounts={categoryCounts}
        />

        {/* Swipe Carousel */}
        <CertificateCarousel
          items={filteredItems}
          activeIndex={safeActiveIndex}
          onIndexChange={setActiveIndex}
          onOpenViewer={(item) => setSelectedItemForModal(item)}
        />

        {/* Refined Thumbnail Navigation Strip */}
        <CertificateThumbnailStrip
          items={filteredItems}
          activeIndex={safeActiveIndex}
          onSelect={setActiveIndex}
        />
      </div>

      {/* Fullscreen Lightbox Modal */}
      <CertificateViewerModal
        item={selectedItemForModal}
        isOpen={selectedItemForModal !== null}
        onClose={() => setSelectedItemForModal(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        currentIndex={safeActiveIndex}
        totalCount={filteredItems.length}
      />
    </section>
  );
}

// Alias for seamless backward compatibility with existing imports
export const Certificates = CertificatesSection;
