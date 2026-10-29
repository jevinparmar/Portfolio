import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react'
            }
            if (id.includes('gsap') || id.includes('lenis')) {
              return 'vendor-gsap'
            }
            if (id.includes('motion')) {
              return 'vendor-motion'
            }
            return 'vendor-other'
          }
        },
      },
    },
  },
})
