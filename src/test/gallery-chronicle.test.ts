import { describe, expect, it } from "vitest";
import {
  galleryChronicleArchive,
  getGalleryStats,
  yearChapters,
  galleryFilterOptions,
} from "@/data/galleryArchive";
import { experienceMissions } from "@/data/experienceArchive";

describe("Syadverse Ultimate Chronological Gallery Archive", () => {
  it("contains exactly the 12 specified chronological milestone chapters", () => {
    expect(galleryChronicleArchive.length).toBe(12);
  });

  it("verifies events appear in strict ascending chronological order from 2025 to 2026", () => {
    const years = galleryChronicleArchive.map((e) => e.year);
    expect(years[0]).toBe(2025);
    expect(years[years.length - 1]).toBe(2026);

    // First 4 events belong to 2025, remaining 8 belong to 2026
    const events2025 = galleryChronicleArchive.filter((e) => e.year === 2025);
    const events2026 = galleryChronicleArchive.filter((e) => e.year === 2026);

    expect(events2025.length).toBe(4);
    expect(events2026.length).toBe(8);

    // Event numbers are sequential 01 through 12
    galleryChronicleArchive.forEach((e, idx) => {
      const expectedNum = String(idx + 1).padStart(2, "0");
      expect(e.eventNumber).toBe(expectedNum);
    });
  });

  it("verifies all 12 events have complete titles, dates, categories, and exact original quotes", () => {
    galleryChronicleArchive.forEach((event) => {
      expect(event.id).toBeTruthy();
      expect(event.title).toBeTruthy();
      expect(event.date).toBeTruthy();
      expect(event.category).toBeTruthy();
      expect(event.quote).toBeTruthy();
      expect(event.quote.startsWith("“")).toBe(true);
      expect(event.quote.endsWith("”")).toBe(true);
      expect(event.description).toBeTruthy();
      expect(event.filterCategories.length).toBeGreaterThanOrEqual(2);
      expect(event.filterCategories).toContain("ALL");
    });
  });

  it("verifies specific critical constraints from the editorial specifications", () => {
    // Event 04 (IWM Workshop): 13 December 2025; no invented second date
    const iwm = galleryChronicleArchive.find((e) => e.id === "iwm-workshop-2025");
    expect(iwm).toBeDefined();
    expect(iwm?.date).toBe("13 December 2025");

    // Event 11 (Two-Day MATLAB Workshop): displays "August 2026", dates not guessed
    const matlab = galleryChronicleArchive.find((e) => e.id === "matlab-workshop-2026");
    expect(matlab).toBeDefined();
    expect(matlab?.date).toBe("August 2026");

    // Event 07 (Spark Hack): PPT Submission Round achievement
    const spark = galleryChronicleArchive.find((e) => e.id === "spark-hack-2026");
    expect(spark).toBeDefined();
    expect(spark?.achievement).toContain("PPT Submission Round");

    // Event 09 (Cognitive Chaos): Microsoft Office, Finalist achievement
    const cc = galleryChronicleArchive.find((e) => e.id === "cognitive-chaos-2026");
    expect(cc).toBeDefined();
    expect(cc?.location).toBe("Microsoft Office, Noida");
    expect(cc?.achievement).toContain("Finalists");

    // Event 08 (IIT Kanpur Research Internship): 17 May 2026 – 18 July 2026
    const iitk = galleryChronicleArchive.find(
      (e) => e.id === "iit-kanpur-research-internship-2026",
    );
    expect(iitk).toBeDefined();
    expect(iitk?.date).toBe("17 May 2026 – 18 July 2026");
  });

  it("verifies chapter dividers for 2025 and 2026 are defined with expected headings and subtitles", () => {
    expect(yearChapters[2025].title).toBe("2025 — THE BEGINNING OF EXPLORATION");
    expect(yearChapters[2025].subtitle).toBe("Where curiosity found new directions.");

    expect(yearChapters[2026].title).toBe("2026 — THE YEAR OF BUILDING");
    expect(yearChapters[2026].subtitle).toBe(
      "From learning new ideas to building, researching, and leading with purpose.",
    );
  });

  it("verifies dynamic gallery statistics accurately reflect registered photographs", () => {
    const stats = getGalleryStats();
    expect(stats.totalEvents).toBe(12);
    expect(stats.totalYears).toBe(2);
    expect(stats.yearsSpan).toBe("2025—2026");
    expect(stats.hasPhotos).toBe(true);
    expect(stats.totalPhotosUploaded).toBe(85);
    expect(stats.statusText).toBe("85 ARCHIVED PHOTOGRAPHS");
  });

  it("verifies TRIPS 2025 has official cover and exactly 5 ordered photographs", () => {
    const trips = galleryChronicleArchive.find((e) => e.id === "trips-2025");
    expect(trips).toBeDefined();
    expect(trips?.coverImage).toBeTruthy();
    expect(trips?.photos.length).toBe(5);

    // Official cover is photo 1
    expect(trips?.photos[0].url).toBe(trips?.coverImage);
    expect(trips?.photos[0].id).toBe("trips-2025-01");

    // All subsequent photos in exact order with metadata
    const expectedIds = [
      "trips-2025-01",
      "trips-2025-02",
      "trips-2025-03",
      "trips-2025-04",
      "trips-2025-05",
    ];
    trips?.photos.forEach((photo, idx) => {
      expect(photo.id).toBe(expectedIds[idx]);
      expect(photo.url).toBeTruthy();
      expect(photo.caption).toBeTruthy();
      expect(photo.alt).toBeTruthy();
      expect(photo.aspectRatio).toBeTruthy();
    });
  });

  it("verifies CyberXplore 2025 has official cover and exactly 3 ordered photographs", () => {
    const cyber = galleryChronicleArchive.find((e) => e.id === "cyberxplore-2025");
    expect(cyber).toBeDefined();
    expect(cyber?.coverImage).toBeTruthy();
    expect(cyber?.photos.length).toBe(3);

    // Official cover is photo 1
    expect(cyber?.photos[0].url).toBe(cyber?.coverImage);
    expect(cyber?.photos[0].id).toBe("cyberxplore-2025-01");

    // All subsequent photos in exact order with metadata
    const expectedIds = ["cyberxplore-2025-01", "cyberxplore-2025-02", "cyberxplore-2025-03"];
    cyber?.photos.forEach((photo, idx) => {
      expect(photo.id).toBe(expectedIds[idx]);
      expect(photo.url).toBeTruthy();
      expect(photo.caption).toBeTruthy();
      expect(photo.alt).toBeTruthy();
      expect(photo.aspectRatio).toBeTruthy();
    });
  });

  it("verifies Google DevFest Lucknow 2025 has official cover and exactly 7 ordered photographs", () => {
    const devfest = galleryChronicleArchive.find((e) => e.id === "google-devfest-lucknow-2025");
    expect(devfest).toBeDefined();
    expect(devfest?.coverImage).toBeTruthy();
    expect(devfest?.photos.length).toBe(7);

    // Official cover is photo 1
    expect(devfest?.photos[0].url).toBe(devfest?.coverImage);
    expect(devfest?.photos[0].id).toBe("google-devfest-lucknow-2025-01");
    expect(devfest?.photos[0].aspectRatio).toBe("16:9");

    // All subsequent photos in exact order with metadata
    const expectedIds = [
      "google-devfest-lucknow-2025-01",
      "google-devfest-lucknow-2025-02",
      "google-devfest-lucknow-2025-03",
      "google-devfest-lucknow-2025-04",
      "google-devfest-lucknow-2025-05",
      "google-devfest-lucknow-2025-06",
      "google-devfest-lucknow-2025-07",
    ];
    devfest?.photos.forEach((photo, idx) => {
      expect(photo.id).toBe(expectedIds[idx]);
      expect(photo.url).toBeTruthy();
      expect(photo.caption).toBeTruthy();
      expect(photo.alt).toBeTruthy();
      expect(photo.aspectRatio).toBeTruthy();
    });

    // All 12 chronological milestone events are now 100% populated across the entire gallery chronicle archive
    galleryChronicleArchive.forEach((e) => {
      expect(e.photos.length).toBeGreaterThan(0);
      expect(e.coverImage).toBeTruthy();
    });
  });

  it("verifies IWM Regional Workshop has official cover and exactly 7 ordered photographs", () => {
    const iwm = galleryChronicleArchive.find((e) => e.id === "iwm-workshop-2025");
    expect(iwm).toBeDefined();
    expect(iwm?.coverImage).toBeTruthy();
    expect(iwm?.photos.length).toBe(7);

    // Official cover is photo 1
    expect(iwm?.photos[0].url).toBe(iwm?.coverImage);
    expect(iwm?.photos[0].id).toBe("iwm-regional-workshop-2025-01");
    expect(iwm?.photos[0].aspectRatio).toBe("4:3");

    // All subsequent photos in exact order with metadata
    const expectedIds = [
      "iwm-regional-workshop-2025-01",
      "iwm-regional-workshop-2025-02",
      "iwm-regional-workshop-2025-03",
      "iwm-regional-workshop-2025-04",
      "iwm-regional-workshop-2025-05",
      "iwm-regional-workshop-2025-06",
      "iwm-regional-workshop-2025-07",
    ];
    iwm?.photos.forEach((photo, idx) => {
      expect(photo.id).toBe(expectedIds[idx]);
      expect(photo.url).toBeTruthy();
      expect(photo.caption).toBeTruthy();
      expect(photo.alt).toBeTruthy();
      expect(photo.aspectRatio).toBeTruthy();
    });
  });

  it("verifies Women in AI World has official cover and exactly 5 ordered photographs", () => {
    const event = galleryChronicleArchive.find((e) => e.id === "women-in-ai-world-2026");
    expect(event).toBeDefined();
    expect(event?.coverImage).toBeTruthy();
    expect(event?.photos.length).toBe(5);

    // Official cover is photo 1
    expect(event?.photos[0].url).toBe(event?.coverImage);
    expect(event?.photos[0].id).toBe("women-in-ai-world-2026-01");
    expect(event?.photos[0].aspectRatio).toBe("3:4");

    // All subsequent photos in exact order with metadata
    const expectedIds = [
      "women-in-ai-world-2026-01",
      "women-in-ai-world-2026-02",
      "women-in-ai-world-2026-03",
      "women-in-ai-world-2026-04",
      "women-in-ai-world-2026-05",
    ];
    event?.photos.forEach((photo, idx) => {
      expect(photo.id).toBe(expectedIds[idx]);
      expect(photo.url).toBeTruthy();
      expect(photo.caption).toBeTruthy();
      expect(photo.alt).toBeTruthy();
      expect(photo.aspectRatio).toBeTruthy();
    });
  });

  it("verifies TEDxIIT Kanpur has official cover and exactly 7 ordered photographs", () => {
    const event = galleryChronicleArchive.find((e) => e.id === "tedx-iit-kanpur-2026");
    expect(event).toBeDefined();
    expect(event?.coverImage).toBeTruthy();
    expect(event?.photos.length).toBe(7);

    // Official cover is photo 1
    expect(event?.photos[0].url).toBe(event?.coverImage);
    expect(event?.photos[0].id).toBe("tedx-iit-kanpur-2026-01");
    expect(event?.photos[0].aspectRatio).toBe("1:1");

    // All subsequent photos in exact order with metadata
    const expectedIds = [
      "tedx-iit-kanpur-2026-01",
      "tedx-iit-kanpur-2026-02",
      "tedx-iit-kanpur-2026-03",
      "tedx-iit-kanpur-2026-04",
      "tedx-iit-kanpur-2026-05",
      "tedx-iit-kanpur-2026-06",
      "tedx-iit-kanpur-2026-07",
    ];
    event?.photos.forEach((photo, idx) => {
      expect(photo.id).toBe(expectedIds[idx]);
      expect(photo.url).toBeTruthy();
      expect(photo.caption).toBeTruthy();
      expect(photo.alt).toBeTruthy();
      expect(photo.aspectRatio).toBeTruthy();
    });
  });

  it("verifies Spark Hack 2026 has official cover and exactly 8 ordered photographs", () => {
    const event = galleryChronicleArchive.find((e) => e.id === "spark-hack-2026");
    expect(event).toBeDefined();
    expect(event?.coverImage).toBeTruthy();
    expect(event?.photos.length).toBe(8);

    // Official cover is photo 1
    expect(event?.photos[0].url).toBe(event?.coverImage);
    expect(event?.photos[0].id).toBe("spark-hack-2026-01");
    expect(event?.photos[0].aspectRatio).toBe("3:4");

    // All subsequent photos in exact order with metadata
    const expectedIds = [
      "spark-hack-2026-01",
      "spark-hack-2026-02",
      "spark-hack-2026-03",
      "spark-hack-2026-04",
      "spark-hack-2026-05",
      "spark-hack-2026-06",
      "spark-hack-2026-07",
      "spark-hack-2026-08",
    ];
    event?.photos.forEach((photo, idx) => {
      expect(photo.id).toBe(expectedIds[idx]);
      expect(photo.url).toBeTruthy();
      expect(photo.caption).toBeTruthy();
      expect(photo.alt).toBeTruthy();
      expect(photo.aspectRatio).toBeTruthy();
    });
  });

  it("verifies AI/ML Summer Research Internship at IIT Kanpur has official cover and exactly 14 ordered photographs", () => {
    const event = galleryChronicleArchive.find(
      (e) => e.id === "iit-kanpur-research-internship-2026",
    );
    expect(event).toBeDefined();
    expect(event?.coverImage).toBeTruthy();
    expect(event?.photos.length).toBe(14);

    // Official cover is photo 1
    expect(event?.photos[0].url).toBe(event?.coverImage);
    expect(event?.photos[0].id).toBe("iit-kanpur-research-internship-2026-01");
    expect(event?.photos[0].aspectRatio).toBe("3:4");

    // All subsequent photos in exact order with metadata
    const expectedIds = [
      "iit-kanpur-research-internship-2026-01",
      "iit-kanpur-research-internship-2026-02",
      "iit-kanpur-research-internship-2026-03",
      "iit-kanpur-research-internship-2026-04",
      "iit-kanpur-research-internship-2026-05",
      "iit-kanpur-research-internship-2026-06",
      "iit-kanpur-research-internship-2026-07",
      "iit-kanpur-research-internship-2026-08",
      "iit-kanpur-research-internship-2026-09",
      "iit-kanpur-research-internship-2026-10",
      "iit-kanpur-research-internship-2026-11",
      "iit-kanpur-research-internship-2026-12",
      "iit-kanpur-research-internship-2026-13",
      "iit-kanpur-research-internship-2026-14",
    ];
    event?.photos.forEach((photo, idx) => {
      expect(photo.id).toBe(expectedIds[idx]);
      expect(photo.url).toBeTruthy();
      expect(photo.caption).toBeTruthy();
      expect(photo.alt).toBeTruthy();
      expect(photo.aspectRatio).toBeTruthy();
    });
  });

  it("verifies Cognitive Chaos 2026 has official cover and exactly 8 ordered photographs", () => {
    const event = galleryChronicleArchive.find((e) => e.id === "cognitive-chaos-2026");
    expect(event).toBeDefined();
    expect(event?.coverImage).toBeTruthy();
    expect(event?.photos.length).toBe(8);

    // Official cover is photo 1
    expect(event?.photos[0].url).toBe(event?.coverImage);
    expect(event?.photos[0].id).toBe("cognitive-chaos-2026-01");
    expect(event?.photos[0].aspectRatio).toBe("3:4");

    // All subsequent photos in exact order with metadata
    const expectedIds = [
      "cognitive-chaos-2026-01",
      "cognitive-chaos-2026-02",
      "cognitive-chaos-2026-03",
      "cognitive-chaos-2026-04",
      "cognitive-chaos-2026-05",
      "cognitive-chaos-2026-06",
      "cognitive-chaos-2026-07",
      "cognitive-chaos-2026-08",
    ];
    event?.photos.forEach((photo, idx) => {
      expect(photo.id).toBe(expectedIds[idx]);
      expect(photo.url).toBeTruthy();
      expect(photo.caption).toBeTruthy();
      expect(photo.alt).toBeTruthy();
      expect(photo.aspectRatio).toBeTruthy();
    });
  });

  it("verifies AI Builder Workshop has official cover and exactly 6 ordered photographs", () => {
    const event = galleryChronicleArchive.find((e) => e.id === "ai-builder-workshop-2026");
    expect(event).toBeDefined();
    expect(event?.coverImage).toBeTruthy();
    expect(event?.photos.length).toBe(6);

    // Official cover is photo 1
    expect(event?.photos[0].url).toBe(event?.coverImage);
    expect(event?.photos[0].id).toBe("ai-builder-workshop-2026-01");
    expect(event?.photos[0].aspectRatio).toBe("9:16");

    // All subsequent photos in exact order with metadata
    const expectedIds = [
      "ai-builder-workshop-2026-01",
      "ai-builder-workshop-2026-02",
      "ai-builder-workshop-2026-03",
      "ai-builder-workshop-2026-04",
      "ai-builder-workshop-2026-05",
      "ai-builder-workshop-2026-06",
    ];
    event?.photos.forEach((photo, idx) => {
      expect(photo.id).toBe(expectedIds[idx]);
      expect(photo.url).toBeTruthy();
      expect(photo.caption).toBeTruthy();
      expect(photo.alt).toBeTruthy();
      expect(photo.aspectRatio).toBeTruthy();
    });
  });

  it("verifies Two-Day MATLAB Workshop 2026 has official cover and exactly 6 ordered photographs", () => {
    const event = galleryChronicleArchive.find((e) => e.id === "matlab-workshop-2026");
    expect(event).toBeDefined();
    expect(event?.coverImage).toBeTruthy();
    expect(event?.photos.length).toBe(6);

    // Official cover is photo 1
    expect(event?.photos[0].url).toBe(event?.coverImage);
    expect(event?.photos[0].id).toBe("matlab-workshop-2026-01");
    expect(event?.photos[0].aspectRatio).toBe("1:1");

    // All subsequent photos in exact order with metadata
    const expectedIds = [
      "matlab-workshop-2026-01",
      "matlab-workshop-2026-02",
      "matlab-workshop-2026-03",
      "matlab-workshop-2026-04",
      "matlab-workshop-2026-05",
      "matlab-workshop-2026-06",
    ];
    event?.photos.forEach((photo, idx) => {
      expect(photo.id).toBe(expectedIds[idx]);
      expect(photo.url).toBeTruthy();
      expect(photo.caption).toBeTruthy();
      expect(photo.alt).toBeTruthy();
      expect(photo.aspectRatio).toBeTruthy();
    });
  });

  it("verifies Artificial Intelligence and Career Guidance Seminar has official cover and exactly 9 ordered photographs", () => {
    const event = galleryChronicleArchive.find((e) => e.id === "ai-career-guidance-seminar-2026");
    expect(event).toBeDefined();
    expect(event?.coverImage).toBeTruthy();
    expect(event?.photos.length).toBe(9);

    // Dedicated official cover is configured
    expect(event?.coverImage).toBeTruthy();
    expect(event?.photos[0].id).toBe("ai-career-guidance-seminar-2026-01");
    expect(event?.photos[0].aspectRatio).toBe("3:4");

    // All subsequent photos in exact order with metadata
    const expectedIds = [
      "ai-career-guidance-seminar-2026-01",
      "ai-career-guidance-seminar-2026-02",
      "ai-career-guidance-seminar-2026-03",
      "ai-career-guidance-seminar-2026-04",
      "ai-career-guidance-seminar-2026-05",
      "ai-career-guidance-seminar-2026-06",
      "ai-career-guidance-seminar-2026-07",
      "ai-career-guidance-seminar-2026-08",
      "ai-career-guidance-seminar-2026-09",
    ];
    event?.photos.forEach((photo, idx) => {
      expect(photo.id).toBe(expectedIds[idx]);
      expect(photo.url).toBeTruthy();
      expect(photo.caption).toBeTruthy();
      expect(photo.alt).toBeTruthy();
      expect(photo.aspectRatio).toBeTruthy();
    });
  });

  it("ensures every filter category partitions the collection without zero-length categories", () => {
    galleryFilterOptions.forEach((filter) => {
      const matching = galleryChronicleArchive.filter((e) =>
        filter.id === "ALL" ? true : e.filterCategories.includes(filter.id),
      );
      expect(matching.length).toBeGreaterThan(0);
    });
  });

  it("verifies Gallery and Experience sections have independent, correct covers for the AI Seminar", () => {
    const galleryEvent = galleryChronicleArchive.find(
      (e) => e.id === "ai-career-guidance-seminar-2026",
    );
    const experienceMission = experienceMissions.find(
      (m) => m.slug === "ai-career-guidance-seminar",
    );

    expect(galleryEvent).toBeDefined();
    expect(experienceMission).toBeDefined();

    // Gallery cover is the original podium hosting photograph
    expect(galleryEvent?.coverImage).toBe(galleryEvent?.photos[0].url);
    expect(galleryEvent?.photos[0].caption).toContain("smart podium");

    // Experience cover is the certificate presentation photograph with faculty
    expect(experienceMission?.coverImage).toBeTruthy();
    expect(experienceMission?.coverImageAlt).toContain("Certificate of Appreciation");

    // The two sections must have distinct cover images
    expect(galleryEvent?.coverImage).not.toBe(experienceMission?.coverImage);
  });
});
