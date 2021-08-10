import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core'
import { RecorderBase } from '../base/recorder-base'
import { MatDialog } from '@angular/material/dialog'
import { BehaviorSubject } from 'rxjs'

type RecorderState = 'paused' | 'started' | 'stoped'

@Component({
  templateUrl: './webcam-recorder.component.html',
  styleUrls: ['./webcam-recorder.component.scss'],
})
export class WebcamRecorderComponent
  extends RecorderBase
  implements AfterViewInit, OnDestroy {
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

  constructor(readonly dialog: MatDialog) {
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

  ngOnDestroy(): void {
    super.destroy()
  }
}
