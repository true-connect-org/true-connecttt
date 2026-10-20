import { useEffect } from "react";
import { SITE_URL } from "@/content/site";

interface SeoOptions {
  title: string;
  description: string;
  /** Path starting with "/", used for the canonical and og:url. */
  path: string;
  noindex?: boolean;
  image?: string;
  type?: "website" | "article";
  /** One or more schema.org objects, serialised as JSON-LD. */
  jsonLd?: object | object[];
}

const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Sets title, description, canonical, Open Graph, Twitter and JSON-LD for the current page. */
export function useSeo({ title, description, path, noindex, image, type = "website", jsonLd }: SeoOptions) {
  const jsonKey = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const url = `${SITE_URL}${path === "/" ? "" : path}`;
    const img = image ?? DEFAULT_IMAGE;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    setLink("canonical", url || SITE_URL);

    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", "True Connect");
    setMeta("property", "og:locale", "en_IN");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url || SITE_URL);
    setMeta("property", "og:image", img);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", img);

    // Replace any JSON-LD left by the previous page
    document.head.querySelectorAll('script[data-tc-jsonld]').forEach((n) => n.remove());
    if (jsonKey) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach((item) => {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.setAttribute("data-tc-jsonld", "true");
        s.text = JSON.stringify(item);
        document.head.appendChild(s);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, noindex, image, type, jsonKey]);
}
