import mongoose, { Schema } from 'mongoose'
import { ICategoryServices, ICustomer, IServiceCustomer } from '~/contract/interfaces/customer.interface'
import { imageSchema } from './product.models'

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

export const customerBlogModel = mongoose.model('customerChema', customer)
export const categoryServicesModel = mongoose.model('categorySchema', categoryServices)
export const servicesCustomerModel = mongoose.model('servicesCustomerSchame', servicesCustomer)
