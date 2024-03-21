import { IImage } from './course.interface'

interface IItem {
  name: string
  description: string
  image: IImage
  position: number
}
interface ICategory {
  name: string
  position: number
  items: [IItem]
}
export interface ICustomer {
  title: string
  description: string
  categories: [ICategory]
}
