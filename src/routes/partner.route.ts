import { Router } from 'express'
import partnerModule from '~/controllers/partner.controller'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.post('/create', asyncHandelError(partnerModule.create))
router.get('/getAll', asyncHandelError(partnerModule.getAll))
router.get('/:id/getById', asyncHandelError(partnerModule.getById))
router.delete('/:id/deleteById', asyncHandelError(partnerModule.deleteById))
router.put('/:id/update', asyncHandelError(partnerModule.updateById))
export default router
