import { Router } from 'express'
import { uploadDisk, uploadMemory } from '~/config/multer.config'
import {
  createNews,
  deleteNewsById,
  getAllNews,
  getNewsById,
  updateContentImageVPS,
  updateNewsById
} from '~/controllers/news.controller'
import { INews } from '~/contract/interfaces/news.interface'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validator } from '~/middlewares/validate.middlewear'
import { validateCreateNews } from '~/validator/news.validate'
// validator<INews>(validateCreateNews),
const route = Router()
route.post('/createNews', authorize(['ADMIN']), uploadDisk.single('file'), asyncHandelError(createNews))

route.delete('/:id/delete', authorize(['ADMIN']), asyncHandelError(deleteNewsById))
route.put(
  '/:id/updateContentImage',
  authorize(['ADMIN']),
  uploadMemory.single('file'),
  asyncHandelError(updateContentImageVPS)
)
route.put('/:id/update', authorize(['ADMIN']), validator<INews>(validateCreateNews), asyncHandelError(updateNewsById))
route.get('/:id/get', asyncHandelError(getNewsById))
route.get('/getAll/:page/:size', asyncHandelError(getAllNews))
export default route
