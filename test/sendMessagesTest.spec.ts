import test from 'japa'
const log = require('debug')('TEST')
import { supertest } from './../test-helpers'
test.group('sendMessagesTest', (group) => {
  test('White bit get balance', async (assert) => {
    const data = await supertest()
      .post('/api/send')
      .send({ message: 'dfsdf', channelId: '-1231231', apiKey: '2342424234234234' })
    console.log(data.body)
    assert.equal(data.status, 200)
  }).timeout(30000)
})
