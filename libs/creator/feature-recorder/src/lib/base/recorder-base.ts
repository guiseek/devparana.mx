import { DownloadComponent } from '@devparana/creator/ui-shared'
import { BehaviorSubject, interval, Subject } from 'rxjs'
import { finalize, map, take } from 'rxjs/operators'
import { MatDialog } from '@angular/material/dialog'

export type MimeType =
  | 'video/webm;codecs=vp9,opus'
  | 'video/webm;codecs=vp8,opus'
  | 'video/webm'
  | 'video/mp4'

export abstract class RecorderBase {
  abstract recorderEl: HTMLVideoElement
  abstract recordedEl: HTMLVideoElement
  abstract mediaRecorder: MediaRecorder
  abstract mediaStream: MediaStream

  abstract mimeType: MimeType | undefined

  abstract constraints: MediaStreamConstraints

  recordedBlobs: Blob[] = []

  protected _active = new BehaviorSubject<boolean>(false)
  public active$ = this._active.asObservable()

  protected _completed = new BehaviorSubject<boolean>(false)
  public completed$ = this._completed.asObservable()

  protected _countdown = new Subject<number>()
  public countdown$ = this._countdown.asObservable()

  constructor(readonly dialog: MatDialog) {}

  abstract getMedia(constraints: MediaStreamConstraints): Promise<MediaStream>

  capture() {
    const constraints = this.constraints ?? { video: true, audio: true }
    this.getMedia(constraints).then((stream) => {
      this.recorderEl.srcObject = stream
      this.mediaStream = stream
    })
  }

  start() {
    interval(1000)
      .pipe(
        take(5),
        map((v) => 5 - v),
        finalize(() => this.record())
      )
      .subscribe((v) => this._countdown.next(v))
  }

  get disableToggle() {
    const state = this.mediaRecorder?.state ?? ''
    return !state || state === 'inactive'
  }

  toggleRecording() {
    if (this.mediaRecorder.state == 'paused') {
      this.mediaRecorder.resume()
    } else {
      this.mediaRecorder.pause()
    }
  }

  stop() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop()
      this._completed.next(true)
    }
  }

  record() {
    this.recordedBlobs = []

    const mimeTypes: MimeType[] = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
      'video/mp4',
    ]

    this.mimeType = mimeTypes.find((type) => {
      return MediaRecorder.isTypeSupported(type)
    })

    if (!this.mimeType) {
      console.error('MediaRecorder support')
    }

    if (this.mediaStream) {
      this.mediaRecorder = new MediaRecorder(this.mediaStream, {
        mimeType: this.mimeType,
      })
      this.mediaRecorder.ondataavailable = ({ data }: BlobEvent) => {
        if (data && data.size > 0) this.recordedBlobs.push(data)
      }

      this.mediaRecorder.start()

      this.mediaRecorder.onstop = () => {
        this.mediaStream?.getTracks().forEach((track) => track.stop())
        const blob = new Blob(this.recordedBlobs, { type: this.mimeType })
        this.recordedEl.src = URL.createObjectURL(blob)
        this.recordedEl.controls = true
        this.recordedEl.play()
      }
    }
  }

  download() {
    const data = this.recordedBlobs
    this.dialog.open(DownloadComponent, { data })
  }
}
