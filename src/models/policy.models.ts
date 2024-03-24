import mongoose, { Schema } from 'mongoose'
import { IPolicy } from '~/contract/interfaces/policy.interface'

const policy = new Schema<IPolicy>({
  title: { type: String },
  description: { type: String },
  content: { type: String }
})
export default mongoose.model('policyModel', policy)
