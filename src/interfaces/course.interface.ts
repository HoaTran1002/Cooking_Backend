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
  time: string
  knowledge: string[]
  skill: string[]
}
export interface ICourse {
  title: string
  description: string
  images: IImages[]
  videos: IVideos[]
  roadmaps: IRoadmap[]
  price?: number
  discountPrice?: number
  discountPercentage?: number
}
