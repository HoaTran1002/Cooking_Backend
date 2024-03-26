import mongoose, { Schema } from 'mongoose'
import { IPageManager } from '~/contract/interfaces/pageManager.interface'
import { imageSchema } from './course.models'
import { deleteFile } from '~/services/file.service'

const page = new Schema<IPageManager>({
  name: { type: String },
  baner: { type: imageSchema, default: {} }
})

page.pre('findOneAndDelete', async function (next) {
  try {
    const doc = (await this.model.findOne(this.getQuery())) as IPageManager
    if (doc.baner) {
      await deleteFile(doc.baner.url)
    }
    next()
  } catch (error: any) {
    next(error)
  }
})

export const pageModel = mongoose.model('pageModel', page)
