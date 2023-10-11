import { Request } from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => {
    console.log('create destination')
    return callback(null, './src/upload') // Change the destination directory if needed
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    console.log('create file name:', file.stream)
    return cb(null, file.originalname)
  }
})

export const upload = multer({ storage: storage })
