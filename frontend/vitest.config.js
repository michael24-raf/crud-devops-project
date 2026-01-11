import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,                 // ✅ describe, test, expect globaux
    environment: 'jsdom',          // ✅ nécessaire pour React
    setupFiles: './src/setupTests.js', // ✅ fichier de setup
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
