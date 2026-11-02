import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Mandatory Phase: Desktop Preservation & Cross-Device Regression Testing", () => {
  const stylesCss = fs.readFileSync(path.resolve(__dirname, "../styles.css"), "utf-8");
  const heroTsx = fs.readFileSync(path.resolve(__dirname, "../components/syad/Hero.tsx"), "utf-8");
  const navTsx = fs.readFileSync(path.resolve(__dirname, "../components/syad/Nav.tsx"), "utf-8");
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
  const aboutTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/AboutSection.tsx"),
    "utf-8",
  );
  const skillsTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/IntelligenceMatrix.tsx"),
    "utf-8",
  );
  const projectsTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/projects/ProjectsSection.tsx"),
    "utf-8",
  );
  const featuredProjectCardTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/projects/FeaturedProjectCard.tsx"),
    "utf-8",
  );
  const projectCardTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/projects/ProjectCard.tsx"),
    "utf-8",
  );
  const contactTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/Contact.tsx"),
    "utf-8",
  );

  describe("1. Desktop Navigation & Header Preservation (>= 1180px, 1280px, 1440px, 1920px)", () => {
    it("Preserves full horizontal reference-nav on desktop", () => {
      expect(navTsx).toContain('<nav aria-label="Primary navigation" className="reference-nav">');
    });

    it("Preserves desktop fixed header coordinates (top: 24px, left/right 3.5%)", () => {
      expect(stylesCss).toContain(".reference-header {\n  position: fixed;\n  top: 24px;\n  left: 3.5%;\n  right: 3.5%;");
    });

    it("Preserves nav-resume-btn in header on desktop viewports", () => {
      expect(stylesCss).toContain(".nav-resume-btn {");
      expect(stylesCss).toContain(".nav-resume-btn:hover {");
      // Hidden only at <= 639px, visible on desktop
      expect(stylesCss).toContain("@media (max-width: 639px) {\n  .nav-resume-btn {\n    display: none !important;");
    });
  });

  describe("2. Hero Desktop Layout, 3D Canvas & Stage Grid Preservation", () => {
    it("Preserves 3-column desktop stage grid (intro, center pod, right glass dock)", () => {
      expect(stylesCss).toContain(
        ".hero-main-stage-grid {\n  display: grid;\n  grid-template-columns: minmax(360px, 450px) minmax(460px, 1.25fr) minmax(290px, 330px);",
      );
    });

    it("Preserves full desktop center stage and avatar pod dimensions", () => {
      expect(stylesCss).toContain(".hero-center-stage {\n  position: relative;\n  width: 530px;\n  height: 380px;");
      expect(stylesCss).toContain(".hero-pod-avatar {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 350px;\n  height: 350px;");
    });

    it("Preserves desktop orbit node coordinates for all 5 technologies", () => {
      expect(stylesCss).toContain(".orbit-tech-node.tech-python {\n  left: 95px;\n  top: 50px;\n}");
      expect(stylesCss).toContain(".orbit-tech-node.tech-tensorflow {\n  right: 95px;\n  top: 50px;\n}");
      expect(stylesCss).toContain(".orbit-tech-node.tech-react {\n  right: 15px;\n  top: 175px;\n}");
      expect(stylesCss).toContain(".orbit-tech-node.tech-node {\n  right: 95px;\n  bottom: 45px;\n}");
      expect(stylesCss).toContain(".orbit-tech-node.tech-next {\n  left: 85px;\n  bottom: 60px;\n}");
    });

    it("Preserves IIT Kanpur & Google Ambassador glass cards on desktop", () => {
      expect(stylesCss).toContain(".hero-right-dock {\n  position: relative;\n  width: 100%;\n  max-width: 320px;");
      expect(stylesCss).toContain(".hero-glass-card {\n  width: 100% !important;\n  height: auto !important;\n  border-radius: 12px !important;");
    });
  });

  describe("3. Desktop Experience Section & Mission Archive Preservation", () => {
    it("Preserves 3-column desktop experience card grid (lg:grid-cols-3 lg:gap-8)", () => {
      expect(experienceArchiveTsx).toContain("lg:grid-cols-3");
      expect(experienceArchiveTsx).toContain("lg:gap-8");
    });

    it("Preserves desktop card padding (md:p-6) in ExperienceCard", () => {
      expect(experienceCardTsx).toContain("md:p-6");
    });

    it("Preserves desktop decorative ring and hero dimensions in ExperienceCoverGraphic", () => {
      expect(stylesCss).not.toContain("@media (min-width: 1024px) { .experience-card { display: none } }");
    });

    it("Preserves desktop gallery heights in ExperienceDetailPage (md:h-[500px] & md:h-[520px])", () => {
      expect(experienceDetailTsx).toContain("md:h-[500px]");
      expect(experienceDetailTsx).toContain("md:h-[520px]");
      expect(experienceDetailTsx).toContain("sm:grid-cols-3");
    });
  });

  describe("4. Desktop About, Skills, Projects, Contact & Footer Spacing", () => {
    it("About section maintains md:py-36 and md:pl-20 on desktop", () => {
      expect(aboutTsx).toContain("md:py-36");
      expect(aboutTsx).toContain("md:pl-20");
      expect(aboutTsx).toContain("md:p-8");
      expect(aboutTsx).toContain("md:p-7");
    });

    it("Skills matrix maintains md:py-36, md:p-9 and lg:grid-cols-2 on desktop", () => {
      expect(skillsTsx).toContain("md:py-36");
      expect(skillsTsx).toContain("md:p-9");
      expect(skillsTsx).toContain("lg:grid-cols-2");
    });

    it("Projects section maintains 12-column asymmetric desktop showcase", () => {
      expect(projectsTsx).toContain("lg:grid-cols-12");
      expect(projectsTsx).toContain("lg:col-span-7");
      expect(projectsTsx).toContain("lg:col-span-5");
      expect(featuredProjectCardTsx).toContain("md:p-10");
      expect(projectCardTsx).toContain("md:p-7");
    });

    it("Contact section maintains md:py-36, md:p-10, and 2-column desktop layout", () => {
      expect(contactTsx).toContain("md:py-36");
      expect(contactTsx).toContain("md:p-10");
      expect(contactTsx).toContain("lg:grid-cols-[1.05fr_1.35fr]");
      expect(contactTsx).toContain("md:py-16");
    });
  });
});
