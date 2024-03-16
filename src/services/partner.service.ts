import { IPartner, IPartnerProduct } from '~/contract/interfaces/partner.interface'
import PartnerRepository from '~/repositories/partner.repository'
import { IImage } from '~/contract/interfaces/course.interface'
import { IResponseErrorObject } from '~/contract/interfaces/response.interface'

class PartnerServices implements IPartner {
  name: string
  logo: IImage
  description: string
  position: number
  products: [IPartnerProduct]
  constructor(payload?: IPartner) {
    if (payload) {
      this.name = payload.name
      this.logo = payload.logo
      this.description = payload.description
      this.position = payload.position
      this.products = payload.products
    } else {
      this.name = ''
      this.logo = {} as IImage
      this.description = ''
      this.position = 0
      this.products = [] as unknown as [IPartnerProduct]
    }
  }

  async createPartner(): Promise<IPartner> {
    try {
      const body: IPartner = {
        name: this.name,
        logo: this.logo,
        description: this.description,
        position: this.position,
        products: this.products
      }
      const partner = await PartnerRepository.create(body)
      return partner
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async getAllPartner(): Promise<[IPartner] | any> {
    const partner = await PartnerRepository.getAll()
    return partner
  }
  async getById(id: string): Promise<IPartner> {
    try {
      const partner = await PartnerRepository.getById(id)
      return partner
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async deleteById(id: string): Promise<any> {
    try {
      const partner = await PartnerRepository.deleteById(id)
      return partner
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async updateById(id: string, payload: IPartner): Promise<IPartner> {
    try {
      const partner = await PartnerRepository.update(id, payload)
      return partner
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
}
export default PartnerServices
