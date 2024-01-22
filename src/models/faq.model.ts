import mongoose, { Schema } from 'mongoose'
import { IFaq } from '~/interfaces/faq.interface'

const faqs = new Schema<IFaq>({
  question: { type: String, required: true },
  answer: { type: String, required: true }
})
export default mongoose.model('faqModels', faqs)
