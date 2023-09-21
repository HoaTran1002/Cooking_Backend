import mongoose, { Schema } from 'mongoose'
import { ICourse, IImages, IRoadmap, IVideos } from '~/interfaces/course.interface'

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
  time: { type: String },
  skill: [{ type: String }],
  knowledge: [{ type: String }]
})
const course = new Schema<ICourse>({
  title: { type: String },
  description: { type: String },
  images: [imageSchema],
  videos: [videoSchema],
  roadmaps: [roadmapSchema],
  price: { type: Number },
  discountPrice: { type: Number },
  discountPercentage: { type: Number }
})
export default mongoose.model('Courses', course)
