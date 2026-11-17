import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { useDocumentHead } from "../hooks/useDocumentHead";

export default function NotFound() {
  useDocumentHead({
    title: "404 — Samuel Gathemia",
    description: "The page you're looking for doesn't exist.",
  });
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="mono text-xs uppercase tracking-widest text-primary">// 0x404</p>
      <h1 className="mono mt-3 text-6xl font-bold text-foreground">404</h1>
      <p className="mono mt-4 text-sm text-muted-foreground">
        <span className="text-primary">$</span> cat page &gt; /dev/null
      </p>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Nothing at that address. The route may have moved or never existed.
      </p>
      <Link
        to="/"
        className="mono mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
      >
        <Home className="size-4" /> Back home
      </Link>
    </section>
  );
}
