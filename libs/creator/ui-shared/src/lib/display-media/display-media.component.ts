import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'devpr-display-media',
  templateUrl: './display-media.component.html',
  styleUrls: ['./display-media.component.scss'],
})
export class DisplayMediaComponent {
  @Input() active?: boolean

  @Output() onDisplayMedia = new EventEmitter<MediaStream>()

  public crashed?: string

  private constraints = {
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

  async onClick() {
    try {
      const { video, audio } = this.constraints

      const stream = new MediaStream()
      const device = navigator.mediaDevices

      const user = await device.getUserMedia({ audio })
      const display = await device.getDisplayMedia({ video })

      stream.addTrack(display.getTracks()[0])
      stream.addTrack(user.getTracks()[0])

      this.onDisplayMedia.emit(stream)
    } catch ({ message }) {
      this.crashed = message
    }
  }
}
