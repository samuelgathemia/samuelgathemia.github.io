import { Link } from "react-router-dom";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "../data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-surface card-hover flex flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-secondary">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="relative flex h-full items-center justify-center p-6">
          <div className="mono max-w-full text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              // architecture
            </p>
            <p className="mt-1 truncate text-sm text-primary">{project.slug}.arch</p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mono text-base text-foreground">{project.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((s) => (
            <li
              key={s}
              className="mono rounded border border-border bg-background/60 px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center gap-2">
          <Link
            to={`/projects/${project.slug}`}
            className="mono inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs transition-colors hover:border-primary hover:text-primary"
          >
            Read more <ArrowUpRight className="size-3.5" />
          </Link>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="mono inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs transition-colors hover:border-primary hover:text-primary"
            >
              <Github className="size-3.5" /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="mono inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs transition-colors hover:border-primary hover:text-primary"
            >
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
