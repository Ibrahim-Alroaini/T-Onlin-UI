import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

type RuntimeGlobals = typeof globalThis & { process?: { env?: Record<string, string | undefined> } }
const environment = (globalThis as RuntimeGlobals).process?.env

export default defineConfig({
  base: environment?.VITE_BASE_PATH ?? '/',
  plugins: [react()],
  server: { host: '0.0.0.0', port: 3000 },
})
