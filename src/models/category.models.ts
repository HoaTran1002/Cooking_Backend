import mongoose, { Schema } from 'mongoose'
import { ICategory } from '~/interfaces/category.interface'

const category = new Schema<ICategory>({
  name: { type: String },
  idCourse: { type: String }
})
export default mongoose.model('Category', category)
