import { IProduct } from '~/interfaces/product.interface'
import { IResponseErrorObject } from '~/interfaces/response.interface'
import productModels from '~/models/product.models'
export const findProductById = async (id: string) => {
  const fillter = { _id: id }
  try {
    const products: IProduct | any = await productModels.findOne(fillter)
    return products
  } catch (error) {
    throw new IResponseErrorObject('not found product', 400)
  }
}
