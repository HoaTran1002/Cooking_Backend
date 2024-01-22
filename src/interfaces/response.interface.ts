export interface IResonseObject {
  message: string
  data?: unknown
  status?: number
}
export class IResponseErrorObject {
  public message!: string
  public status!: number
  constructor(message: string, status = 400) {
    this.status = status
    this.message = message
  }
}
export class IResponseSuccessObject {
  public message!: string
  public status!: number
  public data!: any
  constructor(message: string, data: any, status = 400) {
    this.status = status
    this.message = message
    this.data = data
  }
}
