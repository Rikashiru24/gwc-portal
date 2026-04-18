import { defineConfig } from 'vite'

export default defineConfig({
  server: { // Enable host and allow all hosts for development server / ngrok tunneling
    host: true,
    allowedHosts: true,
  },
})
