import faqModel from '~/models/faq.model'
// import { Services } from './service.service'
import { IFaq } from '~/interfaces/faq.interface'
import { Services } from './super.service'
import { IResponseErrorObject } from '~/interfaces/response.interface'
import PaginationResult from '~/interfaces/pagination.interface'

export class FAQServices extends Services<IFaq> {
  createData(payload: IFaq): Promise<IFaq> {
    return faqModel.create(payload)
  }
  async editData(id: string, payload: IFaq): Promise<IFaq> {
    if (!id) {
      throw new IResponseErrorObject('id required.', 404)
    }
    const faq = await faqModel.findById({ _id: id })
    if (!faq) {
      throw new IResponseErrorObject('not found faq by id.', 404)
    }
    const updatedFaq = await faqModel.findOneAndUpdate({ _id: id }, payload, { new: true })
    if (!updatedFaq) {
      throw new Error('failed to update faq.')
    }
    return updatedFaq
  }
  async deleteData(id: string) {
    if (!id) {
      throw new IResponseErrorObject('id required.', 404)
    }
    const faq = await faqModel.findById({ _id: id })
    if (!faq) {
      throw new IResponseErrorObject('not found faq by id.', 404)
    }

    return faqModel.findByIdAndDelete(id)
  }
  async getById(id: string): Promise<IFaq> {
    if (!id) {
      throw new IResponseErrorObject('id required.', 404)
    }
    const faq = await faqModel.findById({ _id: id })
    if (!faq) {
      throw new IResponseErrorObject('not found faq by id.', 404)
    }

    return faq
  }
  async getAllData(): Promise<IFaq[]> {
    const faq = await faqModel.find()
    return faq
  }
  async pagination(page: number, size: number): Promise<PaginationResult> {
    const limit = size
    const skip = (page - 1) * size
    const data = await faqModel.find().limit(limit).skip(skip)
    const total_documents = await faqModel.countDocuments()
    const total_pages = Math.ceil(total_documents / size)
    const previous_pages = page > 1 ? page - 1 : null
    const next_pages = skip + size < total_documents ? page + 1 : null
    return {
      page,
      size,
      data,
      total_pages,
      previous: previous_pages,
      next: next_pages
    }
  }
}
