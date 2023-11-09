import e, { Request, Response } from 'express'
import { IAccount } from '~/interfaces/account.interface'
import Account from '~/models/account.models'
import { IResonseObject } from '~/interfaces/response.interface'
import { accountValid } from '~/services/auth.service'
import {
  IUserToken,
  checkedAccessToken,
  decodeRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  getRefreshToken,
  replaceRefreshToken
} from '~/services/jwt.service'
import refreshtokenModels, { IRefreshToken } from '~/models/refreshtoken.models'
import { env } from '~/config/env.config'
export const register = async (
  req: Request<unknown, unknown, IAccount>,
  res: Response
): Promise<void | Response<IResonseObject>> => {}
export const login = async (
  req: Request<unknown, unknown, IAccount>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const body = req.body
  const response: IResonseObject = {
    message: 'login'
  }
  if (!body) {
    response.message = 'Invalid format'
    return res.json(403).json(response)
  }
  const fillter = { userName: body.userName }
  const account = await Account.findOne(fillter)
  if (!account) {
    response.message = 'Login failed'
    return res.json(401).json(response)
  }
  const valid = await accountValid(account)
  if (!valid) {
    response.message = 'Login failed'
    return res.json(401).json(response)
  }
  const user = {
    _id: account._id.toString('base64'),
    userName: account.userName ? account.userName : 'no name'
  }

  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  const createRefreshTokenDocument: IRefreshToken = {
    token: refreshToken,
    user: account
  }
  await refreshtokenModels.create({ createRefreshTokenDocument })
  res.setHeader('Authorization', accessToken)
  res.cookie(env.NAME_REFRESH_TOKEN_IN_COOKIE, refreshToken)
  return res.status(200).json({
    message: 'login success',
    accessToken,
    refreshToken
  })
}
export const requestRefereshToken = async (req: Request<unknown, unknown, IAccount>, res: Response) => {
  try {
    const token = await req.cookies(env.NAME_REFRESH_TOKEN_IN_COOKIE)
    const response: IResonseObject = {
      message: 'refresh success',
      status: 201
    }
    const refreshToken: string = await getRefreshToken(token)
    const user: IUserToken = decodeRefreshToken<IUserToken>(refreshToken)
    if (refreshToken) {
      const newRefreshToken = generateRefreshToken(user)
      const replaced: IRefreshToken = await replaceRefreshToken(token, newRefreshToken)
      if (!replaced) {
        response.message = 'invalid refresh token '
        response.status = 401
        return res.status(401).json(response)
      }
      res.cookie(env.NAME_REFRESH_TOKEN_IN_COOKIE, newRefreshToken)
      return res.status(201).json(response)
    }
  } catch (error: any) {
    error.status = 401
    error.name = 'TokenError'
    throw error
  }
}
