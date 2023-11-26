import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { env } from '~/config/env.config'
import { s3 } from '~/config/s3.config'

export const uploadImageS3 = async (file: Express.Multer.File) => {
  const command = new PutObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: file.originalname || 'unknow',
    Body: file.buffer,
    ContentType: 'image/jpg'
  })
  const result = await s3.send(command)
  const commandGetUrl = new GetObjectCommand({ Bucket: env.AWS_BUCKET_NAME, Key: file.originalname })
  const url = await getSignedUrl(s3, commandGetUrl, { expiresIn: 360 })
  console.log(url)
  return result
}
export const getImageS3 = async (objectKey: string): Promise<any> => {
  const command = new GetObjectCommand({ Bucket: env.AWS_BUCKET_NAME, Key: objectKey })
  const result = await getSignedUrl(s3, command, { expiresIn: 3600 })
  console.log(result)
  return result
}
export const deleteImageS3 = async (objectKey: string): Promise<any> => {
  const command = new DeleteObjectCommand({ Bucket: env.AWS_BUCKET_NAME, Key: objectKey })
  const result = await s3.send(command)
  console.log(result)
  return result
}
