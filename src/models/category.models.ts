import mongoose, { Schema } from 'mongoose'
import { ICategory } from '~/contract/interfaces/category.interface'
import productModels from './product.models'
import { updateIdCategory } from '~/services/product.service'

const category = new Schema<ICategory>({
  name: { type: String },
  idCourse: { type: String },
  listTimeLearning: { type: [String] }
})
category.pre('findOneAndDelete', async function (next) {
  try {
    const doc = await this.model.findOne(this.getQuery())
    const products = await productModels.find({ idCategory: new mongoose.Types.ObjectId(doc._id) })

    if (products.length > 0) {
      products.map(async (product) => {
        await updateIdCategory(new mongoose.Types.ObjectId(product.id).toString(), '')
      })
    }

    next()
  } catch (error: any) {
    next(error)
  }
})
export default mongoose.model('Category', category)
