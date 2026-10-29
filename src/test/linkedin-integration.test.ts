import { describe, expect, it } from "vitest";
import { profile, quickFacts } from "@/data/portfolio";
import fs from "node:fs";
import path from "node:path";

describe("LinkedIn Profile Integration across Syadverse", () => {
  const EXPECTED_LINKEDIN_URL = "https://www.linkedin.com/in/shivayx07/";

  it("verifies the centralized profile object defines the exact personal LinkedIn URL", () => {
    expect(profile.linkedin).toBe(EXPECTED_LINKEDIN_URL);
    expect(profile.linkedin).not.toContain("your-handle");
    expect(profile.linkedin).not.toBe("");
  });

  it("verifies quickFacts contains the verified LinkedIn entry", () => {
    const fact = quickFacts.find((f) => f.label === "LinkedIn");
    expect(fact).toBeDefined();
    expect(fact?.href).toBe(EXPECTED_LINKEDIN_URL);
    expect(fact?.value).toBe("linkedin.com/in/shivayx07");
    expect(fact?.isExternal).toBe(true);
  });

  it("verifies other core social links (GitHub) remain fully intact and authentic", () => {
    expect(profile.github).toBe("https://github.com/shivayx07-tech");
    const githubFact = quickFacts.find((f) => f.label === "GitHub");
    expect(githubFact).toBeDefined();
    expect(githubFact?.href).toBe("https://github.com/shivayx07-tech");
  });

  it("verifies Nav component connects the LinkedIn icon with secure attributes and aria-label", () => {
    const navContent = fs.readFileSync(
      path.resolve(__dirname, "../components/syad/Nav.tsx"),
      "utf-8",
    );

    expect(navContent).toContain("href={profile.linkedin}");
    expect(navContent).toContain('target="_blank"');
    expect(navContent).toContain('rel="noopener noreferrer"');
    expect(navContent).toContain('aria-label="Visit my LinkedIn profile"');
    expect(navContent).toContain("<FaLinkedinIn");
  });

  it("verifies Contact direct communication channels connect the LinkedIn icon with secure attributes", () => {
    const contactContent = fs.readFileSync(
      path.resolve(__dirname, "../components/syad/Contact.tsx"),
      "utf-8",
    );

    expect(contactContent).toContain("href={profile.linkedin}");
    expect(contactContent).toContain('target="_blank"');
    expect(contactContent).toContain('rel="noopener noreferrer"');
    expect(contactContent).toContain('aria-label="Visit my LinkedIn profile"');
    expect(contactContent).toContain("<FaLinkedinIn");
  });

  it("verifies Footer connects the personal LinkedIn icon with accessible touch target and secure attributes", () => {
    const contactContent = fs.readFileSync(
      path.resolve(__dirname, "../components/syad/Contact.tsx"),
      "utf-8",
    );

    // Extract Footer function block
    const footerBlock = contactContent.slice(contactContent.indexOf("export function Footer()"));
    expect(footerBlock).toContain("href={profile.linkedin}");
    expect(footerBlock).toContain('target="_blank"');
    expect(footerBlock).toContain('rel="noopener noreferrer"');
    expect(footerBlock).toContain('aria-label="Visit my LinkedIn profile"');
    expect(footerBlock).toContain("grid h-11 w-11 place-items-center");
  });

  it("ensures no stale LinkedIn placeholders remain in source data", () => {
    const portfolioContent = fs.readFileSync(
      path.resolve(__dirname, "../data/portfolio.ts"),
      "utf-8",
    );
    expect(portfolioContent).not.toContain("your-handle");
  });
});
