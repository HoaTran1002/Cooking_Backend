import { Model } from 'mongoose'
import { IPageManager } from '~/contract/interfaces/pageManager.interface'
import PageRepositoryInterface from '~/contract/repositories/pageManage.repositories'
import { pageModel } from '~/models/pageManageModels'

class PageRepository implements PageRepositoryInterface {
  readonly Model: Model<IPageManager>

  constructor(pageModel: Model<IPageManager>) {
    this.Model = pageModel
  }
  create(payload: IPageManager): Promise<any | IPageManager> {
    const record = pageModel.create(payload)
    return record
  }
  getById(id: string): Promise<IPageManager | any> {
    return pageModel.findById(id)
  }
  deleteById(id: string): Promise<any> {
    return pageModel.deleteOne({ _id: id })
  }
  getAll(limit: number, skip: number): Promise<[IPageManager] | any> {
    const data = pageModel.find().limit(limit).skip(skip)
    return data
  }
  update(id: string, payload: IPageManager): Promise<IPageManager | any> {
    const fillter = { _id: id }
    const options = { new: true }
    const data = pageModel.findOneAndUpdate(fillter, payload, options)
    return data
  }
}
export default new PageRepository(pageModel)
