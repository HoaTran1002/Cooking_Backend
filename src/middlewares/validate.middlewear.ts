import type { NextFunction, Request, Response } from 'express'

import type Joi from 'joi'
import { IResponseErrorObject } from '~/interfaces/response.interface'

export const validateBody = <T>(validate: (object: T) => Joi.ValidationResult<T>) => {
  const middleware = (req: Request, _: Response, next: NextFunction) => {
    const valid = validate(req.body)

    if (valid.error) {
      throw new IResponseErrorObject(valid.error.message, 400)
    }
    next()
  }

  return middleware
}
