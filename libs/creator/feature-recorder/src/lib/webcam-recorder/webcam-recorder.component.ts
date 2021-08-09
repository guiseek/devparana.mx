import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MimeType, RecorderBase } from '../base/recorder-base';
import { MatDialog } from '@angular/material/dialog';


@Component({
  templateUrl: './webcam-recorder.component.html',
  styleUrls: ['./webcam-recorder.component.scss']
})
export class WebcamRecorderComponent extends RecorderBase implements AfterViewInit {
  mediaRecorder!: MediaRecorder;
  mediaStream!: MediaStream;

  mimeType: MimeType | undefined;

  constraints = {
    audio: true,
    video: {
      width: {
        ideal: 640,
        max: 640
      },
      height: {
        ideal: 480,
        max: 480
      },
      framerate: 60
    }
  };

  @ViewChild('recorder')
  recorderRef!: ElementRef<HTMLVideoElement>
  recorderEl!: HTMLVideoElement

  @ViewChild('recorded')
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
}
