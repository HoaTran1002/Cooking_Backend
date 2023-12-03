import { NextFunction, Request, Response } from 'express'
import { IAccount } from '~/interfaces/account.interface'
import { IResonseObject } from '~/interfaces/response.interface'
import Account from '~/models/account.models'
import { deleteAccount, updateAccount } from '~/services/account.service'
export const createAccount = async (
  req: Request<any, unknown, IAccount>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const body = req.body
  const fillterExist = { userName: body.userName }
  const exist = await Account.find(fillterExist)
  if (exist) {
    return res.status(409).json({ message: 'Account already exists' })
  }
  const data = await Account.create(body)
  const response: IResonseObject = {
    message: 'crates account success',
    data
  }
  return res.status(200).json(response)
}
export const deleteAccountById = async (
  req: Request<any, unknown, IAccount>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const _id = req.params.id
  const data = await deleteAccount(_id)
  const response: IResonseObject = {
    message: 'deleted account success',
    data
  }
  return res.status(200).json(response)
}
export const updateAccountById = async (
  req: Request<any, unknown, IAccount>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const _id = req.params.id
  const body = req.body
  const data = await updateAccount(_id, body)
  const response: IResonseObject = {
    message: 'updated account success',
    data
  }
  return res.status(200).json(response)
}
export const findAccountById = async (
  req: Request<any, unknown, IAccount>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const id = req.params.id
  const data = await Account.findOne({ _id: id })
  const response: IResonseObject = {
    message: 'got data success',
    data
  }
  return res.status(200).json(response)
}
export const findAllAccount = async (
  req: Request<any, unknown, IAccount>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const data = await Account.find({})

  const response: IResonseObject = {
    message: 'got all data success',
    data: data
  }
  return res.status(200).json(response)
}
