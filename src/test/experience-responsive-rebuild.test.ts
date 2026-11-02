import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { experienceMissions, EXPERIENCE_CATEGORIES } from "@/data/experienceArchive";

describe("SYADVERSE — Experience Section Responsive Rebuild & Card Verification", () => {
  const experienceCardTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/experience/ExperienceCard.tsx"),
    "utf-8",
  );
  const experienceArchiveTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/experience/ExperienceArchiveSection.tsx"),
    "utf-8",
  );
  const experienceCoverGraphicTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/experience/ExperienceCoverGraphic.tsx"),
    "utf-8",
  );
  const experienceDetailTsx = fs.readFileSync(
    path.resolve(__dirname, "../components/syad/experience/ExperienceDetailPage.tsx"),
    "utf-8",
  );

  describe("1. Archive Missions Data Integrity (All 6 Authentic Entries)", () => {
    it("Contains exactly 6 authentic missions without simulation or fake entries", () => {
      expect(experienceMissions).toHaveLength(6);
      const slugs = experienceMissions.map((m) => m.slug);
      expect(slugs).toEqual([
        "iit-kanpur-research",
        "google-student-ambassador",
        "ignishun-tech",
        "ai-career-guidance-seminar",
        "matlab-workshop",
        "cognitive-chaos-hackathon",
      ]);
    });

    it("Every mission has valid required fields, title, organization, and shortDescription", () => {
      experienceMissions.forEach((m) => {
        expect(m.id).toMatch(/^mission-\d{3}$/);
        expect(m.missionNumber).toMatch(/^MISSION \d{3}$/);
        expect(m.title.length).toBeGreaterThan(0);
        expect(m.organization.length).toBeGreaterThan(0);
        expect(m.shortDescription.length).toBeGreaterThan(20);
        expect(m.overview.length).toBeGreaterThan(50);
        expect(m.responsibilities.length).toBeGreaterThanOrEqual(1);
      });
    });

    it("Mission 001 (IIT Kanpur) has verified research credentials and authentic data", () => {
      const iitk = experienceMissions.find((m) => m.slug === "iit-kanpur-research");
      expect(iitk).toBeDefined();
      expect(iitk?.researchAssociation).toBe("Prof. Nitin Saxena");
      expect(iitk?.evidence.length).toBeGreaterThanOrEqual(2);
      expect(iitk?.gallery.length).toBeGreaterThanOrEqual(5);
      expect(iitk?.responsibilities.length).toBeGreaterThanOrEqual(3);
    });

    it("Mission 002 (Google Student Ambassador) has containment and valid evidence", () => {
      const gsa = experienceMissions.find((m) => m.slug === "google-student-ambassador");
      expect(gsa).toBeDefined();
      expect(gsa?.coverImageFit).toBe("contain");
      expect(gsa?.evidence.length).toBeGreaterThanOrEqual(3);
      expect(gsa?.gallery.length).toBeGreaterThanOrEqual(2);
    });

    it("Mission 003 (Ignishun Tech) has containment and authentic onboarding gallery", () => {
      const ign = experienceMissions.find((m) => m.slug === "ignishun-tech");
      expect(ign).toBeDefined();
      expect(ign?.coverImageFit).toBe("contain");
      expect(ign?.gallery.length).toBeGreaterThanOrEqual(3);
    });

    it("Missions 004, 005, 006 have verified certificates and galleries", () => {
      const sem = experienceMissions.find((m) => m.slug === "ai-career-guidance-seminar");
      const mat = experienceMissions.find((m) => m.slug === "matlab-workshop");
      const cog = experienceMissions.find((m) => m.slug === "cognitive-chaos-hackathon");

      expect(sem?.evidence).toHaveLength(1);
      expect(sem?.gallery.length).toBeGreaterThanOrEqual(4);
      expect(mat?.evidence).toHaveLength(1);
      expect(mat?.gallery.length).toBeGreaterThanOrEqual(4);
      expect(cog?.evidence).toHaveLength(1);
      expect(cog?.gallery.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe("2. Grid Architecture & Section Responsive Safeguards", () => {
    it("Enforces grid-cols-1 for mobile with minmax(0, 1fr) behavior", () => {
      expect(experienceArchiveTsx).toContain("grid-cols-1");
      expect(experienceArchiveTsx).toContain("sm:grid-cols-2");
      expect(experienceArchiveTsx).toContain("lg:grid-cols-3");
    });

    it("Experience section container has overflow-hidden, w-full, max-w-full, min-w-0", () => {
      expect(experienceArchiveTsx).toContain("overflow-hidden");
      expect(experienceArchiveTsx).toContain("w-full max-w-full");
      expect(experienceArchiveTsx).toContain("relative mx-auto max-w-7xl w-full min-w-0");
    });

    it("Category filters container has w-full min-w-0 max-w-full flex-wrap", () => {
      expect(experienceArchiveTsx).toContain(
        "flex flex-wrap items-center gap-2 border-b border-border/30 pb-6 w-full min-w-0 max-w-full",
      );
    });

    it("Bottom footnote has full responsive wrapping (flex-col sm:flex-row w-full min-w-0)", () => {
      expect(experienceArchiveTsx).toContain(
        "flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border/30 bg-surface/30 px-4 sm:px-6 py-4 text-xs text-dim w-full min-w-0 max-w-full",
      );
    });
  });

  describe("3. Unified ExperienceCard Anti-Overflow & Hierarchy Architecture", () => {
    it("Article and Link are constrained with w-full min-w-0 max-w-full", () => {
      expect(experienceCardTsx).toContain(
        '<article className="h-full w-full min-w-0 max-w-full">',
      );
      expect(experienceCardTsx).toContain(
        'className="group relative flex h-full w-full min-w-0 max-w-full flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-surface/60',
      );
    });

    it("Does not mix conflicting display: block with display: flex on Link", () => {
      // Must not have "cursor-pointer block" after "flex"
      expect(experienceCardTsx).not.toContain("cursor-pointer block text-left");
      expect(experienceCardTsx).toContain("cursor-pointer text-left");
    });

    it("Cover container enforces w-full min-w-0 max-w-full overflow-hidden", () => {
      expect(experienceCardTsx).toContain(
        '<div className="relative w-full min-w-0 max-w-full overflow-hidden">',
      );
    });

    it("Floating category badge has max-w constraint and truncate to prevent right-edge clipping", () => {
      expect(experienceCardTsx).toContain("max-w-[calc(100%-1.5rem)]");
      expect(experienceCardTsx).toContain("max-w-full truncate rounded-full");
    });

    it("Header row uses mobile flex-col and desktop sm:flex-row to prevent squeezing long names", () => {
      expect(experienceCardTsx).toContain(
        "flex w-full min-w-0 max-w-full flex-col gap-1.5 border-b border-border/20 pb-2.5 sm:flex-row sm:items-center sm:justify-between",
      );
    });

    it("Headings, roles, and descriptions enforce break-words and [overflow-wrap:anywhere]", () => {
      expect(experienceCardTsx).toContain("break-words [overflow-wrap:anywhere]");
    });

    it("Bottom action bar has w-full min-w-0 max-w-full with flex-wrap", () => {
      expect(experienceCardTsx).toContain(
        "flex flex-wrap items-center justify-between gap-2 border-t border-border/20 pt-3.5 sm:pt-4 w-full min-w-0 max-w-full",
      );
    });
  });

  describe("4. Cover Graphic Safeguards", () => {
    it("Enforces w-full min-w-0 max-w-full on image container", () => {
      expect(experienceCoverGraphicTsx).toContain(
        "relative flex w-full min-w-0 max-w-full items-center justify-center overflow-hidden",
      );
    });

    it("Enforces w-full min-w-0 max-w-full on fallback card container", () => {
      expect(experienceCoverGraphicTsx).toContain(
        "relative flex w-full min-w-0 max-w-full flex-col justify-between overflow-hidden",
      );
    });

    it("Image element contains max-w-full w-full h-full", () => {
      expect(experienceCoverGraphicTsx).toContain("h-full w-full max-w-full");
    });
  });

  describe("5. Desktop Preservation Invariants", () => {
    it("Preserves desktop 3-column grid (lg:grid-cols-3 lg:gap-8)", () => {
      expect(experienceArchiveTsx).toContain("lg:grid-cols-3");
      expect(experienceArchiveTsx).toContain("lg:gap-8");
    });

    it("Preserves desktop card padding (md:p-6)", () => {
      expect(experienceCardTsx).toContain("md:p-6");
    });

    it("Preserves desktop section padding (md:py-36)", () => {
      expect(experienceArchiveTsx).toContain("md:py-36");
    });

    it("Preserves desktop hover translate interaction (hover:-translate-y-1)", () => {
      expect(experienceCardTsx).toContain("hover:-translate-y-1");
    });
  });
});
