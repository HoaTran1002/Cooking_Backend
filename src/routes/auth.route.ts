import { Router } from 'express'
import { logOut, login, register, requestRefereshToken } from '~/controllers/auth.controllers'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
const router = Router()
router.post('/login', asyncHandelError(login))
router.post('/logout', authorize(), asyncHandelError(logOut))
router.post('/register', asyncHandelError(register))
router.post('/refresh-token', asyncHandelError(requestRefereshToken))
export default router
