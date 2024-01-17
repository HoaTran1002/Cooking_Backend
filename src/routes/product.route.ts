import { Router } from 'express'
import { uploadDisk, uploadMemory } from '~/config/multer.config'
import {
  createProduct,
  deleteAllProduct,
  // deleteAllProductImageS3,
  // deleteAllProductVideoS3,
  deleteImageFromVPSByProductId,
  deleteProductById,
  // deleteProductImageS3,
  deleteVideoFromVPSByProductId,
  // deleteVideoImageS3,
  editProductById,
  getAllProduct,
  getProductById,
  removeAllImageByProductById,
  removeAllVIdeoByProductById,
  updateContentImageVPS,
  updateContentVideoVPS,
  uploadImageFromLocalToVPSByProductId,
  // uploadProductImageByIdFromLocalS3,
  // uploadProductVideoByIdFromLocalS3,
  uploadVideoFromLocalToVPSByProductId
} from '~/controllers/product.controller'
// import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validateBody } from '~/middlewares/validate.middlewear'
import { productValidator } from '~/validator/product.validate'
const route = Router()
// , authorize(['ADMIN'])
route.post('/create/:idCourse/:idCategory?', validateBody(productValidator), asyncHandelError(createProduct))
route.get('/getAll', asyncHandelError(getAllProduct))
route.get('/:idProduct/getProductById', asyncHandelError(getProductById))
route.put('/:idProduct/edit', validateBody(productValidator), asyncHandelError(editProductById))

route.delete('/:idProduct/delete', asyncHandelError(deleteProductById))
route.delete('/deleteAll', asyncHandelError(deleteAllProduct))
//image
route.post(
  '/uploadImageFromLocal/:idProduct',
  uploadDisk.single('file'),
  asyncHandelError(uploadImageFromLocalToVPSByProductId)
)
route.delete('/:idProduct/deleteImageFromVPSByProductId/:keyImage', asyncHandelError(deleteImageFromVPSByProductId))
route.put(
  '/:idProduct/updateContentImage/:keyImage',
  uploadMemory.single('file'),
  asyncHandelError(updateContentImageVPS)
)
route.delete('/:idProduct/removeAllImageByProductById', asyncHandelError(removeAllImageByProductById))
//video
route.post(
  '/:idProduct/uploadVideoFromLocalToVPS',
  uploadDisk.single('file'),
  asyncHandelError(uploadVideoFromLocalToVPSByProductId)
)
route.delete('/:idProduct/deleteVideoByProductId/:keyVideo', asyncHandelError(deleteVideoFromVPSByProductId))
route.put(
  '/:idProduct/updateContentVideo/:keyVideo',
  uploadMemory.single('file'),
  asyncHandelError(updateContentVideoVPS)
)
route.delete('/:idProduct/removeAllVideoByProductById', asyncHandelError(removeAllVIdeoByProductById))

export default route
