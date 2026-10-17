// @ts-nocheck — dev-only contact proxy imports shared .mjs helpers
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

function readJsonBody(req: import('node:http').IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch {
        reject(new Error('Invalid JSON'))
      }
    })
    req.on('error', reject)
  })
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'contact-api-dev',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const path = req.url?.split('?')[0]
          if (path !== '/api/contact') return next()

          if (req.method !== 'POST') {
            res.statusCode = 405
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }))
            return
          }

          try {
            const { inquiryFieldsFromClientPayload } = await import('./shared/inquiry-payload.mjs')
            const { proxyInquiryToFormspree } = await import('./shared/formspree-proxy.mjs')
            const raw = await readJsonBody(req)
            const fields = inquiryFieldsFromClientPayload(raw)
            if (!fields) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: false, error: 'Please check required fields and try again.' }))
              return
            }
            const formspreeUrl = env.FORMSPREE_FORM_URL?.trim()
            const result = await proxyInquiryToFormspree(formspreeUrl, fields)
            res.statusCode = result.status
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(result.payload))
          } catch {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: 'Server error.' }))
          }
        })
      },
    },
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
}
})
