import { Download, ExternalLink } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { profile } from "../data/profile";
import { useDocumentHead } from "../hooks/useDocumentHead";

export default function Resume() {
  useDocumentHead({
    title: "Resume — Samuel Gathemia",
    description: "Download the résumé of Samuel Gathemia, Embedded Systems Engineer.",
  });
  const url = import.meta.env.BASE_URL + "resume.pdf";
  return (
    <section>
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          label="/resume"
          title="Résumé"
          description="One-page PDF summarising experience, projects, and skills."
        />
        <div className="flex flex-wrap gap-3">
          <a
            href={url}
            download
            className="mono inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <Download className="size-4" /> Download PDF
          </a>
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="mono inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            <ExternalLink className="size-4" /> Open in new tab
          </a>
          <a
            href={`mailto:${profile.email}?subject=Requesting%20a%20current%20résumé`}
            className="mono inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            Request latest
          </a>
        </div>
        <div className="card-surface mt-8 overflow-hidden">
          <object
            data={url}
            type="application/pdf"
            className="h-[80vh] w-full bg-background"
            aria-label="Résumé preview"
          >
            <div className="p-8 text-center">
              <p className="mono text-sm text-muted-foreground">
                PDF preview unavailable in this browser.
              </p>
              <a
                href={url}
                className="mono mt-2 inline-flex text-sm text-primary hover:underline"
              >
                Download the résumé instead →
              </a>
            </div>
          </object>
        </div>
      </div>
    </section>
  );
}
