import Joi from 'joi'
import { IChef } from '~/contract/interfaces/chef.interface'
export const chefValidate = (data: IChef) => {
  const chef = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    slogan: Joi.string().required().trim(),
    role: Joi.string().required().trim(),
    position: Joi.number()
  })
  return chef.validate(data)
}
