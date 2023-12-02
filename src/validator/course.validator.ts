import Joi from 'joi'
import { ICourse, IImage, IRoadmap, IVideo } from '~/interfaces/course.interface'
export const courseValidate = (data: ICourse) => {
  const course = Joi.object<ICourse>({
    category: Joi.string().required(),
    leve: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.object<IImage>(),
    images: Joi.array<IImage>(),
    video: Joi.object<IVideo>(),
    videos: Joi.array<IVideo>(),
    roadmaps: Joi.array<IRoadmap>(),
    price: Joi.number(),
    discountPrice: Joi.number(),
    discountPercentage: Joi.number(),
    timeCreate: Joi.date(),
    timeUpdate: Joi.date()
  })
  return course.validate(data)
}
