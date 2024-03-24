import { ICandicateInfor } from '../interfaces/recruitment.interface'
import BaseRepositoryInterface from './base.repositories'

abstract class CandicateInforInterface extends BaseRepositoryInterface {
  abstract create(payload: ICandicateInfor): Promise<ICandicateInfor>
  abstract getById(id: string): Promise<ICandicateInfor>
  abstract deleteById(id: string): Promise<ICandicateInfor | any>
  abstract getAll(limit: number, skip: number): Promise<[ICandicateInfor] | any>
  abstract update(id: string, payload: ICandicateInfor): Promise<ICandicateInfor>
}
export default CandicateInforInterface
