import { Router } from 'express'
import InformationPositionRecruitmentController from '~/controllers/informationPositionRecruitment.controller'

import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.post('/create', asyncHandelError(InformationPositionRecruitmentController.create))
router.get('/getAll/:page/:size', asyncHandelError(InformationPositionRecruitmentController.getAll))
router.get('/:id/getById', asyncHandelError(InformationPositionRecruitmentController.getById))
router.delete('/:id/deleteById', asyncHandelError(InformationPositionRecruitmentController.deleteById))
router.patch('/:id/update', asyncHandelError(InformationPositionRecruitmentController.updateById))
export default router
