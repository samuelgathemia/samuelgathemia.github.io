import SectionHeading from "../SectionHeading";
import { principles } from "../../data/philosophy";

export default function Philosophy() {
  return (
    <section id="philosophy" className="border-b border-border bg-card/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          label="principles"
          title="Engineering philosophy"
          description="How I think about firmware — the ideas that guide architectural decisions before a single line of C is written."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p.title} className="card-surface card-hover p-5">
              <div className="mono flex items-baseline gap-3">
                <span className="text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm text-primary">{p.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
