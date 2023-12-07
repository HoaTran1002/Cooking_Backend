import Joi from 'joi'
import { ICourse, IImage, IRoadmap, IVideo } from '~/interfaces/course.interface'
export const courseValidate = (data: ICourse) => {
  const course = Joi.object<ICourse>({
    category: Joi.string().valid('SHORT_TERM', 'LONG_TERM').required().trim(),
    level: Joi.string().valid('BASIC', 'MEDIUM', 'MASTER').required().trim(),
    title: Joi.string().trim(),
    description: Joi.string().trim(),
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

export const roadmapValidate = (data: IRoadmap) => {
  const roadmap = Joi.object<IRoadmap>({
    name: Joi.string().trim().required(),
    knowledge: Joi.string().trim().required(),
    skill: Joi.string().trim().required(),
    startTime: Joi.date(),
    endTime: Joi.date()
  })
  return roadmap.validate(data)
}
