/// <reference lib="webworker" />

addEventListener('message', ({ data }: MessageEvent<File>) => {
  const response = `worker response to ${data}`;
  postMessage(response)
});
