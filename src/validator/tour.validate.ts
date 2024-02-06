import Joi from 'joi'
import { join } from 'path'
import { IImage, IVideo } from '~/interfaces/course.interface'
import { IHightLight, IProduct } from '~/interfaces/product.interface'
import { ITourOverView } from '~/interfaces/tour.interface'

export const tourValidator = (data: ITourOverView) => {
  const tour = Joi.object({
    idProduct: Joi.string(),
    startTime: Joi.string(),
    endTime: Joi.string(),
    activityName: Joi.string(),
    activityContent: Joi.string()
  })
  return tour.validate(data)
}
