import { IPartner, IPartnerProduct } from '~/contract/interfaces/partner.interface'
import PartnerRepository from '~/repositories/partner.repository'
import { IImage } from '~/contract/interfaces/course.interface'
import { IResponseErrorObject } from '~/contract/interfaces/response.interface'
import PaginationResult from '~/contract/interfaces/pagination.interface'
import partnerRepository from '~/repositories/partner.repository'

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

  async create(): Promise<IPartner> {
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
  async getAll(page: number, size: number): Promise<[PaginationResult] | any> {
    const limit = size
    const skip = (page - 1) * size
    const data = await PartnerRepository.getAll(limit, skip)
    const total_documents = await partnerRepository.partnerModel.countDocuments()
    const total_pages = Math.ceil(total_documents / size)
    const previous_pages = page > 1 ? page - 1 : null
    const next_pages = skip + size < total_documents ? page + 1 : null
    return { page, size, data, total_pages, previous_pages, next_pages }
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
