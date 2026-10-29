import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Starfield } from "@/components/syad/Starfield";
import { Intro } from "@/components/syad/Intro";
import { Nav } from "@/components/syad/Nav";
import { Hero } from "@/components/syad/Hero";
import {
  About,
  Experience,
  Skills,
  Projects,
  Gallery,
  Certificates,
} from "@/components/syad/Sections";
import { Contact, Footer } from "@/components/syad/Contact";

const title = "Shiva Yadav — AI/ML Engineer & Full-Stack Developer | Syadverse";
const desc =
  "Syadverse — the portfolio of Shiva Yadav: AI/ML engineering, full-stack projects, research at IIT Kanpur, leadership and credentials.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      {
        name: "keywords",
        content:
          "Shiva Yadav, Syadverse, AI Engineer, Machine Learning, Full-Stack Developer, IIT Kanpur Research, UIET CSJMU, Python, React",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-preview.jpg" },
      { property: "og:image:alt", content: "Syadverse — Shiva Yadav Portfolio" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: "/og-preview.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  const [entered, setEntered] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.location.search.includes("enter") ||
      window.location.search.includes("skip") ||
      window.location.hash.length > 1 ||
      sessionStorage.getItem("syadverse_entered") === "true"
    );
  });

  useEffect(() => {
    if (
      window.location.search.includes("enter") ||
      window.location.search.includes("skip") ||
      window.location.hash.length > 1 ||
      sessionStorage.getItem("syadverse_entered") === "true"
    ) {
      setEntered(true);
    }
  }, []);

  useEffect(() => {
    if (entered && typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, [entered]);

  const handleEnter = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("syadverse_entered", "true");
      document.body.style.overflow = "";
    }
    setEntered(true);
  };

  return (
    <>
      <Starfield />
      {!entered && <Intro onEnter={handleEnter} />}
      <div
        inert={!entered}
        className={`transition-opacity duration-1000 ${entered ? "opacity-100" : "opacity-0"}`}
      >
        <Nav />
        <main>
          <Hero key={String(entered)} />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certificates />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
