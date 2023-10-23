import { NextFunction, Request, Response } from 'express'
import { ICourse, IImage, IParams, IRoadmap, IVideo } from '~/interfaces/course.interface'
import { IResonseObject } from '~/interfaces/response.interface'
import { remove } from '~/sevices/course.service'
import Courses from '~/models/course.models'
import { Error } from 'mongoose'
import { IFile, IFileResponseObject, uploadFileToDrive } from '~/sevices/drive.service'

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
      response.message = 'create failed!'
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
export const courseUpFiles = async (
  req: Request<any, unknown, ICourse>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  try {
    const response: IResonseObject = {
      message: ''
    }
    const params: IParams = req.params
    if (!params) {
      response.message = 'courseId not exist'

      return res.status(404).json(response)
    }
    if (!req.files) {
      response.message = 'files not exist'
      return res.status(404).json(response)
    }
    if (Array.isArray(req.files)) {
      const files: IFile[] = req.files
      const fillter = { _id: params.courseId }
      const options = { new: true }

      const course = await Courses.findById(fillter)
      if (!course) {
        response.message = 'course not exist'
        return res.status(404).json(response)
      }
      for (const file of files) {
        const fileUploaded: IFileResponseObject = await uploadFileToDrive(file)
        if (fileUploaded.mimeType == 'jpe/png') {
          const image: IImage = {
            url: fileUploaded.id
          }
          const update = { $push: { images: image } }
          await course.updateOne(update, options)
        }
        if (fileUploaded.mimeType == 'videos/mp4') {
          const video: IVideo = {
            url: fileUploaded.id
          }
          const update = { $push: { videos: video } }
          await course.updateOne(update, options)
        }
      }
      const image = course.images?.pop || 'null'
      const video = course.videos?.pop || 'null'
      const updateCourse = { $set: { image: image, video: video } }
      const updated = await course.updateOne(updateCourse, options)
      if (!updated) {
        return res.status(404).send('Course  not found')
      }
      if (updated) {
        response.message = 'uploaded success'
        response.data = updated
        response.status = 201
      }
      //thiếu giải phóng file khi thêm
      return res.status(201).json(response)
    }
  } catch (error: any) {
    throw new Error(error)
  }
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

    const udeletedCourse = await Courses.findByIdAndDelete(filter)
    if (!udeletedCourse) {
      return res.status(404).send('Course  not found')
    } else {
      response.message = 'deleted Course success'
      response.status = 204
      response.data = udeletedCourse
      return res.status(204).send('ok')
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
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }
}
export const findOneById = async (req: Request, res: Response): Promise<void | IResonseObject> => {}
