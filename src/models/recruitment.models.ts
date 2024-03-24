import mongoose, { Schema } from 'mongoose'
import {
  ICandicateInfor,
  IFile,
  IInformationPosition,
  IRecruitmentBlog
} from '~/contract/interfaces/recruitment.interface'

const file = new Schema<IFile>({ url: { type: String } })
const informationPosition = new Schema<IInformationPosition>({
  name: { type: String },
  description: { type: String }
})

const locationSchema = new Schema({
  name: { type: String }
})

const recruitmentBlog = new Schema<IRecruitmentBlog>({
  title: { type: String },
  description: { type: String },
  recruitmentWorkingLocations: [locationSchema]
})

const candicateInfor = new Schema<ICandicateInfor>({
  fisrtName: { type: String },
  lastName: { type: String },
  email: { type: String },
  positionApply: { type: String },
  startDate: { type: String },
  minSalary: { type: String },
  expectedSalary: { type: String },
  file_cv: file
})
export const candicateInforModel = mongoose.model('candicateInforModel', candicateInfor)
export const recruitmentBlogModel = mongoose.model('recruitmentBlogModel', recruitmentBlog)
export const informationPositionModel = mongoose.model('informationPositionModel', informationPosition)
