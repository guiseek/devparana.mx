import { CountdownComponent, RecorderBase } from '@devparana/creator/ui-shared'
import {
  BlobFactory,
  getCurrentDate,
  Timeline,
  Transcoder,
} from '@devparana/creator/util-recorder'
import { MatDialog } from '@angular/material/dialog'
import {
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core'

@Component({
  templateUrl: './webcam-recorder.component.html',
  styleUrls: ['./webcam-recorder.component.scss'],
})
export class WebcamRecorderComponent
  extends RecorderBase
  implements AfterViewInit, OnDestroy
{
  panelOpenState = false
  recorder?: MediaRecorder
  stream!: MediaStream
  mimeType!: string

  audioStream!: MediaStream
  videoStream!: MediaStream

  constraints = {
    audio: true,
    video: {
      width: {
        ideal: 1920,
        max: 3840,
      },
      height: {
        ideal: 1080,
        max: 2160,
      },
      framerate: 60,
    },
  }

  @ViewChild(CountdownComponent)
  countdown!: CountdownComponent

  @ViewChild('recorderRef')
  recorderRef!: ElementRef<HTMLVideoElement>
  recorderEl!: HTMLVideoElement

  @ViewChild('recordedRef')
  recordedRef!: ElementRef<HTMLVideoElement>
  recordedEl!: HTMLVideoElement

  constructor(readonly dialog: MatDialog, readonly timeline: Timeline) {
    super(dialog)
  }

  getMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia(constraints)
  }

  ngAfterViewInit(): void {
    this.recorderEl = this.recorderRef.nativeElement
    this.recordedEl = this.recordedRef.nativeElement

    this.recorderEl.onplay = () => {
      this._active.next(true)
    }

    this.recorderEl.onpause = () => {
      this._active.next(false)
      const active = this._active.value
      const len = this.recordedBlobs.length
      this._completed.next(!active || len === 0)
    }
  }

  start() {
    this.countdown.start()
  }

  download() {
    // this.timeline.load(this.recordedBlobs)
    const transcoder = new Transcoder()
    const file = new File(this.recordedBlobs, '')
    const blobs = BlobFactory.fromArray(this.recordedBlobs, 'video/webm')
    transcoder.fromBlob(blobs).then((res) => {
      const link = document.createElement('a')
      Object.assign(link, res)
      link.click()
    })

    const blob = new Blob(this.recordedBlobs, { type: this.mimeType })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = getCurrentDate() + '-video.webm'
    link.click()
  }

  ngOnDestroy(): void {
    super.destroy()
  }
}
