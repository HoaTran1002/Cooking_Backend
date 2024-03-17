import { Router } from 'express'
import { logOut, login, register, requestRefereshToken } from '~/controllers/auth.controllers'
import { IAccount } from '~/contract/interfaces/account.interface'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validator } from '~/middlewares/validate.middlewear'
import { authValidate } from '~/validator/auth.validate'
const router = Router()
router.post('/login', validator<IAccount>(authValidate), asyncHandelError(login))
router.post('/logout', authorize(), asyncHandelError(logOut))
router.post('/register', validator<IAccount>(authValidate), asyncHandelError(register))
router.post('/refresh-token', asyncHandelError(requestRefereshToken))
export default router
