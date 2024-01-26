import { string } from 'joi'
import mongoose, { Schema } from 'mongoose'
import { IImage, IVideo } from '~/interfaces/course.interface'
import { IProduct } from '~/interfaces/product.interface'

export const imageSchema = new Schema<IImage>({
  url: { type: String },
  key: { type: String }
})

export const videoSchema = new Schema<IVideo>({
  url: { type: String },
  key: { type: String }
})
const product = new Schema<IProduct>({
  name: { type: String },
  note: { type: String },
  images: { type: [imageSchema] },
  videos: { type: [videoSchema] },
  timeLearning: { type: String },
  idCourse: { type: String },
  idCategory: { type: String }
})

export default mongoose.model('ProductsModels', product)
