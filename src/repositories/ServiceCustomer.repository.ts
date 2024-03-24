import { Model } from 'mongoose'
import { servicesCustomerModel } from '~/models/customer.models'
import { IServiceCustomer } from '~/contract/interfaces/customer.interface'
import ServicesCustomerInterface from '~/contract/repositories/servicesCustomer.repositories'

class ServicesCustomerRepository implements ServicesCustomerInterface {
  readonly Model: Model<IServiceCustomer>
  constructor(servicesCustomerModel: Model<IServiceCustomer>) {
    this.Model = servicesCustomerModel
  }
  create(payload: IServiceCustomer): Promise<any | IServiceCustomer> {
    const record = servicesCustomerModel.create(payload)
    return record
  }
  getById(id: string): Promise<IServiceCustomer | any> {
    return servicesCustomerModel.findById(id)
  }
  deleteById(id: string): Promise<any> {
    return servicesCustomerModel.deleteOne({ _id: id })
  }
  getAll(limit: number, skip: number): Promise<[IServiceCustomer] | any> {
    const data = servicesCustomerModel.find().limit(limit).skip(skip)
    return data
  }
  update(id: string, payload: IServiceCustomer): Promise<IServiceCustomer | any> {
    const fillter = { _id: id }
    const options = { new: true }
    const data = servicesCustomerModel.findOneAndUpdate(fillter, payload, options)
    return data
  }
}
export default new ServicesCustomerRepository(servicesCustomerModel)
