import Joi from 'joi'
import { ITourOverView } from '~/contract/interfaces/tour.interface'

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
