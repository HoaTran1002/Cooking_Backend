import courseRoutes from '~/routes/course.route'
import { Express } from 'express'
import { errorHandeler, notFound } from '~/middlewares/error.middlewear'
const useRoutes = async (app: Express): Promise<void> => {
  app.use('/api/v1/course', courseRoutes)
  app.use(errorHandeler)
  app.use(notFound)
}
export default useRoutes
