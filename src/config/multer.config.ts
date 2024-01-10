import { Request } from 'express'
import multer, { Multer } from 'multer'

import { env } from './env.config'

import crypto from 'crypto'

export const uploadMemory = multer({
  storage: multer.memoryStorage()
})

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, env.PATH_DATA_FILE)
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const randomImageName = () => crypto.randomBytes(16).toString('hex')
    const imageName: string = randomImageName()
    cb(null, imageName + file.originalname)
  }
})

export const uploadDisk: Multer = multer({
  storage: storage
})
