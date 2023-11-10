import { Router } from 'express'
import {
  createInformationBusiness,
  getAll,
  getById,
  removeById,
  updateFormationBusinessById
} from '~/controllers/informationBusiness.controllers'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.get('/getAll', asyncHandelError(getAll))
router.get('/getById/:id', asyncHandelError(getById))
router.post('/create', asyncHandelError(createInformationBusiness))
router.delete('/remove/:id', asyncHandelError(removeById))
router.put('/update/:id', asyncHandelError(updateFormationBusinessById))
export default router
