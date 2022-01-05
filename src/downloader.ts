import { writeFile } from 'fs/promises'
import path from 'path'

export const filterNick = (nick: string) =>
  nick.replace(/\[em](.*?)\[\/em]/g, '').replace(/["*/:<>?\\|]/g, '')

export const getSongInfo = async (shareId: string) => {
  const url = `https://node.kg.qq.com/play?s=${shareId}`
  const text = await fetch(url).then((r) => r.text())
  const regex = /window\.__DATA__ = (.*?); <\/script>/
  const m = regex.exec(text)
  return JSON.parse(m[1])
}

export const downloadSong = async (shareId: string, outputPath: string) => {
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

  const filename = `${filterNick(info.detail.nick)} - ${
    info.detail.song_name
  }.mp3`
  const dest = path.resolve(outputPath, filename)
  await writeFile(dest, Buffer.from(data))
}

export const getUserInfo = async (uid: string) => {
  const url = `https://node.kg.qq.com/personal?uid=${uid}`
  const text = await fetch(url).then((r) => r.text())
  const regex = /window\.__DATA__ = (.*?); <\/script>/
  const m = regex.exec(text)
  return JSON.parse(m[1])
}
