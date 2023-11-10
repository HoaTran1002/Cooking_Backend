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
router.post('/create', authorize(), asyncHandelError(createInformationBusiness))
router.delete('/remove/:id', authorize(), asyncHandelError(removeById))
router.put('/update/:id', authorize(), asyncHandelError(updateFormationBusinessById))
export default router
