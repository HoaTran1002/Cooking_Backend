type TCategory = 'SHORT_TERM' | 'LONG_TERM'
type TLeve = 'BASIC' | 'MEDIUM' | 'MASTER'
export interface IParams {
  courseId: string
}

export interface IImage {
  url: string
}
export interface IVideo {
  url: string
}
export interface IRoadmap {
  name: string
  startTime: Date
  endTime: Date
  knowledge: string
  skill: string
}
export interface ICourse {
  category?: TCategory
  leve?: TLeve
  title?: string
  description?: string
  image?: string
  images?: IImage[]
  video?: string
  videos?: IVideo[]
  roadmaps?: IRoadmap[]
  price?: number
  discountPrice?: number
  discountPercentage?: number
  timeCreate?: Date
  timeUpdate?: Date
}
export interface ICourses {
  totalCourseCurrent: number
  Items?: [ICourse]
}
