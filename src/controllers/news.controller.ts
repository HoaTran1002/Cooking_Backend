import { Request, Response } from 'express'
import { INews } from '~/interfaces/news.interface'
import { newsServiceManager } from '~/services/news.service'
import { newsResipotoryManager } from '~/repositories/news.respository'
import { IResonseObject } from '~/interfaces/response.interface'

export class newsFacadePatten implements INews {
  title!: string
  author!: string
  dateCreated!: Date
  content!: string
  private newsResipotory: newsResipotoryManager
  private newsServices: newsServiceManager
  constructor() {
    this.newsResipotory = new newsResipotoryManager()
    this.newsServices = new newsServiceManager()
  }
  async createNews(req: Request, res: Response): Promise<Response<IResonseObject> | void> {}
  getNews() {}
  getAllNews(req: Request, res: Response) {}
}
