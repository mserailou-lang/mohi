import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isPreview = process.env.BASE44_PREVIEW_MODE === '1';
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN;

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // The API runs as its own process; the dev server proxies it so the
    // browser only ever talks to a single origin.
    proxy: {
      '/api': {
        target: process.env.API_PROXY_TARGET || 'http://localhost:8000',
        changeOrigin: true,
      },
    },
    // Only widen the host/HMR allowlists inside the sandbox preview, where the
    // app is served through the platform proxy on a rotating hostname.
    allowedHosts: isPreview && sandboxHostDomain ? [`.${sandboxHostDomain}`] : undefined,
    hmr: isPreview ? { protocol: 'wss', clientPort: 443 } : undefined,
  },
});
