import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { env } from '~/config/env.config'
import { s3 } from '~/config/s3.config'
import crypto from 'crypto'

export const uploadImageS3 = async (file: Express.Multer.File): Promise<string> => {
  const randomImageName = () => crypto.randomBytes(16).toString('hex')
  const command = new PutObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: randomImageName(),
    Body: file.buffer,
    ContentType: 'image/jpg'
  })
  await s3.send(command)
  const commandGetUrl = new GetObjectCommand({ Bucket: env.AWS_BUCKET_NAME, Key: file.originalname })
  const url = await getSignedUrl(s3, commandGetUrl, { expiresIn: 360 })
  return url
}
export const getImageS3 = async (objectKey: string): Promise<any> => {
  const command = new GetObjectCommand({ Bucket: env.AWS_BUCKET_NAME, Key: objectKey })
  const result = await getSignedUrl(s3, command, { expiresIn: 3600 })
  return result
}
export const deleteImageS3 = async (objectKey: string): Promise<any> => {
  const command = new DeleteObjectCommand({ Bucket: env.AWS_BUCKET_NAME, Key: objectKey })
  const result = await s3.send(command)
  console.log(result)
  return result
}
