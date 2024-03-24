import { Model } from 'mongoose'
import { recruitmentBlogModel } from '~/models/recruitment.models'
import { IRecruitmentBlog } from '~/contract/interfaces/recruitment.interface'
import IRecruitmentBlogRepositoryInterface from '~/contract/repositories/recruitmentBlog.repositories'

class IRecruitmentBlogRepository implements IRecruitmentBlogRepositoryInterface {
  readonly Model: Model<IRecruitmentBlog>

  constructor(recruitmentBlogModel: Model<IRecruitmentBlog>) {
    this.Model = recruitmentBlogModel
  }
  create(payload: IRecruitmentBlog): Promise<any | IRecruitmentBlog> {
    const record = recruitmentBlogModel.create(payload)
    return record
  }
  getById(id: string): Promise<IRecruitmentBlog | any> {
    return recruitmentBlogModel.findById(id)
  }
  deleteById(id: string): Promise<any> {
    return recruitmentBlogModel.deleteOne({ _id: id })
  }
  getAll(limit: number, skip: number): Promise<[IRecruitmentBlog] | any> {
    const data = recruitmentBlogModel.find().limit(limit).skip(skip)
    return data
  }
  update(id: string, payload: IRecruitmentBlog): Promise<IRecruitmentBlog | any> {
    const fillter = { _id: id }
    const options = { new: true }
    const data = recruitmentBlogModel.findOneAndUpdate(fillter, payload, options)
    return data
  }
}
export default new IRecruitmentBlogRepository(recruitmentBlogModel)
