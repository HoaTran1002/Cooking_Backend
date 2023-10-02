import mongoose, { Schema } from 'mongoose'
import { ICourses, ICourse, IImages, IRoadmap, IVideos } from '~/interfaces/course.interface'

const imageSchema = new Schema<IImages>({
  _id: { type: String },
  url: { type: String }
})

const videoSchema = new Schema<IVideos>({
  _id: { type: String },
  url: { type: String },
  duration: { type: Number }
})
const roadmapSchema = new Schema<IRoadmap>({
  startTime: { type: String },
  endTime: { type: String },
  skill: { type: String },
  knowledge: { type: String }
})
const course = new Schema<ICourse>({
  title: { type: String },
  description: { type: String },
  image: { type: String },
  images: [imageSchema],
  video: { type: String },
  videos: [videoSchema],
  roadmaps: [roadmapSchema],
  price: { type: Number },
  discountPrice: { type: Number },
  discountPercentage: { type: Number },
  timeCreate: { type: String },
  timeUpdate: { type: String }
})

const courses = new Schema<ICourses>({
  totalCourseCurrent: { type: Number },
  Items: [course]
})
export default mongoose.model('Courses', courses)
