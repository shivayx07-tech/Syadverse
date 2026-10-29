// Syadverse Experience Archive Data Model
// Source of truth for all 6 authentic experiences.
// Follows strict factual guidelines: no invented metrics, awards, or affiliations.

import iitkCampus from "@/assets/iitk-campus.jpg";
import iitkEntranceSign from "@/assets/iitk/iitk-entrance-sign.jpg";
import iitkLabWorkspace from "@/assets/iitk/iitk-lab-workspace.jpg";
import iitkLibrarySculpture from "@/assets/iitk/iitk-library-sculpture.jpg";
import iitkCcdBicycle from "@/assets/iitk/iitk-ccd-bicycle.jpg";
import iitkBrickWallPortrait from "@/assets/iitk/iitk-brick-wall-portrait.jpg";
import iitkModelResearchSetup from "@/assets/iitk/iitk-model-research-setup.jpg";
import iitkCompletionCertificate from "@/assets/iitk/evidence/iitk-completion-certificate.jpg";
import iitkOfferLetter from "@/assets/iitk/evidence/iitk-offer-letter.jpg";
import iitkOfferLetterHandover from "@/assets/iitk/evidence/iitk-offer-letter-handover.jpg";
import googleStudentAmbassadorCover from "@/assets/google-student-ambassador-cover.jpg";
import gsaCampusAmbassadorAnnouncement from "@/assets/gsa/gsa-campus-ambassador-announcement.jpg";
import gsaGoogleWallPortrait from "@/assets/gsa/gsa-google-wall-portrait.jpg";
import gsaSelectionWelcomeEmail from "@/assets/gsa/evidence/gsa-selection-welcome-email.jpg";
import gsaPortalAccessGidEmail from "@/assets/gsa/evidence/gsa-portal-access-gid-email.jpg";
import gsaStudentPortalDashboard from "@/assets/gsa/evidence/gsa-student-portal-dashboard.jpg";
import ignishunTechCover from "@/assets/ignishun-tech-cover.png";
import ignishunWorkstationSetup from "@/assets/ignishun/ignishun-workstation-setup.jpg";
import ignishunOnboardingCollage from "@/assets/ignishun/ignishun-onboarding-collage.jpg";
import ignishunWelcomeKitHandover from "@/assets/ignishun/ignishun-welcome-kit-handover.jpg";
import aiCareerGuidanceSeminarCover from "@/assets/ai-career-guidance-seminar-cover.jpg";
import seminarPodiumPresentationSide from "@/assets/seminar/seminar-podium-presentation-side.jpg";
import seminarPodiumPresentationFront from "@/assets/seminar/seminar-podium-presentation-front.jpg";
import seminarLiveSpeakerSession from "@/assets/seminar/seminar-live-speaker-session.jpg";
import seminarAuditoriumAudienceOverview from "@/assets/seminar/seminar-auditorium-audience-overview.jpg";
import seminarOrganizingTeamGroup from "@/assets/seminar/seminar-organizing-team-group.jpg";
import seminarCertificateOfAppreciation from "@/assets/seminar/evidence/seminar-certificate-of-appreciation.jpg";
import matlabWorkshopCover from "@/assets/matlab-workshop-cover.jpg";
import matlabStagePresentation from "@/assets/matlab/matlab-stage-presentation.jpg";
import matlabDelegateBadge from "@/assets/matlab/matlab-delegate-badge.jpg";
import matlabWorkstationLaptops from "@/assets/matlab/matlab-workstation-laptops.jpg";
import matlabInstructorDataImportSession from "@/assets/matlab/matlab-instructor-data-import-session.jpg";
import matlabAuditoriumWorkspaceView from "@/assets/matlab/matlab-auditorium-workspace-view.jpg";
import matlabCompletionCertificate from "@/assets/matlab/evidence/matlab-completion-certificate.jpg";
import cognitiveChaosHackathonCover from "@/assets/cognitive-chaos-hackathon-cover.jpg";
import cognitiveChaosAuditoriumHall from "@/assets/cognitive-chaos/cognitive-chaos-auditorium-hall.jpg";
import cognitiveChaosTeamAssembly from "@/assets/cognitive-chaos/cognitive-chaos-team-assembly.jpg";
import cognitiveChaosCampusPortrait from "@/assets/cognitive-chaos/cognitive-chaos-campus-portrait.jpg";
import cognitiveChaosJuryPitchPresentation from "@/assets/cognitive-chaos/cognitive-chaos-jury-pitch-presentation.jpg";
import cognitiveChaosVisitorCredentials from "@/assets/cognitive-chaos/cognitive-chaos-visitor-credentials.jpg";
import cognitiveChaosHackdrivenStage from "@/assets/cognitive-chaos/cognitive-chaos-hackdriven-stage.jpg";
import cognitiveChaosHackathonSwagsLaptop from "@/assets/cognitive-chaos/cognitive-chaos-hackathon-swags-laptop.jpg";
import cognitiveChaosMicrosoftReception from "@/assets/cognitive-chaos/cognitive-chaos-microsoft-reception.jpg";
import cognitiveChaosCertificateOfAppreciation from "@/assets/cognitive-chaos/evidence/cognitive-chaos-certificate-of-appreciation.jpg";

