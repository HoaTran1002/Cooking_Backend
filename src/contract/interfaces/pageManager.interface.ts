import { IImage } from './course.interface'
interface background {
  imageMobile: IImage
  imageDesktop: IImage
}
export interface pageManager {
  name: string
  baner: background
}
