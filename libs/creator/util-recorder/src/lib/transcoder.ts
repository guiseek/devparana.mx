import {
  FFmpeg,
  fetchFile,
  LogCallback,
  createFFmpeg,
} from '@ffmpeg/ffmpeg'
import { BehaviorSubject } from 'rxjs'
import { getCurrentDate } from './get-current-date'

export class Transcoder {
  private _log = new BehaviorSubject<string[]>([])
  public log$ = this._log.asObservable()

  ffmpeg: FFmpeg

  constructor() {
    const logger: LogCallback = ({ message }) => {
      this._log.next([...this._log.value, message])
    }
    const corePath = '/assets/ffmpeg/ffmpeg-core.js'
    this.ffmpeg = createFFmpeg({ logger, corePath })
  }

  async load(file: File) {
    await this.ffmpeg.load()
    this.ffmpeg.FS('writeFile', file.name, await fetchFile(file))
    await this.ffmpeg.run('-i', file.name, 'output.mp4')
    const data = this.ffmpeg.FS('readFile', 'output.mp4')
    return this._createLink(data.buffer)
  }

  private _createLink(buffer: ArrayBufferLike) {
    const blob = new Blob([buffer], { type: 'video/mp4' })
    return {
      href: URL.createObjectURL(blob),
      download: getCurrentDate() + '.mp4'
    }
  }
}
