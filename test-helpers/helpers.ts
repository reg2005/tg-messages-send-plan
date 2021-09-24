// import Supertest from 'supertest'
// import _ from 'lodash'
// import Redis from '@ioc:Adonis/Addons/Redis'
// import { rollbackMigrations, runMigrations, runSeeds } from './'
// export const TEST_BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
// export const supertest = () => {
//   const apiClient = Supertest.agent(TEST_BASE_URL)
//   for (const method of ['get', 'del', 'post', 'delete', 'put', 'patch']) {
//     const methodOld = apiClient[method]
//     apiClient[method] = (...args) => {
//       const req = methodOld.apply(apiClient, args)
//       const assrt = req._assertStatus
//       req._assertStatus = (status, res) => {
//         const err: Error = assrt.call(req, status, res)
//         if (err) {
//           const errMessage = err + ' ' + res.req.method + ' ' + res.req.path + ' ' + res.text
//           const newErr = new Error(errMessage)
//           newErr.stack = errMessage
//           return newErr
//         }
//       }
//       return req
//     }
//   }
//   return apiClient
// }

// export async function before() {
//   await Redis.flushall()
//   await rollbackMigrations()
//   await runMigrations()
//   await runSeeds()
// }
// export async function after() {
//   // await rollbackMigrations()
// }
