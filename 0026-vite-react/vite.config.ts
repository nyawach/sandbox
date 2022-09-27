import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'spa',
  root: './src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    open: true,
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: [{ find: '~/', replacement: '/' }]
  },
})
