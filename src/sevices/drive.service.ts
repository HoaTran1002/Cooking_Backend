import { Request, Response } from 'express'
import { drive } from '~/config/cloud/google.cloud'
import multer from 'multer'
import fs from 'fs'
interface IMedia {
  mimeType: string
  body: fs.ReadStream
}
interface IMetaData {
  name: string
  mimeType: string
}

export const uploadFile = async (req: Request, res: Response) => {
  const fileReq = req.file
  console.log('uploaddata:', req.body)
  if (fileReq) {
    const media: IMedia = {
      mimeType: fileReq.mimetype,
      body: fs.createReadStream(fileReq.destination + '/' + fileReq.originalname)
    }
    const fileMetadata: IMetaData = {
      name: fileReq.originalname.substring(0, fileReq.originalname.lastIndexOf('.')),
      mimeType: fileReq.destination + '/' + fileReq.originalname
    }
    try {
      await fs.promises.rename(
        fileReq.destination + '/' + fileReq.filename,
        fileReq.destination + '/' + fileReq.originalname
      )
      const response = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id'
      })
      return response.data
    } catch (error) {
      console.error('Error uploading file:', error)
      res.status(500).json({ error: 'An error occurred while uploading the file' })
    }
  }
  res.status(401).json({ error: 'null' })
}
export const uploadFiles = () => {}
export const deleteFile = () => {}
export const deleteFiles = () => {}
