class WorkerFactory {
  private worker: Worker

  constructor(name: string) {
    this.worker = new Worker(`/js/worker/${name}.worker.js`)
  }

  post(params: Record<string, any>) {
    return new Promise((resolve, reject) => {
      this.worker.addEventListener('message', (event) => {
        resolve(event.data)
      })

      this.worker.addEventListener('error', reject)
      this.worker.addEventListener('messageerror', reject)

      this.worker.postMessage(params)
    })
  }
}

export const useWorker = (name: string) => new WorkerFactory(name)
