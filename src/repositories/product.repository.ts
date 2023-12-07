import { string } from 'joi'
import mongoose from 'mongoose'
import { IVideo, IImage } from '~/interfaces/course.interface'
import { IProduct } from '~/interfaces/product.interface'
import { IResponseErrorObject } from '~/interfaces/response.interface'
import productModels from '~/models/product.models'
import { deleteImageS3 } from '~/services/upload.service'
export const editProduct = async (id: string, body: IProduct) => {
  const fillter = { _id: id }
  const update: IProduct = body
  const options = { new: true }
  const product = await productModels.findOneAndUpdate(fillter, update, options)
  return product
}
export const updateProductWhenUploadImage = async (idProduct: string, image: IImage) => {
  const fillter = { _id: idProduct }
  const update = { $push: { images: image } }
  const options = { new: true }
  const product = await productModels.findOneAndUpdate(fillter, update, options)
  return product
}
export const updateProductWhenUploadVideo = async (idProduct: string, video: IVideo) => {
  const fillter = { _id: idProduct }
  const update = { $push: { videos: video } }
  const options = { new: true }
  const product = await productModels.findOneAndUpdate(fillter, update, options)
  return product
}
export const updateDeleteProductImage = async (idProduct: string, image: IImage) => {
  const fillter = { _id: idProduct }
  const update = { $pull: { images: { key: image.key } } }
  const options = { new: true }
  const product = await productModels.findOneAndUpdate(fillter, update, options)
  return product
}
export const findOneProductById = async (idProduct: string) => {
  const product: IProduct | null = await productModels.findById({ _id: idProduct })
  return product
}
export const findProductImage = async (idProduct: string, key: string) => {
  const productImage = await productModels.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(idProduct)
      }
    },
    {
      $unwind: '$images'
    },
    {
      $match: {
        'images.key': key
      }
    }
  ])

  if (productImage && productImage.length > 0) {
    const foundImage = productImage[0].images
    return foundImage
  }
  return null
}
export const getAllImageProduct = async (idProduct: string) => {
  const fillter = { _id: idProduct }
  const product: IProduct | null = await productModels.findOne(fillter)
  if (product) {
    return product.images
  }
  return []
}
export const deleteAllImage = async (idProduct: string, images: IImage[]) => {
  for (let index = 0; index < images.length; index++) {
    try {
      await deleteImageS3(images[index].key)
      await updateDeleteProductImage(idProduct, images[index])
    } catch (error: any) {
      throw new IResponseErrorObject(error.message.toString, 500)
    }
  }
}
