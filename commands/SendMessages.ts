import { BaseCommand } from '@adonisjs/core/build/standalone'
import { sleep } from 'App/Services/utils'
import { runMigrations } from '../test-helpers'

export default class SendMessages extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'send:messages'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }

  public async run() {
    this.logger.info('Hello world!')
    await runMigrations()
    const { TgSenderClass } = await import('App/Services/TgSender')
    const senderInstance = new TgSenderClass()
    for (;;) {
      console.time('send messages iteration')
      await senderInstance.sendMessages()
      console.timeEnd('send messages iteration')
      await sleep('1 second')
    }
  }
}
