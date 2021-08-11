import 'jest-preset-angular/setup-jest'

declare global {
  interface MediaDevices extends EventTarget {
    getDisplayMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>
  }
}

Object.defineProperties(window.navigator, {
  mediaDevices: {
    value: {
      getUserMedia: (...params: unknown[]) => {
        return Promise.resolve()
      },
      getDisplayMedia: (...params: unknown[]) => {
        return Promise.resolve()
      },
    },
  },
})
