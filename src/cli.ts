import process from 'process'
import { program } from 'commander'
import { version } from '../package.json'
import { downloadSong } from './downloader'
import './node-shim'

program.version(version)

program
  .command('download <shareId> [outputPath]')
  .action(async (shareId: string, outputPath: string) => {
    await downloadSong(shareId, outputPath || process.cwd())
  })
program.parse(process.argv)
