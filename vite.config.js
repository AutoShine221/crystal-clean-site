import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base : le site est publié sur GitHub Pages sous /crystal-clean-site/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/crystal-clean-site/' : '/',
}))
