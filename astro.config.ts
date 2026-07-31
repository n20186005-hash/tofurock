import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const configuredSite = process.env.PUBLIC_SITE_URL?.trim();
const site = configuredSite && /^https?:\/\//.test(configuredSite)
  ? configuredSite.replace(/\/$/, "")
  : undefined;

export default defineConfig({
  site,
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()],
  },
});
