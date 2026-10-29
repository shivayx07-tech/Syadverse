import { createFileRoute, Link } from "@tanstack/react-router";
import { getProjectById } from "@/data/projectsArchive";
import { ProjectDetailPage } from "@/components/syad/projects/ProjectDetailPage";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/projects/$projectId")({
  head: ({ params }) => {
    const project = getProjectById(params.projectId);
    const title = project
      ? `${project.title} — ${project.subtitle} | Syadverse Innovation Lab`
      : "Project Showcase | Syadverse Innovation Lab";
    const desc =
      project?.description ||
      "Syadverse Innovation Lab — Engineering intelligent systems, verified architectures, and digital experiences by Shiva Yadav.";

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
  component: ProjectRouteComponent,
});

function ProjectRouteComponent() {
  const { projectId } = Route.useParams();
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
        <div className="rounded-2xl border border-border/40 bg-surface/60 p-8 max-w-md shadow-2xl backdrop-blur-md">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            LAB ARCHIVE ANOMALY
          </p>
          <h1 className="mt-3 font-display text-2xl font-bold">Project Record Not Found</h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            The requested project identifier{" "}
            <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-foreground">
              {projectId}
            </code>{" "}
            does not exist in the Syadverse Innovation Lab.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              hash="projects"
              className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/15 px-4 py-2 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent/25 hover:text-foreground"
            >
              <ArrowLeft size={14} /> RETURN TO INNOVATION LAB
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <ProjectDetailPage project={project} />;
}
