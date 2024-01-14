import { Router } from 'express'
import {
  createCategory,
  getAll,
  getAllByCourseId,
  getById,
  removeCategory,
  updateCategory
} from '~/controllers/category.controllers'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
const router = Router()
router.post('/create/:idCourse', authorize(), asyncHandelError(createCategory))
router.put('/:id/update', asyncHandelError(updateCategory))
router.delete('/:id/remove', authorize(), asyncHandelError(removeCategory))
router.get('/getAll', asyncHandelError(getAll))
router.get('/getAllByCourseId/:idCourse', asyncHandelError(getAllByCourseId))
router.get('/:id/getAllById', authorize(), asyncHandelError(getById))

export default router
