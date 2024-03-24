import { IResponseErrorObject } from '~/contract/interfaces/response.interface'
import PaginationResult from '~/contract/interfaces/pagination.interface'
import { IRecruitmentBlog, IFile } from '~/contract/interfaces/recruitment.interface'
import { IImage } from '~/contract/interfaces/course.interface'
import IRecruitmentBlogRepository from '~/repositories/recruitmentBlog.repository'
import { string } from 'joi'

class RecruitmentBlog implements IRecruitmentBlog {
  title: string
  description: string
  recruitmentWorkingLocations: [string]

  constructor(payload?: IRecruitmentBlog) {
    if (payload) {
      this.title = payload.title
      this.description = payload.description
      this.recruitmentWorkingLocations = payload.recruitmentWorkingLocations
    } else {
      ;(this.title = ''), (this.description = ''), (this.recruitmentWorkingLocations = [''])
    }
  }

  async create(): Promise<IRecruitmentBlog> {
    try {
      const body: IRecruitmentBlog = {
        title: this.title,
        description: this.description,
        recruitmentWorkingLocations: this.recruitmentWorkingLocations
      }
      const customerBlog = await IRecruitmentBlogRepository.create(body)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async getAll(page: number, size: number): Promise<[PaginationResult] | any> {
    const limit = size
    const skip = (page - 1) * size
    const data = await IRecruitmentBlogRepository.getAll(limit, skip)
    const total_documents = await IRecruitmentBlogRepository.Model.countDocuments()
    const total_pages = Math.ceil(total_documents / size)
    const previous_pages = page > 1 ? page - 1 : null
    const next_pages = skip + size < total_documents ? page + 1 : null
    return { page, size, data, total_pages, previous_pages, next_pages }
  }
  async getById(id: string): Promise<IRecruitmentBlog> {
    try {
      const customerBlog = await IRecruitmentBlogRepository.getById(id)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async deleteById(id: string): Promise<any> {
    try {
      const customerBlog = await IRecruitmentBlogRepository.deleteById(id)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async updateById(id: string): Promise<IRecruitmentBlog> {
    try {
      const body: IRecruitmentBlog = {
        title: this.title,
        description: this.description,
        recruitmentWorkingLocations: this.recruitmentWorkingLocations
      }
      const customerBlog = await IRecruitmentBlogRepository.update(id, body)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
}
export default RecruitmentBlog
