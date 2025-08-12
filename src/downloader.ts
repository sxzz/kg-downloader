import { Buffer } from 'node:buffer'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

export function filterNick(nick: string): string {
  return nick
    .replaceAll(/\[em\](.*?)\[\/em\]/g, '')
    .replaceAll(/["*/:<>?\\|]/g, '')
}

export async function getSongInfo(shareId: string): Promise<any> {
  const url = `https://node.kg.qq.com/play?s=${shareId}`
  const text = await fetch(url).then((r) => r.text())
  const regex = /window\.__DATA__ = (.*?); <\/script>/
  const m = regex.exec(text)
  if (!m) {
    throw new Error('Failed to extract song info')
  }
  return JSON.parse(m[1])
}

export async function downloadSong(
  shareId: string,
  outputPath: string,
): Promise<void> {
  const info = await getSongInfo(shareId)
  const url = info.detail.playurl
  if (!url) {
    console.error(`歌曲不存在！`)
    return
  }

  console.info(`正在下载 ${info.detail.nick} 的《${info.detail.song_name}》...`)
  const data = await fetch(url, {
    method: 'GET',
  }).then((res) => res.arrayBuffer())

  const filename = `${filterNick(info.detail.nick)} - ${info.detail.song_name}.mp3`
  const dest = path.resolve(outputPath, filename)
  await writeFile(dest, Buffer.from(data))
}

export async function getUserInfo(uid: string): Promise<any> {
  const url = `https://node.kg.qq.com/personal?uid=${uid}`
  const text = await fetch(url).then((r) => r.text())
  const regex = /window\.__DATA__ = (.*?); <\/script>/
  const m = regex.exec(text)
  if (!m) {
    throw new Error('Failed to extract user info')
  }
  return JSON.parse(m[1])
}
