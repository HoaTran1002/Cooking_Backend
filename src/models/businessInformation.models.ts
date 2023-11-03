import mongoose, { Schema } from 'mongoose'
import { IInformationBusiness } from '~/interfaces/businessInfrormation.interface'

const informationBusiness = new Schema<IInformationBusiness>({
  name: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  email: { type: String },
  domain: { type: String },
  slogan: { type: String },
  logo: { type: String },
  story: { type: String },
  achievement: [
    {
      time: { type: Date },
      items: [{ item: { type: String } }]
    }
  ],
  relatedInformation: [
    {
      image: { type: String },
      content: { type: String }
    }
  ]
})

export default mongoose.model('InformationBusinessModel', informationBusiness)
