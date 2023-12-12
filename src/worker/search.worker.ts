const receivedMessage = (event: MessageEvent) => {
  const xhr = new XMLHttpRequest()

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText)
        self.postMessage(data)
      }
    }
  })

  xhr.open('GET', '/search.json')
  xhr.send()
}

self.addEventListener('message', receivedMessage)
