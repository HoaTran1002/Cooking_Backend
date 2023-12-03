import mongoose, { Schema } from 'mongoose'
import { ICourses, ICourse, IImage, IRoadmap, IVideo } from '~/interfaces/course.interface'

export const imageSchema = new Schema<IImage>({
  url: { type: String },
  key: { type: String }
})

const videoSchema = new Schema<IVideo>({
  url: { type: String },
  key: { type: String }
})
const roadmapSchema = new Schema<IRoadmap>({
  name: { type: String, default: 'null' },
  startTime: { type: Date },
  endTime: { type: Date },
  skill: { type: String, default: 'null' },
  knowledge: { type: String, default: 'null' }
})
export const course = new Schema<ICourse>({
  category: { type: String },
  level: { type: String },
  title: { type: String, default: 'null' },
  description: { type: String, default: 'null' },
  image: imageSchema,
  images: [imageSchema],
  video: videoSchema,
  videos: [videoSchema],
  roadmaps: [roadmapSchema],
  price: { type: Number, default: 0 },
  discountPrice: { type: Number, default: 0 },
  discountPercentage: { type: Number, default: 0 },
  timeCreate: { type: Date, default: Date.now },
  timeUpdate: { type: Date }
})

export default mongoose.model('Courses', course)
