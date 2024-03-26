import { IResponseErrorObject } from '~/contract/interfaces/response.interface'
import PaginationResult from '~/contract/interfaces/pagination.interface'
import { ICandicateInfor, IFile } from '~/contract/interfaces/recruitment.interface'
import { IImage } from '~/contract/interfaces/course.interface'
import CandicateInRepository from '~/repositories/candicateInfor.repository'
import { deleteFile, updateFileContent } from './file.service'

class CadicateInfor implements ICandicateInfor {
  fisrtName: string
  lastName: string
  email: string
  positionApply: string
  startDate: string
  minSalary: string
  expectedSalary: string
  file_cv: IFile

  constructor(payload?: ICandicateInfor) {
    if (payload) {
      this.fisrtName = payload.fisrtName
      this.lastName = payload.lastName
      this.email = payload.email
      this.positionApply = payload.positionApply
      this.startDate = payload.startDate
      this.minSalary = payload.minSalary
      this.expectedSalary = payload.expectedSalary
      this.file_cv = payload.file_cv
    } else {
      ;(this.fisrtName = ''),
        (this.lastName = ''),
        (this.email = ''),
        (this.positionApply = ''),
        (this.startDate = ''),
        (this.minSalary = ''),
        (this.expectedSalary = ''),
        (this.file_cv = {} as unknown as IFile)
    }
  }

  async create(path?: string): Promise<ICandicateInfor> {
    try {
      if (path) {
        this.file_cv.url = path
      }
      const body: ICandicateInfor = {
        fisrtName: this.fisrtName,
        lastName: this.lastName,
        email: this.email,
        positionApply: this.positionApply,
        startDate: this.startDate,
        minSalary: this.minSalary,
        expectedSalary: this.expectedSalary,
        file_cv: this.file_cv
      }
      const customerBlog = await CandicateInRepository.create(body)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async getAll(page: number, size: number): Promise<[PaginationResult] | any> {
    const limit = size
    const skip = (page - 1) * size
    const data = await CandicateInRepository.getAll(limit, skip)
    const total_documents = await CandicateInRepository.Model.countDocuments()
    const total_pages = Math.ceil(total_documents / size)
    const previous_pages = page > 1 ? page - 1 : null
    const next_pages = skip + size < total_documents ? page + 1 : null
    return { page, size, data, total_pages, previous_pages, next_pages }
  }
  async getById(id: string): Promise<ICandicateInfor> {
    try {
      const customerBlog = await CandicateInRepository.getById(id)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async deleteById(id: string): Promise<any> {
    try {
      const customerBlog = await CandicateInRepository.deleteById(id)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
  async updateById(id: string, file?: Express.Multer.File): Promise<ICandicateInfor> {
    try {
      const existed = await this.getById(id)
      if (!existed) {
        if (file?.path) {
          await deleteFile(file?.path)
        }
        throw new IResponseErrorObject('not found by id', 404)
      }
      const body: ICandicateInfor = {
        fisrtName: this.fisrtName,
        lastName: this.lastName,
        email: this.email,
        positionApply: this.positionApply,
        startDate: this.startDate,
        minSalary: this.minSalary,
        expectedSalary: this.expectedSalary,
        file_cv: this.file_cv
      }
      if (file && this.file_cv.url) {
        await updateFileContent(file, this.file_cv.url)
      } else if (file) {
        this.file_cv.url = file.path
      }
      const customerBlog = await CandicateInRepository.update(id, body)
      return customerBlog
    } catch (error: any) {
      throw new IResponseErrorObject(error, 404)
    }
  }
}
export default CadicateInfor
