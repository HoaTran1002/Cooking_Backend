import { IImage } from './course.interface'

interface IServiceCustomer {
  name: string
  description: string
  image: IImage
  position: number
}
export interface ICategoryCustomer {
  name: string
  position: number
  items: [IServiceCustomer]
}
export interface ICustomer {
  title: string
  description: string
}
