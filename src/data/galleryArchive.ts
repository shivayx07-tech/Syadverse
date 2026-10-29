/**
 * Syadverse — Ultimate Chronological Gallery Archive
 *
 * Centralized, typed event data structure documenting Shiva Yadav's personal
 * chronicle across research, engineering, hackathons, and leadership.
 *
 * ============================================================================
 * HOW TO ADD PHOTOGRAPHS TO AN EVENT:
 * ============================================================================
 * 1. Place the optimized image files in the public directory:
 *    `/public/gallery/<event-id>/cover.webp` (or `.jpg` / `.png`)
 *    `/public/gallery/<event-id>/photo-1.webp`
 *
 * 2. In this file, update the event object:
 *    - Set `coverImage`: "/gallery/<event-id>/cover.webp"
 *    - Add items to the `photos` array:
 *      photos: [
 *        {
 *          id: "<event-id>-01",
 *          url: "/gallery/<event-id>/cover.webp",
 *          caption: "Descriptive caption of this moment",
 *          alt: "Meaningful accessible description",
 *          aspectRatio: "16:9" // "16:9" | "4:3" | "3:4" | "1:1"
 *        },
 *        ...
 *      ]
 *
 * 3. The Gallery UI will automatically switch from the architectural placeholder
 *    to the high-resolution photo and enable the interactive fullscreen album viewer.
 * ============================================================================
 */

export type GalleryFilterCategory =
  | "ALL"
  | "RESEARCH"
  | "AI & TECHNOLOGY"
  | "HACKATHONS"
  | "WORKSHOPS & LEARNING"
  | "LEADERSHIP & COMMUNITY";

import trips2025Cover from "@/assets/gallery/trips-2025/trips-2025-cover.jpg";
import trips2025DelegateKits from "@/assets/gallery/trips-2025/trips-2025-delegate-kits.jpg";
import trips2025DelegatesBanner from "@/assets/gallery/trips-2025/trips-2025-delegates-banner.jpg";
import trips2025GrandHallAudience from "@/assets/gallery/trips-2025/trips-2025-grand-hall-audience.jpg";
import trips2025KeynotePresentation from "@/assets/gallery/trips-2025/trips-2025-keynote-presentation.jpg";

import cyberxplore2025Cover from "@/assets/gallery/cyberxplore-2025/cyberxplore-2025-cover.jpg";
import cyberxplore2025WorkstationDesk from "@/assets/gallery/cyberxplore-2025/cyberxplore-2025-workstation-desk.jpg";
import cyberxplore2025AuditoriumSession from "@/assets/gallery/cyberxplore-2025/cyberxplore-2025-auditorium-session.jpg";

import devfestLucknow2025Cover from "@/assets/gallery/devfest-lucknow-2025/devfest-lucknow-2025-cover.jpg";
import devfestLucknow2025PassportKit from "@/assets/gallery/devfest-lucknow-2025/devfest-lucknow-2025-passport-kit.jpg";
import devfestLucknow2025InstallationPortrait from "@/assets/gallery/devfest-lucknow-2025/devfest-lucknow-2025-installation-portrait.jpg";
import devfestLucknow2025StageBackdrop from "@/assets/gallery/devfest-lucknow-2025/devfest-lucknow-2025-stage-backdrop.jpg";
import devfestLucknow2025AiAgentKeynote from "@/assets/gallery/devfest-lucknow-2025/devfest-lucknow-2025-ai-agent-keynote.jpg";
import devfestLucknow2025AtriumPortrait from "@/assets/gallery/devfest-lucknow-2025/devfest-lucknow-2025-atrium-portrait.jpg";
import devfestLucknow2025SwagKitSetup from "@/assets/gallery/devfest-lucknow-2025/devfest-lucknow-2025-swag-kit-setup.jpg";

import iwmWorkshop2025Cover from "@/assets/gallery/iwm-regional-workshop-2025/iwm-regional-workshop-2025-cover.jpg";
import iwmWorkshop2025CertificatePresentation from "@/assets/gallery/iwm-regional-workshop-2025/iwm-regional-workshop-2025-certificate-presentation.jpg";
import iwmWorkshop2025CampusEntrance from "@/assets/gallery/iwm-regional-workshop-2025/iwm-regional-workshop-2025-campus-entrance.jpg";
import iwmWorkshop2025LectureSession from "@/assets/gallery/iwm-regional-workshop-2025/iwm-regional-workshop-2025-lecture-session.jpg";
import iwmWorkshop2025CredentialsAndKits from "@/assets/gallery/iwm-regional-workshop-2025/iwm-regional-workshop-2025-credentials-and-kits.jpg";
import iwmWorkshop2025SpeakersBannerBadges from "@/assets/gallery/iwm-regional-workshop-2025/iwm-regional-workshop-2025-speakers-banner-badges.jpg";
import iwmWorkshop2025StandingPortrait from "@/assets/gallery/iwm-regional-workshop-2025/iwm-regional-workshop-2025-standing-portrait.jpg";

import womenInAiWorld2026Cover from "@/assets/gallery/women-in-ai-world-2026/women-in-ai-world-2026-cover.jpg";
import womenInAiWorld2026AttendeeWorkstation from "@/assets/gallery/women-in-ai-world-2026/women-in-ai-world-2026-attendee-workstation.jpg";
import womenInAiWorld2026WorkstationSetup from "@/assets/gallery/women-in-ai-world-2026/women-in-ai-world-2026-workstation-setup.jpg";
import womenInAiWorld2026CommunityAssembly from "@/assets/gallery/women-in-ai-world-2026/women-in-ai-world-2026-community-assembly.jpg";
import womenInAiWorld2026KeynoteProjection from "@/assets/gallery/women-in-ai-world-2026/women-in-ai-world-2026-keynote-projection.jpg";

import tedxIitKanpur2026Cover from "@/assets/gallery/tedx-iit-kanpur-2026/tedx-iit-kanpur-2026-cover.jpg";
import tedxIitKanpur2026AuditoriumEntrance from "@/assets/gallery/tedx-iit-kanpur-2026/tedx-iit-kanpur-2026-auditorium-entrance.jpg";
import tedxIitKanpur2026SpeakerStandeePortrait from "@/assets/gallery/tedx-iit-kanpur-2026/tedx-iit-kanpur-2026-speaker-standee-portrait.jpg";
import tedxIitKanpur2026LobbyDelegationSelfie from "@/assets/gallery/tedx-iit-kanpur-2026/tedx-iit-kanpur-2026-lobby-delegation-selfie.jpg";
import tedxIitKanpur2026KeynoteStage from "@/assets/gallery/tedx-iit-kanpur-2026/tedx-iit-kanpur-2026-keynote-stage.jpg";
import tedxIitKanpur2026BackdropPortrait from "@/assets/gallery/tedx-iit-kanpur-2026/tedx-iit-kanpur-2026-backdrop-portrait.jpg";
import tedxIitKanpur2026SpeakerPrakritiPresentation from "@/assets/gallery/tedx-iit-kanpur-2026/tedx-iit-kanpur-2026-speaker-prakriti-presentation.jpg";

import sparkHack2026Cover from "@/assets/gallery/spark-hack-2026/spark-hack-2026-cover.jpg";
import sparkHack2026CampusArchitecture from "@/assets/gallery/spark-hack-2026/spark-hack-2026-campus-architecture.jpg";
import sparkHack2026TeamCookieByte from "@/assets/gallery/spark-hack-2026/spark-hack-2026-team-cookie-byte.jpg";
import sparkHack2026WarRoomIdeation from "@/assets/gallery/spark-hack-2026/spark-hack-2026-war-room-ideation.jpg";
import sparkHack2026AuditoriumAssembly from "@/assets/gallery/spark-hack-2026/spark-hack-2026-auditorium-assembly.jpg";
import sparkHack2026TeamStandingPortrait from "@/assets/gallery/spark-hack-2026/spark-hack-2026-team-standing-portrait.jpg";
import sparkHack2026HackingLabSession from "@/assets/gallery/spark-hack-2026/spark-hack-2026-hacking-lab-session.jpg";
import sparkHack2026MainStageSetup from "@/assets/gallery/spark-hack-2026/spark-hack-2026-main-stage-setup.jpg";

