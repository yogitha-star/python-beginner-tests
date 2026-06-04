const result = await Bun.build({
  entrypoints: ['./src/index.tsx'],
  outdir: './public',
  minify: process.env.NODE_ENV === 'production',
  sourcemap: process.env.NODE_ENV !== 'production' ? 'external' : 'none',
  target: 'browser'
})

if (!result.success) {
  console.error('Build failed:')
  for (const log of result.logs) {
    console.error(log)
  }
  process.exit(1)
}

console.log('✅ Build complete!')
