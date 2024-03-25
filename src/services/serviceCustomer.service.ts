import { IResponseErrorObject } from '~/contract/interfaces/response.interface'
import PaginationResult from '~/contract/interfaces/pagination.interface'
import { IServiceCustomer } from '~/contract/interfaces/customer.interface'
import ServicesCustomerRepository from '~/repositories/serviceCustomer.repository'
import { IImage } from '~/contract/interfaces/course.interface'
import { deleteFile, updateFileContent } from './file.service'
import { File } from 'buffer'

class ServicesCustomer implements IServiceCustomer {
  name: string
  description: string
  image: IImage
  position: number

  constructor(payload?: IServiceCustomer) {
    if (payload) {
      this.name = payload.name
      this.position = payload.position
      this.description = payload.description
      this.image = payload.image
    } else {
      this.name = ''
      this.position = 0
      this.description = ''
      this.image = {} as unknown as IImage
    }
  }

  async create(path?: string): Promise<IServiceCustomer> {
    try {
      if (path) {
        this.image.url = path
      }
      const body: IServiceCustomer = {
        name: this.name,
        position: this.position,
        description: this.description,
        image: this.image
      }
      const record = await ServicesCustomerRepository.create(body)
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
    const data = await ServicesCustomerRepository.getAll(limit, skip)
    const total_documents = await ServicesCustomerRepository.Model.countDocuments()
    const total_pages = Math.ceil(total_documents / size)
    const previous_pages = page > 1 ? page - 1 : null
    const next_pages = skip + size < total_documents ? page + 1 : null
    return { page, size, data, total_pages, previous_pages, next_pages }
  }
  async getById(id: string): Promise<IServiceCustomer> {
    try {
      const record = await ServicesCustomerRepository.getById(id)
      return record
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async deleteById(id: string): Promise<any> {
    try {
      const record = await ServicesCustomerRepository.deleteById(id)
      return record
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async updateById(id: string, file?: Express.Multer.File): Promise<IServiceCustomer> {
    try {
      const existed = await this.getById(id)
      if (!existed) {
        if (file?.path) {
          await deleteFile(file?.path)
        }
        throw new IResponseErrorObject('not found by id', 404)
      }
      const body: IServiceCustomer = {
        name: this.name,
        position: this.position,
        description: this.description,
        image: this.image
      }
      if (file && this.image.url) {
        await updateFileContent(file, this.image.url)
      } else if (file) {
        this.image.url = file.path
      }
      const record = await ServicesCustomerRepository.update(id, body)
      return record
    } catch (error: any) {
      if (file?.path) {
        await deleteFile(file?.path)
      }
      throw new IResponseErrorObject(error, 404)
    }
  }
}
export default ServicesCustomer
