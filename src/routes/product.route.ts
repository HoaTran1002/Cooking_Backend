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
import { authorize } from '~/middlewares/auth.middlewears'
// import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validateBody } from '~/middlewares/validate.middlewear'
import { productValidator } from '~/validator/product.validate'
const route = Router()
// , authorize(['ADMIN'])
route.post('/create/:idCourse/:idCategory?', validateBody(productValidator), asyncHandelError(createProduct))
route.get('/getAll', asyncHandelError(getAllProduct))
route.get('/:idProduct/getProductById', asyncHandelError(getProductById))
route.put('/:idProduct/edit/:idCourse?/:idCategory?', validateBody(productValidator), asyncHandelError(editProductById))

route.delete('/:idProduct/delete', asyncHandelError(deleteProductById))
route.delete('/deleteAll', asyncHandelError(deleteAllProduct))
//image
route.post(
  '/uploadImageFromLocal/:idProduct',
  authorize(['ADMIN']),
  uploadDisk.single('file'),
  asyncHandelError(uploadImageFromLocalToVPSByProductId)
)
route.delete(
  '/:idProduct/deleteImageFromVPSByProductId/:keyImage',
  authorize(['ADMIN']),
  asyncHandelError(deleteImageFromVPSByProductId)
)
route.put(
  '/:idProduct/updateContentImage/:keyImage',
  authorize(['ADMIN']),
  uploadMemory.single('file'),
  asyncHandelError(updateContentImageVPS)
)
route.delete(
  '/:idProduct/removeAllImageByProductById',
  authorize(['ADMIN']),
  asyncHandelError(removeAllImageByProductById)
)
//video
route.post(
  '/:idProduct/uploadVideoFromLocalToVPS',
  authorize(['ADMIN']),
  uploadDisk.single('file'),
  asyncHandelError(uploadVideoFromLocalToVPSByProductId)
)
route.delete(
  '/:idProduct/deleteVideoByProductId/:keyVideo',
  authorize(['ADMIN']),
  asyncHandelError(deleteVideoFromVPSByProductId)
)
route.put(
  '/:idProduct/updateContentVideo/:keyVideo',
  authorize(['ADMIN']),
  uploadMemory.single('file'),
  asyncHandelError(updateContentVideoVPS)
)
route.delete(
  '/:idProduct/removeAllVideoByProductById',
  authorize(['ADMIN']),
  asyncHandelError(removeAllVIdeoByProductById)
)

export default route
