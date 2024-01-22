import faqModel from '~/models/faq.model'
// import { Services } from './service.service'
import { IFaq } from '~/interfaces/faq.interface'
import { Services } from './super.service'

export class FAQServices extends Services<IFaq> {
  createData(payload: IFaq): Promise<IFaq> {
    return faqModel.create(payload)
    // throw new Error('Method not implemented.')
  }
  // payload: IFaq
  // constructor(data: IFaq) {
  //   super()
  //   this.payload = data
  // }
  //  createData(payload: IFaq) {
  //   return  faqModel.create(payload)
  // }
}
