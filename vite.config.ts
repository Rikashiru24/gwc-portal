import { defineConfig } from 'vitest/config'

export default defineConfig({
  server: {
    // Enable host and allow all hosts for development server / ngrok tunneling
    host: true,
    allowedHosts: true,
  },
  test: {
    include: ['tests/**/*.test.ts'],
  },
})
