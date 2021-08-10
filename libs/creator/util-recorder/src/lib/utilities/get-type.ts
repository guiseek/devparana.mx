export function getExtByMimeType(mimeType: string) {
  switch (mimeType) {
    case 'video/webm':
      return 'webm'
    case 'video/mp4':
      return 'mp4'
    default:
      return null
  }
}

export function getType({ type }: Blob | File) {
  let mimeType: string | null
  mimeType = getExtByMimeType(type)
  return { type: type, mimeType }
}
