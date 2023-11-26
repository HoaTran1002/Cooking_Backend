import { Request, Response } from 'express'
import { IResonseObject } from '~/interfaces/response.interface'
import {
  deleteImageS3,
  deleteVideoS3,
  getImageS3,
  getVideoS3,
  uploadImageS3,
  uploadVideoS3
} from '~/services/upload.service'
import Course from '~/models/course.models'
import { ICourse, IImage, IVideo } from '~/interfaces/course.interface'
import {
  addImageToCourse,
  addVideoToCourse,
  getAllImages,
  getAllVideos,
  updateDeleteAllImages,
  updateDeleteAllVideos,
  updateDeleteImage,
  updateDeleteVideo,
  updateImageFromPopImages
} from '~/services/course.service'

//Image
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
export const getImageFromS3BykeyImage = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const keyImage = req.params.keyImage
  if (keyImage) {
    const result = await getImageS3(keyImage)
    if (!result) {
      return res.status(400).json({ message: 'not found image' })
    }
    return res.status(200).json({ message: 'get  images success', image: result })
  } else if (!keyImage) {
    return res.status(400).json({ message: 'invalid params' })
  }
}
export const deleteAllImageFromS3ByCourseId = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idCourse = req.params.idCourse
  if (idCourse) {
    const course = (await Course.findById({ _id: idCourse })) as ICourse

    if (course?.images?.length) {
      course.images.map(async (item: IImage) => {
        await deleteImageS3(item.key.toString())
      })
      const courseUpdate = await updateDeleteAllImages(idCourse)
      return res.status(200).json({ message: 'delete image all success', courseUpdate })
    } else {
      return res.status(400).json({ message: 'invalid prams' })
    }
  } else if (!idCourse) {
    return res.status(400).json({ message: 'invalid params' })
  }
}
export const deleteImageFromS3ByCourseId = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idCourse = req.params.idCourse
  const keyImage = req.params.keyImage
  if (idCourse && keyImage) {
    const course = await Course.findById(idCourse)
    const newImages = course?.images?.filter((item) => item.key != keyImage)
    await deleteImageS3(keyImage)
    if (newImages) {
      const result = await updateDeleteImage(idCourse, newImages)
      return res.status(200).json({ message: 'delete image success' })
    }
  }
}
//Video
export const uploadVideoFromLocalToS3ByCourseId = async (
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
    const videoObject: IVideo = await uploadVideoS3(file)
    if (!videoObject) {
      return res.status(500).json({ message: 'upload videoObject failed', videoObject: videoObject })
    }

    const Videos = await addVideoToCourse(idCourse, videoObject)

    if (!Videos) {
      return res.status(500).json({ message: 'upload image failed' })
    }
    if (!course.image) {
      const courseUpdate = await updateImageFromPopImages(idCourse, Videos)
      if (!courseUpdate) {
        return res.status(500).json({ message: 'update image failed' })
      }
    }

    return res.status(200).json({ message: 'upload image success', result: Videos })
  } else {
    return res.status(400).json({ message: 'File not provided or invalid' })
  }
}
export const getAllVideoFromS3ByCourseId = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idCourse = req.params.idCourse
  if (idCourse) {
    const result = await getAllVideos(idCourse)
    if (!result) {
      return res.status(400).json({ message: 'invalid params' })
    }
    return res.status(200).json({ message: 'get all video success', videos: result })
  } else if (!idCourse) {
    return res.status(400).json({ message: 'invalid params' })
  }
}
export const getVideoFromS3BykeyVideo = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const keyVideo = req.params.keyVideo
  if (keyVideo) {
    const result = await getVideoS3(keyVideo)
    if (!result) {
      return res.status(400).json({ message: 'not found video' })
    }
    return res.status(200).json({ message: 'get  video success', video: result })
  } else if (!keyVideo) {
    return res.status(400).json({ message: 'invalid params' })
  }
}
export const deleteAllVideoFromS3ByCourseId = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idCourse = req.params.idCourse
  if (idCourse) {
    const course = (await Course.findById({ _id: idCourse })) as ICourse

    if (course?.videos?.length) {
      course.videos.map(async (item: IVideo) => {
        await deleteVideoS3(item.key.toString())
      })
      const courseUpdate = await updateDeleteAllVideos(idCourse)
      return res.status(200).json({ message: 'delete video all success', courseUpdate })
    } else {
      return res.status(400).json({ message: 'invalid prams' })
    }
  } else if (!idCourse) {
    return res.status(400).json({ message: 'invalid params' })
  }
}
export const deleteVideoFromS3ByCourseId = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idCourse = req.params.idCourse
  const keyVideo = req.params.keyVideo
  if (idCourse && keyVideo) {
    const course = await Course.findById(idCourse)
    const newVideos = course?.videos?.filter((item) => item.key != keyVideo)
    await deleteVideoS3(keyVideo)
    if (newVideos) {
      const result = await updateDeleteVideo(idCourse, newVideos)
      return res.status(200).json({ message: 'delete video success' })
    }
  }
}
