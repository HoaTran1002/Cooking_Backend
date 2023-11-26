import { Request } from 'express'
import multer, { Multer } from 'multer'

export const uploadMemory = multer({
  storage: multer.memoryStorage()
})

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, './src/upload')
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, file.originalname)
  }
})

export const uploadDisk: Multer = multer({
  storage: storage
})
