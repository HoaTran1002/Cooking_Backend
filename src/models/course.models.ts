/* eslint-disable no-constant-condition */
import mongoose, { Schema } from 'mongoose'
import { ICourses, ICourse, IImage, IRoadmap, IVideo } from '~/contract/interfaces/course.interface'
import { deleteFile } from '~/services/file.service'
import productModels from './product.models'
import { deleteByIdProduct } from '~/services/product.service'
import categoryModels from './category.models'
import { removeCategory } from '~/services/category.service'
import { IProduct } from '~/contract/interfaces/product.interface'

export const imageSchema = new Schema<IImage>({
  url: { type: String },
  key: { type: String }
})

export const videoSchema = new Schema<IVideo>({
  url: { type: String },
  key: { type: String }
})
const roadmapSchema = new Schema<IRoadmap>({
  name: { type: String, default: 'null' },
  startTime: { type: Date },
  endTime: { type: Date },
  skill: { type: String, default: 'null' },
  knowledge: { type: String, default: 'null' }
})
export const course = new Schema<ICourse>({
  position: { type: Number, default: 0 },
  title: { type: String, default: 'null' },
  description: { type: String, default: 'null' },
  images: { type: [imageSchema] },
  videos: { type: [videoSchema] },
  roadmaps: [roadmapSchema],
  price: { type: Number, default: 0 },
  discountPrice: { type: Number, default: 0 },
  discountPercentage: { type: Number, default: 0 },
  timeCreate: { type: Date, default: Date.now },
  timeUpdate: { type: Date }
})
course.pre('save', async function (next) {
  try {
    if (this.isNew) {
      let newPosition = 1
      const highestCourse = await mongoose.model('Courses').findOne({}, 'position').sort({ position: -1 }).exec()
      if (highestCourse) {
        newPosition = highestCourse.position + 1
      }

      const existingCourse = await mongoose.model('Courses').findOne({ position: newPosition })
      if (existingCourse) {
        let i = 1
        while (true) {
          const testPosition = newPosition + i
          const courseWithSamePosition = await mongoose.model('Courses').findOne({ position: testPosition })
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

course.pre('findOneAndDelete', async function (next) {
  try {
    const doc = await this.model.findOne(this.getQuery())
    const products = await productModels.find({ idCategory: doc._id })
    if (products.length > 0) {
      products.map(async (product) => {
        await deleteByIdProduct(new mongoose.Types.ObjectId(product.id).toString())
      })
    }
    const categories = await categoryModels.find({ idCourse: doc._id })
    if (categories.length > 0) {
      categories.map(async (category) => {
        await removeCategory(new mongoose.Types.ObjectId(category.id).toString())
      })
    }
    next()
  } catch (error: any) {
    next(error)
  }
})
export default mongoose.model('Courses', course)
