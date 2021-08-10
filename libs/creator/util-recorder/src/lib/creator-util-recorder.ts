import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import { Subject } from 'rxjs'

const _logger = new Subject<{ type: string; message: string }>()
const _progress = new Subject<{ ratio: number }>()

export async function createTranscoder(file: File) {
  const logger = _logger.next
  const progress = _progress.next

  const ffmpeg = createFFmpeg({ logger, progress })
  await ffmpeg.load()

  const { name } = file

  ffmpeg.FS('writeFile', name, await fetchFile(file))
  await ffmpeg.run('-i', name, 'output.mp4')

  return { ffmpeg, logger, progress }
}
