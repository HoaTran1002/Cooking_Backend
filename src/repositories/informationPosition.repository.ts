import { Model } from 'mongoose'
import { informationPositionModel } from '~/models/recruitment.models'
import { IInformationPosition } from '~/contract/interfaces/recruitment.interface'
import InformationPositionRepositoryInterface from '~/contract/repositories/informationPosition.repositories'

class InformationPositionRepository implements InformationPositionRepositoryInterface {
  readonly Model: Model<IInformationPosition>

  constructor(informationPositionModel: Model<IInformationPosition>) {
    this.Model = informationPositionModel
  }
  create(payload: IInformationPosition): Promise<any | IInformationPosition> {
    const record = informationPositionModel.create(payload)
    return record
  }
  getById(id: string): Promise<IInformationPosition | any> {
    return informationPositionModel.findById(id)
  }
  deleteById(id: string): Promise<any> {
    return informationPositionModel.deleteOne({ _id: id })
  }
  getAll(limit: number, skip: number): Promise<[IInformationPosition] | any> {
    const data = informationPositionModel.find().limit(limit).skip(skip)
    return data
  }
  update(id: string, payload: IInformationPosition): Promise<IInformationPosition | any> {
    const fillter = { _id: id }
    const options = { new: true }
    const data = informationPositionModel.findOneAndUpdate(fillter, payload, options)
    return data
  }
}
export default new InformationPositionRepository(informationPositionModel)
