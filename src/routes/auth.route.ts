import { Router } from 'express'
import { logOut, login, register, requestRefereshToken } from '~/controllers/auth.controllers'
import { IAccount } from '~/interfaces/account.interface'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validateBody } from '~/middlewares/validate.middlewear'
import { authValidate } from '~/validator/auth.validate'
const router = Router()
router.post('/login', validateBody<IAccount>(authValidate), asyncHandelError(login))
router.post('/logout', authorize(), asyncHandelError(logOut))
router.post('/register', validateBody<IAccount>(authValidate), asyncHandelError(register))
router.post('/refresh-token', asyncHandelError(requestRefereshToken))
export default router
