import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'react',
      babel: {
        presets: ['@babel/preset-typescript'],
        plugins: [
          [
            '@babel/plugin-transform-react-jsx',
            {
              runtime: 'automatic',
            },
          ],
        ],
      },
    }),
    visualizer({
      open: false,
      filename: './dist/stats.html',
      template: 'treemap',
    }),
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['@testing-library/react', 'jest-axe'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude, '**/node_modules/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    css: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/_variables.scss";',
      },
    },
  },
});