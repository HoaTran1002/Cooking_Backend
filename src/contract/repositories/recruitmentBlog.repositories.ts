import { IRecruitmentBlog } from '../interfaces/recruitment.interface'
import BaseRepositoryInterface from './base.repositories'

abstract class IRecruitmentBlogRepositoryInterface extends BaseRepositoryInterface {
  abstract create(payload: IRecruitmentBlog): Promise<IRecruitmentBlog>
  abstract getById(id: string): Promise<IRecruitmentBlog>
  abstract deleteById(id: string): Promise<IRecruitmentBlog | any>
  abstract getAll(limit: number, skip: number): Promise<[IRecruitmentBlog] | any>
  abstract update(id: string, payload: IRecruitmentBlog): Promise<IRecruitmentBlog>
}
export default IRecruitmentBlogRepositoryInterface
