import faqModel from '~/models/faq.model'
// import { Services } from './service.service'
import { IFaq } from '~/interfaces/faq.interface'
import { Services } from './super.service'
import { IResponseErrorObject } from '~/interfaces/response.interface'
import PaginationResult from '~/interfaces/pagination.interface'
import { ITourOverView } from '~/interfaces/tour.interface'
import tourModels from '~/models/tour.models'
import { findProductById } from './product.service'

export class TourServices extends Services<ITourOverView> {
  createData(payload: ITourOverView): Promise<ITourOverView> {
    const product = findProductById(payload.idProduct)
    if (!product) {
      throw new IResponseErrorObject('not found product by id', 404)
    }
    return tourModels.create(payload)
  }
  async editData(id: string, payload: ITourOverView): Promise<ITourOverView> {
    if (!id) {
      throw new IResponseErrorObject('id required.', 404)
    }
    const tour = await tourModels.findById({ _id: id })
    if (!tour) {
      throw new IResponseErrorObject('not found tour by id.', 404)
    }
    const updatedTour = await tourModels.findOneAndUpdate({ _id: id }, payload, { new: true })
    if (!updatedTour) {
      throw new Error('failed to update faq.')
    }
    return updatedTour
  }
  async deleteData(id: string) {
    if (!id) {
      throw new IResponseErrorObject('id required.', 404)
    }
    const tour = await tourModels.findById({ _id: id })
    if (!tour) {
      throw new IResponseErrorObject('not found tour by id.', 404)
    }

    return tourModels.findByIdAndDelete(id)
  }
  async getById(id: string): Promise<ITourOverView> {
    if (!id) {
      throw new IResponseErrorObject('id required.', 404)
    }
    const tour = await tourModels.findById({ _id: id })
    if (!tour) {
      throw new IResponseErrorObject('not found tour by id.', 404)
    }

    return tour
  }
  async getAllData(): Promise<ITourOverView[]> {
    const tour = await tourModels.find()
    return tour
  }
  async pagination(page: number, size: number): Promise<PaginationResult> {
    const limit = size
    const skip = (page - 1) * size
    const data = await tourModels.find().limit(limit).skip(skip)
    const total_documents = await tourModels.countDocuments()
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
