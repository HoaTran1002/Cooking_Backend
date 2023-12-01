import mongoose, { Error } from 'mongoose'
import { env } from '../env.config'

export const connnectDB = () => {
  const mongoDbUri = `mongodb://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.MONGODB_ADDRESS}`
  mongoose
    .connect(mongoDbUri)
    .then((): void => {
      console.log('connect success!')
    })
    .catch((err: Error): void => {
      console.log('connect failed:', err)
      throw new Error('connect failed')
    })
}
