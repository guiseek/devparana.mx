export class BlobFactory {
  static fromFS({ buffer }: Uint8Array, format: File['type']) {
    return new Blob([buffer], { type: format })
  }

  static fromArray(blobs: Blob[], format: File['type']) {
    return new Blob(blobs, { type: format })
  }

  static toURL(blob: Blob) {
    return URL.createObjectURL(blob)
  }
}
