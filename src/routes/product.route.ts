import { Router } from 'express'
import { uploadMemory } from '~/config/multer.config'
import {
  createProduct,
  deleteAllProduct,
  deleteAllProductImageS3,
  deleteAllProductVideoS3,
  deleteProductById,
  deleteProductImageS3,
  deleteVideoImageS3,
  editProductById,
  getAllProduct,
  getProductById,
  uploadProductImageByIdFromLocalS3,
  uploadProductVideoByIdFromLocalS3
} from '~/controllers/product.controller'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validateBody } from '~/middlewares/validate.middlewear'
import { productValidator } from '~/validator/product.validate'
const route = Router()
// , authorize(['ADMIN'])
route.post('/create', validateBody(productValidator), asyncHandelError(createProduct))
route.get('/getAll', asyncHandelError(getAllProduct))
route.get('/:idProduct/getProductById', asyncHandelError(getProductById))
route.put('/:idProduct/edit', validateBody(productValidator), asyncHandelError(editProductById))
route.post('/:idProduct/uploadImage', uploadMemory.single('file'), asyncHandelError(uploadProductImageByIdFromLocalS3))
route.delete('/:idProduct/deleteImage/:key', asyncHandelError(deleteProductImageS3))
route.delete('/:idProduct/deleteAllImage', asyncHandelError(deleteAllProductImageS3))
route.post('/:idProduct/uploadVideo', uploadMemory.single('file'), asyncHandelError(uploadProductVideoByIdFromLocalS3))
route.delete('/:idProduct/deleteVideo/:key', asyncHandelError(deleteVideoImageS3))

route.delete('/:idProduct/deleteAllVideo/:key', asyncHandelError(deleteAllProductVideoS3))
route.delete('/:idProduct/delete', asyncHandelError(deleteProductById))
route.delete('/:idProduct/deleteAll', asyncHandelError(deleteAllProduct))
export default route
