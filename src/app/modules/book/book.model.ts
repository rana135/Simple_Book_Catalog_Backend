/* eslint-disable no-console */
import { Schema, model } from "mongoose"
import { IBook } from "./book.interface"
 
const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
) 
export const Book = model<IBook>('Book', bookSchema)
