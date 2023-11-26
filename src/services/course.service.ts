import { ICourse, IImage } from '~/interfaces/course.interface'
import Courses from '~/models/course.models'
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
export const addImageToCourse = async (courseId: string, image: IImage) => {
  const fillter = { _id: courseId }
  const update = { $push: { images: image } }
  const options = { new: true }
  const course = await Courses.findOneAndUpdate<ICourse>(fillter, update, options)
  return course?.images
}
export const getAllImages = async (idCourse: string): Promise<IImage[]> => {
  const fillter = { _id: idCourse }
  const course = await Courses.findOne<ICourse>(fillter)
  return course?.images || []
}
