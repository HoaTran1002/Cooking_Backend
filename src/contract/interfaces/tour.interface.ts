import { IImage } from './course.interface'

export interface ITourOverView {
  idProduct: string
  startTime?: string
  endTime?: string
  activityName?: string
  activityContent?: string
  activityImages?: IImage
}
