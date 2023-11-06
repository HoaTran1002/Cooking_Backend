import courseRoutes from '~/routes/course.route'
import categoryRoutes from '~/routes/category.route'
import informationBusiness from '~/routes/informationBusiness.route'
import { Express } from 'express'
import { errorHandeler, notFound } from '~/middlewares/error.middlewear'
const useRoutes = async (app: Express): Promise<void> => {
  app.use('/api/v1/course', courseRoutes)
  app.use('/api/v1/category', categoryRoutes)
  app.use('/api/v1/informationBusiness', informationBusiness)
  app.use(errorHandeler)
  app.use(notFound)
}
export default useRoutes
