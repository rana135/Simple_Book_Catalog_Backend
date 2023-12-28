// books type mentioned
export type IBook = {
    title: string
    author: string
    genre: string
    year: number 
}

//filter test will string
export type IFilterRequest = {
    searchTerm?: string
}

// pagination options
export type IPaginationOptions = {
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}