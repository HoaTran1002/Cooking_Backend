import mongoose, { Schema } from 'mongoose'
import { imageSchema } from './course.models'
import { IChef } from '~/interfaces/chef.interface'

const chef = new Schema<IChef>({
  name: { type: String },
  description: { type: String },
  slogan: { type: String },
  role: { type: String },
  image: { type: imageSchema }
})
export default mongoose.model('Chef', chef)
