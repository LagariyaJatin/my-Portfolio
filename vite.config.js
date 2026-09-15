import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes the built dist/index.html work when opened directly
// from the filesystem (file://) as well as from any server subpath.
export default defineConfig({
  base: './',
  plugins: [react()],
})
