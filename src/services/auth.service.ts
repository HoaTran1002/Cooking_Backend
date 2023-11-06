import { IAccount } from '~/interfaces/account.interface'
import Account from '~/models/account.models'
import bcrypt from 'bcrypt'
export const accountValid = async (body: IAccount): Promise<boolean> => {
  const account = await Account.findOne({ userName: body.userName })
  if (account?.userName != body.userName) {
    return false
  }
  if (account) {
    const isMatch = bcrypt.compareSync(body.password, account.password)
    if (!isMatch) {
      return false
    }
  }

  return true
}
