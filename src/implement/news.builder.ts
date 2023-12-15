import { INews } from '~/interfaces/news.interface'
export class newsBuilder {
  private news: INews
  constructor() {
    this.news = {} as INews
  }
  setTitle(title: string): INews {
    this.news.title = title
    return this.news
  }
  setAuthor(author: string): INews {
    this.news.author = author
    return this.news
  }
  setDateCrate(dateCreated: Date): INews {
    this.news.dateCreated = dateCreated
    return this.news
  }
  setContent(content: string): INews {
    this.news.content = content
    return this.news
  }
}
