import mongoose, { Schema } from 'mongoose'
import { IPartner, IPartnerProduct } from '~/contract/interfaces/partner.interface'
import { imageSchema } from './product.models'
const partnerProduct = new Schema<IPartnerProduct>({
  name: { type: String },
  image: { type: imageSchema, default: {} },
  description: { type: String },
  position: { type: Number, default: 0 }
})
const partner = new Schema<IPartner>({
  name: { type: String },
  logo: { type: imageSchema, default: {} },
  description: { type: String },
  position: { type: Number, default: 0 },
  products: { type: [partnerProduct], default: [] }
})
export default mongoose.model('partnerModel', partner)
