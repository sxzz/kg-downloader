import { it, expect, describe } from 'vitest'
import { getSongInfo, downloadSong } from '../src'

describe('downloader should work', () => {
  it('getSongInfo should work', async () => {
    const info = await getSongInfo('YFq3ycYfBeVVPYji')
    expect(info).toBeTruthy()
  })

  it('downloadSong should work', async () => {
    await downloadSong('YFq3ycYfBeVVPYji', './downloads')
  })
})
