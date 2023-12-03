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
