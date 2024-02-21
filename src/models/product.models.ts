/* eslint-disable no-constant-condition */
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
  position: { type: Number, default: 0 },
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
product.pre('save', async function (next) {
  try {
    if (this.isNew) {
      let newPosition = 1
      const highestCourse = await mongoose.model('Product').findOne({}, 'position').sort({ position: -1 }).exec()
      if (highestCourse) {
        newPosition = highestCourse.position + 1
      }

      const existingCourse = await mongoose.model('Product').findOne({ position: newPosition })
      if (existingCourse) {
        let i = 1
        while (true) {
          const testPosition = newPosition + i
          const courseWithSamePosition = await mongoose.model('Product').findOne({ position: testPosition })
          if (!courseWithSamePosition) {
            newPosition = testPosition
            break
          }
          i++
        }
      }

      this.position = newPosition
    }
    next()
  } catch (error: any) {
    next(error)
  }
})

export default mongoose.model('Product', product)
