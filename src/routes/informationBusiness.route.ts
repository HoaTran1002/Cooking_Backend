import { Router } from 'express'
import { createInformationBusiness, getAll, getById, removeById, updateFormationBusinessById } from '~/controllers/informationBusiness.controllers'
import { IInformationBusiness } from '~/interfaces/businessInfrormation.interface'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validateBody } from '~/middlewares/validate.middlewear'
import { infoBusinessValidate } from '~/validator/informationBusiness.validate'
const router = Router()
router.get('/getAll', authorize(), asyncHandelError(getAll))
router.get('/getById/:id', authorize(), asyncHandelError(getById))
router.post('/create', authorize(['ADMIN']), validateBody<IInformationBusiness>(infoBusinessValidate), asyncHandelError(createInformationBusiness))
router.delete('/remove/:id', authorize(['ADMIN']), asyncHandelError(removeById))
router.put('/update/:id', authorize(['ADMIN']), validateBody<IInformationBusiness>(infoBusinessValidate), asyncHandelError(updateFormationBusinessById))
export default router
