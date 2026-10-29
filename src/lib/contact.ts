import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export function escapeHtml(text: string): string {
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
  deliveryId?: string;
}

/**
 * Format timestamp in both IST (Asia/Kolkata) and UTC.
 */
export function formatSubmissionTimestamps(date: Date = new Date()): {
  ist: string;
  utc: string;
  iso: string;
} {
  const iso = date.toISOString();
  let ist = "";
  let utc = "";

  try {
    const istFormatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });
    ist = `${istFormatter.format(date)} (IST, UTC+05:30)`;
  } catch {
    ist = `${date.toLocaleString()} (Local)`;
  }

  try {
    const utcFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC",
      dateStyle: "full",
      timeStyle: "medium",
    });
    utc = `${utcFormatter.format(date)} (UTC)`;
  } catch {
    utc = `${date.toUTCString()} (UTC)`;
  }

  return { ist, utc, iso };
}

/**
 * In-memory sliding-window rate limiter per sender email.
 * Allows maximum 5 submissions per 10 minutes and requires at least 3 seconds between submissions.
 */
interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export function clearRateLimitCache(): void {
  rateLimitMap.clear();
}

/**
 * Build professional email templates (HTML and plaintext fallback)
 */
export function buildContactEmailPayload(
  data: ContactSubmissionInput,
  destinationEmail: string,
  fromEmail: string,
  timestamp: Date = new Date(),
) {
  const formattedTimes = formatSubmissionTimestamps(timestamp);
  const subjectLine = `New Portfolio Message — Syadverse: ${
    data.subject ? `${data.subject} (${data.reason})` : data.reason
  } — from ${data.name}`;

  const escapedName = escapeHtml(data.name);
  const escapedEmail = escapeHtml(data.email);
  const escapedReason = escapeHtml(data.reason);
  const escapedSubject = data.subject ? escapeHtml(data.subject) : "";
  const escapedMessage = escapeHtml(data.message);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subjectLine)}</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #090A0D; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F2E0DC;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #151626; border: 1px solid rgba(93, 108, 140, 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);">
    
    <!-- Top Cosmic Brand Header -->
    <div style="padding: 28px 24px 20px 24px; background: linear-gradient(135deg, rgba(21, 22, 38, 1) 0%, rgba(13, 15, 26, 1) 100%); border-bottom: 1px solid rgba(93, 108, 140, 0.25);">
      <div style="display: inline-block; padding: 4px 10px; border-radius: 9999px; background: rgba(172, 189, 212, 0.12); border: 1px solid rgba(172, 189, 212, 0.3); font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #ACBDD4; margin-bottom: 12px;">
        SYADVERSE · DIRECT MESSAGE DISPATCH
      </div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #F2E0DC; letter-spacing: -0.02em;">
        New Portfolio Inquiry
      </h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #8E95A8;">
        Received through your portfolio website contact form at <a href="https://syadverse.com" style="color: #ACBDD4; text-decoration: none;">syadverse.com</a>
      </p>
    </div>

    <!-- Core Details Table -->
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 9px 0; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8E95A8; width: 130px; vertical-align: top;">
            Sender Name:
          </td>
          <td style="padding: 9px 0; font-size: 15px; font-weight: 600; color: #F2E0DC;">
            ${escapedName}
          </td>
        </tr>
        <tr>
          <td style="padding: 9px 0; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8E95A8; vertical-align: top;">
            Sender Email:
          </td>
          <td style="padding: 9px 0; font-size: 14px;">
            <a href="mailto:${escapedEmail}" style="color: #ACBDD4; font-weight: 600; text-decoration: underline;">
              ${escapedEmail}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 9px 0; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8E95A8; vertical-align: top;">
            Inquiry Reason:
          </td>
          <td style="padding: 9px 0; font-size: 14px; font-weight: 500; color: #F2E0DC;">
            <span style="display: inline-block; padding: 3px 10px; border-radius: 6px; background: rgba(93, 108, 140, 0.25); border: 1px solid rgba(93, 108, 140, 0.4); font-size: 12px; color: #ACBDD4;">
              ${escapedReason}
            </span>
          </td>
        </tr>
        ${
          escapedSubject
            ? `
        <tr>
          <td style="padding: 9px 0; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8E95A8; vertical-align: top;">
            Custom Topic:
          </td>
          <td style="padding: 9px 0; font-size: 14px; font-weight: 500; color: #F2E0DC;">
            ${escapedSubject}
          </td>
        </tr>`
            : ""
        }
        <tr>
          <td style="padding: 9px 0; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8E95A8; vertical-align: top;">
            Submitted At:
          </td>
          <td style="padding: 9px 0; font-size: 12px; color: #B0B5C6;">
            <div><strong>${formattedTimes.ist}</strong></div>
            <div style="color: #8E95A8; margin-top: 2px;">${formattedTimes.utc}</div>
          </td>
        </tr>
      </table>

      <!-- Message Content Card -->
      <div style="background-color: #090A0D; border: 1px solid rgba(93, 108, 140, 0.3); border-left: 4px solid #ACBDD4; border-radius: 10px; padding: 18px 20px; margin-bottom: 24px;">
        <div style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #ACBDD4; margin-bottom: 10px;">
          Message Content
        </div>
        <div style="font-size: 14.5px; line-height: 1.65; white-space: pre-wrap; color: #F2E0DC; word-break: break-word;">
