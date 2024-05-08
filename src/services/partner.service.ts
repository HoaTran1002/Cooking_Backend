import PartnerRepository from '~/repositories/partner.repository'
import partnerRepository from '~/repositories/partner.repository'
import { IResponseErrorObject } from '~/contract/interfaces/response.interface'
import { IPartner, IPartnerProduct } from '~/contract/interfaces/partner.interface'
import PaginationResult from '~/contract/interfaces/pagination.interface'
import { IImage } from '~/contract/interfaces/course.interface'
import { deleteFile, updateFileContent } from './file.service'

class PartnerServices implements IPartner {
  name: string
  logo: IImage
  description: string
  position: number
  products: [IPartnerProduct]
  constructor(payload?: IPartner) {
    if (payload) {
      this.name = payload.name
      this.logo = payload.logo || ({ url: '' /* Các thuộc tính khác của logo */ } as IImage)
      this.description = payload.description
      this.position = payload.position
      this.products = payload.products || []
    } else {
      this.name = ''
      this.logo = { url: '' /* Các thuộc tính khác của logo */ } as IImage
      this.description = ''
      this.position = 0
      this.products = [] as unknown as [IPartnerProduct]
    }
  }

  async create(path?: string): Promise<IPartner> {
    try {
      if (path) {
        this.logo.url = path
      }
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
      if (path) {
        await deleteFile(path)
      }
      throw new IResponseErrorObject(error.message, 404)
    }
  }
  async getAll(page: number, size: number): Promise<[PaginationResult] | any> {
    const limit = size
    const skip = (page - 1) * size
    const data = await PartnerRepository.getAll(limit, skip)
    const total_documents = await partnerRepository.Model.countDocuments()
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
  async updateById(id: string, file?: Express.Multer.File): Promise<IPartner> {
    try {
      const existed = await this.getById(id)
      if (!existed) {
        if (file?.path) {
          await deleteFile(file?.path)
        }
        throw new IResponseErrorObject('not found by id', 404)
      }
      const payload: IPartner = {
        name: this.name,
        logo: this.logo,
        description: this.description,
        position: this.position,
        products: this.products
      }
      if (file && this.logo.url) {
        await updateFileContent(file, this.logo.url)
      } else if (file) {
        this.logo.url = file.path
      }
      const partner = await PartnerRepository.update(id, payload)
      return partner
    } catch (error: any) {
      if (file?.path) {
        await deleteFile(file?.path)
      }
      throw new IResponseErrorObject(error, 404)
    }
  }
}
export default PartnerServices
