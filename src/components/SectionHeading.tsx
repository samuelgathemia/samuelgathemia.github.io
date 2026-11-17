interface Props {
  label: string;
  title: string;
  description?: string;
  id?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ label, title, description, id, align = "left" }: Props) {
  return (
    <div
      className={`mb-10 ${align === "center" ? "text-center" : ""}`}
      id={id}
    >
      <p className="mono text-xs uppercase tracking-widest text-primary">
        <span className="text-muted-foreground">//</span> {label}
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
