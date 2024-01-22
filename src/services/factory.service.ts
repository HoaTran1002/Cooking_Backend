import { FAQServices } from './faq.service'

export class ServicesFactory {
  static createData = (type: string, payload: any) => {
    switch (type) {
      case 'FAQ':
        return new FAQServices().createData(payload)
      default:
        throw new Error('not found type.')
    }
  }
  static editData = (id: string, type: string, payload: any) => {
    switch (type) {
      case 'FAQ':
        return new FAQServices().editData(id, payload)
      default:
        throw new Error('not found type.')
    }
  }
  static deleteData = (id: string, type: string) => {
    switch (type) {
      case 'FAQ':
        return new FAQServices().deleteData(id)
      default:
        throw new Error('not found type.')
    }
  }
  static getById = (id: string, type: string) => {
    switch (type) {
      case 'FAQ':
        return new FAQServices().getById(id)
      default:
        throw new Error('not found type.')
    }
  }
  static getAllData = (type: string) => {
    switch (type) {
      case 'FAQ':
        return new FAQServices().getAllData()
      default:
        throw new Error('not found type.')
    }
  }
  static pagination = (page: number, size: number, type: string) => {
    switch (type) {
      case 'FAQ':
        return new FAQServices().pagination(page, size)
      default:
        throw new Error('not found type.')
    }
  }
}
