import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/experience/")({
  loader: () => {
    throw redirect({
      to: "/",
      hash: "experience",
    });
  },
  component: () => null,
});
