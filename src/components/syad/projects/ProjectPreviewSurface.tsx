import type { ProjectItem } from "@/data/projectsArchive";
import {
  TrendingUp,
  Activity,
  Layers,
  ShieldAlert,
  GitBranch,
  Coffee,
  ShoppingBag,
  Luggage,
  CheckSquare,
  Sparkles,
} from "lucide-react";

interface ProjectPreviewSurfaceProps {
  project: ProjectItem;
  className?: string;
  isFeatured?: boolean;
}

export function ProjectPreviewSurface({
  project,
  className = "",
  isFeatured = false,
}: ProjectPreviewSurfaceProps) {
  // Authentic screenshot / cover image display with strict 100% zero-cropping
  if (project.screenshotUrl) {
    return (
      <div
        className={`group/preview relative flex items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-[#090A0D] shadow-2xl transition-all duration-500 hover:border-accent/40 ${className}`}
      >
        {/* Ambient celestial cosmic background glow matching Syadverse palette */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20 blur-xl transition-opacity duration-700 group-hover/preview:opacity-35"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(93, 108, 140, 0.45) 0%, rgba(21, 22, 38, 0.85) 60%, #090A0D 100%)",
          }}
          aria-hidden="true"
        />

        {/* Top subtle highlight reflection line */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Zero-crop image display preserving 100% of the original content */}
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <img
            src={project.screenshotUrl}
            alt={project.screenshotAlt || `${project.title} project cover image`}
            width={project.screenshotWidth || 1024}
            height={project.screenshotHeight || 564}
            className="h-full w-full max-h-full max-w-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  // Phase 1: High-fidelity, customized SVG/CSS visual placeholder
  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/40 bg-[#090A0D]/90 p-5 select-none transition-all duration-500 ${className}`}
    >
      {/* Background ambient mesh */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(217, 186, 203, 0.15) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-border/30 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent/80 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-dim">
            {project.placeholderType === "nexestate"
              ? "VALUATION TELEMETRY // MODEL RUNTIME"
              : project.placeholderType === "financial"
                ? "FORENSIC TRANSACTION GRAPH // AUDIT ENGINE"
                : project.placeholderType === "cafe"
                  ? "ARTISANAL E-COMMERCE // FRONTEND PREVIEW"
                  : "TRIP CHECKLIST LOGIC // PACKING MATRIX"}
          </span>
        </div>
        <span className="rounded border border-border/50 bg-surface-2/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-dim">
          ASSET PLACEHOLDER
        </span>
      </div>

      {/* Central Visual Playground based on project type */}
      <div className="relative z-10 my-auto py-4">
        {project.placeholderType === "nexestate" && (
          <NexEstatePlaceholder isFeatured={isFeatured} />
        )}
        {project.placeholderType === "financial" && <FinancialPlaceholder />}
        {project.placeholderType === "cafe" && <CafePlaceholder />}
        {project.placeholderType === "packpilot" && <PackPilotPlaceholder />}
      </div>

      {/* Bottom Placeholder Watermark / Disclosure */}
      <div className="relative z-10 flex items-center justify-between border-t border-border/30 pt-2.5 text-[10px] text-dim font-mono">
        <span className="flex items-center gap-1.5">
          <Layers size={11} className="text-accent" />
          <span>Interactive Blueprint Preview</span>
        </span>
        <span className="text-[9px] text-dim/70 tracking-wider">PHASE 1 · SCREENSHOT RESERVED</span>
      </div>
    </div>
  );
}

/* ---------------- NexEstate Valuation Telemetry Placeholder ---------------- */
function NexEstatePlaceholder({ isFeatured }: { isFeatured: boolean }) {
  return (
    <div className="space-y-4">
      {/* Top Metric Cards Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border/40 bg-[#151626]/80 p-3">
          <p className="font-mono text-[9px] uppercase tracking-wider text-dim">
            RECORDS PROCESSED
          </p>
          <p className="mt-1 font-display text-base sm:text-lg font-bold text-foreground">250K+</p>
          <div className="mt-1 flex items-center gap-1 font-mono text-[10px] text-emerald-400">
            <TrendingUp size={11} /> <span>Geospatial / Muni</span>
          </div>
        </div>
        <div className="rounded-lg border border-border/40 bg-[#151626]/80 p-3">
          <p className="font-mono text-[9px] uppercase tracking-wider text-dim">MODEL VALIDATION</p>
          <p className="mt-1 font-mono text-xs sm:text-sm font-semibold text-accent">R² = 0.912</p>
          <p className="mt-1 font-mono text-[10px] text-dim">91.2% R² Score</p>
        </div>
        <div className="col-span-2 sm:col-span-1 rounded-lg border border-border/40 bg-[#151626]/80 p-3">
          <p className="font-mono text-[9px] uppercase tracking-wider text-dim">INFERENCE SPEED</p>
          <p className="mt-1 font-display text-base sm:text-lg font-bold text-foreground">
            &lt; 45 ms
          </p>
          <p className="mt-1 font-mono text-[10px] text-dim">REST API Latency</p>
        </div>
      </div>

      {/* SHAP Feature Impact Bars */}
      <div className="rounded-lg border border-border/40 bg-[#151626]/60 p-3.5 space-y-2.5">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="flex items-center gap-1 text-accent font-semibold">
            <Activity size={12} /> SHAP Feature Attribution Analysis
          </span>
          <span className="text-dim text-[10px]">Relative Weight</span>
        </div>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between font-mono text-[10px] text-foreground/80">
              <span>Square Footage Coefficient</span>
              <span>+34.2%</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
              <div className="h-full rounded-full bg-accent" style={{ width: "82%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between font-mono text-[10px] text-foreground/80">
              <span>Micro-Location Spatial Index</span>
              <span>+28.7%</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
              <div className="h-full rounded-full bg-[#5D6C8C]" style={{ width: "68%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between font-mono text-[10px] text-foreground/80">
              <span>Infrastructure & Transit Proximity</span>
              <span>+18.4%</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
              <div className="h-full rounded-full bg-[#F2E0DC]/70" style={{ width: "45%" }} />
            </div>
          </div>
        </div>
      </div>

      {isFeatured && (
        <div className="hidden sm:flex items-center justify-between rounded-lg border border-border/30 bg-[#090A0D]/50 px-3 py-2 text-[11px] font-mono text-dim">
          <span>Target Specimen: 3 BHK Luxury Urban High-Rise</span>
          <span className="text-foreground">Latency: 42ms (REST API)</span>
        </div>
      )}
    </div>
  );
}

/* ---------------- Financial Intelligence Engine Placeholder ---------------- */
function FinancialPlaceholder() {
  return (
    <div className="space-y-3.5">
      {/* Node Network Visual Diagram */}
      <div className="relative h-28 sm:h-32 w-full rounded-lg border border-border/40 bg-[#151626]/80 p-3 overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 400 120" className="w-full h-full" fill="none">
          {/* Connecting graph edges */}
          <line
            x1="60"
            y1="60"
            x2="160"
            y2="35"
            stroke="rgba(217, 186, 203, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <line
            x1="60"
            y1="60"
            x2="160"
            y2="85"
            stroke="rgba(93, 108, 140, 0.6)"
            strokeWidth="1.5"
          />
          <line
            x1="160"
            y1="35"
            x2="260"
            y2="60"
            stroke="rgba(93, 108, 140, 0.6)"
            strokeWidth="1.5"
          />
          <line
            x1="160"
            y1="85"
            x2="260"
            y2="60"
            stroke="rgba(217, 186, 203, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <line
            x1="260"
            y1="60"
            x2="340"
            y2="60"
            stroke="rgba(242, 224, 220, 0.7)"
            strokeWidth="2"
          />

          {/* Graph Nodes */}
          <circle cx="60" cy="60" r="14" fill="#090A0D" stroke="#5D6C8C" strokeWidth="2" />
          <text
            x="60"
            y="64"
            textAnchor="middle"
            fill="#F2E0DC"
            fontSize="8"
            fontFamily="monospace"
          >
            TX_01
          </text>

          <circle cx="160" cy="35" r="14" fill="#090A0D" stroke="#D9BACB" strokeWidth="2" />
          <text
            x="160"
            y="39"
            textAnchor="middle"
            fill="#D9BACB"
            fontSize="8"
            fontFamily="monospace"
          >
            ML_SC
          </text>

          <circle cx="160" cy="85" r="14" fill="#090A0D" stroke="#5D6C8C" strokeWidth="2" />
          <text
            x="160"
            y="89"
            textAnchor="middle"
            fill="#5D6C8C"
            fontSize="8"
            fontFamily="monospace"
          >
            AUDIT
          </text>

          <circle cx="260" cy="60" r="15" fill="#090A0D" stroke="#D9BACB" strokeWidth="2" />
          <text
            x="260"
            y="64"
            textAnchor="middle"
            fill="#D9BACB"
            fontSize="8"
            fontFamily="monospace"
          >
            SHA-256
          </text>

          <circle cx="340" cy="60" r="14" fill="#151626" stroke="#22c55e" strokeWidth="2" />
          <text
            x="340"
            y="64"
            textAnchor="middle"
            fill="#22c55e"
            fontSize="8"
            fontFamily="monospace"
          >
            VERIF
          </text>
        </svg>
      </div>

      {/* Forensic Audit Telemetry Row */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="rounded border border-border/40 bg-[#151626]/60 p-2.5">
          <div className="flex items-center gap-1.5 text-accent">
            <ShieldAlert size={12} />
            <span className="text-[10px] uppercase font-semibold">Anomaly Threshold</span>
          </div>
          <p className="mt-1 text-foreground font-semibold">0.998 Sigmoid Bound</p>
        </div>
        <div className="rounded border border-border/40 bg-[#151626]/60 p-2.5">
          <div className="flex items-center gap-1.5 text-dim">
            <GitBranch size={12} />
            <span className="text-[10px] uppercase font-semibold">Hash Integrity</span>
          </div>
          <p className="mt-1 text-foreground font-semibold">SHA-256 Verifiable</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Café E-commerce Website Placeholder ---------------- */
function CafePlaceholder() {
  return (
    <div className="space-y-3">
      {/* Artisanal Coffee Menu Mockup Card */}
      <div className="rounded-lg border border-border/40 bg-[#151626]/80 p-3.5 space-y-3">
        <div className="flex items-center justify-between border-b border-border/20 pb-2">
          <div className="flex items-center gap-1.5 font-display text-sm font-bold text-foreground">
            <Coffee size={14} className="text-accent" />
            <span>Artisanal Roast Catalog</span>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[9px] text-accent">
            <ShoppingBag size={10} /> <span>Bag (2)</span>
          </div>
        </div>

        {/* Menu item cards preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded border border-border/30 bg-[#090A0D]/70 p-2">
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                Single-Origin Ethiopian Yirgacheffe
              </p>
              <p className="font-mono text-[9px] text-dim">Floral notes · Light Roast</p>
            </div>
            <span className="font-mono text-xs font-semibold text-accent shrink-0 ml-2">₹420</span>
          </div>
          <div className="flex items-center justify-between rounded border border-border/30 bg-[#090A0D]/70 p-2">
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                Colombian Geisha Micro-Lot
              </p>
              <p className="font-mono text-[9px] text-dim">Bergamot · Medium Roast</p>
            </div>
            <span className="font-mono text-xs font-semibold text-accent shrink-0 ml-2">₹540</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[10px] text-dim px-1">
        <span>Cart Checkout UI Mockup</span>
        <span className="text-foreground">Responsive Grid Layout</span>
      </div>
    </div>
  );
}

/* ---------------- PackPilot Intelligent Packing List Placeholder ---------------- */
function PackPilotPlaceholder() {
  return (
    <div className="space-y-3.5">
      {/* Cockpit Parameters Row */}
      <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
        <div className="rounded border border-border/40 bg-[#151626]/80 p-2">
          <span className="text-dim">DESTINATION</span>
          <p className="mt-0.5 font-semibold text-foreground">High-Altitude Alpine</p>
        </div>
        <div className="rounded border border-border/40 bg-[#151626]/80 p-2">
          <span className="text-dim">DURATION</span>
          <p className="mt-0.5 font-semibold text-foreground">5 Days / 4 Nights</p>
        </div>
        <div className="rounded border border-border/40 bg-[#151626]/80 p-2">
          <span className="text-dim">WEIGHT LIMIT</span>
          <p className="mt-0.5 font-semibold text-accent">7.0 kg / 10 kg</p>
        </div>
      </div>

      {/* Packing Checklist Matrix */}
      <div className="rounded-lg border border-border/40 bg-[#151626]/60 p-3 space-y-2">
        <div className="flex items-center justify-between font-mono text-[10px] text-dim border-b border-border/20 pb-1.5">
          <span className="flex items-center gap-1.5 text-accent font-semibold">
            <CheckSquare size={12} /> Rule-Based Checklist Engine
          </span>
          <span>16 / 20 Packed</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 rounded border border-border/20 bg-[#090A0D]/50 px-2.5 py-1.5 text-foreground/90">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="truncate">Thermal Weather Base-Layer (×2)</span>
          </div>
          <div className="flex items-center gap-2 rounded border border-border/20 bg-[#090A0D]/50 px-2.5 py-1.5 text-foreground/90">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="truncate">Universal Adapter & USB-C Bank</span>
          </div>
        </div>
      </div>

      {/* Luggage Capacity Gauge */}
      <div className="space-y-1">
        <div className="flex justify-between font-mono text-[10px] text-dim">
          <span className="flex items-center gap-1">
            <Luggage size={11} /> Carry-On Luggage Distribution
          </span>
          <span>70% Capacity</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
          <div className="h-full rounded-full bg-accent" style={{ width: "70%" }} />
        </div>
      </div>
    </div>
  );
}
