import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/fuji/",                                  // served from the site's /fuji
  build: { outDir: "../tokyo/public/fuji", emptyOutDir: true },
});
