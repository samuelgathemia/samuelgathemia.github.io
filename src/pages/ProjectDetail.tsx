import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { getProject } from "../data/projects";
import { useDocumentHead } from "../hooks/useDocumentHead";

export default function ProjectDetail() {
  const { slug = "" } = useParams();
  const project = getProject(slug);

  useDocumentHead({
    title: project ? `${project.title} — Samuel Gathemia` : "Project — Samuel Gathemia",
    description: project?.tagline,
  });

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="mono text-sm text-muted-foreground">Project not found.</p>
        <Link
          to="/projects"
          className="mono mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to projects
        </Link>
      </div>
    );
  }

  return (
    <article>
      <header className="border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
          <Link
            to="/projects"
            className="mono inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-3.5" /> projects
          </Link>
          <p className="mono mt-6 text-xs uppercase tracking-widest text-primary">
            // {project.slug}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">{project.tagline}</p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li
                key={s}
                className="mono rounded border border-border bg-card px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="mono inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs transition-colors hover:border-primary hover:text-primary"
              >
                <Github className="size-4" /> GitHub Repository
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="mono inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs transition-colors hover:border-primary hover:text-primary"
              >
                <ExternalLink className="size-4" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl space-y-12 px-4 py-14 sm:px-6">
        <Section title="Overview" body={project.description} />
        <Section title="Problem Statement" body={project.problem} />

        <Block title="Objectives">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {project.objectives.map((o) => (
              <li key={o} className="flex gap-2">
                <span className="mono mt-1 text-primary">→</span>
                {o}
              </li>
            ))}
          </ul>
        </Block>

        <Section title="Architecture" body={project.architecture} />

        <Block title="Architecture Diagram">
          <div className="card-surface relative aspect-[16/9] overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-60" />
            <div className="relative flex h-full items-center justify-center">
              <p className="mono text-sm text-muted-foreground">
                <span className="text-primary">//</span> diagram placeholder — swap for a real image
              </p>
            </div>
          </div>
        </Block>

        <div className="grid gap-6 md:grid-cols-2">
          <Block title="Hardware Used">
            <ul className="mono space-y-1 text-sm text-muted-foreground">
              {project.hardware.map((h) => (
                <li key={h}>
                  <span className="text-primary">$</span> {h}
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Software Stack">
            <ul className="mono space-y-1 text-sm text-muted-foreground">
              {project.software.map((s) => (
                <li key={s}>
                  <span className="text-primary">$</span> {s}
                </li>
              ))}
            </ul>
          </Block>
        </div>

        <Block title="Directory Structure">
          <pre className="mono overflow-x-auto rounded-md border border-border bg-background/60 p-4 text-xs leading-relaxed text-muted-foreground">
{project.directoryTree}
          </pre>
        </Block>

        <Block title="Code Highlight">
          {project.codeSnippet.caption && (
            <p className="mono mb-2 text-xs text-muted-foreground">
              // {project.codeSnippet.caption}
            </p>
          )}
          <pre className="mono overflow-x-auto rounded-md border border-border bg-background/60 p-4 text-xs leading-relaxed text-foreground">
<code>{project.codeSnippet.code}</code>
          </pre>
        </Block>

        <Block title="Images">
          <div className="grid gap-3 sm:grid-cols-2">
            {[0, 1].map((i) => (
              <div key={i} className="card-surface relative aspect-[4/3]">
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div className="relative flex h-full items-center justify-center">
                  <p className="mono text-xs text-muted-foreground">image placeholder</p>
                </div>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Lessons Learned">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {project.lessons.map((l) => (
              <li key={l} className="flex gap-2">
                <span className="mono mt-1 text-accent">✓</span>
                {l}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Future Improvements">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {project.future.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="mono mt-1 text-primary">+</span>
                {f}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Documentation">
          <p className="text-sm text-muted-foreground">
            Full documentation lives with the source. See the{" "}
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="text-primary hover:underline"
              >
                GitHub repository
              </a>
            ) : (
              <span>GitHub repository</span>
            )}{" "}
            for build instructions, hardware setup, and API reference.
          </p>
        </Block>
      </div>
    </article>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="mono text-lg text-primary">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{body}</p>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mono text-lg text-primary">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
