import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import { projects } from "../data/projects";
import { useDocumentHead } from "../hooks/useDocumentHead";

export default function Projects() {
  useDocumentHead({
    title: "Projects — Samuel Gathemia",
    description:
      "Firmware components, embedded systems, and IoT projects built by Samuel Gathemia.",
  });
  return (
    <section>
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          label="/projects"
          title="All projects"
          description="Every project in the portfolio, from firmware components to full embedded systems."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
