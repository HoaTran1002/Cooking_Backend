import courseRoutes from '~/routes/course.route'
import categoryRoutes from '~/routes/category.route'
import authRoutes from '~/routes/auth.route'
import accountRoutes from '~/routes/account.route'
import upload from '~/routes/upload.route'
import informationBusiness from '~/routes/informationBusiness.route'

import { Express } from 'express'
import { errorHandeler, notFound } from '~/middlewares/error.middlewear'
const useRoutes = async (app: Express): Promise<void> => {
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/course', courseRoutes)
  app.use('/api/v1/account', accountRoutes)
  app.use('/api/v1/category', categoryRoutes)
  app.use('/api/v1/upload', upload)
  app.use('/api/v1/informationBusiness', informationBusiness)
  app.use(errorHandeler)
  app.use(notFound)
}
export default useRoutes
