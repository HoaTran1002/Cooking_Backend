import { Router } from 'express'
import faqController from '~/controllers/faq.controller'
import { IFaq } from '~/interfaces/faq.interface'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validateBody } from '~/middlewares/validate.middlewear'
import { faqValidate } from '~/validator/faq.validate'

const route = Router()
route.post('/create', validateBody<IFaq>(faqValidate), asyncHandelError(faqController.createFAQ))
export default route
