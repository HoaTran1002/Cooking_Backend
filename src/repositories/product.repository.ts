import { string } from 'joi'
import mongoose from 'mongoose'
import { IVideo, IImage } from '~/contract/interfaces/course.interface'
import { IProduct } from '~/contract/interfaces/product.interface'
import { IResponseErrorObject } from '~/contract/interfaces/response.interface'
import productModels from '~/models/product.models'
import tourModels from '~/models/tour.models'
import { ServicesFactory } from '~/services/factory.service'
import { deleteImageS3, deleteVideoS3 } from '~/services/uploadToS3.service'
export const editProduct = async (id: string, body: IProduct) => {
  const fillter = { _id: id }
  const update: IProduct = body
  const options = { new: true }
  const product = await productModels.findOneAndUpdate(fillter, update, options)
  return product
}
export const addImageToProduct = async (id: string, image: IImage) => {
  const fillter = { _id: id }
  const update = { $push: { images: image } }
  const options = { new: true }
  const course = await productModels.findOneAndUpdate<IProduct>(fillter, update, options)
  return course?.images
}
export const addVideoToProduct = async (id: string, video: IVideo) => {
  const fillter = { _id: id }
  const update = { $push: { videos: video } }
  const options = { new: true }
  const course = await productModels.findOneAndUpdate<IProduct>(fillter, update, options)
  return course?.videos
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
export const updateDeleteImage = async (idProduct: string, images: IImage[]) => {
  const fillter = { _id: idProduct }
  const update = { $set: { images: images, image: images[0] } }
  const options = { new: true }
  const result = await productModels.findOneAndUpdate(fillter, update, options)
  return result
}
export const updateDeleteVideo = async (idProduct: string, videos: IVideo[]) => {
  const fillter = { _id: idProduct }
  const update = { $set: { videos: videos, video: videos[0] } }
  const options = { new: true }
  const result = await productModels.findOneAndUpdate(fillter, update, options)
  return result
}
export const updateDeleteProductVideo = async (idProduct: string, video: IVideo) => {
  console.log('video:', video)
  const fillter = { _id: idProduct }
  const update = { $pull: { videos: { key: video.key } } }
  const options = { new: true }
  console.log('update')
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
        'images._id': new mongoose.Types.ObjectId(key)
      }
    }
  ])

  if (productImage && productImage.length > 0) {
    const foundImage = productImage[0].images
    return foundImage
  }
  return null
}
export const findProductVideo = async (idProduct: string, key: string) => {
  const productVideo: IVideo | any = await productModels.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(idProduct)
      }
    },
    {
      $unwind: '$videos'
    },
    {
      $match: {
        'videos._id': new mongoose.Types.ObjectId(key)
      }
    }
  ])

  if (productVideo && productVideo.length > 0) {
    const foundVideo = productVideo[0].videos
    return foundVideo
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
export const getAllVideoProduct = async (idProduct: string) => {
  const fillter = { _id: idProduct }
  const product: IProduct | null = await productModels.findOne(fillter)
  if (product) {
    return product.videos
  }
  return []
}
// export const deleteAllImage = async (idProduct: string, images: IImage[]) => {
//   for (let index = 0; index < images.length; index++) {
//     try {
//       await deleteImageS3(images[index].key)
//       await updateDeleteProductImage(idProduct, images[index])
//     } catch (error: any) {
//       throw new IResponseErrorObject(error.message.toString, 500)
//     }
//   }
// }
// export const deleteAllVideo = async (idProduct: string, videos: IImage[]) => {
//   for (let index = 0; index < videos.length; index++) {
//     try {
//       await deleteVideoS3(videos[index].key)
//       await updateDeleteProductVideo(idProduct, videos[index])
//     } catch (error: any) {
//       throw new IResponseErrorObject(error.message.toString, 500)
//     }
//   }
// }
export const deleteProduct = async (idProduct: string) => {
  const fillter = { _id: idProduct }
  const tours = await tourModels.find({ idProduct: idProduct })
  if (tours.length > 0) {
    tours.map(async (tour) => {
      await ServicesFactory.deleteData(new mongoose.Types.ObjectId(tour._id).toString(), 'Tour')
    })
  }
  await productModels.findByIdAndDelete(fillter)
}
