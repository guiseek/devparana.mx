import { BehaviorSubject, interval, Observable, Subject } from 'rxjs'
import { RecorderFactory } from '@devparana/creator/util-recorder'
import { DownloadComponent } from '@devparana/creator/ui-shared'
import { finalize, map, take } from 'rxjs/operators'
import { MatDialog } from '@angular/material/dialog'

export abstract class RecorderBase {
  abstract recorderEl: HTMLVideoElement
  abstract recordedEl: HTMLVideoElement
  abstract recorder: MediaRecorder
  abstract stream: MediaStream

  abstract mimeType: string | undefined

  abstract constraints: MediaStreamConstraints

  recordedBlobs: Blob[] = []

  protected _active = new BehaviorSubject<boolean>(false)
  public active$ = this._active.asObservable()

  protected _completed = new BehaviorSubject<boolean>(false)
  public completed$ = this._completed.asObservable()

  protected _countdown = new Subject<number>()
  public countdown$ = this._countdown.asObservable()

  public state$!: Observable<RecordingState | null>

  constructor(readonly dialog: MatDialog) {}

  abstract getMedia(constraints: MediaStreamConstraints): Promise<MediaStream>

  capture() {
    const constraints = this.constraints ?? { video: true, audio: true }
    this.getMedia(constraints).then((stream) => {
      this.recorderEl.srcObject = stream
      this.stream = stream

      this.recorder = RecorderFactory.create(stream)
      this.state$ = RecorderFactory.createState(this.recorder)
    })
  }

  start() {
    interval(1000)
      .pipe(
        take(6),
        map((v) => 5 - v),
        finalize(() => this.record())
      )
      .subscribe((v) => this._countdown.next(v))
  }

  get disableToggle() {
    const state = this.recorder?.state ?? ''
    return !state || state === 'inactive'
  }

  toggleRecording() {
    if (this.recorder.state == 'paused') {
      this.recorder.resume()
    } else {
      this.recorder.pause()
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
      // this.recorder = new MediaRecorder(this.stream, {
      //   mimeType: this.mimeType,
      // })
      this.recorder.ondataavailable = ({ data }: BlobEvent) => {
        if (data && data.size > 0) this.recordedBlobs.push(data)
      }

      this.recorder.start()

      this.recorder.onstop = () => {
        this.stream?.getTracks().forEach((track) => track.stop())
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
