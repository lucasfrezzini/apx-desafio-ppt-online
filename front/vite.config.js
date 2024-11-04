import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@public": path.resolve(__dirname, "./public"),
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@state": path.resolve(__dirname, "./src/state"),
      "@db": path.resolve(__dirname, "./src/db"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  // plugins: [react()],
});
