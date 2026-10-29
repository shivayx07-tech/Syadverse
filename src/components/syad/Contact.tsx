import { useState, useRef, useEffect, type ReactNode } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import {
  Mail,
  FileText,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  ExternalLink,
  Send,
  RotateCcw,
  Sparkles,
  Clock,
} from "lucide-react";
import { navigationItems, profile } from "@/data/portfolio";
import {
  contactReasons,
  contactSubmissionSchema,
  submitContactMessage,
  type ContactReason,
} from "@/lib/contact";

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          r.current?.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (r.current) io.observe(r.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={r} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "Job / Internship Opportunity" as ContactReason,
    subject: "",
    message: "",
    website_hp: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [renderedAt, setRenderedAt] = useState<number>(Date.now());

  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 500);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error when user edits
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (submissionStatus === "error") {
      setSubmissionStatus("idle");
      setStatusMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submissionStatus === "submitting") return;

    setFieldErrors({});
    setStatusMessage("");

    // 1. Client-side Zod validation
    const validation = contactSubmissionSchema.safeParse({
      ...formData,
      renderedAt,
    });

    if (!validation.success) {
      const errors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const key = String(issue.path[0]);
        if (!errors[key]) {
          errors[key] = issue.message;
        }
      }
      setFieldErrors(errors);
      setSubmissionStatus("error");
      setStatusMessage("Please correct the highlighted fields before submitting.");
      return;
    }

    setSubmissionStatus("submitting");

    // 2. Server mutation dispatch
    try {
      const response = await submitContactMessage({
        data: {
          name: formData.name,
          email: formData.email,
          reason: formData.reason,
          subject: formData.subject ? formData.subject : undefined,
          message: formData.message,
          website_hp: formData.website_hp,
          renderedAt,
        },
      });

      if (response.success) {
        setSubmissionStatus("success");
        setStatusMessage(
          response.message ||
            "Your message has been submitted successfully. Thank you for reaching out — I'll be able to review your inquiry.",
        );
      } else {
        setSubmissionStatus("error");
        setStatusMessage(
          response.error ||
            "Your message could not be submitted. Please try again or contact me directly by email at shivayx07@gmail.com.",
        );
      }
    } catch (err) {
      console.error("[Contact Form Submit Error]", err);
      setSubmissionStatus("error");
      setStatusMessage(
        "A network error prevented message transmission. Please try again or write directly to shivayx07@gmail.com.",
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      reason: "Job / Internship Opportunity",
      subject: "",
      message: "",
      website_hp: "",
    });
    setFieldErrors({});
    setSubmissionStatus("idle");
    setStatusMessage("");
    setRenderedAt(Date.now());
  };

  const charCount = formData.message.length;
  const isCustomSubjectVisible = formData.reason === "Other";

  return (
    <section id="contact" className="relative px-6 py-28 md:py-40 overflow-hidden">
      {/* Background ambient cosmic glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-40"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(172,189,212,0.12),transparent_70%)] blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(217,186,203,0.1),transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* ── 1. SECTION OPENING & MEMORABLE ANCHOR ── */}
        <Reveal className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5D6C8C]/30 bg-[#151626]/80 px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#F2E0DC]/90">
              08 / INITIATE CONTACT
            </span>
          </div>

          <h2 className="mt-6 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-[#F2E0DC]">
            THE NEXT GREAT THING <br className="hidden sm:inline" />
            STARTS WITH A <span className="text-gradient">CONVERSATION.</span>
          </h2>

          <p className="mt-6 text-lg md:text-xl leading-relaxed text-[#B0B5C6] font-sans">
            Have an idea worth exploring, a problem worth solving, or an opportunity to build
            something meaningful? Let's talk.
          </p>

          <p className="mt-3 text-sm md:text-base leading-relaxed text-[#8E95A8] font-sans">
            I'm interested in meaningful conversations around AI/ML, research, software engineering,
            and ambitious ideas that can become real-world solutions.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={scrollToForm}
              className="group inline-flex items-center gap-2.5 rounded-full border border-cyan/40 bg-cyan/10 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-cyan transition-all duration-300 hover:border-cyan hover:bg-cyan/20 hover:shadow-[0_0_20px_rgba(172,189,212,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              <span>LET'S START A CONVERSATION</span>
              <ArrowDown
                size={14}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </button>
            <span className="font-mono text-xs text-[#8E95A8]">
              or choose a direct connection channel below
            </span>
          </div>
        </Reveal>

        {/* ── 2. TWO-COLUMN RESPONSIVE LAYOUT ── */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-[1.05fr_1.35fr] gap-12 lg:gap-16 items-start">
          {/* ── LEFT COLUMN — DIRECT CONNECTION ── */}
          <Reveal className="space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ACBDD4]">
                DIRECT CHANNELS
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-[#F2E0DC]">
                CONNECT DIRECTLY
              </h3>
              <p className="mt-2 text-sm text-[#8E95A8] leading-relaxed">
                Reach out through verified professional platforms or directly via email. Every
                channel is monitored and responsive.
              </p>
            </div>

            {/* Availability & Location Status Card */}
            <div className="rounded-2xl border border-[#5D6C8C]/30 bg-[#151626]/70 p-5 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-xs font-semibold tracking-wide text-emerald-300">
                  OPEN TO OPPORTUNITIES &amp; COLLABORATION
                </span>
              </div>
              <div className="mt-3.5 space-y-2 border-t border-white/5 pt-3 font-mono text-xs text-[#8E95A8]">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#ACBDD4]" />
                  <span>Kanpur, Uttar Pradesh, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-[#ACBDD4]" />
                  <span>India Standard Time · IST (UTC+5:30)</span>
                </div>
              </div>
            </div>

            {/* Direct Channel Action Cards */}
            <div className="space-y-3.5">
              {/* 1. Direct Email Action */}
              <a
                href={`mailto:${profile.email}?subject=Professional%20Inquiry%20%E2%80%94%20Syadverse%20Portfolio`}
                aria-label={`Send direct email to ${profile.email}`}
                className="group flex items-center justify-between rounded-2xl border border-[#5D6C8C]/30 bg-[#151626]/60 p-4 transition-all duration-300 hover:border-cyan hover:bg-[#151626]/90 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan transition-colors group-hover:bg-cyan/20">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F2E0DC] group-hover:text-cyan transition-colors">
                      EMAIL ME
                    </p>
                    <p className="truncate text-xs text-[#8E95A8] mt-0.5">{profile.email}</p>
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-[#8E95A8] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan"
                />
              </a>

              {/* 2. LinkedIn Connection Action */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Shiva on LinkedIn (opens in new tab)"
                className="group flex items-center justify-between rounded-2xl border border-[#5D6C8C]/30 bg-[#151626]/60 p-4 transition-all duration-300 hover:border-[#ACBDD4] hover:bg-[#151626]/90 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#ACBDD4]/30 bg-[#ACBDD4]/10 text-[#ACBDD4] transition-colors group-hover:bg-[#ACBDD4]/20">
                    <FaLinkedinIn size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F2E0DC] group-hover:text-[#ACBDD4] transition-colors">
                      CONNECT ON LINKEDIN
                    </p>
                    <p className="truncate text-xs text-[#8E95A8] mt-0.5">
                      linkedin.com/in/shivayx07
                    </p>
                  </div>
                </div>
                <ExternalLink
                  size={16}
                  className="shrink-0 text-[#8E95A8] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#ACBDD4]"
                />
              </a>

              {/* 3. GitHub Exploration Action */}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Explore Shiva's GitHub repositories and codebase (opens in new tab)"
                className="group flex items-center justify-between rounded-2xl border border-[#5D6C8C]/30 bg-[#151626]/60 p-4 transition-all duration-300 hover:border-[#D9BACB] hover:bg-[#151626]/90 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#D9BACB]/30 bg-[#D9BACB]/10 text-[#D9BACB] transition-colors group-hover:bg-[#D9BACB]/20">
                    <FaGithub size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F2E0DC] group-hover:text-[#D9BACB] transition-colors">
                      EXPLORE MY GITHUB
                    </p>
                    <p className="truncate text-xs text-[#8E95A8] mt-0.5">
                      github.com/shivayx07-tech
                    </p>
                  </div>
                </div>
                <ExternalLink
                  size={16}
                  className="shrink-0 text-[#8E95A8] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#D9BACB]"
                />
              </a>

              {/* 4. Resume Download Action */}
              {profile.resume && (
                <a
                  href={profile.resume}
                  download="Shiva_Yadav_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Shiva Yadav's verified resume (PDF)"
                  className="group flex items-center justify-between rounded-2xl border border-[#5D6C8C]/30 bg-[#151626]/60 p-4 transition-all duration-300 hover:border-cyan hover:bg-[#151626]/90 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan transition-colors group-hover:bg-cyan/20">
                      <FileText size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F2E0DC] group-hover:text-cyan transition-colors">
                        DOWNLOAD RESUME
                      </p>
                      <p className="truncate text-xs text-[#8E95A8] mt-0.5">
                        Official Curriculum Vitae · PDF Format
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-[#8E95A8] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan"
                  />
                </a>
              )}
            </div>
          </Reveal>

          {/* ── RIGHT COLUMN — CONTACT FORM ── */}
          <Reveal className="w-full">
            <div className="rounded-3xl border border-[#5D6C8C]/30 bg-[#151626]/85 p-7 sm:p-10 backdrop-blur-xl shadow-2xl relative">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan">
                  <Sparkles size={13} />
                  <span>DIRECT INQUIRY DISPATCH</span>
                </div>
                <h3 className="mt-1 font-display text-2xl md:text-3xl font-bold text-[#F2E0DC]">
                  SEND A DIRECT MESSAGE
                </h3>
                <p className="mt-1 text-xs md:text-sm text-[#8E95A8]">
                  Fill out the form below. Messages are transmitted directly to Shiva's inbox.
                </p>
              </div>

              {submissionStatus === "success" ? (
                /* ── SUCCESS STATE VIEW ── */
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-8 text-center backdrop-blur-md animate-in fade-in zoom-in-95 duration-500">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="mt-5 font-display text-2xl font-bold text-[#F2E0DC]">
                    Message Transmitted
                  </h4>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-[#B0B5C6] max-w-md mx-auto">
                    {statusMessage}
                  </p>
                  <p className="mt-2 text-xs text-[#8E95A8]">
                    A record of your message has been recorded. You can also reach out on LinkedIn
                    or direct email.
                  </p>
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-cyan transition-all hover:bg-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                    >
                      <RotateCcw size={14} />
                      <span>SEND ANOTHER MESSAGE</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* ── INTERACTIVE FORM VIEW ── */
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                  aria-label="Direct message submission form"
                >
                  {/* Honeypot field for bot trapping — completely hidden */}
                  <input
                    type="text"
                    name="website_hp"
                    value={formData.website_hp}
                    onChange={handleInputChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      opacity: 0,
                      pointerEvents: "none",
                    }}
                  />

                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block font-mono text-xs uppercase tracking-wider text-[#ACBDD4]"
                      >
                        Full Name <span className="text-cyan">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Dr. Jane Smith"
                        aria-invalid={!!fieldErrors.name}
                        aria-describedby={fieldErrors.name ? "name-error" : undefined}
                        className={`mt-2 w-full rounded-xl border bg-[#090A0D]/70 px-4 py-3 text-sm text-[#F2E0DC] placeholder:text-[#5D6C8C] transition-all duration-200 focus:outline-none focus:ring-1 ${
                          fieldErrors.name
                            ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                            : "border-[#5D6C8C]/40 focus:border-cyan focus:ring-cyan"
                        }`}
                      />
                      {fieldErrors.name && (
                        <p id="name-error" className="mt-1.5 text-xs text-rose-400">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block font-mono text-xs uppercase tracking-wider text-[#ACBDD4]"
                      >
                        Email Address <span className="text-cyan">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. name@company.org"
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? "email-error" : undefined}
                        className={`mt-2 w-full rounded-xl border bg-[#090A0D]/70 px-4 py-3 text-sm text-[#F2E0DC] placeholder:text-[#5D6C8C] transition-all duration-200 focus:outline-none focus:ring-1 ${
                          fieldErrors.email
                            ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                            : "border-[#5D6C8C]/40 focus:border-cyan focus:ring-cyan"
                        }`}
                      />
                      {fieldErrors.email && (
                        <p id="email-error" className="mt-1.5 text-xs text-rose-400">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Reason for Contact */}
                  <div>
                    <label
                      htmlFor="contact-reason"
                      className="block font-mono text-xs uppercase tracking-wider text-[#ACBDD4]"
                    >
                      Reason for Contact <span className="text-cyan">*</span>
                    </label>
                    <select
                      id="contact-reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                      aria-invalid={!!fieldErrors.reason}
                      aria-describedby={fieldErrors.reason ? "reason-error" : undefined}
                      className="mt-2 w-full rounded-xl border border-[#5D6C8C]/40 bg-[#090A0D]/85 px-4 py-3 text-sm text-[#F2E0DC] transition-all duration-200 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                    >
                      {contactReasons.map((reasonOption) => (
                        <option
                          key={reasonOption}
                          value={reasonOption}
                          className="bg-[#151626] text-[#F2E0DC] py-1"
                        >
                          {reasonOption}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.reason && (
                      <p id="reason-error" className="mt-1.5 text-xs text-rose-400">
                        {fieldErrors.reason}
                      </p>
                    )}
                  </div>

                  {/* Conditional Custom Subject (appears when 'Other' is selected) */}
                  {isCustomSubjectVisible && (
                    <div className="animate-in fade-in duration-300">
                      <label
                        htmlFor="contact-subject"
                        className="block font-mono text-xs uppercase tracking-wider text-[#ACBDD4]"
                      >
                        Custom Subject / Topic
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Brief summary of your inquiry..."
                        className="mt-2 w-full rounded-xl border border-[#5D6C8C]/40 bg-[#090A0D]/70 px-4 py-3 text-sm text-[#F2E0DC] placeholder:text-[#5D6C8C] transition-all duration-200 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                      />
                    </div>
                  )}

                  {/* Row 3: Message Textarea */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="contact-message"
                        className="block font-mono text-xs uppercase tracking-wider text-[#ACBDD4]"
                      >
                        Message <span className="text-cyan">*</span>
                      </label>
                      <span
                        className={`font-mono text-[11px] ${
                          charCount > 1900 ? "text-amber-400" : "text-[#8E95A8]"
                        }`}
                      >
                        {charCount} / 2000
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project, research inquiry, role, or ideas..."
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={fieldErrors.message ? "message-error" : undefined}
                      className={`mt-2 w-full rounded-xl border bg-[#090A0D]/70 px-4 py-3 text-sm text-[#F2E0DC] placeholder:text-[#5D6C8C] transition-all duration-200 focus:outline-none focus:ring-1 resize-y min-h-[120px] ${
                        fieldErrors.message
                          ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                          : "border-[#5D6C8C]/40 focus:border-cyan focus:ring-cyan"
                      }`}
                    />
                    {fieldErrors.message && (
                      <p id="message-error" className="mt-1.5 text-xs text-rose-400">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Error Notification Banner */}
                  {submissionStatus === "error" && statusMessage && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-950/30 p-4 text-xs md:text-sm text-rose-200 animate-in fade-in"
                    >
                      <AlertCircle size={18} className="mt-0.5 shrink-0 text-rose-400" />
                      <div className="flex-1">
                        <p className="font-semibold text-rose-100">Unable to submit message</p>
                        <p className="mt-0.5 leading-relaxed text-rose-200/90">{statusMessage}</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submissionStatus === "submitting"}
                    className="group relative flex w-full items-center justify-center gap-2.5 rounded-xl border border-cyan/50 bg-gradient-to-r from-cyan/20 via-[#151626] to-cyan/20 px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-[#F2E0DC] transition-all duration-300 hover:border-cyan hover:bg-cyan/30 hover:shadow-[0_0_25px_rgba(172,189,212,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submissionStatus === "submitting" ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-cyan" />
                        <span>TRANSMITTING MESSAGE...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send
                          size={15}
                          className="text-cyan transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>

                  <p className="text-center font-mono text-[11px] text-[#8E95A8] pt-1">
                    Your inquiry is delivered securely. You may also email directly to{" "}
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-[#ACBDD4] underline hover:text-[#F2E0DC]"
                    >
                      {profile.email}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* ── 3. MEMORABLE CLOSING STATEMENT ── */}
        <div className="mt-28 md:mt-36 border-t border-[#5D6C8C]/20 pt-16 pb-6 text-center">
          <Reveal>
            <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-[#F2E0DC]/95 tracking-wide max-w-3xl mx-auto leading-relaxed">
              “The next breakthrough could begin with a conversation.”
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#5D6C8C]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ACBDD4]">
                SYADVERSE · SHIVA YADAV
              </span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#5D6C8C]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-[#5D6C8C]/20 bg-[#090A0D] px-6 py-12 md:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <p className="wordmark text-3xl font-bold tracking-tight text-[#F2E0DC]">SYADVERSE</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-[#ACBDD4]">
            {profile.name} · {profile.role}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-[#8E95A8] font-sans">{profile.tagline}</p>
        </div>

        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#8E95A8]"
        >
          {navigationItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="inline-block transition-colors hover:text-[#F2E0DC]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <div className="flex items-center gap-3 text-[#ACBDD4]">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#5D6C8C]/30 bg-[#151626]/80 text-[#ACBDD4] transition-all duration-300 hover:border-[#ACBDD4] hover:text-[#F2E0DC] hover:scale-105"
            >
              <FaGithub size={16} />
            </a>
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my LinkedIn profile"
                className="grid h-11 w-11 place-items-center rounded-full border border-[#5D6C8C]/30 bg-[#151626]/80 text-[#ACBDD4] transition-all duration-300 hover:border-[#ACBDD4] hover:text-[#F2E0DC] hover:scale-105"
              >
                <FaLinkedinIn size={16} />
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                aria-label="Send direct email to Shiva Yadav"
                className="grid h-11 w-11 place-items-center rounded-full border border-[#5D6C8C]/30 bg-[#151626]/80 text-[#ACBDD4] transition-all duration-300 hover:border-[#ACBDD4] hover:text-[#F2E0DC] hover:scale-105"
              >
                <Mail size={16} />
              </a>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-[#8E95A8]">
            <span>© {new Date().getFullYear()} Shiva Yadav · Syadverse. All rights reserved.</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#ACBDD4] transition-colors hover:text-[#F2E0DC]"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
