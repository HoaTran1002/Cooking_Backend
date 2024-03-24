import InformationPositionRepository from '~/repositories/informationPosition.repository'
import { IResponseErrorObject } from '~/contract/interfaces/response.interface'
import PaginationResult from '~/contract/interfaces/pagination.interface'
import { IInformationPosition } from '~/contract/interfaces/recruitment.interface'

class InformationPopsitionRecruitment implements IInformationPosition {
  name: string
  description: string

  constructor(payload?: IInformationPosition) {
    if (payload) {
      this.name = payload.name
      this.description = payload.description
    } else {
      this.name = ''
      this.description = ''
    }
  }

  async create(): Promise<IInformationPosition> {
    try {
      const body: IInformationPosition = {
        name: this.name,
        description: this.description
      }
      const customerBlog = await InformationPositionRepository.create(body)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async getAll(page: number, size: number): Promise<[PaginationResult] | any> {
    const limit = size
    const skip = (page - 1) * size
    const data = await InformationPositionRepository.getAll(limit, skip)
    const total_documents = await InformationPositionRepository.Model.countDocuments()
    const total_pages = Math.ceil(total_documents / size)
    const previous_pages = page > 1 ? page - 1 : null
    const next_pages = skip + size < total_documents ? page + 1 : null
    return { page, size, data, total_pages, previous_pages, next_pages }
  }
  async getById(id: string): Promise<IInformationPosition> {
    try {
      const customerBlog = await InformationPositionRepository.getById(id)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async deleteById(id: string): Promise<any> {
    try {
      const customerBlog = await InformationPositionRepository.deleteById(id)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async updateById(id: string): Promise<IInformationPosition> {
    try {
      const body: IInformationPosition = {
        name: this.name,
        description: this.description
      }
      const customerBlog = await InformationPositionRepository.update(id, body)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
}
export default InformationPopsitionRecruitment
