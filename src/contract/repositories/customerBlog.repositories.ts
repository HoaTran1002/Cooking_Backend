import { ICustomer } from '../interfaces/customer.interface'
import BaseRepositoryInterface from './base.repositories'

abstract class CustomerRepositoryInterface extends BaseRepositoryInterface {
  abstract create(payload: ICustomer): Promise<ICustomer>
  abstract getById(id: string): Promise<ICustomer>
  abstract deleteById(id: string): Promise<ICustomer | any>
  abstract getAll(limit: number, skip: number): Promise<[ICustomer] | any>
  abstract update(id: string, payload: ICustomer): Promise<ICustomer>
}
export default CustomerRepositoryInterface
