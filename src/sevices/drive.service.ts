import { Request, Response } from 'express'
import { drive } from '~/config/cloud/google.cloud'
import multer, { ErrorCode } from 'multer'
import fs from 'fs'
interface IMedia {
  mimeType: string
  body: fs.ReadStream
}
interface IRequestBody {
  name: string
  fields: string
}
interface IMetaData {
  name: string
  mimeType: string
}
export interface IFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}
export interface IFileResponseObject {
  id: string
  mimeType: string
}
export const uploadFileToDrive = async (file: IFile): Promise<IFileResponseObject> => {
  const requestBody: IRequestBody = {
    name: file.originalname,
    fields: 'id,mimeType'
  }
  const media: IMedia = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.destination + '/' + file.originalname)
  }
  try {
    const file = await drive.files.create({
      requestBody,
      media: media
    })
    const response: IFileResponseObject = {
      id: file?.data?.id || 'null',
      mimeType: file?.data?.mimeType || 'null'
    }

    return response
  } catch (error: any) {
    throw new Error(error)
  }
}
//export const uploadFiles = () => {}
export const deleteFile = () => {}
export const deleteFiles = () => {}
