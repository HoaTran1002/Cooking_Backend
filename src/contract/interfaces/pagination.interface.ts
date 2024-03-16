export default interface PaginationResult {
  page: number
  size: number
  data: any[]
  total_pages: number
  previous: number | null
  next: number | null
}
