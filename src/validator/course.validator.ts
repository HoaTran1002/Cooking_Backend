import Joi from 'joi'
import sanitizeHtml from 'sanitize-html'
import { ICourse, IImage, IRoadmap, IVideo } from '~/interfaces/course.interface'
export const courseValidate = (data: ICourse) => {
  const sanitizedData = {
    ...data,
    category: sanitizeHtml(data?.category || ''),
    level: sanitizeHtml(data?.level || ''),
    title: sanitizeHtml(data?.title || ''),
    description: sanitizeHtml(data?.description || '')
  }
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
  return course.validate(sanitizedData)
}

export const roadmapValidate = (data: IRoadmap) => {
  const sanitizedData = {
    ...data,
    name: sanitizeHtml(data?.name || ''),
    knowledge: sanitizeHtml(data?.knowledge || ''),
    skill: sanitizeHtml(data?.skill || '')
  }
  const roadmap = Joi.object<IRoadmap>({
    name: Joi.string().trim().required(),
    knowledge: Joi.string().trim().required(),
    skill: Joi.string().trim().required(),
    startTime: Joi.date(),
    endTime: Joi.date()
  })
  return roadmap.validate(sanitizedData)
}
