import Joi from 'joi'
import { IFaq } from '~/interfaces/faq.interface'

export const faqValidate = (data: IFaq) => {
  const faq = Joi.object({
    question: Joi.string().required().trim(),
    answer: Joi.string().required().trim()
  })
  return faq.validate(data)
}
