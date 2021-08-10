import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core'
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
  implements AfterViewInit
{
  recorder!: MediaRecorder
  stream!: MediaStream

  mimeType: string | undefined

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

  private _state = new BehaviorSubject<RecordingState | null>(null)
  public state$ = this._state.asObservable()

  constructor(readonly dialog: MatDialog) {
    super(dialog)
  }

  getMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia(constraints)
  }

  ngAfterViewInit(): void {
    this.recorderEl = this.recorderRef.nativeElement
    this.recordedEl = this.recordedRef.nativeElement

    // super.capture()

    this.recorderEl.onplay = () => {
      this._active.next(true)
      this._state.next(this.recorder.state)
      console.log('onplay: ', this.recorder.state)
    }
    this.recorderEl.onpause = () => {
      this._active.next(false)
      const active = this._active.value
      const len = this.recordedBlobs.length
      this._completed.next(!active || len === 0)
      this._state.next(this.recorder.state)
      console.log('onpause: ', this.recorder.state)
    }
  }
}
