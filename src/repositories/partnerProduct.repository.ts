import { Model } from 'mongoose'
import { IPartnerProduct } from '~/contract/interfaces/partner.interface'
import PartnerProductRepositoryInterface from '~/contract/repositories/partnertProduct.repositories'
import { partnerProductModel } from '~/models/partner.model'

class PartnerProductRepository implements PartnerProductRepositoryInterface {
  readonly Model: Model<IPartnerProduct>

  constructor(partnerProductModel: Model<IPartnerProduct>) {
    this.Model = partnerProductModel
  }
  create(payload: IPartnerProduct): Promise<any | IPartnerProduct> {
    const record = partnerProductModel.create(payload)
    return record
  }
  getById(id: string): Promise<IPartnerProduct | any> {
    return partnerProductModel.findById(id)
  }
  deleteById(id: string): Promise<any> {
    return partnerProductModel.deleteOne({ _id: id })
  }
  getAll(limit: number, skip: number): Promise<[IPartnerProduct] | any> {
    const data = partnerProductModel.find().limit(limit).skip(skip)
    return data
  }
  update(id: string, payload: IPartnerProduct): Promise<IPartnerProduct | any> {
    const fillter = { _id: id }
    const options = { new: true }
    const data = partnerProductModel.findOneAndUpdate(fillter, payload, options)
    return data
  }
}
export default new PartnerProductRepository(partnerProductModel)
