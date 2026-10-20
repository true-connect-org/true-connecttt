/**
 * True when the page is being captured by scripts/prerender.mjs.
 * Entrance animations are skipped then, so the saved HTML is fully visible
 * for visitors who see it before JavaScript has loaded.
 */
export const isPrerender =
  typeof navigator !== "undefined" && navigator.userAgent.includes("TCPrerender");
