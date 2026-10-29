import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Code2,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  ShieldCheck,
} from "lucide-react";
import { education, projects, certificates, type Project } from "@/data/portfolio";
import { AboutSection } from "./AboutSection";
import { IntelligenceMatrix } from "./IntelligenceMatrix";
import { ExperienceArchiveSection } from "./experience/ExperienceArchiveSection";
import { ProjectsSection } from "./projects/ProjectsSection";

const hueVar = { cyan: "var(--cyan)", violet: "var(--violet)", magenta: "var(--magenta)" } as const;

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

function Heading({
  n,
  kicker,
  title,
  sub,
}: {
  n: string;
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <p className="eyebrow">
        {n} · {kicker}
      </p>
      <h2 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-tight">
        {title}
      </h2>
      {sub && (
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">{sub}</p>
      )}
    </Reveal>
  );
}

function Modal({
  open,
  onClose,
  children,
  label,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
}) {
  const d = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = d.current!;
    if (open && !el.open) {
      el.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!open && el.open) el.close();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <dialog
      ref={d}
      aria-label={label}
      onClose={() => {
        document.body.style.overflow = "";
        onClose();
      }}
      onClick={(e) => e.target === d.current && onClose()}
      className="m-auto max-h-[92vh] w-[min(960px,94vw)] overflow-auto rounded-3xl border border-foreground/10 bg-surface p-0 text-foreground shadow-2xl"
    >
      {open && children}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/70 hover:text-cyan"
      >
        <X size={18} />
      </button>
    </dialog>
  );
}

/* ---------------- About ---------------- */
export const About = AboutSection;

/* ---------------- Experience — The Mission Log Archive ---------------- */
export const Experience = ExperienceArchiveSection;

/* ---------------- Skills — The Intelligence Matrix ---------------- */
export const Skills = IntelligenceMatrix;

/* ---------------- Projects ---------------- */
function ProjectArt({ art }: { art: Project["art"] }) {
  if (art === "estate")
    return (
      <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={i}
            x1={i * 20}
            y1="0"
            x2={i * 20}
            y2="120"
            stroke="var(--cyan)"
            strokeOpacity=".08"
          />
        ))}
        {[20, 45, 75, 110, 140, 170].map((x, i) => (
          <rect
            key={x}
            x={x}
            y={100 - [30, 50, 38, 70, 45, 58][i]!}
            width="16"
            height={[30, 50, 38, 70, 45, 58][i]}
            rx="2"
            fill="var(--cyan)"
            fillOpacity={0.15 + i * 0.08}
          />
        ))}
        <polyline
          points="10,90 50,70 90,75 130,40 190,30"
          fill="none"
          stroke="var(--magenta)"
          strokeWidth="1.5"
        />
      </svg>
    );
  if (art === "sentinel")
    return (
      <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
        {[
          [30, 30],
          [70, 80],
          [100, 40],
          [140, 90],
          [170, 35],
          [120, 65],
        ].map(([x, y], i, a) => (
          <g key={i}>
            {i > 0 && (
              <line
                x1={a[i - 1]![0]}
                y1={a[i - 1]![1]}
                x2={x}
                y2={y}
                stroke={i === 3 ? "var(--magenta)" : "var(--violet)"}
                strokeOpacity=".7"
              />
            )}
            <circle
              cx={x}
              cy={y}
              r={i === 3 ? 6 : 4}
              fill={i === 3 ? "var(--magenta)" : "var(--violet)"}
            />
          </g>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={20 + i * 42}
            y="104"
            width="36"
            height="10"
            rx="2"
            fill="none"
            stroke="var(--cyan)"
            strokeOpacity=".5"
          />
        ))}
      </svg>
    );
  if (art === "tourism")
    return (
      <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
        <path
          d="M20 90 C 50 40, 80 100, 110 50 S 170 30, 185 70"
          fill="none"
          stroke="var(--cyan)"
          strokeDasharray="3 4"
        />
        <path
          d="M0 110 L40 70 L70 95 L110 55 L150 90 L200 60 L200 120 L0 120Z"
          fill="var(--violet)"
          fillOpacity=".25"
        />
        {[
          [20, 90],
          [110, 50],
          [185, 70],
        ].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="4" fill="var(--magenta)" />
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x="40"
            y={20 + i * 22}
            width="12"
            height="12"
            rx="3"
            fill="none"
            stroke="var(--cyan)"
          />
          {i < 2 && <path d={`M43 ${26 + i * 22} l3 3 l5 -6`} stroke="var(--cyan)" fill="none" />}
          <rect
            x="62"
            y={23 + i * 22}
            width={[90, 70, 100, 60][i]}
            height="6"
            rx="3"
            fill="currentColor"
            fillOpacity=".15"
          />
        </g>
      ))}
    </svg>
  );
}

function Action({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="btn-ghost !py-2 text-sm">
      {icon}
      {label}
    </a>
  ) : (
    <button disabled className="btn-ghost !py-2 text-sm" title="Not configured yet">
      {icon}
      {label} · soon
    </button>
  );
}

/* ---------------- Projects — The Innovation Lab ---------------- */
export const Projects = ProjectsSection;

/* ---------------- Gallery ---------------- */
function Photo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return src ? (
    <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />
  ) : (
    <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--violet)_30%,transparent),transparent_60%)] text-dim">
      <div className="flex flex-col items-center gap-2">
        <ImageIcon size={22} />
        <span className="font-mono text-[10px] tracking-widest">PHOTO PENDING</span>
      </div>
    </div>
  );
}

/* ---------------- Gallery — The Journey, Unfolded ---------------- */
export { GallerySection as Gallery } from "./gallery/GallerySection";

/* ---------------- Certificates ---------------- */
export { CertificatesSection as Certificates } from "./certificates/CertificatesSection";
