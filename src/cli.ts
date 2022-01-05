import process from 'process'
import { program } from 'commander'
import { version } from '../package.json'
import { downloadSong, getUserInfo } from './downloader'
import './node-shim'

program.version(version)

program
  .command('song <shareId>')
  .option('-o, --outputPath <path>', 'Set output path', process.cwd())
  .action(async (shareId: string, options: { outputPath: string }) => {
    await downloadSong(shareId, options.outputPath)
  })

program
  .command('user <uid>')
  .option('-o, --outputPath <path>', 'Set output path', process.cwd())
  .action(async (uid: string, options: { outputPath: string }) => {
    const user = await getUserInfo(uid)
    const songs: Record<string, any>[] = user.data.ugclist
    const tasks: Promise<void>[] = []
    for (const song of songs) {
      tasks.push(
        downloadSong(song.shareid, options.outputPath || process.cwd())
      )
    }
    await Promise.all(tasks)
  })
program.parse(process.argv)
