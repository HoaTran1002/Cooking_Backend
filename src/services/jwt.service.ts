import { env } from '~/config/env.config'
import jwt from 'jsonwebtoken'
export interface IUser {
  _id: string
  userName: string
}

export const generateAccessToken = (user: IUser) => {
  const token = jwt.sign(user, env.SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: '3600s'
  })
  return token
}
export const generateRefreshToken = (user: IUser) => {
  const token = jwt.sign(user, env.SECRET_KEY_REFRESH_TOKEN, {
    expiresIn: '30 days'
  })
  return token
}
