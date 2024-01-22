export abstract class Services<T> {
  abstract createData(payload: T): Promise<T>
}