${escapedMessage}
        </div>
      </div>

      <!-- Quick Action: Reply to Sender -->
      <div style="text-align: center; padding-top: 8px; margin-bottom: 12px;">
        <a href="mailto:${escapedEmail}?subject=Re:%20${encodeURIComponent(
          subjectLine,
        )}" style="display: inline-block; background-color: #ACBDD4; color: #090A0D; font-weight: 600; font-size: 13px; text-decoration: none; padding: 12px 26px; border-radius: 9999px; letter-spacing: 0.05em; text-transform: uppercase;">
          Reply to ${escapedName}
        </a>
      </div>
    </div>

    <!-- Footer Security Notice -->
    <div style="padding: 16px 24px; background-color: #0D0F1A; border-top: 1px solid rgba(93, 108, 140, 0.2); font-size: 11px; color: #5D6C8C; text-align: center; line-height: 1.5;">
      Syadverse Portfolio System · Delivered to ${escapeHtml(destinationEmail)}<br>
      Reply-To is configured to ${escapedEmail}
    </div>
  </div>
</body>
</html>
`.trim();

  const text = `
New Portfolio Message — Syadverse
=====================================================

Sender Name:    ${data.name}
Sender Email:   ${data.email}
Inquiry Reason: ${data.reason}
${data.subject ? `Custom Topic:   ${data.subject}\n` : ""}Submitted At:   ${formattedTimes.ist}
                ${formattedTimes.utc}

Message Content:
-----------------------------------------------------
${data.message}
-----------------------------------------------------

