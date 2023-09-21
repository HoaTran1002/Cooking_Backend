export interface IResonseObject {
  status?: number
  message: string
  data?: unknown
}
export interface IResponseErrorObject {
  message: string
  status?: number
}
