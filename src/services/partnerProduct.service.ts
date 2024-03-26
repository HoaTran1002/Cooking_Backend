import PartnerProductRepository from '~/repositories/partnerProduct.repository'
import { IResponseErrorObject } from '~/contract/interfaces/response.interface'
import { IPartnerProduct } from '~/contract/interfaces/partner.interface'
import PaginationResult from '~/contract/interfaces/pagination.interface'
import { IImage } from '~/contract/interfaces/course.interface'
import { deleteFile, updateFileContent } from './file.service'

class PartnerProductServices implements IPartnerProduct {
  name: string
  image: IImage
  description: string
  position: number
  constructor(payload?: IPartnerProduct) {
    if (payload) {
      this.name = payload.name
      this.image = payload.image
      this.description = payload.description
      this.position = payload.position
    } else {
      this.name = ''
      this.image = {} as IImage
      this.description = ''
      this.position = 0
    }
  }

  async create(path?: string): Promise<IPartnerProduct> {
    try {
      if (path) {
        this.image.url = path
      }
      const body: IPartnerProduct = {
        name: this.name,
        image: this.image,
        description: this.description,
        position: this.position
      }
      const record = await PartnerProductRepository.create(body)
      return record
    } catch (error: any) {
      if (path) {
        await deleteFile(path)
      }
      throw new IResponseErrorObject(error, 404)
    }
  }
  async getAll(page: number, size: number): Promise<[PaginationResult] | any> {
    const limit = size
    const skip = (page - 1) * size
    const data = await PartnerProductRepository.getAll(limit, skip)
    const total_documents = await PartnerProductRepository.Model.countDocuments()
    const total_pages = Math.ceil(total_documents / size)
    const previous_pages = page > 1 ? page - 1 : null
    const next_pages = skip + size < total_documents ? page + 1 : null
    return { page, size, data, total_pages, previous_pages, next_pages }
  }
  async getById(id: string): Promise<IPartnerProduct> {
    try {
      const record = await PartnerProductRepository.getById(id)
      return record
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async deleteById(id: string): Promise<any> {
    try {
      const record = await PartnerProductRepository.deleteById(id)
      return record
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async updateById(id: string, file?: Express.Multer.File): Promise<IPartnerProduct> {
    try {
      const existed = await this.getById(id)
      if (!existed) {
        if (file?.path) {
          await deleteFile(file?.path)
        }
        throw new IResponseErrorObject('not found by id', 404)
      }
      const payload: IPartnerProduct = {
        name: this.name,
        image: this.image,
        description: this.description,
        position: this.position
      }
      if (file && this.image.url) {
        await updateFileContent(file, this.image.url)
      } else if (file) {
        this.image.url = file.path
      }
      const record = await PartnerProductRepository.update(id, payload)
      return record
    } catch (error: any) {
      if (file?.path) {
        await deleteFile(file?.path)
      }
      throw new IResponseErrorObject(error, 404)
    }
  }
}
export default PartnerProductServices
