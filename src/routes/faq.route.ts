import { Router } from 'express'
import faqController from '~/controllers/faq.controller'
import { IFaq } from '~/interfaces/faq.interface'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validateBody } from '~/middlewares/validate.middlewear'
import { faqValidate } from '~/validator/faq.validate'

const route = Router()
route.post('/create', validateBody<IFaq>(faqValidate), asyncHandelError(faqController.createFAQ))
route.put('/:id/update', validateBody<IFaq>(faqValidate), asyncHandelError(faqController.editFAQ))
route.delete('/:id/delete', asyncHandelError(faqController.deleteFAQ))
route.get('/:id/getFAQ', asyncHandelError(faqController.getFAQById))
route.get('/getFAQs', asyncHandelError(faqController.getFAQs))
route.get('/pagination/:page/:size', asyncHandelError(faqController.paginationFAQ))

export default route
