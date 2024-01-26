import Joi from 'joi'
import { IImage, IVideo } from '~/interfaces/course.interface'
import { IProduct } from '~/interfaces/product.interface'

export const productValidator = (data: IProduct) => {
  const product = Joi.object({
    name: Joi.string().required(),
    note: Joi.string().required(),
    image: Joi.array<IImage>(),
    timeLearning: Joi.string(),
    video: Joi.array<IVideo>(),
    idCourse: Joi.string(),
    idCategory: Joi.string()
  })
  return product.validate(data)
}
