import { IInformationPosition } from '../interfaces/recruitment.interface'
import BaseRepositoryInterface from './base.repositories'

abstract class InformationPositionRepositoryInterface extends BaseRepositoryInterface {
  abstract create(payload: IInformationPosition): Promise<IInformationPosition>
  abstract getById(id: string): Promise<IInformationPosition>
  abstract deleteById(id: string): Promise<IInformationPosition | any>
  abstract getAll(limit: number, skip: number): Promise<[IInformationPosition] | any>
  abstract update(id: string, payload: IInformationPosition): Promise<IInformationPosition>
}
export default InformationPositionRepositoryInterface
