import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { host: "localhost", port: 3000 },
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
