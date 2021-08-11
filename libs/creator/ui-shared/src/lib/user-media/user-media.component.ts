import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'devpr-user-media',
  templateUrl: './user-media.component.html',
  styleUrls: ['./user-media.component.scss'],
})
export class UserMediaComponent {
  @Input() active?: boolean

  @Output() onUserMedia = new EventEmitter<MediaStream>()

  public crashed?: string

  onClick() {
    try {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((s) => this.onUserMedia.emit(s))
    } catch ({ message }) {
      this.crashed = message
    }
  }
}
