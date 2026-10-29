import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { warp } from "./Starfield";
import introLogo from "@/assets/syadverse-intro-logo.jpg";

interface IntroProps {
  onEnter: () => void;
}

export function Intro({ onEnter }: IntroProps) {
  const [leaving, setLeaving] = useState(false);
  const completedRef = useRef(false);
  const safetyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sequenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Smooth dismiss & transition into the Syadverse home page
  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;

    if (sequenceTimerRef.current) {
      clearTimeout(sequenceTimerRef.current);
      sequenceTimerRef.current = null;
    }
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }

    // Cosmic starfield ease handoff from logo reveal into hero universe
    warp.v = 0.55;
    const startTime = performance.now();
    const easeWarp = (now: number) => {
      const elapsed = (now - startTime) / 800;
      if (elapsed < 1) {
        warp.v = 0.55 * (1 - elapsed);
        requestAnimationFrame(easeWarp);
      } else {
        warp.v = 0;
      }
    };
    requestAnimationFrame(easeWarp);

    setLeaving(true);
    setTimeout(() => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
      onEnter();
    }, 700);
  };

  const skip = () => {
    finish();
  };

  useEffect(() => {
    // 1. Accessibility: reduced motion check bypasses intro immediately
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      onEnter();
      return;
    }

    // 2. Lock body scroll during intro playback
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    // 3. Keyboard navigation: Escape key immediately skips intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        skip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // 4. Exact Cinematic Storyboard Timeline:
    //    Phase 1: 0.0 - 0.6s Cosmic Void
    //    Phase 2: 0.6 - 1.8s Logo Emerges (scale & opacity ease)
    //    Phase 3: 1.8 - 3.2s Cosmic Light Pass (starlight shimmer sweep)
    //    Phase 4: 3.2 - 4.1s Signature Reveal (settled logo & tagline pause)
    //    Phase 5: 4.1 - 4.8s Smooth transition handoff into Syadverse Home Page
    sequenceTimerRef.current = setTimeout(() => {
      finish();
    }, 4150);

    // 5. Emergency safety fallback: guarantees user is never stuck
    safetyTimeoutRef.current = setTimeout(() => {
      finish();
    }, 5800);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (sequenceTimerRef.current) {
        clearTimeout(sequenceTimerRef.current);
      }
      if (safetyTimeoutRef.current) {
        clearTimeout(safetyTimeoutRef.current);
      }
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Syadverse cinematic logo introduction"
      className={`fixed inset-0 z-50 flex items-center justify-center intro-backdrop transition-opacity duration-700 ease-out select-none ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Subtle, accessible Skip Intro control */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20">
        <Button
          variant="ghost"
          onClick={skip}
          className="group flex items-center gap-2 rounded-full border border-[#5D6C8C]/40 bg-[#151626]/75 px-4 py-2 font-mono text-xs tracking-widest text-[#ACBDD4] backdrop-blur-md transition-all hover:border-[#8ecedb]/60 hover:bg-[#151626]/95 hover:text-[#F2E0DC] focus-visible:ring-2 focus-visible:ring-[#8ecedb] focus-visible:outline-none min-h-[44px]"
          aria-label="Skip cinematic introduction and enter Syadverse"
        >
          <span>SKIP INTRO</span>
          <ArrowRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-0.5 text-[#8ecedb]"
            aria-hidden
          />
        </Button>
      </div>

      {/* Main Cinematic Logo Stage */}
      <div className="relative w-full max-w-[min(84vw,520px)] aspect-square flex items-center justify-center p-4 md:p-6">
        {/* Soft Cosmic Ambient Glow behind Logo */}
        <div className="intro-ambient-glow" aria-hidden="true" />

        {/* Exact Authentic Syadverse Logo Image */}
        <img
          src={introLogo}
          alt="Syadverse — Explore • Build • Evolve"
          width={1024}
          height={1024}
          fetchPriority="high"
          decoding="sync"
          onError={() => {
            console.warn(
              "[Syadverse Intro] Logo image failed to load; gracefully entering portfolio.",
            );
            finish();
          }}
          className="intro-logo-artwork relative z-10 w-full h-full object-contain pointer-events-none select-none"
        />

        {/* Restrained Cosmic Starlight Sweep across Logo */}
        <div className="intro-light-sweep-container z-20" aria-hidden="true">
          <div className="intro-light-sweep" />
        </div>
      </div>

      {/* Subtle Cosmic Branding Marker */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.25em] text-[#5D6C8C]/70 uppercase"
        aria-hidden
      >
        <span>Syadverse // Personal Universe</span>
      </div>
    </div>
  );
}
