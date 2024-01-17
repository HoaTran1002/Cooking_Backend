import { Router } from 'express'
import { IChef } from '~/interfaces/chef.interface'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validateBody } from '~/middlewares/validate.middlewear'
import { chefValidate } from '~/validator/chef.validator'
import {
  createChef,
  deleteChefById,
  getAllChef,
  getByIdChef,
  updateContentImageVPS,
  updateTextDataChefById
} from '~/controllers/chef.controller'
import { uploadDisk, uploadMemory } from '~/config/multer.config'
const router = Router()
router.post('/create', uploadDisk.single('file'), asyncHandelError(createChef))
router.put('/:id/updateTextDataChefById', validateBody<IChef>(chefValidate), asyncHandelError(updateTextDataChefById))
router.put('/:id/updateContentImage', uploadMemory.single('file'), asyncHandelError(updateContentImageVPS))
router.get('/:id/get', asyncHandelError(getByIdChef))
router.get('/getAll/:page/:size', asyncHandelError(getAllChef))
router.delete('/:id/delete', asyncHandelError(deleteChefById))
export default router
