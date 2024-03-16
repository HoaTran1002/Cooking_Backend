import Joi from 'joi'
import { IImage, IVideo } from '~/contract/interfaces/course.interface'
import { IHightLight, IProduct } from '~/contract/interfaces/product.interface'

export const productValidator = (data: IProduct) => {
  const product = Joi.object({
    position: Joi.number(),
    name: Joi.string().required(),
    note: Joi.string().required(),
    image: Joi.array<IImage>(),
    timeLearning: Joi.string(),
    video: Joi.array<IVideo>(),
    idCourse: Joi.string(),
    idCategory: Joi.string(),
    linkYoutube: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.string(),
    executionTime: Joi.string(),
    numberOfAttendees: Joi.number(),
    languageOfInstruction: Joi.string(),
    serviceDetailsWhenStudying: Joi.string(),
    linkMenu: Joi.string(),
    hightlight: Joi.array<IHightLight>(),
    requiredWhenStudying: Joi.string(),
    content_review: Joi.string(),
    listScript: Joi.array<string>()
  })
  return product.validate(data)
}
