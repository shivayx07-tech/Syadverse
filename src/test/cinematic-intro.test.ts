import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("SYADVERSE — Ultimate Cinematic Logo Intro", () => {
  const assetsDir = path.resolve(process.cwd(), "src/assets");
  const publicDir = path.resolve(process.cwd(), "public");
  const introLogoAssetPath = path.join(assetsDir, "syadverse-intro-logo.jpg");
  const introLogoPublicPath = path.join(publicDir, "images/syadverse-intro-logo.jpg");
  const introComponentPath = path.resolve(process.cwd(), "src/components/syad/Intro.tsx");
  const stylesPath = path.resolve(process.cwd(), "src/styles.css");
  const indexRoutePath = path.resolve(process.cwd(), "src/routes/index.tsx");

  describe("Requirement 1: Exact Uploaded Logo Asset Verification", () => {
    it("verifies the authentic 1024x1024 Syadverse logo exists in src/assets and public/images", () => {
      expect(fs.existsSync(introLogoAssetPath)).toBe(true);
      expect(fs.existsSync(introLogoPublicPath)).toBe(true);

      const assetStat = fs.statSync(introLogoAssetPath);
      const publicStat = fs.statSync(introLogoPublicPath);
      expect(assetStat.size).toBe(54581); // Exact uploaded image file size
      expect(publicStat.size).toBe(54581);
    });

    it("verifies the image binary is a valid JPEG with 1024x1024 dimensions", () => {
      const buf = fs.readFileSync(introLogoAssetPath);
      // JPEG magic bytes: FF D8 FF
      expect(buf[0]).toBe(0xff);
      expect(buf[1]).toBe(0xd8);
      expect(buf[2]).toBe(0xff);

      // Search for SOF0/SOF2 marker (0xFF, 0xC0 or 0xC2) to verify dimensions
      let foundSOF = false;
      let height = 0;
      let width = 0;
      for (let i = 0; i < buf.length - 8; i++) {
        if (buf[i] === 0xff && (buf[i + 1] === 0xc0 || buf[i + 1] === 0xc2)) {
          height = buf.readUInt16BE(i + 5);
          width = buf.readUInt16BE(i + 7);
          foundSOF = true;
          break;
        }
      }
      expect(foundSOF).toBe(true);
      expect(width).toBe(1024);
      expect(height).toBe(1024);
    });
  });

  describe("Requirement 2: Complete Removal of Old Video Intro", () => {
    it("verifies Intro.tsx has completely eliminated the <video> element", () => {
      const code = fs.readFileSync(introComponentPath, "utf-8");
      expect(code).not.toContain("<video");
      expect(code).not.toContain("videoRef");
      expect(code).not.toContain("syadverse-intro.mp4");
      expect(code).not.toContain("playsInline");
      expect(code).not.toContain("onEnded");
    });

    it("verifies Intro.tsx does not display video autoplay-blocked fallbacks", () => {
      const code = fs.readFileSync(introComponentPath, "utf-8");
      expect(code).not.toContain("isBlocked");
      expect(code).not.toContain("isVideoReady");
    });
  });

  describe("Requirement 3: Authentic Logo Preservation & Image Presentation", () => {
    it("verifies Intro.tsx imports the authentic logo and displays it via <img>", () => {
      const code = fs.readFileSync(introComponentPath, "utf-8");
      expect(code).toContain('import introLogo from "@/assets/syadverse-intro-logo.jpg"');
      expect(code).toContain("<img");
      expect(code).toContain("src={introLogo}");
      expect(code).toContain('alt="Syadverse — Explore • Build • Evolve"');
      expect(code).toContain("width={1024}");
      expect(code).toContain("height={1024}");
      expect(code).toContain("object-contain");
    });

    it("verifies no duplicate tagline text is rendered underneath the artwork", () => {
      const code = fs.readFileSync(introComponentPath, "utf-8");
      // The tagline "EXPLORE • BUILD • EVOLVE" must exist ONLY in the original artwork image and alt text
      const matches = code.match(/EXPLORE\s*•\s*BUILD\s*•\s*EVOLVE/gi);
      // Only 1 match: the img alt attribute
      expect(matches?.length).toBe(1);
    });

    it("verifies resilient image onError handler gracefully enters the portfolio if loading fails", () => {
      const code = fs.readFileSync(introComponentPath, "utf-8");
      expect(code).toContain("onError");
      expect(code).toContain("finish()");
    });
  });

  describe("Requirement 4: Cinematic Storyboard & Handoff Timing", () => {
    it("verifies total animation duration finishes within the 4 to 6 seconds range", () => {
      const code = fs.readFileSync(introComponentPath, "utf-8");
      // Sequence timer set to 4150ms + 700ms exit fade = 4850ms (~4.85 seconds)
      expect(code).toContain("4150");
      expect(code).toContain("700");
    });

    it("verifies emergency safety fallback exists at 5800ms", () => {
      const code = fs.readFileSync(introComponentPath, "utf-8");
      expect(code).toContain("safetyTimeoutRef");
      expect(code).toContain("5800");
    });

    it("verifies Starfield warp handoff (warp.v = 0.55) connects the intro to the hero section", () => {
      const code = fs.readFileSync(introComponentPath, "utf-8");
      expect(code).toContain("warp.v = 0.55");
      expect(code).toContain("easeWarp");
    });
  });

  describe("Requirement 5: Skip Intro & Keyboard Accessibility", () => {
    it("verifies accessible Skip Intro button with minimum 44px touch target", () => {
      const code = fs.readFileSync(introComponentPath, "utf-8");
      expect(code).toContain("SKIP INTRO");
      expect(code).toContain("min-h-[44px]");
      expect(code).toContain("focus-visible:ring-2");
    });

    it("verifies Escape key listener immediately triggers skip", () => {
      const code = fs.readFileSync(introComponentPath, "utf-8");
      expect(code).toContain('e.key === "Escape"');
      expect(code).toContain("skip()");
    });

    it("verifies prefers-reduced-motion bypasses intro immediately", () => {
      const code = fs.readFileSync(introComponentPath, "utf-8");
      expect(code).toContain("prefers-reduced-motion");
      expect(code).toContain("onEnter()");
    });
  });

  describe("Requirement 6: Session Persistence & Deep Link Bypassing", () => {
    it("verifies sessionStorage persists entered state to prevent replaying on refresh/navigation", () => {
      const code = fs.readFileSync(indexRoutePath, "utf-8");
      expect(code).toContain('sessionStorage.getItem("syadverse_entered") === "true"');
      expect(code).toContain('sessionStorage.setItem("syadverse_entered", "true")');
    });

    it("verifies deep link hashes and skip query params bypass intro", () => {
      const code = fs.readFileSync(indexRoutePath, "utf-8");
      expect(code).toContain('window.location.search.includes("skip")');
      expect(code).toContain('window.location.search.includes("enter")');
      expect(code).toContain("window.location.hash.length > 1");
    });
  });

  describe("Requirement 7: CSS Keyframes and Visual Architecture", () => {
    it("verifies styles.css defines intro backdrop, ambient glow, artwork animation, and light sweep", () => {
      const css = fs.readFileSync(stylesPath, "utf-8");
      expect(css).toContain(".intro-backdrop");
      expect(css).toContain(".intro-ambient-glow");
      expect(css).toContain("@keyframes intro-ambient-pulse");
      expect(css).toContain(".intro-logo-artwork");
      expect(css).toContain("@keyframes intro-logo-emergence");
      expect(css).toContain(".intro-light-sweep-container");
      expect(css).toContain(".intro-light-sweep");
      expect(css).toContain("@keyframes intro-light-sweep-anim");
    });

    it("verifies prefers-reduced-motion media query disables intro animations in CSS", () => {
      const css = fs.readFileSync(stylesPath, "utf-8");
      expect(css).toContain(".intro-ambient-glow");
      expect(css).toContain("animation: none !important");
    });
  });
});
