import { Request, Response } from 'express'
import { INews } from '~/contract/interfaces/news.interface'
import { IResonseObject } from '~/contract/interfaces/response.interface'
import { add, deleteByID, findAll, findByID, updateByID } from '~/repositories/news.respository'
import { deleteFile, updateFileContent } from '~/services/file.service'

export const createNews = async (
  req: Request<unknown, unknown, INews>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const newsData = req.body
  const file = req.file
  try {
    if (!file) {
      return res.status(400).json({ message: 'file not found' })
    }

    newsData.image = { url: file.path }
    const createdNews = await add(newsData)
    const response: IResonseObject = {
      message: 'created news success',
      data: createdNews
    }
    return res.status(200).json(response)
  } catch (error: any) {
    await deleteFile(file!.path)
    throw new Error(error)
  }
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
  const page = parseInt(req.params.page, 10)
  const size = parseInt(req.params.size, 10)

  if (isNaN(page) || isNaN(size) || page <= 0 || size <= 0) {
    return res.status(400).json({ message: 'page and size should be positive integers greater than 0' })
  }
  const getAllNews = await findAll(Number(page), Number(size))
  const response: IResonseObject = {
    message: 'get all success',
    data: getAllNews
  }
  if (!getAllNews) {
    return res.status(200).json(response)
  }
  return res.status(200).json(getAllNews)
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
  const newsExist = (await findByID(id)) as INews

  if (!newsExist) {
    return res.status(400).json({ message: 'cannot found any news' })
  }
  if (!newsExist.image.url) {
    return res.status(400).json({ message: 'cannot found news image' })
  }
  body.image = { url: newsExist.image.url }
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
  await deleteFile(newsExist.image.url)
  if (result) {
    return res.status(200).json({ message: 'deleted news success' })
  }
}
export const updateContentImageVPS = async (req: Request, res: Response): Promise<Response<IResonseObject> | void> => {
  const fileUpload = req.file
  try {
    const id = req.params.id
    const file = req.file
    if (!id) {
      return res.status(400).json({ message: 'not found id prams' })
    }
    const newsExist = await findByID(id)
    if (newsExist == null) {
      return res.status(400).json({ message: 'cannot found any news' })
    } else {
      if (!newsExist.image) {
        return res.status(404).json({ mesage: 'not found image' })
      }
      if (!file) {
        return res.status(400).send('Không có file được tải lên.')
      }
      const imageObject: string | void = await updateFileContent(file, newsExist.image.url)
      if (imageObject != null) {
        return res.status(200).json({ message: 'File has been updated successfully' })
      }
    }
  } catch (error: any) {
    await deleteFile(fileUpload!.path)
    throw new Error(error)
  }
}
