import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  const experienceSlugs = [
    "iit-kanpur-research",
    "google-student-ambassador",
    "ignishun-tech",
    "ai-career-guidance-seminar",
    "matlab-workshop",
    "cognitive-chaos-hackathon",
  ];

  experienceSlugs.forEach((slug) => {
    it(`matches route for /experience/${slug}`, () => {
      const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
      const matches = router.matchRoutes(`/experience/${slug}`);
      expect(matches.at(-1)?.routeId).toBe("/experience/$experienceId");
    });
  });

  const projectIds = ["nexestate", "financial-engine", "cafe-ecommerce", "healthgrid", "packpilot"];

  projectIds.forEach((id) => {
    it(`matches route for /projects/${id}`, () => {
      const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
      const matches = router.matchRoutes(`/projects/${id}`);
      expect(matches.at(-1)?.routeId).toBe("/projects/$projectId");
    });
  });

  it("confirms removed experiences are absent from archive model", async () => {
    const { getExperienceBySlug } = await import("@/data/experienceArchive");
    expect(getExperienceBySlug("tata-data-analytics")).toBeUndefined();
    expect(getExperienceBySlug("placement-cybersecurity-leadership")).toBeUndefined();
  });
});
