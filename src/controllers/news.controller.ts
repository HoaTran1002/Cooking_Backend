import { Request, Response } from 'express'
import { INews } from '~/interfaces/news.interface'
import { IResonseObject } from '~/interfaces/response.interface'
import { add, deleteByID, findAll, findByID, updateByID } from '~/repositories/news.respository'

export const createNews = async (
  req: Request<unknown, unknown, INews>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const newsData = req.body
  const createdNews = await add(newsData)
  const response: IResonseObject = {
    message: 'created news success',
    data: createdNews
  }
  return res.status(200).json(response)
}
export const getNewsById = async (
  req: Request<any, unknown, INews>,
  res: Response
): Promise<Response<INews> | void> => {
  const id = req.params.id
  if (!id) {
    return res.status(400).json({ message: 'cannot found id' })
  }
  const newsExist = await findByID(id)
  if (!newsExist) {
    return res.status(400).json({ message: 'cannot found any news' })
  }
  const response: IResonseObject = {
    message: 'get data success',
    data: newsExist
  }
  return res.status(200).json(response)
}
export const getAllNews = async (req: Request<any, unknown, INews>, res: Response): Promise<Response<INews> | void> => {
  const getAllNews = await findAll()
  const response: IResonseObject = {
    message: 'get all success',
    data: getAllNews
  }
  if (!getAllNews) {
    return res.status(200).json(response)
  }
  return res.status(200).json(response)
}
export const updateNewsById = async (
  req: Request<any, unknown, INews>,
  res: Response
): Promise<Response<INews> | void> => {
  const id = req.params.id
  const body = req.body
  if (!id) {
    return res.status(400).json({ message: 'cannot found id' })
  }
  const newsExist = await findByID(id)
  if (!newsExist) {
    return res.status(400).json({ message: 'cannot found any news' })
  }
  const newsUpdate = await updateByID(id, body)
  const response: IResonseObject = {
    message: 'updated data success',
    data: newsUpdate
  }
  if (newsUpdate) {
    return res.status(200).json(response)
  }
}
export const deleteNewsById = async (
  req: Request<any, unknown, INews>,
  res: Response
): Promise<Response<INews> | void> => {
  const id = req.params.id
  if (!id) {
    return res.status(400).json({ message: 'cannot found id' })
  }
  const newsExist = await findByID(id)
  if (!newsExist) {
    return res.status(400).json({ message: 'cannot found any news' })
  }
  const result = await deleteByID(id)
  if (result) {
    return res.status(200).json({ message: 'deleted news success' })
  }
}
