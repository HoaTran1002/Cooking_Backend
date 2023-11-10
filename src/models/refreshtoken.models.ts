import mongoose, { Schema } from 'mongoose'

export interface IRefreshToken {
  token: string
  idUser: string
}
const refreshToken = new Schema<IRefreshToken>({
  token: { type: String, required: true },
  idUser: { type: String, required: true }
})
export default mongoose.model('RefreshToken', refreshToken)
