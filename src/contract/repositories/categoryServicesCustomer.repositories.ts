import { ICategoryServices } from '../interfaces/customer.interface'
import BaseRepositoryInterface from './base.repositories'

abstract class CategoryServicesCustomerInterface extends BaseRepositoryInterface {
  abstract create(payload: ICategoryServices): Promise<ICategoryServices>
  abstract getById(id: string): Promise<ICategoryServices>
  abstract deleteById(id: string): Promise<ICategoryServices | any>
  abstract getAll(limit: number, skip: number): Promise<[ICategoryServices] | any>
  abstract update(id: string, payload: ICategoryServices): Promise<ICategoryServices>
}
export default CategoryServicesCustomerInterface
