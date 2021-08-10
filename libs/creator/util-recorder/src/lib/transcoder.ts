import { getCurrentDate } from './get-current-date'
import { BlobFactory } from './factories'
import { BehaviorSubject } from 'rxjs'
import { FFmpeg, fetchFile, LogCallback, createFFmpeg } from '@ffmpeg/ffmpeg'

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
    return this._createLink(data)
  }

  async fromBlob(file: Blob) {
    await this.ffmpeg.load()
    this.ffmpeg.FS('writeFile', 'input.webm', await fetchFile(file))
    await this.ffmpeg.run('-i', 'input.webm', 'output.mp4')
    const data = this.ffmpeg.FS('readFile', 'output.mp4')
    return this._createLink(data)
  }

  private _createLink(data: Uint8Array) {
    const file = BlobFactory.fromFS(data, 'video/mp4')
    const href = BlobFactory.toURL(file)

    const name = getCurrentDate() + '.mp4'

    return { href, download: name }
  }
}
