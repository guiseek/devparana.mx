import { CanvasEditorComponent } from '../canvas-editor/canvas-editor.component'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, AfterViewInit, ViewChild } from '@angular/core'
import { Navigation } from '@devparana/creator/ui-shared'
import { MatSidenav } from '@angular/material/sidenav'
import { map, shareReplay } from 'rxjs/operators'
import { FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs'

@Component({
  selector: 'devpr-editor-shell',
  templateUrl: './editor-shell.component.html',
  styleUrls: ['./editor-shell.component.scss'],
})
export class EditorShellComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  drawer!: MatSidenav

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    )

  @ViewChild(CanvasEditorComponent)
  canvasEditor!: CanvasEditorComponent

  form = this._fb.group({
    red: this._fb.group({
      min: [100],
      max: [150],
    }),
    green: this._fb.group({
      min: [100],
      max: [150],
    }),
    blue: this._fb.group({
      min: [100],
      max: [150],
    }),
  })

  constructor(
    private breakpointObserver: BreakpointObserver,
    readonly navigation: Navigation,
    private _fb: FormBuilder
  ) {}

  onFileChange(file: File) {
    const reader = file.stream().getReader()

    const readable = new ReadableStream<File>({
      async start(controller) {
        if (reader) {
          while (true) {
            const { done, value } = await reader.read()

            if (done) break

            if (value) controller.enqueue(value)
          }

          reader.releaseLock()
        }
        controller.close()
      },
    })

    readable.pipeTo(
      new WritableStream<File>({
        write(chunk) {
          console.log('Chunk ', chunk)
        },
      })
    )
  }

  ngAfterViewInit(): void {
    const renderEl = this.canvasEditor.renderEl
    renderEl.onclick = ({ offsetX, offsetY }) => {
      const renderCtx = renderEl.getContext('2d')
      if (renderCtx) {
        const { data } = renderCtx.getImageData(offsetX, offsetY, 1, 1)

        const red = { min: data[0] - 50, max: data[0] + 50 }
        const green = { min: data[1] - 50, max: data[1] + 50 }
        const blue = { min: data[2] - 50, max: data[2] + 50 }

        const rgb = { red, green, blue }
        this.form.patchValue(rgb)
        localStorage.setItem('rgb', JSON.stringify(rgb))
      }
    }
    this.canvasEditor.recorderEl.onplay = () => {
      console.log('play')
      const rgb = localStorage.getItem('rgb')
      if (rgb) {
        const value = JSON.parse(rgb)
        this.form.patchValue(value)
      }

      this.timerCallback()
    }
  }

  timerCallback() {
    const video = this.canvasEditor.recorderEl
    if (video.paused || video.ended) {
      return
    }
    this.computeFrame()
    setTimeout(() => this.timerCallback(), 10)
  }

  computeFrame() {
    const { recorderEl, canvasEl, renderEl } = this.canvasEditor
    const canvasCtx = canvasEl.getContext('2d')
    const renderCtx = renderEl.getContext('2d')

    if (canvasCtx && renderCtx) {
      canvasCtx.drawImage(recorderEl, 0, 0, 800, 600)

      let frame = canvasCtx.getImageData(0, 0, 800, 600)

      const { red, green, blue } = this.form.value

      if (frame) {
        let l = frame.data.length / 4

        for (let i = 0; i < l; i++) {
          let r = frame.data[i * 4 + 0]
          let g = frame.data[i * 4 + 1]
          let b = frame.data[i * 4 + 2]

          if (
            r > red.min &&
            r < red.max &&
            g > green.min &&
            g < green.max &&
            b < blue.max
          ) {
            frame.data[i * 4 + 3] = 0
          }
        }

        renderCtx.putImageData(frame, 0, 0)
      }
    }

    return
  }
}
