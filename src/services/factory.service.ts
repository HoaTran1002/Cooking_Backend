import { FAQServices } from './faq.service'

export class ServicesFactory {
  static createData = (type: string, payload: any) => {
    switch (type) {
      case 'FAQ':
        return new FAQServices().createData(payload)
      default:
        break
    }
  }
}
