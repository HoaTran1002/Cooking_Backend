import mongoose from 'mongoose'

export const connnectDB = () => {
  mongoose
    .connect('mongodb://root:29102002@localhost:27017', { dbName: 'Cooking' })
    .then((): void => {
      console.log('connect success!')
    })
    .catch((): void => {
      console.log('connect failed')
    })
}
