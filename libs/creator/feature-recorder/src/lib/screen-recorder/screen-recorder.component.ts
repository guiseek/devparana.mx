import { Transcoder } from '@devparana/creator/util-recorder'
import { Subject, interval, BehaviorSubject } from 'rxjs'
import { finalize, map, take } from 'rxjs/operators'
import { MatDialog } from '@angular/material/dialog'
import './../../index.d'
import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core'

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

  private _countdown = new Subject<number>()
  public countdown$ = this._countdown.asObservable()

  mimeType: string | undefined
  mediaStream: MediaStream | undefined
  mediaRecorder: MediaRecorder | undefined
  recordedBlobs: Blob[] = []

  constructor(
    readonly transcoder: Transcoder,
    private _dialog: MatDialog
  ) { }

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

  start() {
    interval(1000)
      .pipe(
        take(5),
        map((v) => 5 - v),
        finalize(() => this.record())
      )
      .subscribe((v) => this._countdown.next(v))
  }

  stop() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop()
      this._completed.next(true)
    }
  }

  record() {
    this.recordedBlobs = []

    const mimeTypes = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
      'video/mp4',
    ]

    this.mimeType = mimeTypes.find((type) => {
      return MediaRecorder.isTypeSupported(type)
    })

    if (!this.mimeType) {
      console.error('MediaRecorder support')
    }

    if (this.mediaStream) {
      this.mediaRecorder = new MediaRecorder(this.mediaStream, {
        mimeType: this.mimeType,
      })
      this.mediaRecorder.ondataavailable = ({ data }: BlobEvent) => {
        if (data && data.size > 0) this.recordedBlobs.push(data)
      }

      this.mediaRecorder.start()

      this.mediaRecorder.onstop = () => {
        this.mediaStream?.getTracks().forEach(track => track.stop())
        const blob = new Blob(this.recordedBlobs, { type: this.mimeType })
        this.recordedEl.src = URL.createObjectURL(blob)
        this.recordedEl.controls = true
        this.recordedEl.play()
        // this._dialog.open(DownloadComponent, { data })
      }
    }
  }

  ngOnDestroy(): void { }
}
