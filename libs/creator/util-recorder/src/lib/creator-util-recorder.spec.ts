import { createTranscoder } from './creator-util-recorder'

const mockFile = new File([], 'nome.webm', { type: 'video/webm' })

describe('creatorUtilRecorder', () => {
  it('should work', () => {
    expect(createTranscoder(mockFile)).toBeInstanceOf(Promise)
  })
})
