import { ITermAndCondition } from '~/contract/interfaces/termAndCondition.interface'
import BaseRepositoryInterface from './base.repositories'

abstract class TermAndConditionRepositoryInterface extends BaseRepositoryInterface {
  abstract create(payload: ITermAndCondition): Promise<ITermAndCondition>
  abstract getById(id: string): Promise<ITermAndCondition>
  abstract deleteById(id: string): Promise<ITermAndCondition | any>
  abstract getAll(limit: number, skip: number): Promise<[ITermAndCondition] | any>
  abstract update(id: string, payload: ITermAndCondition): Promise<ITermAndCondition>
}
export default TermAndConditionRepositoryInterface
