import { Router } from 'express'
import {
  createAccount,
  deleteAccountById,
  findAccountById,
  findAllAccount,
  updateAccountById
} from '~/controllers/account.controllers'
import { IAccount } from '~/contract/interfaces/account.interface'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validator } from '~/middlewares/validate.middlewear'
import { accountValidate } from '~/validator/account.validate'
const router = Router()
router.get('/getAll', asyncHandelError(findAllAccount))
router.get('/findAccountById/:id', asyncHandelError(findAccountById))
router.post('/create', authorize(['ADMIN']), validator<IAccount>(accountValidate), asyncHandelError(createAccount))
router.delete('/delete/:id', authorize(['ADMIN']), asyncHandelError(deleteAccountById))
router.patch(
  '/update/:id',
  authorize(['ADMIN']),
  validator<IAccount>(accountValidate),
  asyncHandelError(updateAccountById)
)
export default router
