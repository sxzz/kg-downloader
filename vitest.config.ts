import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'FetchPloyfill',
      transform(code, id) {
        if (!id.endsWith('src/downloader.ts')) return
        return `import './node-shim'; ${code}`
      },
    },
  ],
})
