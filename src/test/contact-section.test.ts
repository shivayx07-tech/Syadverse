import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import {
  contactReasons,
  contactSubmissionSchema,
  processContactMessage,
  buildContactEmailPayload,
  formatSubmissionTimestamps,
  clearRateLimitCache,
} from "@/lib/contact";
import { profile } from "@/data/portfolio";
import fs from "node:fs";
import path from "node:path";

describe("Syadverse Ultimate Contact Section & System", () => {
  beforeEach(() => {
    clearRateLimitCache();
  });

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

    it("rejects message longer than 2000 characters", () => {
      const res = contactSubmissionSchema.safeParse({
        name: "Dr. Jane Smith",
        email: "jane@university.edu",
        reason: "AI/ML Research Collaboration",
        message: "A".repeat(2001),
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

  describe("Email Template & Dispatch Payload Construction", () => {
    it("formats timestamps in both IST and UTC timezones", () => {
      const testDate = new Date("2026-10-29T16:00:00.000Z");
      const timestamps = formatSubmissionTimestamps(testDate);
      expect(timestamps.ist).toContain("IST");
      expect(timestamps.utc).toContain("UTC");
      expect(timestamps.iso).toBe("2026-10-29T16:00:00.000Z");
    });

    it("builds compliant Resend payload with verified From, Reply-To, and Subject", () => {
      const payload = buildContactEmailPayload(
        {
          name: "Dr. Elena Rostova",
          email: "elena@stanford.edu",
          reason: "AI/ML Research Collaboration",
          subject: "Geometric Deep Learning",
          message: "Would love to discuss joint research on geometric graphs and symmetries.",
        },
        "shivayx07@gmail.com",
        "Syadverse Contact <onboarding@resend.dev>",
        new Date("2026-10-29T16:00:00.000Z"),
      );

      // Subject starts with the exact required prefix
      expect(payload.subject).toContain("New Portfolio Message — Syadverse:");
      expect(payload.subject).toContain("Geometric Deep Learning");
      expect(payload.subject).toContain("from Dr. Elena Rostova");

      // Reply-To matches visitor email
      expect(payload.reply_to).toBe("elena@stanford.edu");

      // Recipient is Shiva's designated email
      expect(payload.to).toEqual(["shivayx07@gmail.com"]);

      // Verified sender From address
      expect(payload.from).toBe("Syadverse Contact <onboarding@resend.dev>");

      // HTML contains all necessary details
      expect(payload.html).toContain("Dr. Elena Rostova");
      expect(payload.html).toContain("elena@stanford.edu");
      expect(payload.html).toContain("AI/ML Research Collaboration");
      expect(payload.html).toContain("Geometric Deep Learning");
      expect(payload.html).toContain(
        "Would love to discuss joint research on geometric graphs and symmetries.",
      );
      expect(payload.html).toContain("SYADVERSE · DIRECT MESSAGE DISPATCH");

      // Plaintext fallback contains all details
      expect(payload.text).toContain("Dr. Elena Rostova");
      expect(payload.text).toContain("elena@stanford.edu");
      expect(payload.text).toContain("AI/ML Research Collaboration");
      expect(payload.text).toContain(
        "Would love to discuss joint research on geometric graphs and symmetries.",
      );
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
      expect(stat.size).toBeGreaterThan(100000);
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

  describe("Real Email Provider Acceptance & Error Handling Flow", () => {
    const originalEnv = { ...process.env };

    afterEach(() => {
      process.env = { ...originalEnv };
      vi.restoreAllMocks();
    });

    it("confirms provider acceptance when Resend API returns 200 with delivery ID", async () => {
      process.env.RESEND_API_KEY = "re_test_mock_key_12345";
      process.env.CONTACT_EMAIL = "shivayx07@gmail.com";

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ id: "msg_resend_confirmed_9988" }),
      });
      globalThis.fetch = mockFetch;

      const res = await processContactMessage({
        name: "Dr. Alistair Finch",
        email: "alistair@oxford.ac.uk",
        reason: "Speaking or Event Invitation",
        subject: "Oxford AI Keynote",
        message:
          "We would be honored to host you for a guest session on deep learning architectures.",
        renderedAt: Date.now() - 5000,
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const [url, options] = mockFetch.mock.calls[0];
      expect(url).toBe("https://api.resend.com/emails");
      expect(options.headers["Authorization"]).toBe("Bearer re_test_mock_key_12345");

      // Provider confirms acceptance
      expect(res.success).toBe(true);
      expect(res.provider).toBe("resend");
      expect(res.deliveryId).toBe("msg_resend_confirmed_9988");
      expect(res.message).toContain("Message sent successfully!");
    });

    it("NEVER claims success when Resend API rejects the request (e.g. 401 Unauthorized)", async () => {
      process.env.RESEND_API_KEY = "re_invalid_or_expired_key";
      process.env.CONTACT_EMAIL = "shivayx07@gmail.com";

      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        statusText: "Unauthorized",
        json: async () => ({ message: "API key is invalid", name: "authentication_error" }),
      });
      globalThis.fetch = mockFetch;

      const res = await processContactMessage({
        name: "Jane Doe",
        email: "jane@test.org",
        reason: "General Inquiry",
        message: "Checking in to see if you are open to technical mentoring.",
        renderedAt: Date.now() - 5000,
      });

      expect(res.success).toBe(false);
      expect(res.error).toBeTruthy();
      expect(res.error).toContain("401");
      expect(res.error).toContain("API key is invalid");
      expect(res.error).toContain("shivayx07@gmail.com");
    });

    it("NEVER claims success when Resend API experiences a network or abort error", async () => {
      process.env.RESEND_API_KEY = "re_test_network_key";
      process.env.CONTACT_EMAIL = "shivayx07@gmail.com";

      const mockFetch = vi.fn().mockRejectedValue(new Error("Network connection dropped"));
      globalThis.fetch = mockFetch;

      const res = await processContactMessage({
        name: "Jane Doe",
        email: "jane@test.org",
        reason: "General Inquiry",
        message: "Checking in to see if you are open to technical mentoring.",
        renderedAt: Date.now() - 5000,
      });

      expect(res.success).toBe(false);
      expect(res.error).toContain("Network error during delivery transmission");
      expect(res.error).toContain("shivayx07@gmail.com");
    });

    it("rejects without false success when RESEND_API_KEY is missing in production runtime", async () => {
      delete process.env.RESEND_API_KEY;
      delete process.env.VITEST;
      process.env.ALLOW_DEV_CONTACT_MOCK = "false";

      const res = await processContactMessage({
        name: "Production Visitor",
        email: "visitor@company.com",
        reason: "Job / Internship Opportunity",
        message: "We have an open position matching your profile and would love to interview you.",
        renderedAt: Date.now() - 5000,
      });

      // Crucial: Must NOT return true!
      expect(res.success).toBe(false);
      expect(res.error).toContain("RESEND_API_KEY");
      expect(res.error).toContain("shivayx07@gmail.com");
    });
  });

  describe("Anti-Abuse, Rate Limiting & Bot Trapping", () => {
    it("detects honeypot bots and returns safe response without calling Resend API", async () => {
      const mockFetch = vi.fn();
      globalThis.fetch = mockFetch;

      const res = await processContactMessage({
        name: "Spam Bot 3000",
        email: "bot@spammer.org",
        reason: "General Inquiry",
        message: "Buy cheap backlinks now at our website!",
        website_hp: "http://spamlink.com", // filled honeypot
      });

      expect(res.success).toBe(true);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("rejects submissions made too quickly (< 1200ms cooldown)", async () => {
      const res = await processContactMessage({
        name: "Script Submitter",
        email: "script@bot.com",
        reason: "General Inquiry",
        message: "This was submitted in 200 milliseconds by a script.",
        renderedAt: Date.now() - 200,
      });

      expect(res.success).toBe(false);
      expect(res.error).toContain("Submission received too quickly");
    });

    it("prevents rapid repeat submissions from the same sender email address", async () => {
      process.env.ALLOW_DEV_CONTACT_MOCK = "true";

      const sub1 = await processContactMessage({
        name: "Eager Sender",
        email: "eager@startup.io",
        reason: "Software Development Project",
        message: "First message sent immediately.",
        renderedAt: Date.now() - 5000,
      });
      expect(sub1.success).toBe(true);

      // Rapid second submission (< 3s later)
      const sub2 = await processContactMessage({
        name: "Eager Sender",
        email: "eager@startup.io",
        reason: "Software Development Project",
        message: "Second message sent rapidly right after.",
        renderedAt: Date.now() - 5000,
      });
      expect(sub2.success).toBe(false);
      expect(sub2.error).toContain("Please wait a moment before sending another message.");
    });
  });

  describe("Frontend Contact Component Implementation Audit", () => {
    it("verifies inputs have disabled state attached during submitting", () => {
      const contactCode = fs.readFileSync(
        path.resolve(__dirname, "../components/syad/Contact.tsx"),
        "utf-8",
      );

      expect(contactCode).toContain('disabled={submissionStatus === "submitting"}');
      expect(contactCode).toContain("TRANSMITTING MESSAGE...");
      expect(contactCode).toContain('role="alert"');
      expect(contactCode).toContain('aria-live="polite"');
    });

    it("verifies entered form inputs are NOT wiped on submission failure", () => {
      const contactCode = fs.readFileSync(
        path.resolve(__dirname, "../components/syad/Contact.tsx"),
        "utf-8",
      );

      // On submission failure, only status and statusMessage are set, formData is preserved
      expect(contactCode).toContain('setSubmissionStatus("error")');
      expect(contactCode).not.toContain('setFormData({ name: ""');
    });
  });
});
