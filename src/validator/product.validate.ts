import Joi from 'joi'
import { IImage, IVideo } from '~/interfaces/course.interface'
import { IProduct } from '~/interfaces/product.interface'

export const productValidator = (data: IProduct) => {
  const product = Joi.object({
    name: Joi.string().required(),
    level: Joi.string().valid('BASIC', 'MEDIUM', 'MASTER').required().trim(),
    category: Joi.string().valid('SHORT_TERM', 'LONG_TERM').required().trim(),
    note: Joi.string().required(),
    image: Joi.array<IImage>(),
    video: Joi.array<IVideo>()
  })
  return product.validate(data)
}
