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
    return this.Model.create(payload)
  }
  getById(id: string): Promise<IPartner | any> {
    return this.Model.findById(id)
  }
  async deleteById(id: string): Promise<any> {
    await this.Model.deleteOne({ _id: id })
  }
  getAll(limit: number, skip: number): Promise<[IPartner] | any> {
    const data = this.Model.find().limit(limit).skip(skip)
    return data
  }
  async update(id: string, payload: IPartner): Promise<IPartner | any> {
    const fillter = { _id: id }
    const options = { new: true }
    const data = await this.Model.findOneAndUpdate(fillter, payload, options)
    return data
  }
}
export default new PartnerRepository(partnerModel)
