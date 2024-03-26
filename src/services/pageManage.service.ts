import PageRepository from '~/repositories/pageManage.repository'
import { IResponseErrorObject } from '~/contract/interfaces/response.interface'
import PaginationResult from '~/contract/interfaces/pagination.interface'
import { IImage } from '~/contract/interfaces/course.interface'
import { deleteFile, updateFileContent } from './file.service'
import { IPageManager } from '~/contract/interfaces/pageManager.interface'

class PagaManageService implements IPageManager {
  name: string
  baner: IImage
  constructor(payload?: IPageManager) {
    if (payload) {
      this.name = payload.name
      this.baner = payload.baner
    } else {
      this.name = ''
      this.baner = {} as IImage
    }
  }

  async create(path?: string): Promise<IPageManager> {
    try {
      if (path) {
        this.baner.url = path
      }
      const body: IPageManager = {
        name: this.name,
        baner: this.baner
      }
      const partner = await PageRepository.create(body)
      return partner
    } catch (error: any) {
      if (path) {
        await deleteFile(path)
      }
      throw new IResponseErrorObject(error, 404)
    }
  }
  async getAll(page: number, size: number): Promise<[PaginationResult] | any> {
    const limit = size
    const skip = (page - 1) * size
    const data = await PageRepository.getAll(limit, skip)
    const total_documents = await PageRepository.Model.countDocuments()
    const total_pages = Math.ceil(total_documents / size)
    const previous_pages = page > 1 ? page - 1 : null
    const next_pages = skip + size < total_documents ? page + 1 : null
    return { page, size, data, total_pages, previous_pages, next_pages }
  }
  async getById(id: string): Promise<IPageManager> {
    try {
      const partner = await PageRepository.getById(id)
      return partner
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async deleteById(id: string): Promise<any> {
    try {
      const partner = await PageRepository.deleteById(id)
      return partner
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async updateById(id: string, file?: Express.Multer.File): Promise<IPageManager> {
    try {
      const existed = await this.getById(id)
      if (!existed) {
        if (file?.path) {
          await deleteFile(file?.path)
        }
        throw new IResponseErrorObject('not found by id', 404)
      }
      const payload: IPageManager = {
        name: this.name,
        baner: this.baner
      }
      if (file && this.baner.url) {
        await updateFileContent(file, this.baner.url)
      } else if (file) {
        this.baner.url = file.path
      }
      const partner = await PageRepository.update(id, payload)
      return partner
    } catch (error: any) {
      if (file?.path) {
        await deleteFile(file?.path)
      }
      throw new IResponseErrorObject(error, 404)
    }
  }
}
export default PagaManageService
