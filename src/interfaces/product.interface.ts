import { IImage, IVideo, TCategory, TLeve } from './course.interface'

export interface IProduct {
  name: string
  level: TLeve
  category: TCategory
  images: IImage[]
  videos: IVideo[]
  note: string
  idProduct: string
}
