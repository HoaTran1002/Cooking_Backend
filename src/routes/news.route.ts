import { Router } from 'express'
import { uploadDisk } from '~/config/multer.config'
import {
  createNews,
  deleteNewsById,
  getAllNews,
  getNewsById,
  updateContentImageVPS,
  updateNewsById
} from '~/controllers/news.controller'
import { INews } from '~/interfaces/news.interface'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validateBody } from '~/middlewares/validate.middlewear'
import { validateCreateNews } from '~/validator/news.validate'
// validateBody<INews>(validateCreateNews),
const route = Router()
route.post('/createNews', uploadDisk.single('file'), asyncHandelError(createNews))
route.get('/getAll/:page/:size', asyncHandelError(getAllNews))
route.delete('/:id/delete', asyncHandelError(deleteNewsById))
route.put('/:id/updateContentImage', uploadDisk.single('file'), asyncHandelError(updateContentImageVPS))
route.put('/:id/update', validateBody<INews>(validateCreateNews), asyncHandelError(updateNewsById))
route.get('/:id/get', asyncHandelError(getNewsById))
export default route
