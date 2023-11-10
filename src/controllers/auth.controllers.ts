import { Request, Response } from 'express'
import { IAccount } from '~/interfaces/account.interface'
import Account from '~/models/account.models'
import { IResonseObject } from '~/interfaces/response.interface'
import { accountValid, createAccount } from '~/services/auth.service'
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
): Promise<void | Response<IResonseObject>> => {
  const body = req.body
  const response: IResonseObject = {
    message: 'create success',
    status: 200
  }
  if (!body.userName || !body.password) {
    ;(response.message = 'invalid format'), (response.status = 401)
    return res.status(401).json(response)
  }
  const alreadyAccount = await Account.findOne({ userName: body.userName })
  if (alreadyAccount) {
    ;(response.message = 'already account!'), (response.status = 409)
    return res.status(409).json(response)
  }
  const account = await createAccount(body)
  const user = {
    _id: account._id.toString('base64'),
    userName: account.userName ? account.userName : 'no name'
  }

  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  const RefreshTokenDocument: IRefreshToken = {
    token: refreshToken,
    idUser: account._id.toString()
  }
  const frtokenDocument = await refreshtokenModels.create(RefreshTokenDocument)
  console.log('refreshtoken:', frtokenDocument)
  res.setHeader('Authorization', `Bearer ${accessToken}`)
  res.cookie(env.NAME_REFRESH_TOKEN_IN_COOKIE, refreshToken)
  return res.status(200).json({
    message: 'register success',
    accessToken,
    refreshToken
  })
}

export const login = async (
  req: Request<unknown, unknown, IAccount>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const body = req.body
  const response: IResonseObject = {
    message: 'login'
  }

  //kiểm tra định dạng
  if (!body.userName || !body.password) {
    response.message = 'Invalid format'
    return res.status(401).json(response)
  }
  const fillter = { userName: body.userName }
  const account = await Account.findOne(fillter)
  if (!account) {
    response.message = 'invalid account'
    return res.status(401).json(response)
  }
  //đảm bảo người dùng chỉ có duy nhất một refreshtoken, xoá tất cả refresktoken của user trước đăng nhập
  const fillterRefreshToken = { idUser: account._id.toString() }
  await refreshtokenModels.deleteMany(fillterRefreshToken)
  const valid = await accountValid(body)
  if (!valid) {
    response.message = 'invalid account'
    return res.status(401).json(response)
  }
  const user = {
    _id: account._id.toString('base64'),
    userName: account.userName ? account.userName : 'no name'
  }

  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  const createRefreshTokenDocument: IRefreshToken = {
    token: refreshToken,
    idUser: account._id.toString()
  }

  await refreshtokenModels.create(createRefreshTokenDocument)
  const refreshs = await refreshtokenModels.find()
  console.log(refreshs)
  res.setHeader('Authorization', `Bearer ${accessToken}`)
  res.cookie(env.NAME_REFRESH_TOKEN_IN_COOKIE, refreshToken)
  return res.status(200).json({
    message: 'login success',
    accessToken,
    refreshToken
  })
}
export const requestRefereshToken = async (req: Request<unknown, unknown, IAccount>, res: Response) => {
  try {
    const refreshToken = await req.cookies[env.NAME_REFRESH_TOKEN_IN_COOKIE]
    const response: IResonseObject = {
      message: 'refresh success',
      status: 201
    }
    if (!refreshToken) {
      ;(response.message = 'not found refreshtoken'), (response.status = 401)
      return res.status(401).json(response)
    }
    const user: IUserToken = decodeRefreshToken<IUserToken>(refreshToken)

    if (refreshToken) {
      const newRefreshToken = generateRefreshToken(user)
      const replaced: IRefreshToken = await replaceRefreshToken(refreshToken, newRefreshToken)

      if (!replaced) {
        response.message = 'invalid refresh token '
        response.status = 401
        return res.status(401).json(response)
      }
      const accessToken = generateAccessToken(user)
      res.cookie(env.NAME_REFRESH_TOKEN_IN_COOKIE, newRefreshToken)
      res.setHeader('Authorization', `Bearer ${accessToken}`)
      response.message = 'refresh token success'
      response.data = { accessToken, refreshToken }
      return res.status(201).json(response)
    }
  } catch (error: any) {
    error.status = 401
    error.name = 'TokenError'
    throw error
  }
}
export const logOut = async (req: Request, res: Response) => {
  try {
    const refreshToken: string = await req.cookies[env.NAME_REFRESH_TOKEN_IN_COOKIE]
    const fillter = { token: refreshToken }
    await refreshtokenModels.findOneAndDelete(fillter)
    res.clearCookie(env.NAME_REFRESH_TOKEN_IN_COOKIE)
    res.removeHeader('Authorization')
    const response: IResonseObject = {
      message: 'logout success'
    }
    return res.status(200).json(response)
  } catch (error: any) {
    throw new Error(error)
  }
}
