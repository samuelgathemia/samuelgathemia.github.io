import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { posts } from "../data/blog";
import { useDocumentHead } from "../hooks/useDocumentHead";

export default function Blog() {
  useDocumentHead({
    title: "Blog — Samuel Gathemia",
    description: "Notes on firmware, RTOS, and embedded systems architecture.",
  });
  return (
    <section>
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          label="/blog"
          title="Technical writing"
          description="Notes on firmware architecture, real-time systems, and connected devices."
        />
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="card-surface card-hover block p-6"
            >
              <div className="mono flex items-center gap-2 text-xs text-muted-foreground">
                <time dateTime={post.date}>{post.date}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mono mt-2 text-lg text-foreground">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.preview}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <li
                    key={t}
                    className="mono rounded border border-border px-1.5 py-0.5 text-[10px] text-primary"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
