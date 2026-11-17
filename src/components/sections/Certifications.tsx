import { Award, ExternalLink } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { certifications } from "../../data/certifications";

export default function Certifications() {
  return (
    <section id="certifications" className="border-b border-border bg-card/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          label="credentials"
          title="Certifications"
          description="Recognised training in embedded systems, RTOS, and communication."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c) => (
            <div key={c.title} className="card-surface card-hover p-5">
              <Award className="size-5 text-primary" />
              <h3 className="mono mt-3 text-sm text-foreground">{c.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.issuer}</p>
              <p className="mono mt-2 text-[11px] text-muted-foreground">{c.date}</p>
              {c.verifyUrl && (
                <a
                  href={c.verifyUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mono mt-3 inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                >
                  Verify <ExternalLink className="size-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
