import { IPolicy } from '../interfaces/policy.interface'
import BaseRepositoryInterface from './base.repositories'

abstract class PolicyRepositoryInterface extends BaseRepositoryInterface {
  abstract create(payload: IPolicy): Promise<IPolicy>
  abstract getById(id: string): Promise<IPolicy>
  abstract deleteById(id: string): Promise<IPolicy | any>
  abstract getAll(limit: number, skip: number): Promise<[IPolicy] | any>
  abstract update(id: string, payload: IPolicy): Promise<IPolicy>
}
export default PolicyRepositoryInterface
