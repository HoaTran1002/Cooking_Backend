import Joi from 'joi'
import sanitizeHtml from 'sanitize-html'
import { IAccount } from '~/interfaces/account.interface'
import { IImage } from '~/interfaces/course.interface'
export const accountValidate = (data: IAccount) => {
  const sanitizedData = {
    ...data,
    fullName: sanitizeHtml(data?.fullName || ''),
    birthday: sanitizeHtml(data?.birthday || ''),
    address: sanitizeHtml(data?.address || ''),
    gmail: sanitizeHtml(data?.gmail || ''),
    phoneNumber: sanitizeHtml(data?.phoneNumber || ''),
    gender: sanitizeHtml(data?.gender || ''),
    userName: sanitizeHtml(data?.userName || ''),
    password: sanitizeHtml(data?.password || ''),
    role: sanitizeHtml(data?.role || ''),
    Permission: sanitizeHtml(data?.Permission || '')
  }
  const account = Joi.object({
    fullName: Joi.string(),
    birthday: Joi.string(),
    address: Joi.string(),
    gmail: Joi.string().email({ minDomainSegments: 2 }),
    phoneNumber: Joi.string(),
    gender: Joi.string(),
    avatar: Joi.object<IImage>(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('ADMIN', 'STUDENT').required(),
    Permission: Joi.string().valid('ALL', 'EDIT', 'READ', 'DELETE', 'CREATE').required()
  })
  return account.validate(sanitizedData)
}
