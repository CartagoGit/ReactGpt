import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 7000,
    hmr: true,
    watch: {
      usePolling: true,
    },
    
  },
  plugins: [react()],
});
