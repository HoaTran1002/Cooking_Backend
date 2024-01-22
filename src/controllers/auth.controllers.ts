import { Request, Response } from 'express'
import { IAccount } from '~/interfaces/account.interface'
import Account from '~/models/account.models'
import { IResonseObject } from '~/interfaces/response.interface'
import { accountValid, createAccount } from '~/services/auth.service'
import {
  IUserToken,
  decodeRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  replaceRefreshToken
} from '~/services/jwt.service'
import refreshtokenModels, { IRefreshToken } from '~/models/refreshtoken.models'
import { env } from '~/config/env.config'
const cookiesOptions = {
  expires: new Date(Date.now() + 86400000),
  httpOnly: false,
  secure: true
}
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
  } else {
    const account = await createAccount(body)
    const user = {
      _id: account._id.toString(),
      userName: account.userName ? account.userName : 'no name'
    }

    const accessToken = generateAccessToken(user)
    const refreshToken: string = generateRefreshToken(user)

    const RefreshTokenDocument: IRefreshToken = {
      token: refreshToken,
      idUser: account._id.toString()
    }
    await refreshtokenModels.create(RefreshTokenDocument)
    res.setHeader('Authorization', `Bearer ${accessToken}`)
    res.cookie(env.NAME_REFRESH_TOKEN_IN_COOKIE, refreshToken, cookiesOptions)
    return res.status(200).json({
      message: 'register success',
      accessToken,
      refreshToken
    })
  }
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
  //đảm bảo người dùng chỉ có duy nhất một refreshtoken, xoá tất cả refresktoken của user trước đăng nh
  const fillterRefreshToken = { idUser: account._id.toString() }
  await refreshtokenModels.deleteMany(fillterRefreshToken)
  const valid = await accountValid(body)
  if (!valid) {
    response.message = 'invalid account'
    return res.status(401).json(response)
  }
  const user = {
    _id: account._id.toString(),
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
  res.cookie(env.NAME_REFRESH_TOKEN_IN_COOKIE, refreshToken, cookiesOptions)

  return res.status(200).json({
    message: 'login success',
    profile: account,
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
    const refreshTokenValid: IRefreshToken | any = refreshtokenModels.findOne({ token: refreshToken })
    const user: IUserToken = decodeRefreshToken<IUserToken>(refreshToken)
    if (!user) {
      response.message = 'invalid token'
      response.status = 401
      return res.status(401).json(response)
    }
    if (!refreshTokenValid) {
      response.message = 'invalid token'
      response.status = 401
      return res.status(401).json(response)
    }
    if (refreshTokenValid) {
      const newRefreshToken = generateRefreshToken(user)

      const replaced: IRefreshToken = await replaceRefreshToken(refreshToken, newRefreshToken)
      if (!replaced) {
        response.message = 'invalid  token '
        response.status = 401
        return res.status(401).json(response)
      }
      if (replaced) {
        const accessToken = generateAccessToken(user)
        res.setHeader('Authorization', `Bearer ${accessToken}`)
        res.cookie(env.NAME_REFRESH_TOKEN_IN_COOKIE, newRefreshToken, cookiesOptions)
        response.message = 'refresh token success'
        response.data = { accessToken, refreshToken }

        return res.status(201).json(response)
      }
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
