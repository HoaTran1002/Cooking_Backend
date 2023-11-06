import mongoose, { Schema } from 'mongoose'
import { IAccount } from '~/interfaces/account.interface'

export interface IRefreshToken {
  token: string
  user: IAccount
}
const refreshToken = new Schema<IRefreshToken>({
  token: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'AccountModel' }
})
export default mongoose.model('RefreshToken', refreshToken)
