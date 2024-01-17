import { IImage } from '~/interfaces/course.interface'
import { IProduct } from '~/interfaces/product.interface'
import { IResponseErrorObject } from '~/interfaces/response.interface'
import productModels from '~/models/product.models'
import { deleteFile } from './file.service'
import { deleteProduct } from '~/repositories/product.repository'
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
  const product = (await productModels.findOne({ _id: _id })) as IProduct
  if (product.images && product.images.length > 0) {
    product.images.map(async (image: IImage) => {
      await deleteFile(image.url)
    })
  }
}

export const deleteFIleVideoProduct = async (_id: string): Promise<void> => {
  const product = (await productModels.findOne({ _id: _id })) as IProduct
  if (product.videos && product.videos.length > 0) {
    product.videos.map(async (video: IImage) => {
      await deleteFile(video.url)
    })
  }
}
export const updateIdCategory = async (idProduct: string, idCategory: string): Promise<void> => {
  const fillter = { id: idProduct }
  const update = { idCategory }
  const options = { new: true }
  await productModels.findOneAndUpdate(fillter, update, options)
}

export const deleteByIdProduct = async (idProduct: string): Promise<void> => {
  const product = (await findProductById(idProduct)) as IProduct

  if (product.images.length > 0) {
    // const images = await getAllImageProduct(idProduct)
    await deleteFIleImageProduct(idProduct)
  }
  if (product.videos.length > 0) {
    // const videos = await getAllVideoProduct(idProduct)
    await deleteFIleVideoProduct(idProduct)
  }
  await deleteProduct(idProduct)
}
