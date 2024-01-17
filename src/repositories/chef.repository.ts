import { IChef } from '~/interfaces/chef.interface'
import chefModels from '~/models/chef.models'

export const addChef = async (data: IChef): Promise<IChef | void> => {
  const news = (await chefModels.create(data)) as IChef
  return news
}
export const getChefByID = async (id: string): Promise<IChef | null> => {
  const fillter = { _id: id }
  const data: IChef | null = await chefModels.findOne(fillter)
  return data
}
export const updateChefByID = async (id: string, body: IChef): Promise<IChef | void> => {
  const fillter = { _id: id }
  const update = { $set: body }
  const options = { new: true }
  const news = await chefModels.findOneAndUpdate(fillter, update, options)
  if (news) {
    return news
  }
}
export const deleteByIDChef = async (id: string): Promise<IChef | any> => {
  const fillter = { _id: id }
  const options = { new: true }
  await chefModels.findOneAndDelete(fillter, options)
}
