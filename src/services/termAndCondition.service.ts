import TermAndConditionRepository from '~/repositories/termAndCondition.resiroty'
import { IResponseErrorObject } from '~/contract/interfaces/response.interface'
import PaginationResult from '~/contract/interfaces/pagination.interface'
import { ITermAndCondition } from '~/contract/interfaces/termAndCondition.interface'

class TermAndCondition implements ITermAndCondition {
  title: string
  description: string
  dateUpdate: string
  content: string
  constructor(payload?: ITermAndCondition) {
    if (payload) {
      this.title = payload.title
      this.description = payload.description
      this.dateUpdate = payload.dateUpdate
      this.content = payload.content
    } else {
      this.title = ''
      this.description = ''
      this.dateUpdate = ''
      this.content = ''
    }
  }

  async create(): Promise<ITermAndCondition> {
    try {
      const body: ITermAndCondition = {
        title: this.title,
        description: this.description,
        dateUpdate: this.dateUpdate,
        content: this.content
      }
      const customerBlog = await TermAndConditionRepository.create(body)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async getAll(page: number, size: number): Promise<[PaginationResult] | any> {
    const limit = size
    const skip = (page - 1) * size
    const data = await TermAndConditionRepository.getAll(limit, skip)
    const total_documents = await TermAndConditionRepository.Model.countDocuments()
    const total_pages = Math.ceil(total_documents / size)
    const previous_pages = page > 1 ? page - 1 : null
    const next_pages = skip + size < total_documents ? page + 1 : null
    return { page, size, data, total_pages, previous_pages, next_pages }
  }
  async getById(id: string): Promise<ITermAndCondition> {
    try {
      const customerBlog = await TermAndConditionRepository.getById(id)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async deleteById(id: string): Promise<any> {
    try {
      const customerBlog = await TermAndConditionRepository.deleteById(id)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async updateById(id: string): Promise<ITermAndCondition> {
    try {
      const body: ITermAndCondition = {
        title: this.title,
        description: this.description,
        dateUpdate: this.dateUpdate,
        content: this.content
      }
      const customerBlog = await TermAndConditionRepository.update(id, body)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
}
export default TermAndCondition
