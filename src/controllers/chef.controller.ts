import { Request, Response } from 'express'
import { IChef } from '~/contract/interfaces/chef.interface'
import { IResonseObject } from '~/contract/interfaces/response.interface'
import { addChef, deleteByIDChef, getChefByID, updateChefByID } from '~/repositories/chef.repository'
import { findAll } from '~/services/chef.service'
import { deleteFile, updateFileContent } from '~/services/file.service'

export const createChef = async (
  req: Request<unknown, unknown, IChef>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const chefData = req.body
  const file = req.file
  try {
    if (!file) {
      return res.status(400).json({ message: 'file not found' })
    }
    chefData.image = { url: file.path }
    const createdNews = await addChef(chefData)
    const response: IResonseObject = {
      message: 'created chef success',
      data: createdNews
    }
    return res.status(200).json(response)
  } catch (error: any) {
    await deleteFile(file!.path)
    throw new Error(error)
  }
}

export const updateTextDataChefById = async (
  req: Request<any, unknown, IChef>,
  res: Response
): Promise<Response<IChef> | void> => {
  const id = req.params.id
  const body = req.body
  if (!id) {
    return res.status(400).json({ message: 'cannot found id' })
  }
  const chefExist = (await getChefByID(id)) as IChef
  if (!chefExist) {
    return res.status(400).json({ message: 'cannot found any chef' })
  }
  if (!chefExist.image.url) {
    return res.status(400).json({ message: 'cannot found chef image' })
  }
  body.image = { url: chefExist.image.url }
  const chefUpdate = await updateChefByID(id, body)
  const response: IResonseObject = {
    message: 'updated data chef success',
    data: chefUpdate
  }
  if (chefUpdate) {
    return res.status(200).json(response)
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
    const chefExist = await getChefByID(id)
    if (chefExist == null) {
      return res.status(400).json({ message: 'cannot found any news' })
    } else {
      if (!chefExist.image) {
        return res.status(404).json({ mesage: 'not found image' })
      }
      if (!file) {
        return res.status(400).send('Không có file được tải lên.')
      }
      const imageObject: string | void = await updateFileContent(file, chefExist.image.url)
      if (imageObject != null) {
        return res.status(200).json({ message: 'File has been updated successfully' })
      }
    }
  } catch (error: any) {
    await deleteFile(fileUpload!.path)
    throw new Error(error)
  }
}
export const getByIdChef = async (
  req: Request<any, unknown, IChef>,
  res: Response
): Promise<Response<IChef> | void> => {
  const id = req.params.id
  if (!id) {
    return res.status(400).json({ message: 'cannot found id' })
  }
  const chefExist = await getChefByID(id)
  if (!chefExist) {
    return res.status(400).json({ message: 'cannot found any chef' })
  }
  const response: IResonseObject = {
    message: 'get data success',
    data: chefExist
  }
  return res.status(200).json(response)
}
export const getAllChef = async (req: Request<any, unknown, IChef>, res: Response): Promise<Response<IChef> | void> => {
  const page = parseInt(req.params.page, 10)
  const size = parseInt(req.params.size, 10)

  if (isNaN(page) || isNaN(size) || page <= 0 || size <= 0) {
    return res.status(400).json({ message: 'page and size should be positive integers greater than 0' })
  }
  const getAllChef = await findAll(Number(page), Number(size))
  const response: IResonseObject = {
    message: 'get all success',
    data: getAllChef
  }
  if (!getAllChef) {
    return res.status(200).json(response)
  }
  return res.status(200).json(getAllChef)
}
export const deleteChefById = async (
  req: Request<any, unknown, IChef>,
  res: Response
): Promise<Response<IChef> | void> => {
  const id = req.params.id
  if (!id) {
    return res.status(400).json({ message: 'cannot found id' })
  }
  const chefExist = await getChefByID(id)
  if (!chefExist) {
    return res.status(400).json({ message: 'cannot found any chef' })
  }

  await deleteFile(chefExist.image.url)
  await deleteByIDChef(id)

  return res.status(200).json({ message: 'deleted chef success' })
}
