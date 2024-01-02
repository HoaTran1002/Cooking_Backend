import { Request, Response, response } from 'express'
import { ICategory } from '~/interfaces/category.interface'
import { IResonseObject } from '~/interfaces/response.interface'
import Category from '~/models/category.models'
import { remove, addCourse, removeCourse, findById, updateById } from '~/services/category.service'
export const createCategory = async (
  req: Request<any, unknown, ICategory>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const category = await Category.create(req.body.name)
  const response: IResonseObject = {
    message: 'create category success',
    data: category
  }
  return res.status(200).json(response)
}

export const removeCategory = async (
  req: Request<any, unknown, ICategory>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const _id: string = req.params.id
  const category = await remove(_id)
  const response: IResonseObject = {
    message: 'remove category success',
    data: category
  }
  return res.status(200).json(response)
}
export const updateCategory = async (
  req: Request<any, unknown, ICategory>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const _id = req.params.id
  const body = req.body
  const category = await updateById(_id, body)
  const response: IResonseObject = {
    message: 'up date category success',
    data: category
  }
  return res.status(201).json(response)
}
export const addCourseById = async (req: Request, res: Response): Promise<void | Response<IResonseObject>> => {
  const _id = req.params.id
  const _idCourse = req.params.idCourse
  const category = await addCourse(_id, _idCourse)
  const response: IResonseObject = {
    message: 'remove category success',
    data: category
  }
  return res.status(200).json(response)
}
export const removeCourseById = async (
  req: Request<any, unknown, ICategory>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const _id = req.params.id
  const _idCourse = req.params.idCourse
  const category = await removeCourse(_id, _idCourse)
  const response: IResonseObject = {
    message: 'remove category success',
    data: category
  }
  return res.status(200).json(response)
}
export const getAll = async (req: Request, res: Response): Promise<void | Response<IResonseObject>> => {
  const category = await Category.find()
  const response: IResonseObject = {
    message: 'get all success',
    data: category
  }
  return res.status(200).json(response)
}
export const getById = async (
  req: Request<any, unknown, ICategory>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const _id = req.params.id
  const category = await findById(_id)
  const response: IResonseObject = {
    message: 'get all category sucess',
    data: category
  }
  return res.status(200).json(category)
}
