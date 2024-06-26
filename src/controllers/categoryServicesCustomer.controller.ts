import { Request, Response } from 'express'
import { ICategoryServices } from '~/contract/interfaces/customer.interface'
import { IResponseSuccessObject } from '~/contract/interfaces/response.interface'
import FactoryService from '~/services/index.service'
class CategoryServicesCustomer {
  async create(req: Request<unknown, unknown, ICategoryServices>, res: Response) {
    const instance = FactoryService.instance<ICategoryServices>('categoryServiceCategory', req.body)
    const record = await instance!.create()
    const response = new IResponseSuccessObject('create sucess', record, 200)
    return res.status(200).json(response)
  }
  async getAll(req: Request<any, unknown, ICategoryServices>, res: Response) {
    const instance = FactoryService.instance<ICategoryServices>('categoryServiceCategory')
    const data = await instance!.getAll(req.params.page, req.params.size)
    const response = new IResponseSuccessObject('get all success', data, 200)
    return res.status(200).json(response)
  }
  async getById(req: Request<any, unknown, ICategoryServices>, res: Response) {
    const instance = FactoryService.instance<ICategoryServices>('categoryServiceCategory')
    const data = await instance!.getById(req.params.id)
    const response = new IResponseSuccessObject('get By id success', data, 200)
    return res.status(200).json(response)
  }
  async deleteById(req: Request<any, unknown, ICategoryServices>, res: Response) {
    const instance = FactoryService.instance<ICategoryServices>('categoryServiceCategory')
    const deleted = await instance!.deleteById(req.params.id)
    const response = new IResponseSuccessObject('delete By id success', deleted, 200)
    return res.status(200).json(response)
  }
  async updateById(req: Request<any, unknown, ICategoryServices>, res: Response) {
    const instance = FactoryService.instance<ICategoryServices>('categoryServiceCategory', req.body)
    const updated = await instance!.updateById(req.params.id)
    const response = new IResponseSuccessObject('update by id success', updated, 200)
    return res.status(200).json(response)
  }
}
const CategoryServicesCustomerController = new CategoryServicesCustomer()
export default CategoryServicesCustomerController
