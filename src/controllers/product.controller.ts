import { Request, Response } from 'express'
import { ICourse, IImage, IVideo } from '~/interfaces/course.interface'
import { IProduct } from '~/interfaces/product.interface'
import { IResonseObject } from '~/interfaces/response.interface'
import productModels from '~/models/product.models'
import Products from '~/models/product.models'
import { getAllImages } from '~/repositories/course.repository'
import {
  addImageToProduct,
  addVideoToProduct,
  deleteProduct,
  editProduct,
  findOneProductById,
  findProductImage,
  findProductVideo,
  getAllImageProduct,
  getAllVideoProduct,
  updateDeleteImage,
  updateDeleteProductImage,
  updateDeleteProductVideo,
  updateDeleteVideo,
  updateProductWhenUploadImage,
  updateProductWhenUploadVideo
} from '~/repositories/product.repository'
import { findCategoryById } from '~/services/category.service'
import { courseFindById } from '~/services/course.service'
import { deleteFile, updateFileContent } from '~/services/file.service'
import {
  deleteFIleImageProduct,
  deleteFIleVideoProduct,
  findAllProduct,
  findProductById
} from '~/services/product.service'
import { deleteImageS3, deleteVideoS3, uploadImageS3, uploadVideoS3 } from '~/services/uploadToS3.service'
export const createProduct = async (
  req: Request<any, unknown, IProduct>,
  res: Response
): Promise<Response<IResonseObject | void>> => {
  const body = req.body
  const idCourse = req.params.idCourse
  const idCategory = req.params.idCategory
  if (!idCourse) {
    return res.status(404).json({ message: 'not exist idCourse' })
  }
  const course = (await courseFindById(idCourse)) as ICourse
  if (!course) {
    return res.status(404).json({ message: 'not found Course by this id' })
  }
  if (idCategory) {
    const category = findCategoryById(idCategory)
    if (!category) {
      return res.status(404).json({ message: 'not found category by this id' })
    }
    body.idCategory = idCategory
  }
  body.idCourse = idCourse
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
  const body = req.body
  const idCourse = req.params.idCourse
  const idCategory = req.params.idCategory
  if (idCourse) {
    const course = (await courseFindById(idCourse)) as ICourse
    if (!course) {
      return res.status(404).json({ message: 'not found Course by this id' })
    }
    body.idCourse = idCourse
  }

  if (idCategory) {
    const category = findCategoryById(idCategory)
    if (!category) {
      return res.status(404).json({ message: 'not found category by this id' })
    }
    body.idCategory = idCategory
  }

  const productEdit = await editProduct(idProduct, body)
  if (!productEdit) {
    return res.status(404).json({ message: 'not found product by id' })
  }
  return res.status(200).json({ message: 'update product success', data: productEdit })
}
//s3 storage
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
    // await deleteAllImage(idProduct, images)
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
  const image: IVideo = await uploadVideoS3(file)
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
    // await deleteAllVideo(idProduct, videos)
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
    // const images = await getAllImageProduct(idProduct)
    await deleteFIleImageProduct(idProduct)
  }
  if (product.videos.length > 0) {
    // const videos = await getAllVideoProduct(idProduct)
    await deleteFIleVideoProduct(idProduct)
  }
  await deleteProduct(idProduct)
  return res.status(200).send('delete success')
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
        // await deleteAllImage(product._id, images)
      }
      if (product.videos.length > 0) {
        const videos = await getAllVideoProduct(product._id)
        // await deleteAllVideo(product._id, videos)
      }
      await deleteProduct(product._id)
    })
  }

  return res.status(200).send('delete all product success')
}

