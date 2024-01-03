import { IImage } from '~/interfaces/course.interface'
import { IProduct } from '~/interfaces/product.interface'
import { IResponseErrorObject } from '~/interfaces/response.interface'
import productModels from '~/models/product.models'
import { deleteFile } from './file.service'
export const findProductById = async (id: string) => {
  const fillter = { _id: id }
  try {
    const products: IProduct | any = await productModels.findOne(fillter)
    return products
  } catch (error) {
    throw new IResponseErrorObject('not found product', 400)
  }
}
export const findAllProduct = async () => {
  const products: IProduct[] | any = await productModels.find()
  if (products.length == 0) {
    return []
  }
  if (products) {
    return products
  }
}
export const deleteFIleImageProduct = async (_id: string): Promise<void> => {
  const course = (await productModels.findOne({ _id: _id })) as IProduct
  if (course.images && course.images.length > 0) {
    course.images.map(async (image: IImage) => {
      await deleteFile(image.url)
    })
  }
}

export const deleteFIleVideoProduct = async (_id: string): Promise<void> => {
  const course = (await productModels.findOne({ _id: _id })) as IProduct
  if (course.videos && course.videos.length > 0) {
    course.videos.map(async (video: IImage) => {
      await deleteFile(video.url)
    })
  }
}
