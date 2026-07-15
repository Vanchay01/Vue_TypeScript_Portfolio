

export interface apiResponse<T> {
    message: string,
    status: boolean,
    data: T
}

export interface ResponsePagination<T>{
    pagination: {
        total: number,
        page: number,
        limit: number,
        totalPage: number,
    }
    data: T
}

export interface QueryParams{
    page?: number,
    limit?: number,
    search?: string
}