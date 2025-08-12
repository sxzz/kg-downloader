import process from 'node:process'
import { cac } from 'cac'
import { version } from '../package.json'
import { downloadSong, getUserInfo } from './downloader'

const cli = cac('kg-download')

cli.command('').action(() => {
  cli.outputHelp()
  process.exit(1)
})

cli
  .command('song <shareId>')
  .option('-o, --outputPath <path>', 'Set output path', {
    default: process.cwd(),
  })
  .action(async (shareId: string, options: { outputPath: string }) => {
    await downloadSong(shareId, options.outputPath)
  })

cli
  .command('user <uid>')
  .option('-o, --outputPath <path>', 'Set output path', {
    default: process.cwd(),
  })
  .action(async (uid: string, options: { outputPath: string }) => {
    const user = await getUserInfo(uid)
    const songs: Record<string, any>[] = user.data.ugclist
    const tasks: Promise<void>[] = []
    for (const song of songs) {
      tasks.push(
        downloadSong(song.shareid, options.outputPath || process.cwd()),
      )
    }
    await Promise.all(tasks)
  })

cli.version(version).help().parse(process.argv)
