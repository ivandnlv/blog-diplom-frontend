export interface BaseResponse {
  message: string | string[] | null
  error: string | null
  statusCode: number
}

export interface BaseSuccessResponse<T = unknown | null> extends BaseResponse {
  data: T
}

export interface BasePaginationResponse<T = unknown | null> extends BaseResponse {
  data: {
    items: T[]
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface BasePaginationQuery {
  page?: number
  limit?: number
}
