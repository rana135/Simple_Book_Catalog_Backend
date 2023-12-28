import { SortOrder } from 'mongoose'

type IOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}

type IoptionResult = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
}

const calculatePagination = (option: IOptions): IoptionResult => {
  const page = Number(option.page || 1)
  const limit = Number(option.limit || 10)

  const skip = (page - 1) * limit

  const sortBy = option.sortBy || 'createAt'
  const sortOrder = option.sortOrder || 'asc'

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  }
}

export const paginationHelpers = {
  calculatePagination,
}
