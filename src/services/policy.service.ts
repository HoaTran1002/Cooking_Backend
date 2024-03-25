import PolicyRepository from '~/repositories/policy.repository'
import { IResponseErrorObject } from '~/contract/interfaces/response.interface'
import { IPolicy } from '~/contract/interfaces/policy.interface'
import PaginationResult from '~/contract/interfaces/pagination.interface'
import { IImage } from '~/contract/interfaces/course.interface'

class PolicyServices implements IPolicy {
  title: string
  description: string
  content: string
  constructor(payload?: IPolicy) {
    if (payload) {
      this.title = payload.title
      this.description = payload.description
      this.content = payload.content
    } else {
      this.title = ''
      this.description = ''
      this.content = ''
    }
  }

  async create(): Promise<IPolicy> {
    try {
      const body: IPolicy = {
        title: this.title,
        description: this.description,
        content: this.content
      }

      const partner = await PolicyRepository.create(body)
      return partner
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async getAll(page: number, size: number): Promise<[PaginationResult] | any> {
    const limit = size
    const skip = (page - 1) * size
    const data = await PolicyRepository.getAll(limit, skip)
    const total_documents = await PolicyRepository.Model.countDocuments()
    const total_pages = Math.ceil(total_documents / size)
    const previous_pages = page > 1 ? page - 1 : null
    const next_pages = skip + size < total_documents ? page + 1 : null
    return { page, size, data, total_pages, previous_pages, next_pages }
  }
  async getById(id: string): Promise<IPolicy> {
    try {
      const partner = await PolicyRepository.getById(id)
      return partner
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async deleteById(id: string): Promise<any> {
    try {
      const partner = await PolicyRepository.deleteById(id)
      return partner
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async updateById(id: string): Promise<IPolicy> {
    try {
      const payload: IPolicy = {
        title: this.title,
        description: this.description,
        content: this.content
      }
      const partner = await PolicyRepository.update(id, payload)
      return partner
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
}
export default PolicyServices
