import { describe, expect, it } from "vitest";
import { profile, navigationItems } from "@/data/portfolio";
import fs from "node:fs";
import path from "node:path";

describe("Syadverse Ultimate Home Page & Resume Integration Audit", () => {
  const publicDir = path.resolve(process.cwd(), "public");
  const heroPath = path.resolve(process.cwd(), "src/components/syad/Hero.tsx");
  const navPath = path.resolve(process.cwd(), "src/components/syad/Nav.tsx");
  const indexRoutePath = path.resolve(process.cwd(), "src/routes/index.tsx");
  const stylesPath = path.resolve(process.cwd(), "src/styles.css");

  describe("1. Authentic Resume Integration (Highest Priority)", () => {
    it("verifies physical authentic resume PDF exists in public root", () => {
      const resumePath = path.join(publicDir, "Shiva_Yadav_Resume.pdf");
      expect(fs.existsSync(resumePath)).toBe(true);

      const stat = fs.statSync(resumePath);
      expect(stat.size).toBeGreaterThan(100000); // Authentic ~300KB resume PDF

      // Verify PDF magic bytes
      const fd = fs.openSync(resumePath, "r");
      const buffer = Buffer.alloc(5);
      fs.readSync(fd, buffer, 0, 5, 0);
      fs.closeSync(fd);
      expect(buffer.toString("utf-8")).toBe("%PDF-");
    });

    it("verifies profile.resume configuration points to /Shiva_Yadav_Resume.pdf", () => {
      expect(profile.resume).toBe("/Shiva_Yadav_Resume.pdf");
    });

    it("verifies Hero component contains functional Download Resume CTA", () => {
      const heroCode = fs.readFileSync(heroPath, "utf-8");
      expect(heroCode).toContain("Download Resume ↓");
      expect(heroCode).toContain('download="Shiva_Yadav_Resume.pdf"');
      expect(heroCode).toContain('target="_blank"');
      expect(heroCode).toContain('rel="noopener noreferrer"');
    });

    it("verifies Nav component contains Resume CTA in desktop and mobile menu", () => {
      const navCode = fs.readFileSync(navPath, "utf-8");
      expect(navCode).toContain("nav-resume-btn");
      expect(navCode).toContain('download="Shiva_Yadav_Resume.pdf"');
      expect(navCode).toContain("reference-mobile-resume-link");
    });
  });

  describe("2. Hero Section Content & Visual Hierarchy", () => {
    it("verifies hero content communicates personal identity, role, and focus", () => {
      const heroCode = fs.readFileSync(heroPath, "utf-8");
      expect(heroCode).toContain("Shiva");
      expect(heroCode).toContain("Yadav.");
      expect(heroCode).toContain("AI/ML Engineer · Full-Stack Developer");
      expect(heroCode).toContain("intelligent systems");
    });

    it("verifies Primary CTA Explore My Work directs visitors to #projects", () => {
      const heroCode = fs.readFileSync(heroPath, "utf-8");
      expect(heroCode).toContain("EXPLORE MY WORK");
      expect(heroCode).toContain('href="#projects"');
    });

    it("verifies hero provides quick contact route and social links", () => {
      const heroCode = fs.readFileSync(heroPath, "utf-8");
      expect(heroCode).toContain("Let's Connect");
      expect(heroCode).toContain('href="#contact"');
      expect(heroCode).toContain("profile.linkedin");
      expect(heroCode).toContain("profile.github");
    });
  });

  describe("3. Navigation Destination & Accessibility Audit", () => {
    it("verifies all essential navigation items are present in correct order", () => {
      const ids = navigationItems.map((item) => item.id);
      expect(ids).toEqual([
        "home",
        "about",
        "skills",
        "experience",
        "projects",
        "certificates",
        "gallery",
        "contact",
      ]);
    });

    it("verifies smooth scroll behavior and header scroll margins in styles.css", () => {
      const styles = fs.readFileSync(stylesPath, "utf-8");
      expect(styles).toContain("scroll-behavior: smooth;");
      expect(styles).toContain("scroll-margin-top: 5.5rem;");
    });
  });

  describe("4. SEO, Social Sharing & Assets", () => {
    it("verifies Open Graph and Twitter image preview exists and is configured", () => {
      const ogImagePath = path.join(publicDir, "og-preview.jpg");
      expect(fs.existsSync(ogImagePath)).toBe(true);

      const indexCode = fs.readFileSync(indexRoutePath, "utf-8");
      expect(indexCode).toContain('property: "og:image", content: "/og-preview.jpg"');
      expect(indexCode).toContain('name: "twitter:image", content: "/og-preview.jpg"');
      expect(indexCode).toContain('name: "twitter:card", content: "summary_large_image"');
    });

    it("verifies robots.txt exists and permits crawler access", () => {
      const robotsPath = path.join(publicDir, "robots.txt");
      expect(fs.existsSync(robotsPath)).toBe(true);
      const content = fs.readFileSync(robotsPath, "utf-8");
      expect(content).toContain("User-agent: *");
      expect(content).toContain("Allow: /");
    });
  });
});
