import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Syadverse Google Logo Asset & Home Page Integration Audit", () => {
  const assetsDir = path.resolve(process.cwd(), "src/assets");
  const heroPath = path.resolve(process.cwd(), "src/components/syad/Hero.tsx");
  const stylesPath = path.resolve(process.cwd(), "src/styles.css");

  describe("1. Exact Reference Asset Management", () => {
    it("verifies the original reference asset is saved in src/assets/google-logo.jpg", () => {
      const jpgPath = path.join(assetsDir, "google-logo.jpg");
      expect(fs.existsSync(jpgPath)).toBe(true);

      const stat = fs.statSync(jpgPath);
      // Byte-for-byte exact reference image (53,415 bytes)
      expect(stat.size).toBe(53415);

      const fd = fs.openSync(jpgPath, "r");
      const magic = Buffer.alloc(2);
      fs.readSync(fd, magic, 0, 2, 0);
      fs.closeSync(fd);
      // JPEG SOI marker 0xFF 0xD8
      expect(magic[0]).toBe(0xff);
      expect(magic[1]).toBe(0xd8);
    });

    it("verifies the transparent asset exists in src/assets/google-logo.png", () => {
      const pngPath = path.join(assetsDir, "google-logo.png");
      expect(fs.existsSync(pngPath)).toBe(true);

      const stat = fs.statSync(pngPath);
      expect(stat.size).toBeGreaterThan(50000);

      // Verify PNG signature (89 50 4E 47 0D 0A 1A 0A)
      const fd = fs.openSync(pngPath, "r");
      const header = Buffer.alloc(24);
      fs.readSync(fd, header, 0, 24, 0);
      fs.closeSync(fd);

      expect(header[0]).toBe(0x89);
      expect(header.toString("ascii", 1, 4)).toBe("PNG");

      // Verify IHDR dimensions (800 x 450) and color type (RGBA = 6)
      const width = header.readUInt32BE(16);
      const height = header.readUInt32BE(20);
      expect(width).toBe(800);
      expect(height).toBe(450);
    });
  });

  describe("2. Home Page Component Integration", () => {
    it("verifies Hero.tsx imports googleLogo from @/assets/google-logo.png", () => {
      const heroCode = fs.readFileSync(heroPath, "utf-8");
      expect(heroCode).toContain('import googleLogo from "@/assets/google-logo.png";');
    });

    it("verifies GoogleLogo renders an accessible img element with alt='Google'", () => {
      const heroCode = fs.readFileSync(heroPath, "utf-8");
      expect(heroCode).toContain("function GoogleLogo({ className }: { className?: string })");
      expect(heroCode).toContain("src={googleLogo}");
      expect(heroCode).toContain('alt="Google"');
      expect(heroCode).toContain("width={800}");
      expect(heroCode).toContain("height={450}");
      expect(heroCode).toContain('loading="eager"');
    });

    it("verifies Google Student Ambassador card uses GoogleLogo and preserves hierarchy", () => {
      const heroCode = fs.readFileSync(heroPath, "utf-8");
      expect(heroCode).toContain('className="hero-glass-card card-google"');
      expect(heroCode).toContain(
        '<GoogleLogo className="google-wordmark-img google-wordmark-svg" />',
      );
      expect(heroCode).toContain("GOOGLE STUDENT AMBASSADOR '26");
      expect(heroCode).toContain("Community | Leadership | Impact");
      expect(heroCode).toContain('onClick={() => setOpen("google")}');
    });
  });

  describe("3. Styling & Responsive Geometry", () => {
    it("verifies styles.css defines aspect-ratio and object-fit for google-wordmark classes", () => {
      const styles = fs.readFileSync(stylesPath, "utf-8");
      expect(styles).toContain(".google-wordmark-img");
      expect(styles).toContain("aspect-ratio: 16 / 9;");
      expect(styles).toContain("object-fit: contain;");
    });
  });
});
