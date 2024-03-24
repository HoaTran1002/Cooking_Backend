import mongoose, { Error } from 'mongoose'
import { env } from '../env.config'
import dotenv from 'dotenv'
dotenv.config()
export const connectDB = () => {
  const mongoDbUri =
    process.env.NODE_ENV == 'development'
      ? `mongodb://localhost:27017/Cooking`
      : `mongodb://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.MONGODB_ADDRESS}/Cooking`

  mongoose
    .connect(mongoDbUri, {
      authSource: 'admin'
    })
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((error: any) => {
      console.error('Error connecting to MongoDB:', error)
      if (error instanceof mongoose.Error) {
        if (error.name === 'MongoTimeoutError') {
          console.error('Timeout error occurred. Please check your network connection or MongoDB server.')
        } else if (error.name === 'MongoNetworkError') {
          console.error('Network error occurred. Please ensure MongoDB server is running.')
        } else {
          console.error('Other Mongoose error occurred:', error.message)
        }
      } else {
        console.error('Other error occurred:', error.message)
      }
      throw new Error('Connect failed')
    })
}
