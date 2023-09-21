import mongoose, { Schema } from 'mongoose'
interface IChef {
  name?: string
  birthday?: string
  image?: string
  address?: string
  phoneNumber?: string
  email?: string
  skill?: string
  achievements?: string
}

const chef = new Schema<IChef>({
  name: { type: String },
  birthday: { type: String },
  image: { type: String },
  address: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  skill: { type: String },
  achievements: { type: String }
})
export default mongoose.model('Chef', chef)
