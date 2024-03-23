import { IServiceCustomer } from '../interfaces/customer.interface'
import BaseRepositoryInterface from './base.repositories'

abstract class ServicesCustomerInterface extends BaseRepositoryInterface {
  abstract create(payload: IServiceCustomer): Promise<IServiceCustomer>
  abstract getById(id: string): Promise<IServiceCustomer>
  abstract deleteById(id: string): Promise<IServiceCustomer | any>
  abstract getAll(limit: number, skip: number): Promise<[IServiceCustomer] | any>
  abstract update(id: string, payload: IServiceCustomer): Promise<IServiceCustomer>
}
export default ServicesCustomerInterface
