import Joi from 'joi'
import { IAccount } from '~/contract/interfaces/account.interface'
import { IImage } from '~/contract/interfaces/course.interface'
export const accountValidate = (data: IAccount) => {
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
  return account.validate(data)
}
