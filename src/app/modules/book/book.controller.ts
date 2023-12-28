import { Request, RequestHandler, Response } from "express"
import catchAsync from "../../middlewares/catchAsync"
import { BookService } from "./book.service"
import httpStatus  from 'http-status';
import sendResponse from "../../middlewares/sendResponse";
import { IBook } from "./book.interface";
import pick from "../../../utilis/pick";
import { SearchableFieldsBook, paginationFieldsBook } from "../../../shared/SearchableFields";



const createBook: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const { ...bookData } = req.body  
      const result = await BookService.createBook(bookData)
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book created successfully',
        data: result,
      })
    },
  )
  
  const getBook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await BookService.getBook(id)
  
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book information Retrived Successfully',
      data: result,
    })
  })
  
  const getAll = catchAsync(async (req: Request, res: Response) => {
    
    const result = await BookService.getAll()
  
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ALL Book information Retrived Successfully',
      data: result,
    })
  })

  const getAllBooks = catchAsync(async (req: Request, res: Response) => {
    
    const filters = pick(req.query, SearchableFieldsBook) 
    const paginationOptions = pick(req.query, paginationFieldsBook)
  
    const result = await BookService.getAllBook(filters, paginationOptions)
  
    sendResponse<IBook[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Book Retrived Successfully',
      meta: result.meta,
      data: result.data,
    })
  })

  const updateBook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const updatedData = req.body
    const result = await BookService.updateBook(id, updatedData)
  
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book Data updated Successfully',
      data: result,
    })
  })
  
  const deleteBook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await BookService.deleteBook(id)
  
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Book Successfully',
      data: result,
    })
  })
  

  export const BookController = {
    createBook,
    getBook,
    getAllBooks,
    updateBook,
    deleteBook,getAll
  }