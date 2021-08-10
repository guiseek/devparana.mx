export class Timeline {
  video: HTMLVideoElement

  constructor() {
    this.video = document.createElement('video')
  }

  load(url: string) {
    const timeUpdate = () => {
      if (this.snapImage(url)) {
        this.video.removeEventListener('timeupdate', timeUpdate)
        this.video.pause()
      }
    }

    this.video.addEventListener('loadeddata', () => {
      if (this.snapImage(url)) {
        this.video.removeEventListener('timeupdate', timeUpdate)
      }
    })

    this.video.addEventListener('timeupdate', timeUpdate)
    this.video.preload = 'metadata'
    this.video.src = url
    this.video.muted = true
    this.video.playsInline = true
    this.video.play()
  }

  snapImage(url: string) {
    let canvas = document.createElement('canvas')
    canvas.width = this.video.videoWidth
    canvas.height = this.video.videoHeight
    const context = canvas.getContext('2d')

    context?.drawImage(this.video, 0, 0, canvas.width, canvas.height)

    let image = canvas.toDataURL()
    console.log(image)

    let success = image.length > 100000
    if (success) {
      let img = document.createElement('img')
      img.src = image
      document.getElementsByTagName('div')[0].appendChild(img)
      console.log(img)

      URL.revokeObjectURL(url)
    }

    return success
  }
}
