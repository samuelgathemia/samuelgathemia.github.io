import SectionHeading from "../SectionHeading";
import { timeline } from "../../data/experience";

export default function Timeline() {
  return (
    <section id="experience" className="border-b border-border bg-card/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          label="timeline"
          title="Experience & education"
          description="Milestones so far. Placeholders in the data file — swap freely."
        />
        <ol className="relative ml-3 space-y-6 border-l border-border pl-6">
          {timeline.map((item) => (
            <li key={item.title} className="relative">
              <span
                aria-hidden
                className="absolute -left-[27px] top-1.5 flex size-3 items-center justify-center"
              >
                <span className="size-3 rounded-full border border-primary bg-background" />
                <span className="absolute size-1.5 rounded-full bg-primary" />
              </span>
              <div className="card-surface p-5">
                <div className="mono flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-primary">{item.year}</span>
                  <span className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    {item.kind}
                  </span>
                </div>
                <h3 className="mono mt-2 text-sm text-foreground">
                  {item.title} <span className="text-muted-foreground">— {item.org}</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
