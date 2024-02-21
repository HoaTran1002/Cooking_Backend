/* eslint-disable no-constant-condition */
import mongoose, { Schema } from 'mongoose'
import { imageSchema } from './course.models'
import { IChef } from '~/interfaces/chef.interface'

const chef = new Schema<IChef>({
  position: { type: Number, default: 0 },
  name: { type: String },
  description: { type: String },
  slogan: { type: String },
  role: { type: String },
  image: { type: imageSchema }
})
chef.pre('save', async function (next) {
  try {
    if (this.isNew) {
      let newPosition = 1
      const highestCourse = await mongoose.model('Chef').findOne({}, 'position').sort({ position: -1 }).exec()
      if (highestCourse) {
        newPosition = highestCourse.position + 1
      }

      const existingCourse = await mongoose.model('Chef').findOne({ position: newPosition })
      if (existingCourse) {
        let i = 1
        while (true) {
          const testPosition = newPosition + i
          const courseWithSamePosition = await mongoose.model('Chef').findOne({ position: testPosition })
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
export default mongoose.model('Chef', chef)
