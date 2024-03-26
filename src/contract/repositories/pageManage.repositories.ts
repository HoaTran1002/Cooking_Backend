import { IPageManager } from '../interfaces/pageManager.interface'
import BaseRepositoryInterface from './base.repositories'

abstract class PageRepositoryInterface extends BaseRepositoryInterface {
  abstract create(payload: IPageManager): Promise<IPageManager>
  abstract getById(id: string): Promise<IPageManager>
  abstract deleteById(id: string): Promise<IPageManager | any>
  abstract getAll(limit: number, skip: number): Promise<[IPageManager] | any>
  abstract update(id: string, payload: IPageManager): Promise<IPageManager>
}
export default PageRepositoryInterface
