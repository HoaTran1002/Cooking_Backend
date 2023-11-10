import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { IAccount } from '~/interfaces/account.interface'

const account = new Schema<IAccount>({
  fullName: { type: String },
  birthday: { type: Date },
  address: { type: String },
  gmail: { type: String },
  phoneNumber: { type: String },
  gender: { type: String },
  userName: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'STUDENT' }
})
const saltRounds = 8
account.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds)
  }
  next()
})

export default mongoose.model('AccountModel', account)
