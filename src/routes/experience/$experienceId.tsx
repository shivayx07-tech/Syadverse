import { createFileRoute, Link } from "@tanstack/react-router";
import { getExperienceBySlug } from "@/data/experienceArchive";
import { ExperienceDetailPage } from "@/components/syad/experience/ExperienceDetailPage";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/experience/$experienceId")({
  head: ({ params }) => {
    const mission = getExperienceBySlug(params.experienceId);
    const title = mission
      ? `${mission.title} — ${mission.organization} | Syadverse`
      : "Experience Mission | Syadverse";
    const desc =
      mission?.metaDescription ||
      "Syadverse Experience Archive — professional journey and verified technical milestones of Shiva Yadav.";

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ExperienceRouteComponent,
});

function ExperienceRouteComponent() {
  const { experienceId } = Route.useParams();
  const mission = getExperienceBySlug(experienceId);

  if (!mission) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
        <div className="rounded-2xl border border-border/40 bg-surface/60 p-8 max-w-md">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            ARCHIVAL ANOMALY
          </p>
          <h1 className="mt-3 font-display text-2xl font-bold">Mission Record Not Found</h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            The requested experience mission identifier{" "}
            <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-foreground">
              {experienceId}
            </code>{" "}
            does not exist in the Syadverse archive.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              hash="experience"
              className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/15 px-4 py-2 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent/25 hover:text-foreground"
            >
              <ArrowLeft size={14} /> RETURN TO MISSION LOG
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <ExperienceDetailPage mission={mission} />;
}
