import mongoose, { Schema } from 'mongoose'
import { INews } from '~/interfaces/news.interface'

const news = new Schema<INews>({
  title: { type: String },
  author: { type: String },
  content: { type: String },
  dateCreated: { type: Date, default: Date.now() }
})
export default mongoose.model('newsModels', news)
