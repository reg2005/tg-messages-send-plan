import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Message from 'App/Models/Message'

export default class MessagesController {
  public async send(ctx: HttpContextContract) {
    const req = await ctx.request.validate({
      schema: schema.create({
        apiKey: schema.string({ trim: true }, [rules.minLength(10), rules.maxLength(1024)]),
        channelId: schema.string(),
        message: schema.string({ trim: true }, [rules.minLength(1), rules.maxLength(999999999999)]),
      }),
    })
    const message = await Message.create({
      ip: ctx.request.ip(),
      ...req,
    })
    // senderInstance.sendMessage(message)
    return { message }
  }
}
