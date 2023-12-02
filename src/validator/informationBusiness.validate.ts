import Joi from 'joi'
import sanitizeHtml from 'sanitize-html'
import { IAchievement, IInformationBusiness, IRelatedInformation } from '~/interfaces/businessInfrormation.interface'
import { IImage } from '~/interfaces/course.interface'
export const infoBusinessValidate = (data: IInformationBusiness) => {
  const sanitizedData = {
    ...data,
    name: sanitizeHtml(data?.name || ''),
    phoneNumber: sanitizeHtml(data?.phoneNumber || ''),
    address: sanitizeHtml(data?.address || ''),
    email: sanitizeHtml(data?.email || ''),
    domain: sanitizeHtml(data?.domain || ''),
    slogan: sanitizeHtml(data?.slogan || ''),
    story: sanitizeHtml(data?.story || '')
  }
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
  return infoBusiness.validate(sanitizedData)
}
