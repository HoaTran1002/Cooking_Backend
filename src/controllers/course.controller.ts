import { remove } from '~/sevices/course.service'
export const getAll = async (): Promise<void> => {
  console.log('success')
  try {
    const a = 10
    remove()
  } catch (error) {
    console.log(error)
  }
}
