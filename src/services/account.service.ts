import { Response } from 'express'
import { IAccount } from '~/interfaces/account.interface'
import Account from '~/models/account.models'
export const deleteAccount = async (_id: string): Promise<void | IAccount | unknown> => {
  const fillter = { id: _id }
  const options = { new: true }
  const data = await Account.findOneAndRemove(fillter, options)
  return data
}
export const updateAccount = async (_id: string, body: IAccount): Promise<void | IAccount | unknown> => {
  const fillter = { id: _id }
  const options = { new: true }
  const update = body
  const data = await Account.findOneAndUpdate(fillter, update, options)
  return data
}
export const findOne = async (_id: string): Promise<IAccount | null> => {
  const data = await Account.findOne({ id: _id })
  return data
}
