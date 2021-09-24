import { sleep } from './utils'

export class InMemoryQueue {
  private queue: {
    promise: () => Promise<any>
    resolve: (value: unknown) => void
    reject: (value: unknown) => void
  }[] = []

  private workingOnPromise: boolean = false

  public enqueue(promise: () => Promise<any>) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        promise,
        resolve,
        reject,
      })
      this.dequeue()
    })
  }

  public dequeue() {
    if (this.workingOnPromise) {
      return false
    }
    const item = this.queue.shift()
    if (!item) {
      return false
    }
    try {
      this.workingOnPromise = true
      Promise.race([
        item.promise(),
        sleep(30000000).then(() => {
          throw new Error('MEM QUEUE request timeout')
        }),
      ])
        .then((value) => {
          this.workingOnPromise = false
          item.resolve(value)
          this.dequeue()
        })
        .catch((err) => {
          this.workingOnPromise = false
          item.reject(err)
          this.dequeue()
        })
    } catch (err) {
      this.workingOnPromise = false
      item.reject(err)
      this.dequeue()
    }
    return true
  }
}
