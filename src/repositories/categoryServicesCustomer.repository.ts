import { Model } from 'mongoose'
import { categoryServicesModel } from '~/models/customer.models'
import { ICategoryServices } from '~/contract/interfaces/customer.interface'
import CategoryServicesCustomerInterface from '~/contract/repositories/categoryServicesCustomer.repositories'

class CategoryServicesCustomerRepository implements CategoryServicesCustomerInterface {
  readonly Model: Model<ICategoryServices>

  constructor(categoryServicesModel: Model<ICategoryServices>) {
    this.Model = categoryServicesModel
  }
  create(payload: ICategoryServices): Promise<any | ICategoryServices> {
    const category = categoryServicesModel.create(payload)
    return category
  }
  getById(id: string): Promise<ICategoryServices | any> {
    return categoryServicesModel.findById(id)
  }
  deleteById(id: string): Promise<any> {
    return categoryServicesModel.deleteOne({ _id: id })
  }
  getAll(limit: number, skip: number): Promise<[ICategoryServices] | any> {
    const data = categoryServicesModel.find().limit(limit).skip(skip)
    return data
  }
  update(id: string, payload: ICategoryServices): Promise<ICategoryServices | any> {
    const fillter = { _id: id }
    const options = { new: true }
    const data = categoryServicesModel.findOneAndUpdate(fillter, payload, options)
    return data
  }
}
export default new CategoryServicesCustomerRepository(categoryServicesModel)
