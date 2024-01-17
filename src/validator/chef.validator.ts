import Joi from 'joi'
import { IChef } from '~/interfaces/chef.interface'
export const chefValidate = (data: IChef) => {
  const chef = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    slogan: Joi.string().required().trim(),
    role: Joi.string().required().trim()
  })
  return chef.validate(data)
}