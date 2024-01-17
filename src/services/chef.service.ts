import chefModels from '~/models/chef.models'
import PaginationResult from '~/repositories/news.respository'

export const findAll = async (page: number, size: number): Promise<PaginationResult> => {
  const limit = size
  const skip = (page - 1) * size
  const data = await chefModels.find().limit(limit).skip(skip)
  const total_documents = await chefModels.countDocuments()
  const total_pages = Math.ceil(total_documents / size)
  const previous_pages = page > 1 ? page - 1 : null
  const next_pages = skip + size < total_documents ? page + 1 : null
  return {
    page,
    size,
    data,
    total_pages,
    previous: previous_pages,
    next: next_pages
  }
}
