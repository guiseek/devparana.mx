import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { getCurrentDate } from '@devparana/creator/util-recorder'
import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg'
import { Component, Inject, OnInit } from '@angular/core'

let ffmpeg: FFmpeg | null = null

@Component({
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
})
export class DownloadComponent implements OnInit {
  link!: HTMLAnchorElement
  mimeType!: string

  constructor(
    private readonly ref: MatDialogRef<DownloadComponent>,
    @Inject(MAT_DIALOG_DATA) private recordedBlobs: Blob[] = []
  ) {}

  ngOnInit(): void {}

  transcode(format = 'mp4') {
    const blob = new Blob(this.recordedBlobs, { type: this.mimeType })

    if (ffmpeg === null) {
      ffmpeg = createFFmpeg({
        corePath: 'assets/ffmpeg/ffmpeg-core.js',
        log: true,
      })
    }

    const transcode = async () => {
      const time = ['-t', '2.5']
      const ss = ['-ss', '2.0']
      const out = ['-f', format]

      if (ffmpeg) {
        if (!ffmpeg.isLoaded()) {
          await ffmpeg.load()
        }

        ffmpeg.FS('writeFile', 'video.webm', await fetchFile(blob))

        const params = format === 'gif' ? [...time, ...ss, ...out] : [...out]

        await ffmpeg.run('-i', 'video.webm', ...params, 'video.' + format)

        const data = ffmpeg.FS('readFile', 'video.' + format)

        this.link.href = URL.createObjectURL(
          new Blob([data.buffer], { type: 'video/' + format })
        )
        this.link.download = getCurrentDate() + '.' + format
        this.link.click()
      }
    }
    transcode().then(() => {
      // span.textContent = format.toUpperCase()
      // target.disabled = false
    })
  }

  onCancel() {
    this.ref.close()
  }
}
