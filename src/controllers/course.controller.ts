import { NextFunction } from 'express'
import { IResonseObject } from '~/interfaces/response.interface'
import { remove } from '~/sevices/course.service'
export const getAll = async (): Promise<void> => {
  console.log('success')
  try {
    const a = 10
    remove
  } catch (error) {
    console.log(error)
  }
}

export const findOneById = async (req: Request, res: Response): Promise<void | IResonseObject> => {}
export const courseCreate = async (req: Request, res: Response): Promise<void | IResonseObject> => {}
export const courseRemove = async (): Promise<void> => {}
export const courseUpdate = async (): Promise<void> => {}
