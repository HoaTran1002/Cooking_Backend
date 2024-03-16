import { Request, Response } from 'express'
import { IFaq } from '~/contract/interfaces/faq.interface'
import { IResponseErrorObject, IResponseSuccessObject } from '~/contract/interfaces/response.interface'
import { ITourOverView } from '~/contract/interfaces/tour.interface'
import { ServicesFactory } from '~/services/factory.service'
import { deleteFile, updateFileContent } from '~/services/file.service'

class TourController {
  createTour = async (
    req: Request<any, unknown, ITourOverView>,
    res: Response
  ): Promise<Response<IResponseSuccessObject>> => {
    const idProduct = req.params.idProduct
    const body = req.body
    const file = req.file
    try {
      if (!file) {
        return res.status(400).json({ message: 'file not found' })
      }

      if (!idProduct) {
        throw new IResponseErrorObject('not found idProduct.', 404)
      }

      const tour: ITourOverView = {
        idProduct: idProduct,
        activityName: body.activityName,
        activityContent: body.activityContent,
        startTime: body.startTime,
        endTime: body.endTime,
        activityImages: { url: file.path, key: '' }
      }

      const response = new IResponseSuccessObject(
        'Create TourOverView success',
        await ServicesFactory.createData('Tour', tour),
        200
      )
      return res.status(200).json(response)
    } catch (error: any) {
      await deleteFile(file!.path)
      throw new Error(error.message)
    }
  }
  editTour = async (
    req: Request<any, unknown, ITourOverView>,
    res: Response
  ): Promise<Response<IResponseSuccessObject>> => {
    console.log(req.body)
    const response = new IResponseSuccessObject(
      'Update Tour success',
      await ServicesFactory.editData(req.params.id, 'Tour', req.body),
      200
    )
    return res.status(200).json(response)
  }
  deleteTour = async (
    req: Request<any, unknown, ITourOverView>,
    res: Response
  ): Promise<Response<IResponseSuccessObject>> => {
    const response = new IResponseSuccessObject(
      'delete FAQ success',
      await ServicesFactory.deleteData(req.params.id, 'Tour'),
      200
    )
    return res.status(200).json(response)
  }
  getTourById = async (
    req: Request<any, unknown, ITourOverView>,
    res: Response
  ): Promise<Response<IResponseSuccessObject>> => {
    const response = new IResponseSuccessObject(
      'get Tour success',
      await ServicesFactory.getById(req.params.id, 'Tour'),
      200
    )
    return res.status(200).json(response)
  }
  getTours = async (req: Request, res: Response): Promise<Response<IResponseSuccessObject>> => {
    const response = new IResponseSuccessObject('get Tour success', await ServicesFactory.getAllData('Tour'), 200)
    return res.status(200).json(response)
  }
  paginationTour = async (
    req: Request<any, unknown, IFaq>,
    res: Response
  ): Promise<Response<IResponseSuccessObject>> => {
    const response = new IResponseSuccessObject(
      'get FAQ success',
      await ServicesFactory.pagination(req.params.page, req.params.size, 'Tour'),
      200
    )
    return res.status(200).json(response)
  }
  updateContentImageVPS = async (req: Request, res: Response): Promise<Response<IResponseSuccessObject>> => {
    const fileUpload = req.file
    try {
      const id = req.params.id
      if (!id) {
        return res.status(400).json({ message: 'not found id prams' })
      }
      const tour = (await ServicesFactory.getById(req.params.id, 'Tour')) as ITourOverView
      if (tour == null) {
        return res.status(400).json({ message: 'cannot found any tour' })
      } else {
        if (!tour.activityImages) {
          return res.status(404).json({ mesage: 'not found image' })
        }
        if (!fileUpload) {
          return res.status(400).send('Không có file được tải lên.')
        }

        await updateFileContent(fileUpload, tour.activityImages.url)
        const response = new IResponseSuccessObject('File has been updated successfully', 200)
        return res.status(200).json(response)
      }
    } catch (error: any) {
      await deleteFile(fileUpload!.path)
      throw new Error(error)
    }
  }
}
const tourController = new TourController()
export default tourController
