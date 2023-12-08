import { Request, Response } from 'express'
import { IImage } from '~/interfaces/course.interface'
import { IProduct } from '~/interfaces/product.interface'
import { IResonseObject } from '~/interfaces/response.interface'
import Products from '~/models/product.models'
import { getAllImages } from '~/repositories/course.repository'
import {
  deleteAllImage,
  deleteAllVideo,
  deleteProduct,
  editProduct,
  findOneProductById,
  findProductImage,
  findProductVideo,
  getAllImageProduct,
  getAllVideoProduct,
  updateDeleteProductImage,
  updateDeleteProductVideo,
  updateProductWhenUploadImage,
  updateProductWhenUploadVideo
} from '~/repositories/product.repository'
import { findAllProduct, findProductById } from '~/services/product.service'
import { deleteImageS3, deleteVideoS3, uploadImageS3, uploadVideoS3 } from '~/services/upload.service'
export const createProduct = async (
  req: Request<unknown, unknown, IProduct>,
  res: Response
): Promise<Response<IResonseObject | void>> => {
  const body = req.body
  const product = await Products.create(body)
  if (product) {
    return res.status(200).json({ message: 'created product success', data: product })
  }
  return res.status(400).json('invalid data')
}

export const getAllProduct = async (
  req: Request<unknown, unknown, IProduct>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const products = await Products.find()
  return res.status(200).json({ message: 'got all product success', data: products })
}
export const getProductById = async (
  req: Request<any, unknown, IProduct>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idProduct = req.params.idProduct
  if (idProduct) {
    const product = await findProductById(idProduct)
    if (!product) {
      return res.status(404).json({ message: 'not found product by id' })
    }
    return res.status(200).json({ message: 'got data product success', data: product })
  }
  return res.status(400).json({ message: 'invalid id product' })
}
export const editProductById = async (
  req: Request<any, unknown, IProduct>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idProduct = req.params.idProduct

  const product = await findProductById(idProduct)
  if (!product) {
    return res.status(404).json({ message: 'not found product by id' })
  }
  if (!idProduct) {
    return res.status(404).json({ message: 'not found id product' })
  }
  console.log('body:', req.body)
  const productEdit = await editProduct(idProduct, req.body)
  if (!productEdit) {
    return res.status(404).json({ message: 'not found product by id' })
  }
  return res.status(200).json({ message: 'update product success', data: productEdit })
}
//image
export const uploadProductImageByIdFromLocalS3 = async (
  req: Request<any, unknown, IProduct>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const file = req.file
  const idProduct = req.params.idProduct
  if (!idProduct) {
    return res.status(400).json({ message: 'not found idProduct prams' })
  }
  const productEReady = await findProductById(idProduct)
  if (!productEReady) {
    return res.status(404).json({ message: 'not found product by id' })
  }
  if (!file) {
    return res.status(400).json({ message: 'file not found' })
  }
  const image: IImage = await uploadImageS3(file)
  if (!image) {
    return res.status(400).json({ message: 'can not upload file ' })
  }
  const product = await updateProductWhenUploadImage(idProduct, image)
  return res.status(200).json({ message: 'upload succes ', data: product })
}
export const deleteProductImageS3 = async (
  req: Request<any, unknown, IProduct>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idProduct = req.params.idProduct
  const keyImage = req.params.key
  if (!idProduct) {
    return res.status(400).json({ message: 'not found idProduct prams' })
  }
  if (!keyImage) {
    return res.status(400).json({ message: 'not found keyImage prams' })
  }
  const product = await findOneProductById(idProduct)
  if (!product) {
    return res.status(400).json({ message: 'idProduct invalid' })
  }
  const image = await findProductImage(idProduct, keyImage)
  if (!image) {
    return res.status(400).json({ message: 'keyImage invalid' })
  }
  await deleteImageS3(keyImage)
  const productDeleteImage = await updateDeleteProductImage(idProduct, image)
  return res.status(200).json({ message: 'success', data: productDeleteImage })
}
export const deleteAllProductImageS3 = async (
  req: Request<any, unknown, IProduct>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idProduct = req.params.idProduct
  const product = await findProductById(idProduct)
  if (!product) {
    return res.status(404).json({ message: 'not found product by id' })
  }
  const images = await getAllImageProduct(idProduct)
  if (images.length === 0) {
    return res.status(200).json({ data: images })
  }
  if (images) {
    await deleteAllImage(idProduct, images)
    return res.status(200).send({ message: 'deleted all image of product' })
  }
}
//video
export const uploadProductVideoByIdFromLocalS3 = async (
  req: Request<any, unknown, IProduct>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const file = req.file
  const idProduct = req.params.idProduct
  if (!idProduct) {
    return res.status(400).json({ message: 'not found idProduct prams' })
  }
  const productEReady = await findProductById(idProduct)
  if (!productEReady) {
    return res.status(404).json({ message: 'not found product by id' })
  }
  if (!file) {
    return res.status(400).json({ message: 'file not found' })
  }
  const image: IImage = await uploadVideoS3(file)
  if (!image) {
    return res.status(400).json({ message: 'can not upload file ' })
  }
  const product = await updateProductWhenUploadVideo(idProduct, image)
  return res.status(200).json({ message: 'upload succes ', data: product })
}
export const deleteVideoImageS3 = async (
  req: Request<any, unknown, IProduct>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idProduct = req.params.idProduct
  const keyVideo = req.params.key
  if (!idProduct) {
    return res.status(400).json({ message: 'not found idProduct prams' })
  }
  if (!keyVideo) {
    return res.status(400).json({ message: 'not found keyVideo prams' })
  }
  const product = await findOneProductById(idProduct)
  if (!product) {
    return res.status(400).json({ message: 'idProduct invalid' })
  }
  const video = await findProductVideo(idProduct, keyVideo)
  if (!video) {
    return res.status(400).json({ message: 'keyVideo invalid' })
  }
  await deleteVideoS3(keyVideo)
  const productDeleteVideo = await updateDeleteProductVideo(idProduct, video)
  return res.status(200).json({ message: 'delete video success', data: productDeleteVideo })
}
export const deleteAllProductVideoS3 = async (
  req: Request<any, unknown, IProduct>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idProduct = req.params.idProduct
  const product = await findProductById(idProduct)
  if (!product) {
    return res.status(404).json({ message: 'not found product by id' })
  }
  const videos = await getAllVideoProduct(idProduct)
  if (videos.length === 0) {
    return res.status(200).json({ data: videos })
  }
  if (videos) {
    await deleteAllVideo(idProduct, videos)
    return res.status(200).send({ message: 'deleted all videos of product' })
  }
}
export const deleteProductById = async (
  req: Request<any, unknown, IProduct>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idProduct = req.params.idProduct
  const product: IProduct = await findProductById(idProduct)
  if (!product) {
    return res.status(404).json({ message: 'not found product by id' })
  }
  if (product.images.length > 0) {
    const images = await getAllImageProduct(idProduct)
    await deleteAllImage(idProduct, images)
  }
  if (product.videos.length > 0) {
    const videos = await getAllVideoProduct(idProduct)
    await deleteAllVideo(idProduct, videos)
  }
  await deleteProduct(idProduct)
  return res.json(200).send('delete success')
}
export const deleteAllProduct = async (
  req: Request<any, unknown, IProduct>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const products = await findAllProduct()
  if (products.length == 0) {
    return res.status(201).json({ message: 'not exist product' })
  }
  if (products) {
    products.map(async (product: any) => {
      if (product.images.length > 0) {
        const images = await getAllImageProduct(product._id)
        await deleteAllImage(product._id, images)
      }
      if (product.videos.length > 0) {
        const videos = await getAllVideoProduct(product._id)
        await deleteAllVideo(product._id, videos)
      }
      await deleteProduct(product._id)
    })
  }

  return res.status(200).send('delete all product success')
}
