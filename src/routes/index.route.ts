import { errorHandeler, notFound } from '~/middlewares/error.middlewear'
import informationBusiness from '~/routes/informationBusiness.route'
import categoryRoutes from '~/routes/category.route'
import customerRoutes from '~/routes/customer.route'
import productRoutes from '~/routes/product.route'
import partnerRoutes from '~/routes/partner.route'
import courseRoutes from '~/routes/course.route'
import chefRoutes from '~/routes/chef.route'
import tourRoutes from '~/routes/tour.route'
import authRoutes from '~/routes/auth.route'
import newsRoutes from '~/routes/news.route'
import faqRoutes from '~/routes/faq.route'
import { Express } from 'express'
// import accountRoutes from '~/routes/account.route'
// import upload from '~/routes/uploadToS3.route'

const useRoutes = (app: Express) => {
  app.use('/api/v1/informationBusiness', informationBusiness)
  app.use('/api/v1/category', categoryRoutes)
  app.use('/api/v1/customer', customerRoutes)
  app.use('/api/v1/product', productRoutes)
  app.use('/api/v1/partner', partnerRoutes)
  app.use('/api/v1/course', courseRoutes)
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/tour', tourRoutes)
  app.use('/api/v1/news', newsRoutes)
  app.use('/api/v1/chef', chefRoutes)
  app.use('/api/v1/faq', faqRoutes)
  // app.use('/api/v1/account', accountRoutes)
  // app.use('/api/v1/upload', upload)
  app.use(errorHandeler)
  app.use(notFound)
}
export default useRoutes
