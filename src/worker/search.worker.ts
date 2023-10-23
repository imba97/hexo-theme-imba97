const receivedMessage = (event: MessageEvent) => {
  self.postMessage('test content')
}

self.addEventListener('message', receivedMessage)
