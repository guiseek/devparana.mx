import { BlobFactory, RecorderFactory } from '@devparana/creator/util-recorder'
import { BehaviorSubject, interval, Observable, Subject } from 'rxjs'
import { DownloadComponent } from '@devparana/creator/ui-shared'
import { finalize, map, take } from 'rxjs/operators'
import { MatDialog } from '@angular/material/dialog'
import { ControlState } from './control-base'

export abstract class RecorderBase {
  abstract recorderEl: HTMLVideoElement
  abstract recordedEl: HTMLVideoElement
  abstract recorder?: MediaRecorder
  abstract stream: MediaStream

  abstract mimeType: string

  abstract constraints: MediaStreamConstraints

  recordedBlobs: Blob[] = []

  protected _state = new BehaviorSubject<ControlState>('off')
  public state$ = this._state.asObservable()

  protected _active = new BehaviorSubject<boolean>(false)
  public active$ = this._active.asObservable()

  protected _completed = new BehaviorSubject<boolean>(false)
  public completed$ = this._completed.asObservable()

  protected _countdown = new Subject<number>()
  public countdown$ = this._countdown.asObservable()

  get disabled() {
    const state = this.recorder?.state ?? false
    const active = this.stream?.active ?? false
    return {
      stream: active,
      play: !active || state,
      pause: !state || state === 'inactive',
      stop: state !== 'recording',
      undo: state !== 'inactive',
      download: state !== 'inactive',
    }
  }

  constructor(readonly dialog: MatDialog) {

  }

  abstract getMedia(constraints: MediaStreamConstraints): Promise<MediaStream>

  capture() {
    const constraints = this.constraints ?? { video: true, audio: true }
    this.getMedia(constraints).then((stream) => {
      this.recorderEl.srcObject = stream
      this._state.next('waiting')
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
        this.recordedEl.src = BlobFactory.toURL(blob)
        this.recordedEl.controls = true
        queueMicrotask(() => {
          console.log(this.recordedEl)
          console.log(this.recordedEl.play)

          this.recordedEl.play()
        })
      }
      console.log(this.recorder)
    }
  }

  retry() {
    ;(this.recorder as any) = null
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
