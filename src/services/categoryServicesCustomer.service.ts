import { IResponseErrorObject } from '~/contract/interfaces/response.interface'
import PaginationResult from '~/contract/interfaces/pagination.interface'
import { ICategoryServices, IServiceCustomer } from '~/contract/interfaces/customer.interface'
import { IImage } from '~/contract/interfaces/course.interface'
import categoryServicesCustomerRepository from '~/repositories/categoryServicesCustomer.repository'

class CategoryServicesCustomer implements ICategoryServices {
  name: string
  position: number
  items: [IServiceCustomer]

  constructor(payload?: ICategoryServices) {
    if (payload) {
      this.name = payload.name
      this.position = payload.position
      this.items = payload.items
    } else {
      this.name = ''
      this.position = 0
      this.items = [] as unknown as [IServiceCustomer]
    }
  }

  async create(): Promise<ICategoryServices> {
    try {
      const body: ICategoryServices = {
        name: this.name,
        position: this.position,
        items: this.items
      }
      const customerBlog = await categoryServicesCustomerRepository.create(body)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async getAll(page: number, size: number): Promise<[PaginationResult] | any> {
    const limit = size
    const skip = (page - 1) * size
    const data = await categoryServicesCustomerRepository.getAll(limit, skip)
    const total_documents = await categoryServicesCustomerRepository.Model.countDocuments()
    const total_pages = Math.ceil(total_documents / size)
    const previous_pages = page > 1 ? page - 1 : null
    const next_pages = skip + size < total_documents ? page + 1 : null
    return { page, size, data, total_pages, previous_pages, next_pages }
  }
  async getById(id: string): Promise<ICategoryServices> {
    try {
      const customerBlog = await categoryServicesCustomerRepository.getById(id)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async deleteById(id: string): Promise<any> {
    try {
      const customerBlog = await categoryServicesCustomerRepository.deleteById(id)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async updateById(id: string): Promise<ICategoryServices> {
    try {
      const body: ICategoryServices = {
        name: this.name,
        position: this.position,
        items: this.items
      }
      const customerBlog = await categoryServicesCustomerRepository.update(id, body)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
}
export default CategoryServicesCustomer
