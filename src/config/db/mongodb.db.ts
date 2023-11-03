import mongoose, { Error } from 'mongoose'

export const connnectDB = () => {
  const mongoDbUri = 'mongodb://127.0.0.1:27017/Cooking'
  mongoose
    .connect(mongoDbUri)
    .then((): void => {
      console.log('connect success!')
    })
    .catch((err: Error): void => {
      console.log('connect failed:', err)
    })
}
