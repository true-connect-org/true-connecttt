/* eslint-disable react-refresh/only-export-components */
import { lazy, type ComponentType } from "react";

/**
 * Lazy page that can also be loaded up front. When its code is already loaded, it renders directly
 * (no loading placeholder), so a pre-rendered page doesn't jump while the app starts.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lazyPage<P extends Record<string, any> = Record<string, never>>(loader: () => Promise<{ default: ComponentType<P> }>) {
  let Loaded: ComponentType<P> | null = null;
  const load = () => loader().then((m) => ((Loaded = m.default), m));
  const Lazy = lazy(load);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Page = (props: P) => (Loaded ? <Loaded {...props} /> : <Lazy {...(props as any)} />);
  Page.preload = load;
  return Page;
}

export const Services = lazyPage(() => import("./pages/Services"));
export const ServiceDetail = lazyPage(() => import("./pages/ServiceDetail"));
export const Connectivity = lazyPage(() => import("./pages/Connectivity"));
export const About = lazyPage(() => import("./pages/About"));
export const Insights = lazyPage(() => import("./pages/Insights"));
export const InsightPost = lazyPage(() => import("./pages/InsightPost"));
export const Contact = lazyPage(() => import("./pages/Contact"));
export const Legal = lazyPage(() => import("./pages/Legal"));
export const NotFound = lazyPage(() => import("./pages/NotFound"));

/** Loads the code for the page at this address before the app first renders (see main.tsx). */
export function preloadRoute(pathname: string): Promise<unknown> {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/") return Promise.resolve();
  if (p === "/services") return Services.preload();
  if (p.startsWith("/services/")) return ServiceDetail.preload();
  if (p === "/connectivity") return Connectivity.preload();
  if (p === "/about") return About.preload();
  if (p === "/insights") return Insights.preload();
  if (p.startsWith("/insights/")) return InsightPost.preload();
  if (p === "/contact") return Contact.preload();
  if (p === "/privacy" || p === "/terms") return Legal.preload();
  return NotFound.preload();
}
