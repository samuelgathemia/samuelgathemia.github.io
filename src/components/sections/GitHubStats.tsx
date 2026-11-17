import { useEffect, useState } from "react";
import { Github, GitFork, Star } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { profile } from "../../data/profile";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
}

export default function GitHubStats() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(
      `https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=12`,
    )
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then((data: Repo[]) => {
        if (cancelled) return;
        setRepos(
          data
            .filter((d) => !d.fork && !d.archived)
            .slice(0, 6),
        );
      })
      .catch((e) => !cancelled && setError(String(e)));
    return () => {
      cancelled = true;
    };
  }, []);

  const statCards = [
    `https://github-readme-stats.vercel.app/api?username=${profile.githubUser}&show_icons=true&theme=github_dark&hide_border=true&bg_color=161B22&title_color=22D3EE&icon_color=10B981&text_color=E6EDF3`,
    `https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.githubUser}&layout=compact&theme=github_dark&hide_border=true&bg_color=161B22&title_color=22D3EE&text_color=E6EDF3`,
  ];

  return (
    <section id="github" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          label="github"
          title="Open source activity"
          description="Latest public repositories pulled live from the GitHub API."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {statCards.map((src) => (
            <div key={src} className="card-surface overflow-hidden p-2">
              <img
                src={src}
                alt="GitHub statistics"
                loading="lazy"
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="mono text-xs uppercase tracking-widest text-muted-foreground">
            // recent repositories
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {!repos && !error &&
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card-surface h-28 animate-pulse p-5" />
              ))}
            {error && (
              <p className="mono col-span-full text-sm text-muted-foreground">
                Couldn&apos;t reach GitHub API right now — try again shortly.
              </p>
            )}
            {repos?.map((r) => (
              <a
                key={r.id}
                href={r.html_url}
                target="_blank"
                rel="noreferrer noopener"
                className="card-surface card-hover block p-5"
              >
                <div className="mono flex items-center gap-2 text-sm text-primary">
                  <Github className="size-4" />
                  {r.name}
                </div>
                <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-xs text-muted-foreground">
                  {r.description ?? "No description."}
                </p>
                <div className="mono mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                  {r.language && (
                    <span className="inline-flex items-center gap-1">
                      <span className="size-2 rounded-full bg-accent" />
                      {r.language}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-3" /> {r.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="size-3" /> {r.forks_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
