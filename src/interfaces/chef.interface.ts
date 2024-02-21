import { IImage } from './course.interface'

export interface IChef {
  position?: number
  name: string
  description: string
  slogan: string
  role: string
  image: IImage
}
