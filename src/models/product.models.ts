import { string } from 'joi'
import mongoose, { Schema } from 'mongoose'
import { IImage, IVideo } from '~/interfaces/course.interface'
import { IHightLight, IProduct } from '~/interfaces/product.interface'
import tourModels from './tour.models'
import tourController from '~/controllers/tour.controller'
import { ServicesFactory } from '~/services/factory.service'

export const imageSchema = new Schema<IImage>({
  url: { type: String },
  key: { type: String }
})

export const videoSchema = new Schema<IVideo>({
  url: { type: String },
  key: { type: String }
})
export const hightLightSchema = new Schema<IHightLight>({
  title: { type: String },
  content: { type: String }
})

const product = new Schema<IProduct>({
  name: { type: String },
  note: { type: String },
  images: { type: [imageSchema] },
  videos: { type: [videoSchema] },
  timeLearning: { type: String },
  idCourse: { type: String },
  idCategory: { type: String },
  linkYoutube: { type: String },
  title: { type: String },
  description: { type: String },
  price: { type: String },
  position: { type: String },
  executionTime: { type: String },
  numberOfAttendees: { type: Number },
  languageOfInstruction: { type: String },
  serviceDetailsWhenStudying: { type: String },
  linkMenu: { type: String },
  hightlight: [hightLightSchema],
  requiredWhenStudying: { type: String },
  content_review: { type: String },
  listScript: [{ type: String }]
})

export default mongoose.model('ProductsModels', product)