Direct Reply:   mailto:${data.email}
Delivered via Syadverse Portfolio Direct Message System (syadverse.com)
Recipient: ${destinationEmail}
`.trim();

  return {
    from: fromEmail,
    to: [destinationEmail],
    reply_to: data.email,
    subject: subjectLine,
    html,
    text,
  };
}

/**
 * Core business logic for processing contact submissions, bot detection,
 * rate limiting, and email transmission via Resend.
 */
export async function processContactMessage(
  data: ContactSubmissionInput,
): Promise<ContactSubmissionResult> {
  // 1. Honeypot bot protection: if hidden field is filled, silently succeed
  if (data.website_hp && data.website_hp.trim().length > 0) {
    return {
      success: true,
      message:
        "Message sent successfully! Thank you for reaching out. I'll get back to you as soon as possible.",
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

  // 3. Sliding-window rate limiting per email (max 5 in 10 minutes, min 3s apart)
  const normalizedEmail = data.email.toLowerCase().trim();
  const now = Date.now();
  const record = rateLimitMap.get(normalizedEmail) || { timestamps: [] };
  // Prune entries older than 10 minutes (600,000ms)
  record.timestamps = record.timestamps.filter((t) => now - t < 600000);

  if (record.timestamps.length >= 5) {
    return {
      success: false,
      error:
        "Too many messages received from this address recently. Please wait a few minutes before submitting again, or email Shiva directly.",
    };
  }

  if (
    record.timestamps.length > 0 &&
    now - record.timestamps[record.timestamps.length - 1] < 3000
  ) {
    return {
      success: false,
      error: "Please wait a moment before sending another message.",
    };
  }

  const destinationEmail =
    process.env.CONTACT_EMAIL?.trim() ||
    process.env.CONTACT_DESTINATION_EMAIL?.trim() ||
    "shivayx07@gmail.com";

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Syadverse Contact <onboarding@resend.dev>";

  const resendApiKey = process.env.RESEND_API_KEY?.trim();

  // 4. Dispatch via Resend API if API key is configured
  if (resendApiKey) {
    try {
      const emailPayload = buildContactEmailPayload(
        data,
        destinationEmail,
        fromEmail,
        new Date(now),
      );

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      let response: Response;
      try {
        response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailPayload),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutId);
      }

      if (!response.ok) {
        const errPayload = (await response.json().catch(() => ({}))) as {
          message?: string;
          name?: string;
        };
        console.error("[Resend API Error Response]", {
          status: response.status,
          statusText: response.statusText,
          payload: errPayload,
        });

        const detail = errPayload.message ? `: ${errPayload.message}` : "";
        return {
          success: false,
          error: `Message delivery service could not complete transmission (${response.status}${detail}). Please reach Shiva directly at ${destinationEmail}.`,
        };
      }

      const resData = (await response.json().catch(() => ({}))) as { id?: string };

      // Update rate limiter timestamp on confirmed submission
      record.timestamps.push(now);
      rateLimitMap.set(normalizedEmail, record);

      return {
        success: true,
        message:
          "Message sent successfully! Thank you for reaching out. I'll get back to you as soon as possible.",
        provider: "resend",
        deliveryId: resData.id,
      };
    } catch (networkErr: unknown) {
      console.error("[Resend API Network Error]", networkErr);
      const isAbort =
        networkErr instanceof Error &&
        (networkErr.name === "AbortError" || networkErr.message.includes("abort"));

      return {
        success: false,
        error: isAbort
          ? `Message delivery request timed out. Please try again or reach Shiva directly at ${destinationEmail}.`
          : `Network error during delivery transmission. Please reach Shiva directly at ${destinationEmail}.`,
      };
    }
  }

  // 5. Explicit check when RESEND_API_KEY is not configured:
  // In automated test runs (VITEST or ALLOW_DEV_CONTACT_MOCK === "true"), permit mock simulation.
  if (process.env.ALLOW_DEV_CONTACT_MOCK === "true" || process.env.VITEST === "true") {
    console.info("[Syadverse Contact Form Received — Test/Dev Simulation Pipeline]", {
      name: data.name,
      email: data.email,
      reason: data.reason,
      subject: data.subject,
      destination: destinationEmail,
      timestamp: new Date().toISOString(),
    });

    record.timestamps.push(now);
    rateLimitMap.set(normalizedEmail, record);

    return {
      success: true,
      message:
        "Message sent successfully! Thank you for reaching out. I'll get back to you as soon as possible.",
      provider: "development",
    };
  }

  // In production or when unconfigured: DO NOT RETURN FALSE SUCCESS!
  console.error(
    `[Syadverse Contact Error] RESEND_API_KEY is not configured on the server. Message cannot be delivered to ${destinationEmail}.`,
  );

  return {
    success: false,
    error: `The message delivery service is awaiting server configuration (RESEND_API_KEY). Please contact Shiva directly at ${destinationEmail}.`,
  };
}

export const submitContactMessage = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSubmissionSchema.parse(data))
  .handler(async ({ data }): Promise<ContactSubmissionResult> => {
    return processContactMessage(data);
  });
