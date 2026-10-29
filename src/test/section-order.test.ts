import { describe, expect, it } from "vitest";
import { navigationItems } from "@/data/portfolio";

describe("Syadverse Section Order", () => {
  it("has Certificates positioned immediately before Gallery in navigationItems", () => {
    const ids = navigationItems.map((item) => item.id);
    const certIndex = ids.indexOf("certificates");
    const galleryIndex = ids.indexOf("gallery");
    const projectsIndex = ids.indexOf("projects");

    expect(certIndex).toBeGreaterThan(-1);
    expect(galleryIndex).toBeGreaterThan(-1);
    expect(projectsIndex).toBeGreaterThan(-1);

    expect(certIndex).toBe(projectsIndex + 1);
    expect(galleryIndex).toBe(certIndex + 1);
  });

  it("maintains the exact full sequence of portfolio sections", () => {
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
});
