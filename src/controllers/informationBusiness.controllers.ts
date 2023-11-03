import { Request, Response } from 'express'
import { IInformationBusiness } from '~/interfaces/businessInfrormation.interface'
import { IResonseObject } from '~/interfaces/response.interface'
import InformationBusiness from '~/models/businessInformation.models'

export const createInformationBusiness = async (
  req: Request<unknown, unknown, IInformationBusiness>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const body = req.body
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
  return res.status(200).json(response)
}
