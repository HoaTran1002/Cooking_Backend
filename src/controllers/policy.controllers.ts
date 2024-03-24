import { Request, Response } from 'express'
import FactoryService from '~/services/index.service'
import { IResponseSuccessObject } from '~/contract/interfaces/response.interface'
import { IPolicy } from '~/contract/interfaces/policy.interface'

class Policy {
  async create(req: Request<unknown, unknown, IPolicy>, res: Response) {
    const partner = FactoryService.instance<IPolicy>('PolicyServices', req.body)
    const record = await partner!.create()
    const response = new IResponseSuccessObject('create partner sucess', record, 200)
    return res.status(200).json(response)
  }
  async getAll(req: Request<any, unknown, IPolicy>, res: Response) {
    const partner = FactoryService.instance<IPolicy>('PolicyServices')
    const data = await partner!.getAll(req.params.page, req.params.size)
    const response = new IResponseSuccessObject('get all success', data, 200)
    return res.status(200).json(response)
  }
  async getById(req: Request<any, unknown, IPolicy>, res: Response) {
    const partner = FactoryService.instance<IPolicy>('PolicyServices')
    const data = await partner!.getById(req.params.id)
    const response = new IResponseSuccessObject('get By id success', data, 200)
    return res.status(200).json(response)
  }
  async deleteById(req: Request<any, unknown, IPolicy>, res: Response) {
    const partner = FactoryService.instance<IPolicy>('PolicyServices')
    const deleted = await partner!.deleteById(req.params.id)
    const response = new IResponseSuccessObject('delete By id success', deleted, 200)
    return res.status(200).json(response)
  }
  async updateById(req: Request<any, unknown, IPolicy>, res: Response) {
    const partner = FactoryService.instance<IPolicy>('PolicyServices', req.body)
    const updatePartner = await partner!.updateById(req.params.id)
    const response = new IResponseSuccessObject('update by id success', updatePartner, 200)
    return res.status(200).json(response)
  }
}
const policyModule = new Policy()
export default policyModule