export type ExperienceCategory =
  | "Research & Development"
  | "Professional Development"
  | "Leadership & Community"
  | "Programs & Recognition"
  | "Internships & Professional Experience"
  | "Workshops & Technical Learning"
  | "Hackathons & Innovation";

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  alt: string;
  date?: string;
  location?: string;
  aspectRatio?: "landscape" | "portrait" | "square";
  colSpan?: 1 | 2;
}

export interface EvidenceDocument {
  id: string;
  title: string;
  issuer?: string;
  issueDate?: string;
  signatory?: string;
  type:
    | "Certificate"
    | "Offer Letter"
    | "Experience Letter"
    | "Completion Letter"
    | "Recognition"
    | "Project Artifact"
    | "Research Evidence"
    | "Selection Letter"
    | "Program Credential";
  category?: string;
  fileUrl?: string; // URL to PDF or document / download path
  previewUrl?: string; // URL to preview image
  downloadName?: string;
  description?: string;
  verified?: boolean;
}

export interface ExperienceMission {
  id: string;
  missionNumber: string;
  slug: string;
  title: string;
  organization: string;
  role?: string;
  researchAssociation?: string;
  duration?: string;
  date?: string;
  location?: string;
  category: ExperienceCategory;
  shortDescription: string;
  overview: string;
  responsibilities: string[];
  technologies?: string[];
  outcomes?: string[];
  coverImage?: string; // Path or import to authentic photo; empty/undefined uses refined intentional placeholder
  coverImageAlt: string;
  coverImagePosition?: string;
  coverImageFit?: "cover" | "contain";
  coverImageAspectRatio?: string;
  coverImageBg?: string;
  hideCoverOverlays?: boolean;
  gallery: GalleryPhoto[];
  evidence: EvidenceDocument[];
  metaDescription: string;
  accentHue: "cyan" | "violet" | "magenta";
}

export const EXPERIENCE_CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "All Missions" },
  { id: "Research & Development", label: "Research & Development" },
  { id: "Internships & Professional Experience", label: "Internships" },
  { id: "Leadership & Community", label: "Leadership & Community" },
  { id: "Programs & Recognition", label: "Programs & Recognition" },
  { id: "Workshops & Technical Learning", label: "Workshops & Learning" },
  { id: "Hackathons & Innovation", label: "Hackathons & Innovation" },
];

