import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public sentAt: DateTime

  @column()
  public apiKey: string

  @column()
  public errorMessage: string | null

  @column()
  public ip: string

  @column()
  public channelId: string

  @column()
  public message: string
}
