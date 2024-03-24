import { Model } from 'mongoose'
import { IPolicy } from '~/contract/interfaces/policy.interface'
import PolicyRepositoryInterface from '~/contract/repositories/policy.repositories'
import policyModel from '~/models/policy.models'

class PolicyRepository implements PolicyRepositoryInterface {
  readonly Model: Model<IPolicy>

  constructor(policyModel: Model<IPolicy>) {
    this.Model = policyModel
  }
  create(payload: IPolicy): Promise<any | IPolicy> {
    const record = policyModel.create(payload)
    return record
  }
  getById(id: string): Promise<IPolicy | any> {
    return policyModel.findById(id)
  }
  deleteById(id: string): Promise<any> {
    return policyModel.deleteOne({ _id: id })
  }
  getAll(limit: number, skip: number): Promise<[IPolicy] | any> {
    const data = policyModel.find().limit(limit).skip(skip)
    return data
  }
  update(id: string, payload: IPolicy): Promise<IPolicy | any> {
    const fillter = { _id: id }
    const options = { new: true }
    const data = policyModel.findOneAndUpdate(fillter, payload, options)
    return data
  }
}
export default new PolicyRepository(policyModel)
