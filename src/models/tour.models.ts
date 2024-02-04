import mongoose, { Schema } from 'mongoose'
import { ITourOverView } from '~/interfaces/tour.interface'
import { imageSchema } from './product.models'
import { deleteFile } from '~/services/file.service'

const tourSchema = new Schema<ITourOverView>({
  idProduct: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  activityName: { type: String },
  activityContent: { type: String },
  activityImages: { type: imageSchema, default: {} }
})
tourSchema.pre('findOneAndDelete', async function (next) {
  try {
    const doc = (await this.model.findOne(this.getQuery())) as ITourOverView

    if (doc.activityImages) {
      await deleteFile(doc.activityImages.url)
    }
    next()
  } catch (error: any) {
    next(error)
  }
})
export default mongoose.model('tourModels', tourSchema)
