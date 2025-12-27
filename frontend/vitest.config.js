import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,              // 👈 permet d'utiliser describe, test, expect sans import
    environment: 'jsdom',       // 👈 nécessaire pour React
    setupFiles: './src/setupTests.js', // 👈 AJOUT OBLIGATOIRE
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
