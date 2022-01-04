import { it, expect, describe } from 'vitest'
import { getSongInfo } from '../src'

describe('downloader should work', () => {
  it('getSongInfo should work', async () => {
    const info = await getSongInfo('YFq3ycYfBeVVPYji')
    expect(info).toBeTruthy()
  })
})
