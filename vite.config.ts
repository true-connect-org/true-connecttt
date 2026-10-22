import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * Link previews need the full address of the share image. The site's real domain is true-connect.in,
 * but builds on Vercel are shared from the vercel.app address, so there the image is pointed at the
 * Vercel domain instead (Hostinger builds keep true-connect.in).
 */
const shareImageHost = (): import("vite").Plugin => ({
  name: "share-image-host",
  transformIndexHtml(html) {
    const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
    if (!host) return html;
    return html.replace(/https:\/\/true-connect\.in\/og-image\.jpg/g, `https://${host}/og-image.jpg`);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    // MDX must run before the React plugin. Used for /content/insights/*.mdx
    { enforce: "pre", ...mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }) },
    react(),
    shareImageHost(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        // Split heavy libraries so pages load only what they need and browsers can cache them
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion", "gsap"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
