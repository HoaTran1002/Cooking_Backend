import { Model } from 'mongoose'
import { ITermAndCondition } from '~/contract/interfaces/termAndCondition.interface'
import TermAndConditionRepositoryInterface from '~/contract/repositories/termAndCondition.repositories'
import termAndConditionModel from '~/models/termAndCondition.models'

class TermAndConditionRepository implements TermAndConditionRepositoryInterface {
  readonly Model: Model<ITermAndCondition>

  constructor(termAndConditionModel: Model<ITermAndCondition>) {
    this.Model = termAndConditionModel
  }
  create(payload: ITermAndCondition): Promise<any | ITermAndCondition> {
    const termAndCondition = termAndConditionModel.create(payload)
    return termAndCondition
  }
  getById(id: string): Promise<ITermAndCondition | any> {
    return termAndConditionModel.findById(id)
  }
  deleteById(id: string): Promise<any> {
    return termAndConditionModel.deleteOne({ _id: id })
  }
  getAll(limit: number, skip: number): Promise<[ITermAndCondition] | any> {
    const data = termAndConditionModel.find().limit(limit).skip(skip)
    return data
  }
  update(id: string, payload: ITermAndCondition): Promise<ITermAndCondition | any> {
    const fillter = { _id: id }
    const options = { new: true }
    const data = termAndConditionModel.findOneAndUpdate(fillter, payload, options)
    return data
  }
}
export default new TermAndConditionRepository(termAndConditionModel)
