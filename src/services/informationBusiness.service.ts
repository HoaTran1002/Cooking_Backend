import { IInformationBusiness } from '~/interfaces/businessInfrormation.interface'
import imformationBusiness from '~/models/businessInformation.models'

export const updateById = async (
  _id: string,
  body: IInformationBusiness
): Promise<void | IInformationBusiness | unknown> => {
  const fillter = { id: _id }
  const update = body
  const options = { new: true }
  const data = imformationBusiness.findOneAndUpdate(fillter, update, options)
  return data
}
