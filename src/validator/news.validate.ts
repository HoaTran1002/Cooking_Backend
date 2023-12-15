import Joi from 'joi'
import { INews } from '~/interfaces/news.interface'
export const validateCreateNews = (data: INews) => {
  const news = Joi.object({
    title: Joi.string().required().trim(),
    author: Joi.string().required().trim(),
    dateCreated: Joi.date(),
    content: Joi.string().required().trim()
  })
  return news.validate(data)
}
