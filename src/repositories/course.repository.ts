import Courses from '~/models/course.models'

import { ICourse, IImage, IVideo } from '~/interfaces/course.interface'
export const remove = async (req: Request, res: Response): Promise<void> => {
  console.log('use service remove succesed!!')
}
export const find = async (req: Request, res: Response): Promise<void> => {
  console.log('use service find succesed!!')
}
export const create = async (req: Request, res: Response): Promise<void> => {
  console.log('use service remove succesed!!')
}
export const updateImageFromPopImages = async (courseId: string, imageArray: IImage[]) => {
  const fillter = { _id: courseId }
  const update = { image: imageArray[0] }
  const options = { new: true }
  const course = await Courses.findOneAndUpdate<ICourse>(fillter, update, options)
  return course
}
export const updateVideoFromPopVideos = async (courseId: string, videoArray: IVideo[]) => {
  const fillter = { _id: courseId }
  const update = { image: videoArray[0] }
  const options = { new: true }
  const course = await Courses.findOneAndUpdate<ICourse>(fillter, update, options)
  return course
}
export const addImageToCourse = async (courseId: string, image: IImage) => {
  const fillter = { _id: courseId }
  const update = { $push: { images: image } }
  const options = { new: true }
  const course = await Courses.findOneAndUpdate<ICourse>(fillter, update, options)
  return course?.images
}
export const addVideoToCourse = async (courseId: string, video: IVideo) => {
  const fillter = { _id: courseId }
  const update = { $push: { videos: video } }
  const options = { new: true }
  const course = await Courses.findOneAndUpdate<ICourse>(fillter, update, options)
  return course?.videos
}
export const getAllImages = async (idCourse: string): Promise<IImage[]> => {
  const fillter = { _id: idCourse }
  const course = await Courses.findOne<ICourse>(fillter)
  return course?.images || []
}
export const getAllVideos = async (idCourse: string): Promise<IVideo[]> => {
  const fillter = { _id: idCourse }
  const course = await Courses.findOne<ICourse>(fillter)
  return course?.videos || []
}
export const updateDeleteAllImages = async (idCourse: string) => {
  const fillter = { _id: idCourse }
  const update = { $set: { images: [], image: null } }
  const options = { new: true }
  const course = await Courses.findOneAndUpdate(fillter, update, options)
  return course
}
export const updateDeleteAllVideos = async (idCourse: string) => {
  const fillter = { _id: idCourse }
  const update = { $set: { videos: [], video: null } }
  const options = { new: true }
  const course = await Courses.findOneAndUpdate(fillter, update, options)
  return course
}
export const updateDeleteImage = async (idCourse: string, images: IImage[]) => {
  const fillter = { _id: idCourse }
  const update = { $set: { images: images, image: images[0] } }
  const options = { new: true }
  const result = await Courses.findOneAndUpdate(fillter, update, options)
  return result
}
export const updateDeleteVideo = async (idCourse: string, videos: IVideo[]) => {
  const fillter = { _id: idCourse }
  const update = { $set: { videos: videos, video: videos[0] } }
  const options = { new: true }
  const result = await Courses.findOneAndUpdate(fillter, update, options)
  return result
}
