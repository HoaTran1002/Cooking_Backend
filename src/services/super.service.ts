import PaginationResult from '~/interfaces/pagination.interface'

export abstract class Services<T> {
  abstract createData(payload: T): Promise<T>
  abstract editData(id: string, payload: T): Promise<T>
  abstract deleteData(id: string): void
  abstract getById(id: string): Promise<T>
  abstract getAllData(): Promise<T[]>
  abstract pagination(page: number, size: number): Promise<PaginationResult>
}
