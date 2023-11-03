import mongoose, { Schema } from 'mongoose'
import { ICourses, ICourse, IImage, IRoadmap, IVideo } from '~/interfaces/course.interface'

const imageSchema = new Schema<IImage>({
  url: { type: String }
})

const videoSchema = new Schema<IVideo>({
  url: { type: String },
  duration: { type: Number }
})
const roadmapSchema = new Schema<IRoadmap>({
  name: { type: String, default: 'null' },
  startTime: { type: Date },
  endTime: { type: Date },
  skill: { type: String, default: 'null' },
  knowledge: { type: String, default: 'null' }
})
export const course = new Schema<ICourse>({
  title: { type: String, default: 'null' },
  description: { type: String, default: 'null' },
  image: { type: String, default: 'null' },
  images: [imageSchema],
  video: { type: String, default: 'null' },
  videos: [videoSchema],
  roadmaps: [roadmapSchema],
  price: { type: Number, default: 0 },
  discountPrice: { type: Number, default: 0 },
  discountPercentage: { type: Number, default: 0 },
  timeCreate: { type: Date, default: Date.now },
  timeUpdate: { type: Date }
})

// const courses = new Schema<ICourses>({
//   totalCourseCurrent: { type: Number },
//   Items: [course]
// })
export default mongoose.model('Courses', course)
