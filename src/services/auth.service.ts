import { IAccount } from '~/interfaces/account.interface'

import bcrypt from 'bcrypt'
import Account from '~/models/account.models'
export const accountValid = async (body: IAccount): Promise<boolean> => {
  const account = await Account.findOne({ userName: body.userName })
  if (account) {
    const isMatch = bcrypt.compareSync(body.password, account.password)
    if (!isMatch) {
      return false
    }

    return true
  }

  return false
}
export const createAccount = async (body: IAccount) => {
  const account = await Account.create(body)
  return account
}
