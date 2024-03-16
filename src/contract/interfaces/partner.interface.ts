import { extend } from 'joi'
import { IImage } from './course.interface'

export interface IPartnerProduct {
  name: string
  image: IImage
  description: string
  position: number
}
export abstract class IPartner {
  abstract name: string
  abstract logo: IImage
  abstract description: string
  abstract position: number
  abstract products: [IPartnerProduct]
}
