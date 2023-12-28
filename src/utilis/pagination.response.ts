// We will get response like this
export type IGenericResponse<T> = {
    meta: {
      page: number
      limit: number
      total: number
    }
    data: T
}