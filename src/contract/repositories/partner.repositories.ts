import { IPartner } from '../interfaces/partner.interface'
import BaseRepositoryInterface from './base.repositories'

abstract class PartnerRepositoryInterface extends BaseRepositoryInterface {
  abstract create(payload: IPartner): Promise<IPartner>
  abstract getById(id: string): Promise<IPartner>
  abstract deleteById(id: string): Promise<IPartner | any>
  abstract getAll(limit: number, skip: number): Promise<[IPartner] | any>
  abstract update(id: string, payload: IPartner): Promise<IPartner>
}
export default PartnerRepositoryInterface
