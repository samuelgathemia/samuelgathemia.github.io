import SectionHeading from "../SectionHeading";
import { skills, proficiency } from "../../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="border-b border-border bg-card/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          label="stack"
          title="Skills & tooling"
          description="The tools I reach for when designing, building, and shipping firmware."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category} className="card-surface p-5">
              <h3 className="mono text-xs uppercase tracking-widest text-primary">
                {group.category}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="mono rounded-md border border-border bg-background/60 px-2 py-1 text-xs text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {proficiency.map((p) => (
            <div key={p.name}>
              <div className="mono mb-1.5 flex items-center justify-between text-xs">
                <span className="text-foreground">{p.name}</span>
                <span className="text-muted-foreground">{p.level}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-700 ease-out"
                  style={{ width: `${p.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
