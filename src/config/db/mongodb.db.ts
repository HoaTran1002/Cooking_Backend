import mongoose, { Error } from 'mongoose'
import { env } from '../env.config'

export const connectDB = () => {
  const mongoDbUri = `mongodb://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.MONGODB_ADDRESS}/Cooking`

  mongoose
    .connect(mongoDbUri, {
      authSource: 'admin'
    })
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((err: Error) => {
      console.error('Error connecting to MongoDB:', err)
      throw new Error('connect failed')
    })
}
