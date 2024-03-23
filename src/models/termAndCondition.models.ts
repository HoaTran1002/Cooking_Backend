import { Schema } from 'mongoose'
import { ITermAndCondition } from '~/contract/interfaces/termAndCondition.interface'

const termAndCondition = new Schema<ITermAndCondition>({
  title: { type: String },
  description: { type: String },
  dateUpdate: { type: String },
  content: { type: String }
})
