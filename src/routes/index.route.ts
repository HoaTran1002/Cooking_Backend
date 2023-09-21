import courseRoutes from '~/routes/course.route'
import { Express } from 'express'
const useRoutes = async (app: Express): Promise<void> => {
  app.use('/api/v1/course', courseRoutes)
}
export default useRoutes
