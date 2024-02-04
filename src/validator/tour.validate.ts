import Joi from 'joi'
import { join } from 'path'
import { IImage, IVideo } from '~/interfaces/course.interface'
import { IHightLight, IProduct } from '~/interfaces/product.interface'
import { ITourOverView } from '~/interfaces/tour.interface'

export const tourValidator = (data: ITourOverView) => {
  const tour = Joi.object({
    idProduct: Joi.string().required(),
    startTime: Joi.string(),
    endTime: Joi.string(),
    AactivityName: Joi.string(),
    activityContent: Joi.string()
  })
  return tour.validate(data)
}
export const tourValidatorPramsIdProduct = (data: ITourOverView) => {
  const tour = Joi.object({
    idProduct: Joi.string().required()
  })
  return tour.validate(data)
}
