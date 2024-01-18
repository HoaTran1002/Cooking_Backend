import { Request, Response, response } from 'express'
import { ICategory } from '~/interfaces/category.interface'
import { IResonseObject } from '~/interfaces/response.interface'
import Category from '~/models/category.models'
import { remove, addCourse, removeCourse, findById, updateById } from '~/services/category.service'
import { courseFindById } from '~/services/course.service'
export const createCategory = async (req: Request, res: Response): Promise<void | Response<IResonseObject>> => {
  const idCourse = req.params.idCourse
  console.log(idCourse)
  if (!idCourse) {
    return res.status(400).json({ message: 'could not found idCourse' })
  }
  const course = await courseFindById(idCourse)
  if (!course) {
    return res.status(404).json({ message: 'could not found Course' })
  }
  const categoryInfor: ICategory = {
    name: req.body.name!,
    idCourse: req.params.idCourse,
    listTimeLearning: req.body.listTimeLearning
  }
  const category = await Category.create(categoryInfor)
  const response: IResonseObject = {
    message: 'create category success',
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
  if (!_id) {
    return res.status(400).json({ message: 'could not found idCategory' })
  }
  const category = await findById(_id)
  if (!category) {
    return res.status(404).json({ message: 'could not found category' })
  }
  const newCategory = await updateById(_id, body)
  const response: IResonseObject = {
    message: 'up date category success',
    data: newCategory
  }
  return res.status(201).json(response)
}
export const removeCategory = async (
  req: Request<any, unknown, ICategory>,
  res: Response
): Promise<void | Response<IResonseObject>> => {
  const _id: string = req.params.id
  if (!_id) {
    return res.status(400).json({ message: 'could not exist  id' })
  }
  const category = await findById(_id)
  if (!category) {
    return res.status(404).json({ message: 'could not found category' })
  }
  await remove(_id)
  const response: IResonseObject = {
    message: 'remove category success'
  }
  return res.status(200).json(response)
}
export const getAll = async (req: Request, res: Response): Promise<void | Response<IResonseObject>> => {
  const category = await Category.find()

  if (!category) {
    return res.status(404).json({ message: 'could not found category' })
  }
  const response: IResonseObject = {
    message: 'get all success',
    data: category
  }
  return res.status(200).json(response)
}
export const getAllByCourseId = async (req: Request, res: Response): Promise<void | Response<IResonseObject>> => {
  const idCourse = req.params.idCourse
  console.log(idCourse)
  if (!idCourse) {
    return res.status(400).json({ message: 'could not found idCourse' })
  }
  const course = await courseFindById(idCourse)
  if (!course) {
    return res.status(404).json({ message: 'could not found Course' })
  }
  const category = await Category.find({ idCourse })
  if (!category) {
    return res.status(404).json({ message: 'could not found category' })
  }
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
  if (!_id) {
    return res.status(400).json({ message: 'could not exist  id' })
  }
  if (!category) {
    return res.status(404).json({ message: 'could not found category' })
  }
  const response: IResonseObject = {
    message: 'get all category sucess',
    data: category
  }
  return res.status(200).json(response)
}

// export const addCourseById = async (req: Request, res: Response): Promise<void | Response<IResonseObject>> => {
//   const _id = req.params.id
//   const _idCourse = req.params.idCourse
//   const category = await addCourse(_id, _idCourse)
//   const response: IResonseObject = {
//     message: 'remove category success',
//     data: category
//   }
//   return res.status(200).json(response)
// }
// export const removeCourseById = async (
//   req: Request<any, unknown, ICategory>,
//   res: Response
// ): Promise<void | Response<IResonseObject>> => {
//   const _id = req.params.id
//   const _idCourse = req.params.idCourse
//   const category = await removeCourse(_id, _idCourse)
//   const response: IResonseObject = {
//     message: 'remove category success',
//     data: category
//   }
//   return res.status(200).json(response)
// }
