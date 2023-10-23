import mongoose, { Error } from 'mongoose'

export const connnectDB = () => {
  const mongoDbUri = 'mongodb://mongo_db:27017/Cooking'
  mongoose
    .connect(mongoDbUri)
    .then((): void => {
      console.log('connect success!')
    })
    .catch((err: Error): void => {
      console.log('connect failed:', err)
    })
}
