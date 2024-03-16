import { IImage } from './course.interface'

export interface IAchivementItem {
  item?: string
}
export interface IAchievement {
  time?: string
  items?: [IAchivementItem]
}
export interface IRelatedInformation {
  image?: string
  content?: string
}
export interface IInformationBusiness {
  name?: string
  phoneNumber?: string
  address?: string
  email?: string
  domain?: string
  slogan?: string
  logo?: IImage
  story?: string
  achievement?: [IAchievement]
  relatedInformation?: [IRelatedInformation]
}
