export class BlobFactory {
  static fromFS({ buffer }: Uint8Array, format: File['type']) {
    return new Blob([buffer], { type: format })
  }

  static toURL(blob: Blob) {
    URL.createObjectURL(blob)
  }
}
