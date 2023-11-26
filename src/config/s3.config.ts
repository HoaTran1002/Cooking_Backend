import { S3Client } from '@aws-sdk/client-s3'
import { env } from '~/config/env.config'

export const s3: S3Client = new S3Client({
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: env.AWS_BUCKET_ACCESS_KEY,
    secretAccessKey: env.AWS_BUCKET_SECRET_KEY
  }
})
