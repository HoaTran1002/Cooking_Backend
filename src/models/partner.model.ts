import mongoose, { Schema } from 'mongoose'
import { IPartner, IPartnerProduct } from '~/contract/interfaces/partner.interface'
import { imageSchema } from './product.models'
import { deleteFile } from '~/services/file.service'
const partnerProduct = new Schema<IPartnerProduct>({
  name: { type: String },
  image: { type: imageSchema, default: {} },
  description: { type: String },
  position: { type: Number, default: 0 }
})
const partner = new Schema<IPartner>({
  name: { type: String },
  logo: { type: imageSchema, default: {} },
  description: { type: String },
  position: { type: Number, default: 0 },
  products: { type: [partnerProduct], default: [] }
})
partnerProduct.pre('findOneAndDelete', async function (next) {
  try {
    const doc = (await this.model.findOne(this.getQuery())) as IPartnerProduct
    if (doc.image) {
      await deleteFile(doc.image.url)
    }
    next()
  } catch (error: any) {
    next(error)
  }
})
partner.pre('findOneAndDelete', async function (next) {
  try {
    const doc = (await this.model.findOne(this.getQuery())) as IPartner
    if (doc.logo) {
      await deleteFile(doc.logo.url)
    }
    // Xoá tất cả các partnerProduct có trong danh sách sản phẩm của partner
    await mongoose.model('PartnerProduct').deleteMany({ _id: { $in: doc.products } })
    next()
  } catch (error: any) {
    next(error)
  }
})

partnerProduct.pre('save', async function (next) {
  try {
    if (this.isNew) {
      let newPosition = 1
      const highestCourse = await mongoose.model('partnerProduct').findOne({}, 'position').sort({ position: -1 }).exec()
      if (highestCourse) {
        newPosition = highestCourse.position + 1
      }

      const existingCourse = await mongoose.model('partnerProduct').findOne({ position: newPosition })
      if (existingCourse) {
        let i = 1
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const testPosition = newPosition + i
          const courseWithSamePosition = await mongoose.model('partnerProduct').findOne({ position: testPosition })
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
partner.pre('save', async function (next) {
  try {
    if (this.isNew) {
      let newPosition = 1
      const highestCourse = await mongoose.model('partner').findOne({}, 'position').sort({ position: -1 }).exec()
      if (highestCourse) {
        newPosition = highestCourse.position + 1
      }

      const existingCourse = await mongoose.model('partner').findOne({ position: newPosition })
      if (existingCourse) {
        let i = 1
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const testPosition = newPosition + i
          const courseWithSamePosition = await mongoose.model('partner').findOne({ position: testPosition })
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
export const partnerProductModel = mongoose.model('partnerProductModel', partnerProduct)
export const partnerModel = mongoose.model('partnerModel', partner)
