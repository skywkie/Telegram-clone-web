import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }] },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/api", //server domain
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/api", ""),
      },
    },
  },
});
