import { CountdownComponent, RecorderBase } from '@devparana/creator/ui-shared'
import { MatDialog } from '@angular/material/dialog'
import {
  Component,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core'

@Component({
  selector: 'devpr-canvas-editor',
  templateUrl: './canvas-editor.component.html',
  styleUrls: ['./canvas-editor.component.scss'],
})
export class CanvasEditorComponent
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

  @ViewChild(CountdownComponent)
  countdown!: CountdownComponent

  @ViewChild('canvasRef')
  canvasRef!: ElementRef<HTMLCanvasElement>
  canvasEl!: HTMLCanvasElement

  @ViewChild('renderRef')
  renderRef!: ElementRef<HTMLCanvasElement>
  renderEl!: HTMLCanvasElement

  @ViewChild('recorderRef')
  recorderRef!: ElementRef<HTMLVideoElement>
  recorderEl!: HTMLVideoElement

  @ViewChild('recordedRef')
  recordedRef!: ElementRef<HTMLVideoElement>
  recordedEl!: HTMLVideoElement

  getMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia(constraints)
  }

  constructor(readonly dialog: MatDialog) {
    super(dialog)
  }

  ngAfterViewInit(): void {
    this.canvasEl = this.canvasRef.nativeElement
    this.renderEl = this.renderRef.nativeElement

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

  download() {}

  ngOnDestroy(): void {
    super.destroy()
  }
}
