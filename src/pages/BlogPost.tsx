import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPost } from "../data/blog";
import { useDocumentHead } from "../hooks/useDocumentHead";

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = getPost(slug);

  useDocumentHead({
    title: post ? `${post.title} — Samuel Gathemia` : "Article — Samuel Gathemia",
    description: post?.preview,
  });

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="mono text-sm text-muted-foreground">Article not found.</p>
        <Link
          to="/blog"
          className="mono mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article>
      <header className="border-b border-border">
        <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
          <Link
            to="/blog"
            className="mono inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-3.5" /> blog
          </Link>
          <div className="mono mt-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <time dateTime={post.date}>{post.date}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded border border-border px-1.5 py-0.5 text-[10px] text-primary"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">{post.preview}</p>
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-14 sm:px-6">
        {post.body.map((para, i) => (
          <p
            key={i}
            className="text-[15px] leading-relaxed text-muted-foreground sm:text-base"
          >
            {para}
          </p>
        ))}
      </div>
    </article>
  );
}
