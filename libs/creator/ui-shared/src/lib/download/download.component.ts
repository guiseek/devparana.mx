import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Component, Inject, OnInit } from '@angular/core'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import {
  BlobFactory,
  RecorderFactory,
  Transcoder,
} from '@devparana/creator/util-recorder'

let ffmpeg: FFmpeg | null = null

@Component({
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
})
export class DownloadComponent implements OnInit {
  link!: HTMLAnchorElement
  mimeType!: string

  constructor(
    readonly transcoder: Transcoder,
    private readonly ref: MatDialogRef<DownloadComponent>,
    @Inject(MAT_DIALOG_DATA) private recordedBlobs: Blob[] = []
  ) {}

  ngOnInit(): void {
    const type = RecorderFactory.mimeType
    const blobs = this.recordedBlobs
    if (type && blobs.length) {
      const blob = BlobFactory.fromArray(blobs, type)
      this.transcoder.fromBlob(blob).then((response) => {
        console.log(response)
      })
    }
  }

  onCancel() {
    this.ref.close()
  }
}
