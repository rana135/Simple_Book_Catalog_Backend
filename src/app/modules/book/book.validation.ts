import { z } from 'zod'

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    year: z.number().optional(),
  }),
})
export const bookValidation = {
    createBookZodSchema,
} 