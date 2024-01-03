import { promises } from 'dns'
import { IImage } from '~/interfaces/course.interface'
import { INews } from '~/interfaces/news.interface'
import newsModels from '~/models/news.models'
export default interface PaginationResult {
  page: number
  size: number
  data: any[]
  total_pages: number
  previous: number | null
  next: number | null
}
export const add = async (data: INews): Promise<INews | void> => {
  const news = (await newsModels.create(data)) as INews
  return news
}
export const findByID = async (id: string): Promise<INews | void> => {
  const fillter = { _id: id }
  const data = (await newsModels.findOne(fillter)) as INews
  return data
}
export const findAll = async (page: number, size: number): Promise<PaginationResult> => {
  const limit = size
  const skip = (page - 1) * size
  const data = await newsModels.find().limit(limit).skip(skip)
  const total_documents = await newsModels.countDocuments()
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
export const updateByID = async (id: string, body: INews): Promise<INews | void> => {
  const fillter = { _id: id }
  const update = { $set: body }
  const options = { new: true }
  const news = await newsModels.findOneAndUpdate(fillter, update, options)
  if (news) {
    return news
  }
}
export const deleteByID = async (id: string): Promise<INews | any> => {
  const fillter = { _id: id }
  const options = { new: true }
  const result = await newsModels.findOneAndDelete(fillter, options)
  return result
}
export const deleteAll = async (): Promise<INews | void> => {}
