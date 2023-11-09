import { NextFunction, Request, Response } from 'express'
import { asyncHandelError } from './error.middlewear'
import { IResonseObject } from '~/interfaces/response.interface'
import { IUserToken, decodeAccessToken } from '~/services/jwt.service'
import Account from '~/models/account.models'
export const authorize = () =>
  asyncHandelError(async (req: Request, res: Response, next: NextFunction | any) => {
    //next có hai trường hợp. trong suông sẻ và trong bị lỗi
    const response: IResonseObject = {
      message: ''
    }
    const token = req.header('Authorization')

    if (!token) {
      response.message = 'not found token'
      return res.status(401).json(response)
    }
    const decoded = decodeAccessToken<IUserToken>(token)
    if (decoded) {
      const account = await Account.findOne({ _id: decoded._id })
      if (account) {
        res.locals.accessToken = token
        return next()
      }
      if (!account) {
        response.message = 'Unauthorized'
        return res.status(401).json(response)
      }
    }
    if (!decoded) {
      response.message = 'Unauthorized'
      return res.status(401).json(response)
    }
  })
