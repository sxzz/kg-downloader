import path from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'
import { downloadSong, getSongInfo } from '../src'

describe('downloader should work', () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url))

  it('getSongInfo should work', async () => {
    const info = await getSongInfo('YFq3ycYfBeVVPYji')
    expect(info).toBeTruthy()
  })

  it('downloadSong should work', async () => {
    await downloadSong('YFq3ycYfBeVVPYji', path.resolve(dirname, 'temp'))
  })
})
