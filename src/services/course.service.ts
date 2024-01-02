import { ICourse, IImage, IVideo } from '~/interfaces/course.interface'
import courseModels from '~/models/course.models'
import Courses from '~/models/course.models'
import { deleteFile } from './file.service'
export const findById = async (id: string) => {
  const fillter = { _id: id }
  const result = await Courses.findOne(fillter)
  return result
}
export const deleteFIleCourse = async (_id: string): Promise<void> => {
  const course = (await courseModels.findOne({ _id: _id })) as ICourse
  if (course.images && course.images.length > 0) {
    course.images.map(async (image: IImage) => {
      await deleteFile(image.url)
    })
  }
  if (course.videos && course.videos.length > 0) {
    course.videos.map(async (video: IVideo) => {
      await deleteFile(video.url)
    })
  }
}
export const deleteFIleImageCourse = async (_id: string): Promise<void> => {
  const course = (await courseModels.findOne({ _id: _id })) as ICourse
  if (course.images && course.images.length > 0) {
    course.images.map(async (image: IImage) => {
      await deleteFile(image.url)
    })
  }
}
export const deleteFIleVideoCourse = async (_id: string): Promise<void> => {
  const course = (await courseModels.findOne({ _id: _id })) as ICourse

  if (course.videos && course.videos.length > 0) {
    course.videos.map(async (video: IVideo) => {
      await deleteFile(video.url)
    })
  }
}
