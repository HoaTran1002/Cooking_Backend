import { NextFunction, Request, Response } from 'express'
import { IResonseObject, IResponseErrorObject } from '~/contract/interfaces/response.interface'

export const asyncHandelError = (
  // eslint-disable-next-line prettier/prettier
  callback: (req: Request, res: Response, next: NextFunction) => Promise<IResonseObject | Response | void | unknown>
) => {
  const handleErr = (request: Request, response: Response, next: NextFunction) => {
    callback(request, response, next).catch(next)
  }
  return handleErr
}
const handleErrorTrusted = (err: any): IResonseObject | IResponseErrorObject => {
  const responseErr: IResonseObject = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  }
  if (err && typeof IResponseErrorObject) {
    responseErr.message = err.message
    responseErr.status = err.status
  }
  return responseErr
}
export const errorHandeler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const response: IResonseObject = handleErrorTrusted(err)
  return res.status(response.status ? response.status : 500).json(response)
}
export const notFound = (reques: Request, response: Response) => {
  response.status(404).json({ message: 'Not Found ' })
}
