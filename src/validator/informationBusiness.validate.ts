import Joi from 'joi'
import {
  IAchievement,
  IInformationBusiness,
  IRelatedInformation
} from '~/contract/interfaces/businessInfrormation.interface'
import { IImage } from '~/contract/interfaces/course.interface'
export const infoBusinessValidate = (data: IInformationBusiness) => {
  const infoBusiness = Joi.object({
    name: Joi.string().trim(),
    phoneNumber: Joi.string().trim(),
    address: Joi.string().trim(),
    email: Joi.string().trim(),
    domain: Joi.string().trim(),
    slogan: Joi.string().trim(),
    logo: Joi.object<IImage>(),
    story: Joi.string().trim(),
    achievement: Joi.object<IAchievement>(),
    relatedInformation: Joi.object<IRelatedInformation>()
  })
  return infoBusiness.validate(data)
}
