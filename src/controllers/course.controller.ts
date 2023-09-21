import { remove } from '~/sevices/course.service'
export const getAll = async (): Promise<void> => {
  console.log('success')
  try {
    remove()
  } catch (error) {
    console.log(error)
  }
}
