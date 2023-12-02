import type { NextFunction, Request, Response } from 'express'
import type Joi from 'joi'

export const validateBody = <T>(validate: (object: T) => Joi.ValidationResult<T>) => {
  const middleware = (req: Request, _: Response, next: NextFunction) => {
    try {
      const valid = validate(req.body)

      if (valid.error) throw new Error('is valid body')

      next()
    } catch (error: any) {
      error.status = 400
      throw new Error('is valid body')
    }
  }

  return middleware
}
