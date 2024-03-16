import { IPartner } from '~/contract/interfaces/partner.interface'
import PartnerRepositoryInterface from '~/contract/repositories/partner.repositories'
import partnerModel from '~/models/partner.model'

class PartnerRepository implements PartnerRepositoryInterface {
  create(payload: IPartner): Promise<any | IPartner> {
    const partner = partnerModel.create(payload)
    return partner
  }
  getById(id: string): Promise<IPartner | any> {
    return partnerModel.findById(id)
  }
  deleteById(id: string): Promise<any> {
    return partnerModel.deleteOne({ _id: id })
  }
  getAll(): Promise<[IPartner] | any> {
    const data = partnerModel.find()
    return data
  }
  update(id: string, payload: IPartner): Promise<IPartner | any> {
    const data = partnerModel.findByIdAndUpdate()
    return data
  }
}
export default new PartnerRepository()
