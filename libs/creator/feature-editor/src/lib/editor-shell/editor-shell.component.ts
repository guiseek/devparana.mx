import { CanvasEditorComponent } from '../canvas-editor/canvas-editor.component'
import { Component, AfterViewInit, ViewChild } from '@angular/core'
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'devpr-editor-shell',
  templateUrl: './editor-shell.component.html',
  styleUrls: ['./editor-shell.component.scss'],
})
export class EditorShellComponent implements AfterViewInit {
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

  constructor(private _fb: FormBuilder) { }

  ngAfterViewInit(): void {
    const renderEl = this.canvasEditor.renderEl
    renderEl.onclick = ({ offsetX, offsetY }) => {
      const renderCtx = renderEl.getContext('2d')
      if (renderCtx) {
        const [r, g, b] = renderCtx.getImageData(offsetX, offsetY, 1, 1).data

        const red = { min: r - 50, max: r + 50 }
        const green = { min: g - 50, max: g + 50 }
        const blue = { min: b - 50, max: b + 50 }

        this.form.patchValue({ red, green, blue })
      }
    }
    this.canvasEditor.recordedEl.onplay = () => {
      this.timerCallback()
    }
  }

  timerCallback() {
    const video = this.canvasEditor.recordedEl
    if (video.paused || video.ended) {
      return
    }
    this.computeFrame()
    let self = this
    setTimeout(() => self.timerCallback(), 10)
  }

  computeFrame() {
    const { recordedEl, canvasEl, renderEl } = this.canvasEditor
    const canvasCtx = canvasEl.getContext('2d')
    const renderCtx = renderEl.getContext('2d')

    if (canvasCtx && renderCtx) {

      canvasCtx.drawImage(recordedEl, 0, 0, 1920, 1080)

      let frame = canvasCtx?.getImageData(0, 0, 1920, 1080)

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
