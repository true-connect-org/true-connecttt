import { Share2, MonitorSmartphone, Palette, Code2, BrainCircuit, Network, type LucideIcon } from "lucide-react";

/** Icon and photo for each service, keyed by Service.id from src/content/site.ts */
/** WebP images in /public/images, in two widths: 800px for cards, 1600px for large banners (pass the display width to image()). */
export const serviceVisuals: Record<string, { icon: LucideIcon; image: (w?: number) => string; alt: string; natural?: boolean }> = {
  "social-media-marketing": { icon: Share2,    image: (w = 800) => `/images/social-media-marketing-${w > 900 ? 1600 : 800}.webp`,             alt: "Social media marketing agency in Trivandrum, Kerala: True Connect team planning content", natural: true },
  "web-app-development":    { icon: MonitorSmartphone, image: (w = 800) => `/images/web-app-development-${w > 900 ? 1600 : 800}.webp`,         alt: "Website and mobile app development company in Trivandrum: True Connect developers at work", natural: true },
  branding:                 { icon: Palette,    image: (w = 800) => `/images/branding-${w > 900 ? 1600 : 800}.webp`,        alt: "Branding and brand strategy agency in Kerala: True Connect designers building a brand identity", natural: true },
  "custom-software":        { icon: Code2,      image: (w = 800) => `/images/custom-software-${w > 900 ? 1600 : 800}.webp`,  alt: "Custom software, CRM and ERP development in Kerala by True Connect", natural: true },
  "ai-automation":          { icon: BrainCircuit, image: (w = 800) => `/images/ai-automation-${w > 900 ? 1600 : 800}.webp`,   alt: "AI and business automation services in Kerala by True Connect", natural: true },
  "enterprise-internet":    { icon: Network,    image: (w = 800) => `/images/enterprise-internet-${w > 900 ? 1600 : 800}.webp`,  alt: "Jio leased line and business broadband in Trivandrum by True Connect, authorized Jio partner", natural: true },
};
