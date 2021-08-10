import '@devparana/creator/util-typings'
import { Observable } from 'rxjs'

export class RecorderFactory {
  static createState(recorder: MediaRecorder) {
    return new Observable<RecordingState | null>((subs) => {
      recorder.onstart = () => {
        subs.next(recorder.state)
      }
      recorder.onpause = () => {
        subs.next(recorder.state)
      }
      recorder.onresume = () => {
        subs.next(recorder.state)
      }
      recorder.onstop = () => {
        subs.next(recorder.state)
      }

      subs.next(null)
    })
  }

  static get mimeType() {
    const mimeTypes: string[] = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
      'video/mp4',
    ]

    const mimeType = mimeTypes.find((type) => {
      return MediaRecorder.isTypeSupported(type)
    })

    if (!mimeType) {
      console.error('MediaRecorder support')
    }

    return mimeType
  }

  static create(stream: MediaStream) {
    const mimeType = RecorderFactory.mimeType
    return new MediaRecorder(stream, { mimeType })
  }
}
