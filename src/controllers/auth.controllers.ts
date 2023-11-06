import { Request, Response } from 'express'
import { IAccount } from '~/interfaces/account.interface'
import Account from '~/models/account.models'
import { IResonseObject } from '~/interfaces/response.interface'
import { accountValid } from '~/services/auth.service'
import { IUser, generateAccessToken, generateRefreshToken } from '~/services/jwt.service'
import refreshtokenModels, { IRefreshToken } from '~/models/refreshtoken.models'
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

  const createRefreshTokenDocument: IRefreshToken = { token: refreshToken, user: account }
  await refreshtokenModels.create({ createRefreshTokenDocument })
  res.setHeader('Authorization', accessToken)
  res.cookie('_MOM_COOKING_RF', refreshToken)
  return res.status(200).json({
    message: 'login success',
    accessToken,
    refreshToken
  })
}
