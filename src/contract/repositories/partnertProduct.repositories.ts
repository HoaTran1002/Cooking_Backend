import { IPartnerProduct } from '../interfaces/partner.interface'
import BaseRepositoryInterface from './base.repositories'

abstract class PartnerProductRepositoryInterface extends BaseRepositoryInterface {
  abstract create(payload: IPartnerProduct): Promise<IPartnerProduct>
  abstract getById(id: string): Promise<IPartnerProduct>
  abstract deleteById(id: string): Promise<IPartnerProduct | any>
  abstract getAll(limit: number, skip: number): Promise<[IPartnerProduct] | any>
  abstract update(id: string, payload: IPartnerProduct): Promise<IPartnerProduct>
}
export default PartnerProductRepositoryInterface
