import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise the warning limit and split large vendor chunks
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          redux: ["react-redux", "@reduxjs/toolkit"],
          vendor: ["axios", "react-icons", "tw-elements"],
        },
      },
    },
  },
});
