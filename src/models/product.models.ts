import { string } from 'joi'
import mongoose, { Schema } from 'mongoose'
import { IProduct } from '~/interfaces/product.interface'
import { imageSchema, videoSchema } from './course.models'

const product = new Schema<IProduct>({
  name: { type: String },
  level: { type: String },
  note: { type: String },
  category: { type: String },
  images: { type: [imageSchema] },
  videos: { type: [videoSchema] },
  timeLearning: [String],
  idCourse: { type: String },
  idCategory: { type: String }
})

export default mongoose.model('ProductsModels', product)
