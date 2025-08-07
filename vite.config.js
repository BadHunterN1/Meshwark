import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true,
    template: 'treemap', // More detailed visualization
  }), tailwindcss(), react()],
})
