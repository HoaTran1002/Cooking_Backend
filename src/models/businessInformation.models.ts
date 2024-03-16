import mongoose, { Schema } from 'mongoose'
import { IInformationBusiness } from '~/contract/interfaces/businessInfrormation.interface'
import { imageSchema } from './course.models'

const informationBusiness = new Schema<IInformationBusiness>({
  name: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  email: { type: String },
  domain: { type: String },
  slogan: { type: String },
  logo: imageSchema,
  story: { type: String },
  achievement: [
    {
      time: { type: Date },
      items: [{ item: { type: String } }]
    }
  ],
  relatedInformation: [
    {
      image: imageSchema,
      content: { type: String }
    }
  ]
})

export default mongoose.model('InformationBusinessModel', informationBusiness)
