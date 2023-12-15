import { INews } from '~/interfaces/news.interface'
import newsModels from '~/models/news.models'

export const add = async (data: INews): Promise<INews | void> => {
  const news = (await newsModels.create(data)) as INews
  return news
}
export const findByID = async (id: string): Promise<INews | void> => {
  const fillter = { _id: id }
  const data = (await newsModels.findOne(fillter)) as INews
  return data
}
export const findAll = async (): Promise<INews[] | []> => {
  const data = (await newsModels.find()) as INews[]
  return data
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
  const result = await newsModels.deleteOne(fillter, options)
  return result
}
export const deleteAll = async (): Promise<INews | void> => {}
