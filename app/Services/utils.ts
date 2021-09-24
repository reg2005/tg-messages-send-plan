import ms, { StringValue } from 'ms'
import _ from 'lodash'
const sleepLog = require('debug')('app:utils:sleeplog')

export const diffHrTime = (startedAt: [number, number]) => {
  const diff = process.hrtime(startedAt)
  return (diff[0] * 1e9 + diff[1]) / 1e6
}
export const sleep = async (millisecondsHuman: number | StringValue) => {
  let milliseconds: number
  if (typeof millisecondsHuman === 'string') {
    milliseconds = ms(millisecondsHuman)
  } else {
    milliseconds = millisecondsHuman
  }
  sleepLog(`start sleep: ${millisecondsHuman}`)
  if (milliseconds === Infinity) {
    await new Promise((_res) => {})
  }
  await new Promise((res) => setTimeout(res, milliseconds as number, null))
  sleepLog(`end sleep: ${millisecondsHuman}`)
}
