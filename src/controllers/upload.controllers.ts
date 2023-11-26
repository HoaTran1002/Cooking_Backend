import { Request, Response } from 'express'
import { IResonseObject } from '~/interfaces/response.interface'
import { deleteImageS3, getImageS3, uploadImageS3 } from '~/services/upload.service'
export const uploadImageFromLocalToS3 = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  try {
    const file = req.file
    if (!file) {
      return res.status(400).send('Không có file được tải lên.')
    }
    if (file) {
      const ressult = await uploadImageS3(file)
      if (!ressult) {
        return res.status(403).json({ message: 'upload failed', ressult: ressult })
      }
      return res.status(200).json({ message: 'upload success', ressult: ressult })
    } else {
      return res.status(400).json({ message: 'file invalid' })
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
export const getImageFromS3Storage = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const ressult = await getImageS3('hinhdep.jpg')
  if (!ressult) {
    return res.status(400).json({ message: 'get failed', ressult: ressult })
  }
  return res.status(200).json({ message: 'get success', ressult: ressult })
}
export const deleteImageFromS3Storage = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const result = deleteImageS3('hinhdep.jpg')
  if (!result) {
    return res.status(400).json({ message: 'delete failed', result: result })
  }
  return res.status(200).json({ message: 'delete success', result: result })
}
