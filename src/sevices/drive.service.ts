import { Request, Response } from 'express'
import { drive } from '~/config/cloud/google.cloud'
import multer from 'multer'

interface IRequestBody {
  name: string
  fields: string
}
interface IMedia {
  mimeType: string
  body: NodeJS.ReadStream
}
export const uploadFile = async (req: Request, res: Response) => {
  const createFile = await drive.files.create()
}
export const uploadFiles = () => {}
export const deleteFile = () => {}
export const deleteFiles = () => {}
