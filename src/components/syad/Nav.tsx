import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Download, Menu, X } from "lucide-react";
import { navigationItems, profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

function PlanetOrbitIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 28" width="28" height="22" fill="none" className={className} aria-hidden>
      {/* Back orbit segment */}
      <path
        d="M3 11C6 6 15 3 27 5C31 5.8 34 7 35 8.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
      {/* Core planet */}
      <circle cx="18" cy="14" r="8" fill="#151626" stroke="currentColor" strokeWidth="1.5" />
      {/* Front orbit segment */}
      <path
        d="M35 15C32 20 23 23 11 22C6 21.2 3 19.8 2 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-25% 0px -65% 0px" },
    );
    navigationItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest("header")) setOpen(false);
    };
    const resize = () => {
      if (innerWidth >= 1180) setOpen(false);
    };
    addEventListener("keydown", key);
    addEventListener("pointerdown", outside);
    addEventListener("resize", resize);
    return () => {
      removeEventListener("keydown", key);
      removeEventListener("pointerdown", outside);
      removeEventListener("resize", resize);
    };
  }, [open]);

  const link = (id: string, label: string) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={() => {
        setOpen(false);
        setActive(id);
      }}
      aria-current={active === id ? "location" : undefined}
      className={`reference-nav-link ${active === id ? "is-active" : ""}`}
    >
      {label}
    </a>
  );

  return (
    <header className="reference-header">
      <a href="#home" aria-label="Shiva Yadav — back to top" className="reference-brand">
        <PlanetOrbitIcon className="brand-orbit-icon" />
        <span>SHIVA YADAV</span>
      </a>

      <nav aria-label="Primary navigation" className="reference-nav">
        {navigationItems.map((item) => link(item.id, item.label))}
      </nav>

      <div className="reference-header-socials">
        {profile.resume && (
          <Button asChild variant="outline" size="sm" className="nav-resume-btn">
            <a
              href={profile.resume}
              download="Shiva_Yadav_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Shiva Yadav's Resume (PDF)"
            >
              <Download size={13} className="mr-1.5" aria-hidden />
              <span>Resume ↓</span>
            </a>
          </Button>
        )}
        <Button asChild variant="outline" size="icon" className="nav-social-btn">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <FaGithub size={15} />
          </a>
        </Button>
        {profile.linkedin ? (
          <Button asChild variant="outline" size="icon" className="nav-social-btn">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
            >
              <FaLinkedinIn size={15} />
            </a>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            disabled
            aria-label="LinkedIn profile coming soon"
            title="LinkedIn profile coming soon"
            className="nav-social-btn"
          >
            <FaLinkedinIn size={15} />
          </Button>
        )}
        <Button
          id="menu-toggle"
          variant="outline"
          size="icon"
          className="reference-menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        inert={!open}
        className={`reference-mobile-menu ${open ? "menu-open" : ""}`}
      >
        {navigationItems.map((item) => link(item.id, item.label))}
        {profile.resume && (
          <a
            href={profile.resume}
            download="Shiva_Yadav_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="reference-mobile-resume-link"
            aria-label="Download Shiva Yadav's Resume (PDF)"
          >
            <Download size={13} aria-hidden />
            <span>Download Resume ↓</span>
          </a>
        )}
      </nav>
    </header>
  );
}
