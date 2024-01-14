import { string } from 'joi'
import { IImage, IVideo, TCategory, TLeve } from './course.interface'

export interface IProduct {
  name: string
  level: TLeve
  category: TCategory
  images: IImage[]
  videos: IVideo[]
  note: string
  timeLearning?: string[]
  idCourse?: string
  idCategory?: string[]
}
