import { Request, Response } from 'express'
import { IServiceCustomer } from '~/contract/interfaces/customer.interface'
import { IResponseSuccessObject } from '~/contract/interfaces/response.interface'
import FactoryService from '~/services/index.service'
class ServicesCustomer {
  async create(req: Request<unknown, unknown, IServiceCustomer>, res: Response) {
    const instance = FactoryService.instance<IServiceCustomer>('ServiceCustomer', req.body)
    const record = await instance!.create(req.file?.path)
    const response = new IResponseSuccessObject('create sucess', record, 200)
    return res.status(200).json(response)
  }
  async getAll(req: Request<any, unknown, IServiceCustomer>, res: Response) {
    const instance = FactoryService.instance<IServiceCustomer>('ServiceCustomer')
    const data = await instance!.getAll(req.params.page, req.params.size)
    const response = new IResponseSuccessObject('get all success', data, 200)
    return res.status(200).json(response)
  }
  async getById(req: Request<any, unknown, IServiceCustomer>, res: Response) {
    const instance = FactoryService.instance<IServiceCustomer>('ServiceCustomer')
    const data = await instance!.getById(req.params.id)
    const response = new IResponseSuccessObject('get By id success', data, 200)
    return res.status(200).json(response)
  }
  async deleteById(req: Request<any, unknown, IServiceCustomer>, res: Response) {
    const instance = FactoryService.instance<IServiceCustomer>('ServiceCustomer')
    const deleted = await instance!.deleteById(req.params.id)
    const response = new IResponseSuccessObject('delete By id success', deleted, 200)
    return res.status(200).json(response)
  }
  async updateById(req: Request<any, unknown, IServiceCustomer>, res: Response) {
    const instance = FactoryService.instance<IServiceCustomer>('ServiceCustomer', req.body)
    const updated = await instance!.updateById(req.params.id, req.file)
    const response = new IResponseSuccessObject('update by id success', updated, 200)
    return res.status(200).json(response)
  }
}
const ServicesCustomerController = new ServicesCustomer()
export default ServicesCustomerController
