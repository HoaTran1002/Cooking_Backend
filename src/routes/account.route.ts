import { Router } from 'express'
import {
  createAccount,
  deleteAccountById,
  findAccountById,
  findAllAccount,
  updateAccountById
} from '~/controllers/account.controllers'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.get('/:id', asyncHandelError(findAccountById))
router.get('/getAll', asyncHandelError(findAllAccount))
router.post('/create', asyncHandelError(createAccount))
router.delete('/delete/:id', asyncHandelError(deleteAccountById))
router.put('/update/:id', asyncHandelError(updateAccountById))
export default router
