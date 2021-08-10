import {
  BlobFactory,
  RecorderFactory,
  Timeline,
} from '@devparana/creator/util-recorder'
import { DownloadComponent } from '@devparana/creator/ui-shared'
import { BehaviorSubject, interval, Subject } from 'rxjs'
import { finalize, map, take } from 'rxjs/operators'
import { MatDialog } from '@angular/material/dialog'

export abstract class RecorderBase {
  abstract recorderEl: HTMLVideoElement
  abstract recordedEl: HTMLVideoElement
  abstract recorder?: MediaRecorder
  abstract stream: MediaStream

  abstract mimeType: string

  abstract constraints: MediaStreamConstraints

  recordedBlobs: Blob[] = []

  protected _active = new BehaviorSubject<boolean>(false)
  public active$ = this._active.asObservable()

  protected _completed = new BehaviorSubject<boolean>(false)
  public completed$ = this._completed.asObservable()

  protected _countdown = new Subject<number>()
  public countdown$ = this._countdown.asObservable()

  constructor(readonly dialog: MatDialog, readonly timeline: Timeline) {}

  abstract getMedia(constraints: MediaStreamConstraints): Promise<MediaStream>

  capture() {
    const constraints = this.constraints ?? { video: true, audio: true }
    this.getMedia(constraints).then((stream) => {
      this.recorderEl.srcObject = stream
      this.recorderEl.muted = true
      this.stream = stream
    })
  }

  start() {
    interval(1000)
      .pipe(
        take(4),
        map((v) => 3 - v),
        finalize(() => this.record())
      )
      .subscribe((v) => this._countdown.next(v))
  }

  get disableToggle() {
    const state = this.recorder?.state ?? ''
    return !state || state === 'inactive'
  }

  toggleRecording() {
    if (this.recorder) {
      if (this.recorder?.state == 'paused') {
        this.recorder.resume()
      } else {
        this.recorder.pause()
      }
    }
  }

  stop() {
    if (this.recorder) {
      this.recorder.stop()
      this._completed.next(true)
    }
  }

  record() {
    this.recordedBlobs = []

    if (this.stream) {
      this.recorder = RecorderFactory.create(this.stream)

      this.recorder.ondataavailable = ({ data }: BlobEvent) => {
        if (data && data.size > 0) this.recordedBlobs.push(data)
      }

      this.recorder.start()

      this.recorder.onstop = () => {
        const blob = BlobFactory.fromArray(this.recordedBlobs, this.mimeType)
        const url = BlobFactory.toURL(blob)

        this.recordedEl.src = url

        // this.timeline.load(url);

        this.recordedEl.controls = true
        this.recordedEl.play()
      }
    }
  }

  retry() {
    this.recorder = undefined
    this._completed.next(false)
    this.recordedEl.controls = false
    this.recordedEl.src = ''
    this.recordedBlobs = []
  }

  download() {
    const data = this.recordedBlobs
    this.dialog.open(DownloadComponent, { data })
  }

  destroy() {
    if (this.stream) {
      this.stream?.getTracks().forEach((track) => track.stop())
    }
  }
}
