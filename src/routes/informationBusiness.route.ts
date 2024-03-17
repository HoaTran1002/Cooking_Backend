import { Router } from 'express'
import {
  createInformationBusiness,
  getAll,
  getById,
  removeById,
  updateFormationBusinessById
} from '~/controllers/informationBusiness.controllers'
import { IInformationBusiness } from '~/contract/interfaces/businessInfrormation.interface'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validator } from '~/middlewares/validate.middlewear'
import { infoBusinessValidate } from '~/validator/informationBusiness.validate'
const router = Router()
router.get('/getAll', asyncHandelError(getAll))
router.get('/getById/:id', asyncHandelError(getById))
router.post(
  '/create',
  authorize(['ADMIN']),
  validator<IInformationBusiness>(infoBusinessValidate),
  asyncHandelError(createInformationBusiness)
)
router.delete('/remove/:id', authorize(['ADMIN']), asyncHandelError(removeById))
router.patch(
  '/update/:id',
  authorize(['ADMIN']),
  validator<IInformationBusiness>(infoBusinessValidate),
  asyncHandelError(updateFormationBusinessById)
)
export default router
