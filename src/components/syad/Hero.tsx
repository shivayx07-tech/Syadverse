import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { SiPython, SiTensorflow, SiReact, SiNextdotjs, SiNodedotjs } from "react-icons/si";
import {
  ArrowDown,
  ArrowRight,
  GraduationCap,
  Cpu,
  Trophy,
  X,
  ExternalLink,
  Bot,
  Code2,
  Sparkles,
  Download,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import character from "@/assets/developer-seated-pod.png";
import horizon from "@/assets/cosmic-horizon.jpg";
import iitkLogo from "@/assets/iitk-logo.svg";
import googleLogo from "@/assets/google-logo.png";
import { profile } from "@/data/portfolio";
import { sceneInput } from "./HeroScene.input";
import { WordmarkCompile } from "./WordmarkCompile";

const HeroScene = lazy(() => import("./HeroScene"));

const technologies = [
  {
    name: "Python",
    Icon: SiPython,
    focus: "AI/ML Core & Scripting",
    description:
      "Primary language for deep learning, scientific computing, PyTorch and automation.",
    className: "tech-python",
    color: "#ffd343",
  },
  {
    name: "TensorFlow",
    Icon: SiTensorflow,
    focus: "Neural Networks",
    description: "Architecture design, tensor operations and model deployment pipelines.",
    className: "tech-tensorflow",
    color: "#ef8a50",
  },
  {
    name: "React",
    Icon: SiReact,
    focus: "Interactive 3D & UI",
    description: "Component architecture, interactive state management and Three.js integration.",
    className: "tech-react",
    color: "#8ecedb",
  },
  {
    name: "Node.js",
    Icon: SiNodedotjs,
    focus: "Distributed Backends",
    description: "High-throughput asynchronous runtimes, microservices and REST/GraphQL APIs.",
    className: "tech-node",
    color: "#8ab573",
  },
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    focus: "Full-Stack Web Systems",
    description: "Modern SSR, server actions, optimized streaming and production architectures.",
    className: "tech-next",
    color: "#f2e0dc",
  },
];

const achievements = {
  google: {
    title: "Google Student Ambassador '26",
    subtitle: "Community | Leadership | Impact",
    detail:
      "Selected as a Google Student Ambassador '26. Fostering technical growth, leading developer events, and bridging academic talent with modern AI and cloud ecosystems.",
    role: "COMMUNITY & LEADERSHIP",
    linkText: "View Ambassador Program",
    linkUrl: "https://developers.google.com/community",
  },
  iit: {
    title: "IIT Kanpur",
    subtitle: "AI/ML Research Intern",
    detail:
      "Research internship under Professor Nitin Saxena at the Indian Institute of Technology Kanpur. Focused on algebraic complexity, algorithmic design, and advanced machine learning foundations.",
    role: "AI/ML RESEARCH INTERN",
    linkText: "Learn About IIT Kanpur Research",
    linkUrl: "https://www.iitk.ac.in/",
  },
};

type Achievement = keyof typeof achievements;

const logs = [
  "SYSTEM ONLINE...",
  "INITIALIZING NEURAL NETWORK...",
  "LOADING SYADVERSE...",
  "RENDER PIPELINE READY.",
];

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override render() {
    return this.state.failed ? null : this.props.children;
  }
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <img
      src={googleLogo}
      alt="Google"
      className={className}
      width={800}
      height={450}
      loading="eager"
      decoding="async"
    />
  );
}

function IITKFacade({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 60" fill="none" className={className} aria-hidden>
      <path
        d="M8 58h304M24 58V34h18v24M48 58V36h22v22M76 58V39h26v19M110 58V27h100v31M218 58V39h26v19M250 58V36h22v22M278 58V34h18v24"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      <path
        d="M136 27V15h48v12M152 15V7h16v8M124 58V40h12v18M142 58V40h12v18M160 58V40h12v18M178 58V40h12v18M196 58V40h12v18"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.45"
      />
      <path
        d="M30 40h6v6h-6zM54 42h10v6H54zM82 44h14v6H82zM224 44h14v6h-14zM256 42h10v6h-10zM284 40h6v6h-6z"
        fill="currentColor"
        fillOpacity="0.3"
      />
    </svg>
  );
}

