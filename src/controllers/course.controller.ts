import { Error } from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import { getImageVPS } from '~/services/uploadToVps.service'
import { PutImageS3 } from '~/services/uploadToS3.service'
import { deleteFile, updateFileContent } from '~/services/file.service'
import { deleteFIleCourse, deleteFIleImageCourse, deleteFIleVideoCourse, findById } from '~/services/course.service'
import {
  addImageToCourse,
  addVideoToCourse,
  findCourseImage,
  findCourseVideo,
  updateDeleteImage,
  updateDeleteVideo
} from '~/repositories/course.repository'
import Courses from '~/models/course.models'
import { IResonseObject } from '~/contract/interfaces/response.interface'
import { ICourse, IImage, IParams, IRoadmap, IVideo } from '~/contract/interfaces/course.interface'

//create
export const courseCreate = async (
  req: Request<unknown, unknown, ICourse>,
  res: Response
): Promise<Response<IResonseObject> | void | IResonseObject> => {
  try {
    const course = await Courses.create(req.body)
    const response: IResonseObject = {
      message: 'create sucess!',
      status: 200,
      data: course
    }
    if (!course) {
      response.message = 'create failed!!'
      response.status = 400
    }

    return res.status(response.status ? response.status : 400).json(response)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const courseCreateRoadmap = async (
  req: Request<any, unknown, IRoadmap>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const response: IResonseObject = {
    message: ''
  }
  const params: IParams = req.params
  const roadmap: IRoadmap = req.body
  const fillter = { _id: params.courseId }
  const update = { $push: { roadmaps: roadmap } }
  const options = { new: true }
  const course = await Courses.findOneAndUpdate<ICourse>(fillter, update, options)
  if (!course) {
    return res.status(404).send('Course not found')
  }
  if (course) {
    response.message = 'created roadmap'
    response.data = course
    response.status = 201
  }
  return res.status(201).json({ course: course })
}

export const getCourseById = async (
  req: Request<any, unknown, ICourse>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idCourse = req.params.courseId
  const response: IResonseObject = {
    message: 'get course success!'
  }
  if (!idCourse) {
    return res.status(404).json({ message: 'idcourse required' })
  }

  const course = await findById(idCourse)
  if (!course) {
    return res.status(404).json({ message: 'Course not found' })
  }
  response.data = course
  return res.status(200).json(response)
}
//update
export const courseUpdateById = async (
  req: Request<any, unknown, ICourse>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  try {
    const params = req.params
    const fillter = { _id: params?.courseId }
    const upadate: ICourse = req.body
    const options = { new: true }
    const response: IResonseObject = {
      message: ''
    }
    if (!params.courseId) {
      response.message = 'not exist courseId'
      response.status = 401
      return res.status(401).json(response)
    }
    const course = await Courses.findOneAndUpdate(fillter, upadate, options)
    if (!course) {
      return res.status(404).send('Course not found')
    }
    if (course) {
      response.message = 'updated course success'
      response.status = 200
      response.data = course
      return res.status(200).json(course)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

export const updateRoadmapById = async (
  req: Request<any, unknown, IRoadmap>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  try {
    const params = req.params
    const fillter = { _id: params.courseId, 'roadmaps._id': params.roadmapId }
    const roadmap: IRoadmap = req.body
    const update = {
      $set: {
        'roadmaps.$.name': roadmap.name,
        'roadmaps.$.startTime': roadmap.startTime,
        'roadmaps.$.endTime': roadmap.endTime,
        'roadmaps.$.knowledge': roadmap.knowledge,
        'roadmaps.$.skill': roadmap.skill
      }
    }
    const options = { new: true }
    const response: IResonseObject = {
      message: ''
    }
    const course = await Courses.findOneAndUpdate(fillter, update, options)
    if (!course) {
      return res.status(404).send('Course or roadmap not found')
    }
    if (course) {
      response.message = 'updated roadmap success'
      response.status = 200
      response.data = course
      return res.status(200).json(response)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

//remove
export const removeRoadmapById = async (
  req: Request<any, unknown, unknown>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  try {
    const response: IResonseObject = {
      message: ''
    }
    const params = req.params
    const filter = { _id: params.courseId }
    const update = {
      $pull: {
        roadmaps: { _id: params.roadmapId }
      }
    }

    const options = { new: true }
    const updatedCourse = await Courses.findOneAndUpdate(filter, update, options)
    if (!updatedCourse) {
      return res.status(404).send('Course or roadmap not found')
    } else {
      response.message = 'deleted roadmap success'
      response.status = 204
      response.data = updatedCourse
      return res.status(204).json(response)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
export const removeRoadmaps = async (
  req: Request<any, unknown, unknown>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  try {
    const response: IResonseObject = {
      message: ''
    }
    const params = req.params
    const filter = { _id: params.courseId }
    const update = {
      $pull: {
        roadmaps: { _id: params.roadmapId }
      }
    }

    const options = { new: true }
    const updatedCourse = await Courses.findOneAndUpdate(filter, update, options)
    if (!updatedCourse) {
      return res.status(404).send('Course or roadmap not found')
    } else {
      response.message = 'deleted roadmap success'
      response.status = 204
      response.data = updatedCourse
      return res.status(204).json(response)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
export const removeCourseById = async (
  req: Request<any, unknown, unknown>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  try {
    const response: IResonseObject = {
      message: ''
    }
    const params = req.params
    const filter = { _id: params.courseId }
    if (!params.courseId) {
      return res.status(400).json({ message: 'not found idCourse prams' })
    }
    const courseExist = await findById(params.courseId)
    if (!courseExist) {
      return res.status(400).json({ message: 'id invalid' })
    }
    await deleteFIleCourse(params.courseId)
    const udeletedCourse = await Courses.deleteOne(filter)
    if (!udeletedCourse) {
      return res.status(404).send('Course  not found')
    } else {
      response.message = 'deleted Course success'
      return res.status(200).send(response)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

//queries
export const getAll = async (
  req: Request<unknown, unknown, ICourse>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  try {
    const course = await Courses.find({})
    const response: IResonseObject = {
      message: 'get all sucess!',
      status: 200,
      data: course
    }
    return res.status(200).json(course)
  } catch (error) {
    console.log(error)
  }
}
export const findOneById = async (req: Request, res: Response): Promise<void | IResonseObject> => {}

//file
//image
export const uploadImageFromLocalToVPSByCourseId = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  try {
    const idCourse = req.params.idCourse

    if (!idCourse) {
      return res.status(404).send('not found id course')
    }
    const course = await findById(idCourse)

    if (!course) {
      return res.status(404).json({ mesage: 'not found coures' })
    }
    const file = req.file
    if (!file) {
      return res.status(400).send('Không có file được tải lên.')
    }
    const imageObject: IImage = {
      url: file.path
    }
    const Images = await addImageToCourse(idCourse, imageObject)
    if (!Images) {
      return res.status(500).json({ message: 'upload image failed' })
    }

    return res.status(200).json({ message: 'upload image success', result: Images })
  } catch (error: any) {
    const file = req.file
    await deleteFile(file!.path)
    throw new Error(error)
  }
}
export const deleteImageFromVPSByCourseId = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idCourse = req.params.idCourse
  const keyImage = req.params.keyImage
  if (!idCourse) {
    return res.status(400).json({ message: 'not found idCourse prams' })
  }

  if (!keyImage) {
    return res.status(400).json({ message: 'not found keyImage prams' })
  }
  const courseExist = await findById(idCourse)
  if (!courseExist) {
    return res.status(400).json({ message: 'idProduct invalid' })
  }
  const image: IImage = await findCourseImage(idCourse, keyImage)
  if (!image) {
    return res.status(400).json({ message: 'key Image invalid' })
  }
  const course = await Courses.findById(idCourse)
  const newImages = course?.images?.filter((item: any) => item._id != keyImage)
  await deleteFile(image.url)
  if (newImages) {
    await updateDeleteImage(idCourse, newImages)
    return res.status(200).json({ message: 'delete image success' })
  }
}
export const updateContentImageVPS = async (req: Request, res: Response): Promise<Response<IResonseObject> | void> => {
  try {
    const idCourse = req.params.idCourse
    const keyImage = req.params.keyImage
    if (!idCourse) {
      return res.status(400).json({ message: 'not found idCourse prams' })
    }

    if (!keyImage) {
      return res.status(400).json({ message: 'not found keyImage prams' })
    }
    const image: IImage = await findCourseImage(idCourse, keyImage)
    if (!image) {
      return res.status(400).json({ message: 'key Image invalid' })
    }

    if (!image) {
      return res.status(404).json({ mesage: 'not found image' })
    }
    const file = req.file
    if (!file) {
      return res.status(400).send('Không có file được tải lên.')
    }

    const imageObject: string | void = await updateFileContent(file, image.url)
    if (imageObject != null) {
      return res.status(200).json({ message: 'File has been updated successfully' })
    }
  } catch (error: any) {
    const file = req.file
    await deleteFile(file!.path)
    throw new Error(error)
  }
}
export const removeAllImageByCourseById = async (
  req: Request<any, unknown, unknown>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  try {
    const response: IResonseObject = {
      message: ''
    }
    const params = req.params
    const filter = { _id: params.idCourse }
    const update = { $set: { images: [] } }
    const options = { new: true }
    if (!params.idCourse) {
      return res.status(400).json({ message: 'not found idCourse prams' })
    }
    const courseExist = await findById(params.idCourse)
    if (!courseExist) {
      return res.status(400).json({ message: 'id invalid' })
    }
    if (courseExist.images && courseExist.images.length == 0) {
      return res.status(200).send('list image clean')
    }
    await deleteFIleImageCourse(params.idCourse)
    const deleted = await Courses.findByIdAndUpdate(filter, update, options)
    if (!deleted) {
      return res.status(404).send('Course  not found')
    } else {
      response.message = 'deleted all image  success'
      return res.status(200).send(response)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
//video
export const uploadVideoFromLocalToVPSByCourseId = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  try {
    const idCourse = req.params.idCourse

    if (!idCourse) {
      return res.status(404).send('not found id course')
    }
    const course = await findById(idCourse)

    if (!course) {
      return res.status(404).json({ mesage: 'not found coures' })
    }
    const file = req.file
    if (!file) {
      return res.status(400).send('Không có file được tải lên.')
    }

    const videoObject: IVideo = {
      url: file.path
    }

    const Video = await addVideoToCourse(idCourse, videoObject)
    if (!Video) {
      return res.status(500).json({ message: 'upload video failed' })
    }

    return res.status(200).json({ message: 'upload video success', result: Video })
  } catch (error: any) {
    const file = req.file
    await deleteFile(file!.path)
    throw new Error(error)
  }
}
export const deleteVideoVPSByCourseId = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idCourse = req.params.idCourse
  const keyVideo = req.params.keyVideo
  if (!idCourse) {
    return res.status(400).json({ message: 'not found idCourse prams' })
  }

  if (!keyVideo) {
    return res.status(400).json({ message: 'not found key video prams' })
  }
  const courseExist = await findById(idCourse)
  if (!courseExist) {
    return res.status(400).json({ message: 'idProduct invalid' })
  }
  const video: IVideo = await findCourseVideo(idCourse, keyVideo)
  if (!video) {
    return res.status(400).json({ message: 'key Image invalid' })
  }

  const course = await Courses.findById(idCourse)
  const newVideos = course?.videos?.filter((item: any) => item._id != keyVideo)
  await deleteFile(video.url)
  if (newVideos) {
    await updateDeleteVideo(idCourse, newVideos)
    return res.status(200).json({ message: 'delete video success' })
  }
}
export const updateContentVideoVPS = async (req: Request, res: Response): Promise<Response<IResonseObject> | void> => {
  try {
    const idCourse = req.params.idCourse
    const keyVideo = req.params.keyVideo
    if (!idCourse) {
      return res.status(400).json({ message: 'not found idCourse prams' })
    }

    if (!keyVideo) {
      return res.status(400).json({ message: 'not found key video prams' })
    }
    const video: IVideo = await findCourseVideo(idCourse, keyVideo)
    if (!video) {
      return res.status(400).json({ message: 'key video invalid' })
    }

    if (!video) {
      return res.status(404).json({ mesage: 'not found image' })
    }
    const file = req.file
    if (!file) {
      return res.status(400).send('Không có file được tải lên.')
    }

    const videoObject: string | void = await updateFileContent(file, video.url)
    if (videoObject != null) {
      return res.status(200).json({ message: 'File has been updated successfully' })
    }
  } catch (error: any) {
    const file = req.file
    await deleteFile(file!.path)
    throw new Error(error)
  }
}
export const removeAllVideoByCourseById = async (
  req: Request<any, unknown, unknown>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  try {
    const response: IResonseObject = {
      message: ''
    }
    const params = req.params
    const filter = { _id: params.idCourse }
    const update = { $set: { videos: [] } }
    const options = { new: true }
    if (!params.idCourse) {
      return res.status(400).json({ message: 'not found idCourse prams' })
    }
    const courseExist = await findById(params.idCourse)
    if (!courseExist) {
      return res.status(400).json({ message: 'id invalid' })
    }
    if (courseExist.videos && courseExist.videos.length == 0) {
      return res.status(200).send('list video clean')
    }
    await deleteFIleVideoCourse(params.idCourse)
    const deleted = await Courses.findByIdAndUpdate(filter, update, options)
    if (!deleted) {
      return res.status(404).send('Course  not found')
    } else {
      response.message = 'deleted all video  success'
      return res.status(200).send(response)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
// export const deleteFileOnVPS = async (req: Request, res: Response): Promise<void | Response> => {
//   const filePath = req.params.filePath
//   await deleteFile(filePath)
//   return res.send('delete file success')
// }
