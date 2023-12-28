import { SortOrder } from "mongoose"
import { paginationHelpers } from "../../../shared/PaginationHelpers"
import { SearchableFieldsBook } from "../../../shared/SearchableFields"
import { IGenericResponse } from "../../../utilis/pagination.response"
import { IBook, IFilterRequest, IPaginationOptions } from "./book.interface"
import { Book } from "./book.model"

const createBook = async ( userDetails: IBook): Promise<IBook | null> => {
  const newBook = await Book.create(userDetails)
  return newBook
}

const getBook = async (id: string): Promise<IBook | null> => {
  const book = await Book.findOne({ _id: id}).exec()
  return book;
}

const getAll = async (): Promise<IBook | null> => {
  const book = await Book.find({}).sort({ createdAt: -1 }).exec();
  return book;
}


// const createJwt = (email: any): any => {
//   const jwttoken = jwt.sign({ data: email }, config.secret, {
//     expiresIn: 60 * 60,
//   })
//   return jwttoken
// }

const getAllBook = async ( filters: IFilterRequest, paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBook[]>> => {

  const { searchTerm, ...filtersData } = filters
  
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $or: SearchableFieldsBook.map((field: any) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Book.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateBook = async (
  id: string,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id)
  return result
}

export const BookService = {
    createBook,
    getBook,
    getAll,
    getAllBook,
    updateBook,
    deleteBook
}
