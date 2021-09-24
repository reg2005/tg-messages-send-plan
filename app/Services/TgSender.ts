import Message from 'App/Models/Message'
import Axios, { AxiosInstance } from 'axios'
import axiosRetry, { exponentialDelay } from 'axios-retry'
import { DateTime } from 'luxon'
import { InMemoryQueue } from './InMemoryQueue'
export function chunkSubstr(str: string, size: number) {
  console.log(str.length)
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }

  return chunks
}
export class TgSenderClass {
  private axios: AxiosInstance
  private queue = new InMemoryQueue()
  constructor() {
    this.axios = Axios
    axiosRetry(this.axios, {
      retries: 5,
      retryDelay: (retryCount, error) => {
        const tgRetryAfter = error?.response?.data?.parameters?.retry_after
        console.log('tgRetryAfter', tgRetryAfter)
        return tgRetryAfter ? tgRetryAfter * 1000 : retryCount * 30000
      },
      retryCondition: (retryCount) => {
        // console.log('data', JSON.stringify(c.response?.data?.parameters?.retry_after, null, 2))
        return true
      },
    })
  }
  public async _sendMessage({
    apiKey,
    chatId,
    message,
  }: {
    apiKey: string
    chatId: string
    message: string
  }) {
    await this.queue.enqueue(async () => {
      const msg = `message send to ${chatId} with apiKey: ${apiKey.substr(0, 5)}***`
      console.log(`TELEGRAM START: ${msg}`)
      try {
        await this.axios.get(
          `https://api.telegram.org/bot${apiKey}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${encodeURIComponent(
            message
          )}`
        )
        console.log(`TELEGRAM END: ${msg}`)
      } catch (error) {
        console.log(`TELEGRAM END WITH ERROR: ${msg}`)
        throw error
      }
      // await sleep('1 s')
    })
  }
  public async sendMessage(messageItem: Message) {
    const timeString = DateTime.local().toISO()
    const appendString = `\n- - - - \n<pre>origTime: ${messageItem.createdAt.toISO()}\nsentTime: ${timeString}</pre>\n#msg_${
      messageItem.id
    }\nchunk_placeholder`
    const messageArray = chunkSubstr(messageItem.message, 4096 - appendString.length - 20)
    console.log(`Total chunks of message ${messageItem.id}: ${messageArray.length}`)
    try {
      await Promise.all(
        messageArray.map((message, key) => {
          message = `${message}${appendString}`.replace(
            'chunk_placeholder',
            `chunk: ${key + 1}/${messageArray.length}`
          )
          return this._sendMessage({
            apiKey: messageItem.apiKey,
            chatId: messageItem.channelId,
            message,
          })
        })
      )
    } catch (error) {
      console.error(error)
      messageItem.errorMessage = error?.message || null
    }
    messageItem.sentAt = DateTime.local()
    await messageItem.save()
  }
  public async sendMessages() {
    const messageItems = await Message.query()
      .whereNull('sent_at')
      .orderBy('created_at', 'desc')
      .limit(3)
    for (const messageItem of messageItems) {
      await this.sendMessage(messageItem)
    }
    return true
  }
}
