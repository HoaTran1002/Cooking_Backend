import { Router } from 'express'
import {
  createCategory,
  removeCategory,
  updateCategory,
  addCourseById,
  removeCourseById,
  getAll,
  getById
} from '~/controllers/category.controllers'
import { asyncHandelError } from '~/middlewares/error.middlewear'
const router = Router()
router.get('/', asyncHandelError(getAll))
router.get('/:id', asyncHandelError(getById))
router.post('/create', asyncHandelError(createCategory))
router.post('/:id/addCourseById/:idCourse', asyncHandelError(addCourseById))
router.put('/update/:id', asyncHandelError(updateCategory))
router.delete('/remove/:id', asyncHandelError(removeCategory))
router.delete('/:id/removeCourseById/:idCourse', asyncHandelError(removeCourseById))

export default router
