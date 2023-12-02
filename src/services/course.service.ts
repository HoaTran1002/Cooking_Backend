import Courses from '~/models/course.models'
export const findById = async (id: string) => {
  const fillter = { _id: id }
  const result = await Courses.findOne(fillter)
  return result
}
