// Generates favicon PNGs, app icons, logo.png and the 1200x630 social share image
// from the logo files in src/assets/logo. Run: node scripts/generate-brand-assets.mjs
import sharp from "sharp";
import { readFileSync } from "node:fs";

const logoDir = "src/assets/logo";
const out = "public";
const NAVY = "#0b1f3f";

const favicon = readFileSync(`${logoDir}/favicon.svg`);
const navLogo = `${logoDir}/nav-logo.png`; // light logo for dark backgrounds

// Square icons from the submark
for (const [name, size] of [
  ["favicon-32x32.png", 32],
  ["favicon-48x48.png", 48],
  ["apple-touch-icon.png", 180],
  ["web-app-manifest-192x192.png", 192],
  ["web-app-manifest-512x512.png", 512],
]) {
  const solid = name.startsWith("apple") || name.startsWith("web-app");
  let img = sharp(favicon, { density: 600 }).resize(size, size);
  if (solid) img = img.flatten({ background: "#000000" }); // app icons must not be transparent
  await img.png().toFile(`${out}/${name}`);
}

// Logo for schema.org / publishers (square-ish, on navy)
await sharp({ create: { width: 600, height: 600, channels: 4, background: NAVY } })
  .composite([{ input: await sharp(navLogo).resize({ width: 480 }).toBuffer(), gravity: "center" }])
  .png()
  .toFile(`${out}/logo.png`);

// Social share image
const W = 1200, H = 630;
const logo = await sharp(navLogo).resize({ width: 620 }).toBuffer();
const svg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#042d5b"/><stop offset="0.55" stop-color="#0b1f3f"/><stop offset="1" stop-color="#031126"/>
  </linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="80" y="440" width="90" height="6" rx="3" fill="#E6E84A"/>
  <text x="80" y="510" font-family="Helvetica, Arial, sans-serif" font-size="46" font-weight="700" fill="#ffffff">Your Vision. Our Execution.</text>
  <text x="80" y="560" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#c7d2e3">Branding, marketing and software · Technopark, Trivandrum</text>
</svg>`);
await sharp(svg).composite([{ input: logo, left: 80, top: 150 }]).png().toFile(`${out}/og-image.png`);
console.log("brand assets written to public/");