import iitkInternship2026Cover from "@/assets/gallery/iit-kanpur-research-internship-2026/iitk-internship-2026-cover.jpg";
import iitkInternship2026RajeevMotwaniBuilding from "@/assets/gallery/iit-kanpur-research-internship-2026/iitk-internship-2026-rajeev-motwani-building.jpg";
import iitkInternship2026LabResearchWorkstation from "@/assets/gallery/iit-kanpur-research-internship-2026/iitk-internship-2026-lab-research-workstation.jpg";
import iitkInternship2026DualLaptopExperimentation from "@/assets/gallery/iit-kanpur-research-internship-2026/iitk-internship-2026-dual-laptop-experimentation.jpg";
import iitkInternship2026CampusLandmarkSculpture from "@/assets/gallery/iit-kanpur-research-internship-2026/iitk-internship-2026-campus-landmark-sculpture.jpg";
import iitkInternship2026ResearchCollaboratorsSelfie from "@/assets/gallery/iit-kanpur-research-internship-2026/iitk-internship-2026-research-collaborators-selfie.jpg";
import iitkInternship2026FocusedResearchSession from "@/assets/gallery/iit-kanpur-research-internship-2026/iitk-internship-2026-focused-research-session.jpg";
import iitkInternship2026FacultyMentorshipHandover from "@/assets/gallery/iit-kanpur-research-internship-2026/iitk-internship-2026-faculty-mentorship-handover.jpg";
import iitkInternship2026ActiveCodingWorkstation from "@/assets/gallery/iit-kanpur-research-internship-2026/iitk-internship-2026-active-coding-workstation.jpg";
import iitkInternship2026CampusBrickMonument from "@/assets/gallery/iit-kanpur-research-internship-2026/iitk-internship-2026-campus-brick-monument.jpg";
import iitkInternship2026NexestateEmblem from "@/assets/gallery/iit-kanpur-research-internship-2026/iitk-internship-2026-nexestate-emblem.jpg";
import iitkInternship2026CompletionAnnouncementDocument from "@/assets/gallery/iit-kanpur-research-internship-2026/iitk-internship-2026-completion-announcement-document.jpg";
import iitkInternship2026NexestateCafeWorkstation from "@/assets/gallery/iit-kanpur-research-internship-2026/iitk-internship-2026-nexestate-cafe-workstation.jpg";
import iitkInternship2026NexestateArchitectureShowcase from "@/assets/gallery/iit-kanpur-research-internship-2026/iitk-internship-2026-nexestate-architecture-showcase.jpg";

import cognitiveChaos2026Cover from "@/assets/gallery/cognitive-chaos-2026/cognitive-chaos-2026-cover.jpg";
import cognitiveChaos2026VisitorBadgeCredentials from "@/assets/gallery/cognitive-chaos-2026/cognitive-chaos-2026-visitor-badge-credentials.jpg";
import cognitiveChaos2026CampusMirrorPortrait from "@/assets/gallery/cognitive-chaos-2026/cognitive-chaos-2026-campus-mirror-portrait.jpg";
import cognitiveChaos2026AuditoriumAssembly from "@/assets/gallery/cognitive-chaos-2026/cognitive-chaos-2026-auditorium-assembly.jpg";
import cognitiveChaos2026EventBannerStandee from "@/assets/gallery/cognitive-chaos-2026/cognitive-chaos-2026-event-banner-standee.jpg";
import cognitiveChaos2026HackathonSwagsLaptop from "@/assets/gallery/cognitive-chaos-2026/cognitive-chaos-2026-hackathon-swags-laptop.jpg";
import cognitiveChaos2026TeamAssembly from "@/assets/gallery/cognitive-chaos-2026/cognitive-chaos-2026-team-assembly.jpg";
import cognitiveChaos2026HackdrivenStage from "@/assets/gallery/cognitive-chaos-2026/cognitive-chaos-2026-hackdriven-stage.jpg";

import aiBuilderWorkshop2026Cover from "@/assets/gallery/ai-builder-workshop-2026/ai-builder-workshop-2026-cover.jpg";
import aiBuilderWorkshop2026KeynoteHall from "@/assets/gallery/ai-builder-workshop-2026/ai-builder-workshop-2026-keynote-hall.jpg";
import aiBuilderWorkshop2026InteractiveSpeakerSession from "@/assets/gallery/ai-builder-workshop-2026/ai-builder-workshop-2026-interactive-speaker-session.jpg";
import aiBuilderWorkshop2026ModelArmorEngineering from "@/assets/gallery/ai-builder-workshop-2026/ai-builder-workshop-2026-model-armor-engineering.jpg";
import aiBuilderWorkshop2026HandsOnAudienceHall from "@/assets/gallery/ai-builder-workshop-2026/ai-builder-workshop-2026-hands-on-audience-hall.jpg";
import aiBuilderWorkshop2026CohortGroupPortrait from "@/assets/gallery/ai-builder-workshop-2026/ai-builder-workshop-2026-cohort-group-portrait.jpg";

import matlabWorkshop2026Cover from "@/assets/gallery/matlab-workshop-2026/matlab-workshop-2026-cover.jpg";
import matlabWorkshop2026AttendeeWorkstation from "@/assets/gallery/matlab-workshop-2026/matlab-workshop-2026-attendee-workstation.jpg";
import matlabWorkshop2026DelegateBadgeCredentials from "@/assets/gallery/matlab-workshop-2026/matlab-workshop-2026-delegate-badge-credentials.jpg";
import matlabWorkshop2026DataImportLecture from "@/assets/gallery/matlab-workshop-2026/matlab-workshop-2026-data-import-lecture.jpg";
import matlabWorkshop2026DualLaptopLab from "@/assets/gallery/matlab-workshop-2026/matlab-workshop-2026-dual-laptop-lab.jpg";
import matlabWorkshop2026CollaboratorsAuditoriumSelfie from "@/assets/gallery/matlab-workshop-2026/matlab-workshop-2026-collaborators-auditorium-selfie.jpg";

import seminar2026Cover from "@/assets/gallery/ai-career-guidance-seminar-2026/seminar-2026-cover.jpg";
import seminar2026CertificateOfAppreciation from "@/assets/gallery/ai-career-guidance-seminar-2026/seminar-2026-certificate-of-appreciation.jpg";
import seminar2026PodiumPresentationSide from "@/assets/gallery/ai-career-guidance-seminar-2026/seminar-2026-podium-presentation-side.jpg";
import seminar2026SpeakerKeynoteStage from "@/assets/gallery/ai-career-guidance-seminar-2026/seminar-2026-speaker-keynote-stage.jpg";
import seminar2026AuditoriumAudienceOverview from "@/assets/gallery/ai-career-guidance-seminar-2026/seminar-2026-auditorium-audience-overview.jpg";
import seminar2026GenerativeAiPresentation from "@/assets/gallery/ai-career-guidance-seminar-2026/seminar-2026-generative-ai-presentation.jpg";
import seminar2026PodiumAudienceView from "@/assets/gallery/ai-career-guidance-seminar-2026/seminar-2026-podium-audience-view.jpg";
import seminar2026OrganizingTeamPoster from "@/assets/gallery/ai-career-guidance-seminar-2026/seminar-2026-organizing-team-poster.jpg";
import seminar2026CohortGroupPortrait from "@/assets/gallery/ai-career-guidance-seminar-2026/seminar-2026-cohort-group-portrait.jpg";

export interface GalleryPhoto {
  id: string;
  url: string;
  caption?: string;
  alt?: string;
  aspectRatio?: "16:9" | "4:3" | "3:4" | "1:1" | "9:16";
  width?: number;
  height?: number;
}

export interface GalleryEvent {
  id: string;
  eventNumber: string; // e.g. "01", "02", ...
  title: string;
  date: string;
  startDate?: string;
  endDate?: string;
  dateLabel?: string;
  year: 2025 | 2026;
  location?: string;
  category: string;
  filterCategories: GalleryFilterCategory[];
  quote: string;
  description: string;
  achievement?: string;
  additionalDetail?: string;
  coverImage?: string; // empty string or URL when photo is uploaded
  photos: GalleryPhoto[]; // empty array until photos are added
  visualTreatment?: "opening-hero" | "standard" | "research-deep-dive" | "asymmetric";
  slots?: {
    label: string;
    aspectRatio: "16:9" | "4:3" | "3:4" | "1:1" | "9:16";
    captionPlaceholder: string;
  }[];
}

export interface YearChapter {
  year: 2025 | 2026;
  title: string;
  subtitle: string;
  tagline: string;
}

export const yearChapters: Record<2025 | 2026, YearChapter> = {
  2025: {
    year: 2025,
    title: "2025 — THE BEGINNING OF EXPLORATION",
    subtitle: "Where curiosity found new directions.",
    tagline: "FOUNDATIONAL HORIZONS",
  },
  2026: {
    year: 2026,
    title: "2026 — THE YEAR OF BUILDING",
    subtitle: "From learning new ideas to building, researching, and leading with purpose.",
    tagline: "EXPANSION & DEEP TECH",
  },
};

