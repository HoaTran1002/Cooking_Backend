import { Router } from 'express'
import {
  createInformationBusiness,
  getAll,
  getById,
  removeById,
  updateFormationBusinessById
} from '~/controllers/informationBusiness.controllers'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.get('/getAll', authorize(), asyncHandelError(getAll))
router.get('/getById/:id', authorize(), asyncHandelError(getById))
router.post('/create', authorize(['ADMIN']), asyncHandelError(createInformationBusiness))
router.delete('/remove/:id', authorize(['ADMIN']), asyncHandelError(removeById))
router.put('/update/:id', authorize(['ADMIN']), asyncHandelError(updateFormationBusinessById))
export default router
