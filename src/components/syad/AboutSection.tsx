import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  GraduationCap,
  Sparkles,
  MapPin,
  Compass,
  Cpu,
  Layers,
  Flame,
  Landmark,
} from "lucide-react";
import shivaPortrait from "@/assets/shiva-portrait.jpg";
import collegeCampus from "@/assets/college-campus.jpg";
import schoolCampus from "@/assets/school-campus.jpg";
import academicUniverse from "@/assets/academic-universe.png";
import { educationHistory } from "@/data/portfolio";

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          r.current?.classList.add("in");
          io.disconnect();
        }
      },
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

export function AboutSection() {
  const [activeStage, setActiveStage] = useState<"school" | "university" | null>(null);

  // Only display completed/supplied education records on the live site
  const visibleEducation = educationHistory.filter(
    (item) => item.institution && item.institution.trim().length > 0,
  );
  const schoolRecord =
    visibleEducation.find((item) => item.id === "schooling") || visibleEducation[0];
  const universityRecord =
    visibleEducation.find((item) => item.id === "undergrad") || visibleEducation[1];

  return (
    <section id="about" className="syad-about-section relative px-6 py-28 md:py-40">
      {/* Subtle atmospheric ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="syad-about-glow-1" />
        <div className="syad-about-glow-2" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* ---------------- 1. SECTION OPENING ---------------- */}
        <Reveal className="mb-16 md:mb-24">
          <div className="syad-eyebrow-chip inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
              01 / THE COGNITIVE CORE
            </span>
          </div>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-foreground">
            THE MIND BEHIND THE MACHINE
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground font-sans">
            A little about the person behind the code, the curiosity behind the questions, and the
            vision behind the work.
          </p>
        </Reveal>

        {/* ---------------- 2. PERSONAL PORTRAIT & BIOGRAPHY ---------------- */}
        <div className="grid items-start gap-12 lg:grid-cols-[420px_1fr] xl:gap-16 mb-28 md:mb-36">
          {/* Portrait Column */}
          <Reveal className="syad-portrait-wrapper relative">
            <div className="syad-portrait-frame relative overflow-hidden rounded-3xl border border-white/10 bg-surface/80 p-3 backdrop-blur-md shadow-2xl">
              {/* Corner Crosshair Accents */}
              <div className="pointer-events-none absolute left-3 top-3 z-20 font-mono text-xs text-cyan/60 select-none">
                +
              </div>
              <div className="pointer-events-none absolute right-3 top-3 z-20 font-mono text-xs text-cyan/60 select-none">
                +
              </div>
              <div className="pointer-events-none absolute bottom-3 left-3 z-20 font-mono text-xs text-cyan/60 select-none">
                +
              </div>
              <div className="pointer-events-none absolute bottom-3 right-3 z-20 font-mono text-xs text-cyan/60 select-none">
                +
              </div>

              {/* Status Header Badge */}
              <div className="absolute left-6 top-6 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-[#090A0D]/75 px-3 py-1.5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-[11px] font-semibold tracking-wider text-white/90">
                  ACTIVE · ON STAGE & RESEARCH
                </span>
              </div>

              {/* The Actual Real Photograph */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black">
                <img
                  src={shivaPortrait}
                  alt="Shiva Yadav — AI/ML Engineer & Full-Stack Developer delivering a presentation at the podium"
                  className="h-full w-full object-cover object-[center_16%] transition-transform duration-700 ease-out hover:scale-[1.03]"
                  loading="eager"
                />
                {/* Subtle Cinematic Vignette Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090A0D]/90 via-transparent to-[#090A0D]/30" />
              </div>

              {/* Lower Telemetry Strip */}
              <div className="mt-3 flex items-center justify-between px-2 pt-1 pb-1 font-mono text-[11px] text-muted-foreground border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-cyan" />
                  <span>LAT 26.4499° N · LON 80.3319° E</span>
                </div>
                <span className="text-foreground/60 tracking-wider">KANPUR, IN</span>
              </div>
            </div>

            {/* Orbital ring glow underneath */}
            <div className="syad-portrait-backglow" aria-hidden="true" />
          </Reveal>

          {/* Biography Column */}
          <Reveal className="space-y-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-magenta">
                AI/ML ENGINEER · FULL-STACK DEVELOPER · LIFELONG LEARNER
              </p>
              <h3 className="mt-2 font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground">
                SHIVA YADAV
              </h3>
            </div>

            {/* Narrative Editorial Copy */}
            <div className="space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground">
              <p className="text-foreground/95 font-medium text-lg md:text-xl">
                “I'm Shiva Yadav. A curious mind, an ambitious learner, and a builder fascinated by
                the intersection of technology, intelligence, and creativity.”
              </p>
              <p>
                I believe growth begins with curiosity, progress comes through experimentation, and
                meaningful innovation happens when ideas become reality.
              </p>
              <p>
                My journey is about continuously learning, challenging limitations, and exploring
                what becomes possible when imagination meets engineering.
              </p>
            </div>

            {/* Three Pillars of Craft */}
            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              <div className="syad-pillar-card rounded-2xl border border-white/5 bg-surface/50 p-5 backdrop-blur-sm transition-colors hover:border-cyan/40">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
                  <Cpu size={18} />
                </div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                  Curiosity-Driven AI
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Building intelligent systems and neural architectures with real-world utility.
                </p>
              </div>

              <div className="syad-pillar-card rounded-2xl border border-white/5 bg-surface/50 p-5 backdrop-blur-sm transition-colors hover:border-magenta/40">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-magenta/10 text-magenta">
                  <Layers size={18} />
                </div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                  Full-Stack Craft
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Pairing rigorous backend engineering with cinematic, polished digital interfaces.
                </p>
              </div>

              <div className="syad-pillar-card rounded-2xl border border-white/5 bg-surface/50 p-5 backdrop-blur-sm transition-colors hover:border-cyan/40">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
                  <Flame size={18} />
                </div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                  Relentless Growth
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Constantly challenging boundaries through research, building, and active
                  curiosity.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------------- 3. CORE PHILOSOPHY (COMPACT SUPPORTING BLOCK) ---------------- */}
        <Reveal className="mb-16 md:mb-20">
          <div className="syad-philosophy-banner group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-surface/85 via-[#151626]/75 to-surface/60 p-6 md:p-7 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-cyan/30">
            <div className="flex items-center gap-2 mb-3">
              <Compass size={15} className="text-cyan" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan font-semibold">
                CORE PHILOSOPHY
              </span>
            </div>

            <h3 className="font-display text-lg sm:text-xl md:text-2xl font-extrabold uppercase tracking-tight text-foreground leading-snug">
              STAY CURIOUS. THINK DEEPLY. BUILD WITH PURPOSE.
            </h3>

            <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground font-sans max-w-4xl">
              “I value curiosity over assumptions, experimentation over hesitation, and continuous
              learning over standing still. I want to build technology that is not only technically
              sound, but also meaningful, useful, and thoughtfully designed.”
            </p>
          </div>
        </Reveal>

        {/* ---------------- 4. EDUCATION — THE FOUNDATION / MY ACADEMIC JOURNEY ---------------- */}
        <div id="education" className="scroll-mt-28">
          <Reveal className="mb-12 md:mb-16">
            <div className="syad-eyebrow-chip inline-flex items-center gap-2">
              <GraduationCap size={14} className="text-cyan" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
                THE FOUNDATION
              </span>
            </div>
            <h3 className="mt-3 font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground">
              MY ACADEMIC JOURNEY
            </h3>
            <p className="mt-3 text-sm md:text-base text-muted-foreground font-sans max-w-xl">
              Every horizon begins somewhere.
            </p>
          </Reveal>

          {/* Main Academic Journey Experience */}
          <div className="relative pl-10 sm:pl-16 md:pl-20">
            {/* Custom Continuous Academic Journey Path (SVG S-Curve) */}
            <div className="pointer-events-none absolute left-0 top-6 bottom-16 w-10 sm:w-16 md:w-20 overflow-visible flex justify-center">
              <svg
                className="h-full w-10 sm:w-16 overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 40 500"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="academicRouteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop
                      offset="0%"
                      stopColor="#D9BACB"
                      stopOpacity={activeStage === "school" ? "1" : "0.75"}
                    />
                    <stop offset="35%" stopColor="#5D6C8C" stopOpacity="0.5" />
                    <stop
                      offset="75%"
                      stopColor="#ACBDD4"
                      stopOpacity={activeStage === "university" ? "1" : "0.75"}
                    />
                    <stop offset="100%" stopColor="#F2E0DC" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* The Continuous Gentle S-Curve Route */}
                <path
                  d="M 20 20 C 4 130, 36 240, 20 350 S 4 460, 20 495"
                  fill="none"
                  stroke="url(#academicRouteGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                  className="syad-journey-path transition-all duration-500"
                />
              </svg>
            </div>

            <div className="space-y-12 md:space-y-16">
              {/* STAGE 01: Senior Secondary Education */}
              {schoolRecord && (
                <Reveal key={schoolRecord.id} className="relative group">
                  {/* Milestone Node 01 */}
                  <div
                    className={`absolute -left-10 sm:-left-16 md:-left-20 top-6 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border bg-[#090A0D] transition-all duration-300 z-10 ${
                      activeStage === "school"
                        ? "scale-110 border-magenta shadow-[0_0_20px_rgba(217,186,203,0.55)] text-magenta"
                        : "border-magenta/40 text-magenta/80 shadow-[0_0_12px_rgba(217,186,203,0.2)]"
                    }`}
                  >
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold">01</span>
                  </div>

                  {/* Stage 01 Content Grid: Card on Left (AREA A), Photograph on Right (AREA B) */}
                  <div
                    className="grid grid-cols-1 lg:grid-cols-[1fr_310px] xl:grid-cols-[1fr_340px] gap-5 md:gap-6 items-stretch"
                    onMouseEnter={() => setActiveStage("school")}
                    onMouseLeave={() => setActiveStage(null)}
                    onFocus={() => setActiveStage("school")}
                    onBlur={() => setActiveStage(null)}
                    tabIndex={0}
                  >
                    {/* Education Card */}
                    <div
                      className={`syad-academic-card flex flex-col justify-between rounded-3xl border bg-surface/60 p-6 md:p-8 backdrop-blur-md transition-all duration-300 ${
                        activeStage === "school"
                          ? "border-magenta/40 bg-surface/80 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_25px_-5px_rgba(217,186,203,0.2)]"
                          : "border-white/10 hover:border-magenta/30 hover:bg-surface/75"
                      }`}
                    >
                      <div>
                        {/* Aligned Metadata Row */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="rounded-full border border-magenta/30 bg-magenta/10 px-3 py-1 font-mono text-xs font-semibold tracking-wide text-magenta">
                            Senior Secondary Foundation
                          </span>
                          <span className="font-mono text-xs text-muted-foreground tracking-wider">
                            2022 – 2024
                          </span>
                        </div>

                        {/* Primary Qualification Title */}
                        <h4 className="mt-4 font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                          Senior Secondary Education
                        </h4>
                        <p className="mt-1 text-sm sm:text-base font-medium text-foreground/80">
                          Nurture International School, Kanpur
                        </p>

                        {/* Compact Matching Academic Score Badges */}
                        <div className="mt-5 flex flex-wrap items-center gap-2.5">
                          <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-sm">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                              Class X
                            </span>
                            <span className="h-3 w-px bg-white/15" />
                            <span className="font-mono text-xs font-bold text-foreground">90%</span>
                          </div>
                          <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-sm">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                              Class XII
                            </span>
                            <span className="h-3 w-px bg-white/15" />
                            <span className="font-mono text-xs font-bold text-foreground">75%</span>
                          </div>
                        </div>
                      </div>

                      {/* Supporting Description separated by a fine divider */}
                      <p className="mt-6 text-xs sm:text-sm leading-relaxed text-muted-foreground border-t border-white/5 pt-4">
                        Rigorous academic grounding in mathematics, physical sciences, and computer
                        science foundations.
                      </p>
                    </div>

                    {/* Institution Photograph (AREA B) */}
                    <div className="syad-campus-photo-card group/photo relative overflow-hidden rounded-3xl border border-white/10 bg-surface/75 p-2.5 backdrop-blur-md shadow-xl flex flex-col justify-between">
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black">
                        <img
                          src={schoolCampus}
                          alt="Nurture International School campus, Kanpur"
                          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover/photo:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090A0D]/75 via-transparent to-transparent" />
                        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#090A0D]/85 px-2.5 py-1 backdrop-blur-md font-mono text-[10px] font-medium text-foreground/90">
                          <GraduationCap size={11} className="text-magenta" />
                          <span>NURTURE INTL · KANPUR</span>
                        </div>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between px-2 pt-1 font-mono text-[10px] text-muted-foreground border-t border-white/5">
                        <span className="text-magenta flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
                          <span>ACADEMIC CAMPUS</span>
                        </span>
                        <span className="text-foreground/60">CBSE AFFILIATED</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* STAGE 02: B.Tech Computer Science & Engineering */}
              {universityRecord && (
                <Reveal key={universityRecord.id} className="relative group">
                  {/* Milestone Node 02 */}
                  <div
                    className={`absolute -left-10 sm:-left-16 md:-left-20 top-6 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border bg-[#090A0D] transition-all duration-300 z-10 ${
                      activeStage === "university"
                        ? "scale-110 border-cyan shadow-[0_0_24px_rgba(172,189,212,0.65)] text-cyan"
                        : "border-cyan/50 text-cyan/90 shadow-[0_0_14px_rgba(172,189,212,0.3)]"
                    }`}
                  >
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold">02</span>
                  </div>

                  {/* Stage 02 Content Grid: Card on Left (AREA A), Photograph on Right (AREA B) */}
                  <div
                    className="grid grid-cols-1 lg:grid-cols-[1fr_310px] xl:grid-cols-[1fr_340px] gap-5 md:gap-6 items-stretch"
                    onMouseEnter={() => setActiveStage("university")}
                    onMouseLeave={() => setActiveStage(null)}
                    onFocus={() => setActiveStage("university")}
                    onBlur={() => setActiveStage(null)}
                    tabIndex={0}
                  >
                    {/* Education Card */}
                    <div
                      className={`syad-academic-card flex flex-col justify-between rounded-3xl border bg-surface/60 p-6 md:p-8 backdrop-blur-md transition-all duration-300 ${
                        activeStage === "university"
                          ? "border-cyan/40 bg-surface/80 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_25px_-5px_rgba(172,189,212,0.25)]"
                          : "border-white/10 hover:border-cyan/30 hover:bg-surface/75"
                      }`}
                    >
                      <div>
                        {/* Aligned Metadata Row */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-xs font-semibold tracking-wide text-cyan">
                            Current Undergraduate · Active
                          </span>
                          <span className="font-mono text-xs text-muted-foreground tracking-wider">
                            2024 – 2028
                          </span>
                        </div>

                        {/* Primary Qualification Title */}
                        <h4 className="mt-4 font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                          B.Tech — Computer Science & Engineering
                        </h4>
                        <p className="mt-1 text-sm sm:text-base font-medium text-foreground/80">
                          UIET, Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur
                        </p>

                        {/* Compact Matching Academic Score Badge */}
                        <div className="mt-5 flex flex-wrap items-center gap-2.5">
                          <div className="inline-flex items-center gap-2 rounded-xl border border-cyan/25 bg-cyan/10 px-3.5 py-1.5 backdrop-blur-sm">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-cyan/70">
                              Cumulative Score
                            </span>
                            <span className="h-3 w-px bg-cyan/20" />
                            <span className="font-mono text-xs font-bold text-cyan">
                              7.0 / 10 CGPA
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Supporting Description separated by a fine divider */}
                      <p className="mt-6 text-xs sm:text-sm leading-relaxed text-muted-foreground border-t border-white/5 pt-4">
                        Core focus: Artificial Intelligence, Deep Learning & Scalable Full-Stack
                        Engineering.
                      </p>
                    </div>

                    {/* Institution Photograph (AREA B) */}
                    <div className="syad-campus-photo-card group/photo relative overflow-hidden rounded-3xl border border-white/10 bg-surface/75 p-2.5 backdrop-blur-md shadow-xl flex flex-col justify-between">
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black">
                        <img
                          src={collegeCampus}
                          alt="Shiva Yadav at UIET CSJMU Kanpur campus"
                          className="h-full w-full object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover/photo:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090A0D]/75 via-transparent to-transparent" />
                        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#090A0D]/85 px-2.5 py-1 backdrop-blur-md font-mono text-[10px] font-medium text-foreground/90">
                          <Landmark size={11} className="text-cyan" />
                          <span>UIET CSJMU · KANPUR</span>
                        </div>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between px-2 pt-1 font-mono text-[10px] text-muted-foreground border-t border-white/5">
                        <span className="text-cyan flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                          <span>NAAC A++ ACCREDITED</span>
                        </span>
                        <span className="text-foreground/60">UGC CAT-1</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            {/* AREA C — Academic Milestone Showcase: Expected Graduation 2028 */}
            <Reveal className="pt-2">
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/50 p-6 md:p-8 backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-cyan/30 hover:bg-surface/70">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 md:gap-8 items-center">
                  {/* Left: Milestone Narrative */}
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-xs font-semibold tracking-wide text-cyan">
                      <Sparkles size={12} />
                      <span>ACADEMIC MILESTONE</span>
                    </div>

                    <h4 className="mt-4 font-display text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                      THE NEXT HORIZON
                    </h4>

                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="font-display text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground via-[#F2E0DC] to-cyan">
                        2028
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        EXPECTED GRADUATION · B.TECH CSE
                      </span>
                    </div>

                    <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground max-w-xl">
                      Advancing through full-stack systems engineering, deep learning research, and
                      intelligent cognitive architectures toward the 2028 academic culmination.
                    </p>

                    <div className="mt-5 flex items-center gap-2 font-mono text-xs text-foreground/75 border-t border-white/5 pt-3.5">
                      <Landmark size={13} className="text-cyan" />
                      <span>UIET · CSJMU · KANPUR</span>
                    </div>
                  </div>

                  {/* Right: Milestone Visual Frame */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black border border-white/10 shadow-lg">
                    <img
                      src={academicUniverse}
                      alt="Expected Graduation 2028 — Academic Milestone"
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090A0D]/75 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 font-mono text-[11px] text-white/90 bg-[#090A0D]/85 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                      <Sparkles size={11} className="text-cyan" />
                      <span>CONVOCATION HORIZON · 2028</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
