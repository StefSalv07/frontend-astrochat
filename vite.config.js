import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      "/server": {
        target: "https://astrochat-backend.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/server/, ""), // Remove '/server' prefix
      },
    },
  },
  plugins: [react()],
});
