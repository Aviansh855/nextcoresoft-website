import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "inject-gsc-verification",
      transformIndexHtml(html) {
        const token = process.env.VITE_GSC_SITE_VERIFICATION?.trim()
        if (!token) return html
        return html.replace(
          "</head>",
          `    <meta name="google-site-verification" content="${token}" />\n  </head>`,
        )
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three") || id.includes("@react-three")) {
            return "three-vendor"
          }
        },
      },
    },
  },
})