export const galleryFilterOptions: { id: GalleryFilterCategory; label: string }[] = [
  { id: "ALL", label: "All Journeys" },
  { id: "RESEARCH", label: "Research & Science" },
  { id: "AI & TECHNOLOGY", label: "AI & Technology" },
  { id: "HACKATHONS", label: "Hackathons" },
  { id: "WORKSHOPS & LEARNING", label: "Workshops & Learning" },
  { id: "LEADERSHIP & COMMUNITY", label: "Leadership & Community" },
];

export const galleryChronicleArchive: GalleryEvent[] = [
  // ==========================================
  // YEAR 2025: CHAPTER 01 — 04
  // ==========================================
  {
    id: "trips-2025",
    eventNumber: "01",
    title: "TRIPS 2025 — Technology, Research, Innovation, and Policy Summit",
    date: "22 August 2025",
    startDate: "2025-08-22",
    year: 2025,
    location: "IIT Kanpur",
    category: "Research & Innovation",
    filterCategories: ["ALL", "RESEARCH"],
    quote: "“Big ideas create impact when research, innovation, and policy move forward together.”",
    description:
      "An inspiring summit exploring collaboration between academia, industry, and policymakers, with perspectives on sustainable innovation, Industry 4.0, translational research, and technology-driven progress.",
    visualTreatment: "opening-hero",
    coverImage: trips2025Cover,
    photos: [
      {
        id: "trips-2025-01",
        url: trips2025Cover,
        caption:
          "The grand architectural facade of the TRIPS 2025 summit venue illuminated at twilight, featuring neoclassical archways, classical statuary, and warm ambient lighting.",
        alt: "Official Cover: TRIPS 2025 summit venue neoclassical facade illuminated at twilight",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "trips-2025-02",
        url: trips2025DelegateKits,
        caption:
          "Official TRIPS 2025 summit delegate kits, participant credentials for Shiva Yadav, and conference dossier folders bearing the Indian Institute of Technology Kanpur emblem.",
        alt: "TRIPS 2025 delegate credentials and official conference dossier kit",
        aspectRatio: "9:16",
        width: 576,
        height: 1024,
      },
      {
        id: "trips-2025-03",
        url: trips2025DelegatesBanner,
        caption:
          "Delegates standing before the official TRIPS 2025 summit banner, displaying the theme 'Bridging Technology, Research, Innovation and Policy for a Sustainable Future' alongside national research partners and sponsors.",
        alt: "Summit delegates standing beside the official TRIPS 2025 sponsor and partner banner",
        aspectRatio: "3:4",
        width: 727,
        height: 1024,
      },
      {
        id: "trips-2025-04",
        url: trips2025GrandHallAudience,
        caption:
          "The summit conference auditorium hall under crystal chandeliers, with dignitaries on stage, media broadcast teams, and delegates assembled for the plenary opening session.",
        alt: "TRIPS 2025 conference auditorium hall with crystal chandeliers and plenary session on stage",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "trips-2025-05",
        url: trips2025KeynotePresentation,
        caption:
          "Keynote plenary presentation on 'Technology Research Innovation Policy Summit-2025' delivered by Lal Chand Mangal, DS & DG (TM), DRDO, from the flower-adorned summit podium.",
        alt: "Keynote presentation at TRIPS 2025 by DRDO DS and DG TM Lal Chand Mangal on main stage screen",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
    ],
    slots: [
      {
        label: "Summit Venue Facade (Cover)",
        aspectRatio: "3:4",
        captionPlaceholder: "Neoclassical architecture venue illuminated at twilight",
      },
      {
        label: "Delegate Credentials & Kits",
        aspectRatio: "3:4",
        captionPlaceholder: "Official TRIPS 2025 conference kit and delegate badge",
      },
      {
        label: "Summit Delegation Banner",
        aspectRatio: "3:4",
        captionPlaceholder: "Delegates beside official TRIPS 2025 partner banner",
      },
    ],
  },
  {
    id: "cyberxplore-2025",
    eventNumber: "02",
    title: "CyberXplore — Cybersecurity Workshop",
    date: "17 October 2025",
    startDate: "2025-10-17",
    year: 2025,
    location: "CSJMU Kanpur",
    category: "Cybersecurity & Learning",
    filterCategories: ["ALL", "WORKSHOPS & LEARNING"],
    quote:
      "“Every system has a story; learning to secure it begins with asking the right questions.”",
    description:
      "A hands-on cybersecurity experience organized by aatmoday and Code Vidya, exploring ethical hacking, practical security tools, Capture The Flag challenges, and digital defense.",
    visualTreatment: "asymmetric",
    coverImage: cyberxplore2025Cover,
    photos: [
      {
        id: "cyberxplore-2025-01",
        url: cyberxplore2025Cover,
        caption:
          "Official CyberXplore cybersecurity workshop delegation and organizing council assembly at CSJMU Kanpur, presented by aatmoday and Code Vidya.",
        alt: "Official Cover: CyberXplore cybersecurity workshop group assembly at CSJMU Kanpur",
        aspectRatio: "1:1",
        width: 1024,
        height: 1024,
      },
      {
        id: "cyberxplore-2025-02",
        url: cyberxplore2025WorkstationDesk,
        caption:
          "Interactive hands-on technical workshop desk with laptop, conference audio setup, and live projection screen exploring foundational cybersecurity concepts.",
        alt: "CyberXplore technical workshop desk with laptop and presentation screen",
        aspectRatio: "9:16",
        width: 576,
        height: 1024,
      },
      {
        id: "cyberxplore-2025-03",
        url: cyberxplore2025AuditoriumSession,
        caption:
          "Live ethical hacking and digital defense lecture session in the tiered lecture hall at CSJMU Kanpur, with students engaged across curved auditorium rows.",
        alt: "CyberXplore live lecture session in the CSJMU amphitheater auditorium",
        aspectRatio: "1:1",
        width: 1024,
        height: 1024,
      },
    ],
    slots: [
      {
        label: "Official Delegation Assembly",
        aspectRatio: "1:1",
        captionPlaceholder: "CyberXplore group assembly and organizing council at CSJMU",
      },
      {
        label: "Technical Workshop Desk",
        aspectRatio: "3:4",
        captionPlaceholder: "Hands-on CTF challenge & tooling lab setup",
      },
      {
        label: "Auditorium Lecture",
        aspectRatio: "1:1",
        captionPlaceholder: "Live cybersecurity lecture in the CSJMU amphitheater",
      },
    ],
  },
  {
    id: "google-devfest-lucknow-2025",
    eventNumber: "03",
    title: "Google DevFest Lucknow 2025",
    date: "17 November 2025",
    startDate: "2025-11-17",
    year: 2025,
    location: "Lucknow",
    category: "Developer Community",
    filterCategories: ["ALL", "WORKSHOPS & LEARNING", "LEADERSHIP & COMMUNITY"],
    quote:
      "“The best way to understand technology is to learn, build, and grow alongside the people shaping it.”",
    description:
      "A developer-focused experience featuring technical sessions, hands-on learning, modern development practices, and conversations with the technology community.",
    visualTreatment: "standard",
    coverImage: devfestLucknow2025Cover,
    photos: [
      {
        id: "google-devfest-lucknow-2025-01",
        url: devfestLucknow2025Cover,
        caption:
          "Grand keynote stage and plenary hall under crystal chandeliers at Google DevFest Lucknow 2025, featuring the official Google for Developers stage installation.",
        alt: "Official Cover: Google DevFest Lucknow 2025 grand keynote stage with crystal chandeliers",
        aspectRatio: "16:9",
        width: 1024,
        height: 576,
      },
      {
        id: "google-devfest-lucknow-2025-02",
        url: devfestLucknow2025PassportKit,
        caption:
          "Official Google DevFest Lucknow 2025 attendee passport guide, event boarding passes, and conference accreditation.",
        alt: "Google DevFest Lucknow 2025 attendee passport guide and boarding passes",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "google-devfest-lucknow-2025-03",
        url: devfestLucknow2025InstallationPortrait,
        caption:
          "Shiva Yadav with the 3D DevFest installation and commemorative Lucknow architectural backdrop at Google DevFest 2025.",
        alt: "Shiva Yadav with the 3D DevFest Lucknow 2025 sculpture installation",
        aspectRatio: "4:3",
        width: 1024,
        height: 734,
      },
      {
        id: "google-devfest-lucknow-2025-04",
        url: devfestLucknow2025StageBackdrop,
        caption:
          "The Google Developer Groups DevFest Lucknow 2025 commemorative stage installation, showcasing regional heritage architecture and Google Developer ecosystem motifs.",
        alt: "Google DevFest Lucknow 2025 stage installation with 3D logo and architectural backdrop",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "google-devfest-lucknow-2025-05",
        url: devfestLucknow2025AiAgentKeynote,
        caption:
          "Technical keynote session exploring modern AI agent architecture (LLM + Tools + Context + Actions) on the main DevFest presentation stage.",
        alt: "Keynote presentation on AI Agent architecture at Google DevFest Lucknow 2025",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "google-devfest-lucknow-2025-06",
        url: devfestLucknow2025AtriumPortrait,
        caption:
          "Shiva Yadav at the Google DevFest Lucknow 2025 conference venue, framed by vibrant geometric art installations and modern glass balustrades.",
        alt: "Shiva Yadav in the modern conference atrium with colorful geometric artwork at Google DevFest Lucknow 2025",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "google-devfest-lucknow-2025-07",
        url: devfestLucknow2025SwagKitSetup,
        caption:
          "DevFest Lucknow 2025 technical workspace setup featuring MacBook open to the DevFest Lucknow portal, Google Developer Groups Lucknow tote bag, event notebook, 60W multi-cable kit, and boarding passes.",
        alt: "Google Developer Groups Lucknow DevFest workspace setup with MacBook, swag kit, and badges",
        aspectRatio: "9:16",
        width: 576,
        height: 1024,
      },
    ],
    slots: [
      {
        label: "DevFest Main Stage (Cover)",
        aspectRatio: "16:9",
        captionPlaceholder: "Developer ecosystem keynote & plenary hall",
      },
      {
        label: "Attendee Passport & Kit",
        aspectRatio: "3:4",
        captionPlaceholder: "Official DevFest passport guide and boarding passes",
      },
      {
        label: "Heritage Stage Installation",
        aspectRatio: "4:3",
        captionPlaceholder: "3D DevFest sculpture and Lucknow architectural backdrop",
      },
    ],
  },
  {
    id: "iwm-workshop-2025",
    eventNumber: "04",
    title: "IWM Regional Workshop",
    date: "13 December 2025",
    startDate: "2025-12-13",
    dateLabel: "13 December 2025 · Two-Day Academic Workshop",
    year: 2025,
    location: "IIT Kanpur",
    category: "Mathematics & Research",
    filterCategories: ["ALL", "RESEARCH", "WORKSHOPS & LEARNING"],
    quote: "“When mathematics meets computing, new ways of thinking begin to emerge.”",
    description:
      "An academic workshop exploring mathematics career pathways and the connections between mathematical thinking, computing, problem-solving, and research.",
    additionalDetail:
      "Described as a two-day workshop. The verified attendance date is 13 December 2025.",
    visualTreatment: "asymmetric",
    coverImage: iwmWorkshop2025Cover,
    photos: [
      {
        id: "iwm-regional-workshop-2025-01",
        url: iwmWorkshop2025Cover,
        caption:
          "Shiva Yadav with fellow workshop delegates at the official IWM Regional Workshop banner, presented by the Office of Outreach Activities at IIT Kanpur.",
        alt: "Official Cover: Shiva Yadav and delegates at the IWM Regional Workshop banner at IIT Kanpur",
        aspectRatio: "4:3",
        width: 1024,
        height: 728,
      },
      {
        id: "iwm-regional-workshop-2025-02",
        url: iwmWorkshop2025CertificatePresentation,
        caption:
          "Shiva Yadav receiving the official certificate of participation from the faculty coordinator outside the department hall at IIT Kanpur.",
        alt: "Shiva Yadav receiving IWM Regional Workshop participation certificate at IIT Kanpur",
        aspectRatio: "9:16",
        width: 576,
        height: 1024,
      },
      {
        id: "iwm-regional-workshop-2025-03",
        url: iwmWorkshop2025CampusEntrance,
        caption:
          "The iconic Indian Institute of Technology Kanpur (IIT Kanpur) campus entrance landmark and institutional signage surrounded by greenery.",
        alt: "Indian Institute of Technology Kanpur entrance sign and monument",
        aspectRatio: "1:1",
        width: 736,
        height: 736,
      },
      {
        id: "iwm-regional-workshop-2025-04",
        url: iwmWorkshop2025LectureSession,
        caption:
          "Live academic lecture session on 'Mathematics as applicable tool' and mathematical modeling delivered in the department lecture hall at IIT Kanpur.",
        alt: "Academic lecture on mathematical modeling at IIT Kanpur during IWM Regional Workshop",
        aspectRatio: "9:16",
        width: 576,
        height: 1024,
      },
      {
        id: "iwm-regional-workshop-2025-05",
        url: iwmWorkshop2025CredentialsAndKits,
        caption:
          "Official IWM Regional Workshop documentation, attendee lanyards, spiral notebooks, and IIT Kanpur Office of Outreach Activities participation certificates.",
        alt: "Official IWM Regional Workshop certificates, notebooks, and badges flatlay",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "iwm-regional-workshop-2025-06",
        url: iwmWorkshop2025SpeakersBannerBadges,
        caption:
          "Workshop delegates presenting their official IWM Regional Workshop notebooks and credentials before the keynote speakers and organizing faculty banner.",
        alt: "Delegates holding IWM Regional Workshop notebooks and accreditation badges at the speakers banner",
        aspectRatio: "9:16",
        width: 576,
        height: 1024,
      },
      {
        id: "iwm-regional-workshop-2025-07",
        url: iwmWorkshop2025StandingPortrait,
        caption:
          "Shiva Yadav standing beside the official IWM Regional Workshop banner at the Department of Mathematics and Statistics, Indian Institute of Technology Kanpur.",
        alt: "Shiva Yadav standing with notebook beside the official IWM Regional Workshop banner at IIT Kanpur",
        aspectRatio: "9:16",
        width: 576,
        height: 1024,
      },
    ],
    slots: [
      {
        label: "IWM Workshop Delegation (Cover)",
        aspectRatio: "4:3",
        captionPlaceholder: "IWM regional workshop delegation at IIT Kanpur banner",
      },
      {
        label: "Certificate Handover Ceremony",
        aspectRatio: "4:3",
        captionPlaceholder: "Official IWM workshop certificate reception",
      },
      {
        label: "IIT Kanpur Campus Landmark",
        aspectRatio: "4:3",
        captionPlaceholder: "Indian Institute of Technology Kanpur entrance",
      },
    ],
  },

  // ==========================================
  // YEAR 2026: CHAPTER 05 — 12
  // ==========================================
  {
    id: "women-in-ai-world-2026",
    eventNumber: "05",
    title: "Women in AI World",
    date: "15 March 2026",
    startDate: "2026-03-15",
    year: 2026,
    location: "CSJMU Kanpur",
    category: "Artificial Intelligence & Community",
    filterCategories: ["ALL", "AI & TECHNOLOGY", "LEADERSHIP & COMMUNITY"],
    quote: "“AI becomes meaningful when knowledge turns into ideas, and ideas turn into impact.”",
    description:
      "An AI-focused event organized by the CodeVidya programming community under the Aatmoday Hobby Club Council, in collaboration with Kanpur AI Space. The experience included perspectives from industry speakers and student participation across institutions.",
    achievement: "Recognized with event competition accolades.",
    coverImage: womenInAiWorld2026Cover,
    photos: [
      {
        id: "women-in-ai-world-2026-01",
        url: womenInAiWorld2026Cover,
        caption:
          "Official Women in AI World event banner, presented by Code Vidya Coding Club under Aatmoday Hobby Club Council in collaboration with Kanpur AI Space at CSJM University Kanpur.",
        alt: "Official Cover: Women in AI World event banner at CSJM University Kanpur",
        aspectRatio: "3:4",
        width: 818,
        height: 1024,
      },
      {
        id: "women-in-ai-world-2026-02",
        url: womenInAiWorld2026AttendeeWorkstation,
        caption:
          "Interactive attendee workstation in the CSJMU conference auditorium, with MacBook open to the Women in AI World portal and the main keynote projection screen.",
        alt: "Attendee workstation with MacBook and live keynote projection screen at Women in AI World",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "women-in-ai-world-2026-03",
        url: womenInAiWorld2026WorkstationSetup,
        caption:
          "Technical meetup desk setup with dual MacBooks open to the KanpurAI community platform and Women in AI World portal, developer stickers, and refreshments.",
        alt: "Developer workspace setup with dual MacBooks and KanpurAI platform",
        aspectRatio: "16:9",
        width: 1024,
        height: 576,
      },
      {
        id: "women-in-ai-world-2026-04",
        url: womenInAiWorld2026CommunityAssembly,
        caption:
          "Grand community delegation and participant assembly on stage in the CSJMU conference auditorium for the Women in AI World March meetup.",
        alt: "Women in AI World community assembly and group photograph on stage at CSJMU",
        aspectRatio: "16:9",
        width: 1024,
        height: 576,
      },
      {
        id: "women-in-ai-world-2026-05",
        url: womenInAiWorld2026KeynoteProjection,
        caption:
          "Main plenary auditorium stage at CSJMU featuring the official Women in AI World March Meetup keynote projection, presented by KanpurAI, Code Vidya, and NSS.",
        alt: "Keynote presentation screen at CSJMU for Women in AI World March Meetup",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
    ],
    slots: [
      {
        label: "Official Event Banner (Cover)",
        aspectRatio: "3:4",
        captionPlaceholder: "Women in AI World banner presented by Code Vidya and Kanpur AI",
      },
      {
        label: "Attendee Workstation",
        aspectRatio: "3:4",
        captionPlaceholder: "Live meetup session with attendee laptops and presentation screen",
      },
      {
        label: "Developer Workspace Setup",
        aspectRatio: "16:9",
        captionPlaceholder: "Dual workstation laptops, developer stickers, and community platform",
      },
    ],
  },
  {
    id: "tedx-iit-kanpur-2026",
    eventNumber: "06",
    title: "TEDxIIT Kanpur — Decoding the Default",
    date: "29 March 2026",
    startDate: "2026-03-29",
    year: 2026,
    location: "IIT Kanpur",
    category: "Ideas & Personal Growth",
    filterCategories: ["ALL", "WORKSHOPS & LEARNING"],
    quote: "“Growth begins when you question what you once accepted as normal.”",
    description:
      "A thought-provoking TEDx experience exploring familiar patterns, personal assumptions, communication, and the power of questioning established ways of thinking.",
    coverImage: tedxIitKanpur2026Cover,
    photos: [
      {
        id: "tedx-iit-kanpur-2026-01",
        url: tedxIitKanpur2026Cover,
        caption:
          "Student delegation gathered before the official checkered TEDxIITKanpur backdrop featuring the Indian Institute of Technology Kanpur insignia.",
        alt: "Official Cover: Student delegation standing before the checkered TEDxIITKanpur backdrop at IIT Kanpur",
        aspectRatio: "1:1",
        width: 1024,
        height: 976,
      },
      {
        id: "tedx-iit-kanpur-2026-02",
        url: tedxIitKanpur2026AuditoriumEntrance,
        caption:
          "Outreach Auditorium entrance foyer at IIT Kanpur adorned with lush foliage and the official TEDxIITKanpur speakers roll-up standee.",
        alt: "Outreach Auditorium foyer entrance at IIT Kanpur with lush greenery and TEDxIITKanpur speakers banner",
        aspectRatio: "16:9",
        width: 1024,
        height: 576,
      },
      {
        id: "tedx-iit-kanpur-2026-03",
        url: tedxIitKanpur2026SpeakerStandeePortrait,
        caption:
          "Standing beside the official TEDxIITKanpur speaker roster roll-up display at the Outreach Auditorium, IIT Kanpur.",
        alt: "Portrait standing beside the official TEDxIITKanpur speaker roster roll-up banner outside Outreach Auditorium",
        aspectRatio: "9:16",
        width: 576,
        height: 1024,
      },
      {
        id: "tedx-iit-kanpur-2026-04",
        url: tedxIitKanpur2026LobbyDelegationSelfie,
        caption:
          "Student delegation selfie in the sunlit lobby of IIT Kanpur's Outreach Auditorium before the plenary talks.",
        alt: "Group selfie of delegates inside the Outreach Auditorium lobby with the TEDx banner",
        aspectRatio: "16:9",
        width: 1024,
        height: 576,
      },
      {
        id: "tedx-iit-kanpur-2026-05",
        url: tedxIitKanpur2026KeynoteStage,
        caption:
          "Keynote talk delivered on the TEDxIITKanpur stage at Outreach Auditorium, featuring the illuminated red TEDx letters and Decoding the Default presentation.",
        alt: "Keynote talk on the TEDxIITKanpur stage featuring illuminated red TEDx letters and Decoding the Default presentation",
        aspectRatio: "16:9",
        width: 1024,
        height: 576,
      },
      {
        id: "tedx-iit-kanpur-2026-06",
        url: tedxIitKanpur2026BackdropPortrait,
        caption:
          "Full-length portrait before the iconic checkered TEDxIITKanpur backdrop banner outside the auditorium.",
        alt: "Full-length portrait of Shiva before the checkered TEDxIITKanpur backdrop at IIT Kanpur",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "tedx-iit-kanpur-2026-07",
        url: tedxIitKanpur2026SpeakerPrakritiPresentation,
        caption:
          "Speaker presentation on the TEDxIITKanpur stage exploring 'Career Path Based On Prakriti' alongside illuminated red 3D TEDx signage.",
        alt: "Speaker delivering presentation on Career Path Based On Prakriti on the TEDxIITKanpur stage",
        aspectRatio: "4:3",
        width: 1024,
        height: 768,
      },
    ],
    slots: [
      {
        label: "Official Event Backdrop (Cover)",
        aspectRatio: "1:1",
        captionPlaceholder: "Student delegation before the official checkered TEDx backdrop",
      },
      {
        label: "Auditorium Entrance & Standee",
        aspectRatio: "16:9",
        captionPlaceholder: "Outreach Auditorium foyer and TEDxIITKanpur speaker standee",
      },
      {
        label: "Speaker Roster Standee",
        aspectRatio: "4:3",
        captionPlaceholder: "Portrait beside the official TEDxIITKanpur speakers roll-up display",
      },
    ],
  },
  {
    id: "spark-hack-2026",
    eventNumber: "07",
    title: "Spark Hack 2026",
    date: "3 April 2026",
    startDate: "2026-04-03",
    year: 2026,
    location: "Sanskriti University, Mathura",
    category: "Hackathons & Teamwork",
    filterCategories: ["ALL", "HACKATHONS"],
    quote:
      "“Under pressure, ideas become plans, teamwork becomes execution, and ambition becomes action.”",
    description:
      "A 24-hour hackathon experience with Team Cookie_Byte, focused on ideation, structured execution, teamwork, problem-solving, and presenting a solution under time pressure.",
    achievement: "Advanced through the official PPT Submission Round.",
    coverImage: sparkHack2026Cover,
    photos: [
      {
        id: "spark-hack-2026-01",
        url: sparkHack2026Cover,
        caption:
          "Official Spark Hack 2026 entrance portal and ceremonial gateway at Sanskriti University, Mathura.",
        alt: "Official Cover: Spark Hack 2026 entrance gateway at Sanskriti University Mathura",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "spark-hack-2026-02",
        url: sparkHack2026CampusArchitecture,
        caption:
          "Sanskriti University School of Engineering & IT campus courtyard decorated with festival garlands and the tall Spark Hack 2026 banner.",
        alt: "Sanskriti University engineering building courtyard with Spark Hack 2026 building banner",
        aspectRatio: "16:9",
        width: 1024,
        height: 576,
      },
      {
        id: "spark-hack-2026-03",
        url: sparkHack2026TeamCookieByte,
        caption:
          "Team Cookie_Byte gathered before the official Spark Hack 2026 hackathon backdrop in matching event t-shirts.",
        alt: "Team Cookie_Byte assembled before the Spark Hack 2026 event backdrop",
        aspectRatio: "16:9",
        width: 1024,
        height: 576,
      },
      {
        id: "spark-hack-2026-04",
        url: sparkHack2026WarRoomIdeation,
        caption:
          "Focused ideation and architecture sprint in the hackathon war room with code editor and planning notebook.",
        alt: "Shiva coding and writing architecture notes during the 24-hour hackathon sprint",
        aspectRatio: "9:16",
        width: 576,
        height: 1024,
      },
      {
        id: "spark-hack-2026-05",
        url: sparkHack2026AuditoriumAssembly,
        caption:
          "Packed plenary auditorium at Sanskriti University during the Spark Hack 2026 ceremony with hackathon participants and faculty.",
        alt: "Auditorium assembly of participants and faculty at Sanskriti University during Spark Hack 2026",
        aspectRatio: "4:3",
        width: 1024,
        height: 768,
      },
      {
        id: "spark-hack-2026-06",
        url: sparkHack2026TeamStandingPortrait,
        caption:
          "Full Team Cookie_Byte standing portrait in front of the Sanskriti University Spark Hack 2026 backdrop banner.",
        alt: "Team Cookie_Byte standing with arms crossed in front of the Spark Hack 2026 banner",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "spark-hack-2026-07",
        url: sparkHack2026HackingLabSession,
        caption:
          "Active 24-hour coding sprint inside the Sanskriti University computing lab with teams collaborating around workstation tables.",
        alt: "Hackathon participants coding and collaborating inside the Sanskriti University computer laboratory",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "spark-hack-2026-08",
        url: sparkHack2026MainStageSetup,
        caption:
          "The Sanskriti University auditorium stage prepared for the Spark Hack 2026 presentation ceremonies and jury panel.",
        alt: "Auditorium stage with VIP panel seating and official Spark Hack 2026 backdrop at Sanskriti University",
        aspectRatio: "3:4",
        width: 770,
        height: 1024,
      },
    ],
    slots: [
      {
        label: "Spark Hack Portal (Cover)",
        aspectRatio: "3:4",
        captionPlaceholder: "Ceremonial Spark Hack gateway at Sanskriti University",
      },
      {
        label: "Campus & Event Arena",
        aspectRatio: "16:9",
        captionPlaceholder: "School of Engineering & IT decorated campus courtyard",
      },
      {
        label: "Team Cookie_Byte",
        aspectRatio: "16:9",
        captionPlaceholder: "Team Cookie_Byte assembled before official hackathon banner",
      },
    ],
  },
  {
    id: "iit-kanpur-research-internship-2026",
    eventNumber: "08",
    title: "AI/ML Summer Research Internship",
    date: "17 May 2026 – 18 July 2026",
    startDate: "2026-05-17",
    endDate: "2026-07-18",
    year: 2026,
    location: "IIT Kanpur",
    category: "Research & Artificial Intelligence",
    filterCategories: ["ALL", "RESEARCH", "AI & TECHNOLOGY"],
    quote:
      "“Research turns curiosity into questions, experiments into evidence, and ideas into deeper understanding.”",
    description:
      "A summer research experience in AI/ML involving technical learning, experimentation, model development, evaluation, and research-related work.",
    visualTreatment: "research-deep-dive",
    coverImage: iitkInternship2026Cover,
    photos: [
      {
        id: "iit-kanpur-research-internship-2026-01",
        url: iitkInternship2026Cover,
        caption:
          "Official completion announcement poster for the AI/ML Summer Research Internship at IIT Kanpur, Department of CSE, under the mentorship of Prof. Nitin Saxena.",
        alt: "Official Cover: AI/ML Summer Research Internship completion announcement at IIT Kanpur CSE",
        aspectRatio: "3:4",
        width: 819,
        height: 1024,
      },
      {
        id: "iit-kanpur-research-internship-2026-02",
        url: iitkInternship2026RajeevMotwaniBuilding,
        caption:
          "The Rajeev Motwani Building housing the Department of Computer Science & Engineering at IIT Kanpur.",
        alt: "Rajeev Motwani Building at IIT Kanpur, Department of Computer Science and Engineering",
        aspectRatio: "3:4",
        width: 765,
        height: 972,
      },
      {
        id: "iit-kanpur-research-internship-2026-03",
        url: iitkInternship2026LabResearchWorkstation,
        caption:
          "Research workstation inside the glass-walled CSE computing facility at Rajeev Motwani Building overlooking the campus trees.",
        alt: "Shiva at the research workstation in Rajeev Motwani Building at IIT Kanpur",
        aspectRatio: "9:16",
        width: 576,
        height: 1024,
      },
      {
        id: "iit-kanpur-research-internship-2026-04",
        url: iitkInternship2026DualLaptopExperimentation,
        caption:
          "Experimental AI/ML modeling desk with quantitative prediction dashboards, algorithmic notes, and dual workstations.",
        alt: "Dual MacBook research experimentation setup with machine learning dashboards and mathematical derivations",
        aspectRatio: "9:16",
        width: 576,
        height: 1024,
      },
      {
        id: "iit-kanpur-research-internship-2026-05",
        url: iitkInternship2026CampusLandmarkSculpture,
        caption:
          "Iconic academic building facade and modern geometric sculpture on the campus grounds of IIT Kanpur.",
        alt: "Architectural landmark and geometric sculpture on the IIT Kanpur campus",
        aspectRatio: "9:16",
        width: 566,
        height: 1024,
      },
      {
        id: "iit-kanpur-research-internship-2026-06",
        url: iitkInternship2026ResearchCollaboratorsSelfie,
        caption:
          "Research collaborators selfie at the CSE workstation desk with dual laptops displaying machine learning dashboards.",
        alt: "Shiva and research peer at the IIT Kanpur CSE lab desk with laptops",
        aspectRatio: "16:9",
        width: 1024,
        height: 576,
      },
      {
        id: "iit-kanpur-research-internship-2026-07",
        url: iitkInternship2026FocusedResearchSession,
        caption:
          "Deep analytical focus during a machine learning experimentation session at the Rajeev Motwani Building library workstation.",
        alt: "Shiva in deep concentration working on machine learning models at IIT Kanpur",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "iit-kanpur-research-internship-2026-08",
        url: iitkInternship2026FacultyMentorshipHandover,
        caption:
          "Formal reception of the Department of Computer Science & Engineering research document alongside faculty mentor at IIT Kanpur.",
        alt: "Shiva receiving official IIT Kanpur CSE research documentation from faculty mentor",
        aspectRatio: "3:4",
        width: 902,
        height: 1024,
      },
      {
        id: "iit-kanpur-research-internship-2026-09",
        url: iitkInternship2026ActiveCodingWorkstation,
        caption:
          "Active programming and model training session on the MacBook at the window-facing research workstation.",
        alt: "Shiva typing and developing models on MacBook at the IIT Kanpur research desk",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "iit-kanpur-research-internship-2026-10",
        url: iitkInternship2026CampusBrickMonument,
        caption:
          "The historic red-brick Indian Institute of Technology Kanpur entrance wall landmark adorned with potted greenery.",
        alt: "Historic red brick Indian Institute of Technology Kanpur entrance monument",
        aspectRatio: "4:3",
        width: 1024,
        height: 768,
      },
      {
        id: "iit-kanpur-research-internship-2026-11",
        url: iitkInternship2026NexestateEmblem,
        caption:
          "NexEstate AI-Powered Real Estate Valuation system identity emblem designed and engineered during the internship.",
        alt: "NexEstate AI-powered real estate valuation hexagonal system emblem with glowing neon architectural vectors",
        aspectRatio: "4:3",
        width: 956,
        height: 685,
      },
      {
        id: "iit-kanpur-research-internship-2026-12",
        url: iitkInternship2026CompletionAnnouncementDocument,
        caption:
          "Official summer research internship completion announcement commemorating work under Prof. Nitin Saxena at IIT Kanpur.",
        alt: "Summer research internship completion announcement document for IIT Kanpur Computer Science and Engineering",
        aspectRatio: "3:4",
        width: 819,
        height: 1024,
      },
      {
        id: "iit-kanpur-research-internship-2026-13",
        url: iitkInternship2026NexestateCafeWorkstation,
        caption:
          "Field evaluation and interface testing of the live NexEstate valuation portal deployed on the MacBook Air.",
        alt: "MacBook Air displaying live NexEstate valuation web application interface next to a coffee cup at Cafe Coffee Day",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "iit-kanpur-research-internship-2026-14",
        url: iitkInternship2026NexestateArchitectureShowcase,
        caption:
          "Comprehensive platform dashboard and investment intelligence showcase for the NexEstate valuation ecosystem.",
        alt: "NexEstate predictive valuation interface showcasing live macroeconomic telemetry and property analytics",
        aspectRatio: "16:9",
        width: 1024,
        height: 682,
      },
    ],
    slots: [
      {
        label: "Internship Milestone Poster (Cover)",
        aspectRatio: "16:9",
        captionPlaceholder: "AI/ML research completion announcement under Prof. Nitin Saxena",
      },
      {
        label: "Rajeev Motwani Building (CSE)",
        aspectRatio: "4:3",
        captionPlaceholder: "Department of Computer Science & Engineering facade",
      },
      {
        label: "Research Lab Workstation",
        aspectRatio: "4:3",
        captionPlaceholder: "Glass-walled computing facility in Rajeev Motwani Building",
      },
    ],
  },
  {
    id: "cognitive-chaos-2026",
    eventNumber: "09",
    title: "Cognitive Chaos 2026",
    date: "30 July 2026",
    startDate: "2026-07-30",
    year: 2026,
    location: "Microsoft Office, Noida",
    category: "Hackathons & AI Engineering",
    filterCategories: ["ALL", "HACKATHONS", "AI & TECHNOLOGY"],
    quote:
      "“The real reward of a hackathon is leaving with sharper thinking, stronger teamwork, and something meaningful to build on.”",
    description:
      "A fast-paced hackathon where Team SentinelQ developed and presented an AI-powered fraud intelligence concept involving suspicious transaction analysis, graph analytics, and explainable AI.",
    achievement:
      "Team SentinelQ shortlisted among Finalists · Presented before industry leaders · Awarded Certificate of Appreciation.",
    coverImage: cognitiveChaos2026Cover,
    photos: [
      {
        id: "cognitive-chaos-2026-01",
        url: cognitiveChaos2026Cover,
        caption:
          "Team SentinelQ presenting their AI fraud intelligence platform and transaction simulator before industry judges at Microsoft Office, Noida.",
        alt: "Official Cover: Team SentinelQ pitching their AI fraud intelligence platform to evaluators at Microsoft Office Noida",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "cognitive-chaos-2026-02",
        url: cognitiveChaos2026VisitorBadgeCredentials,
        caption:
          "Official Microsoft Sovereign visitor badge and Cognitive Chaos hackathon participant credentials.",
        alt: "Microsoft visitor credentials lanyard and Cognitive Chaos wristband",
        aspectRatio: "9:16",
        width: 576,
        height: 1024,
      },
      {
        id: "cognitive-chaos-2026-03",
        url: cognitiveChaos2026CampusMirrorPortrait,
        caption:
          "Shiva at Microsoft Office, Noida during a session break at the Cognitive Chaos hackathon.",
        alt: "Shiva in burgundy shirt during break at Microsoft Office Noida during Cognitive Chaos hackathon",
        aspectRatio: "3:4",
        width: 776,
        height: 1024,
      },
      {
        id: "cognitive-chaos-2026-04",
        url: cognitiveChaos2026AuditoriumAssembly,
        caption:
          "Auditorium hall at Microsoft Office, Noida packed with hackathon participants and builder teams.",
        alt: "Hackathon participant teams assembled in the Microsoft Office Noida main conference hall",
        aspectRatio: "4:3",
        width: 1024,
        height: 768,
      },
      {
        id: "cognitive-chaos-2026-05",
        url: cognitiveChaos2026EventBannerStandee,
        caption:
          "Official Cognitive Chaos banner standee highlighting hackathon partners and the theme 'Design the Chaos. Solve the Reality' at Microsoft Office Sovereign Noida.",
        alt: "Official Cognitive Chaos event rollup banner at Microsoft Office Sovereign Noida",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "cognitive-chaos-2026-06",
        url: cognitiveChaos2026HackathonSwagsLaptop,
        caption:
          "MacBook displaying the Cognitive Chaos 2026 portal alongside the official HackDriven and Convex sticker sheet and delegate tee.",
        alt: "Cognitive Chaos portal on MacBook with HackDriven and Convex sticker sheets and event merchandise",
        aspectRatio: "9:16",
        width: 576,
        height: 1024,
      },
      {
        id: "cognitive-chaos-2026-07",
        url: cognitiveChaos2026TeamAssembly,
        caption:
          "Team SentinelQ members gathered together with Microsoft visitor credentials and workstations inside the auditorium hall.",
        alt: "Team SentinelQ members standing together with laptops and Microsoft visitor credentials in the auditorium hall",
        aspectRatio: "4:3",
        width: 1024,
        height: 768,
      },
      {
        id: "cognitive-chaos-2026-08",
        url: cognitiveChaos2026HackdrivenStage,
        caption:
          "Main stage at Microsoft Office with dual projection displays showcasing HackDriven and the hackathon briefing.",
        alt: "HackDriven stage and dual projection screens during the Cognitive Chaos hackathon briefing at Microsoft Office",
        aspectRatio: "4:3",
        width: 1024,
        height: 768,
      },
    ],
    slots: [
      {
        label: "Jury Pitch Presentation (Cover)",
        aspectRatio: "3:4",
        captionPlaceholder: "Team SentinelQ presenting AI fraud detection engine to evaluators",
      },
      {
        label: "Microsoft Visitor Credentials",
        aspectRatio: "9:16",
        captionPlaceholder: "Official badge & finalist recognition",
      },
      {
        label: "Auditorium Assembly",
        aspectRatio: "4:3",
        captionPlaceholder: "Participants gathered in the main auditorium",
      },
    ],
  },
  {
    id: "ai-builder-workshop-2026",
    eventNumber: "10",
    title: "AI Builder Workshop",
    date: "2 August 2026",
    startDate: "2026-08-02",
    year: 2026,
    location: "Paytm Office, Noida",
    category: "AI & Developer Ecosystem",
    filterCategories: ["ALL", "AI & TECHNOLOGY", "WORKSHOPS & LEARNING"],
    quote:
      "“Building better AI begins with understanding not just what it can do, but how to build it responsibly.”",
    description:
      "A practical AI workshop exploring agent observability, AI security with Model Armor, and workflows using modern tools. Organized by HackBriven with community participation from Google Developer Group, Notion, and OpsTree Global.",
    coverImage: aiBuilderWorkshop2026Cover,
    photos: [
      {
        id: "ai-builder-workshop-2026-01",
        url: aiBuilderWorkshop2026Cover,
        caption:
          "Paytm Office Noida headquarters reception lobby featuring the iconic Paytm brand identity wall.",
        alt: "Official Cover: Paytm Office Noida reception lobby and entrance hall at the AI Builder Workshop",
        aspectRatio: "9:16",
        width: 576,
        height: 1024,
      },
      {
        id: "ai-builder-workshop-2026-02",
        url: aiBuilderWorkshop2026KeynoteHall,
        caption:
          "Opening keynote and technical briefing session presented by HackDriven in the Paytm training auditorium.",
        alt: "Participants seated in the workshop hall during the HackDriven technical keynote presentation at Paytm Office",
        aspectRatio: "4:3",
        width: 1024,
        height: 771,
      },
      {
        id: "ai-builder-workshop-2026-03",
        url: aiBuilderWorkshop2026InteractiveSpeakerSession,
        caption:
          "Interactive speaker presentation on AI agent workflows and responsible AI deployment against the skyline windows.",
        alt: "Speaker delivering talk on AI agent architectures with participants listening at Paytm Office Noida",
        aspectRatio: "3:4",
        width: 770,
        height: 1024,
      },
      {
        id: "ai-builder-workshop-2026-04",
        url: aiBuilderWorkshop2026ModelArmorEngineering,
        caption:
          "Live code walkthrough and security demonstration explaining agent observability and Model Armor frameworks.",
        alt: "Speaker demonstrating agent observability and AI security architecture on projection screen at Paytm Office",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "ai-builder-workshop-2026-05",
        url: aiBuilderWorkshop2026HandsOnAudienceHall,
        caption:
          "Comprehensive view of the developer cohort engaged in the hands-on AI Builder Workshop at Paytm Office Noida.",
        alt: "Speaker addressing packed room of developers and students at Paytm Office Noida during AI Builder Workshop",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "ai-builder-workshop-2026-06",
        url: aiBuilderWorkshop2026CohortGroupPortrait,
        caption:
          "Entire cohort of developers, mentors, and organizers assembled together for the collective group portrait at Paytm Office Noida.",
        alt: "Full cohort group portrait of participants and organizers at the AI Builder Workshop in Paytm Office Noida",
        aspectRatio: "4:3",
        width: 1024,
        height: 768,
      },
    ],
    slots: [
      {
        label: "Paytm Reception Lobby (Cover)",
        aspectRatio: "9:16",
        captionPlaceholder: "Paytm Office Noida headquarters reception lobby",
      },
      {
        label: "Keynote Technical Briefing",
        aspectRatio: "4:3",
        captionPlaceholder: "HackDriven keynote and workshop introduction",
      },
      {
        label: "Interactive Speaker Session",
        aspectRatio: "3:4",
        captionPlaceholder: "AI agent architectures & responsible AI talk",
      },
    ],
  },
  {
    id: "matlab-workshop-2026",
    eventNumber: "11",
    title: "Two-Day MATLAB Workshop 2026",
    date: "August 2026",
    dateLabel: "August 2026 · Exact dates pending verification",
    year: 2026,
    category: "Technical Learning",
    filterCategories: ["ALL", "WORKSHOPS & LEARNING"],
    quote: "“Knowledge becomes capability when theory meets hands-on experimentation.”",
    description:
      "A practical learning experience focused on MATLAB coding, computational concepts, and applying technical knowledge to engineering challenges.",
    coverImage: matlabWorkshop2026Cover,
    photos: [
      {
        id: "matlab-workshop-2026-01",
        url: matlabWorkshop2026Cover,
        caption:
          "Certificate of participation handover at the Two-Day MATLAB Workshop in front of the workshop display.",
        alt: "Official Cover: Shiva receiving certificate of participation at the Two-Day MATLAB Workshop",
        aspectRatio: "1:1",
        width: 1024,
        height: 905,
      },
      {
        id: "matlab-workshop-2026-02",
        url: matlabWorkshop2026AttendeeWorkstation,
        caption:
          "Attendee workstation in the tiered amphitheater hall featuring the live MATLAB Onramp curriculum, lecture notes, and official delegate badge.",
        alt: "Attendee workstation with laptop running MATLAB Onramp and delegate credential badge",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "matlab-workshop-2026-03",
        url: matlabWorkshop2026DelegateBadgeCredentials,
        caption:
          "Delegate credential badge and workshop lanyard worn during the two-day technical session.",
        alt: "Close-up of MATLAB Workshop 2026 attendee credential badge and blue lanyard",
        aspectRatio: "9:16",
        width: 576,
        height: 1024,
      },
      {
        id: "matlab-workshop-2026-04",
        url: matlabWorkshop2026DataImportLecture,
        caption:
          "Technical lecture and practical demonstration on MATLAB Data Import methodologies across spreadsheets, imagery, and scientific datasets.",
        alt: "Instructor presenting MATLAB Data Import methods on display screen during workshop lecture",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "matlab-workshop-2026-05",
        url: matlabWorkshop2026DualLaptopLab,
        caption:
          "Hands-on collaborative computing desk with dual MacBooks running interactive MATLAB matrix manipulation modules.",
        alt: "Dual laptop workspace running MATLAB Onramp coding exercises with delegate badges and notebooks",
        aspectRatio: "16:9",
        width: 1024,
        height: 576,
      },
      {
        id: "matlab-workshop-2026-06",
        url: matlabWorkshop2026CollaboratorsAuditoriumSelfie,
        caption:
          "Workshop attendees selfie seated together in the amphitheater lecture hall during a session break.",
        alt: "Shiva and peer wearing blue MATLAB workshop lanyards in the auditorium seating",
        aspectRatio: "16:9",
        width: 1024,
        height: 576,
      },
    ],
    slots: [
      {
        label: "Certificate Handover (Cover)",
        aspectRatio: "1:1",
        captionPlaceholder: "Certificate reception at the workshop stage",
      },
      {
        label: "Attendee Workstation",
        aspectRatio: "3:4",
        captionPlaceholder: "Live MATLAB Onramp module & delegate badge",
      },
      {
        label: "Data Import Lecture",
        aspectRatio: "3:4",
        captionPlaceholder: "Instructor presenting MATLAB data import methods",
      },
    ],
  },
  {
    id: "ai-career-guidance-seminar-2026",
    eventNumber: "12",
    title: "Artificial Intelligence and Career Guidance",
    date: "14 September 2026",
    startDate: "2026-09-14",
    year: 2026,
    location: "UIET, CSJMU, Kanpur",
    category: "Leadership & Community",
    filterCategories: ["ALL", "AI & TECHNOLOGY", "LEADERSHIP & COMMUNITY"],
    quote:
      "“Leadership is not just about sharing knowledge; it is about creating opportunities for others to discover what they can become.”",
    achievement:
      "Organized, hosted, and anchored the seminar as Placement Coordinator · Featured keynote speaker Rajeev Chandran (CTO & Principal Advisor | AI Researcher | Harvard & MIT Alumni)",
    description:
      "Organized, hosted, and anchored the Artificial Intelligence and Career Guidance seminar at UIET, CSJMU as Placement Coordinator. The seminar featured an inspiring keynote address by invited speaker Rajeev Chandran (CTO & Principal Advisor, AI Researcher, Harvard & MIT Alumni), exploring emerging artificial intelligence paradigms, engineering best practices, and career paths for aspiring technologists.",
    coverImage: seminar2026Cover,
    photos: [
      {
        id: "ai-career-guidance-seminar-2026-01",
        url: seminar2026Cover,
        caption:
          "Hosting and anchoring the seminar from the smart podium at UIET CSJMU, introducing the AI curriculum and session agenda on screen.",
        alt: "Official Cover: Shiva hosting and anchoring the Artificial Intelligence and Career Guidance seminar at UIET CSJMU",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "ai-career-guidance-seminar-2026-02",
        url: seminar2026CertificateOfAppreciation,
        caption:
          "Receiving the official Certificate of Appreciation as Placement Coordinator for leading the organization, anchoring, and coordination of the seminar.",
        alt: "Shiva receiving Certificate of Appreciation as Placement Coordinator for organizing and hosting the seminar",
        aspectRatio: "3:4",
        width: 774,
        height: 1024,
      },
      {
        id: "ai-career-guidance-seminar-2026-03",
        url: seminar2026PodiumPresentationSide,
        caption:
          "Side perspective from the stage podium guiding the audience through the seminar themes and career roadmap in artificial intelligence.",
        alt: "Side view of Shiva at the digital podium anchoring the AI career guidance session",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "ai-career-guidance-seminar-2026-04",
        url: seminar2026SpeakerKeynoteStage,
        caption:
          "Keynote presentation by invited speaker Rajeev Chandran (CTO & Principal Advisor, AI Researcher, Harvard & MIT Alumni) connecting virtually to address the student cohort.",
        alt: "Invited speaker Rajeev Chandran delivering keynote address on the large auditorium projection screen",
        aspectRatio: "4:3",
        width: 1024,
        height: 768,
      },
      {
        id: "ai-career-guidance-seminar-2026-05",
        url: seminar2026AuditoriumAudienceOverview,
        caption:
          "Tiered auditorium audience overview of engineering students and faculty engaged during the AI career insights keynote.",
        alt: "Wide auditorium view showing student audience gathered for the AI career guidance seminar",
        aspectRatio: "4:3",
        width: 1024,
        height: 768,
      },
      {
        id: "ai-career-guidance-seminar-2026-06",
        url: seminar2026GenerativeAiPresentation,
        caption:
          "Student anchoring and placement coordinators facilitating the technical Generative AI and career trajectory discussion from the smart podium.",
        alt: "Placement coordinators at the podium during the Generative AI presentation segment",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "ai-career-guidance-seminar-2026-07",
        url: seminar2026PodiumAudienceView,
        caption:
          "Stage control perspective behind dual laptops looking out across the packed auditorium during the interactive Q&A session.",
        alt: "Perspective from behind the podium laptops looking out towards the seated seminar audience",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "ai-career-guidance-seminar-2026-08",
        url: seminar2026OrganizingTeamPoster,
        caption:
          "The student placement organizing committee assembled on stage in front of the seminar banner.",
        alt: "Placement coordination committee standing together on stage in front of the seminar banner",
        aspectRatio: "3:4",
        width: 768,
        height: 1024,
      },
      {
        id: "ai-career-guidance-seminar-2026-09",
        url: seminar2026CohortGroupPortrait,
        caption:
          "Full commemorative group photograph of attending students, student placement organizers, and keynote speaker Rajeev Chandran on screen concluding the seminar.",
        alt: "Group photo of engineering students, coordinators, and keynote speaker on projection screen at UIET CSJMU",
        aspectRatio: "4:3",
        width: 1024,
        height: 768,
      },
    ],
    slots: [
      {
        label: "Podium Hosting & Anchoring (Cover)",
        aspectRatio: "3:4",
        captionPlaceholder: "Introducing the AI seminar from the smart podium",
      },
      {
        label: "Certificate of Appreciation",
        aspectRatio: "3:4",
        captionPlaceholder: "Receiving appreciation as Placement Coordinator",
      },
      {
        label: "Keynote Speaker Projection",
        aspectRatio: "4:3",
        captionPlaceholder: "Rajeev Chandran keynote address on stage screen",
      },
    ],
  },
];

/**
 * Computes dynamic statistics from the archive
 */
export function getGalleryStats() {
  const totalEvents = galleryChronicleArchive.length;
  const uniqueYears = Array.from(new Set(galleryChronicleArchive.map((e) => e.year))).sort();
  const totalPhotosUploaded = galleryChronicleArchive.reduce((acc, curr) => {
    const urls = new Set<string>();
    if (curr.coverImage && curr.coverImage.trim() !== "") {
      urls.add(curr.coverImage);
    }
    if (curr.photos && curr.photos.length > 0) {
      curr.photos.forEach((p) => {
        if (p.url && p.url.trim() !== "") urls.add(p.url);
      });
    }
    return acc + urls.size;
  }, 0);

  return {
    totalEvents,
    yearsSpan: `${uniqueYears[0]}—${uniqueYears[uniqueYears.length - 1]}`,
    totalYears: uniqueYears.length,
    totalPhotosUploaded,
    hasPhotos: totalPhotosUploaded > 0,
    statusText:
      totalPhotosUploaded > 0
        ? `${totalPhotosUploaded} ARCHIVED PHOTOGRAPHS`
        : `${totalEvents} JOURNEYS · PHOTOGRAPHS COMING SOON`,
  };
}
