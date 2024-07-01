import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Garage Door",
        short_name: "Garage",
        description: "Garage door opener",
        theme_color: "#ffffff",
        icons: [
          {
            src: "remote.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "remote512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      registerType: "autoUpdate",
    }),
  ],
  server: {
    proxy: {
      "/api/": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/ws/": {
        target: "ws://localhost:3000",
        rewrite: (path) => path.replace(/^\/ws/, ""),
        ws: true,
      },
    },
  },
});
