import Joi from 'joi'
import { IAccount } from '~/interfaces/account.interface'
export const authValidate = (data: IAccount) => {
  const auth = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
  })
  return auth.validate(data)
}
