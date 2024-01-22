import { Request, Response } from 'express'
import { IFaq } from '~/interfaces/faq.interface'
import { IResponseSuccessObject } from '~/interfaces/response.interface'
import { ServicesFactory } from '~/services/factory.service'

class FAQController {
  createFAQ = async (req: Request<any, unknown, IFaq>, res: Response): Promise<Response<IResponseSuccessObject>> => {
    const response = new IResponseSuccessObject(
      'Create FAQ success',
      await ServicesFactory.createData('FAQ', req.body),
      200
    )
    return res.status(200).json(response)
  }
  editFAQ = async (req: Request<any, unknown, IFaq>, res: Response): Promise<Response<IResponseSuccessObject>> => {
    const response = new IResponseSuccessObject(
      'Update FAQ success',
      await ServicesFactory.editData(req.params.id, 'FAQ', req.body),
      200
    )
    return res.status(200).json(response)
  }
  deleteFAQ = async (req: Request<any, unknown, IFaq>, res: Response): Promise<Response<IResponseSuccessObject>> => {
    const response = new IResponseSuccessObject(
      'delete FAQ success',
      await ServicesFactory.deleteData(req.params.id, 'FAQ'),
      200
    )
    return res.status(200).json(response)
  }
  getFAQById = async (req: Request<any, unknown, IFaq>, res: Response): Promise<Response<IResponseSuccessObject>> => {
    const response = new IResponseSuccessObject(
      'get FAQ success',
      await ServicesFactory.getById(req.params.id, 'FAQ'),
      200
    )
    return res.status(200).json(response)
  }
  getFAQs = async (req: Request, res: Response): Promise<Response<IResponseSuccessObject>> => {
    const response = new IResponseSuccessObject('get FAQ success', await ServicesFactory.getAllData('FAQ'), 200)
    return res.status(200).json(response)
  }
  paginationFAQ = async (
    req: Request<any, unknown, IFaq>,
    res: Response
  ): Promise<Response<IResponseSuccessObject>> => {
    const response = new IResponseSuccessObject(
      'get FAQ success',
      await ServicesFactory.pagination(req.params.page, req.params.size, 'FAQ'),
      200
    )
    return res.status(200).json(response)
  }
}
const faqController = new FAQController()
export default faqController
