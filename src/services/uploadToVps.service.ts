import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { env } from '~/config/env.config'
import { s3 } from '~/config/s3.config'
import crypto from 'crypto'
import { IImage, IVideo } from '~/contract/interfaces/course.interface'
import * as fs from 'node:fs'
import path from 'node:path'
export const uploadImageVPS = async (file: Express.Multer.File): Promise<IImage> => {
  const randomImageName = () => crypto.randomBytes(16).toString('hex')
  const imageName: string = randomImageName()
  console.log(imageName)
  console.log(file)
  const command = new PutObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: imageName,
    Body: file.buffer,
    ContentType: 'image/jpg'
  })
  await s3.send(command)
  const commandGetUrl = new GetObjectCommand({ Bucket: env.AWS_BUCKET_NAME, Key: imageName })
  const url = await getSignedUrl(s3, commandGetUrl)
  const objectImage: IImage = { url: url, key: imageName }
  return objectImage
}
export const PutImageVPS = async (file: Express.Multer.File, image: IImage): Promise<IImage> => {
  console.log('image key:', image.key)
  const command = new PutObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: image.key,
    Body: file.buffer,
    ContentType: 'image/jpg'
  })
  await s3.send(command)
  const objectImage: IImage = { url: image.url, key: image.key }
  return objectImage
}
export const getImageVPS = async (objectKey: string): Promise<any> => {
  const command = new GetObjectCommand({ Bucket: env.AWS_BUCKET_NAME, Key: objectKey })
  const result = await getSignedUrl(s3, command)
  return result
}

export const deleteImageVPS = async (objectKey: string): Promise<any> => {
  const command = new DeleteObjectCommand({ Bucket: env.AWS_BUCKET_NAME, Key: objectKey })
  const result = await s3.send(command)
  return result
}

export const deleteVideoVPS = async (objectKey: string): Promise<any> => {
  const command = new DeleteObjectCommand({ Bucket: env.AWS_BUCKET_NAME, Key: objectKey })
  const result = await s3.send(command)
  return result
}

export const getVideoVPS = async (objectKey: string): Promise<any> => {
  const command = new GetObjectCommand({ Bucket: env.AWS_BUCKET_NAME, Key: objectKey })
  const result = await getSignedUrl(s3, command)
  return result
}

// export const uploadVideoVPS = async (file: Express.Multer.File): Promise<IVideo> => {
//   const randomVideoName = () => crypto.randomBytes(16).toString('hex')
//   const VideoName: string = randomVideoName()
//   const command = new PutObjectCommand({
//     Bucket: env.AWS_BUCKET_NAME,
//     Key: VideoName,
//     Body: file.buffer,
//     ContentType: 'video/mp4'
//   })
//   console.log('pedding')
//   await s3.send(command)
//   const commandGetUrl = new GetObjectCommand({ Bucket: env.AWS_BUCKET_NAME, Key: VideoName })
//   const url = await getSignedUrl(s3, commandGetUrl)
//   console.log('success')
//   const objectVideo: IVideo = { url: url, key: VideoName }
//   return objectVideo
// }
