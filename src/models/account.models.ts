import mongoose, { Schema } from 'mongoose'
interface IAccount {
  userName?: string
  passWord?: string
  email?: string
  address?: string
  role?: string
}
const account = new Schema<IAccount>({
  userName: { type: String, required: 'không bỏ trống' },
  passWord: { type: String, required: 'không bỏ trống' },
  email: { type: String, required: 'không bỏ trống' },
  address: [{ type: String }],
  role: { type: String, required: 'không bỏ trống' }
})
export default mongoose.model('AccountModel', account)
