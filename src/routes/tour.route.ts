import { Router } from 'express'
import { uploadDisk, uploadMemory } from '~/config/multer.config'

import tourController from '~/controllers/tour.controller'

import { ITourOverView } from '~/interfaces/tour.interface'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validateBody } from '~/middlewares/validate.middlewear'
import { tourValidator, tourValidatorPramsIdProduct } from '~/validator/tour.validate'

const route = Router()
route.post(
  '/create/product/:id',
  authorize(['ADMIN']),
  validateBody<ITourOverView>(tourValidator),
  validateBody<ITourOverView>(tourValidatorPramsIdProduct),
  uploadDisk.single('file'),
  asyncHandelError(tourController.createTour)
)
route.put(
  '/:id/update',
  authorize(['ADMIN']),
  validateBody<ITourOverView>(tourValidator),
  uploadMemory.single('file'),
  asyncHandelError(tourController.editTour)
)
route.delete('/:id/delete', authorize(['ADMIN']), asyncHandelError(tourController.deleteTour))
route.get('/:id/getTour', asyncHandelError(tourController.getTourById))
route.get('/getTours', asyncHandelError(tourController.getTours))
route.get('/pagination/:page/:size', asyncHandelError(tourController.paginationTour))
route.put(
  '/:id/updateContentImage',
  authorize(['ADMIN']),
  uploadMemory.single('file'),
  asyncHandelError(tourController.updateContentImageVPS)
)
export default route
