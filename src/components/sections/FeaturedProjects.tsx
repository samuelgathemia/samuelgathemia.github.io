import { Link } from "react-router-dom";
import SectionHeading from "../SectionHeading";
import ProjectCard from "../ProjectCard";
import { featuredProjects } from "../../data/projects";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            label="featured"
            title="Selected projects"
            description="A slice of firmware components and end-to-end embedded systems I've built."
          />
          <Link
            to="/projects"
            className="mono hidden shrink-0 text-xs text-primary hover:underline sm:inline-flex"
          >
            All projects →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
