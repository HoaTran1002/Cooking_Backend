import { Request, Response } from 'express'
import { IInformationBusiness } from '~/interfaces/businessInfrormation.interface'
import { IResonseObject } from '~/interfaces/response.interface'
import InformationBusiness from '~/models/businessInformation.models'
import { updateById } from '~/services/informationBusiness.service'

export const createInformationBusiness = async (
  req: Request<unknown, unknown, IInformationBusiness>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const body = req.body
  console.log(body)
  const data = await InformationBusiness.create(body)
  const response: IResonseObject = {
    message: 'created information about the business',
    data: data
  }
  return res.status(200).json(response)
}

export const getAll = async (req: Request, res: Response): Promise<void | Response<IResonseObject>> => {
  const data = await InformationBusiness.find()
  const response: IResonseObject = {
    message: 'got all list information business',
    data: data
  }
  return res.status(200).json(data)
}
export const getById = async (
  req: Request<any, unknown, IInformationBusiness>,
  res: Response<IResonseObject>
): Promise<void | Response<IResonseObject>> => {
  const _id = req.params.id
  const data = await InformationBusiness.findById({ _id: _id })
  const response: IResonseObject = {
    message: 'get data success',
    data: data
  }

  return res.status(200).json(response)
}
export const removeById = async (
  req: Request<any, unknown, IInformationBusiness>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const _id = req.params.id
  const data = await InformationBusiness.findByIdAndDelete({ id: _id }, { new: true })
  const response: IResonseObject = {
    message: 'delete data success',
    data: data
  }
  return res.status(200).json(response)
}
export const updateFormationBusinessById = async (
  req: Request<any, unknown, IInformationBusiness>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const _id = req.params.id
  const body = req.body
  const data = updateById(_id, body)
  const response: IResonseObject = {
    message: 'update data success',
    data: data
  }
  return res.status(200).json(response)
}
