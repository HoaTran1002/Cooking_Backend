import { Request, Response } from 'express'
import { INews } from '~/interfaces/news.interface'
import { newsServiceManager } from '~/services/news.service'
import { newsResipotoryManager } from '~/repositories/news.respository'
import { IResonseObject } from '~/interfaces/response.interface'
import { newsBuilder } from '~/implement/news.builder'

export class newsFacadePatten {
  private newsBuilder: newsBuilder
  private newsResipotory: newsResipotoryManager
  private newsServices: newsServiceManager

  constructor() {
    this.newsBuilder = new newsBuilder()
    this.newsResipotory = new newsResipotoryManager()
    this.newsServices = new newsServiceManager()
  }

  async createNews(req: Request<unknown, unknown, INews>, res: Response): Promise<Response<IResonseObject> | void> {
    const body = req.body
    this.newsBuilder.setTitle(body.title)
    this.newsBuilder.setAuthor(body.title)
    this.newsBuilder.setDateCrate(body.dateCreated)
    this.newsBuilder.setContent(body.content)
  }
}
