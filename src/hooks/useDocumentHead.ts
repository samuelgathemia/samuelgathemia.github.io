import { useEffect } from "react";

interface HeadOpts {
  title: string;
  description?: string;
  path?: string;
}

export function useDocumentHead({ title, description }: HeadOpts) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    let metaEl: HTMLMetaElement | null = null;
    if (description) {
      metaEl = document.querySelector('meta[name="description"]');
      const prev = metaEl?.getAttribute("content") ?? "";
      if (metaEl) metaEl.setAttribute("content", description);
      return () => {
        document.title = prevTitle;
        if (metaEl) metaEl.setAttribute("content", prev);
      };
    }
    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);
}
