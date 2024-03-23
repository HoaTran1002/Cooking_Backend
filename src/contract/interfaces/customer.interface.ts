import { IImage } from './course.interface'
export interface IServiceCustomer {
  name: string
  description: string
  image: IImage
  position: number
}
export interface ICategoryServices {
  name: string
  position: number
  items: [IServiceCustomer]
}
export interface ICustomer {
  title: string
  description: string
}
