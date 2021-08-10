import { Timeline } from '@devparana/creator/util-recorder'
import { RecorderBase } from '../base/recorder-base'
import { MatDialog } from '@angular/material/dialog'
import {
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core'

@Component({
  templateUrl: './screen-recorder.component.html',
  styleUrls: ['./screen-recorder.component.scss'],
})
export class ScreenRecorderComponent
  extends RecorderBase
  implements AfterViewInit, OnDestroy
{
  recorder?: MediaRecorder
  stream!: MediaStream
  mimeType!: string

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

  @ViewChild('recorderRef')
  recorderRef!: ElementRef<HTMLVideoElement>
  recorderEl!: HTMLVideoElement

  @ViewChild('recordedRef')
  recordedRef!: ElementRef<HTMLVideoElement>
  recordedEl!: HTMLVideoElement

  constructor(readonly dialog: MatDialog, readonly timeline: Timeline) {
    super(dialog, timeline)
  }

  async getMedia({
    audio,
    video,
  }: MediaStreamConstraints): Promise<MediaStream> {
    const stream = new MediaStream()
    const device = navigator.mediaDevices
    const user = await device.getUserMedia({ audio })
    const display = await device.getDisplayMedia({ video })
    stream.addTrack(display.getTracks()[0])
    stream.addTrack(user.getTracks()[0])
    return stream
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

  ngOnDestroy(): void {
    super.destroy()
  }
}
