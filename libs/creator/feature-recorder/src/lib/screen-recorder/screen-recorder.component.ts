import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import './../../index.d'

@Component({
  selector: 'devpr-screen-recorder',
  templateUrl: './screen-recorder.component.html',
  styleUrls: ['./screen-recorder.component.scss'],
})
export class ScreenRecorderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('recorder')
  recorderRef!: ElementRef<HTMLVideoElement>
  recorderEl!: HTMLVideoElement

  @ViewChild('recorded')
  recordedRef!: ElementRef<HTMLVideoElement>
  recordedEl!: HTMLVideoElement

  private _active = new BehaviorSubject<boolean>(false)
  public active$ = this._active.asObservable()

  private _completed = new BehaviorSubject<boolean>(false)
  public completed$ = this._completed.asObservable()

  mimeType: string | undefined
  mediaStream: MediaStream | undefined
  mediaRecorder: MediaRecorder | undefined
  recordedBlobs: Blob[] = []

  constructor() {}

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

  capture() {
    const constraints = { video: true, audio: true }
    navigator.mediaDevices.getDisplayMedia(constraints).then((stream) => {
      this.recorderEl.srcObject = stream
      this.mediaStream = stream
    })
  }

  record() {
    this.recordedBlobs = []
    const mimeTypes = [
      'video/mp4',
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
    ]

    this.mimeType = mimeTypes.find((type) => {
      return MediaRecorder.isTypeSupported(type)
    })

    console.log(this.mimeType)

    if (this.recorderEl.srcObject instanceof MediaStream) {
      this.mediaRecorder = new MediaRecorder(this.recorderEl.srcObject, {
        mimeType: this.mimeType,
      })

      this.mediaRecorder.ondataavailable = ({ data }) => {
        if (data && data.size > 0) {
          this.recordedBlobs.push(data)
        }
      }

      this.mediaRecorder.start()

      this.mediaRecorder.onstop = () => {
        this.recorderEl.pause()
        if (this.mediaStream) {
          this.mediaStream?.getTracks().forEach(track => {
            track.stop()
          })
        }

      }
    }
  }

  ngOnDestroy(): void {

  }
}
