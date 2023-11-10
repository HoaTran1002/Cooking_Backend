import { NextFunction, Request, Response } from 'express'
import { asyncHandelError } from './error.middlewear'
import { IResonseObject } from '~/interfaces/response.interface'
import { IUserToken, decodeAccessToken } from '~/services/jwt.service'
import Account from '~/models/account.models'
import { IAccount } from '~/interfaces/account.interface'

export const authorize = (roles?: string[]) =>
  asyncHandelError(async (req: Request, res: Response, next: NextFunction) => {
    const response: IResonseObject = {
      message: ''
    }
    const authorizationHeader = req.get('Authorization')
    console.log('authorizationHeader:', authorizationHeader)
    if (!authorizationHeader) {
      response.message = 'not found token'
      throw new Error('no authencation')
    }
    const token = authorizationHeader.split(' ')[1]
    const decoded = decodeAccessToken<IUserToken>(token)
    if (!decoded) {
      response.message = 'Unauthorized'
      throw new Error('Unauthorized')
    }
    const account: IAccount | null = await Account.findOne({ _id: decoded._id })
    if (!account) {
      response.message = 'Unauthorized'
      throw new Error('Unauthorized')
    }
    const role = account?.role || 'STUDENT'
    if (roles && roles.length > 0) {
      if (roles && roles.includes(role)) {
        next()
      } else {
        throw new Error('Forbidden')
      }
    } else {
      next()
    }
  })
