import aurelia from '@aurelia/vite-plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: {
    open: !process.env.CI,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  esbuild: {
    target: 'es2022',
  },
  plugins: [
    aurelia({ useDev: true }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['test/**/*.spec.ts'],
  },
});
