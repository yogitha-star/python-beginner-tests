import { watch } from 'fs'

const PUBLIC_DIR = import.meta.dir + '/public'
const PORT = 8080

// Initial build
await Bun.$`bun run build.ts`

// Watch for changes in src/ directory and rebuild
watch(import.meta.dir + '/src', { recursive: true }, async (eventType, filename) => {
  if (filename) {
    console.log(`File changed: ${filename}, rebuilding...`)
    await Bun.$`bun run build.ts`
  }
})

// Start server with console: true
Bun.serve({
  port: PORT,
  development: {
    console: true // ← Frontend console.log() appears in backend terminal!
  },
  async fetch(req) {
    const url = new URL(req.url)
    const path = url.pathname === '/' ? '/index.html' : url.pathname

    try {
      const file = Bun.file(PUBLIC_DIR + path)
      if (await file.exists()) {
        return new Response(file)
      }
    } catch (e) {
      console.error('Error serving file:', e)
    }

    return new Response('Not Found', { status: 404 })
  }
})

console.log(`🚀 Server running at http://localhost:${PORT}`)
console.log('📝 Frontend console.log() will appear here!')
