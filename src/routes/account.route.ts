import { Router } from 'express'
import {
  createAccount,
  deleteAccountById,
  findAccountById,
  findAllAccount,
  updateAccountById
} from '~/controllers/account.controllers'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.get('/getAll', authorize(), asyncHandelError(findAllAccount))
router.get('/findAccountById/:id', authorize(), asyncHandelError(findAccountById))
router.post('/create', authorize(), asyncHandelError(createAccount))
router.delete('/delete/:id', authorize(), asyncHandelError(deleteAccountById))
router.put('/update/:id', authorize(), asyncHandelError(updateAccountById))
export default router
