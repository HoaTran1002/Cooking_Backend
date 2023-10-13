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
  name: { type: String, default: '' },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: Date.now },
  skill: { type: String, default: '' },
  knowledge: { type: String, default: '' }
})
const course = new Schema<ICourse>({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  images: [imageSchema],
  video: { type: String, default: '' },
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
