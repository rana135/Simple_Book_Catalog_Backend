import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BookController } from './book.controller'
import { bookValidation } from './book.validation'
const router = express.Router()

router.post(
  '/',
  validateRequest(bookValidation.createBookZodSchema),
  BookController.createBook,
)
router.get('/getall', BookController.getAll)


router.get('/:id', BookController.getBook)
router.get('/', BookController.getAllBooks)
router.patch('/:id', BookController.updateBook)
router.delete('/:id', BookController.deleteBook)


export const BookRoutes = router
