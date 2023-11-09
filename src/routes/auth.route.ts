import { Router } from 'express'
import { login, register, requestRefereshToken } from '~/controllers/auth.controllers'
import { asyncHandelError } from '~/middlewares/error.middlewear'
const router = Router()
router.post('/login', asyncHandelError(login))
router.post('/register', asyncHandelError(register))
router.post('/refresh-token', asyncHandelError(requestRefereshToken))
export default router