export const experienceMissions: ExperienceMission[] = [
  {
    id: "mission-001",
    missionNumber: "MISSION 001",
    slug: "iit-kanpur-research",
    title: "AI/ML Summer Research Intern",
    organization: "IIT Kanpur — Department of Computer Science and Engineering",
    role: "AI/ML Summer Research Intern",
    researchAssociation: "Prof. Nitin Saxena",
    duration: "May 2026 – July 2026",
    location: "IIT Kanpur, India",
    category: "Research & Development",
    shortDescription:
      "Research experience focused on machine learning experimentation, model evaluation, data analysis, and reproducible technical documentation.",
    overview:
      "A dedicated summer research internship within the Department of Computer Science and Engineering at the Indian Institute of Technology, Kanpur, associated with Prof. Nitin Saxena. The work centers on iterative machine learning experimentation, rigorous empirical evaluation, and developing standardized reproducible research protocols in a high-caliber academic laboratory setting.",
    responsibilities: [
      "Developed and optimized machine learning models through iterative experimentation in a research-lab environment.",
      "Applied data analysis and model-evaluation techniques to turn research hypotheses into measurable, reproducible outcomes.",
      "Maintained clear, reproducible technical documentation so results could be reviewed and reused by the team.",
    ],
    technologies: [
      "Machine Learning",
      "Python",
      "Data Analysis",
      "Model Evaluation",
      "Empirical Research",
    ],
    outcomes: [
      "Cultivated disciplined academic research methodology rooted in formal hypothesis formulation and statistical validation.",
      "Mastered reproducible benchmarking procedures across iterative model architectures.",
      "Strengthened scientific writing, reproducible lab notes, and technical review standards.",
    ],
    coverImage: iitkCampus,
    coverImageAlt:
      "Rajeev Motwani Building, Department of Computer Science and Engineering, IIT Kanpur",
    coverImagePosition: "center 48%",
    gallery: [
      {
        id: "iitk-gal-1",
        url: iitkBrickWallPortrait,
        caption: "At the Indian Institute of Technology Kanpur entrance wall",
        alt: "Shiva Yadav at the iconic Indian Institute of Technology Kanpur brick wall",
        aspectRatio: "landscape",
      },
      {
        id: "iitk-gal-2",
        url: iitkLabWorkspace,
        caption: "Research lab session and computing workspace overlook",
        alt: "Shiva Yadav working on machine learning experimentation in research laboratory",
        aspectRatio: "portrait",
      },
      {
        id: "iitk-gal-3",
        url: iitkModelResearchSetup,
        caption: "Machine learning model evaluation and interpretability workspace",
        alt: "Dual-laptop machine learning research workstation with SHAP values, model prediction dashboards, and handwritten notes",
        aspectRatio: "portrait",
      },
      {
        id: "iitk-gal-4",
        url: iitkLibrarySculpture,
        caption: "PK Kelkar Library and geometric campus sculpture",
        alt: "PK Kelkar Library building and modernist sculpture at IIT Kanpur",
        aspectRatio: "landscape",
      },
      {
        id: "iitk-gal-5",
        url: iitkEntranceSign,
        caption: "IIT Kanpur main entrance and institutional signage",
        alt: "Main entrance sign boards of Indian Institute of Technology Kanpur",
        aspectRatio: "portrait",
      },
      {
        id: "iitk-gal-6",
        url: iitkCcdBicycle,
        caption: "Campus cycling trails and Café Coffee Day",
        alt: "Bicycle parked outside Café Coffee Day at IIT Kanpur campus",
        aspectRatio: "portrait",
      },
    ],
    evidence: [
      {
        id: "iitk-ev-1",
        title: "Internship Project Completion Certificate",
        issuer: "Department of Computer Science and Engineering, IIT Kanpur",
        signatory: "Prof. Nitin Saxena",
        issueDate: "July 20, 2026",
        type: "Certificate",
        category: "Certificates",
        previewUrl: iitkCompletionCertificate,
        fileUrl: "/evidence/iitk/iitk-completion-certificate.jpg",
        downloadName: "IIT_Kanpur_Internship_Completion_Certificate_Shiva_Yadav.jpg",
        description:
          "Official certificate certifying successful completion of the research project 'Artificial Intelligence and Machine Learning (AI/ML)' under Prof. Nitin Saxena from May 18, 2026 to July 17, 2026.",
        verified: true,
      },
      {
        id: "iitk-ev-2",
        title: "Official Summer Internship Offer Letter",
        issuer: "Department of Computer Science and Engineering, IIT Kanpur",
        signatory: "Prof. Nitin Saxena",
        issueDate: "May 11, 2026",
        type: "Offer Letter",
        category: "Internship Documents",
        previewUrl: iitkOfferLetter,
        fileUrl: "/evidence/iitk/iitk-offer-letter.jpg",
        downloadName: "IIT_Kanpur_Summer_Internship_Offer_Letter_Shiva_Yadav.jpg",
        description:
          "Official offer letter appointing Shiva Yadav as Summer Intern (AI/ML) under Prof. Nitin Saxena at the Department of Computer Science and Engineering, IIT Kanpur.",
        verified: true,
      },
      {
        id: "iitk-ev-3",
        title: "Document Handover & In-Person Verification",
        issuer: "Department of Computer Science and Engineering, IIT Kanpur",
        signatory: "Prof. Nitin Saxena & Shiva Yadav",
        issueDate: "Summer 2026",
        type: "Research Evidence",
        category: "Research Evidence",
        previewUrl: iitkOfferLetterHandover,
        fileUrl: "/evidence/iitk/iitk-offer-letter-handover.jpg",
        downloadName: "IIT_Kanpur_Prof_Nitin_Saxena_Document_Handover.jpg",
        description:
          "Photographic verification of Prof. Nitin Saxena presenting the official appointment document to Shiva Yadav at the CSE Department faculty office, IIT Kanpur.",
        verified: true,
      },
    ],
    metaDescription:
      "AI/ML Summer Research Internship at IIT Kanpur (CSE Dept), associated with Prof. Nitin Saxena — focus on machine learning experimentation and reproducible documentation.",
    accentHue: "cyan",
  },
  {
    id: "mission-002",
    missionNumber: "MISSION 002",
    slug: "google-student-ambassador",
    title: "Google Student Ambassador 2026",
    organization: "Google Student Ambassador Program",
    role: "Google Student Ambassador",
    date: "2026",
    category: "Programs & Recognition",
    shortDescription:
      "Selected as Google Student Ambassador 2026, fostering student engagement with developer ecosystems and technology learning opportunities.",
    overview:
      "Appointed as Google Student Ambassador for the 2026 term. Serves as a campus liaison for Google developer initiatives, educational resources, and technical learning programs, connecting peers with developer tools and collaborative growth opportunities.",
    responsibilities: [
      "Represent the Google Student Ambassador 2026 program on campus.",
      "Facilitate peer discovery of official Google technology learning opportunities and developer events.",
    ],
    technologies: ["Developer Ecosystems", "Peer Education", "Community Building"],
    outcomes: [
      "Enhanced campus awareness of developer programs, certifications, and technical tracks.",
      "Expanded access to verified technical resources for engineering peers.",
    ],
    coverImage: googleStudentAmbassadorCover,
    coverImageAlt:
      "Google Student Ambassador 2026 cohort announcement featuring Shiva Yadav with NAAC A++ CSJMU campus background and Gemini AI recognition",
    coverImageFit: "contain",
    hideCoverOverlays: true,
    gallery: [
      {
        id: "gsa-gal-1",
        url: gsaCampusAmbassadorAnnouncement,
        caption: "Google Campus Ambassador 2026 Selection Announcement",
        alt: "Shiva Yadav Google Campus Ambassador 2026 official selection announcement graphic",
        aspectRatio: "portrait",
      },
      {
        id: "gsa-gal-2",
        url: gsaGoogleWallPortrait,
        caption: "Google Student Ambassador 2026 — Google Campus Wall",
        alt: "Shiva Yadav in front of illuminated Google wall sign — Why Me? Google Student Ambassador 2026",
        aspectRatio: "landscape",
      },
    ],
    evidence: [
      {
        id: "gsa-ev-1",
        title: "Official Selection & Welcome Email — Google Student Ambassador Program 2026",
        issuer: "The Gemini Program Team",
        signatory: "The Gemini Program Team (info@geministudentambassador.com)",
        issueDate: "May 2, 2026",
        type: "Selection Letter",
        category: "Official Communications",
        previewUrl: gsaSelectionWelcomeEmail,
        fileUrl: "/evidence/gsa/gsa-selection-welcome-email.jpg",
        downloadName: "Google_Student_Ambassador_2026_Selection_Email_Shiva_Yadav.jpg",
        description:
          "Official acceptance notification welcoming Shiva Yadav to the Google Student Ambassador Program 2026 after clearing the screening and video rounds.",
        verified: true,
      },
      {
        id: "gsa-ev-2",
        title: "GSA 2026 Program Credential & Portal Access Notification",
        issuer: "The Gemini Program Team",
        signatory: "The Gemini Program Team (info@geministudentambassador.com)",
        issueDate: "May 8, 2026",
        type: "Program Credential",
        category: "Program Credentials",
        previewUrl: gsaPortalAccessGidEmail,
        fileUrl: "/evidence/gsa/gsa-portal-access-gid-email.jpg",
        downloadName: "Google_Student_Ambassador_2026_GID_Portal_Access_Shiva_Yadav.jpg",
        description:
          "Official credential notification granting GSA Student Portal access and confirming unique ambassador identifier GID: 2876 for Shiva Yadav.",
        verified: true,
      },
      {
        id: "gsa-ev-3",
        title: "Google Student Ambassador Portal Dashboard & Starter Badge",
        issuer: "Google Student Ambassador Program",
        signatory: "GSA Student Portal (Shiva | GID: 2876)",
        issueDate: "2026",
        type: "Project Artifact",
        category: "Student Portal & Badges",
        previewUrl: gsaStudentPortalDashboard,
        fileUrl: "/evidence/gsa/gsa-student-portal-dashboard.jpg",
        downloadName: "Google_Student_Ambassador_Student_Portal_Dashboard_GID_2876.jpg",
        description:
          "Authenticated GSA Student Portal dashboard displaying Shiva's active ambassador profile, unique identifier GID: 2876, Starter Bronze Explorer badge, and campaign briefs.",
        verified: true,
      },
    ],
    metaDescription:
      "Google Student Ambassador 2026 — campus ambassador bridging students with Google developer learning opportunities and technical resources.",
    accentHue: "cyan",
  },
  {
    id: "mission-003",
    missionNumber: "MISSION 003",
    slug: "ignishun-tech",
    title: "Web Developer Intern",
    organization: "Ignishun Tech",
    role: "Web Developer Intern",
    // duration intentionally omitted as not yet supplied
    category: "Internships & Professional Experience",
    shortDescription:
      "Frontend engineering internship focused on modern web development, reusable interface components, and responsive digital experiences.",
    overview:
      "Contributed to frontend web engineering workflows at Ignishun Tech, focusing on clean modular component design, responsive styling, and modern web application development.",
    responsibilities: [
      "Developed responsive web interfaces and modular UI components.",
      "Collaborated on frontend architecture, layout consistency, and cross-browser responsiveness.",
      "Refined user experience and interactive elements adhering to clean code standards.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "React", "Responsive Design"],
    outcomes: [
      "Gained hands-on experience building production-level frontend components.",
      "Solidified professional engineering practices including version control and collaborative review.",
    ],
    coverImage: ignishunTechCover,
    coverImageAlt:
      "Ignishun Tech Web Developer Internship — official brand emblem and technical identity",
    coverImageFit: "contain",
    coverImageBg: "#0b1014",
    hideCoverOverlays: true,
    gallery: [
      {
        id: "ignishun-gal-1",
        url: ignishunWorkstationSetup,
        caption: "Internship Workstation & Welcome Essentials",
        alt: "Ignishun Tech workstation setup featuring MacBook running ignishuntech.com, branded coffee mug, official welcome kit notebook, pen, envelope, and stickers",
        aspectRatio: "portrait",
      },
      {
        id: "ignishun-gal-2",
        url: ignishunOnboardingCollage,
        caption: "Ignishun Tech Onboarding & Welcome Collage",
        alt: "Visual collage celebrating joining Ignishun Tech with welcome kit, handover moment, and framed Shivay calligraphy artwork",
        aspectRatio: "portrait",
      },
      {
        id: "ignishun-gal-3",
        url: ignishunWelcomeKitHandover,
        caption: "Welcome Kit Handover Ceremony",
        alt: "Shiva Yadav receiving the official Ignishun Tech welcome kit box in front of the digital office display",
        aspectRatio: "portrait",
      },
    ],
    evidence: [],
    metaDescription:
      "Web Developer Intern at Ignishun Tech — building responsive frontend interfaces, clean component structures, and modern web experiences.",
    accentHue: "violet",
  },
  {
    id: "mission-004",
    missionNumber: "MISSION 004",
    slug: "ai-career-guidance-seminar",
    title: "AI & Career Guidance Seminar",
    organization: "Placement Cell, UIET, CSJMU",
    role: "Organizer / Placement Cell",
    date: "14 September 2026",
    location: "UIET, CSJMU, Kanpur",
    category: "Leadership & Community",
    shortDescription:
      "Organizing and facilitating a seminar focused on artificial intelligence and career guidance.",
    overview:
      "Organized and coordinated an on-campus seminar focused on artificial intelligence trends and career guidance through the Placement Cell at UIET, CSJMU. Managed event operations, student attendance coordination, speaker facilitation, and interactive engagement for over 100 student attendees.",
    responsibilities: [
      "Organized and coordinated logistics, outreach, and schedule for the on-campus AI and career guidance seminar.",
      "Facilitated venue management, student participation, and smooth session delivery as part of the Placement Cell organizing team.",
    ],
    technologies: ["Event Operations", "Student Engagement", "Technical Seminar Management"],
    outcomes: [
      "Facilitated an impactful session providing undergraduate students with verified career navigation insights in the AI era.",
      "Demonstrated reliable event management and team execution under deadline constraints.",
    ],
    coverImage: aiCareerGuidanceSeminarCover,
    coverImageAlt:
      "Shiva Yadav receiving Certificate of Appreciation as Placement Coordinator for the Artificial Intelligence and Career Guidance Seminar at UIET CSJMU",
    coverImageFit: "contain",
    coverImageBg: "#090A0D",
    hideCoverOverlays: true,
    gallery: [
      {
        id: "seminar-gal-1",
        url: seminarPodiumPresentationSide,
        caption: "Delivering Session Insights on Machine Learning & Embeddings",
        alt: "Shiva Yadav presenting at the podium during the AI & Career Guidance Seminar at UIET CSJMU, with slide showing vector embeddings",
        aspectRatio: "portrait",
        date: "14 September 2026",
        location: "UIET, CSJMU",
      },
      {
        id: "seminar-gal-2",
        url: seminarPodiumPresentationFront,
        caption: "From Encoding to Embeddings — Technical Presentation at the Podium",
        alt: "Shiva Yadav speaking at the seminar lectern with laptop, presenting From Encoding to Embeddings slide on the main projection screen",
        aspectRatio: "portrait",
        date: "14 September 2026",
        location: "UIET, CSJMU",
      },
      {
        id: "seminar-gal-3",
        url: seminarLiveSpeakerSession,
        caption: "Interactive Video Conference with Speaker Rajeev Chandran",
        alt: "Auditorium stage and projection screen displaying online speaker Rajeev Chandran conducting live session for UIET CSJMU students",
        aspectRatio: "landscape",
        colSpan: 1,
        date: "14 September 2026",
        location: "UIET, CSJMU",
      },
      {
        id: "seminar-gal-4",
        url: seminarAuditoriumAudienceOverview,
        caption: "Auditorium Overview — UIET CSJMU Students Attending AI Session",
        alt: "Wide auditorium view showing engineering students seated across tiered hall attending the AI & Career Guidance Seminar with stage screen",
        aspectRatio: "landscape",
        colSpan: 1,
        date: "14 September 2026",
        location: "UIET, CSJMU",
      },
      {
        id: "seminar-gal-5",
        url: seminarOrganizingTeamGroup,
        caption: "Placement Cell Organizing Team & Attendees Commemorative Photograph",
        alt: "Shiva Yadav, student organizers, and attendees assembled in front of the stage with speaker Rajeev Chandran visible on the auditorium screen",
        aspectRatio: "landscape",
        colSpan: 2,
        date: "14 September 2026",
        location: "UIET, CSJMU",
      },
    ],
    evidence: [
      {
        id: "seminar-ev-1",
        title: "Certificate of Appreciation — AI & Career Guidance Seminar",
        issuer: "Placement Cell, UIET, CSJMU",
        signatory:
          "Mr. Praveen Bhai Patel (Director, Placement Cell) & Mr. Rajeev Chandran (CFO & Principal Advisor)",
        issueDate: "14 September 2026",
        type: "Certificate",
        category: "Certificates",
        previewUrl: seminarCertificateOfAppreciation,
        fileUrl:
          "/evidence/seminar/AI_Career_Guidance_Seminar_Certificate_of_Appreciation_Shiva_Yadav.pdf",
        downloadName: "AI_Career_Guidance_Seminar_Certificate_of_Appreciation_Shiva_Yadav.pdf",
        description:
          "Official Certificate of Appreciation presented to Shiva Yadav (Placement Coordinator, UIET, CSJMU) in sincere recognition of exceptional leadership, dedicated efforts, and outstanding contribution in organizing and facilitating the 'Artificial Intelligence and Career Guidance' seminar under the aegis of the Placement Cell, UIET, CSJMU.",
        verified: true,
      },
    ],
    metaDescription:
      "AI & Career Guidance Seminar at UIET CSJMU — organized by Shiva Yadav through the Placement Cell on 14 September 2026.",
    accentHue: "magenta",
  },
  {
    id: "mission-005",
    missionNumber: "MISSION 005",
    slug: "matlab-workshop",
    title: "2-Day MATLAB Workshop",
    organization: "Technical Learning Cohort",
    role: "Workshop Participant",
    date: "2026",
    category: "Workshops & Technical Learning",
    shortDescription:
      "A technical workshop focused on MATLAB-based learning and practical exposure.",
    overview:
      "An intensive two-day technical workshop exploring the core capabilities of MATLAB for mathematical computation, scientific modeling, data visualization, and algorithm implementation.",
    responsibilities: [
      "Engaged in hands-on numerical computing sessions and practical algorithm implementations in MATLAB.",
      "Applied matrix mathematics, visualization scripts, and functional simulation routines.",
    ],
    technologies: ["MATLAB", "Numerical Computing", "Data Visualization", "Matrix Mathematics"],
    outcomes: [
      "Developed foundational fluency in MATLAB scripting, matrix operations, and visual data representation.",
      "Applied computational routines to solve engineering problems programmatically.",
    ],
    coverImage: matlabWorkshopCover,
    coverImageAlt:
      "Shiva Yadav receiving Certificate of Participation at the 2-Day MATLAB Workshop with display screen in background",
    coverImageFit: "contain",
    coverImageBg: "#090A0D",
    hideCoverOverlays: true,
    gallery: [
      {
        id: "matlab-gal-1",
        url: matlabStagePresentation,
        caption: "Delivering Technical Stage Presentation at the MATLAB Workshop",
        alt: "Shiva Yadav presenting on stage with microphone at the 2-Day MATLAB Workshop, with podium and screen in background",
        aspectRatio: "portrait",
        date: "2026",
        location: "CSJM University",
      },
      {
        id: "matlab-gal-2",
        url: matlabDelegateBadge,
        caption: "Official MATLAB Workshop 2026 Delegate Credential",
        alt: "Shiva Yadav wearing the official MATLAB Workshop 2026 delegate identity badge and blue lanyard",
        aspectRatio: "portrait",
        date: "2026",
        location: "CSJM University",
      },
      {
        id: "matlab-gal-3",
        url: matlabWorkstationLaptops,
        caption: "Numerical Computing Workstation & MATLAB Onramp Routines",
        alt: "Dual laptops displaying MATLAB Onramp computing modules with official workshop delegate badges and Fisco notepads",
        aspectRatio: "portrait",
        date: "2026",
        location: "CSJM University",
      },
      {
        id: "matlab-gal-4",
        url: matlabInstructorDataImportSession,
        caption: "Workshop Technical Lecture on Data Import & File Processing",
        alt: "Instructor delivering technical presentation on Data Import methods in MATLAB on the auditorium display screen",
        aspectRatio: "portrait",
        date: "2026",
        location: "CSJM University",
      },
      {
        id: "matlab-gal-5",
        url: matlabAuditoriumWorkspaceView,
        caption: "Participant Workspace — MATLAB Onramp Modules & Delegate ID",
        alt: "Auditorium workspace showing laptop running MATLAB Onramp course, notepad, pen, and Shiva Yadav's official delegate card",
        aspectRatio: "portrait",
        date: "2026",
        location: "CSJM University",
      },
    ],
    evidence: [
      {
        id: "matlab-ev-1",
        title: "Certificate of Completion — 2-Day MATLAB and its Applications Workshop",
        issuer: "Department of Physics, School of Basic Sciences, CSJM University",
        signatory:
          "Prof. R.K. Dwivedi (Director, SBS) & Dr. Anju Dixit (Convener) & Dr. Shikha Shukla (Co-ordinator)",
        issueDate: "19-20 August 2026",
        type: "Certificate",
        category: "Certificates",
        previewUrl: matlabCompletionCertificate,
        fileUrl: "/evidence/matlab/MATLAB_Workshop_Completion_Certificate_Shiva_Yadav.jpg",
        downloadName: "MATLAB_Workshop_Completion_Certificate_Shiva_Yadav.jpg",
        description:
          "Official Certificate of Completion awarded to Shiva Yadav for attending the two-days workshop on 'MATLAB and its Applications' organized by the Department of Physics, School of Basic Sciences, CSJM University, in association with MathWorks.",
        verified: true,
      },
    ],
    metaDescription:
      "2-Day MATLAB Workshop (2026) — hands-on numerical computing, matrix mathematics, and data visualization.",
    accentHue: "cyan",
  },
  {
    id: "mission-006",
    missionNumber: "MISSION 006",
    slug: "cognitive-chaos-hackathon",
    title: "Cognitive Chaos Hackathon 2026",
    organization: "Cognitive Chaos 2026",
    role: "Hackathon Participant",
    location: "Microsoft Office, Noida",
    date: "2026",
    category: "Hackathons & Innovation",
    shortDescription:
      "A hackathon experience associated with Cognitive Chaos 2026 at Microsoft Office, Noida.",
    overview:
      "Participated in the Cognitive Chaos 2026 hackathon hosted on-site at the Microsoft Office in Noida. Collaborated on developing SentinelQ, an experimental financial intelligence engine combining machine learning anomaly detection with SHA-256 hash-chained audit trails.",
    responsibilities: [
      "Collaborated in a sprint hackathon environment to build and pitch the SentinelQ financial intelligence prototype.",
      "Presented the architectural pipeline connecting machine learning anomaly detection to verifiable audit integrity.",
    ],
    technologies: [
      "Machine Learning",
      "Python",
      "Fraud Detection",
      "SHA-256 Hashing",
      "System Architecture",
    ],
    outcomes: [
      "Gained valuable experience pitching complex algorithmic architectures to technical juries.",
      "Collaborated effectively under tight sprint deadlines in an industry hackathon environment.",
    ],
    coverImage: cognitiveChaosHackathonCover,
    coverImageAlt:
      "Cognitive Chaos Hackathon 2026 banner at Microsoft Office Sovereign Noida — Design the Chaos, Solve the Reality",
    coverImageFit: "contain",
    coverImageBg: "#090A0D",
    hideCoverOverlays: true,
    gallery: [
      {
        id: "cognitive-gal-1",
        url: cognitiveChaosAuditoriumHall,
        caption: "Hackathon Briefing Session & Auditorium Cohort — Microsoft Office Noida",
        alt: "Wide auditorium view of hackathon participants and teams assembled for the Cognitive Chaos 2026 briefing at Microsoft Office, Sovereign Noida",
        aspectRatio: "landscape",
        colSpan: 2,
        date: "25 July 2026",
        location: "Microsoft Office, Noida",
      },
      {
        id: "cognitive-gal-2",
        url: cognitiveChaosMicrosoftReception,
        caption: "Microsoft Office Reception & Welcome Lobby — Sovereign Noida",
        alt: "Microsoft office reception and welcome desk with iconic Microsoft branding at Sovereign campus Noida during Cognitive Chaos 2026",
        aspectRatio: "portrait",
        date: "25 July 2026",
        location: "Microsoft Office, Noida",
      },
      {
        id: "cognitive-gal-3",
        url: cognitiveChaosCampusPortrait,
        caption: "Shiva Yadav at Microsoft Office Noida During Cognitive Chaos 2026",
        alt: "Shiva Yadav at the Microsoft Office Sovereign Noida campus during the Cognitive Chaos Hackathon",
        aspectRatio: "portrait",
        date: "25 July 2026",
        location: "Microsoft Office, Noida",
      },
      {
        id: "cognitive-gal-4",
        url: cognitiveChaosHackdrivenStage,
        caption: "HackDriven Stage Keynote — Build. Innovate. Impact. Presentation",
        alt: "Main stage presentation screens displaying HackDriven Build Innovate Impact during the opening keynote at Microsoft Office Noida",
        aspectRatio: "landscape",
        colSpan: 2,
        date: "25 July 2026",
        location: "Microsoft Office, Noida",
      },
      {
        id: "cognitive-gal-5",
        url: cognitiveChaosTeamAssembly,
        caption: "SentinelQ Team Members Assembled with Microsoft Visitor Lanyards",
        alt: "Hackathon project team members holding laptops and wearing official Microsoft visitor passes at Microsoft Office Noida",
        aspectRatio: "portrait",
        date: "25 July 2026",
        location: "Microsoft Office, Noida",
      },
      {
        id: "cognitive-gal-6",
        url: cognitiveChaosJuryPitchPresentation,
        caption: "SentinelQ Financial Intelligence Engine — Jury Pitch & Demonstration",
        alt: "Team presenting the SentinelQ prototype and architectural pipeline on the conference room display to evaluators at Microsoft Office Noida",
        aspectRatio: "portrait",
        date: "25 July 2026",
        location: "Microsoft Office, Noida",
      },
      {
        id: "cognitive-gal-7",
        url: cognitiveChaosHackathonSwagsLaptop,
        caption: "Cognitive Chaos 2026 Workspace Rig, Convex Swag & Developer Kit",
        alt: "Developer workspace featuring MacBook open to Cognitive Chaos 2026 portal, Convex swag, and hackathon stickers",
        aspectRatio: "portrait",
        date: "25 July 2026",
        location: "Microsoft Office, Noida",
      },
      {
        id: "cognitive-gal-8",
        url: cognitiveChaosVisitorCredentials,
        caption: "Official Microsoft Sovereign Visitor Badge & Cognitive Chaos 023 Wristband",
        alt: "Shiva Yadav with official Microsoft Sovereign Visitor badge 023 and Cognitive Chaos hackathon wristband",
        aspectRatio: "portrait",
        date: "25 July 2026",
        location: "Microsoft Office, Noida",
      },
    ],
    evidence: [
      {
        id: "cognitive-cert-1",
        title: "Certificate of Appreciation — Cognitive Chaos Hackathon 2026",
        issuer: "Cognitive Chaos / Enter Pro / HackDriven / Convex",
        signatory: "Enter Pro & HackDriven & Convex Organizing Committee",
        issueDate: "25 July 2026",
        type: "Certificate",
        category: "Certificates",
        previewUrl: cognitiveChaosCertificateOfAppreciation,
        fileUrl:
          "/evidence/cognitive-chaos/Cognitive_Chaos_Hackathon_2026_Certificate_of_Appreciation_Shiva_Yadav.jpg",
        downloadName: "Cognitive_Chaos_Hackathon_2026_Certificate_of_Appreciation_Shiva_Yadav.jpg",
        description:
          "Official Certificate of Appreciation presented to Shiva Yadav for actively participating in the Cognitive Chaos Hackathon held at Microsoft Office on 25 July 2026 and demonstrating enthusiasm and commitment toward learning and building (Credential ID: COGNI-WYFBHM).",
        verified: true,
      },
    ],
    metaDescription:
      "Cognitive Chaos Hackathon 2026 at Microsoft Office, Noida — developing and presenting the SentinelQ financial intelligence prototype.",
    accentHue: "violet",
  },
];

export function getAllExperiences(): ExperienceMission[] {
  return experienceMissions;
}

export function getExperienceBySlug(slug: string): ExperienceMission | undefined {
  return experienceMissions.find((m) => m.slug === slug);
}

export function getAdjacentExperiences(currentSlug: string): {
  prev: ExperienceMission;
  next: ExperienceMission;
} {
  const index = experienceMissions.findIndex((m) => m.slug === currentSlug);
  const n = experienceMissions.length;
  const prevIndex = (index - 1 + n) % n;
  const nextIndex = (index + 1) % n;
  return {
    prev: experienceMissions[prevIndex]!,
    next: experienceMissions[nextIndex]!,
  };
}
