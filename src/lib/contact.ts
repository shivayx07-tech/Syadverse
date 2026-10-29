import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const contactReasons = [
  "Job / Internship Opportunity",
  "AI/ML Research Collaboration",
  "Software Development Project",
  "Technical Collaboration",
  "Hackathon or Community Initiative",
  "Speaking or Event Invitation",
  "General Inquiry",
  "Other",
] as const;

export type ContactReason = (typeof contactReasons)[number];

export const contactSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please provide your name (at least 2 characters)")
    .max(100, "Name must not exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(255, "Email must not exceed 255 characters"),
  reason: z.enum(contactReasons, {
    errorMap: () => ({ message: "Please select a valid reason for contact" }),
  }),
  subject: z.string().trim().max(120, "Subject must not exceed 120 characters").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters"),
  website_hp: z.string().optional(),
  renderedAt: z.number().optional(),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;

export interface ContactSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
  provider?: "resend" | "development";
}

/**
 * Core business logic for processing contact submissions, bot detection,
 * and email transmission via Resend.
 */
export async function processContactMessage(
  data: ContactSubmissionInput,
): Promise<ContactSubmissionResult> {
  // 1. Honeypot bot protection: if hidden field is filled, silently succeed
  if (data.website_hp && data.website_hp.trim().length > 0) {
    return {
      success: true,
      message:
        "Your message has been submitted successfully. Thank you for reaching out — I'll be able to review your inquiry.",
      provider: "development",
    };
  }

  // 2. Cooldown check: prevent automated scripts submitting under 1.2s from load
  if (data.renderedAt && Date.now() - data.renderedAt < 1200) {
    return {
      success: false,
      error: "Submission received too quickly. Please take a moment and try again.",
    };
  }

  const destinationEmail = process.env.CONTACT_DESTINATION_EMAIL || "shivayx07@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;

  // 3. Dispatch via Resend API if API key is configured
  if (resendApiKey) {
    try {
      const subjectLine = `[Syadverse Contact] ${data.reason}${data.subject ? `: ${data.subject}` : ""} — from ${data.name}`;

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "Syadverse Contact <onboarding@resend.dev>",
          to: [destinationEmail],
          reply_to: data.email,
          subject: subjectLine,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; color: #151626; border: 1px solid #e2e8f0; border-radius: 12px;">
              <div style="border-bottom: 2px solid #5D6C8C; padding-bottom: 12px; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #090A0D; font-size: 20px;">New Message from Syadverse Portfolio</h2>
                <p style="margin: 4px 0 0 0; color: #5D6C8C; font-size: 13px;">Received via website contact form</p>
              </div>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #5D6C8C; font-size: 13px; width: 140px;">Sender Name:</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #090A0D;">${escapeHtml(data.name)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #5D6C8C; font-size: 13px;">Sender Email:</td>
                  <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(data.email)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #5D6C8C; font-size: 13px;">Inquiry Reason:</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 500;">${escapeHtml(data.reason)}</td>
                </tr>
                ${
                  data.subject
                    ? `
                <tr>
                  <td style="padding: 8px 0; color: #5D6C8C; font-size: 13px;">Custom Subject:</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 500;">${escapeHtml(data.subject)}</td>
                </tr>`
                    : ""
                }
              </table>
              <div style="margin-top: 16px; padding: 18px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #5D6C8C;">
                <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #5D6C8C;">Message Content</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #1e293b;">${escapeHtml(data.message)}</p>
              </div>
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
                Syadverse Portfolio System · Direct Client Inquiry Transmission
              </div>
            </div>
          `,
          text: `New Message from Syadverse Portfolio\n\nSender Name: ${data.name}\nSender Email: ${data.email}\nReason: ${data.reason}\n${data.subject ? `Custom Subject: ${data.subject}\n` : ""}\nMessage:\n${data.message}\n\n---\nSent from Syadverse Contact System`,
        }),
      });

      if (!response.ok) {
        const errPayload = await response.json().catch(() => ({}));
        console.error("[Resend API Error Response]", errPayload);
        return {
          success: false,
          error: `Message delivery service could not complete transmission. Please reach Shiva directly at ${destinationEmail}.`,
        };
      }

      return {
        success: true,
        message:
          "Your message has been submitted successfully. Thank you for reaching out — I'll be able to review your inquiry.",
        provider: "resend",
      };
    } catch (networkErr) {
      console.error("[Resend API Network Error]", networkErr);
      return {
        success: false,
        error: `Network error during delivery transmission. Please reach Shiva directly at ${destinationEmail}.`,
      };
    }
  }

  // 4. Development mode handling when RESEND_API_KEY is not yet supplied in environment
  console.info("[Syadverse Contact Form Received — Dev Pipeline]", {
    name: data.name,
    email: data.email,
    reason: data.reason,
    subject: data.subject,
    destination: destinationEmail,
    timestamp: new Date().toISOString(),
  });

  return {
    success: true,
    message:
      "Your message has been submitted successfully. Thank you for reaching out — I'll be able to review your inquiry.",
    provider: "development",
  };
}

export const submitContactMessage = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSubmissionSchema.parse(data))
  .handler(async ({ data }): Promise<ContactSubmissionResult> => {
    return processContactMessage(data);
  });
