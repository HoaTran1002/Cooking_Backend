export interface IImages {
  _id: string
  url: string
}
export interface IVideos {
  _id: string
  url: string
  duration: number
}
export interface IRoadmap {
  startTime: string
  endTime: string
  knowledge: string
  skill: string
}
export interface ICourse {
  title: string
  description: string
  image: string
  images: IImages[]
  video: string
  videos: IVideos[]
  roadmaps: IRoadmap[]
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
