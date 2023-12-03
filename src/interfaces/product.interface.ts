import { IImage, IVideo, TCategory, TLeve } from './course.interface'

export interface IProduct {
  name: string
  level: TLeve
  category: TCategory
  image: IImage[]
  video: IVideo[]
  note: string
}
