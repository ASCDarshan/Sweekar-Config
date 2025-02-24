import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: "Sweekar",
        short_name: "Sweekar",
        description: "Sweekar",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icons/Sweekar.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  base: "/",
  resolve: {
    alias: {
      "date-fns": "date-fns",
    },
  },
  define: {
    global: "window",
  },
  optimizeDeps: {
    include: ["date-fns"],
  },
});
