import { Request, Response } from 'express'
import { IResonseObject } from '~/interfaces/response.interface'
import { deleteImageS3, getImageS3, uploadImageS3 } from '~/services/upload.service'
import Course from '~/models/course.models'
import { ICourse, IImage } from '~/interfaces/course.interface'
import { addImageToCourse, updateImageFromPopImages } from '~/services/course.service'
export const uploadImageFromLocalToS3 = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idCourse = req.params.idCourse
  const course = Course.findById({ _id: idCourse }) as ICourse

  if (!idCourse) {
    return res.status(404).send('not found')
  }
  if (!course) {
    return res.status(404).json({ mesage: 'not found coures' })
  }
  const file = req.file
  if (!file) {
    return res.status(400).send('Không có file được tải lên.')
  }
  if (file) {
    const urlImage: string = await uploadImageS3(file)
    if (!urlImage) {
      return res.status(500).json({ message: 'upload image failed', urlImage: urlImage })
    }
    const image: IImage = {
      url: urlImage
    }
    const addImage = await addImageToCourse(idCourse, image)

    if (!addImage) {
      return res.status(500).json({ message: 'upload image failed' })
    }
    if (!course.image) {
      const update = await updateImageFromPopImages(idCourse, addImage)
      if (!update) {
        return res.status(500).json({ message: 'update image failed' })
      }
    }

    return res.status(200).json({ message: 'upload image success', result: addImage })
  } else {
    return res.status(400).json({ message: 'File not provided or invalid' })
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
