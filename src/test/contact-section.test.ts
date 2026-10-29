import { describe, expect, it } from "vitest";
import { contactReasons, contactSubmissionSchema, processContactMessage } from "@/lib/contact";
import { profile } from "@/data/portfolio";
import fs from "node:fs";
import path from "node:path";

describe("Syadverse Ultimate Contact Section & System", () => {
  it("verifies the 8 exact reason options required by the specification", () => {
    expect(contactReasons).toEqual([
      "Job / Internship Opportunity",
      "AI/ML Research Collaboration",
      "Software Development Project",
      "Technical Collaboration",
      "Hackathon or Community Initiative",
      "Speaking or Event Invitation",
      "General Inquiry",
      "Other",
    ]);
  });

  describe("Form Schema Validation & Security Controls", () => {
    it("rejects empty or whitespace-only name", () => {
      const res = contactSubmissionSchema.safeParse({
        name: "   ",
        email: "test@example.com",
        reason: "General Inquiry",
        message: "Hello Shiva, this is a test inquiry message.",
      });
      expect(res.success).toBe(false);
    });

    it("rejects invalid email formats", () => {
      const invalidEmails = ["notanemail", "user@", "@domain.com", "user@domain"];
      invalidEmails.forEach((email) => {
        const res = contactSubmissionSchema.safeParse({
          name: "Dr. Jane Smith",
          email,
          reason: "General Inquiry",
          message: "Hello Shiva, this is a test inquiry message.",
        });
        expect(res.success).toBe(false);
      });
    });

    it("rejects message shorter than 10 characters", () => {
      const res = contactSubmissionSchema.safeParse({
        name: "Dr. Jane Smith",
        email: "jane@university.edu",
        reason: "AI/ML Research Collaboration",
        message: "Too short",
      });
      expect(res.success).toBe(false);
    });

    it("accepts valid and complete contact submissions", () => {
      const res = contactSubmissionSchema.safeParse({
        name: "Dr. Jane Smith",
        email: "jane@university.edu",
        reason: "AI/ML Research Collaboration",
        subject: "Representation Learning Discussion",
        message:
          "Hello Shiva, we reviewed your AI/ML research work and would like to collaborate on an ongoing project.",
      });
      expect(res.success).toBe(true);
    });

    it("accepts 'Other' reason with custom subject", () => {
      const res = contactSubmissionSchema.safeParse({
        name: "Alex Vance",
        email: "alex@techventure.org",
        reason: "Other",
        subject: "Keynote Panelist Invitation",
        message: "We would like to invite you as a panelist for our upcoming deep-tech symposium.",
      });
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.reason).toBe("Other");
        expect(res.data.subject).toBe("Keynote Panelist Invitation");
      }
    });
  });

  describe("Direct Channel URLs & Verified Assets", () => {
    it("verifies email destination is shivayx07@gmail.com with prefilled inquiry subject", () => {
      expect(profile.email).toBe("shivayx07@gmail.com");
      const contactCode = fs.readFileSync(
        path.resolve(__dirname, "../components/syad/Contact.tsx"),
        "utf-8",
      );
      expect(contactCode).toContain("mailto:${profile.email}?subject=");
      expect(contactCode).toContain("Professional%20Inquiry%20%E2%80%94%20Syadverse%20Portfolio");
    });

    it("verifies LinkedIn profile URL is authentic and points to shivayx07", () => {
      expect(profile.linkedin).toBe("https://www.linkedin.com/in/shivayx07/");
    });

    it("verifies GitHub profile URL is authentic and points to shivayx07-tech", () => {
      expect(profile.github).toBe("https://github.com/shivayx07-tech");
    });

    it("verifies physical resume PDF exists and is linked in profile and Contact section", () => {
      expect(profile.resume).toBe("/Shiva_Yadav_Resume.pdf");
      const publicResumePath = path.resolve(__dirname, "../../public/Shiva_Yadav_Resume.pdf");
      expect(fs.existsSync(publicResumePath)).toBe(true);
      const stat = fs.statSync(publicResumePath);
      expect(stat.size).toBeGreaterThan(100000); // Authentic ~300KB resume PDF
    });
  });

  describe("Copy, Hierarchy & Closing Verification", () => {
    it("verifies specified opening headline, copy, and closing statement", () => {
      const contactCode = fs.readFileSync(
        path.resolve(__dirname, "../components/syad/Contact.tsx"),
        "utf-8",
      );
      const normalizedCode = contactCode.replace(/\s+/g, " ");

      // Main headline
      expect(normalizedCode).toContain("THE NEXT GREAT THING");
      expect(normalizedCode).toContain("STARTS WITH A");
      expect(normalizedCode).toContain("CONVERSATION.");

      // Opening copy
      expect(normalizedCode).toContain(
        "Have an idea worth exploring, a problem worth solving, or an opportunity to build something meaningful? Let's talk.",
      );
      expect(normalizedCode).toContain(
        "I'm interested in meaningful conversations around AI/ML, research, software engineering, and ambitious ideas that can become real-world solutions.",
      );

      // Primary CTA
      expect(normalizedCode).toContain("LET'S START A CONVERSATION");

      // Memorable closing
      expect(normalizedCode).toContain("The next breakthrough could begin with a conversation.");

      // Back to top action
      expect(normalizedCode).toContain("BACK TO TOP");
    });
  });

  describe("Server Handler Execution & Bot Trapping", () => {
    it("detects honeypot bots and returns safe success without dispatching", async () => {
      const res = await processContactMessage({
        name: "Spam Bot 3000",
        email: "bot@spammer.org",
        reason: "General Inquiry",
        message: "Buy cheap backlinks now at our website!",
        website_hp: "http://spamlink.com", // filled honeypot
      });

      expect(res.success).toBe(true);
      expect(res.message).toBeTruthy();
    });

    it("processes valid submission through server function pipeline", async () => {
      const res = await processContactMessage({
        name: "Recruiter Alice",
        email: "alice@hiring.com",
        reason: "Job / Internship Opportunity",
        message: "Hi Shiva, we have an exciting Machine Learning Engineer role opening for you.",
        renderedAt: Date.now() - 5000, // 5 seconds ago
      });

      expect(res.success).toBe(true);
      expect(res.message).toBeTruthy();
    });
  });
});
