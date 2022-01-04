import process from 'process'
import { program } from 'commander'
import { version } from '../package.json'
import { getSongInfo } from './downloader'
import './node-shim'

program.version(version)

program.command('download <shareId>').action(async (shareId: string) => {
  const info = await getSongInfo(shareId)
  const url = info.detail.playurl
  if (!url) {
    console.error(`歌曲不存在！`)
    return
  }
  console.info(`下载 URL 为: ${url}`)
})
program.parse(process.argv)
