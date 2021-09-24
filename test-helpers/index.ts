import execa from 'execa'
import Supertest from 'supertest'

export async function runMigrations() {
  await execa.node('ace', ['migration:run'], { stdout: process.stdout, stderr: process.stderr })
}
export async function runSeeds() {
  await execa.node('ace', ['db:seed'])
}

export async function rollbackMigrations() {
  await execa.node('ace', ['migration:rollback'])
}

export const TEST_BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
export const supertest = () => {
  const apiClient = Supertest.agent(TEST_BASE_URL)
  return apiClient
}
