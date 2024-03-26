import { Model } from 'mongoose'
import { IPartner } from '~/contract/interfaces/partner.interface'
import PartnerRepositoryInterface from '~/contract/repositories/partner.repositories'
import { partnerModel } from '~/models/partner.model'

class PartnerRepository implements PartnerRepositoryInterface {
  readonly Model: Model<IPartner>

  constructor(partnerModel: Model<IPartner>) {
    this.Model = partnerModel
  }
  create(payload: IPartner): Promise<any | IPartner> {
    const record = partnerModel.create(payload)
    return record
  }
  getById(id: string): Promise<IPartner | any> {
    return partnerModel.findById(id)
  }
  deleteById(id: string): Promise<any> {
    return partnerModel.deleteOne({ _id: id })
  }
  getAll(limit: number, skip: number): Promise<[IPartner] | any> {
    const data = partnerModel.find().limit(limit).skip(skip)
    return data
  }
  update(id: string, payload: IPartner): Promise<IPartner | any> {
    const fillter = { _id: id }
    const options = { new: true }
    const data = partnerModel.findOneAndUpdate(fillter, payload, options)
    return data
  }
}
export default new PartnerRepository(partnerModel)
