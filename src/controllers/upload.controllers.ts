import { Request, Response } from 'express'
import { IResonseObject } from '~/interfaces/response.interface'
import { deleteImageS3, getImageS3, uploadImageS3 } from '~/services/upload.service'
import Course from '~/models/course.models'
import { ICourse, IImage } from '~/interfaces/course.interface'
import { addImageToCourse, getAllImages, updateImageFromPopImages } from '~/services/course.service'
export const uploadImageFromLocalToS3ByCourseId = async (
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
    const imageObject: IImage = await uploadImageS3(file)
    if (!imageObject) {
      return res.status(500).json({ message: 'upload image failed', imageObject: imageObject })
    }

    const Images = await addImageToCourse(idCourse, imageObject)

    if (!Images) {
      return res.status(500).json({ message: 'upload image failed' })
    }
    if (!course.image) {
      const courseUpdate = await updateImageFromPopImages(idCourse, Images)
      if (!courseUpdate) {
        return res.status(500).json({ message: 'update image failed' })
      }
    }

    return res.status(200).json({ message: 'upload image success', result: Images })
  } else {
    return res.status(400).json({ message: 'File not provided or invalid' })
  }
}
export const getAllImageFromS3ByCourseId = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idCourse = req.params.idCourse
  if (idCourse) {
    const result = await getAllImages(idCourse)
    if (!result) {
      return res.status(400).json({ message: 'invalid params' })
    }
    return res.status(200).json({ message: 'get all images success', images: result })
  } else if (!idCourse) {
    return res.status(400).json({ message: 'invalid params' })
  }
}
export const deleteAllImageFromS3ByCourseId = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idCourse = req.params.idCourse
  if (idCourse) {
    const result = deleteImageS3('hinhdep.jpg')
    if (!result) {
      return res.status(400).json({ message: 'delete failed', result: result })
    }
    return res.status(200).json({ message: 'delete success', result: result })
  } else if (!idCourse) {
    return res.status(400).json({ message: 'invalid params' })
  }
}