function Terminal({ reduced }: { reduced: boolean }) {
  const [text, setText] = useState("");
  useEffect(() => {
    const full = logs.join("\n");
    if (reduced) {
      setText(full);
      return;
    }
    let index = 0,
      timer: ReturnType<typeof setTimeout>;
    const step = () => {
      index++;
      setText(full.slice(0, index));
      if (index >= full.length) {
        timer = setTimeout(() => {
          index = 0;
          setText("");
          step();
        }, 22000);
        return;
      }
      const ch = full[index - 1];
      timer = setTimeout(step, ch === "\n" ? 520 : ch === "." ? 120 : 28 + Math.random() * 34);
    };
    timer = setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <aside className="hero-terminal" aria-label="Syadverse status terminal">
      <div className="terminal-header">
        <span className="terminal-title">◆ SYADVERSE_TERMINAL</span>
        <span className="terminal-controls" aria-hidden>
          − &nbsp; □ &nbsp; ×
        </span>
      </div>
      <div className="terminal-body" aria-hidden>
        {text.split("\n").map((line, i) => (
          <div key={i} className="terminal-line">
            {line}
          </div>
        ))}
        <div className="terminal-prompt">
          <span className="prompt-symbol">&gt;</span>
          <span className={`prompt-cursor ${reduced ? "" : "is-blinking"}`}>_</span>
        </div>
      </div>
    </aside>
  );
}

export function Hero() {
  const [reduced, setReduced] = useState(true);
  const [webgl, setWebgl] = useState(false);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState<Achievement | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [nameVisible, setNameVisible] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const section = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (reduced) {
      setNameVisible(true);
      setTaglineVisible(true);
      setDetailsVisible(true);
      return;
    }
    const t1 = setTimeout(() => setNameVisible(true), 500);
    const t2 = setTimeout(() => setTaglineVisible(true), 800);
    const t3 = setTimeout(() => setDetailsVisible(true), 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reduced]);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    try {
      const canvas = document.createElement("canvas");
      setWebgl(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch {
      setWebgl(false);
    }
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(Boolean(entry?.isIntersecting)),
    );
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const current = dialog.current;
    if (!current) return;
    if (open && !current.open) current.showModal();
    if (!open && current.open) current.close();
  }, [open]);

  // Pointer parallax controller writing CSS variables
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const el = section.current;
    if (!el || reduced || !visible) return;
    const cur = { x: 0, y: 0 };
    let raf = 0,
      last = performance.now();
    let heroH = el.offsetHeight || window.innerHeight || 800;
    const onResize = () => {
      heroH = el.offsetHeight || window.innerHeight || 800;
    };
    window.addEventListener("resize", onResize, { passive: true });

    let lastMx = -999,
      lastMy = -999,
      lastSy = -999;

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const k = 1 - Math.exp(-4 * dt);
      cur.x += (target.current.x - cur.x) * k;
      cur.y += (target.current.y - cur.y) * k;
      const sy = Math.min(Math.max(window.scrollY / heroH, 0), 1);

      if (Math.abs(cur.x - lastMx) > 0.0005) {
        lastMx = cur.x;
        el.style.setProperty("--mx", cur.x.toFixed(4));
      }
      if (Math.abs(cur.y - lastMy) > 0.0005) {
        lastMy = cur.y;
        el.style.setProperty("--my", cur.y.toFixed(4));
      }
      if (Math.abs(sy - lastSy) > 0.001) {
        lastSy = sy;
        el.style.setProperty("--sy", sy.toFixed(4));
      }

      sceneInput.x = cur.x;
      sceneInput.y = cur.y;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, visible]);

  const pointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    target.current.x = Math.max(
      -0.5,
      Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5),
    );
    target.current.y = Math.max(
      -0.5,
      Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5),
    );
  };

  const resetPointer = () => {
    target.current.x = 0;
    target.current.y = 0;
  };

  const handleLaunch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    sceneInput.warp = 1;
    sceneInput.pulse = 1;
    const targetEl = document.getElementById("projects") || document.getElementById("about");
    if (targetEl) {
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          sceneInput.warp = 0;
        }, 1200);
      }, 350);
    }
  };

  const activeModal = open ? achievements[open] : null;
  const activeTech = picked === null ? null : technologies[picked];

  return (
    <section
      id="home"
      ref={section}
      onPointerMove={pointerMove}
      onPointerLeave={resetPointer}
      className="hero-viewport"
      aria-label="Syadverse Hero Opening"
    >
      {/* Background Cosmic Horizon Artwork */}
      <img
        src={horizon}
        alt="Deep space cosmic starfield with spiral galaxy and planetary horizon"
        aria-hidden
        width={1920}
        height={1280}
        fetchPriority="high"
        className="hero-cosmic-bg"
      />
      <div aria-hidden className="hero-cosmic-overlay" />
      <div aria-hidden className="hero-bottom-fade" />

      {/* Interactive 3D WebGL Scene */}
      {webgl && visible && (
        <div className="hero-webgl-canvas" aria-hidden>
          <SceneBoundary>
            <Suspense fallback={null}>
              <HeroScene reduced={reduced} />
            </Suspense>
          </SceneBoundary>
        </div>
      )}

      {/* Main Orchestrated Layout */}
      <div className="hero-stage-container">
        {/* 3-ZONE MAIN STAGE: LEFT INTRO, CENTER 3D SCENE & CTA, RIGHT DOCK */}
        <div className="hero-main-stage-grid">
          {/* LEFT ZONE: COMPLETE BRAND INTRODUCTION */}
          <header className="hero-intro-column">
            <p className="hero-eyebrow">
              <span className="hero-eyebrow-symbol" aria-hidden>
                ◈
              </span>
              // INITIALIZING PERSONAL UNIVERSE
            </p>

            <div className="hero-title-container">
              <h1 className="hero-wordmark-heading">
                <WordmarkCompile
                  reduced={reduced}
                  onSweep={() => {
                    sceneInput.pulse = 0.85;
                  }}
                />
              </h1>
            </div>

            <div className="hero-signature-wrap">
              <p className="hero-brand-signature">ENGINEERED BY SHIVA YADAV</p>
              <span className="sig-line sig-right" aria-hidden />
            </div>

            {/* PROMINENT PERSONAL INTRODUCTION */}
            <div className={`hero-intro-cluster ${nameVisible ? "is-revealed" : ""}`}>
              <h2 className="hero-prominent-name">
                <span className="hero-greeting-prefix">Hi, I'm</span>{" "}
                <span className="hero-name-white">Shiva</span>{" "}
                <span className="hero-name-emphasis">Yadav.</span>
              </h2>
            </div>

            {/* PROFESSIONAL ROLE & TITLE */}
            <p className={`hero-tagline-statement ${taglineVisible ? "is-revealed" : ""}`}>
              AI/ML Engineer · Full-Stack Developer
            </p>

            {/* CONCISE SUPPORTING DESCRIPTION */}
            <p className={`hero-description-core ${detailsVisible ? "is-revealed" : ""}`}>
              Designing intelligent systems, research-driven AI/ML models, and scalable full-stack
              applications — turning ambitious technical ideas into meaningful real-world solutions.
            </p>

            {/* EXPERTISE LABELS */}
            <div
              className={`hero-expertise-strip ${detailsVisible ? "is-revealed" : ""}`}
              aria-label="Core expertise areas"
            >
              <span className="expertise-pill">
                <Bot size={13} className="expertise-icon" aria-hidden />
                AI / ML
              </span>
              <span className="expertise-pill">
                <Code2 size={13} className="expertise-icon" aria-hidden />
                Full-Stack Engineering
              </span>
              <span className="expertise-pill">
                <Sparkles size={13} className="expertise-icon" aria-hidden />
                Research &amp; Systems
              </span>
            </div>

            {/* ESSENTIAL HERO ACTIONS: DUAL CTAS & QUICK CONNECT */}
            <div
              className={`hero-intro-actions ${detailsVisible ? "is-revealed" : ""}`}
              role="group"
              aria-label="Hero primary actions"
            >
              <a
                href="#projects"
                onClick={handleLaunch}
                className="hero-intro-btn-primary"
                aria-label="Explore My Work — View projects and engineering labs"
              >
                <span>Explore My Work</span>
                <ArrowRight size={14} className="hero-btn-arrow" aria-hidden />
              </a>

              {profile.resume && (
                <a
                  href={profile.resume}
                  download="Shiva_Yadav_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-intro-btn-resume"
                  aria-label="Download Shiva Yadav's Resume (PDF)"
                >
                  <Download size={14} className="hero-btn-icon" aria-hidden />
                  <span>Download Resume ↓</span>
                </a>
              )}
            </div>

            {/* QUICK SOCIAL & CONTACT ROUTE */}
            <div
              className={`hero-intro-connect ${detailsVisible ? "is-revealed" : ""}`}
              aria-label="Quick contact and profile routes"
            >
              <a
                href="#contact"
                className="hero-quick-link"
                aria-label="Navigate to contact section to connect"
              >
                <span>Let's Connect</span>
                <ArrowRight size={11} aria-hidden />
              </a>
              <span className="hero-quick-sep" aria-hidden>
                ·
              </span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-quick-social"
                aria-label="Connect with Shiva Yadav on LinkedIn"
              >
                LinkedIn
              </a>
              <span className="hero-quick-sep" aria-hidden>
                ·
              </span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-quick-social"
                aria-label="Explore Shiva Yadav's GitHub repositories"
              >
                GitHub
              </a>
            </div>
          </header>

          {/* CENTER-RIGHT ZONE: 3D AVATAR & ORBITS & PRIMARY CTA */}
          <div className="hero-center-column">
            <div className={`hero-center-stage ${reduced || !visible ? "is-static" : ""}`}>
              {/* Three Concentric Luminous Orbital Rings */}
              <svg className="hero-orbit-svg" viewBox="0 0 680 500" fill="none" aria-hidden>
                <defs>
                  <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5D6C8C" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#ACBDD4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D9BACB" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="orbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ACBDD4" stopOpacity="0.65" />
                    <stop offset="50%" stopColor="#5D6C8C" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#8ecedb" stopOpacity="0.6" />
                  </linearGradient>
                  <filter id="orbitGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                {/* Inner Orbit */}
                <ellipse
                  cx="340"
                  cy="250"
                  rx="155"
                  ry="115"
                  stroke="url(#orbitGrad1)"
                  strokeWidth="1.2"
                  filter="url(#orbitGlowFilter)"
                />
                {/* Middle Orbit */}
                <ellipse
                  cx="340"
                  cy="250"
                  rx="220"
                  ry="165"
                  stroke="url(#orbitGrad2)"
                  strokeWidth="1.2"
                  filter="url(#orbitGlowFilter)"
                />
                {/* Outer Orbit */}
                <ellipse
                  cx="340"
                  cy="250"
                  rx="290"
                  ry="215"
                  stroke="url(#orbitGrad1)"
                  strokeWidth="1.1"
                  strokeDasharray="4 2"
                  opacity="0.85"
                  filter="url(#orbitGlowFilter)"
                />
              </svg>

              {/* Central Coding Developer in Floating Pod */}
              <div className="hero-pod-avatar">
                <img
                  src={character}
                  width={1024}
                  height={1024}
                  alt="Shiva Yadav coding on a laptop inside a zero-gravity pod with floating code hologram panels"
                  className="pod-avatar-img"
                />
              </div>

              {/* 5 Orbiting Technology Nodes */}
              {technologies.map((item, index) => (
                <div key={item.name} className={`orbit-tech-node ${item.className}`}>
                  <Button
                    variant="ghost"
                    onClick={() => setPicked(picked === index ? null : index)}
                    aria-label={`${item.name} — view focus`}
                    aria-pressed={picked === index}
                    className="tech-badge-button"
                    style={{ "--badge-glow": item.color } as React.CSSProperties}
                  >
                    <item.Icon className="tech-badge-icon" aria-hidden />
                  </Button>
                  <span className="tech-badge-label">{item.name}</span>
                </div>
              ))}

              {/* Tech Detail Tooltip Modal */}
              {activeTech && (
                <div className="tech-detail-card" role="status">
                  <div className="tech-detail-header">
                    <strong>{activeTech.name}</strong>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Close technology details"
                      onClick={() => setPicked(null)}
                      className="h-6 w-6"
                    >
                      <X size={13} />
                    </Button>
                  </div>
                  <p className="tech-detail-focus">{activeTech.focus}</p>
                  <p className="tech-detail-body">{activeTech.description}</p>
                </div>
              )}
            </div>

            {/* DUAL CTA GROUP — DIRECTLY BELOW AVATAR */}
            <div className="hero-primary-cta-wrap">
              <div className="hero-dual-cta-group">
                <a
                  href="#projects"
                  onClick={handleLaunch}
                  className="hero-launch-button"
                  aria-label="Explore My Work — View projects and engineering labs"
                >
                  <span className="launch-text-group">
                    <span className="launch-text-primary">EXPLORE MY WORK</span>
                    <span className="launch-text-slash" aria-hidden>
                      /
                    </span>
                    <span className="launch-text-secondary">PROJECTS &amp; LABS</span>
                  </span>
                  <ArrowRight size={16} className="launch-arrow" aria-hidden />
                </a>

                {profile.resume && (
                  <a
                    href={profile.resume}
                    download="Shiva_Yadav_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-center-resume-button"
                    aria-label="Download Shiva Yadav's Resume (PDF)"
                  >
                    <Download size={14} className="resume-icon" aria-hidden />
                    <span>Download Resume ↓</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT ZONE: GOOGLE AMBASSADOR, IIT KANPUR RESEARCH & TERMINAL */}
          <div className="hero-right-dock">
            {/* GOOGLE STUDENT AMBASSADOR */}
            <Button
              variant="ghost"
              onClick={() => setOpen("google")}
              aria-haspopup="dialog"
              className="hero-glass-card card-google"
            >
              <div className="card-top-row">
                <GoogleLogo className="google-wordmark-img google-wordmark-svg" />
                <ExternalLink size={14} className="card-external-icon" />
              </div>
              <div className="card-content-block">
                <h2 className="card-title">GOOGLE STUDENT AMBASSADOR '26</h2>
                <p className="card-subtitle">Community | Leadership | Impact</p>
              </div>
            </Button>

            {/* IIT KANPUR RESEARCH */}
            <Button
              variant="ghost"
              onClick={() => setOpen("iit")}
              aria-haspopup="dialog"
              className="hero-glass-card card-iitk whitespace-normal"
            >
              <div className="card-top-row">
                <div className="iitk-header-brand">
                  <img src={iitkLogo} alt="IIT Kanpur Seal" className="iitk-seal-img" />
                  <div className="iitk-title-meta">
                    <h2 className="card-title">IIT KANPUR</h2>
                    <p className="card-role">AI/ML RESEARCH INTERN</p>
                  </div>
                </div>
                <ExternalLink size={14} className="card-external-icon" aria-hidden="true" />
              </div>

              <div className="card-content-block iitk-content-block">
                <p className="iitk-mentor-line">Research under Professor Nitin Saxena</p>
                <p className="iitk-research-description">
                  Exploring intelligent systems through machine learning, rigorous experimentation,
                  and research-driven problem-solving.
                </p>
              </div>

              <div className="iitk-tags-row" aria-label="Research focus areas">
                <span className="iitk-tag">MACHINE LEARNING</span>
                <span className="iitk-tag">EXPERIMENTATION</span>
                <span className="iitk-tag">RESEARCH</span>
              </div>
            </Button>

            {/* BOTTOM-RIGHT SYADVERSE TERMINAL */}
            <Terminal reduced={reduced} />
          </div>
        </div>

        {/* BOTTOM CREDENTIAL STRIP */}
        <nav aria-label="Key credentials" className="hero-credentials-strip">
          <div className="credential-unit">
            <span className="credential-icon-circle">
              <GraduationCap size={19} />
            </span>
            <div className="credential-meta">
              <strong className="credential-title">B.TECH CSE '28</strong>
              <small className="credential-sub">UIET, CSJMU, Kanpur</small>
            </div>
          </div>

          <div className="credential-separator" aria-hidden />

          <div className="credential-unit">
            <span className="credential-icon-circle">
              <Cpu size={19} />
            </span>
            <div className="credential-meta">
              <strong className="credential-title">AI/ML &amp; FULL-STACK</strong>
              <small className="credential-sub">Python | Web | Cloud</small>
            </div>
          </div>

          <div className="credential-separator" aria-hidden />

          <div className="credential-unit">
            <span className="credential-icon-circle">
              <Trophy size={19} />
            </span>
            <div className="credential-meta">
              <strong className="credential-title">NATIONAL HACKATHON</strong>
              <small className="credential-sub">PARTICIPANT</small>
            </div>
          </div>
        </nav>

        {/* BOTTOM-LEFT SCROLL INDICATOR */}
        <div className="hero-scroll-anchor">
          <a
            href="#about"
            className="hero-mouse-indicator"
            aria-label="Scroll down to About section"
          >
            <span className="mouse-pill" aria-hidden>
              <i className="mouse-dot" />
            </span>
            <span className="mouse-text">Scroll to Explore</span>
            <ArrowDown size={14} className="mouse-arrow" />
          </a>
        </div>
      </div>

      {/* ACCESSIBLE DETAIL DIALOG */}
      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(event) => event.target === dialog.current && setOpen(null)}
        aria-labelledby="achievement-dialog-title"
        className="m-auto w-[min(92vw,540px)] rounded-xl border border-border bg-[#151626]/95 backdrop-blur-xl p-8 text-foreground shadow-2xl"
      >
        {activeModal && (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#ACBDD4]">
                  {activeModal.role}
                </p>
                <h2
                  id="achievement-dialog-title"
                  className="mt-2 font-display text-2xl font-bold text-[#F2E0DC]"
                >
                  {activeModal.title}
                </h2>
                <p className="mt-1 text-sm text-[#D9BACB]">{activeModal.subtitle}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                aria-label="Close dialog"
                onClick={() => setOpen(null)}
                className="h-8 w-8 rounded-full border-border bg-transparent text-[#F2E0DC] hover:bg-white/10"
              >
                <X size={16} />
              </Button>
            </div>
            <p className="mt-5 leading-relaxed text-[#B0B5C6] text-sm">{activeModal.detail}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                asChild
                className="btn-primary rounded-full bg-[#F2E0DC] text-[#151626] hover:bg-white"
              >
                <a href="#experience" onClick={() => setOpen(null)}>
                  View Full Experience <ArrowRight size={15} />
                </a>
              </Button>
              {activeModal.linkUrl && (
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-[#5D6C8C]/50 text-[#F2E0DC] hover:bg-white/5"
                >
                  <a href={activeModal.linkUrl} target="_blank" rel="noreferrer">
                    {activeModal.linkText} <ExternalLink size={14} />
                  </a>
                </Button>
              )}
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
