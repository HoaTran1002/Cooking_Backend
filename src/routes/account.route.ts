import { Router } from 'express'
import { createAccount, deleteAccountById, findAccountById, findAllAccount, updateAccountById } from '~/controllers/account.controllers'
import { IAccount } from '~/interfaces/account.interface'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validateBody } from '~/middlewares/validate.middlewear'
import { accountValidate } from '~/validator/account.validate'
const router = Router()
router.get('/getAll', authorize(), asyncHandelError(findAllAccount))
router.get('/findAccountById/:id', authorize(), asyncHandelError(findAccountById))
router.post('/create', authorize(), validateBody<IAccount>(accountValidate), asyncHandelError(createAccount))
router.delete('/delete/:id', authorize(), asyncHandelError(deleteAccountById))
router.put('/update/:id', authorize(), validateBody<IAccount>(accountValidate), asyncHandelError(updateAccountById))
export default router
