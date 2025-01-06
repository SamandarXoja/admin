import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Указываем, что @ это путь к src
    },
  },
});
