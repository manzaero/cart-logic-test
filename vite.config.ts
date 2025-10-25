import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/cart-logic-test/',
  server: {
    host: '127.0.0.1',
    port: 5175,
    strictPort: true,
    fs: {
      strict: false
    },
    middlewareMode: false
  },
  build: {
    outDir: 'dist'
  }
});
