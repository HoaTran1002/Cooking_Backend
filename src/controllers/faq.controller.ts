import { Request, Response } from 'express'
import { IFaq } from '~/interfaces/faq.interface'
import { IResponseSuccessObject } from '~/interfaces/response.interface'
import { ServicesFactory } from '~/services/factory.service'

class FAQController {
  createFAQ = async (req: Request<any, unknown, IFaq>, res: Response): Promise<Response<IResponseSuccessObject>> => {
    const response = new IResponseSuccessObject(
      'success create FAQ',
      await ServicesFactory.createData('FAQ', req.body),
      200
    )
    return res.status(200).json(response)
  }
}
const faqController = new FAQController()
export default faqController
