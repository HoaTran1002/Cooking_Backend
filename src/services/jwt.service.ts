import { env } from '~/config/env.config'
import jwt, { JwtPayload } from 'jsonwebtoken'
import RefreshToken, { IRefreshToken } from '~/models/refreshtoken.models'
export interface IUserToken {
  _id: string
  userName: string
}

export const generateAccessToken = (user: IUserToken) => {
  const token = jwt.sign(user, env.SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: env.EXPIRES_SETCRECT_KEY_ACCESS_TOKEN
  })
  return token
}
export const generateRefreshToken = (user: IUserToken) => {
  const payload: IUserToken = { _id: user._id, userName: user.userName }
  const token = jwt.sign(payload, env.SECRET_KEY_REFRESH_TOKEN, {
    expiresIn: env.EXPIRES_SETCRECT_KEY_REFRESH_TOKEN
  })
  return token
}
export const decodeAccessToken = <T = unknown>(token: string): T => {
  try {
    const decoded = jwt.verify(token, env.SECRET_KEY_ACCESS_TOKEN)

    return decoded as T
  } catch (error: any) {
    throw new Error(error)
  }
}
export const decodeRefreshToken = <T = unknown>(token: string): T => {
  try {
    const decoded = jwt.verify(token, env.SECRET_KEY_REFRESH_TOKEN)
    return decoded as T
  } catch (error: any) {
    throw new Error(error)
  }
}
export const checkedAccessToken = (token: string): boolean => {
  try {
    const decoded = jwt.verify(token, env.SECRET_KEY_ACCESS_TOKEN) as JwtPayload
    const currentTime = Number(Math.floor(Date.now() / 1000))

    if (decoded.exp) {
      return decoded.exp < currentTime
    }
    return false
  } catch (error: any) {
    throw new Error(error)
  }
}
export const checkedRefreshToken = (token: string): boolean => {
  try {
    const decoded = jwt.verify(token, env.SECRET_KEY_REFRESH_TOKEN) as JwtPayload
    const currentTime = Number(Math.floor(Date.now() / 1000))

    if (decoded.exp) {
      return decoded.exp < currentTime
    }
    return false
  } catch (error: any) {
    throw new Error(error)
  }
}
export const getRefreshToken = async (token: string) => {
  if (!token) {
    throw 'Token is missing'
  }
  console.log('token:', token)
  const fillter = { token: token }
  const refreshToken = await RefreshToken.findOne(fillter)
  if (!refreshToken) throw 'Invalid token'
  return refreshToken.token
}
export const replaceRefreshToken = async (
  refreshToken: string,
  newRefreshToken: string
): Promise<IRefreshToken | any> => {
  const fillter = { token: refreshToken }
  const update = {
    token: newRefreshToken
  }
  const options = { new: true }
  const record = await RefreshToken.findOneAndUpdate(fillter, update, options)
  console.log(refreshToken)
  console.log(newRefreshToken)
  console.log(record)
  return record
}