//file
//image
export const uploadImageFromLocalToVPSByProductId = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  try {
    const idProduct = req.params.idProduct

    if (!idProduct) {
      return res.status(404).send('not found id product')
    }
    const product = await productModels.findById({ _id: idProduct })

    if (!product) {
      return res.status(404).json({ mesage: 'not found product' })
    }
    const file = req.file
    if (!file) {
      return res.status(400).send('Không có file được tải lên.')
    }
    const imageObject: IImage = {
      url: file.path
    }
    const Images = await addImageToProduct(idProduct, imageObject)
    if (!Images) {
      return res.status(500).json({ message: 'upload image failed' })
    }

    return res.status(200).json({ message: 'upload image success', result: Images })
  } catch (error: any) {
    const file = req.file
    await deleteFile(file!.path)
    throw new Error(error)
  }
}
export const deleteImageFromVPSByProductId = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idProduct = req.params.idProduct
  const keyImage = req.params.keyImage
  if (!idProduct) {
    return res.status(404).send('not found id product')
  }
  const product = await productModels.findById({ _id: idProduct })

  if (!product) {
    return res.status(404).json({ mesage: 'not found product' })
  }
  if (!keyImage) {
    return res.status(400).json({ message: 'not found keyImage prams' })
  }
  const image: IImage = await findProductImage(idProduct, keyImage)
  if (!image) {
    return res.status(400).json({ message: 'key Image invalid' })
  }

  const newImages = product?.images?.filter((item: any) => item._id != keyImage)
  await deleteFile(image.url)
  if (newImages) {
    await updateDeleteImage(idProduct, newImages)
    return res.status(200).json({ message: 'delete image success' })
  }
}
export const updateContentImageVPS = async (req: Request, res: Response): Promise<Response<IResonseObject> | void> => {
  try {
    const idProduct = req.params.idProduct
    const keyImage = req.params.keyImage
    if (!idProduct) {
      return res.status(404).send('not found id product')
    }
    const product = await productModels.findById({ _id: idProduct })

    if (!product) {
      return res.status(404).json({ mesage: 'not found product' })
    }
    if (!keyImage) {
      return res.status(400).json({ message: 'not found keyImage prams' })
    }
    const image: IImage = await findProductImage(idProduct, keyImage)
    if (!image) {
      return res.status(400).json({ message: 'key Image invalid' })
    }

    const file = req.file
    if (!file) {
      return res.status(400).send('Không có file được tải lên.')
    }

    const imageObject: string | void = await updateFileContent(file, image.url)
    if (imageObject != null) {
      return res.status(200).json({ message: 'File has been updated successfully' })
    }
  } catch (error: any) {
    const file = req.file
    await deleteFile(file!.path)
    throw new Error(error)
  }
}
export const removeAllImageByProductById = async (
  req: Request<any, unknown, unknown>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  try {
    const response: IResonseObject = {
      message: ''
    }
    const params = req.params
    const filter = { _id: params.idProduct }
    const update = { $set: { images: [] } }
    const options = { new: true }
    if (!params.idProduct) {
      return res.status(400).json({ message: 'not found idCourse prams' })
    }
    const productExist = await productModels.findById(filter)
    if (!productExist) {
      return res.status(400).json({ message: 'id invalid' })
    }
    if (productExist.images && productExist.images.length == 0) {
      return res.status(200).send('list image clean')
    }
    await deleteFIleImageProduct(params.idProduct)
    const deleted = await productModels.findByIdAndUpdate(filter, update, options)
    if (!deleted) {
      return res.status(404).send('product  not found')
    } else {
      response.message = 'deleted all image  success'
      return res.status(200).send(response)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
//video
export const uploadVideoFromLocalToVPSByProductId = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  try {
    const idProduct = req.params.idProduct

    if (!idProduct) {
      return res.status(404).send('not found id product')
    }
    const product = await productModels.findById({ _id: idProduct })

    if (!product) {
      return res.status(404).json({ mesage: 'not found product' })
    }
    const file = req.file
    if (!file) {
      return res.status(400).send('Không có file được tải lên.')
    }
    const videoObject: IVideo = {
      url: file.path
    }
    const videos = await addVideoToProduct(idProduct, videoObject)
    if (!videos) {
      return res.status(500).json({ message: 'upload video failed' })
    }

    return res.status(200).json({ message: 'upload video success', result: videos })
  } catch (error: any) {
    const file = req.file
    await deleteFile(file!.path)
    throw new Error(error)
  }
}
export const deleteVideoFromVPSByProductId = async (
  req: Request,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  const idProduct = req.params.idProduct
  const keyVideo = req.params.keyVideo
  if (!idProduct) {
    return res.status(404).send('not found id product')
  }
  const product = await productModels.findById({ _id: idProduct })

  if (!product) {
    return res.status(404).json({ mesage: 'not found product' })
  }
  if (!keyVideo) {
    return res.status(400).json({ message: 'not found keyVideo prams' })
  }
  const video: IVideo = await findProductVideo(idProduct, keyVideo)
  if (!video) {
    return res.status(400).json({ message: 'key video invalid' })
  }

  const newVideos = product?.videos?.filter((item: any) => item._id != keyVideo)
  await deleteFile(video.url)
  if (newVideos) {
    await updateDeleteVideo(idProduct, newVideos)
    return res.status(200).json({ message: 'delete video success' })
  }
}
export const updateContentVideoVPS = async (req: Request, res: Response): Promise<Response<IResonseObject> | void> => {
  try {
    const idProduct = req.params.idProduct
    const keyVideo = req.params.keyVideo
    if (!idProduct) {
      return res.status(404).send('not found id product')
    }
    const product = await productModels.findById({ _id: idProduct })

    if (!product) {
      return res.status(404).json({ mesage: 'not found product' })
    }
    if (!keyVideo) {
      return res.status(400).json({ message: 'not found keyVideo prams' })
    }
    const video: IVideo = await findProductVideo(idProduct, keyVideo)
    if (!video) {
      return res.status(400).json({ message: 'key video invalid' })
    }

    const file = req.file
    if (!file) {
      return res.status(400).send('Không có file được tải lên.')
    }

    const imageObject: string | void = await updateFileContent(file, video.url)
    if (imageObject != null) {
      return res.status(200).json({ message: 'File has been updated successfully' })
    }
  } catch (error: any) {
    const file = req.file
    await deleteFile(file!.path)
    throw new Error(error)
  }
}
export const removeAllVIdeoByProductById = async (
  req: Request<any, unknown, unknown>,
  res: Response
): Promise<Response<IResonseObject> | void> => {
  try {
    const response: IResonseObject = {
      message: ''
    }
    const params = req.params
    const filter = { _id: params.idProduct }
    const update = { $set: { videos: [] } }
    const options = { new: true }
    if (!params.idProduct) {
      return res.status(400).json({ message: 'not found idCourse prams' })
    }
    const productExist = await productModels.findById(filter)
    if (!productExist) {
      return res.status(400).json({ message: 'id invalid' })
    }
    if (productExist.videos && productExist.videos.length == 0) {
      return res.status(200).send('list video clean')
    }
    await deleteFIleVideoProduct(params.idProduct)
    const deleted = await productModels.findByIdAndUpdate(filter, update, options)
    if (!deleted) {
      return res.status(404).send('product  not found')
    } else {
      response.message = 'deleted all video  success'
      return res.status(200).send(response)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
