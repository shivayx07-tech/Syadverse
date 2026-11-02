import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Syadverse Ultimate Mobile Responsiveness & Finish Audit", () => {
  const stylesCss = fs.readFileSync(path.resolve(__dirname, "../styles.css"), "utf-8");
  const experienceCardTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/experience/ExperienceCard.tsx"),
    "utf-8",
  );
  const experienceArchiveTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/experience/ExperienceArchiveSection.tsx"),
    "utf-8",
  );
  const experienceDetailTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/experience/ExperienceDetailPage.tsx"),
    "utf-8",
  );
  const contactTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/Contact.tsx"),
    "utf-8",
  );
  const aboutTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/AboutSection.tsx"),
    "utf-8",
  );
  const skillsTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/IntelligenceMatrix.tsx"),
    "utf-8",
  );

  describe("Phase 2 & 3D: Experience Section & Cards (Zero Horizontal Overflow)", () => {
    it("ExperienceCard contains min-w-0 and flex-wrap on header and footer to prevent clipping", () => {
      expect(experienceCardTsx).toContain("flex flex-wrap items-center justify-between");
      expect(experienceCardTsx).toContain("min-w-0");
      expect(experienceCardTsx).toContain("break-words");
    });

    it("ExperienceCard uses responsive padding (p-4 sm:p-5 md:p-6) instead of fixed wide padding", () => {
      expect(experienceCardTsx).toContain("p-4 sm:p-5 md:p-6");
    });

    it("ExperienceArchiveSection contains overflow-hidden on section container", () => {
      expect(experienceArchiveTsx).toContain("overflow-hidden");
      expect(experienceArchiveTsx).toContain("gap-5 sm:gap-6 lg:gap-8");
    });

    it("ExperienceDetailPage has min-w-0 and responsive heights for mobile viewports", () => {
      expect(experienceDetailTsx).toContain("min-w-0");
      expect(experienceDetailTsx).toContain("xs:h-[300px]");
      expect(experienceDetailTsx).toContain("px-4 sm:px-6");
    });
  });

  describe("Phase 3A: Hero Section Fluidity & Orbit Safeguards", () => {
    it("styles.css enforces dynamic max-width using calc(100vw - ...) for narrow mobile (<479px, <380px, <340px)", () => {
      expect(stylesCss).toContain("calc(100vw - 28px)");
      expect(stylesCss).toContain("calc(100vw - 16px)");
      expect(stylesCss).toContain("calc(100vw - 12px)");
    });

    it("Orbit tech nodes and avatar dimensions scale down proportionally on small viewports", () => {
      expect(stylesCss).toContain("width: 175px");
      expect(stylesCss).toContain("height: 175px");
      expect(stylesCss).toContain(".orbit-tech-node.tech-react");
    });
  });

  describe("Phase 3H: Navigation & Mobile Menu Containment", () => {
    it("Hides duplicate header resume pill on screens <= 639px to avoid brand crowding", () => {
      expect(stylesCss).toContain(".nav-resume-btn {\n    display: none !important;");
    });

    it("Constrains mobile menu width so it never overflows 320px viewports", () => {
      expect(stylesCss).toContain("min(300px, calc(100vw - 32px))");
      expect(stylesCss).toContain("max-width: calc(100vw - 32px)");
    });
  });

  describe("Phase 3B, 3C & 3G: About, Skills, Contact & Footer Responsive Layout", () => {
    it("About section timeline and cards use mobile-friendly padding (pl-8, p-4)", () => {
      expect(aboutTsx).toContain("pl-8 sm:pl-14 md:pl-20");
      expect(aboutTsx).toContain("p-4 sm:p-6 md:p-8");
    });

    it("Skills matrix uses responsive padding and tags allow flex-wrap", () => {
      expect(skillsTsx).toContain("p-5 sm:p-7 md:p-9");
      expect(skillsTsx).toContain("overflow-hidden");
    });

    it("Contact form and footer use fluid mobile padding and wrap bottom rows", () => {
      expect(contactTsx).toContain("p-5 sm:p-8 md:p-10");
      expect(contactTsx).toContain("flex flex-wrap items-center justify-between");
    });
  });
});

