import { Router } from 'express'
import faqController from '~/controllers/faq.controller'
import { IFaq } from '~/contract/interfaces/faq.interface'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validateBody } from '~/middlewares/validate.middlewear'
import { faqValidate } from '~/validator/faq.validate'

const route = Router()
route.post('/create', authorize(['ADMIN']), validateBody<IFaq>(faqValidate), asyncHandelError(faqController.createFAQ))
route.put('/:id/update', authorize(['ADMIN']), validateBody<IFaq>(faqValidate), asyncHandelError(faqController.editFAQ))
route.delete('/:id/delete', authorize(['ADMIN']), asyncHandelError(faqController.deleteFAQ))
route.get('/:id/getFAQ', asyncHandelError(faqController.getFAQById))
route.get('/getFAQs', asyncHandelError(faqController.getFAQs))
route.get('/pagination/:page/:size', asyncHandelError(faqController.paginationFAQ))

export default route
