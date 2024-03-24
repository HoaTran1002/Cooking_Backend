import { Model } from 'mongoose'
import { customerBlogModel } from '~/models/customer.models'
import CustomerRepositoryInterface from '~/contract/repositories/customerBlog.repositories'
import { ICustomer } from '~/contract/interfaces/customer.interface'

class customerBlogRepository implements CustomerRepositoryInterface {
  readonly Model: Model<ICustomer>

  constructor(customerBlogModel: Model<ICustomer>) {
    this.Model = customerBlogModel
  }
  create(payload: ICustomer): Promise<any | ICustomer> {
    const record = customerBlogModel.create(payload)
    return record
  }
  getById(id: string): Promise<ICustomer | any> {
    return customerBlogModel.findById(id)
  }
  deleteById(id: string): Promise<any> {
    return customerBlogModel.deleteOne({ _id: id })
  }
  getAll(limit: number, skip: number): Promise<[ICustomer] | any> {
    const data = customerBlogModel.find().limit(limit).skip(skip)
    return data
  }
  update(id: string, payload: ICustomer): Promise<ICustomer | any> {
    const fillter = { _id: id }
    const options = { new: true }
    const data = customerBlogModel.findOneAndUpdate(fillter, payload, options)
    return data
  }
}
export default new customerBlogRepository(customerBlogModel)
