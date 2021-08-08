import { Transcoder } from '@devparana/creator/util-recorder'
import { Component } from '@angular/core'

@Component({
  selector: 'devpr-video-transcoder',
  templateUrl: './video-transcoder.component.html',
  styleUrls: ['./video-transcoder.component.scss'],
  providers: [Transcoder],
})
export class VideoTranscoderComponent {
  hovered = false

  constructor(readonly transcoder: Transcoder) {}

  onChange(file: File) {
    this.transcoder.load(file).then((url) => {
      console.log(url)
    })
  }
}
