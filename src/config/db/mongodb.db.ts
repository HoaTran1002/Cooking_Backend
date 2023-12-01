import mongoose, { Error } from 'mongoose'
import { env } from '../env.config'

export const connnectDB = () => {
  const mongoDbUri = `mongodb://${env.MONGODB_ADDRESS}/Cooking`
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
