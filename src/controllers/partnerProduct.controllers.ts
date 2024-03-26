import { Request, Response } from 'express'
import FactoryService from '~/services/index.service'
import { IResponseSuccessObject } from '~/contract/interfaces/response.interface'
import { IPartnerProduct } from '~/contract/interfaces/partner.interface'

class PartnerProduct {
  async create(req: Request<unknown, unknown, IPartnerProduct>, res: Response) {
    const partner = FactoryService.instance<IPartnerProduct>('PartnerProduct', req.body)
    const record = await partner!.create(req.file?.path)
    const response = new IResponseSuccessObject('create partner sucess', record, 200)
    return res.status(200).json(response)
  }
  async getAll(req: Request<any, unknown, IPartnerProduct>, res: Response) {
    const partner = FactoryService.instance<IPartnerProduct>('PartnerProduct')
    const data = await partner!.getAll(req.params.page, req.params.size)
    const response = new IResponseSuccessObject('get all success', data, 200)
    return res.status(200).json(response)
  }
  async getById(req: Request<any, unknown, IPartnerProduct>, res: Response) {
    const partner = FactoryService.instance<IPartnerProduct>('PartnerProduct')
    const data = await partner!.getById(req.params.id)
    const response = new IResponseSuccessObject('get By id success', data, 200)
    return res.status(200).json(response)
  }
  async deleteById(req: Request<any, unknown, IPartnerProduct>, res: Response) {
    const partner = FactoryService.instance<IPartnerProduct>('PartnerProduct')
    const deleted = await partner!.deleteById(req.params.id)
    const response = new IResponseSuccessObject('delete By id success', deleted, 200)
    return res.status(200).json(response)
  }
  async updateById(req: Request<any, unknown, IPartnerProduct>, res: Response) {
    const partner = FactoryService.instance<IPartnerProduct>('PartnerProduct', req.body)
    const updatePartner = await partner!.updateById(req.params.id, req.file)
    const response = new IResponseSuccessObject('update by id success', updatePartner, 200)
    return res.status(200).json(response)
  }
}
const PartnerProductModule = new PartnerProduct()
export default PartnerProductModule
