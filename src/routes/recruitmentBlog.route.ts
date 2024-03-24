import { Router } from 'express'
import RecruitmentBlogController from '~/controllers/recruitmentBlog.controllers'

import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.post('/create', asyncHandelError(RecruitmentBlogController.create))
router.get('/getAll/:page/:size', asyncHandelError(RecruitmentBlogController.getAll))
router.get('/:id/getById', asyncHandelError(RecruitmentBlogController.getById))
router.delete('/:id/deleteById', asyncHandelError(RecruitmentBlogController.deleteById))
router.patch('/:id/update', asyncHandelError(RecruitmentBlogController.updateById))
export default router
