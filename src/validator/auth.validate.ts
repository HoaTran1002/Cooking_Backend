import Joi from 'joi'
import sanitizeHtml from 'sanitize-html'
import { IAccount } from '~/interfaces/account.interface'
export const authValidate = (data: IAccount) => {
  const sanitizedData = {
    ...data,
    userName: sanitizeHtml(data?.userName || ''),
    password: sanitizeHtml(data?.password || '')
  }
  const auth = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
  })
  return auth.validate(sanitizedData)
}
