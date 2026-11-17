import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { profile } from "../../data/profile";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact — ${name || "hello"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          label="contact"
          title="Get in touch"
          description="Firmware role, IoT project, or a specific embedded problem — happy to talk."
        />

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            {[
              { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { Icon: Github, label: "GitHub", value: `@${profile.githubUser}`, href: profile.github },
              { Icon: Linkedin, label: "LinkedIn", value: "samuel-gathemia", href: profile.linkedin },
              { Icon: MapPin, label: "Location", value: profile.location },
            ].map(({ Icon, label, value, href }) => {
              const content = (
                <div className="card-surface card-hover flex items-center gap-3 p-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md border border-border bg-background">
                    <Icon className="size-4 text-primary" />
                  </span>
                  <div className="min-w-0">
                    <p className="mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {label}
                    </p>
                    <p className="mono truncate text-sm text-foreground">{value}</p>
                  </div>
                </div>
              );
              return href ? (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer noopener">
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              );
            })}
          </div>

          <form onSubmit={onSubmit} className="card-surface flex flex-col gap-4 p-5">
            <label className="mono text-xs text-muted-foreground">
              name
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mono mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              />
            </label>
            <label className="mono text-xs text-muted-foreground">
              email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mono mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              />
            </label>
            <label className="mono text-xs text-muted-foreground">
              message
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mono mt-1 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              className="mono inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <Send className="size-4" /> Send message
            </button>
            <p className="mono text-[11px] text-muted-foreground">
              Opens your mail client — no backend, no tracking.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
