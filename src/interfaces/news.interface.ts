export interface INews {
  title: string
  author: string
  dateCreated: Date
  content: string
}
export interface IDataManager {
  getDataByID(id: string): any
}
