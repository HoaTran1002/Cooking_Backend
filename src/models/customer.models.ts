import mongoose, { Schema } from 'mongoose'
import { ICategoryServices, ICustomer, IServiceCustomer } from '~/contract/interfaces/customer.interface'
import { imageSchema } from './product.models'
import { deleteFile } from '~/services/file.service'

const servicesCustomer = new Schema<IServiceCustomer>({
  name: { type: String },
  description: { type: String },
  image: { type: imageSchema },
  position: { type: Number }
})
const categoryServices = new Schema<ICategoryServices>({
  name: { type: String },
  position: { type: Number },
  items: [servicesCustomer]
})
const customer = new Schema<ICustomer>({
  title: { type: String },
  description: { type: String }
})

servicesCustomer.pre('findOneAndDelete', async function (next) {
  try {
    const doc = (await this.model.findOne(this.getQuery())) as IServiceCustomer
    if (doc.image) {
      await deleteFile(doc.image.url)
    }
    next()
  } catch (error: any) {
    next(error)
  }
})

export const customerBlogModel = mongoose.model('customerChema', customer)
export const categoryServicesModel = mongoose.model('categorySchema', categoryServices)
export const servicesCustomerModel = mongoose.model('servicesCustomerSchame', servicesCustomer)
