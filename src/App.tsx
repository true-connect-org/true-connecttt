import Toaster from "@/components/site/Toaster";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigationType } from "react-router-dom";
import { Suspense, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import Index from "./pages/Index";

import { Services, ServiceDetail, Connectivity, About, Insights, InsightPost, Contact, Legal, NotFound, preloadAllRoutes } from "./routes";
import { gsap } from "./animations/gsap.config";
import { isPrerender } from "@/lib/env";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/site/WhatsAppButton";
import ScrollProgress from "./components/site/ScrollProgress";
import ScrollReveal from "./components/site/ScrollReveal";
import HeadingReveal from "./components/site/HeadingReveal";
import { startSmoothScroll, scrollToTarget } from "./lib/smoothScroll";
import { registerGsapPlugins, safeRefresh } from "./animations/gsap.config";

registerGsapPlugins();

/**
 * Scroll handling between pages:
 * - Back/forward (POP): return to where the visitor was on that page.
 * - New navigation: go to the #anchor if there is one, otherwise the top.
 * Positions are remembered per history entry in sessionStorage.
 */
const SCROLL_KEY = "tc-scroll-positions-v2";
const readPositions = (): Record<string, number> => {
  try {
    return JSON.parse(sessionStorage.getItem(SCROLL_KEY) || "{}");
  } catch {
    return {};
  }
};

function ScrollRestorer() {
  const location = useLocation();
  const navType = useNavigationType();
  const { pathname, hash } = location;
  // Saved per page and per history entry. (Pages opened by typing the address all share the key "default",
  // so the page path is part of the key; otherwise one page could restore another page's position.)
  const key = `${pathname}|${location.key}`;

  // Take over from the browser so it doesn't jump before our page has loaded
  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  // Remember this page's scroll position while the visitor is on it
  useEffect(() => {
    const save = () => {
      const positions = readPositions();
      positions[key] = window.scrollY;
      try {
        sessionStorage.setItem(SCROLL_KEY, JSON.stringify(positions));
      } catch {
        /* storage unavailable: back navigation will start at the top */
      }
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, [key]);

  // New page (link click): jump to the top (or #anchor) before the page paints, so there is no flash of the old position
  useLayoutEffect(() => {
    if (navType === "POP") return;
    const el = hash ? document.getElementById(hash.slice(1)) : null;
    if (el) scrollToTarget(el);
    else scrollToTarget(0, true);
  }, [pathname, hash, key, navType]);

  // Back / forward / refresh: return to where the visitor was on that page
  useEffect(() => {
    if (navType !== "POP") {
      safeRefresh(120);
      return;
    }
    const saved = readPositions()[key];
    let tries = 0;
    let timer: number;
    const restore = () => {
      if (saved !== undefined) {
        // Pages load lazily: wait until the page is tall enough to reach the saved position
        const reachable = document.documentElement.scrollHeight - window.innerHeight >= saved - 2;
        if (!reachable && tries++ < 30) {
          timer = window.setTimeout(restore, 100);
          return;
        }
        scrollToTarget(saved, true);
      } else {
        const el = hash ? document.getElementById(hash.slice(1)) : null;
        if (el) scrollToTarget(el);
        else scrollToTarget(0, true);
      }
      safeRefresh(0);
    };
    timer = window.setTimeout(restore, 60);
    return () => window.clearTimeout(timer);
  }, [pathname, hash, key, navType]);

  return null;
}

/**
 * Page transition: on every page change the new page fades and rises in (0.5s). Skipped on the very
 * first load (so the pre-rendered page shows instantly) and for reduced-motion visitors.
 */
function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (isPrerender || !ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(ref.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "opacity,transform" });
    return () => {
      tween.kill();
    };
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}

/** Loads the other pages' code in the background after the first page has loaded. */
function PreloadPages() {
  useEffect(() => {
    if (isPrerender) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const run = () => preloadAllRoutes();
    if (w.requestIdleCallback) w.requestIdleCallback(run);
    else window.setTimeout(run, 1500);
  }, []);
  return null;
}

/**
 * Old URLs from the previous site. The real 301s are in public/.htaccess;
 * these client-side redirects cover local dev and any cached links.
 */
const legacyRedirects: Record<string, string> = {
  "/about-us": "/about",
  "/contact-us": "/contact",
  "/internet-services": "/connectivity",
  "/enterprise-services": "/services",
  "/partner-program": "/contact",
  "/apply-partner": "/contact",
  "/partners": "/contact",
  "/case-studies": "/",
  "/careers": "/about",
};

/** Starts the smooth scroller once for the whole app. */
function SmoothScrollStarter() {
  useEffect(() => startSmoothScroll(), []);
  return null;
}

const App = () => (
  <>
    <Toaster />
    <BrowserRouter>
      <ScrollRestorer />
      <SmoothScrollStarter />
      <PreloadPages />
      <ScrollProgress />
      <ScrollReveal />
      <HeadingReveal />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div className="min-h-[60vh]" />}>
          <PageTransition>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/connectivity" element={<Connectivity />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Legal kind="privacy" />} />
            <Route path="/terms" element={<Legal kind="terms" />} />
            {Object.entries(legacyRedirects).map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </PageTransition>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  </>
);

export default App;
