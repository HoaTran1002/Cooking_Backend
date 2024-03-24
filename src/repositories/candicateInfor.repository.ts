import { Model } from 'mongoose'
import { candicateInforModel } from '~/models/recruitment.models'
import { ICandicateInfor } from '~/contract/interfaces/recruitment.interface'
import CandicateInforInterface from '~/contract/repositories/candicateInfor.repositories'

class CandicateInRepository implements CandicateInforInterface {
  readonly Model: Model<ICandicateInfor>

  constructor(candicateInforModel: Model<ICandicateInfor>) {
    this.Model = candicateInforModel
  }
  create(payload: ICandicateInfor): Promise<any | ICandicateInfor> {
    const record = candicateInforModel.create(payload)
    return record
  }
  getById(id: string): Promise<ICandicateInfor | any> {
    return candicateInforModel.findById(id)
  }
  deleteById(id: string): Promise<any> {
    return candicateInforModel.deleteOne({ _id: id })
  }
  getAll(limit: number, skip: number): Promise<[ICandicateInfor] | any> {
    const data = candicateInforModel.find().limit(limit).skip(skip)
    return data
  }
  update(id: string, payload: ICandicateInfor): Promise<ICandicateInfor | any> {
    const fillter = { _id: id }
    const options = { new: true }
    const data = candicateInforModel.findOneAndUpdate(fillter, payload, options)
    return data
  }
}
export default new CandicateInRepository(candicateInforModel)
