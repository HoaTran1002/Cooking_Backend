import mongoose, { Schema } from 'mongoose'
import { INews } from '~/interfaces/news.interface'
import { imageSchema } from './course.models'
import { deleteImageS3 } from '~/services/upload.service'

const news = new Schema<INews>({
  title: { type: String },
  author: { type: String },
  content: { type: String },
  dateCreated: { type: Date, default: Date.now() },
  image: imageSchema
})
news.pre('findOneAndDelete', async function (next) {
  try {
    const doc = (await this.model.findOne(this.getQuery())) as INews
    if (doc && doc.image) {
      await deleteImageS3(doc.image.key)
    }
    next()
  } catch (error: any) {
    next(error)
  }
})

export default mongoose.model('newsModels', news)
