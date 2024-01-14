import { ICategory } from '~/interfaces/category.interface'
import Category from '~/models/category.models'

export const remove = async (_id: string): Promise<void | ICategory | unknown> => {
  const fillter = { _id: _id }
  const options = { new: true }
  const category = await Category.findOneAndDelete(fillter, options)
  return category
}
export const addCourse = async (_id: string, _idCourse: string): Promise<void | ICategory | unknown> => {
  const fillter = { _id: _id }
  const update = { $push: { _idCourses: { idCourse: _idCourse } } }
  const options = { new: true }
  const category = await Category.updateOne(fillter, update)
  return category
}
export const removeCourse = async (_id: string, _idCourse: string): Promise<void | ICategory | unknown> => {
  const fillter = { _id: _id }
  const update = {
    $pull: {
      _idCourses: { idCourse: _idCourse }
    }
  }
  const options = { new: true }
  const category = await Category.updateOne(fillter, update, options)
  return category
}
export const updateById = async (_id: string, body: ICategory): Promise<void | ICategory | unknown> => {
  const fillter = { _id: _id }
  const update = {
    body
  }
  const options = {
    new: true
  }
  const category = await Category.findOneAndUpdate(fillter, update, options)
  return category
}
export const findById = async (_id: string): Promise<void | ICategory | unknown> => {
  const category = Category.findById(_id)
  return category
}
