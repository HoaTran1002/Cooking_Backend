import { string } from 'joi'
import { IImage, IVideo, TCategory, TLeve } from './course.interface'

export interface IHightLight {
  title?: string
  content?: string
}

export interface IProduct {
  name: string
  images: IImage[]
  videos: IVideo[]
  note: string
  timeLearning?: string
  idCourse?: string
  idCategory?: string
  linkYoutube?: string
  title?: string
  description?: string
  price?: string
  position?: string
  executionTime?: string
  numberOfAttendees?: number
  languageOfInstruction?: string
  serviceDetailsWhenStudying?: string
  linkMenu?: string
  hightlight?: [IHightLight]
  requiredWhenStudying?: string
  content_review?: string
  listScript?: [string]
}
