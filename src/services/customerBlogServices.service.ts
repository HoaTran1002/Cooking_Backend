import customerBlogRepository from '~/repositories/customerBlog.repository'
import { IResponseErrorObject } from '~/contract/interfaces/response.interface'
import PaginationResult from '~/contract/interfaces/pagination.interface'
import { ICustomer } from '~/contract/interfaces/customer.interface'
import { IImage } from '~/contract/interfaces/course.interface'

class CustomerBlog implements ICustomer {
  title: string
  description: string

  constructor(payload?: ICustomer) {
    if (payload) {
      this.title = payload.title
      this.description = payload.description
    } else {
      this.title = ''
      this.description = ''
    }
  }

  async create(): Promise<ICustomer> {
    try {
      const body: ICustomer = {
        title: this.title,
        description: this.description
      }
      const customerBlog = await customerBlogRepository.create(body)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async getAll(page: number, size: number): Promise<[PaginationResult] | any> {
    const limit = size
    const skip = (page - 1) * size
    const data = await customerBlogRepository.getAll(limit, skip)
    const total_documents = await customerBlogRepository.Model.countDocuments()
    const total_pages = Math.ceil(total_documents / size)
    const previous_pages = page > 1 ? page - 1 : null
    const next_pages = skip + size < total_documents ? page + 1 : null
    return { page, size, data, total_pages, previous_pages, next_pages }
  }
  async getById(id: string): Promise<ICustomer> {
    try {
      const customerBlog = await customerBlogRepository.getById(id)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async deleteById(id: string): Promise<any> {
    try {
      const customerBlog = await customerBlogRepository.deleteById(id)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async updateById(id: string): Promise<ICustomer> {
    try {
      const body: ICustomer = {
        title: this.title,
        description: this.description
      }
      const customerBlog = await customerBlogRepository.update(id, body)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
}
export default CustomerBlog
