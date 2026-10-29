import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Syadverse Hero IIT Kanpur Research Card Refinement Audit", () => {
  const heroPath = path.resolve(process.cwd(), "src/components/syad/Hero.tsx");
  const stylesPath = path.resolve(process.cwd(), "src/styles.css");
  const assetsDir = path.resolve(process.cwd(), "src/assets");

  describe("1. Exact Content Verification", () => {
    it("verifies the exact Institution and Role", () => {
      const heroCode = fs.readFileSync(heroPath, "utf-8");
      expect(heroCode).toContain('<h2 className="card-title">IIT KANPUR</h2>');
      expect(heroCode).toContain('<p className="card-role">AI/ML RESEARCH INTERN</p>');
    });

    it("verifies the exact Mentor line directly below role", () => {
      const heroCode = fs.readFileSync(heroPath, "utf-8");
      expect(heroCode).toContain(
        '<p className="iitk-mentor-line">Research under Professor Nitin Saxena</p>',
      );
    });

    it("verifies the exact Description text without omission or abbreviation", () => {
      const heroCode = fs.readFileSync(heroPath, "utf-8");
      const normalizedCode = heroCode.replace(/\s+/g, " ");
      expect(normalizedCode).toContain(
        "Exploring intelligent systems through machine learning, rigorous experimentation, and research-driven problem-solving.",
      );
      // Explicitly check that the word "learning" is present in full
      expect(normalizedCode).toContain("machine learning");
    });

    it("verifies the exact Bottom labels (MACHINE LEARNING · EXPERIMENTATION · RESEARCH)", () => {
      const heroCode = fs.readFileSync(heroPath, "utf-8");
      expect(heroCode).toContain('<span className="iitk-tag">MACHINE LEARNING</span>');
      expect(heroCode).toContain('<span className="iitk-tag">EXPERIMENTATION</span>');
      expect(heroCode).toContain('<span className="iitk-tag">RESEARCH</span>');
    });
  });

  describe("2. Assets and Hierarchy", () => {
    it("verifies the official IIT Kanpur logo asset is preserved and rendered", () => {
      const logoPath = path.join(assetsDir, "iitk-logo.svg");
      expect(fs.existsSync(logoPath)).toBe(true);

      const heroCode = fs.readFileSync(heroPath, "utf-8");
      expect(heroCode).toContain('import iitkLogo from "@/assets/iitk-logo.svg";');
      expect(heroCode).toContain(
        '<img src={iitkLogo} alt="IIT Kanpur Seal" className="iitk-seal-img" />',
      );
    });

    it("verifies external link indicator and dialog modal trigger are intact", () => {
      const heroCode = fs.readFileSync(heroPath, "utf-8");
      expect(heroCode).toContain('onClick={() => setOpen("iit")}');
      expect(heroCode).toContain('aria-haspopup="dialog"');
      expect(heroCode).toContain("card-external-icon");
    });
  });

  describe("3. Anti-Clipping & Text Wrapping Styles", () => {
    it("verifies white-space: normal is enforced on the card and description to prevent clipping", () => {
      const styles = fs.readFileSync(stylesPath, "utf-8");
      const heroCode = fs.readFileSync(heroPath, "utf-8");

      // Verify whitespace-normal utility in Hero component
      expect(heroCode).toContain("card-iitk whitespace-normal");

      // Verify white-space: normal in CSS rules
      expect(styles).toContain(".hero-glass-card");
      expect(styles).toMatch(/\.hero-glass-card\s*\{[^}]*white-space:\s*normal/);
      expect(styles).toMatch(/\.iitk-research-description\s*\{[^}]*white-space:\s*normal/);
      expect(styles).toMatch(/\.iitk-mentor-line\s*\{[^}]*white-space:\s*normal/);
    });

    it("verifies overflow-wrap and word-breaking rules protect text from overflowing", () => {
      const styles = fs.readFileSync(stylesPath, "utf-8");
      expect(styles).toMatch(/\.iitk-research-description\s*\{[^}]*overflow-wrap:\s*break-word/);
      expect(styles).toMatch(/\.iitk-mentor-line\s*\{[^}]*overflow-wrap:\s*break-word/);
    });

    it("verifies min-width: 0 is applied to flex parents to prevent flex child overflow", () => {
      const styles = fs.readFileSync(stylesPath, "utf-8");
      expect(styles).toMatch(/\.iitk-content-block\s*\{[^}]*min-width:\s*0/);
      expect(styles).toMatch(/\.card-content-block\s*\{[^}]*min-width:\s*0/);
    });

    it("verifies tags row allows natural wrapping on narrow widths without cutting tags", () => {
      const styles = fs.readFileSync(stylesPath, "utf-8");
      expect(styles).toMatch(/\.iitk-tags-row\s*\{[^}]*flex-wrap:\s*wrap/);
      expect(styles).toMatch(/\.iitk-tag\s*\{[^}]*white-space:\s*nowrap/);
    });
  });
});
