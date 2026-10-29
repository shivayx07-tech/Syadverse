import { useEffect, useState, useRef } from "react";

const TARGET_LETTERS = ["S", "Y", "A", "D", "V", "E", "R", "S", "E"];
const GLYPH_POOL = ["0", "1", "∑", "∆", "λ", "◈", "§", "X", "7", "Z", "ψ", "Ω"];

interface WordmarkCompileProps {
  reduced?: boolean;
  onSweep?: () => void;
}

type Phase = "init" | "scanning" | "compiling" | "sweep" | "settled";

export function WordmarkCompile({ reduced = false, onSweep }: WordmarkCompileProps) {
  // Initial state renders the full wordmark so static SSR and no-JS visitors see the title immediately
  const [phase, setPhase] = useState<Phase>("settled");
  const [letters, setLetters] = useState<{ char: string; resolved: boolean }[]>(() =>
    TARGET_LETTERS.map((char) => ({
      char,
      resolved: true,
    })),
  );

  const sweptRef = useRef(false);

  useEffect(() => {
    // If reduced motion is requested, remain settled with no motion
    if (reduced) {
      setPhase("settled");
      setLetters(TARGET_LETTERS.map((char) => ({ char, resolved: true })));
      return;
    }

    // Client-side initialization for live compilation animation
    setPhase("init");
    setLetters(TARGET_LETTERS.map(() => ({ char: "·", resolved: false })));

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: Small technical scan line begins across the region (80ms)
    timers.push(
      setTimeout(() => {
        setPhase("scanning");
      }, 80),
    );

    // Phase 2: Sequential letter-by-letter compilation begins (320ms)
    timers.push(
      setTimeout(() => {
        setPhase("compiling");
      }, 320),
    );

    TARGET_LETTERS.forEach((targetChar, index) => {
      const startDelay = 340 + index * 75;

      // Glyph cycling steps (faint code-like glyphs briefly cycling)
      const cycles = 3;
      for (let c = 0; c < cycles; c++) {
        timers.push(
          setTimeout(
            () => {
              setLetters((prev) => {
                const updated = [...prev];
                const randomGlyph =
                  GLYPH_POOL[Math.floor(Math.random() * GLYPH_POOL.length)] ?? "0";
                updated[index] = { char: randomGlyph, resolved: false };
                return updated;
              });
            },
            startDelay + c * 38,
          ),
        );
      }

      // Final lock into true clean letter
      timers.push(
        setTimeout(
          () => {
            setLetters((prev) => {
              const updated = [...prev];
              updated[index] = { char: targetChar, resolved: true };
              return updated;
            });
          },
          startDelay + cycles * 38,
        ),
      );
    });

    // Phase 3: Soft light sweep once all letters lock in (~1120ms)
    const sweepTime = 340 + TARGET_LETTERS.length * 75 + 130;
    timers.push(
      setTimeout(() => {
        setPhase("sweep");
        if (!sweptRef.current) {
          sweptRef.current = true;
          onSweep?.();
        }
      }, sweepTime),
    );

    // Phase 4: Final settled state where title remains stable (~1850ms)
    timers.push(
      setTimeout(() => {
        setPhase("settled");
      }, sweepTime + 700),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [reduced, onSweep]);

  return (
    <span className={`wordmark-compile-container phase-${phase}`} aria-label="SYADVERSE">
      {/* Sci-Fi Horizontal Laser Flares */}
      <span className="wordmark-flare wordmark-flare-left" aria-hidden="true" />
      <span className="wordmark-flare wordmark-flare-right" aria-hidden="true" />

      {/* Restrained Scan Line (Phase 1 / Scanning) */}
      {phase === "scanning" && <span className="wordmark-scanline" aria-hidden="true" />}

      {/* Light Sweep (Single soft blue-to-lavender sweep across completed letters) */}
      {(phase === "sweep" || phase === "settled") && (
        <span
          className={`wordmark-light-sweep ${phase === "sweep" ? "is-sweeping" : ""}`}
          aria-hidden="true"
        />
      )}

      {/* Selectable, Animated Letter Slots with Zero Layout Shift */}
      <span className="wordmark-letters-slot" aria-hidden="true">
        {letters.map((item, idx) => (
          <span
            key={idx}
            className={`wordmark-char-slot ${item.resolved ? "is-resolved" : "is-compiling"}`}
          >
            {item.char}
          </span>
        ))}
      </span>

      {/* Screen-reader friendly semantic text */}
      <span className="sr-only">SYADVERSE</span>
    </span>
  );
}
