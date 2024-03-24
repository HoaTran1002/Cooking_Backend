import { Router } from 'express'
import customerBlogController from '~/controllers/customerBlog.controller'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.post('/create', asyncHandelError(customerBlogController.create))
router.get('/getAll/:page/:size', asyncHandelError(customerBlogController.getAll))
router.get('/:id/getById', asyncHandelError(customerBlogController.getById))
router.delete('/:id/deleteById', asyncHandelError(customerBlogController.deleteById))
router.patch('/:id/update', asyncHandelError(customerBlogController.updateById))
export default router
