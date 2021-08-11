import {
  Component,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { RecorderBase } from '@devparana/creator/ui-shared'

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

  @ViewChild('recorderRef')
  recorderRef!: ElementRef<HTMLVideoElement>
  recorderEl!: HTMLVideoElement

  @ViewChild('recordedRef')
  recordedRef!: ElementRef<HTMLVideoElement>
  recordedEl!: HTMLVideoElement

  getMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
    throw new Error('Method not implemented.')
  }

  constructor(readonly dialog: MatDialog) {
    super(dialog)
  }

  ngAfterViewInit(): void {}

  ngOnDestroy() {}
}
