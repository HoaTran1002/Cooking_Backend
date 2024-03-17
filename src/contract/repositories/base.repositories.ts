abstract class BaseRepositoryInterface {
  abstract getAll(limit: number, skip: number): Promise<[any] | any>
  abstract update(id: string, payload: any): Promise<any>
  abstract deleteById(id: string): Promise<any>
  abstract getById(id: string): Promise<any>
  abstract create(payload: any): Promise<any>
}
export default BaseRepositoryInterface
