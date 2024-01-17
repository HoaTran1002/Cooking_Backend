import courseRoutes from '~/routes/course.route'
import categoryRoutes from '~/routes/category.route'
import productRoutes from '~/routes/product.route'
import authRoutes from '~/routes/auth.route'
import accountRoutes from '~/routes/account.route'
// import upload from '~/routes/uploadToS3.route'
import chefRoutes from '~/routes/chef.route'
import informationBusiness from '~/routes/informationBusiness.route'
import newsRoutes from '~/routes/news.route'
import { Express } from 'express'
import { errorHandeler, notFound } from '~/middlewares/error.middlewear'
const useRoutes = (app: Express) => {
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/course', courseRoutes)
  app.use('/api/v1/account', accountRoutes)
  app.use('/api/v1/category', categoryRoutes)
  // app.use('/api/v1/upload', upload)
  app.use('/api/v1/product', productRoutes)
  app.use('/api/v1/informationBusiness', informationBusiness)
  app.use('/api/v1/news', newsRoutes)
  app.use('/api/v1/chef', chefRoutes)
  app.use(errorHandeler)
  app.use(notFound)
}
export default useRoutes
