import { Link } from "react-router-dom";
import SectionHeading from "../SectionHeading";
import { posts } from "../../data/blog";

export default function BlogPreview() {
  return (
    <section id="blog" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            label="writing"
            title="Technical blog"
            description="Notes on firmware architecture, real-time systems, and connected devices."
          />
          <Link
            to="/blog"
            className="mono hidden shrink-0 text-xs text-primary hover:underline sm:inline-flex"
          >
            All articles →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {posts.slice(0, 4).map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="card-surface card-hover block p-5"
            >
              <div className="mono flex items-center gap-2 text-xs text-muted-foreground">
                <time dateTime={post.date}>{post.date}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className="mono mt-2 text-base text-foreground">{post.title}</h3>
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
