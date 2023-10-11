import { NextFunction, Request, Response } from 'express'
import { ICourse } from '~/interfaces/course.interface'
import { IResonseObject } from '~/interfaces/response.interface'
import { remove } from '~/sevices/course.service'
import { uploadFile } from '~/sevices/drive.service'
export const getAll = async (
  req: Request<unknown, unknown, unknown>,
  res: Response
): Promise<void | IResonseObject> => {
  console.log('success')
  try {
    const a = 10
    remove
  } catch (error) {
    console.log(error)
  }
}

export const courseCreate = async (
  req: Request<unknown, unknown, ICourse>,
  res: Response
): Promise<void | IResonseObject> => {
  console.log(req.body)
  res.json(req.body)
}
export const courseUpFiles = async (
  req: Request<unknown, unknown, ICourse>,
  res: Response
): Promise<void | IResonseObject> => {
  console.log(req.files)
  res.json(req.files)
}
export const courseRoadmap = async (req: Request, res: Response): Promise<void | IResonseObject> => {}
export const courseRemove = async (): Promise<void> => {}
export const courseUpdate = async (): Promise<void> => {}
export const findOneById = async (req: Request, res: Response): Promise<void | IResonseObject> => {}
