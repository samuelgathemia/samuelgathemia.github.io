import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Github, FileText, Mail } from "lucide-react";
import { profile } from "../../data/profile";
import PCBBackground from "../PCBBackground";

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTitleIdx((i) => (i + 1) % profile.titles.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-border">
      <PCBBackground />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mono inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground animate-fade-up">
          <span className="size-1.5 rounded-full bg-accent" />
          Available for firmware &amp; embedded engineering work
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "60ms" }}>
          <p className="mono text-sm text-muted-foreground">
            <span className="text-primary">$</span> whoami
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {profile.honorific} <span className="text-gradient">{profile.name}</span>
          </h1>
          <p
            key={titleIdx}
            className="mono mt-4 text-lg text-primary sm:text-xl animate-fade-up"
          >
            {profile.titles[titleIdx]}
            <span className="terminal-cursor" aria-hidden />
          </p>
        </div>

        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg animate-fade-up" style={{ animationDelay: "120ms" }}>
          {profile.statement}
        </p>

        <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "180ms" }}>
          <Link
            to="/projects"
            className="mono inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            View Projects <ArrowRight className="size-4" />
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="mono inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            <Github className="size-4" /> GitHub
          </a>
          <Link
            to="/resume"
            className="mono inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            <FileText className="size-4" /> Resume
          </Link>
          <a
            href="#contact"
            className="mono inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            <Mail className="size-4" /> Contact
          </a>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3 animate-fade-up" style={{ animationDelay: "240ms" }}>
          {[
            { k: "target", v: "ESP32 · STM32" },
            { k: "rtos", v: "FreeRTOS · ESP-IDF" },
            { k: "focus", v: "Firmware · IoT · Architecture" },
          ].map((s) => (
            <div key={s.k} className="card-surface mono px-4 py-3 text-xs">
              <span className="text-muted-foreground">{s.k}</span>
              <span className="ml-2 text-foreground">= {s.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
