import { IImage } from './course.interface'

export interface INews {
  title: string
  author: string
  dateCreated: Date
  content: string
  image: IImage
}
