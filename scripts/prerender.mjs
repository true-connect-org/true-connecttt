// Pre-renders every route to static HTML after `vite build`, so Google (and anyone
// without JavaScript) gets real content. Also writes sitemap.xml and 404.html.
// Run automatically by `npm run build`.
import { createServer } from "node:http";
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import puppeteer from "puppeteer";

const DIST = "dist";
const SITE = "https://true-connect.in";
const PORT = 4173;

// Routes: static list from the content file + published insight posts
const site = readFileSync("src/content/site.ts", "utf8");
const staticRoutes = [...site.match(/staticRoutes = \[([\s\S]*?)\]/)[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);

const postRoutes = [];
if (existsSync("content/insights")) {
  for (const f of readdirSync("content/insights").filter((f) => f.endsWith(".mdx"))) {
    const fm = readFileSync(join("content/insights", f), "utf8").split("---")[1] ?? "";
    const slug = fm.match(/^slug:\s*"?([^"\n]+)"?/m)?.[1];
    const draft = /^draft:\s*true/m.test(fm);
    if (slug && !draft) postRoutes.push(`/insights/${slug}`);
  }
}
const routes = [...staticRoutes, ...postRoutes];

// Tiny static server with SPA fallback (so client routes resolve while rendering)
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".mp4": "video/mp4", ".json": "application/json", ".webmanifest": "application/manifest+json" };
const server = createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  let file = join(DIST, url);
  if (!existsSync(file) || !extname(file)) file = join(DIST, "index.html");
  res.setHeader("Content-Type", types[extname(file)] ?? "application/octet-stream");
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(PORT, r));

const candidates = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
const outPath = (route) => (route === "/" ? join(DIST, "index.html") : join(DIST, `${route.slice(1)}.html`));

// Pre-rendering needs a working Chrome. Hosts like Vercel do not provide one, so if Chrome
// cannot start (or SKIP_PRERENDER=1 is set) we keep the normal single-page build instead of failing.
let browser = null;
if (process.env.SKIP_PRERENDER === "1") {
  console.warn("SKIP_PRERENDER=1: skipping pre-rendering");
} else {
  try {
    browser = await puppeteer.launch({ headless: true, executablePath, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  } catch (err) {
    console.warn(`Pre-rendering skipped: Chrome could not start (${err.message.split("\n")[0]})`);
  }
}

async function render(route, file) {
  const page = await browser.newPage();
  await page.setUserAgent((await browser.userAgent()) + " TCPrerender");
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0" });
  await page.waitForSelector("main h1, main h2", { timeout: 15000 });
  await new Promise((r) => setTimeout(r, 400)); // let useSeo effects run
  const html = "<!doctype html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  await page.close();
  console.log("prerendered", route);
}

if (browser) {
  // Render the 404 and the non-home pages first, home last (it overwrites the SPA shell index.html)
  await render("/this-page-does-not-exist", join(DIST, "404.html"));
  for (const r of routes.filter((r) => r !== "/")) await render(r, outPath(r));
  await render("/", outPath("/"));
  await browser.close();
} else {
  // Without pre-rendering, unknown URLs still load the app (which shows its own 404 page)
  writeFileSync(join(DIST, "404.html"), readFileSync(join(DIST, "index.html")));
}
server.close();

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const priority = (r) => (r === "/" ? "1.0" : r === "/services" || r === "/contact" ? "0.9" : "0.7");
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map((r) => `  <url><loc>${SITE}${r === "/" ? "" : r}</loc><lastmod>${today}</lastmod><priority>${priority(r)}</priority></url>`)
    .join("\n") +
  `\n</urlset>\n`;
writeFileSync(join(DIST, "sitemap.xml"), xml);
console.log(`sitemap.xml written with ${routes.length} URLs`);
