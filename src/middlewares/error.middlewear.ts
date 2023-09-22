import { NextFunction, Request, Response } from 'express'
import { IResonseObject } from '~/interfaces/response.interface'

export const asyncHandelError = async (
  callback: (
    req: Request,
    res: Response,
    next?: NextFunction
  ) => Promise<IResonseObject | Response | Error | void | unknown>
) => {
  const handleErr = (request: Request, response: Response, next: NextFunction) => {
    callback(request, response).catch(next)
  }
  return handleErr
}
const handleErrorTrusted = (err: any): IResonseObject => {
  const responseErr: IResonseObject = {
    message: 'Internal Server Error',
    status: 500
  }
  if (err && typeof err === 'object' && 'message' in err && 'status' in err) {
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
