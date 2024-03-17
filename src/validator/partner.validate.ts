import Joi from 'joi'
import { IImage } from '~/contract/interfaces/course.interface'
import { IPartner, IPartnerProduct } from '~/contract/interfaces/partner.interface'
export const partnerValidator = (data: IPartner) => {
  const partnerSchema = Joi.object({
    name: Joi.string().required(),
    logo: Joi.object<IImage>(),
    description: Joi.string(),
    position: Joi.number(),
    products: Joi.array<IPartnerProduct>(),
    params: Joi.object({
      userId: Joi.string().guid().required()
    })
  })
  return partnerSchema.validate(data)
}
export const partnerParamsValidator = (data: IPartner) => {
  const partnerSchema = Joi.object({
    params: Joi.object({
      userId: Joi.string().guid().required()
    })
  })
  return partnerSchema.validate(data)
}
