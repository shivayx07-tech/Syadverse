import { Landmark, Sparkles } from "lucide-react";
import academicUniverse from "@/assets/academic-universe.png";

export function CosmicAcademicShowcase() {
  return (
    <div className="syad-academic-universe-card group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/50 p-3.5 backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-cyan/40 hover:bg-surface/70 flex flex-col justify-between">
      {/* Corner crosshairs */}
      <div className="pointer-events-none absolute left-3 top-3 z-20 font-mono text-[11px] text-cyan/60 select-none">
        +
      </div>
      <div className="pointer-events-none absolute right-3 top-3 z-20 font-mono text-[11px] text-cyan/60 select-none">
        +
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 z-20 font-mono text-[11px] text-cyan/60 select-none">
        +
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 z-20 font-mono text-[11px] text-cyan/60 select-none">
        +
      </div>

      {/* Top Floating Badge */}
      <div className="relative z-10 flex items-center justify-between px-2 pt-1 pb-3">
        <div className="flex items-center gap-2">
          <Landmark size={13} className="text-cyan" />
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-cyan/90 uppercase">
            MY ACADEMIC UNIVERSE
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan/80" />
          <span>CANVAS</span>
        </div>
      </div>

      {/* Cinematic Photograph Container (Landscape-oriented with refined proportions) */}
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-black">
        <img
          src={academicUniverse}
          alt="My Academic Universe — UIET CSJMU Kanpur Convocation & Graduation Horizon"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
        {/* Subtle, restrained cinematic gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090A0D]/85 via-[#090A0D]/20 to-[#090A0D]/25" />

        {/* Floating In-Image Badge */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between rounded-xl border border-white/10 bg-[#090A0D]/85 px-3 py-2 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-[#F2E0DC]" />
            <span className="font-display text-xs font-bold uppercase tracking-wider text-foreground">
              CONVOCATION & HORIZON
            </span>
          </div>
          <span className="font-mono text-[10px] font-semibold text-cyan">EST. 2028</span>
        </div>
      </div>

      {/* Supporting Telemetry Footer */}
      <div className="relative z-10 mt-3.5 flex items-center justify-between border-t border-white/5 px-2 pt-2.5 pb-1 font-mono text-[10px] text-muted-foreground">
        <span className="tracking-wide text-foreground/90 font-medium">UIET · CSJMU · KANPUR</span>
        <span className="text-cyan/70">CSE · AI/ML</span>
      </div>
    </div>
  );
}
